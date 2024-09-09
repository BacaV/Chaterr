import { Server as SocketIoServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import Channel from "./models/ChannelsModel.js";

const setupSocket = (server) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: [process.env.ORIGIN],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`User with id ${socket.id} disconnected`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    console.log("Received message:", message);
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  const sendChannelMessage = async (message) => {
    const { channelId, sender, content, messageType, fileURL } = message;
    const createdMessage = await Message.create({
      sender,
      recipient: null,
      content,
      messageType,
      fileURL,
      timestamp: new Date(),
    });

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image color").exec();

      await Channel.findByIdAndUpdate(channelId, {
        $push: { messages: createdMessage._id },
      });

      const channel = await Channel.findById(channelId).populate("members");

        const finalData = {...messageData._doc, channelId: channel._id};

        if(channel && channel.members) {
          channel.members.forEach(member => {
            const memberSocketId = userSocketMap.get(member._id.toString());

            if (memberSocketId) {
              io.to(memberSocketId).emit("recieve-channel-message", finalData);
            }
            const adminSocketId = userSocketMap.get(channel.admin._id.toString());

            if (adminSocketId) {
              io.to(adminSocketId).emit("recieve-channel-message", finalData);
            }
          })
        }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(
        `User with id ${userId} connected with socket id ${socket.id}`
      );
    } else {
      console.log("Socket not connected");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => {
      disconnect(socket);
    });
  });
};

export default setupSocket;

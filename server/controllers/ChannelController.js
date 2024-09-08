import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

export const createChannel = async (req, res, next) => {
    try {
        const { name, members } = req.body;
        const userId = req.userId;

        const admin = await User.findById(userId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const validMembers = await User.find({ _id: { $in: members } });

        if(validMembers.length !== members.length) {
            return res.status(400).json({ message: "Invalid members" });
        }  

        const newChannel = new Channel({
            name,
            members,
            admin : userId
        });

        await newChannel.save();    
        return res.status(201).json({ channel: newChannel });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
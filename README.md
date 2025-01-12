Chaterr

Chaterr is a real-time web application inspired by WhatsApp, built using the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO for seamless communication.

Features

Real-Time Messaging: Instantly send and receive messages using Socket.IO.

User Authentication: Secure registration and login system.

Group Chats: Create and participate in group conversations.

Message History: Store and retrieve chat history from the database.

Media Sharing: Support for sharing images, videos, and files.


Tech Stack

Frontend: React (with Vite for faster development)

Backend: Node.js with Express.js

Database: MongoDB (via Mongoose for schema management)

Real-Time Communication: Socket.IO

Styling: Tailwind CSS

Installation

Follow these steps to set up the project locally:

Prerequisites

Node.js and npm installed

MongoDB database set up and running

Steps

Clone the repository:

git clone https://github.com/BacaV/chaterr.git
cd chaterr

Install dependencies:

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

Configure environment variables:

Create a .env file in the server and client directory with the following:


Server:

PORT=3000
JWT_KEY="your jwt key"
ORIGIN="client host address"
DATABASE_URL="your base url"

Client:

VITE_SERVER_URL="http://localhost:3000"

Start the application:

# Start the backend server
cd server
npm start

# Start the frontend
cd ../client
npm run dev

Open your browser and navigate to http://localhost:3000 to access the app.

Folder Structure

chaterr/
├── server/        # Backend code
├── client/        # Frontend code
├── README.md      # Project documentation
└── .gitignore     # Ignored files

Future Improvements

End-to-End Encryption: Ensure all communications are fully secure.

Voice/Video Calls: Add real-time voice and video calling functionality.

Responsive Design: Optimized for both desktop and mobile devices.


Contributing

Contributions are welcome! Please follow these steps to contribute:

Fork the repository.

Create a new branch for your feature/fix.

Commit your changes and push to your branch.

Open a pull request for review.

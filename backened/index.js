import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoDB from './db.js';
import router from './Routes/user.js';
import cors from 'cors';
import Razorpay from 'razorpay';
import chatRoute from './Routes/chatRoute.js';
import messageRoute from './Routes/messageRoute.js';
//import { createServer } from 'http';
//import { Server } from 'socket.io';

const app = express();
//const server = createServer(app);
const PORT = 5000;
mongoDB();


// Middleware
app.use(cors({ origin: 'https://pizzaapp-frontend-6v5r.onrender.com' }));
app.use(express.json());
app.use("/api", router);
app.use("/chat",chatRoute);
app.use("/message",messageRoute);

// Razorpay
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Socket.io Setup
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', // React client URL
//     methods: ['GET', 'POST'],
//   },
// });

// let users = {}; // To keep track of connected users
// let userMessages = {}; // To keep track of users who have sent messages

// io.on('connection', (socket) => {
//   console.log('New client connected', socket.id);

//   // Handle new user joining chat
//   socket.on('joinChat', ({ userId }) => {
//     users[userId] = socket.id;
//     console.log(`${userId} joined the chat`);
//   });

//   // Handle admin joining chat
//   socket.on('adminJoin', ({ adminId }) => {
//     // Send list of users who have sent messages to the admin
//     const usersList = Object.values(userMessages); // Convert to array
//     socket.emit('userList', usersList);
//   });

//   // Handle sending and receiving messages
//   socket.on('sendMessage', (data) => {
//     const { userId, adminId, message } = data;

//     // Update userMessages with the user who sent the message
//     if (!userMessages[userId]) {
//       userMessages[userId] = { id: userId, name: `User ${userId}` }; // Replace with actual user details
//     }

//     // Send the message to the admin and the user
//     if (users[adminId]) {
//       io.to(users[adminId]).emit('receiveMessage', data);
//     }
//     if (users[userId]) {
//       io.to(users[userId]).emit('receiveMessage', data);
//     }
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     console.log('Client disconnected', socket.id);
//     for (let userId in users) {
//       if (users[userId] === socket.id) {
//         delete users[userId];
//       }
//     }
//   });
// });

app.get('/', (req, res) => {
  res.send('Complaint chat server is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

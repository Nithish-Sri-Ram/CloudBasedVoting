const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// In your main server file
app.use(cors({
  exposedHeaders: ['x-auth-token']
}));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/elections', require('./Routes/election'));
app.use('/api/votes', require('./Routes/votes'));
// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('newVote', (data) => {
    io.emit('voteUpdate', data);
  });
  
  socket.on('disconnect', () => {c
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

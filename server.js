const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://WiseGoddessAthena:N%40than!!56@athenacluster.o0vvqx7.mongodb.net/socialmediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB connected successfully!');
});

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
const userRoutes = require('./routes/api/users');
const thoughtRoutes = require('./routes/api/thoughts');
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const User = require('./models/User');

// Create an example user
const exampleUser = new User({
  username: 'johndoe',
  email: 'johndoe@example.com',
  thoughts: [], // add any example thoughts here
  friends: [], // add any example friends here
});

// Save the example user to the database
exampleUser.save()
  .then(() => {
    console.log('Example user saved to the database');
  })
  .catch((error) => {
    console.error('Error saving example user to the database:', error);
  });

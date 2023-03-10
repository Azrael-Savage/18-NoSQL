require('dotenv').config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI || '127.0.0.1:27017/socialmediaDB';
// Wrap Mongoose around local connection to MongoDB
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
const mongoose = require("mongoose");

// Wrap Mongoose around local connection to MongoDB
mongoose.connect("mongodb+srv://WiseGoddessAthena:N%40than!!56@athenacluster.o0vvqx7.mongodb.net/socialmediaDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
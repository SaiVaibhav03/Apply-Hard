const mongoose = require('mongoose');

const connectDatabase = async () => {
	const MONGO_URI = process.env.MONGO_URI;
	try {
		await mongoose.connect(MONGO_URI);
		console.log('MongoDB Connection Successfull');
	} catch (err) {
		console.log(`MongoDB Connection Error: ${err}`);
	}
};

const disconnectDatabase = async () => {
	try {
		await mongoose.disconnect();
		console.log('MongoDB Disconnected!');
	} catch (err) {
		console.log(`MongoDB Disconnect Failed, Error: ${err}`);
	}
};

module.exports = { connectDatabase, disconnectDatabase };

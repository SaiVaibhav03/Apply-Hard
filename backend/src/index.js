require('dotenv').config();

const app = require('./app');
const { connectDatabase, disconnectDatabase } = require('./config/database');

process.on('uncaughtException', (err) => {
	console.log(`Error: ${err}`);
	console.log(`Shutting down the server due to Uncaught Exception`);

	process.exit(1); // Exit with an error code
});

connectDatabase();

// cloudinary

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});

process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err}`);
	shutdown(1, 'Unhandled Promise Rejection');
});

function shutdown(code = 0, signal) {
	server.close(() => {
		console.log(`Shutting down the server due to ${signal}`);
		disconnectDatabase().finally(() => process.exit(code));
	});

	setTimeout(() => {
		process.exit(1);
	}, 10000); // 10sec
}

process.on('SIGINT', () => shutdown(0, 'SIGINT signal from terminal')); // signal comes from terminal - ctrl + c
process.on('SIGTERM', () => shutdown(0, 'SIGTERM signal from os/docker')); // signal comes from os/docker

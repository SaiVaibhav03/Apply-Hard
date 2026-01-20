const ExpressError = require('../utils/ExpressError');

module.exports = (err, req, res, next) => {
	const message = err.message || 'Internal Server Error';
	const statusCode = err.statusCode || 500;

	// Wrong Mongodb Id error
	if (err.name === 'CastError') {
		const message = `Resource not found. Invalid: ${err.path}`;
		err = new ExpressError(message, 400);
	}

	// Mongoose duplicate key error
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
		err = new ExpressError(message, 400);
	}

	// Wrong JWT error
	if (err.name === 'JsonWebTokenError') {
		const message = `Json Web Token is invalid, Try again `;
		err = new ExpressError(message, 400);
	}

	// JWT EXPIRE error
	if (err.name === 'TokenExpiredError') {
		const message = `Json Web Token is Expired, Try again `;
		err = new ExpressError(message, 400);
	}

	res.status(err.statusCode).json({
		message: err.message,
		success: false,
	});
};

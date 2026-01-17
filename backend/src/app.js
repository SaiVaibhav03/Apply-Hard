const express = require('express');
const app = express();
const cors = require('cors');

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	})
);

app.get('/', (req, res) => {
	res.send("Hooray It's Working");
});

module.exports = app;

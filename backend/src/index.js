const app = require('./app');

if (process.env.NODE_ENV !== 'PRODUCTION') {
	require('dotenv').config();
}

const server = app.listen(3000, () => {
	console.log('3000 port listening');
});

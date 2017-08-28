const express = require('express');
const server = express();
const request = require('request');

server.set('view engine', 'ejs');

server.get('/', (req, res) =>
	Promise.all([
		getContents('https://os-occ-demo.herokuapp.com/'),
		getContents('https://os-occ-ramps.herokuapp.com/'),
	]).then(responses =>
		res.render('index', { occupancy: responses[0], ramps: responses[1] })
	).catch(error =>
		res.send(error.message)
	)
);

const getContents = (url) => new Promise((resolve, reject) => {
	request.get(url, (error, response, body) => {
		if (error) return resolve("Error loading " + url + ": " + error.message);

		return resolve(body);
	});
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
	console.log(`Homepage listening on port ${port}`);
});
#!/usr/bin/node
var http = require("http");
var url = require("url");

var port = process.argv[2];

function sendJSON(res, status, content) {
	res.writeHead(status);
	res.write(JSON.stringify(content));
	res.end();
}

function handler(req, res) {
	var urlData = url.parse(req.url, true);

	var date;
	if (urlData.query && urlData.query.iso) {
		date = new Date(Date.parse(urlData.query.iso));
	}
	else {
		date = new Date();
	}

	switch(urlData.pathname) {
	case '/api/parsetime':
		sendJSON(res, 200, {
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds()
		});
		break;
	case '/api/unixtime':
		sendJSON(res, 200, {
			unixtime: Math.floor(date.getTime())
		});
		break;
	default:
		sendJSON(res, 404, {error: "No such URL"});
		break;
	}
}

var server = http.createServer(handler);
server.listen(port);

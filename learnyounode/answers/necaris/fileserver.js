#!/usr/bin/node
var fs = require("fs");
var http = require("http");

var port = process.argv[2];
var file = process.argv[3];

function handler(req, res) {
	var stream = fs.createReadStream(file);
	stream.pipe(res);
}

var server = http.createServer(handler);
server.listen(port);

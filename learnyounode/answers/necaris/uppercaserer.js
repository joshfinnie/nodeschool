#!/usr/bin/node
var http = require("http");
var thru2map = require("through2-map");

var port = process.argv[2];

function handler(req, res) {
	if (req.method == "POST") {
		req.pipe(thru2map(function(chunk) {
			return chunk.toString().toUpperCase();
		})).pipe(res);
	}
}

var server = http.createServer(handler);
server.listen(port);

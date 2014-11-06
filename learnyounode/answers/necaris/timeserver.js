#!/usr/bin/node
var net = require("net");
var util = require("util");
var port = process.argv[2];

function zeroPad(num, count) {
	// Assume count won't be too long...
	var padded = '0000' + num;
	return padded.slice(padded.length - count);
}

function handler(conn) {
	var now = new Date();
	// 2013-07-06 17:42
	var timeString = util.format(
		"%s-%s-%s %s:%s",
		zeroPad(now.getFullYear(), 4),
		zeroPad(now.getMonth() + 1, 2),
		zeroPad(now.getDate(), 2),
		zeroPad(now.getHours(), 2),
		zeroPad(now.getMinutes(), 2));
	conn.write(timeString);
	conn.end();
}

var server = net.createServer(handler);
server.listen(port);

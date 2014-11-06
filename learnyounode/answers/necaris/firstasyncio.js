#!/usr/bin/node
var fs = require("fs");
var filename = process.argv[2];
fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
	var lines = data.split('\n');
	console.log(lines.length - 1);
});

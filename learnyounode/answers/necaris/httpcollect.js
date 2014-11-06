#!/usr/bin/node
var http = require("http");
var url = process.argv[2];
http.get(url, function(response) {
	var chunks = [];
	response.setEncoding("utf8");
	response.on("error", function(err) {
		console.error(err);
		throw new Error(err);
	});
	response.on("data", function(chunk) {
		chunks.push(chunk);
	});
	response.on("end", function() {
		var content = chunks.join("");
		console.log(content.length);
		console.log(content);
	});
});

#!/usr/bin/node
var http = require("http");
var urls = process.argv.slice(2);

var contentsReceived = {};

function collector(url, response) {
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
		contentsReceived[url] = content;
		if (Object.keys(contentsReceived).length == urls.length) {
			urls.forEach(function(u) {
				console.log(contentsReceived[u]);
			});
		}
	});
}

urls.forEach(function(u) {
	http.get(u, collector.bind(null, u));
});

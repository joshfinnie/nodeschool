#!/usr/bin/node
var fs = require("fs");
var path = require("path");

var dirName = process.argv[2];
var extName = "." + process.argv[3];

fs.readdir(dirName, function(err, files) {
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var ext = path.extname(file);
		if (ext == extName) {
			console.log(file);
		}
	}
});

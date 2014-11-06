#!/usr/bin/node
var filter = require('./lsfilter');
filter(process.argv[2], process.argv[3], function(err, files) {
	files.map(function(f) {
		console.log(f);
	});
});

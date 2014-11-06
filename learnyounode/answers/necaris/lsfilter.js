var fs = require("fs");
var path = require("path");

module.exports = function(dirname, extname, callback) {
	fs.readdir(dirname, function(err, files) {
		if (err) {
			return callback(err);
		}
		var targetExt = "." + extname;
		var filtered = files.filter(function(file) {
			var ext = path.extname(file);
			return (ext == targetExt);
		});
		return callback(null, filtered);
	});
};

module.exports = function(dirname, ext, callback) {
  var fs = require('fs');
  var match = "." + ext;
  fs.readdir(dirname, function(err, files) {
    if (err) return callback(err, null);
    var list = [];
    files.forEach(function(item) {
      if (item.indexOf(match) > -1) {
        list.push(item);
      }
    });
    callback(null, list);
  });
}

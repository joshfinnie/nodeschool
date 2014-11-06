var fs = require('fs');
var lsfilter = require('./lsfilter.js');
var http = require('http');
var net = require('net');
var strftime = require('strftime');
var through2map = require('through2-map');
var urlLib = require('url');

//1 - Hello World
function one() {
  console.log("HELLO WORLD");
}

//2 - Baby Steps
function two() {
  var sum = process.argv.slice(2).reduce(function(a, b) {
    return Number(a) + Number(b);
  });
  console.log(sum);
}

//3 - My First I/O
function three() {
  var filename = process.argv[2];
  var input = fs.readFileSync(filename).toString().split("\n").length - 1;
  console.log(input.length);
}

//4 - My First Async I/O
function four() {
  var filename = process.argv[2];
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log(err);
    }
    var len = data.toString().split("\n").length - 1;
    console.log(len);
  });
}

//5 - Filtered ls
function five() {
  var dirname = process.argv[2];
  var ext = process.argv[3];
  var toMatch = "." + ext;
  fs.readdir(dirname, function(err, files) {
    files.forEach(function(item) {
      if (item.indexOf(toMatch) > -1) {
        console.log(item);
      }
    });
  });
}

//6 - Make it modular
function six() {
  var callback = function(err, files) {
    if (err) {
      return err;
    }
    files.forEach(function(item) {
      console.log(item);
    });
  }
  lsfilter(process.argv[2], process.argv[3], callback);
}

//7 - HTTP client
function seven() {
  var url = process.argv[2];
  http.get(url, function(res) {
    var str = '';
    res.on('data', function (chunk) {
      str += chunk + "\n";
    });

    res.on('end', function () {
      console.log(str);
    });
  });
}

//8 - HTTP collect
function eight() {
  var url = process.argv[2];
  http.get(url, function(res) {
    var str = '';
    res.on('data', function (chunk) {
      str += chunk;
    });

    res.on('end', function () {
      console.log(str.length);
      console.log(str);
    });
  });
}

//9 - Juggling Async
function nine() {
  var urls = process.argv.slice(2);
  var responses = {};

  var testDone = function(url, item) {
    responses[url] = item;
    if (Object.keys(responses).length == 3) {
      urls.forEach(function(url) {
        console.log(responses[url]);
      });
    }
  }
  urls.forEach(function(url) {
    http.get(url, function(res) {
      var str = '';
      res.on('data', function (chunk) {
        str += chunk;
      });

      res.on('end', function () {
        testDone(url, str);
      });
    });
  });
}

//10 - Time Server
function ten() {
  var port = process.argv[2];
  var net = require('net');
  var server = net.createServer(function (socket) {
    // socket handling logic
    var d = strftime('%F %H:%M', new Date());
    socket.end(d);
  });
  server.listen(port);
}

//11 - HTTP File Server
function eleven() {
  var port = process.argv[2];
  var filename = process.argv[3];
  var server = http.createServer(function (req, res) {
    var readStream = fs.createReadStream(filename);
    readStream.on('open', function () {
      readStream.pipe(res);
    });
    readStream.on('error', function(err) {
      res.end(err);
    });
  });
  server.listen(port);
}

//12 - HTTP Uppercaserer
function twelve() {
  var port = process.argv[2];
  http.createServer(function(req, res) {
    if (req.method == 'POST') {
      req.pipe(through2map(function(chunk){
        return chunk.toString().toUpperCase();
      })).pipe(res);
    }
  }).listen(port);
}

//13 - JSON API Server
function thirteen() {
  var port = process.argv[2];
  var urlToHandler = {
    '/api/parsetime': function(iso) {
      var date = new Date(iso);
      return {
        hour  : date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      }
    },
    '/api/unixtime': function(iso) {
      return {
        unixtime: Date.parse(iso)
      }
    }
  }
  http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var json = null;
    var parsedUrl = urlLib.parse(req.url, true);
    var pathname = parsedUrl['pathname'];
    var handler = urlToHandler[pathname];
    var query = parsedUrl['query'];
    var iso = null;
    if (query) {
      iso = query['iso'];
    }

    if (req.method == 'GET' && iso && handler) {
      json = handler(iso);
    } else {
      json = {message:'Invalid request'};
    }

    res.end(JSON.stringify(json));
  }).listen(port);
}

module.exports = {
  one: one,
  two: two,
  three: three,
  four: four,
  five: five,
  six: six,
  seven: seven,
  eight: eight,
  nine: nine,
  ten: ten,
  eleven: eleven,
  twelve: twelve,
  thirteen: thirteen
}

#!/usr/bin/node
var fs = require('fs');
var fileName = process.argv[2];
var fileContents = fs.readFileSync(fileName, {encoding: 'utf8'});
var lines = fileContents.trim().split('\n');

console.log(lines.length - 1);

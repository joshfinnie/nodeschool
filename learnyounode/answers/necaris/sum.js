#!/usr/bin/node
console.log(process.argv.slice(2).reduce(function(prev, curr, i, arr) {
	return Number(prev) + Number(curr);
}, 0));

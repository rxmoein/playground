"use strict";

var curFib = 0;

self.onmessage = onMessage

function onMessage(evt) {
	getNextFib()
}

function getNextFib() {
	var fibNum = fib(curFib)
	self.postMessage({ idx: curFib, num: fibNum })
	curFib++
	getNextFib()
}

// **********************************

function fib(n) {
	if (n < 2) {
		return n;
	}
	return fib(n-1) + fib(n-2);
}

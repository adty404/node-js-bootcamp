const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
	console.log("I/O finished");
	console.log("-------------------");
	setTimeout(() => console.log("Timer 2 finished"), 0);
	setTimeout(() => console.log("Timer 3 finished"), 3000);
	setImmediate(() => console.log("Immediate 2 finished"));

	process.nextTick(() => console.log("Process.nextTick"));

	// This is the last line of the callback function, so it will be executed last
	// before the event loop checks the pending timers and immediates
	// and executes the first one in the queue

	// Synchrnous code
	crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});
	crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});
	crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});
	crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});

	// Asynchronous functions are executed in the thread pool, so they are not blocking the event loop
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "Password encrypted");
	});
});

console.log("Hello from the top-level-code");

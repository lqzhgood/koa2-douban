const cp = require('child_process')
const path = require('path')



;
(() => {
	const script = path.join(__dirname, '../crawler/video.js');
	const child = cp.fork(script, []);

	let invoked = false;

	child.on('error', (err) => {
		if (invoked) return;
		invoked = true;
		console.log('err', err)
	})

	child.on('exit', (code) => {
		if (invoked) return;

		invoked = true;
		let err = code === 0 ? null : new Error(`exit code ${code}`);
		console.log('err', err)
	})

	child.on('message', (data) => {
		let result = data;

		console.log('result', result)
	})
})()

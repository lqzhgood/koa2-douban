const puppeteer = require('puppeteer');
const doubanId = '25882296'
const URL = `https://movie.douban.com/subject/${doubanId}`;
const VIDEO_BASE = `https://movie.douban.com/trailer/${doubanId}/`

;
(async () => {
	console.log('start visit the target page')

	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox'],
		dumpio: false
	})

	const page = await browser.newPage();
	await page.goto(URL, {
		waitUntil: 'networkidle2'
	})

	await sleep();

	const result = await page.evaluate(() => {
		let $ = window.$;
		let it = $('.related-pic-video');
		if (!(it && it.length > 0)) return {};
		let link = it.attr('href');
		let cover = it.css("backgroundImage").replace('url(', '').replace(')', '');
		return {
			link,
			cover
		}

	})
	let video;
	if (result.link) {
		await page.goto(result.link, {
			waitUntil: 'networkidle2'
		})
		await sleep();
		video = await page.evaluate(() => {
			let $ = window.$;
			let it = $('source');
			if (!(it && it.length > 0)) return '';
			return it.attr('src')

		})
	}

	const data = {
		video,
		doubanId,
		cover: result.cover
	}

	browser.close();
	process.send(data);
	process.exit(0);
})()



function sleep(time = 1) {
	return new Promise((resolve) => {
		setTimeout(resolve, time * 1000)
	})
}

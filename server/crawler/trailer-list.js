const puppeteer = require('puppeteer');
const URL = "https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=";

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

	await page.waitForSelector('.more');

	for (let i = 0; i < 1; i++) {
		await sleep();
		await page.click('.more');
	}

	const result = await page.evaluate(() => {
		let $ = window.$;
		let items = $('.list-wp a');
		let links = [];
		console.log('items', items)
		if (items.length > 1) {
			items.each((i, item) => {
				let it = $(item);
				let doubanId = it.find('div').data('id');
				let title = it.find('.title').text();
				let rate = Number(it.find('.rate').text());
				let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio');
				let obj = {
					doubanId,
					title,
					rate,
					poster
				};
				links.push(obj)
			})
		}
		return links
	})

	browser.close();
	process.send({ result });
})()



function sleep(time = 1) {
	return new Promise((resolve) => {
		setTimeout(resolve, time * 1000)
	})
}

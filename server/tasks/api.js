const request = require('request-promise-native')




;
(() => {
	let movies = [{
			doubanId: 27080735,
			title: '名利场',
			rate: 7.5,
			poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2533115751.jpg'
		},
		{
			doubanId: 30235439,
			title: '不能去学校的我直到写出「未闻花名」「心在呐喊」',
			rate: 6.8,
			poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2526392895.jpg'
		}
	];
	movies.map(async (v) => {
		let movieData = await fetchMoive(v);
		console.log('movieData', movieData);
	})
})()



async function fetchMoive(item) {
	const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;
	let res = await request(url);
	console.log('res', res)
	return res;
}

const qiniu = require('qiniu')
const nanoid = require('nanoid')

const config = require('../config')

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg)




;
(() => {
	let movies = [{
		video: 'http://vt1.doubanio.com/201809131602/b2e3bf635c7e881ce982b0a121362fde/view/movie/M/402330791.mp4',
		doubanId: '25882296',
		poster: 'http://img3.doubanio.com/view/photo/l_ratio_poster/public/p494268647.webp',
		cover: 'https://img3.doubanio.com/img/trailer/medium/2528211904.jpg?'
	}]
	movies.map(async (movie) => {
		if (movie.video && !movie.key) {
			console.log('正在上传', )
			try {
				let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4');
				let posterData = await uploadToQiniu(movie.poster, nanoid() + '.webp');
				let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg');
				if (videoData.key) movie.videoKey = videoData.key;
				if (coverData.key) movie.coverKey = coverData.key;
				if (posterData.key) movie.posterKey = posterData.key;
			} catch (e) {
				console.log('err', err)
			}
		}
	})
	console.log('movies', movies)
})()

function uploadToQiniu(url, key) {
	return new Promise((resolve, reject) => {
		client.fetch(url, bucket, key, (err, respBody, respInfo) => {
			if (err) {
				console.log(err);
				reject(err);
				//throw err;
			} else {
				if (respInfo.statusCode == 200) {
					console.log(respBody.key);
					resolve({ key })
				} else {
					console.log(respInfo.statusCode);
					reject(respBody);
				}
			}
		})
	});
}

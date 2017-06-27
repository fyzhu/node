var http=require('http');
var zlib = require('zlib');
var querystring=require('querystring');
var postData=querystring.stringify({
	'content':'我是来测试的，不要管我。来自nodejs',
	'cid':348
})
var options={
	hostname:'www.imooc.com',
	path:'/course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':Buffer.byteLength(postData),
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		//'Cookie':'imooc_uuid=d5f019fb-6c9c-474d-8a06-46f9cd3ae860; imooc_isnew_ct=1493400968; loginstate=1; apsid=VmNWMyODQ3MjllZjVmZTQwYTcwMTNhODE1NTMxZTEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjQwNzYwOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmeXpodTAxQHFxLmNvbQAAAAAAAAAAAAAAAAAAAAAAAGQ4YmI4Yjc0MWQyNzA1MzM5MGMxMzgyMjMxMTJkODk0l30DWZd9A1k%3DY2; last_login_username=fyzhu01%40qq.com; PHPSESSID=gggdkeglq1gbmc9efkjlqcoqo5; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1494693645,1494900310,1495084329,1495528457; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1495539124; imooc_isnew=2; cvde=5923f4091b44c-141',
		'Cookie':'imooc_uuid=d5f019fb-6c9c-474d-8a06-46f9cd3ae860; imooc_isnew_ct=1493400968; loginstate=1; apsid=VmNWMyODQ3MjllZjVmZTQwYTcwMTNhODE1NTMxZTEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjQwNzYwOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmeXpodTAxQHFxLmNvbQAAAAAAAAAAAAAAAAAAAAAAAGQ4YmI4Yjc0MWQyNzA1MzM5MGMxMzgyMjMxMTJkODk0l30DWZd9A1k%3DY2; last_login_username=fyzhu01%40qq.com; PHPSESSID=gggdkeglq1gbmc9efkjlqcoqo5; imooc_isnew=2; cvde=5923f4091b44c-198; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1494693645,1494900310,1495084329,1495528457; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1495590453',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/348',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req=http.request(options,function(res){
	console.log('Status:'+res.statusCode)
	console.log('headers:'+JSON.stringify(res.headers))
	// console.log(res)
	// res.setEncoding('utf8');
	var data='';

	var gunzip = zlib.createGunzip();   
  	res.pipe(gunzip);
	gunzip.on("data",function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
		// var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
        console.log(chunk.toString());
        chunk=JSON.parse(chunk.toString())
        console.log(chunk.msg)
        // response.pipe(zlib.createGunzip()).pipe(output);
        // console.log(chunk)
        // console.log(chunk.length)
		// var msg=chunk.toString().msg
		// console.log(msg)
	})
	res.on('end',function(){
		console.log('评论完毕');
		 
	})

})
req.on('error',function(e){
	console.log('Error:'+e.message)
})
req.write(postData)
req.end()
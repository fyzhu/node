var http=require("http");
var cheerio=require('cheerio');
var url="http://www.imooc.com/learn/348"
function trim(str,is_global)
        {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g,"");
            if(is_global.toLowerCase()=="g")
            {
                result = result.replace(/\s/g,"");
             }
            return result;
}
function filterChapters(html){
	var $=cheerio.load(html)
	var chapters=$('.chapter')
	var courseData=[]
	chapters.each(function(){
		var chapter=$(this)
		var chapterTitle=chapter.find('strong').text();
		var videos=chapter.find(".video").children("li")
		var chapterData={
			chapterTitle:trim(chapterTitle,'g'),
			videos:[]
		}
		videos.each(function(item){
			var video=$(this).find(".J-media-item");
			var videoTitle=trim(video.text(),'g')
			var id=video.attr('href').split("video/")[1]
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})

		courseData.push(chapterData)
	})
	return courseData
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle=item.chapterTitle
		console.log(chapterTitle+'\n')
		item.videos.forEach(function(video) {
			console.log('['+video.id+']'+video.title+'\n')
		})
	})
}
http.get(url,function(res){
	var html=''
	res.on('data',function(data){
		html+=data;
	})
	res.on("end",function(){
		//console.log(html)
		var courseData=filterChapters(html)
		printCourseInfo(courseData);
	})
}).on('error',function(){
	console.log('获取课程数据失败');
})
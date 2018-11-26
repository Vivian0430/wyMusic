function mainLyricScroll(lyric){
	var lyrics=formatLyric(lyric);
	
	createLyricDOM(lyrics);
    
    var minHeight=$("#lrcContainer").height()/2;
    var scrollTop=0;
    $("#lrcBox").find(".lrc").each(function(i,p){
    	scrollTop=p.offsetTop<=minHeight?0:p.offsetTop-minHeight;
    	p.dataset.scrolltop=scrollTop;
    })
    
    var curLine=-1;
    var scrollLyric=function(i,scrolltop){
    	if(i!=curLine){
    		$("#lrcContainer").animate({
    			"scrollTop":scrolltop
    		},300)
    		curLine=i;
    	}
    }
    $("#lrcBox").find(".lrc").eq(0).addClass("current");
    
	$("#audio").on("timeupdate", function() {
		var this_ = this;
		$("#lrcBox").find(".lrc").each(function(i, p) {
			if(Math.abs(this_.currentTime - p.dataset.timepoint) < 0.7) {
				$(p).addClass("current").siblings().removeClass("current");
			    scrollLyric(i,p.dataset.scrolltop);
			}
		})
	})
}

function createLyricDOM(lyrics){
	var p=null;
		$(".lrcbox").find('p').remove();

	$.each(lyrics, function(i,lyric) {
		p=document.createElement("p");
		p.innerHTML=lyric.lrcstr;
		p.className="lrc";
		p.dataset.timepoint = lyric.timepoint;
		p.dataset.line = i;
		$("#lrcBox").append(p);
	});
}

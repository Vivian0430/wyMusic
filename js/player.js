var m_count=1;
$(function() {
	var curIndex = 0;
	var audio = $("#audio").get(0);
	var isDrag = false;
	var tr = null;

	var progressboxRect = $("#progress_box").get(0).getBoundingClientRect();

	$("#progress_arc").on("mousedown", function(event) {

		var changeVal = 0;
		//按下点与圆点最左边的距离
		var disx = event.clientX - this.getBoundingClientRect().left;

		var eventMouseOver = function(event) {
			var clientX = event.clientX;
			//计算进度条滑动的距离
			var disx2 = (((clientX - disx - progressboxRect.left) / progressboxRect.width) * 100).toFixed(2);
			disx2 = disx2 < 0 ? 0 : (disx2 > 100 ? 100 : disx2);

			$("#progress_bar").css("width", disx2 + "%");

			isDrag=true;
			//根据滑动的百分比 计算已播放的时间
			changeVal = (audio.duration * disx2 / 100).toFixed(2);
			var beginTime = formatTime(changeVal);
			//更新已播放时间
			$("#audio_currentTime").html(beginTime.I + ":" + beginTime.S);

		}

		var eventMouseUp = function(event) {
			$(document).off("mouseover", eventMouseOver);
			$(document).off("mouseup", eventMouseUp);
			
			isDrag=false;
		/*	console.log("eventMouseUp" + changeVal);*/
			audio.currentTime = changeVal;
		}

		$(document).on("mouseover", eventMouseOver);
		$(document).on("mouseup", eventMouseUp);
	})

	$(".play").click(function() {
		if(audio.paused) {
			audio.play();
			chagePlayStyle('pause');
		} else {
			audio.pause();
			chagePlayStyle('play');
		}
	})

	$(".next").click(function() {
		var songLen = localStorage.getItem("songLen");
		curIndex = (curIndex + 1) >= songLen ? 0 : curIndex + 1;
		playMusic(curIndex);

	});

	$(".prev").on("click", function() {
		var songLen = localStorage.getItem("songLen");
		curIndex = (curIndex - 1) < 0 ? (songLen - 1) : curIndex - 1;
		playMusic(curIndex);
	})

	$("#infoList_playlist").on("dblclick", "tr", function() {
	
		curIndex = parseInt(this.dataset.index);
		playMusic(curIndex);
	});
    
    $(".bofang").on("click",function(){
    	playMusic(curIndex);
    })
    
    $(".btns1").on("dblclick",function(){
    	$("#collect").addClass("active");
    	
    })
    $(".btns1").on("click",function(){
    	$("#collect").removeClass("active");
    	
    })
    $(".btns2").on("click",function(){
    	$("#share").css(alert("请先登录！"));
    })
    
    $(".xiala").on("dblclick",function(){
    	$(".gequ").css("display","block");
    })
     $(".xiala").on("click",function(){
    	$(".gequ").css("display","none");
    })
   
    
	$("#audio").on("timeupdate", function() {
	
		//当不是拖动的时候
		if(!isDrag) {
			var ct = formatTime(this.currentTime);
			var dura = formatTime(this.duration);

			$(".start").html(ct.I + ":" + ct.S);
			$(".end").html(dura.I + ":" + dura.S);

			var barWidth = ((this.currentTime / this.duration) * 100).toFixed(4) + "%";
			
			$("#progress_bar").css("width", barWidth);
		}

	})

	$("#audio").on("ended", function() {
		var songLen = localStorage.getItem("songLen");
		curIndex = curIndex + 1;
		if(curIndex >= songLen) {
			this.pause();
			chagePlayStyle('play');
		} else {
			playMusic(curIndex);
		}
	})
	
	
	$("#audio").on("play",function(){
		//开始旋转动画
		$("#bgDisc").css("animation-play-state","running");
		
	})
	
	//监听暂停事件
	$("#audio").on("pause",function(){
		//暂停动画
		$("#bgDisc").css("animation-play-state","paused");
	})
	
	
	//更新缓冲进度条
	setInterval(function(){
		if(audio.readyState==4){
			var ranges=audio.buffered;
			var endTime=ranges.end(ranges.length-1);
			var widthPercent=(endTime/audio.duration*100).toFixed(3);
			$("#progress_cache").css("width",widthPercent+"%");
		}
	},1000)
	

})

function chagePlayStyle(type) {
	var playHtml = '<i class="fa fa-play" aria-hidden="true"></i>';
	var pauseHtml = '<i class="fa fa-pause" aria-hidden="true"></i>'
	$(".play").html((type == 'play') ? playHtml : pauseHtml);
}

function playMusic(curIndex) {
	
	refreshDOM(curIndex);
	var trs = $("#infoList_playlist").find("tr")
	//音频暂停播放
	audio.pause();

	//播放按钮变为播放样式
	chagePlayStyle('play');

	//获取/设置播放资源		
	tr = $(trs).get(curIndex);
	$(audio).prop("src", tr.dataset.audio);

/*	console.log(audio.readyState);*/

	audio.play();
	

	//播放按钮变为暂停样式
	chagePlayStyle('pause');

	$(trs).find("td.index").each(function(i, td) {
		$(td).html(td.dataset.num).removeClass("active");
	})

	$(tr).find("td.index").html('<i class="fa fa-volume-up" aria-hidden="true"></i>').addClass("active");
     
    bofshumu();
}

function bofshumu(){
	$(".bofshumu").html(m_count);
	m_count++;
}

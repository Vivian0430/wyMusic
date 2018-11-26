function initPalyList(data){
	
	var tracks=data.result.tracks;

	var tr=null;
	var docFrag=document.createDocumentFragment();

	var num="",title="",artist="",artists=[],album="",timeObj={};
	$.each(tracks, function(i,track) {
		
		num=(i+1)<10?"0"+(i+1):(i+1);
		title=track.name;
		
		artists=[];
		$.each(track.artists, function(i,artist) {
			artists.push(artist.name);
		});
		artist=artists.join("/");
		
		album=track.album.name;
		
		timeObj=formatTime(track.duration/1000);
		
		tr=document.createElement("tr");
		tr.dataset.id=track.id;
		tr.dataset.index=i;
		tr.dataset.audio = "http://music.163.com/song/media/outer/url?id="+track.id+".mp3";
		 
		tr.dataset.name=title;
		tr.dataset.artist=artist;
		tr.dataset.album=album;
		tr.dataset.albumpic=track.album.picUrl;

		tr.dataset.poster=track.album.picUrl
		
		var innerHtml='<td class="index" data-num="'+num+'">'+num+'</td>'+		
		'<td><i class="fa fa-heart-o" aria-hidden="true"></i>&nbsp;'+
		'<i class="fa fa-download" aria-hidden="true"></i></td>'+
		'<td>'+title+'</td>'+
		'<td>'+artist+'</td>'+
		'<td>'+album+'</td>'+
		'<td>'+timeObj.I+':'+timeObj.S+'</td>';
		tr.innerHTML=innerHtml;
					
		docFrag.appendChild(tr);
	});
	
	$("#infoList_playlist").append(docFrag);
}


$(function() {
	var songLen=0;
	
/*	var user = {
		"name": "nanji-geek",
		"playlist": playlist
	}*/

   var playlist = "811019211";
   request(playlist);
   $("#gedan2").click(function(){
    	 function test(exp){
    	 playlist=exp;
    	 request(playlist);
    }
      test("2334950820");
      $("#infoList_playlist").html("");
     })
   
   request(playlist);
   $("#gedan1").click(function(){
    	 function test(exp){
    	 playlist=exp;
    	 request(playlist);
    }
      test("811019211");
      $("#infoList_playlist").html("");
     })
   
   request(playlist);
   $("#gedan3").click(function(){
    	 function test(exp){
    	 playlist=exp;
    	 request(playlist);
    }
      test("2319058475");
      $("#infoList_playlist").html("");
     })
   
   request(playlist);
   $("#gedan4").click(function(){
    	 function test(exp){
    	 playlist=exp;
    	 request(playlist);
    }
      test("2346050474");
      $("#infoList_playlist").html("");
     })
function request(playlist){
	requestAPI({
		url: "http://www.igeekhome.com/mplayer/api.php",
		data: {
			"API_type": "get_playlist_info",
			"queryString": {
				"id": playlist
			}
		},
		callback: function(data) {
			initPalyList(data);
			refreshDOM();
			songLen=data.result.tracks.length;
			localStorage.setItem("songLen",songLen);
			$(".guqushumu").html(songLen);
		}
	});
	}
   
	
	$("#expand").click(function() {
		$("#pageSongDetail").css({
			"top": "60px",
			"right": "0",
			"opacity": "1"
		})
	});
	
	$("#compress").click(function(){
		$("#pageSongDetail").css({
			"top": "100%",
			"right": "100%",
			"opacity": "0"
		})
	})
})


function refreshDOM(curIndex){
	if(curIndex>=0){
		var firstTR=$("#infoList_playlist").find("tr").get(curIndex);
	}else{
		firstTR=$("#infoList_playlist").find("tr").get(0);
	}
	
	$("#audio").prop("src",firstTR.dataset.audio);
	$(firstTR).find("td.index").html('<i class="fa fa-volume-up" aria-hidden="true"></i>').addClass("active");
	
	$("#music_poster").prop("src", firstTR.dataset.albumpic);
	$("#small_albumpic").prop("src", firstTR.dataset.albumpic);
	$("#small_songname").html(firstTR.dataset.name);
	$("#small_artistname").html(firstTR.dataset.artist);
	
	$("#bgBlur").css("background-image","url('"+firstTR.dataset.albumpic+"')");
	$("#bgDisc").css("background-image","url('"+firstTR.dataset.albumpic+"')");
	
	
	$("#songDetail").find(".songname").html(firstTR.dataset.name);
	$("#songDetail").find(".albumname").html(firstTR.dataset.album);
	$("#songDetail").find(".artistname").html(firstTR.dataset.artist);
requestAPI({
		url: "http://www.igeekhome.com/mplayer/api.php",
		data: {
			"API_type": "get_music_lyric",
			"queryString": {
				"id": firstTR.dataset.id
			}
		},
		callback: function(data) {
			mainLyricScroll(data.lrc.lyric);
		}
	});
}
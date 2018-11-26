


$(function () {
    $(".content .list .btn1").click(function (e) {
        $(this).css({"color": "white", "background-color": "#CC3333", "border-color": "#CC3333", "border-top": "1px solid lightslategray",
	    "border-right": "1px solid lightslategray",
	    "border-left": "1px solid lightslategray"});
        $(".content .list .btn2").css({"color": "black","background-color":"white",
        "border-top": "1px solid lightslategray",
	    "border-right": "1px solid lightslategray",
	    "border-left": "1px solid lightslategray" });
	    $(".content .list .btn3").css({"color": "black","background-color":"white",
        "border-top": "1px solid lightslategray",
	    "border-right": "1px solid lightslategray",
	    "border-left": "1px solid lightslategray" });
	    
        $(".content .list .musiclist").css("display", "block");
        $(".content .list .plun").css("display", "none");
        $(".content .list .scang").css("display", "none");
        if (fluCodeInterval == null || fluCheckCodeInterval == null) {
            show();
            flushQRCode();
            checkQRCodeStatus();
        }
    });
    $(".content .list .btn2").click(function (e) {
       $(this).css({"color": "white", "background-color": "#CC3333", "border-color": "#CC3333"});
        $(".content .list .btn1").css({"color": "black","background-color":"white",
        "border-top": "1px solid lightslategray",
	    "border-right": "1px solid lightslategray",
	    "border-left": "1px solid lightslategray" });
	    $(".content .list .btn3").css({"color": "black","background-color":"white",
        "border-top": "1px solid lightslategray",
	    "border-right": "1px solid lightslategray",
	    "border-left": "1px solid lightslategray" });
	    
        $(".content .list .scang").css("display", "none");
        $(".content .list .plun").css("display", "block");
        $(".content .list .musiclist").css("display", "none");
    });
    
  $(".content .list .btn3").click(function (e) {
       $(this).css({"color": "white", "background-color": "#CC3333", "border-color": "#CC3333"});
        $(".content .list .btn1").css({"color": "black","background-color":"white",
        "border-top": "1px solid lightslategray",
	    "border-right": "1px solid lightslategray",
	    "border-left": "1px solid lightslategray" });
	    $(".content .list .btn2").css({"color": "black","background-color":"white",
        "border-top": "1px solid lightslategray",
	    "border-right": "1px solid lightslategray",
	    "border-left": "1px solid lightslategray" });
	    
        $(".content .list .scang").css("display", "block");
        $(".content .list .plun").css("display", "none");
        $(".content .list .musiclist").css("display", "none");
    });
  
})

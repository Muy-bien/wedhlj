function on_navli(){
	if($.cookie("h_position")==2){
		$(".nav_cont_a").eq(3).addClass("nav_cont_on");
	}else{
		$(".nav_cont_a").eq(4).addClass("nav_cont_on");
	}
}
//导航栏默认选中
var state=1;//防止多次点击
var username = $.cookie("user");

$(".headImg_heart").click(function(){
	console.log(123)
})
$(".danceImg_heart").click(function(){
	console.log(456);
})
$(".planImg_heart").click(function(){
	console.log(789);
})
$(".searching_button").click(function(){
	console.log(112);
})
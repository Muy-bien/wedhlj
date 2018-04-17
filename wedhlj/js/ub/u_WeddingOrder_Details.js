//导入信息
$(document).ready(function(){
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	$(".main_title_cont h1").click(function(){
		$(this).addClass("main_title_cont_on").siblings().removeClass("main_title_cont_on");
	})
})
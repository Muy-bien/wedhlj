//导入信息
$(document).ready(function(){
	//导航栏默认选中
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
	$(".main_list li").hover(function(){
		$(this).addClass('main_list_on').siblings('').removeClass('main_list_on');
	})
})
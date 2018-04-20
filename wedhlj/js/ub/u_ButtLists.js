//导入信息
$(document).ready(function(){
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	$(".checked_item").click(function(){
		$(this).toggleClass("checked_on")
	})
})


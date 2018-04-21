//导入信息
$(document).ready(function(){
	//导航栏默认选中
	//var h_position = $.cookie("h_position");
	var h_position = 1;
	if(h_position == 3){
		$(".nav_cont_a").eq(3).addClass("nav_cont_on");
	}else{
		$(".nav_cont_a").eq(2).addClass("nav_cont_on");
	}
	
})
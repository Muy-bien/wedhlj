//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
}
	//导入信息
$(document).ready(function(){
	//导航栏默认选中
	//var h_position = $.cookie("h_position");
	var h_position = 1;
	// if(h_position == 3){
	// 	$(".nav_cont_a").eq(3).addClass("nav_cont_on");
	// }else{
	// 	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
	// }
	//u_AddCollaborator.html固定人员
	//u_AddFixedPersonnel.html合作人员
	$("main_title_cont button").click(function(){
		console.log("ddd");
		console.log($(".main_title_cont h1").eq(0).has(".main_title_cont_on"))
	})
	$(".main_title_cont h1").click(function(){
		$(this).addClass("main_title_cont_on").siblings().removeClass("main_title_cont_on");
	})
})

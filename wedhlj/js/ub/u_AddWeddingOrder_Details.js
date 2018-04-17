//导入信息
$(document).ready(function(){
	//导航栏默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	$(".main_title_cont h2").click(function(){
		$(this).addClass("main_title_cont_on").parent().siblings().children().removeClass("main_title_cont_on");
	})
	//_item 下拉框中的选项标记 
	//_content 选中框内容填放处标记
	function dropDown(_item,_content){
		$(_item).click(function(){
		console.log($(this).html());
		$(_content).html($(this).html())
	})
	}
	// 订单状态
	dropDown('.orderStatusContent a','.orderStatus')
	// 业务来源
	dropDown('.businessComeContent a','.businessCome')
	//酒店地址
	dropDown('.hotelAddrContent a','.hotelAddr')
	//接亲地址
	dropDown('.jieqinAddrContent a','.jieqinAddr')
	
})


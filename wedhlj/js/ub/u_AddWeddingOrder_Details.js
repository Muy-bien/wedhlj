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
	// *添加订单详情的区域
	dropDown('.addOrderItem_AddrContent a','.addOrderItem_Addr')
	// *添加订单详情的名称
	dropDown('.addOrderItem_NameContent a','.addOrderItem_Name')
	// *添加订单详情的性质
	dropDown('.addOrderItem_PriContent a','.addOrderItem_Pri')
	// *添加人员详情的人员类型
	dropDown('.addPersonItem_TypeContent a','.addPersonItem_Type')


	// 点击订单详情的XX
	$(".addOrderItemTitle span").click(function(){
		$(".addOrderItems").css("display","none");
	})
	// 点击订单详情的添加按钮
	$(".orderAddButton").click(function(){
		$(".addOrderItems").css("display","block");
	})
	/*人员详情*/
	// 点击人员详情的XX
	$(".addPersonItemTitle span").click(function(){
		$(".addPersonItems").css("display","none");
	})
	// 点击人员详情的添加按钮
	$(".personAddButton").click(function(){
		$(".addPersonItems").css("display","block");
	})
	$(function(){
		$(".check").click(function(){
			$(":input[name='ids']").prop("checked",this.checked);
		});
		$(":checkbox[name='ids']").click(function(){
			$(".check").prop("checked",$(":checkbox[name='ids']").length==$(":checkbox[name='ids']:checked").length);
		});
	})
	$(function(){
		$(".ordercheck").click(function(){
			$(":input[name='cds']").prop("checked",this.checked);
		});
		$(":checkbox[name='cds']").click(function(){
			$(".check").prop("checked",$(":checkbox[name='cds']").length==$(":checkbox[name='cds']:checked").length);
		});
	})
})


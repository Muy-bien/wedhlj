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
	// 点击订单详情的取消按钮
	$(".remove_order").click(function(){
		$(".addOrderItems").css("display","none");
	})
	//点击人员详情的取消按钮
	$(".remove_person").click(function(){
		$(".addPersonItems").css("display","none");
	})
	// 全选
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
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
}
//添加订单
var state=1;
addOrder()
function addOrder(){
	if(state==1){
		state=2;
		//订单状态
		var _orderStatusVal=$(".orderStatus").text();
		var indentOrderStatus=(_orderStatusVal=="预 定"?0:(_orderStatusVal=="跟 单"?1:(_orderStatusVal=="执 行"?2:(_orderStatusVal=="完 成"?3:0))))
		var indentTime=$("#datetimepicker4").val();//仪式时间
		var indentBusiness=$(".businessCome").text();//订单来源
		var indentBridePhone=$(".indentBridePhone input").val();//新娘电话
		var indentBridegroomPhone=$(".indentBridegroomPhone input").val();//新郎电话
		var indentPrincipal=$(".indentPrincipal input").val();//订单负责人
		var indentRitualHotel=$(".indentRitualHotel input").val();//仪式酒店
		var dropdown_x10=$(".dropdown_x10").text();//省
		var dropdown_x20=$(".dropdown_x20").text();//市
		var dropdown_x30=$(".dropdown_x30").text();//区
		var dropdown_x40=$(".dropdown_x40 input").text();//详细地址
	}
}

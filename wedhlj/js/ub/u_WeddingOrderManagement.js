$(document).ready(function(){
	$(".AddOrder_but").click(function(){
		if($.cookie("position")==1){
			window.location.href="u_AddWeddingOrder_Details.html";
		}else if($.cookie("position")==2||$.cookie("position")==3){
			window.location.href="u_AddSupplierOrder_Details.html";
		}
	})
	//页面刷新
	var page = getUrlParam("page");
	var pageIndentOrderStatus = getUrlParam("pageIndentOrderStatus");
	if(page==null||pageIndentOrderStatus==null){
		show(1,0,1,1);
		$(".main_title_cont h1").eq(0).addClass('main_title_cont_on');
	}else{
		show(page,pageIndentOrderStatus,1,1)
		$(".main_title_cont h1").eq(pageIndentOrderStatus).addClass('main_title_cont_on');
	}
	//点击导航栏
	$(".main_title_cont h1").click(function(){
		if(state==1){
			var this_index=$(this).index();
			$(".main_title_cont h1").eq(this_index).addClass('main_title_cont_on').siblings('').removeClass('main_title_cont_on');
			history.pushState(history.state,"","?page=1&pageIndentOrderStatus="+this_index);
			show(1,this_index,1,1);
		}	
	})
})
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
}
var state=1;
//获取订单
function show(page,pageIndentOrderStatus,states,Reset){
	if(state==1){
		state=2;
		on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'/indent/queryAllIndentInfo',
			data: {
				token:$.cookie("login_on"),
				pageIndentOrderStatus:pageIndentOrderStatus,
				pageNo:page,
				pageSize:5
			},
			dataType: 'json',
			success:function(e){
				showlist(e,pageIndentOrderStatus);//渲染列表内容
				if(Reset==1){
					$(".main_Pagination").html("");//清空分页列表
					if(e.indentList.length>0 && Math.ceil(e.totalCount/5)>0 && Reset==1){
						$('.main_Pagination').paging({
				            initPageNo: page, // 初始页码
				            totalPages: Math.ceil(e.totalCount/5), //总页数
				            slideSpeed: 600, // 缓动速度。单位毫秒
				            jump: true, //是否支持跳转
				            // 回调函数
				            callback: function(page){
				            	if(states == 1){
									states = 2 
				            	}else if(states == 2){
				            		history.pushState(history.state,"","?page="+page+"&pageIndentOrderStatus="+pageIndentOrderStatus)
				            		show(page,pageIndentOrderStatus,1,2)
				            	}
				            }
			        	})
					}
				}
			},
			error:function(e){
				down_Loading();
				meg("提示","未成功连接服务器，请稍后重试","body")
			}
		})
	}
		
}
//展示订单
function showlist(e,pageIndentOrderStatus){
	var str = ""
	if(e.indentList.length>0){
		var position=$.cookie("position");//商户定位
		for(var i=0;i<e.indentList.length;i++){
			var data = e.indentList[i];
			str+='<div class="main_cont">'+
				'<div class="main_cont_nav"></div>'+
				'<ul class="main_cont_title">'+
					'<li>状态</li>'+
					'<li>日期</li>'+
					''+(position==1?'<li>新人姓名</li>':'<li>订单商家</li>')+''+
					'<li>负责人</li>'+
					'<li>电话</li>'+
					'<li>仪式酒店</li>'+
					'<li>订单来源</li>'+
					'<li>备注</li>'+
					'<li>操作</li>'+
				'</ul>'+
				'<div class="main_cont_list SupMain_cont_list">'+
					'<ul>'+
						'<li><p>'+(data.indentOrderStatus==0?'预定':data.indentOrderStatus==1?'跟单':data.indentOrderStatus==2?'执行':data.indentOrderStatus==3?'完成':'暂无')+'</p></li>'+
						'<li><p>'+data.indentTime.split(" ")[0]+'</p></li>'+
						'<li><p>'+(position==1?'<h4>新娘：'+data.indentBrideName+'<br>'+data.indentBridePhone+'<br>新郎：'+data.indentBridegroomName+'<br>'+data.indentBridegroomPhone+'</h4>':'<li>'+data.indentOrderMerchant+'</li>')+'</p></li>'+
						'<li><p>'+data.indentPrincipal+'</p></li>'+
						'<li><p>'+data.indentPrincipalPhone+'</p></li>'+
						'<li><p>'+data.indentRitualHotel+'</p></li>'+
						'<li><p>'+data.indentBusiness+'</p></li>'+
						'<li><div class="Remarks"><div class="Remarks_cont"><div class="Remarks_text">'+(data.indentRemarks==""?'暂无':data.indentRemarks)+'</div></div></div></li>'+
						'<li>'+
							'<button onclick="ModifyOrder('+data.indentId+')">查看订单</button>'+
							'<button onclick="DeleteOrder('+data.indentId+')">删除订单</button>'+
						'</li>'+
					'</ul>'+
				'</div>'+
			'</div>';
		}
	}else{
		str="当前暂无订单";
	}
	$(".main_info").html(str);
	down_Loading();
	state=1;
}
OrderQuantity()
//订单数量
function OrderQuantity(){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/indent/queryIndentNo',
		data: {token:$.cookie("login_on")},
		dataType: 'json',
		success:function(e){
			var str = [e.fullOrder,e.haveInHand,e.orderCompletion];
			for(var i=0;i<$(".main_title_cont h1").length;i++){
				$(".main_title_cont h1").eq(i).find("span").html("("+str[i]+")");
			}
		}
	})
}
//删除订单
//indentNos==>>订单id
function DeleteOrder(indentNos){
	meg2("提示","是否确认删除此订单","body",onDeleteOrder)
	function onDeleteOrder(){
		$.ajax({
			type: 'POST',
			url: apiUrl+'/indent/delIndent',
			data: {indentNos:indentNos},
			dataType: 'json',
			success:function(e){
				if(e.status==200){
					meg("提示","删除成功","body")
				}else{
					meg("提示","删除失败","body")
				}
			},
			error:function(){
				meg("提示","未成功连接服务器,请稍后重试","body")
			}
		})
	}
}
//修改订单
function ModifyOrder(indentNos){
	if($.cookie("position")==1){
		window.location.href="u_EditWeddingOrder_Details.html?id="+indentNos
	}else if($.cookie("position")==2 || $.cookie("position")==3){
		window.location.href="u_EditSupplierOrder_Details.html?id="+indentNos
	}
}
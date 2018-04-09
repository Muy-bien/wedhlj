//导航栏默认选中
$(document).ready(function(){
	on_Loading()
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
	$(".main_st_01").click(function(){
		$(this).addClass('main_st_on').siblings('').removeClass('main_st_on')
	})
	$(".main_st_02").click(function(){
		$(this).addClass('main_st_on').siblings('').removeClass('main_st_on')
	})
	var username = $.cookie("user");
	if($.cookie("h_position") == "1"){
		$.ajax({
			type: 'POST',
			url: apiUrl+'wedding/select',
			dataType: 'json',
			data: {username:username},
			success:function(e){
				var wedding = e.wedding;
				if(wedding.wLogo){
					$(".main_Avatar_img div img").attr("src",wedding.wLogo);
				}
				$(".main_Avatar_user span").text(wedding.wName)
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
	}else if($.cookie("h_position") == "2"){
		$.ajax({
			type: 'POST',
			url: apiUrl+'team/selectOne',
			dataType: 'json',
			data: {username:username},
			success:function(e){
				var merchant = e.team;
				$(".main_Avatar_img div img").attr("src",merchant.tLogo);
				$(".main_Avatar_user span").text(merchant.tName);
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
	}else if($.cookie("h_position") == "3"){
		$.ajax({
			type: 'POST',
			url: apiUrl+'merchant/select',
			dataType: 'json',
			data: {username:username},
			success:function(e){
				var merchant = e.merchant;
				$(".main_Avatar_img div img").attr("src",merchant.mLogo);
				$(".main_Avatar_user span").text(merchant.mName)
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
	}
		
	//点击我竞标的任务
	$(".yourTask").click(function(){
		$(this).addClass("main_st_on").siblings().removeClass("main_st_on");
		competitiveOneself(username,"全部");
	})
	//点击我发布的任务
	$(".myTask").click(function(){
		$(this).addClass("main_st_on").siblings().removeClass("main_st_on");
		checkedTaskOneself(username,"全部");
	})
	//点击我的订单
	selectOrderByType(username,'全部');//页面刷新
	$(".myOrder").click(function(){
		$(this).addClass("main_st_on").siblings().removeClass("main_st_on");
		selectOrderByType(username,'全部');
	})
	//点击我接受的订单
	$(".yourOrder").click(function(){
		$(this).addClass("main_st_on").siblings().removeClass("main_st_on");
		TheOrderIAccept(username);
	})
	//点击订单类型
	$(".thistype li").click(function(){
		$(this).parent().prev().html($(this).html());
	})
})
var state = 1;
//竞标的任务：/task/competitiveOneself username
function competitiveOneself(myusername,mystatus){
		on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'task/competitiveOneself',
			dataType: 'json',
			data: {username:myusername,status:mystatus},
			success:function(e){
				var listTask=e.listTask;
				var titleHtml='';
				titleHtml+=''+
					'<p>任务ID</p>|'+
					'<p>对接人</p>|'+
					'<p>联系电话</p>|'+
					'<p>所属公司</p>|'+
					'<p>执行日期</p>|'+
					'<div class="orderStatus">'+
						'<p>任务状态</p>'+
						'<ul class="status status_x10">'+
							'<li>全部</li>'+
							'<li>竞标中</li>'+
							'<li>竞标成功</li>'+
							'<li>缴纳保证金中</li>'+
							'<li>执行中</li>'+
							'<li>尾款结算</li>'+
							'<li>完成</li>'+
						'</ul>'+
					'</div>|'+
					'<p>任务详情</p>';
				$(".main_Attributes").html(titleHtml);
				//选择订单状态
				if(state==1){
					state=2;
					$(".status_x10 li").click(function(){
						if($(this).html()=="全部"){
							$(".orderStatus p").html("竞标任务状态");
						}else{
							$(".orderStatus p").html($(this).html());
						}
						competitiveOneselfStatus(username,$(this).html());
					})
				}

				if(listTask){
					var taskDetail="";
					for(var i=0;i<listTask.length;i++){
						//tId
						taskDetail+='<div class="main_Details_cont">'+
							'<div>'+listTask[i].tId+'</div>';
						//判断是否竞标成功，决定是否显示联系人姓名和方式
						if(listTask[i].tStatus=='竞标中'){
							taskDetail+='<div>***</div>'+
								'<div>***********</div>';
						}else{
							taskDetail+='<div>'+listTask[i].contactname+'</div>'+
								'<div>'+listTask[i].contactphone+'</div>';
						}
						taskDetail+='<div>'+listTask[i].cpName+'</div>'+
							'<div>'+listTask[i].entrancetime+'</div>'+
							'<div>'+listTask[i].tStatus+'</div>';
							if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
								taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}else{
								taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail_YF.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}
						taskDetail+='</div> ';
					}
					$(".main_Details").html(taskDetail);
				}else{
					$(".main_Details").html('<div class="main_Details_cont">您还没有竞标过的任务</div>')
				}
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
}
//我发布的任务:/task/ checkedTaskOneself
function checkedTaskOneself(myusername,mystatus){
	on_Loading();
	$.ajax({
		type: 'POST',
		url: apiUrl+'/task/checkedTaskOneself',
		dataType: 'json',
		data: {username:myusername,status:mystatus},
		success:function(e){
			var listTask=e.listTask;
			var titleHtml='';
				titleHtml+=''+
					'<p>任务ID</p>|'+
					'<p>对接人</p>|'+
					'<p>联系电话</p>|'+
					'<p>所属公司</p>|'+
					'<p>执行日期</p>|'+
					'<div class="orderStatus">'+
						'<p>任务状态</p>'+
						'<ul class="status status_x20">'+
							'<li>全部</li>'+
							'<li>竞标中</li>'+
							'<li>竞标成功</li>'+
							'<li>缴纳保证金中</li>'+
							'<li>执行中</li>'+
							'<li>尾款结算</li>'+
							'<li>完成</li>'+
						'</ul>'+
					'</div>|'+
					'<p>任务详情</p>';
				$(".main_Attributes").html(titleHtml);
			//选择订单状态
			if(state==1){
				state=2;
				$(".status_x20 li").click(function(){
					if($(this).html()=="全部"){
						$(".orderStatus p").html("任务状态");
					}else{
						$(".orderStatus p").html($(this).html());
					}
					checkedTaskOneselfStatus(username,$(this).html());
				})
			}
			if(listTask.length){
				var taskDetail="";
				for(var i=0;i<listTask.length;i++){
					//tId
					taskDetail+='<div class="main_Details_cont">'+
						'<div>'+listTask[i].tId+'</div>';
					//判断是否竞标成功，决定是否显示联系人姓名和方式
					if(listTask[i].tStatus=='竞标中'){
						taskDetail+='<div>***</div>'+
							'<div>***********</div>';
					}else{
						//竞标成功就显示联系人姓名和方式
						taskDetail+='<div>'+listTask[i].contactname+'</div>'+
							'<div>'+listTask[i].contactphone+'</div>';
					}
					taskDetail+='<div>本公司</div>'+
						'<div>'+listTask[i].entrancetime+'</div>'+
						'<div>'+listTask[i].tStatus+'</div>';
						if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
							taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}else{
							taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}
					taskDetail+='</div> ';
				}
				$(".main_Details").html(taskDetail);
			}else{
				$(".main_Details").html('<div class="main_Details_cont">您还没有发布的任务</div>')
			}
			down_Loading();
		},
		error:function(){
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body');
		}
	})
}
//竞标的任务：选择任务状态发送ajax 请求
function competitiveOneselfStatus(myusername,mystatus){
		on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'/task/competitiveOneself',
			dataType: 'json',
			data: {username:myusername,status:mystatus},
			success:function(e){
				var listTask=e.listTask;
				down_Loading();
				if(listTask.length){
					var taskDetail="";
					for(var i=0;i<listTask.length;i++){
						//tId
						taskDetail+='<div class="main_Details_cont">'+
							'<div>'+listTask[i].tId+'</div>';
						//判断是否竞标成功，决定是否显示联系人姓名和方式
						if(listTask[i].tStatus=='竞标中'){
							taskDetail+='<div>***</div>'+
								'<div>***********</div>';
						}else{
							taskDetail+='<div>'+listTask[i].contactname+'</div>'+
								'<div>'+listTask[i].contactphone+'</div>';
						}
							
						taskDetail+='<div>'+listTask[i].cpName+'</div>'+
							'<div>'+listTask[i].entrancetime+'</div>'+
							'<div>'+listTask[i].tStatus+'</div>';
							if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
								taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}else{
								taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail_YF.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
							}
						taskDetail+='</div> ';
					}
					$(".main_Details").html(taskDetail);
					state=1;
				}else{
					$(".main_Details").html('<div class="main_Details_cont">该区域没有任何竞标任务</div>');
					state=1;
				}
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
}
//我发布的任务：选择任务状态发送ajax 请求
function checkedTaskOneselfStatus(myusername,mystatus){
	on_Loading();
	$.ajax({
		type: 'POST',
		url: apiUrl+'/task/checkedTaskOneself',
		dataType: 'json',
		data: {username:myusername,status:mystatus},
		success:function(e){
			var listTask=e.listTask;
			down_Loading();
			if(listTask.length){
				var taskDetail="";
				for(var i=0;i<listTask.length;i++){
					//tId
					taskDetail+='<div class="main_Details_cont">'+
						'<div>'+listTask[i].tId+'</div>';
					//判断是否竞标成功，决定是否显示联系人姓名和方式
					if(listTask[i].tStatus=='竞标中'){
						taskDetail+='<div>***</div>'+
							'<div>***********</div>';
					}else{
						taskDetail+='<div>'+listTask[i].contactname+'</div>'+
							'<div>'+listTask[i].contactphone+'</div>';
					}
					taskDetail+='<div>本公司</div>'+
						'<div>'+listTask[i].entrancetime+'</div>'+
						'<div>'+listTask[i].tStatus+'</div>';
						if(listTask[i].tStatus=='执行中'||listTask[i].tStatus=='尾款结算'||listTask[i].tStatus=='完成'){
							taskDetail+='<div class="main_Details_but"><a href="b_TaskToOrderDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}else{
							taskDetail+='<div class="main_Details_but"><a href="b_TaskStateDetail.html?tid='+listTask[i].tId+'"" target="_blank">查看</a></div>';
						}
					taskDetail+='</div> ';
				}
				$(".main_Details").html(taskDetail);
				state=1;
			}else{
				$(".main_Details").html('<div class="main_Details_cont">该区域没有我发布的任务</div>');
				state=1;
			}
			down_Loading();
		},
		error:function(){
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body');
		}
	})
}
//我的订单/order/ selectOrderByType username, type//type
function selectOrderByType(myusername,mytype,mystatus){
	on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'/order/selectOrderByType',
			dataType: 'json',
			data: {username:myusername,type:mytype,status:mystatus},
			success:function(e){
				var s_arr = [];
				var s_arr_new = [];
				var s_new_li = '<li>全部</li>';
				//循环出当前有的所有状态
				for(var i=0;i<e.orderList.length;i++){
					s_arr.push(e.orderList[i].oStatus);
				}
				//筛选出不重复的
				for(var s=0;s<s_arr.length;s++) {
				　　var items=s_arr[s];
				　　if($.inArray(items,s_arr_new)==-1) {
						s_arr_new.push(items);
				　　}
				}
				
				if(s_arr_new.length > 1){
					for(var p=0;p<s_arr_new.length;p++){
						s_new_li+='<li>'+s_arr_new[p]+'</li>'
					}
				}else{
					s_new_li="";
				}
					
				var titleHtml='';
				if(mytype == "全部"){
					var mytype_html = "订单类型";
				}else{
					var mytype_html = mytype;
				}
				//订单详情
				titleHtml+='<p>订单ID</p>|'+
					'<div class="orderStatus">'+
						'<p>'+mytype_html+'</p>'+
						'<ul class="status thistype">'+
							'<li>全部</li>'+
							'<li>任务订单</li>'+
							'<li>商品订单</li>'+
						'</ul>'+
					'</div>|'+
					'<p>订单金额</p>|'+
					'<p>订单描述</p>|'+
					'<p>执行日期</p>|'+
					'<div class="orderStatus">'+
						'<p>订单状态</p>'+
						'<ul class="status thisstatus">'+s_new_li+'</ul>'+
					'</div>|'+
					'<p>详情</p>';
				$(".main_Attributes").html(titleHtml);
				//点击订单类型
				$(".thistype li").click(function(){
					selectOrderByType(myusername,$(this).text(),'全部');
				})
				//点击订单状态
				$(".thisstatus li").click(function(){
					selectOrderByTypeStatus(e,$(this).text())
				})
				OrderContentRendering(e);//商品订单内容渲染
			},
			error:function(){
				down_Loading();
				meg('提示','当前网络不畅通,请检查您的网络','body');
			}
		})
}
//我的订单 选择类型 选择状态
function selectOrderByTypeStatus(e,this_text){
	var orderList=e.orderList;
	var orderDetail="";
	if(this_text != "全部"){
		for(var i=0;i<orderList.length;i++){
			if(this_text == orderList[i].oStatus){
				//订单类型 订单详情页
				var ordername = orderList[i].oOrdername;
				var type = "";
				var hrefInfo = "";
				if(ordername.indexOf("商品订单") >= 0){
					type = "商品订单";
					hrefInfo = "b_OrderDetails_sp.html?oId=";
				}else if(ordername.indexOf("任务订单") >= 0){
					type = "任务订单";
					hrefInfo = "b_orderDetail.html?oId=";
				}else if(ordername.indexOf("尾款订单") >= 0){
					if(ordername.indexOf("任务") >= 0){
						type = "任务尾款订单";
						hrefInfo = "b_orderDetail.html?oId=";
					}else if(ordername.indexOf("商品") >= 0){
						type = "商品尾款订单";
						hrefInfo = "b_OrderDetails_sp.html?oId=";
					}	
				}else if(ordername.indexOf("保证金订单") >= 0){
					type = "保证金订单";
					hrefInfo = "b_orderDetail.html?oId=";
				}
				orderDetail+='<div class="main_Details_cont">'+
					'<div>'+orderList[i].oOrderid+'</div>'+
					'<div>'+type+'</div>'+
					'<div>'+orderList[i].oAmount+'</div>'+
					'<div title="'+orderList[i].oProductdesc+'">'+orderList[i].oProductdesc+'</div>'+
					'<div>'+orderList[i].starttime+'</div>'+
					'<div>'+orderList[i].oStatus+'</div>'+
					'<div class="main_Details_but"><a href="'+hrefInfo+orderList[i].oOrderid+'" target="_blank">查看</a></div>'+
				'</div>';
			}
		}
		$(".main_Details").html(orderDetail);
	}else{
		OrderContentRendering(e)
	}
}
//商品订单内容渲染
function OrderContentRendering(e){
	var orderList=e.orderList;
	var orderDetail="";
	if(orderList.length){
		for(var i=0;i<orderList.length;i++){
			//订单类型 订单详情页
			var ordername = orderList[i].oOrdername;
			var type = "";
			var hrefInfo = "";
			if(ordername.indexOf("商品订单") >= 0){
				type = "商品订单";
				hrefInfo = "b_OrderDetails_sp.html?oId=";
			}else if(ordername.indexOf("任务订单") >= 0){
				type = "任务订单";
				hrefInfo = "b_orderDetail.html?oId=";
			}else if(ordername.indexOf("尾款订单") >= 0){
				if(ordername.indexOf("任务") >= 0){
					type = "任务尾款订单";
					hrefInfo = "b_orderDetail.html?oId=";
				}else if(ordername.indexOf("商品") >= 0){
					type = "商品尾款订单";
					hrefInfo = "b_OrderDetails_sp.html?oId=";
				}	
			}else if(ordername.indexOf("保证金订单") >= 0){
				type = "任务保证金订单";
				hrefInfo = "b_orderDetail.html?oId=";
			}
			orderDetail+='<div class="main_Details_cont">'+
				'<div>'+orderList[i].oOrderid+'</div>'+
				'<div>'+type+'</div>'+
				'<div>'+orderList[i].oAmount+'</div>'+
				'<div title="'+orderList[i].oProductdesc+'">'+orderList[i].oProductdesc+'</div>'+
				'<div>'+orderList[i].starttime+'</div>'+
				'<div>'+orderList[i].oStatus+'</div>'+
				'<div class="main_Details_but"><a href="'+hrefInfo+orderList[i].oOrderid+'" target="_blank">查看</a></div>'+
			'</div>';
		}
		$(".main_Details").html(orderDetail);
	}else{
		$(".main_Details").html('<div class="main_Details_cont">没有符合条件的订单</div>');
	}
	down_Loading();
}
//我接受的订单
function TheOrderIAccept(username){
	on_Loading();
	$.ajax({
		type: 'POST',
		url: apiUrl+'order/selectAllAcceptOrders',
		dataType: 'json',
		data:{username:username},
		success:function(e){
			var arr = [];
			var arr_new = [];
			var new_li = '<li>全部</li>';
			//循环出当前有的所有状态
			for(var i=0;i<e.list.length;i++){
				arr.push(e.list[i].toStatus);
			}
			//筛选出不重复的
			for(var s=0;s<arr.length;s++) {
			　　var items=arr[s];
			　　if($.inArray(items,arr_new)==-1) {
					arr_new.push(items);
			　　}
			}
			if(arr_new.length > 1){
				for(var p=0;p<arr_new.length;p++){
					new_li+='<li>'+arr_new[p]+'</li>'
				}
			}else{
				new_li="";
			}
			$(".main_Attributes").html(
				'<p>订单ID</p>|'+
				'<p>订单类型</p>|'+
				'<p>订单金额</p>|'+
				'<p>订单描述</p>|'+
				'<p>执行日期</p>|'+
				'<div class="orderStatus">'+
					'<p>订单状态</p>'+
					'<ul class="status thisstatus">'+new_li+'</ul>'+
				'</div>|'+
				'<p>详情</p>'
			);
			//我接受的订单列表展示
			AcceptedOrder(e);
			OrderStateSearch(e);
		},
		error:function(){
			down_Loading();
			meg('提示','当前网络不畅通,请检查您的网络','body');
		}
	})
}
//我接受的订单内容渲染
function AcceptedOrder(e){
	var orderDetail="";
	if(e.list.length){
		for(var i=0;i<e.list.length;i++){
			//订单类型 订单详情页
			var list = e.list[i];
			orderDetail+='<div class="main_Details_cont">'+
				'<div>'+list.toOrderid+'</div>'+
				'<div>商品订单</div>'+
				'<div>'+list.toAmount+'</div>'+
				'<div title="'+list.toOrdername+'">'+list.toOrdername+'</div>'+
				'<div>'+list.createtime+'</div>'+
				'<div>'+list.toStatus+'</div>'+
				'<div class="main_Details_but"><a href="b_OrderDetails_accept.html?oId='+list.toOrderid+'" target="_blank">查看</a></div>'+
			'</div>';
		}
		$(".main_Details").html(orderDetail);
	}else{
		$(".main_Details").html('<div class="main_Details_cont">没有符合条件的订单</div>');
	}
	down_Loading();
}
//我接受的订单，订单状态搜索
function OrderStateSearch(e){
	$(".thisstatus li").click(function(){
		var this_text = $(this).text();
		var orderDetail="";
		if($(this).text() != "全部"){
			for(var i=0;i<e.list.length;i++){
				if(e.list[i].toStatus == $(this).text()){
					//订单类型 订单详情页
					var list = e.list[i];
					orderDetail+='<div class="main_Details_cont">'+
						'<div>'+list.toOrderid+'</div>'+
						'<div>商品订单</div>'+
						'<div>'+list.toAmount+'</div>'+
						'<div title="'+list.toOrdername+'">'+list.toOrdername+'</div>'+
						'<div>'+list.createtime+'</div>'+
						'<div>'+list.toStatus+'</div>'+
						'<div class="main_Details_but"><a href="b_OrderDetails_accept.html?oId='+list.toOrderid+'" target="_blank">查看</a></div>'+
					'</div>';
				}
			}
			$(".main_Details").html(orderDetail);
		}else{
			AcceptedOrder(e)
		}
	})
}
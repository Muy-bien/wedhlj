var state=1;
var pageSize=8;
var acceptUserIdTotal;
var haveChooseStatus=1;//是否选择人员或商家的状态
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
})
var taskId=getUrlParam('taskId');
queryTask(taskId)
//查看任务详情/task/queryTask 
 function queryTask(taskId){
 	on_Loading();
 		$.ajax({
				type:"post",
				url: apiUrl+'/task/queryTask',
				data:{taskId:taskId,token:$.cookie('login_on')},
				dataType:'json',
				success:function(e){
					var task=e.task[0];
					//缴纳保证金的数据
					$(".deposit_info_x10 span").html('￥'+e.deposit);
					var makeSureMon=task.takePrice*0.15-e.deposit;
					makeSureMon=makeSureMon.toFixed(2);
					$(".deposit_info_x20 span").html(makeSureMon);
					$('.deposit_but').click(function(){
						console.log(task.payOrderNo.split(',')[0]);
						aliPay(task.payOrderNo.split(',')[0],'婚礼匠任务系统,发布方保证金缴纳',makeSureMon,'')
						//aliPayToTake(task.payOrderNo,'缴纳保证金'+task.payOrderNo,makeSureMon,'婚礼匠任务保证金缴纳');
					})
					//console.log(e.deposit);
					//商家接受的商家id
					var acceptUserId=task.acceptUserId;
					acceptUserIdTotal=acceptUserId;
					//判断是否前去缴纳保证金
					if(task.taskStatus==2){
						$('.givingMoney').css('display','block')
					}else{
						$('.givingMoney').css('display','none')
					}
					if(task.taskStatus==4){
						$('.getMoney').css('display','block')
					}else{
						$('.getMoney').css('display','none')
					}
					if(task.taskStatus==6){
						$('.returnMoney').css('display','block')
					}
					//退保证金
					$('.returnMoney').click(function(){
						returnQueryTask(task.taskId);
					})
					//缴纳尾款
					$('.getMoney').click(function(){
						console.log(task.takePrice);
					
						aliPay(task.payOrderNo.split(',')[2],'婚礼匠任务系统,尾款缴纳',task.takePrice,'',task.taskId)
						//aliPayToTake(task.payOrderNo,'缴纳保证金'+task.payOrderNo,makeSureMon,'婚礼匠任务保证金缴纳');
					})
					//点击缴纳保证金按钮
					$('.givingMoney').click(function(){
						//meg("提示","付款功能正在升级！","body");
						$('.deposit').css('display','block');
						$('.deposit .deposit_title span').click(function(){
							$('.deposit').css('display','none');
						})
					})
					console.log(task.takeType);
					var taskSketch=task.taskSketch;
					//根据任务类型请求竞标人员或者商家信息的查询
					if(task.takeType!='舞美'&&task.takeType!='道具'){
						theBiddingPerson(taskId);
					}else{
						theBiddingMerchant(taskId);
					}
					//竞标数量
					var biddingUsers;
					if(e.biddingUsers){
						biddingUsers=e.biddingUsers.split(',').length;
					}else{
						biddingUsers=0;
					}
					var html='';
					html='<h1>任务需求</h1>'+
						 '<p>任务名称：'+task.takeName+'</p>'+
						 '<p>任务类型：'+task.takeType+'</p>'+
						 '<p>竞标数量：'+biddingUsers+'</p>'+
						 '<p>酒店地址：'+task.hotelAddress.split(',').join('')+'</p>'+
						 '<p>价格：'+task.takePrice+'</p>'+
						 '<p>入场时间：'+task.entranceTime+'</p>'+
						 '<p>入场要求：'+task.takeRequire+'</p>'+
						 '<p>需求描述：</p>'+
						 '<p>'+task.taskDesc+'</p>';
				$(".main_cont_left").html(html);
						if(taskSketch){
							var picHtml='';
							var taskSketch=task.taskSketch.split(',');
							for(var i=0;i<taskSketch.length;i++){
								picHtml+='<li><a href=""><div class="img_auto" style="background-image:url('+apiUrl+taskSketch[i]+')"></div></li>'
							}
						}
					$('.main_cont_right ul').html(picHtml);
					down_Loading();
				},
				error:function(){
 					down_Loading();
					meg("提示","网络开小差，请检查！","body");
				}
		})
 }
 ///task/theBiddingPerson查询竞标任务的人员
 function theBiddingPerson(taskId){
 	on_Loading();
 		$.ajax({
				type:"post",
				url: apiUrl+'/task/theBiddingPerson',
				data:{taskId:taskId},
				dataType:'json',
				success:function(e){
					// 竞标商家数量
					var merchantAndPersonnel=e.merchantAndPersonnel;
					if(merchantAndPersonnel.length>0){
						var html='';
						for(var i=0;i<merchantAndPersonnel.length;i++){
							html+='<div class="compitiveMerchant_content">'+
									'<h1>'+merchantAndPersonnel[i].merchantName+'</h1>'+
									'<div class="compitive_introduce_person">';
							
							var personnelList=merchantAndPersonnel[i].personnelList;
							for(var j=0;j<personnelList.length;j++){
								if(personnelList[j].taskStatus==2||personnelList[j].taskStatus==3||personnelList[j].taskStatus==4){
									html='';
									html+='<div class="compitiveMerchant_content">'+
									'<h1>'+merchantAndPersonnel[i].merchantName+'</h1>'+
									'<div class="compitive_introduce_person">';
									html+=	'<div>'+
												'<a href="b_Preferred_ZCR_Case.html?PersonnelNo='+personnelList[j].personnelNo+'">'+
													//'<img src="'+apiUrl+personnelList[j].headPortait+'" alt="">'+
													'<div class="img_auto" style="background-image:url('+apiUrl+personnelList[j].headPortait+')"></div>'+
												'</a>'+
												'<p class="c_name">'+personnelList[j].name+'</p>'+
												'<p class="c_star">';
												var star=personnelList[j].star;
												for(var n=0;n<star;n++){
													html+='<i></i>';
												}
									html+=		'</p>'+
												'<p class="c_price">￥'+personnelList[j].order_price+' <em>起</em></p>';
												if(personnelList[j].taskStatus<2){
													html+=	'<p class="c_chooseButton" onclick="isClickchoosed('+taskId+','+personnelList[j].id+')">选&nbsp;&nbsp;&nbsp;择<input class="hide" value="'+personnelList[j].id+'"/></p>';
												}else{
													html+=	'<p class="c_chooseButton" >中&nbsp;&nbsp;&nbsp;标</p>';
												}
									html+=	'</div>';
									break;

								}else{

									html+=	'<div>'+
												'<a href="b_Preferred_ZCR_Case.html?PersonnelNo='+personnelList[j].personnelNo+'">'+
													'<div class="img_auto" style="background-image:url('+apiUrl+personnelList[j].headPortait+')"></div>'+
												'</a>'+
												'<p class="c_name">'+personnelList[j].name+'</p>'+
												'<p class="c_star">';
												var star=personnelList[j].star;
												for(var n=0;n<star;n++){
													html+='<i></i>';
												}
									html+=		'</p>'+
												'<p class="c_price">￥'+personnelList[j].order_price+' <em>起</em></p>';
												if(personnelList[j].taskStatus<2){
													html+=	'<p class="c_chooseButton" onclick="isClickchoosed('+taskId+','+personnelList[j].id+')">选&nbsp;&nbsp;&nbsp;择<input class="hide" value="'+personnelList[j].id+'"/></p>';
												}else{
													html+=	'<p class="c_chooseButton" >中&nbsp;&nbsp;&nbsp;标</p>';
												}
									html+=	'</div>'
								}



							}
							html+='</div>'+
								'</div> '+
								'<div class="hr"></div>';
						}
						$('.aboutPerson').html(html);
					}else{
						$('.noneList').css('display','block');
					}
					down_Loading();
				},
				error:function(){
 					down_Loading();
					meg("提示","网络开小差，请检查！","body");
				}
		})
 }
 //点击选择按钮，是否与该人员或者商家合作
function isClickchoosed(taskId,userId){
		acceptPerson(taskId,userId);
}
function acceptUsee(taskId,userId){
		acceptPerson(taskId,userId);
}
 ///task/theBiddingMerchant查询竞标任务的商家 
 function theBiddingMerchant(taskId){
 	on_Loading();
 		$.ajax({
				type:"post",
				url: apiUrl+'/task/theBiddingMerchant',
				data:{taskId:taskId},
				dataType:'json',
				success:function(e){
					var merchantList=e.merchantList;
					var html='';
					for(var i=0;i<merchantList.length;i++){
						if(merchantList[i].userId==acceptUserIdTotal){
							html='';
							html+='<div>'+
									'<a href="b_Supermarket_FWS.html?id='+merchantList[i].mId+'&type='+merchantList[i].mType+'">'+
										//'<img src="'+apiUrl+merchantList[i].mLogo+'" alt="">'+
										'<div class="img_auto" style="background-image:url('+apiUrl+merchantList[i].mLogo+')"></div>'+
									'</a>'+
									'<p class="c_name">'+merchantList[i].mName+'</p>'+
									'<p class="c_chooseButton" onclick="acceptUsee('+taskId+','+merchantList[i].mId+')">中&nbsp;&nbsp;&nbsp;标<input class="hide" value="'+merchantList[i].id+'"/></p>'+
								'</div>';
								break;
						}else{
						html+='<div>'+
								'<a href="b_Supermarket_FWS.html?id='+merchantList[i].mId+'&type='+merchantList[i].mType+'">'+
									//'<img src="'+apiUrl+merchantList[i].mLogo+'" alt="">'+
									'<div class="img_auto" style="background-image:url('+apiUrl+merchantList[i].mLogo+')"></div>'+
								'</a>'+
								'<p class="c_name">'+merchantList[i].mName+'</p>'+
								'<p class="c_chooseButton" onclick="acceptUsee('+taskId+','+merchantList[i].mId+')">选&nbsp;&nbsp;&nbsp;择<input class="hide" value="'+merchantList[i].id+'"/></p>'+
							'</div>'

						}

					}
					$('.aboutDanceAndTool').html(html);
					down_Loading();
				},
				error:function(){
 					down_Loading();
					meg("提示","网络开小差，请检查！","body");
				}
		})
 }
 ///task/acceptPerson选择接受任务的人员
 function acceptPerson(taskId,userId){
 	on_Loading();
 		$.ajax({
				type:"post",
				url: apiUrl+'/task/acceptPerson',
				data:{taskId:taskId,userId:userId},
				dataType:'json',
				success:function(e){
					if(e.status==200){
						meg2("提示","是否确定选择该人员或商家？","body",reload)
					}else{
						meg2("提示","人员或者商家选择失败，请联系客服！","body",reload)
					}
					down_Loading();
				},
				error:function(){
 					down_Loading();
					meg("提示","网络开小差，请检查！","body");
				}
		})
 }
 ///task/acceptUsee选择接受任务的商家
 function acceptUsee(taskId,userId){
 	on_Loading();
 		$.ajax({
				type:"post",
				url: apiUrl+'/task/acceptUsee',
				data:{taskId:taskId,userId:userId},
				dataType:'json',
				success:function(e){
					if(e.status==200){
						meg2("提示","是否确定选择该人员或商家？","body",reload)
					}else{
						meg2("提示","人员或者商家选择失败，请联系客服！","body",reload)
					}
					down_Loading();
				},
				error:function(){
 					down_Loading();
					meg("提示","网络开小差，请检查！","body");
				}
		})
 }
 //退回上一个页面
 function backToLast(){
 	window.history.go(-1);
 }

///pay/aliPayToTake支付的接口
///WIDout_trade_no:商户订单号
///WIDsubject:订单名称
///WIDtotal_amount:付款金额
///WIDbody:商品描述
function aliPayToTake(WIDout_trade_no,WIDsubject,WIDtotal_amount,WIDbody){
	on_Loading();
	$.ajax({
			type:"post",
			url: apiUrl+'/pay/aliPayToTake',
			data:{WIDout_trade_no:WIDout_trade_no,WIDsubject:WIDsubject,WIDtotal_amount:WIDtotal_amount,WIDbody:WIDbody},
			dataType:'text',
			success:function(e){
					down_Loading();
					$('body').html(e);
			},
			error:function(){
					down_Loading();
				meg("提示","网络开小差，请检查！","body");
			}
		})
}

// 支付宝支付/pay/aliPay
// WIDout_trade_no:商品订单号
// WIDsubject:商品说明
// WIDtotal_amount：付款金额
// WIDbody;商品描述（可空）
function aliPay(WIDout_trade_no,WIDsubject,WIDtotal_amount,WIDbody,taskId){
	if(taskId){
		var date=new Date(); 
		date.setTime(date.getTime()+30*60*1000); //设置date为当前时间+30分
		document.cookie="taskId="+taskId+"; expires="+date.toGMTString(); //将date赋值给expires
		//$.cookie("taskId",taskId,{expires:date.toGMTString()});// 存储一个30分钟期限的 cookie
	}
	$.ajax({
			type:"post",
			url: apiUrl+'/pay/aliPay',
			data:{WIDout_trade_no:WIDout_trade_no,WIDsubject:WIDsubject,WIDtotal_amount:WIDtotal_amount,WIDbody:WIDbody},
			dataType:'text',
			success:function(e){
					$('body').html(e);
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
}

//aliRefund(WIDTRout_trade_no,WIDTRtrade_no,WIDTRrefund_amount,WIDTRrefund_reason)
function returnQueryTask(taskId){
	$.ajax({
			type:"post",
			url: apiUrl+'/task/queryTask',
			data:{taskId:taskId},
			dataType:'json',
			success:function(e){
					var task=e.task;
					var payOrderNo=task[0].payOrderNo.split(',');
					var paymentNo=task[0].paymentNo.split(',');
					var turnMoney=task[0].takePrice*0.15;
					aliRefund(payOrderNo[0],paymentNo[0],turnMoney,'交易完成');
					aliRefund(payOrderNo[1],paymentNo[1],turnMoney,'交易完成');
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
}
///pay/aliRefund
//WIDTRout_trade_no：商户订单号
//WIDTRtrade_no：支付宝交易号
//WIDTRrefund_amount：需退款金额
///WIDTRrefund_reason:退款原因
function aliRefund(WIDTRout_trade_no,WIDTRtrade_no,WIDTRrefund_amount,WIDTRrefund_reason){
	$.ajax({
			type:"post",
			url: apiUrl+'/pay/aliRefund',
			data:{WIDTRout_trade_no:WIDTRout_trade_no,WIDTRtrade_no:WIDTRtrade_no,WIDTRrefund_amount:WIDTRrefund_amount,WIDTRrefund_reason:WIDTRrefund_reason},
			dataType:'text',
			success:function(e){
				meg("提示","退款成功","body",turnToNewPage);
				function turnToNewPage(){
					location.href="u_PersonalCenter.html";
				}
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
}
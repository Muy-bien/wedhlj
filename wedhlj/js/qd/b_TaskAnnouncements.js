$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");	
	//接收URL中的参数taskId
	var taskId=getUrlParam("taskId");
	queryTask(taskId);
	//发送请求
	// var postdata={tid:tid} 
	// $.ajax({
	// 		type:"post",
	// 		url: apiUrl+'/task/selectById',
	// 		dataType: 'json',
	// 		data: postdata,
	// 		success:function(e){
	// 			var task=e.task;
	// 			console.log(task);
	// 			var hoteladdress=task.hoteladdress.split(",").join('');
	// 			//将方案草图切成数组
	// 			var tSketch=task.tSketch.split(",");
	// 			//任务类型
	// 			taskType=task.tType;
	// 			var detailLeft="";
	// 			var detailRight="";
	// 		//任务声明左边
	// 			detailLeft+='<h1>任务需求</h1>'+
	// 				'<p>任务名称：'+task.tName+'</p>'+
	// 				'<p>任务类型：'+task.tType+'</p>'+
	// 				'<p>竞标数量：'+task.competitivenum+'</p>'+
	// 				'<p>酒店地址：'+hoteladdress+'</p>'+
	// 				'<p>价格：'+task.maxprice+'</p>'+
	// 				'<p>入场时间：'+task.entrancetime+'</p>'+
	// 				'<p>入场要求：'+task.tRequire+'</p>'+
	// 				'<p>需求描述：</p>'+
	// 				'<p>'+task.tDesc+'</p>';
	// 			$(".main_cont_left").html(detailLeft);
	// 		//任务声明右边
	// 			// detailRight+='<li><a href=""><img src="images/index/originality_gathered_pic02.png" alt=""></a></li>';
	// 			for(var i=0;i<tSketch.length;i++){
	// 				detailRight+='<li><div class="img_auto" style="background-image:url('+tSketch[i]+')"></div></li>';
	// 			}
	// 			$(".main_cont_right ul").html(detailRight);
	// 		},
	// 		error:function(){
	// 			meg("提示","网络开小差，请检查！","body")
	// 		}
	// 	})
	// 	
	//页面跳转
	// $(".competition").click(function(){
	// 		$.ajax({
	// 			type:"post",
	// 			url: apiUrl+'/task/competitive',
	// 			data:{tid:tid,username:username},
	// 			dataType:'json',
	// 			success:function(e){
	// 				console.log(e);
	// 				if(e.status==200){
	// 					meg("提示","竞标中","body",compitive);
	// 				}else if(e.status==400){
	// 					meg("提示","您不符合竞标要求！","body");
	// 				}else if(e.status==300){
	// 					meg("提示","您已经竞标过该任务！","body",doThing);
	// 					function doThing(){
	// 						window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
	// 					}
	// 				}
	// 			},
	// 			error:function(){
	// 				meg("提示","网络开小差，请检查！","body");
	// 			}
	// 		})
	// 	function compitive(){
	// 		if(taskType=="舞美租赁"||taskType=="道具租赁"){
	// 			window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
	// 		}else{
	// 			window.location.href="b_TaskChooseOurPostPerson.html?tid="+tid+"";
	// 		}
	// 	}
	// })
})
// ///task/merchantInfo
// function merchantInfo(tid,username){
// 	$.ajax({
// 				type:"post",
// 				url: apiUrl+'/task/competitive',
// 				data:{tid:tid,username:username},
// 				dataType:'json',
// 				success:function(e){
// 					console.log(e);
// 					window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
// 				},
// 				error:function(){
// 					meg("提示","网络开小差，请检查！","body");
// 				}
// 		})
// }
//查看任务详情/task/queryTask 
 function queryTask(taskId){
 	on_Loading();
 		$.ajax({
				type:"post",
				url: apiUrl+'/task/queryTask',
				data:{taskId:taskId},
				dataType:'json',
				success:function(e){
					console.log(e);
					var task=e.task[0];
					var html='';
					html='<h1>任务需求</h1>'+
						 '<p>任务名称：'+task.takeName+'</p>'+
						 '<p>任务类型：'+task.takeType+'</p>'+
						 '<p>酒店地址：'+task.hotelAddress.split(',').join('')+'</p>'+
						 '<p>价格：'+task.takePrice+'</p>'+
						 '<p>入场时间：'+task.entranceTime+'</p>'+
						 '<p>入场要求：'+task.takeRequire+'</p>'+
						 '<p>需求描述：</p>'+
						 '<p>'+task.taskDesc+'</p>';
				$(".main_cont_left").html(html)
				var taskSketch=task.taskSketch.split(',');
				var picHtml='';
					for(var i=0;i<taskSketch.length;i++){
						console.log(taskSketch[i]);
						if(taskSketch[i]==null||taskSketch[i]=='null'){

						}else{
							picHtml+='<li><a href=""><img src="'+apiUrl+taskSketch[i]+'" alt=""></a></li>'
						}
					}
					$('.main_cont_right ul').html(picHtml);

				//页面跳转
				$(".competition").click(function(){
					console.log(e.merchantType);
					console.log(task.takeType);
					if(e.merchantType!=task.takeType){
						meg("提示","您不符合竞标要求！","body",backToLast);
					}else if(e.userId==task.releaseUserId){
						meg("提示","您不符合竞标要求！","body",backToLast);
					}else if(task.biddingUsers){
						var biddingUsers=task.biddingUsers.split(',');
						for(var j=0;j<biddingUsers.length;j++){
							if(biddingUsers[j]==e.userId){
								meg("提示","您已经竞标过该任务！","body",doThing)
							}else{
								meg("提示","竞标中！","body",doThing)
							}
						}
					}else if(!task.biddingUsers){
						meg("提示","竞标中！","body",doThing)
					}
						// $.ajax({
						// 	type:"post",
						// 	url: apiUrl+'/task/competitive',
						// 	data:{tid:tid,username:username},
						// 	dataType:'json',
						// 	success:function(e){
						// 		console.log(e);
						// 		if(e.status==200){
						// 			meg("提示","竞标中","body",compitive);
						// 		}else if(e.status==400){
						// 			meg("提示","您不符合竞标要求！","body");
						// 		}else if(e.status==300){
						// 			meg("提示","您已经竞标过该任务！","body",doThing);
						// 			function doThing(){
						// 				window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
						// 			}
						// 		}
						// 	},
						// 	error:function(){
						// 		meg("提示","网络开小差，请检查！","body");
						// 	}
						// })
					// function compitive(){
					// 	if(taskType=="舞美租赁"||taskType=="道具租赁"){
					// 		window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
					// 	}else{
					// 		window.location.href="b_TaskChooseOurPostPerson.html?tid="+tid+"";
					// 	}
					// }
				})
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
 function doThing(){
	window.location.href="b_TaskStateDetail_YF.html?tid="+tid+"";
}
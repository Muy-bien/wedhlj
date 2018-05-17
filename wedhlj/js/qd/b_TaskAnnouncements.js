$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");	
	//接收URL中的参数taskId
	var taskId=getUrlParam("taskId");
	queryTask(taskId);
})
//竞标/task/theBidding
function theBidding(token,taskId){
	$.ajax({
			type:"post",
			url: apiUrl+'/task/theBidding',
			data:{token:token,taskId:taskId},
			dataType:'json',
			success:function(e){
				console.log(e);
				if(e.status==200){
					meg("提示","竞标中！","body",propDance);
				}
				function propDance(){
				 	window.location.href="b_TaskStateDetail_YF.html?taskId="+taskId+"";
				}
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
}
//查看任务详情/task/queryTask 
 function queryTask(taskId){
 	on_Loading();
 		$.ajax({
				type:"post",
				url: apiUrl+'/task/queryTask',
				data:{taskId:taskId,token:$.cookie('login_on')},
				dataType:'json',
				success:function(e){
					console.log(e);
					var task=e.task[0];
					var taskSketch=task.taskSketch;
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
				$(".main_cont_left").html(html);
						if(taskSketch){
							var picHtml='';
							var taskSketch=taskSketch.split(',');
							console.log(taskSketch);
							for(var i=0;i<taskSketch.length;i++){
								picHtml+='<li><div class="img_auto" style="background-image:url('+apiUrl+taskSketch[i]+')"></div></li>'
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
									meg("提示","您已经竞标过该任务！","body",doThing);
									 function haveComplete(){
										window.location.href="b_TaskStateDetail_YF.html?taskId="+taskId+"";
									}
								}else{
									if(task.takeType=="舞美"||task.takeType=="道具"){
										theBidding($.cookie('login_on'),taskId);
									}else{
									  meg("提示","竞标中！","body",compitive)
									}
								}
							}
						}else if(!task.biddingUsers){
							if(task.takeType=="舞美"||task.takeType=="道具"){
								theBidding($.cookie('login_on'),taskId);
							}else{
								meg("提示","竞标中！","body",compitive);
							}
						}
				})


				//跳转到进度条页面
					 function doThing(){
						window.location.href="b_TaskStateDetail_YF.html?taskId="+task.taskId+"";
					}
					function compitive(){
						if(task.takeType=="舞美"||task.takeType=="道具"){
							window.location.href="b_TaskStateDetail_YF.html?taskId="+task.taskId+"";
						}else{
							window.location.href="b_TaskChooseOurPostPerson.html?taskId="+task.taskId+"";
						}
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




//导入信息
$(document).ready(function(){
	// 日历插件
	$('#ca').calendar({
        width: 520,
        height: 520	,
        data: [//多事件之间用 ; 分开
			{
			  date: '2015/12/24',
			  value: 'Christmas Eve'
			},
			{
			  date: '2015/12/25',
			  value: 'Merry Christmas'
			},
			{
			  date: '2016/01/01',
			  value: 'Happy New Year'
			},
			{
			  date: '2018/10/04',
			  value: 'could you marry me'
			},
			{
			  date: '2018/04/12',
			  value: '杨勇，你，这个小坟蛋！;杨勇，你，去吃冰冰凉'
			}
		],
        onSelected: function (view, date, data) {
           // detail day
            console.log('date:' + (Number(date.toISOString().slice(8,10))+1));
            console.log('data:' + (data || 'None'));
            if(data){
            	var dataArr=data.split(";");
            	var thingHtml='';
            	for(var i=0;i<dataArr.length;i++){
            		thingHtml+='<div class="boxc_item">'+
									'<div class="box_radius"></div>'+
									'<div class="box_content">'+dataArr[i]+'</div>'+
								'</div>'
            	}
            	$(".boxc").html(thingHtml);
            }else{
            	$(".boxc").html(' ');
            }
        }
    });
    //
})
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
}
//查询用户本身所发布的任务/task/queryMyAllTask
var pageSize=1;
// queryMyAllTask($.cookie('login_on'),1,pageSize,1,1)

// function queryMyAllTask(token,pageNo,pageSize,state,reset){
// 	$.ajax({
// 		type:"post",
// 		url: apiUrl+'/task/queryMyAllTask',
// 		data:{token:token,pageNo:pageNo,pageSize:pageSize},
// 		dataType:'json',
// 		success:function(e){
// 			console.log(e);
// 			var taskList=e.taskList;
// 			console.log(taskList);
// 			console.log(taskList.length);
// 			if(reset==1){
// 				$('.main_Pagination').html("");
// 			}
// 			if(Math.ceil(e.totalCount/pageSize)>1&&reset==1){
// 				$('.main_Pagination').html("");
// 				$('.main_Pagination').paging({
// 		            initPageNo: pageNo, // 初始页码
// 		            totalPages: Math.ceil(e.totalCount/pageSize), //总页数
// 		            slideSpeed: 600, // 缓动速度。单位毫秒
// 		            jump: true, //是否支持跳转
// 		            // 回调函数
// 		            callback: function(page){
// 		            	if(state == 1){
// 							state = 2 
// 		            	}else if(state == 2){
// 		            		//history.pushState(history.state,"","?PersonnelType="+PersonnelType+"&page="+page)
// 		            		//queryAllParticularInfo($.cookie("login_on"),page,PersonnelType,1,2);
// 		            		queryMyAllTask($.cookie('login_on'),page,pageSize,1,2)
// 		            	}
// 		            }
// 	        	})
// 			}
// 			if(taskList.length>0){
// 				var html='';
// 				for(var i=0;i<taskList.length;i++){
// 					console.log(taskList[i]);
// 					html+='<div class="myPostTask_content task">'+
// 								'<p class="myPostTask_date">'+taskList[i].takeCreateTime.split('-').join('')+'</p>'+
// 								'<div class="myPostTask_name">'+taskList[i].takeName+'</div>'+
// 								'<a href="b_editPosttask.html?takeId='+taskList[i].takeId+'"><div class="myPostTask_button_edit">编辑</div></a>'+
// 								'<a href="b_TaskStateDetail.html?taskId='+taskList[i].takeId+'"><div class="myPostTask_button_edit">查看</div></a>'+
// 								'<div class="myPostTask_button_move">删除<div class="hide">'+taskList[i].takeId+'</div></div>'+		
// 							'</div>';
// 				}
// 				$(".havePost").html(html);
// 				//删除任务/task/delTask
// 				$('.myPostTask_button_move').click(function(){
// 					var id=$(this).children().html();
// 					meg2('提示','是否确认删除该任务！','body',isDeleteTask)
// 					function isDeleteTask(){
// 						$.ajax({
// 							type:"post",
// 							url: apiUrl+'/task/delTask',
// 							data:{taskIds:id},
// 							dataType:'json',
// 							success:function(e){
// 								if(e.status==200){
// 									meg('提示','任务删除成功！','body',reload);
// 								}else{
// 									meg('提示','任务删除失败！','body',reload);
// 								}
// 								//meg2('提示','确认删除该任务！','body',reload)
// 							},
// 							error:function(){
// 								meg("提示","网络开小差，请检查！","body");
// 							}
// 						})
// 					}
// 				})
// 			}else{

// 			}
// 		},
// 		error:function(){
// 			meg("提示","网络开小差，请检查！","body");
// 		}
// 	})
// }
///task/queryBiddingTakeByUser查询用户已竞标的任务
// queryBiddingTakeByUser($.cookie('login_on'),1,pageSize,1,1)
// function queryBiddingTakeByUser(token,pageNo,pageSize,state,reset){
// 	$.ajax({
// 		type:"post",
// 		url: apiUrl+'/task/queryBiddingTakeByUser',
// 		data:{token:token,pageNo:pageNo,pageSize:pageSize},
// 		dataType:'json',
// 		success:function(e){
// 			console.log(e);
// 			var taskList=e.taskList;
// 			console.log(taskList);
// 			console.log(taskList.length);
// 			if(reset==1){
// 				$('.main_Pagination').html("");
// 			}
// 			if(Math.ceil(e.totalCount/pageSize)>1&&reset==1){
// 				$('.main_Pagination').html("");
// 				$('.main_Pagination').paging({
// 		            initPageNo: pageNo, // 初始页码
// 		            totalPages: Math.ceil(e.totalCount/pageSize), //总页数
// 		            slideSpeed: 600, // 缓动速度。单位毫秒
// 		            jump: true, //是否支持跳转
// 		            // 回调函数
// 		            callback: function(page){
// 		            	if(state == 1){
// 							state = 2 
// 		            	}else if(state == 2){
// 		            		//history.pushState(history.state,"","?PersonnelType="+PersonnelType+"&page="+page)
// 		            		//queryAllParticularInfo($.cookie("login_on"),page,PersonnelType,1,2);
// 		            		queryBiddingTakeByUser($.cookie('login_on'),page,pageSize,1,2);
// 		            	}
// 		            }
// 	        	})
// 			}
// 			if(taskList.length>0){
// 				var html='';
// 				for(var i=0;i<taskList.length;i++){
// 					console.log(taskList[i]);
// 					html+='<div class="myPostTask_content task">'+
// 								'<p class="myPostTask_date">'+taskList[i].entranceTime.split(' ')[0].split('-').join('')+'</p>'+
// 								'<div class="myPostTask_name">'+taskList[i].takeName+'</div>'+
// 								'<a href="b_TaskStateDetail_YF.html?taskId='+taskList[i].takeId+'"><div class="myPostTask_button_edit">查看</div></a>'+
// 							'</div>';
// 				}
// 				$(".haveJoin").html(html);
// 			}else{

// 			}
// 		},
// 		error:function(){
// 			meg("提示","网络开小差，请检查！","body");
// 		}
// 	})
// }
$(".littleTitleTwo div").click(function(){
	$(this).addClass('littleTitleTwo_on').siblings('').removeClass('littleTitleTwo_on');
	var index=$(this).index();
	if(index==1){
		$('.havePostContent').css('display','none');
		$('.haveJoinContent').css('display','block');
	}else if(index==0){
		$('.haveJoinContent').css('display','block')
		$('.havePostContent').css('display','none');
	}
})
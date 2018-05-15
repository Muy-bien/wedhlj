var state=1;
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
//获取类型
	//获取url中的参数
	var takeType=getUrlParam('takeType');
	var hotelAddress=getUrlParam('hotelAddress');
	var sort=getUrlParam('sort');
	var pageNo=getUrlParam('pageNo');
	var pageSize=8;
	if(!sort&&takeType&&!hotelAddress&&!pageNo){
		sort=4,pageNo=1,hotelAddress=null;
		history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+hotelAddress+'&sort='+sort+'&pageNo='+pageNo);
		// 默认加载数据
		//queryAllTaskDet(takeType,null,4,1,pageSize,1,1)
		queryAllTaskDet(takeType,null,4,1,pageSize,1,1)
	}else if(sort==0){
		//1-四大 2-执行 3-道具 4-舞美
		if(takeType==1){
			takeType=1;
		}else if(takeType==2){
			takeType=2;
		}else if(takeType==3){
			takeType=3;
		}else if(takeType==4){
			takeType=4;
		}
		$(".price_x10 p").eq(0).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		$(".price span").html($(".price_x10 p").eq(0).html());
		$(".main_nav01").removeClass('main_nav_on');
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		queryAllTaskDet(takeType,hotelAddress,0,pageNo,pageSize,1,1)
	}else if(sort==1){

		//1-四大 2-执行 3-道具 4-舞美
		if(takeType==1){
			takeType=1;
		}else if(takeType==2){
			takeType=2;
		}else if(takeType==3){
			takeType=3;
		}else if(takeType==4){
			takeType=4;
		}
		$(".price_x10 p").eq(1).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		$(".price span").html($(".price_x10 p").eq(1).html());
		$(".main_nav01").removeClass('main_nav_on');
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		queryAllTaskDet(takeType,hotelAddress,1,pageNo,pageSize,1,1)
	}else if(sort==2){

		//1-四大 2-执行 3-道具 4-舞美
		if(takeType==1){
			takeType=1;
		}else if(takeType==2){
			takeType=2;
		}else if(takeType==3){
			takeType=3;
		}else if(takeType==4){
			takeType=4;
		}
		$(".date_x10 p").eq(0).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		$(".date span").html($(".date_x10 p").eq(0).html());
		$(".main_nav01").removeClass('main_nav_on');
		$(".date").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		queryAllTaskDet(takeType,hotelAddress,2,pageNo,pageSize,1,1)
	}else if(sort==3){

		//1-四大 2-执行 3-道具 4-舞美
		if(takeType==1){
			takeType=1;
		}else if(takeType==2){
			takeType=2;
		}else if(takeType==3){
			takeType=3;
		}else if(takeType==4){
			takeType=4;
		}
		$(".date_x10 p").eq(1).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		$(".date span").html($(".date_x10 p").eq(1).html());
		$(".main_nav01").removeClass('main_nav_on');
		$(".date").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		queryAllTaskDet(takeType,hotelAddress,3,pageNo,pageSize,1,1)
	}else if(sort==4){

		//1-四大 2-执行 3-道具 4-舞美
		if(takeType==1){
			takeType=1;
		}else if(takeType==2){
			takeType=2;
		}else if(takeType==3){
			takeType=3;
		}else if(takeType==4){
			takeType=4;
		}
		$(".main_nav01").addClass('main_nav_on');
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		queryAllTaskDet(takeType,hotelAddress,4,pageNo,pageSize,1,1)
	}
	//根据导航栏参数判断地址信息
	(function(){
		var addrLen=$(".main_nav_bg p");
		if(hotelAddress==null||hotelAddress=='null'||hotelAddress=='全部'){
			addrLen.eq(0).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		}else{
			for(var i=0;i<addrLen.length;i++){
				if(hotelAddress==addrLen[i].innerHTML){
					$(".main_nav_bg span").html(hotelAddress);
					addrLen.eq(i).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
				}
			}
		}
	})()
	//	综合排序
	$(".main_nav01").click(function(){
		//$(".main_nav_bg span").html("酒店所在地");
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		//$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
		sort=4;
		history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+hotelAddress+'&sort='+sort+'&pageNo='+pageNo);
		queryAllTaskDet(takeType,null,sort,1,pageSize,1,1);
	})
	//	酒店所在地
	$(".main_nav_x10 p").click(function(){
		if($(this).html()=='全部'){
			hotelAddress=null;
			history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+null+'&sort='+sort+'&pageNo='+pageNo);
			queryAllTaskDet(takeType,null,sort,pageNo,pageSize,1,1);
		}else{
			hotelAddress=$(this).html();
			history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+$(this).html()+'&sort='+sort+'&pageNo='+pageNo);
			queryAllTaskDet(takeType,$(this).html(),sort,pageNo,pageSize,1,1);
		}
		
		$(".main_nav_bg span").html($(this).text());
		//$(".date span").html("日期排序");
		//$(".price span").html("价格排序");
		//$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		//$(".datePrice").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		//$(".main_nav01").removeClass('main_nav_on');
		//$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	})
	$(".main_nav_bg").hover(
		function(){
			var main_nav = $(".main_nav_x20").outerHeight();
			$(".main_nav_x10").css("height",main_nav);
		},function(){
			$(".main_nav_x10").css("height","0");
		}
	)
	
// 日期
	$(".main_nav01").click(function(){
		$(".date span").html("日期排序");
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".date_x10 p").click(function(){
		$(".date span").html($(this).text());
		$(".price span").html("价格排序");
		//$(".main_nav_bg span").html("酒店所在地");
		$(".date").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		//$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		var index=$(this).index();
		if(index==0){
			sort=2;
			history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+hotelAddress+'&sort=2&pageNo='+pageNo);
		}else if(index==1){
			sort=3;
			history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+hotelAddress+'&sort=3&pageNo='+pageNo);
		}
		queryAllTaskDet(takeType,null,sort,1,pageSize,1,1);
	})
	$(".date").hover(
		function(){
			var main_nav = $(".date_x20").outerHeight();
			$(".date_x10").css("height",main_nav);
		},function(){
			$(".date_x10").css("height","0");
		}
	)
//价格
	$(".main_nav01").click(function(){
		$(".price span").html("价格排序");
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".price_x10 p").click(function(){
		$(".price span").html($(this).text());
		$(".date span").html("日期排序");
		//$(".main_nav_bg span").html("酒店所在地");
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		//$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		var index=$(this).index();
		console.log(index);
		if(index==0){
			sort=0;
			history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+hotelAddress+'&sort=0&pageNo='+pageNo);
		}else if(index==1){
			sort=1;
			history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+hotelAddress+'&sort=1&pageNo='+pageNo);
		}
		queryAllTaskDet(takeType,null,sort,1,pageSize,1,1);
	})
	$(".price").hover(
		function(){
			var main_nav = $(".price_x20").outerHeight();
			$(".price_x10").css("height",main_nav);
		},function(){
			$(".price_x10").css("height","0");
		}
	)

})
//请求函数
//ajaxAddr:请求地址
//postdata：请求的data
// function sendAjaxPro(ajaxAddr,postdata){
// 	on_Loading();
// 	$.ajax({
// 		type:"post",
// 		url: apiUrl+ajaxAddr,
// 		dataType: 'json',
// 		data: postdata,
// 		success:function(e){
// 			$('.main_Pagination').paging({
// 		            initPageNo: 1, // 初始页码
// 		            totalPages: e.totalPage, //总页数
// 		            // totalCount: '合计' + 5 + '条数据', // 条目总数
// 		            slideSpeed: 600, // 缓动速度。单位毫秒
// 		            jump: true, //是否支持跳转
// 		            callback: function(page) {
// 		            	postdata.currentPage=page;
// 		            	$.ajax({
// 							type:"post",
// 							url: apiUrl+ajaxAddr,
// 							dataType: 'json',
// 							data: postdata,
// 							success:function(e){
// 								var lists=e.lists;
// 								var html="";
// 								if(lists.length==0){
// 									//meg("提示","暂时没有您需要的任务","body");
// 									$(".main04_cont_left").html('暂时没有您需要的任务');
// 									down_Loading();
// 								}else{
// 									for(var i=0;i<lists.length;i++){
// 										var list=lists[i];
// 										var showPicture=list.t_sketch.split(",");
// 										html+='<li>'+
// 											'<a href="b_TaskAnnouncements.html?tid='+list.t_id+'">'+
// 												'<div class="main04_cont_img">'+
// 													'<div class="img_auto" style="background-image:url('+list.showPicture+')"></div>'+
// 												'</div>'+
// 												'<div class="main04__x10">'+
// 													'<p class="main04_x20">'+list.t_name+'</p>'+
// 													'<p class="main04_x30">赏金￥'+list.maxPrice+' | 竞标 '+list.competitiveNum+'</p>'+
// 													'<p class="main04_x40">查看详情></p>'+
// 												'</div>'+
// 											'</a>'+
// 										'</li>';
// 										$(".main04_cont_left").html(html);
// 									}
// 									down_Loading();
// 								}
// 							},
// 							error:function(){
// 								down_Loading();
// 								meg("提示","网络开小差，请检查！","body")
// 							}
// 						})

// 		  			 }
// 		  	})	
// 		}
// 	})
// }
//nav点击请求函数
//sendImplementAddr:发送的接口
// function clickSendAjax(sendImplementAddr){
// 		//综合排序
// 		$(".main_nav01").click(function(){
// 			sendAjaxPro('/task/person',data);
// 		})
// 		//价格排序
// 		$(".price p").click(function(){
// 			if($(this).html()=="从高到低"){
// 				data={currentPage:1,type:'max',};
// 			}else if($(this).html()=="从低到高"){
// 				data={currentPage:1,type:'min',};
// 			}
// 			sendAjaxPro(sendImplementAddr,data);
// 		})
// 		//日期排序
// 		$(".date p").click(function(){
// 			if($(this).html()=="最新日期"){
// 				data={currentPage:1,type:'new',};
// 			}else if($(this).html()=="较早日期"){
// 				data={currentPage:1,type:'old',};
// 			}
// 			sendAjaxPro(sendImplementAddr,data);
// 		})
// 		//酒店所在地排序
// 		$(".main_nav_x20 p").click(function(){
// 			var addr="address,";
// 			if($(this).html()=="全部"){
// 				addr+='成都';
// 				data={currentPage:1,type:addr,}
// 			}else{
// 				addr+=$(this).html();
// 				data={currentPage:1,type:addr,}
// 			}
// 			sendAjaxPro(sendImplementAddr,data);
// 		})
// }
// 查看任务详情/task/queryAllTask
// sort:0价格升，1价格降，2最新日期，3较早日期,4综合
function queryAllTaskDet(takeType,hotelAddress,sort,pageNo,pageSize,state,reset){
	console.log(takeType);
	console.log(hotelAddress);
	console.log(sort);
	console.log(pageNo);
	on_Loading();
	$.ajax({
		type:"post",
		url: apiUrl+'/task/queryAllTask',
		dataType: 'json',
		data: {takeType:takeType,hotelAddress:hotelAddress,sort:sort,pageNo:pageNo,pageSize:pageSize},
		success:function(e){
			console.log(e);
			console.log(e.taskList);
			var taskList=e.taskList;
			if(reset==1){
				$('.main_Pagination').html("");
			}
			if(Math.ceil(e.totalCount/pageSize)>1&&reset==1){
				console.log(Math.ceil(e.totalCount/pageSize));
				$('.main_Pagination').html("");
				$('.main_Pagination').paging({
		            initPageNo: pageNo, // 初始页码
		            totalPages: Math.ceil(e.totalCount/pageSize), //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            // 回调函数
		            callback: function(page){
		            	if(state == 1){
							state = 2 
		            	}else if(state == 2){
		            		 history.pushState(history.state,"","?takeType="+takeType+"&hotelAddress="+hotelAddress+'&sort='+sort+'&pageNo='+page);
		            		queryAllTaskDet(takeType,null,4,page,pageSize,1,2);
		            	}
		            }
	        	})
			}
			if(taskList.length>0){
				var html='';
				for(var i=0;i<taskList.length;i++){
					var biddingUsers;//竞标数量
					if(taskList[i].biddingUsers){
						biddingUsers=taskList[i].biddingUsers.split(',').length;
					}else{
						biddingUsers=0;
					}
					var picture=taskList[i].taskSketch.split(',');
						var pictureNull,pictureNotNull;
						for(var k=0;k<picture.length;k++){
							if(picture[k]==null||picture[k]=='null'){
								}else{
									pictureNotNull=picture[k];
								}
						}
					//通过随机数判断任务的图片
						var random=Math.random();
						if(random>=0&&random<0.25){
							pictureNull='images/b_MissionHall/ad5.jpg';
						}else if(random>=0.25&&random<0.5){
							pictureNull='images/b_MissionHall/ad6.jpg';
						}else if(random>=0.5&&random<0.75){
							pictureNull='images/b_MissionHall/ad7.jpg';
						}else{
							pictureNull='images/b_MissionHall/ad8.jpg';
						}
					html+='<li>'+
							'<a href="b_TaskAnnouncements.html?taskId='+taskList[i].taskId+'">'+
								'<div class="main04_cont_img">';
								if(!pictureNotNull){
									html+=	'<div class="img_auto" style="background-image:url('+pictureNull+')"></div>'
								}else{
									html+=	'<div class="img_auto" style="background-image:url('+apiUrl+pictureNotNull+')"></div>'
								}
					html+=		'</div>'+
								'<div class="main04__x10">'+
									'<p class="main04_x20">'+taskList[i].takeName+'</p>'+
									'<p class="main04_x30">赏金￥'+taskList[i].takePrice+' | 竞标 '+biddingUsers+'</p>'+
									'<p class="main04_x40">查看更多></p>'+
								'</div>'+
							'</a>'+
						'</li>'
				}
				$(".main04_cont_left").html(html);
			}else{
				$(".main04_cont_left").html('当前区域没有相关任务！');
			}
		 down_Loading()
		},
		error:function(){
			down_Loading();
			meg("提示","网络开小差，请检查！","body")
		}
	})
}

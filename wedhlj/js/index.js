$(document).ready(function(){
	//当前页面默认选中
	$(".nav_li").eq(0).find("a").addClass("nav_on")
	//任务公告
	$.ajax({
		type: 'POST',
		url: apiUrl+'/task/queryAllTask',
		dataType: 'json',
		data:{sort:2,pageNo:1,pageSize:6},
		success:function(e){
			var Fill_index = 6;
			var main01_html="";
			var Fill = "";
			if(e.status==200){
				var tasks= e.taskList.length;
				Fill_index = 6-Number(tasks);
				if(tasks>0){
					for(var i=0;i<tasks;i++){
						var task=e.taskList[i];
						main01_html+='<li>'+
							'<a href="b_TaskAnnouncements.html?releaseUserId='+task.releaseUserId+'">'+
								'<div class="main01_left_img"><div class="img_auto" style="background-image:url('+apiUrl+task.taskSketch.split(",")[0]+')"></div></div>'+
								'<div class="main01_left_cont">'+
									'<h1>'+task.takeName+'</h1>'+
									'<p>赏金 ￥'+task.takePrice+'<span>|</span>竞标 '+(task.biddingUsers==""?0:task.biddingUsers)+'</p>'+
									'<div class="main_left_but">查看更多</div>'+
								'</div>'+
							'</a>'+
						'</li>';
					}
				}
			}	
			for(var s=0;s<Fill_index;s++){
				Fill +='<li><a href="b_MissionHall.html"><div class="main01_left_img"><div class="img_auto" style="background-image:url(images/b_Preferred_ZCR/personnel_optimization.png)"></div></div><div class="main01_left_cont"><h1>当前暂无任务</h1><p>赏金 ￥0<span>|</span>竞标 0</p><div class="main_left_but">发布任务</div></div></a></li>'
			}
			$(".main01_left ul").html(main01_html+Fill);
		}
	})
	//任务公告栏
	$.ajax({
		type: 'POST',
		url: apiUrl+'/task/queryAllTask',
		dataType: 'json',
		data:{sort:2,pageNo:1,pageSize:100},
		success:function(e){
			if(e.status==200){
				if(e.taskList.length>0){
					var rw_html = "";
					for(var i=0;i<e.taskList.length;i++){
						var list = e.taskList[i];
						rw_html+='<li class="swiper-slide swiper-no-swiping blue-slide"><span>用户 '+list.contactPhone.substring(0,7)+'**** 成功预约</span><span>"'+list.takeName+'"</span></li>'
					}
					$('.Preparation_cont ul').html(rw_html);
					var height=Number(e.taskList.length>13?13:e.taskList.length)*36
					$(".Preparation_cont").css("max-height",height);
					var mySwiper = new Swiper('.Preparation_cont', {
						direction: 'vertical',
						autoplay: 3000,//可选选项，自动滑动
						autoplayDisableOnInteraction: false,
						loop: true,
						slidesPerView: 'auto',
						loopedSlides: 13,
					})
					
				}
			}
		}
	})
	//默认人员展示
	showAll("主持人");
	//点击人员展示
	$(".main_lnav_x10 span").click(function(){
		var this_type = $(this).text();
		$(this).addClass('main_lnav_on').siblings().removeClass('main_lnav_on')
		showAll(this_type);
	})
	//人员展示
	function showAll(type){
		$.ajax({
			type: 'POST',
			url: apiUrl+'/BusinessPersonnel/findAllParticularInfo',
			dataType: 'json',
			data: {type:type,address:"成都市",sort:0,pageNo:1,pageSize:9},
			success: function(e){
				var str = "";
				if(e.status==200){
					if(e.businessPersonnels.length>0){
						$(".main_lcont_box ul").css("left","0");
						for(var i=0;i<e.businessPersonnels.length;i++){
							var lists = e.businessPersonnels[i];
							str+='<li>'+
								'<a href="b_Preferred_ZCR_Case.html?PersonnelNo='+lists.personnelNo+'">'+
									'<div class="main_lcont_img"><div class="img_auto" style="background-image:url('+apiUrl+lists.headPortait+')"></div></div>'+
									'<div class="main_lcont_cont">'+
										'<h1>'+type+' '+lists.name+'</h1>'+
										'<p>风格<span>|</span>'+lists.style.split(",")[0]+'</p>'+
									'</div>'+
								'</a>'+
							'</li>'
						}
					}else{
						str="暂无该人员信息";
					}
				}else{
					str="暂无该人员信息";
				}
				$(".main_lcont_box ul").html(str);
				li_cont();
			}
		})
	}
	//人员内容
	function li_cont(){
		var li_length = Math.ceil($(".main_lcont_box ul li").length/3);
		var li_str ="";
		for(var i=0;i<li_length;i++){
			li_str +='<li></li>';
		}
		$(".main_lcont_but").html(li_str);
		$(".main_lcont_but li").eq(0).addClass('main_lcont_but_on')
		$(".main_lcont_but li").hover(function(){
			var this_index = $(this).index();
			$(this).addClass('main_lcont_but_on').siblings('').removeClass('main_lcont_but_on');
			$(".main_lcont_box ul").css("left",-990*this_index+"px");
		})
	}
	//热门人员
	$.ajax({
		type: 'POST',
		url: apiUrl+'/BusinessPersonnel/findAllParticularInfo',
		dataType: 'json',
		data: {type:"",address:"成都市",sort:0,pageNo:1,pageSize:9},
		success: function(e){
			var str = "";
			if(e.status==200){
				if(e.businessPersonnels.length>0){
					for(var i=0;i<e.businessPersonnels.length;i++){
						var lists = e.businessPersonnels[i];
						str+='<div class="personnel_right_cont personnel_right_off">'+
							'<div class="personnel_right_cont01">'+
								'<span>'+(i+1)+'</span>'+lists.name+'</div>'+
							'<a href="b_Preferred_ZCR_Case.html?PersonnelNo='+lists.personnelNo+'">'+
								'<div class="personnel_right_x10">'+
									'<div class="personnel_right_img"><div class="img_auto" style="background-image:url('+apiUrl+lists.headPortait+')"></div></div>'+
									'<p><span>'+lists.name+'</span><span>￥'+lists.wage+'</span></p>'+
								'</div>'+
							'</a>'+
						'</div>'
					}
				}else{
					str="暂无该人员信息";
				}	
			}else{
				str="暂无该人员信息";
			}
			$(".personnel_right_01").html(str);
			$(".personnel_right_cont").eq(0).addClass('personnel_right_on');
			//广告
			$(".personnel_right_cont").hover(function(){
				$(this).addClass("personnel_right_on").siblings().removeClass("personnel_right_on").addClass("personnel_right_off")
			})
		}
	})
	//案例原稿
	$.ajax({
		type: 'POST',
		url: apiUrl+'/scheme/queryAllScheme',
		dataType: 'json',
		data:{auditStatus:1,sort:0,pageNo:1,pageSize:6},
		success: function(e){
			var str = "";
			if(e.status==200){
				if(e.schemeList.length>0){
					for(var i=0;i<e.schemeList.length;i++){
						var data = e.schemeList[i];
						var time=jsonDateFormat(data.createTime.time).substr(0,10).split("-");
						str+='<li>'+
							'<div class="main04_time"><span>'+time[0].substring(2,4)+'年</span><i></i><span>'+time[1]+'月</span></div>'+
							'<a href="b_CaseDetails.html?schemeNo='+data.schemeNo+'">'+
								'<div class="main04_content">'+
									'<div class="main04_img"><div class="img_auto" style="background-image:url('+apiUrl+data.schemePassageArea.split(",")[0]+')"></div></div>'+
									'<h1>'+data.schemeName+'</h1>'+
									'<div class="main04_text">案例介绍：'+data.schemeDesc+'</div>'+
									'<div class="main04_but">了解详情</div>'+
								'</div>'+
							'</a>'+
						'</li>';
						max_text();
					}
				}else{
					str="暂无案例信息"
				}
			}else{
				str="暂无案例信息"
			}
			$(".main04_cont").html(str);
		}
	})
	//限制字符个数
	function max_text(){
		$(function(){
			$(".main04_text").each(function(){
				var maxwidth=40;
				if($(this).text().length>maxwidth){ 
					$(this).text($(this).text().substring(0,maxwidth)); 
					$(this).html($(this).html()+'…');
				}
			});
		});
	}	

})



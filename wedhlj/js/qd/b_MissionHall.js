$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
	//请求数据
	//四大
	var data={
		currentPage:1,
	}
	//四大和道具
	fourProp('task/showByPerson',$(".fourBig"),'ad2.jpg');
	fourProp('task/showByProp',$(".prop"),'ad3.jpg');
	function fourProp(addr,selector,picAddr){
		$.ajax({
			type:"post",
			url:apiUrl+addr,
			data:data,
			dataType:"json",
			success:function(e){
				var objs=e.lists;
				var html="";
				if(objs.length==0){
				}else if(objs.length>=4){
					for(var i=0;i<4;i++){
						var obj=objs[i];
						//console.log(obj);
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_01">'+
									'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
										'<div>'+
											'<div class="img_auto" style="background-image:url('+picture[0]+')"></div>'+
										'</div>'+
										'<p>'+
											'<span>¥'+obj.maxPrice+'</span>'+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+
										'</p>'+
									'</a>'+
								'</div>';
					}
				}else{
					for(var i=0;i<objs.length;i++){
						var obj=objs[i];
						//console.log(obj);
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_01">'+
									'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
										'<div>'+
											'<div class="img_auto" style="background-image:url('+picture[0]+')"></div>'+
										'</div>'+
										'<p>'+
											'<span>¥'+obj.maxPrice+'</span>'+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+
										'</p>'+
									'</a>'+
								'</div>';
					}
				}
				html+='<div class="main02_ad_01">'+
								'<a href="#">'+
									'<img src="images/b_MissionHall/'+picAddr+'">'+
								'</a>'+
							'</div>';
				selector.html(html);
			},
			error:function(){
				meg("提示","网络开小差，请稍后再试！","body");
			}
		})
	}
	//执行和舞美
	actionStage('task/showByExecute',$(".action"));
	actionStage('task/showByStage',$(".stage"));
	function actionStage(addr,selector){
		$.ajax({
			type:"post",
			url:apiUrl+addr,
			data:data,
			dataType:"json",
			success:function(e){
				var objs=e.lists;
				var html="";
				if(objs.length==0){
				}else if(objs.length>=4){
				    html+='<div class="main02_right_02">'+
								'<a href="b_TaskAnnouncements.html?tid='+objs[0].t_id+'">'+
									'<div>'+
										'<div class="img_auto" style="background-image:url('+objs[0].t_sketch.split(',')[0]+')"></div>'+
									'</div>'+
									'<p class="x10"><span>￥'+objs[0].maxPrice+'</span>'+objs[0].t_type+' '+objs[0].hotelName+' '+objs[0].entranceTime+'</p>'+
								'</a>'+
							'</div>'+
							'<div class="main02_right_04">';
					for(var i=1;i<4;i++){
						var obj=objs[i];
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_03">'+
									'<div>'+
										'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
											'<div class="img_auto" style="background-image:url('+picture[i]+')"></div>'+
											'<p>¥'+obj.maxPrice+' '+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+'</p>'+
										'</a>'+
									'</div>'+
								'</div>';
					}
					html+='</div>';
				}else if(objs.length==1){
					html+='<div class="main02_right_02">'+
							'<a href="b_TaskAnnouncements.html?tid='+objs[0].t_id+'">'+
								'<div>'+
									'<div class="img_auto" style="background-image:url('+objs[0].t_sketch.split(',')[0]+')"></div>'+
								'</div>'+
								'<p class="x10"><span>￥'+objs[0].maxPrice+'</span>'+objs[0].t_type+' '+objs[0].hotelName+' '+objs[0].entranceTime+'</p>'+
							'</a>'+
						'</div>'+
						'<div class="main02_right_04"></div>';
				}else{
					//1-3
					html+='<div class="main02_right_02">'+
							'<a href="b_TaskAnnouncements.html?tid='+objs[0].t_id+'">'+
								'<div>'+
									'<div class="img_auto" style="background-image:url('+objs[0].t_sketch.split(',')[0]+')"></div>'+
								'</div>'+
								'<p class="x10"><span>￥'+objs[0].maxPrice+'</span>'+objs[0].t_type+' '+objs[0].hotelName+' '+objs[0].entranceTime+'</p>'+
							'</a>'+
						'</div>'+
						'<div class="main02_right_04">';
					for(var i=1;i<objs.length;i++){
						var obj=objs[i];
						var picture=obj.t_sketch.split(',');
						html+='<div class="main02_right_03">'+
									'<div>'+
										'<a href="b_TaskAnnouncements.html?tid='+obj.t_id+'">'+
											'<div class="img_auto" style="background-image:url('+picture[i]+')"></div>'+
											'<p>¥'+obj.maxPrice+' '+obj.t_type+' '+obj.hotelName+' '+obj.entranceTime+'</p>'+
										'</a>'+
									'</div>'+
								'</div>';
					}
					html+='</div>';
				}
				selector.html(html);
			},
			error:function(){
				meg("提示","网络开小差，请稍后再试！","body");
			}
		})
	}
})
//寻找资源
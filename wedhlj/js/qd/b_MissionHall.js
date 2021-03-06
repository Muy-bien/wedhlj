$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
})
//任务大厅/task/queryAllTask
//takeType:四大-1，执行-2，道具-3，舞美-4
var pageNo=1,pageSize=4;
function queryAllTask(takeType,selector,picAddr){
	$.ajax({
		type:'post',
		url:apiUrl+'/task/queryAllTask',
		data:{takeType:takeType,pageNo:1,pageSize:4},
		success:function(e){
			var objs=e.taskList;
			if(takeType==1||takeType==3){
				if(objs.length>0){
					var objHtml='';
					for(var i=0;i<objs.length;i++){
						var obj=objs[i];
						var picture=obj.taskSketch.split(',');
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
						objHtml+='<div class="main02_right_01">'+
									'<a href="b_TaskAnnouncements.html?taskId='+obj.taskId+'">'+
										'<div>';

								if(!pictureNotNull){
									picture[0]=pictureNull;
									objHtml+='<div class="img_auto" style="background-image:url('+picture[0]+')"></div>';
								}else{
									picture[0]=pictureNotNull;
									objHtml+='<div class="img_auto" style="background-image:url('+apiUrl+picture[0]+')"></div>';
								}
						objHtml+=			'</div>'+
										'<p>'+
											'<span>¥ '+obj.takePrice+'</span>'+obj.takeType+' '+obj.hotelName+' '+obj.entranceTime+
										'</p>'+
									'</a>'+
								'</div>'
					}
					objHtml+='<div class="main02_ad_01">'+
								'<a href="#">'+
									'<img src="images/b_MissionHall/'+picAddr+'">'+
								'</a>'+
							'</div>';
					selector.html(objHtml);
				}else{
					var nullobjHtml='<div class="main02_ad_01">'+
										'<a href="#">'+
											'<img src="images/b_MissionHall/'+picAddr+'">'+
										'</a>'+
									'</div>';
							selector.html('当前区域没有相关任务！'+nullobjHtml);
				}
				
			}else if(takeType==2||takeType==4){
				if(objs.length>0){
						var planHtml='';
						var img0=objs[0].taskSketch.split(',');
						var imgNull0,imgNotNull0;
						for(var s=0;s<img0.length;s++){
							if(img0[s]==null||img0[s]=='null'){
							}else{
								imgNotNull=img0[s];
							}
						}
						//通过随机数判断任务的图片
							var random=Math.random();
							if(random>=0&&random<0.25){
								imgNull0='images/b_MissionHall/ad5.jpg';
							}else if(random>=0.25&&random<0.5){
								imgNull0='images/b_MissionHall/ad6.jpg';
							}else if(random>=0.5&&random<0.75){
								imgNull0='images/b_MissionHall/ad7.jpg';
							}else{
								imgNull0='images/b_MissionHall/ad8.jpg';
							}

					planHtml+='<div class="main02_right_02">'+
								'<a href="b_TaskAnnouncements.html?taskId='+objs[0].taskId+'">'+
									'<div>';
									if(imgNotNull0){
										planHtml+='<div class="img_auto" style="background-image:url('+apiUrl+imgNotNull0+')"></div>';
									}else{
										planHtml+='<div class="img_auto" style="background-image:url('+imgNull0+')"></div>';
									}

					planHtml+=		'</div>'+
									'<p class="x10"><span>￥'+objs[0].takePrice+'</span>'+objs[0].takeType+' '+objs[0].hotelName+' '+objs[0].entranceTime+'</p>'+
								'</a>'+
							'</div>'+
							'<div class="main02_right_04">';

					for(var m=1;m<objs.length;m++){
						var obj=objs[m];
						var imgrs=obj.taskSketch.split(',');
						var imgNullrs,imgNotNullrs;
						for(var n=0;n<imgrs.length;n++){
							if(imgrs[n]==null||imgrs[n]=='null'){
							}else{
								imgNotNullrs=imgrs[n];
							}
						}
						//通过随机数判断任务的图片
							var randomrs=Math.random();
							if(randomrs>=0&&randomrs<0.25){
								imgNullrs='images/b_MissionHall/ad5.jpg';
							}else if(randomrs>=0.25&&randomrs<0.5){
								imgNullrs='images/b_MissionHall/ad6.jpg';
							}else if(randomrs>=0.5&&randomrs<0.75){
								imgNullrs='images/b_MissionHall/ad7.jpg';
							}else{
								imgNullrs='images/b_MissionHall/ad8.jpg';
							}
						planHtml+='<div class="main02_right_03">'+
									'<div>'+
										'<a href="b_TaskAnnouncements.html?taskId='+obj.taskId+'">';
											if(imgNotNullrs){
												planHtml+='<div class="img_auto" style="background-image:url('+apiUrl+imgNotNullrs+')"></div>';
											}else{
												planHtml+='<div class="img_auto" style="background-image:url('+imgNullrs+')"></div>';
											}

						planHtml+=			'<p>¥'+obj.takePrice+' '+obj.takeType+' '+obj.hotelName+' '+obj.entranceTime+'</p>'+
										'</a>'+
									'</div>'+
								'</div>';
					}
					planHtml+='</div>';
					selector.html(planHtml);
				}else{
					selector.html('当前区域没有相关任务！');
				}
			}
		},
		error:function(){
			meg('提示','网络开小差，请稍后再试！','body')
		}
	})
}
// 四大
queryAllTask(1,$('.fourBig'),'ad2.jpg')
//道具
queryAllTask(3,$('.prop'),'ad3.jpg')
//执行
queryAllTask(2,$('.action'))
//舞美
queryAllTask(4,$('.stage'))

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
						rw_html+='<div class="swiper-slide swiper-no-swiping blue-slide swiper-slide-prev">'+
									'<p class="main01_x10"><span>¥ '+list.takePrice+'</span>'+list.takeName+'</p>'+
									'<p class="main01_x20"><span>竞标人数：'+(list.biddingUsers==''?0:list.biddingUsers.split(',').length)+'</span>执行时间：'+list.etiquetteTime.split(' ')[0]+'</p>'+
								'</div>'
					}
					$('.main01_cont').html(rw_html);
					var mySwiper = new Swiper('.mian01_left', {
							prevButton:'.swiper-button-prev',
							nextButton:'.swiper-button-next',
							direction : 'vertical',
							autoplay: 5000,//可选选项，自动滑动
							autoplayDisableOnInteraction : false,
							loop : true,
							slidesPerView : 'auto',
							loopedSlides :7,
						})
					
				}
			}
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
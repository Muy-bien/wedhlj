var state=1;
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
	//	酒店所在地
	$(".main_nav01").click(function(){
		$(".main_nav_bg span").html("酒店所在地");
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".main_nav_x10 p").click(function(){
		$(".main_nav_bg span").html($(this).text());
		$(".date span").html("日期排序");
		$(".price span").html("价格排序");
		$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".datePrice").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav01").removeClass('main_nav_on');
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
		$(".main_nav_bg span").html("酒店所在地");
		$(".date").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".price_x10 p").removeClass('main_nav_x10_on');
		$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
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
		$(".main_nav_bg span").html("酒店所在地");
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".date").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		$(".date_x10 p").removeClass('main_nav_x10_on');
		$(this).parent().parent().parent().siblings().removeClass('main_nav_on');
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	})
	$(".price").hover(
		function(){
			var main_nav = $(".price_x20").outerHeight();
			$(".price_x10").css("height",main_nav);
		},function(){
			$(".price_x10").css("height","0");
		}
	)
//获取类型
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	//接收URL中的参数spid
	var type = getUrlParam('type');
	data={
		currentPage:1,
		type:'synthesize',
	}
	//0-四大 1-执行 2-道具 3-舞美
	if(type==0){
		sendAjaxPro('/task/person',data);
		clickSendAjax('/task/person');
	}else if(type==1){
		sendAjaxPro('/task/execute',data);
		clickSendAjax('/task/execute');
	}else if(type==2){
		sendAjaxPro('/task/prop',data);
		clickSendAjax('/task/prop');
	}else if(type==3){
		sendAjaxPro('/task/stage',data);
		clickSendAjax('/task/stage');
	}

})
//请求函数
//ajaxAddr:请求地址
//postdata：请求的data
function sendAjaxPro(ajaxAddr,postdata){
	on_Loading();
	$.ajax({
		type:"post",
		url: apiUrl+ajaxAddr,
		dataType: 'json',
		data: postdata,
		success:function(e){
			$('.main_Pagination').paging({
		            initPageNo: 1, // 初始页码
		            totalPages: e.totalPage, //总页数
		            // totalCount: '合计' + 5 + '条数据', // 条目总数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            callback: function(page) {
		            	postdata.currentPage=page;
		            	$.ajax({
							type:"post",
							url: apiUrl+ajaxAddr,
							dataType: 'json',
							data: postdata,
							success:function(e){
								var lists=e.lists;
								var html="";
								if(lists.length==0){
									//meg("提示","暂时没有您需要的任务","body");
									$(".main04_cont_left").html('暂时没有您需要的任务');
									down_Loading();
								}else{
									for(var i=0;i<lists.length;i++){
										var list=lists[i];
										var showPicture=list.t_sketch.split(",");
										html+='<li>'+
											'<a href="b_TaskAnnouncements.html?tid='+list.t_id+'">'+
												'<div class="main04_cont_img">'+
													'<div class="img_auto" style="background-image:url('+list.showPicture+')"></div>'+
												'</div>'+
												'<div class="main04__x10">'+
													'<p class="main04_x20">'+list.t_name+'</p>'+
													'<p class="main04_x30">赏金￥'+list.maxPrice+' | 竞标 '+list.competitiveNum+'</p>'+
													'<p class="main04_x40">查看详情></p>'+
												'</div>'+
											'</a>'+
										'</li>';
										$(".main04_cont_left").html(html);
									}
									down_Loading();
								}
							},
							error:function(){
								down_Loading();
								meg("提示","网络开小差，请检查！","body")
							}
						})

		  			 }
		  	})	
		}
	})
}
//nav点击请求函数
//sendImplementAddr:发送的接口
function clickSendAjax(sendImplementAddr){
		//综合排序
		$(".main_nav01").click(function(){
			sendAjaxPro('/task/person',data);
		})
		//价格排序
		$(".price p").click(function(){
			if($(this).html()=="从高到低"){
				data={currentPage:1,type:'max',};
			}else if($(this).html()=="从低到高"){
				data={currentPage:1,type:'min',};
			}
			sendAjaxPro(sendImplementAddr,data);
		})
		//日期排序
		$(".date p").click(function(){
			if($(this).html()=="最新日期"){
				data={currentPage:1,type:'new',};
			}else if($(this).html()=="较早日期"){
				data={currentPage:1,type:'old',};
			}
			sendAjaxPro(sendImplementAddr,data);
		})
		//酒店所在地排序
		$(".main_nav_x20 p").click(function(){
			var addr="address,";
			if($(this).html()=="全部"){
				addr+='成都';
				data={currentPage:1,type:addr,}
			}else{
				addr+=$(this).html();
				data={currentPage:1,type:addr,}
			}
			sendAjaxPro(sendImplementAddr,data);
		})
}
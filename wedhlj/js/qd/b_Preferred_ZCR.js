var state=1;//防止多次点击
$(document).ready(function(){
	$(".nav_li").eq(3).find("a").addClass("nav_on");
})
var type=getUrlParam("type");
var address=getUrlParam('address');
var sort=getUrlParam('sort');
var pageNo=getUrlParam('pageNo');
var pageSize=6;
// 默认情况下
// 根据排序方式导航栏上的数据做判断
// 默认调用
if(!sort&&!type&&!address&&!pageNo){
	type='主持人',address=null,sort=0,pageNo=1;
	history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort=0&pageNo=1');
	$(".sidebox a").eq(1).children().addClass('sidebox_on').siblings('').removeClass();
	findAllParticularInfo('主持人',null,0,1,pageSize,1,1);//默认调用
}else if(sort==0){
	$(".main_nav01").eq(0).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
		if(type=='主持人'){
		 	$(".sidebox a").eq(1).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='化妆师'){
		 	$(".sidebox a").eq(2).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='摄影师'){
		 	$(".sidebox a").eq(3).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='摄像师'){
		 	$(".sidebox a").eq(4).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='花艺师'){
		 	$(".sidebox a").eq(5).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='婚礼执行'){
		 	$(".sidebox a").eq(6).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='婚礼管家'){
		 	$(".sidebox a").eq(7).children().addClass('sidebox_on').siblings('').removeClass();
		}
		findAllParticularInfo(type,address,sort,pageNo,pageSize,1,1);
}else if(sort==1){
	$(".main_nav01").eq(1).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
		if(type=='主持人'){
		 	$(".sidebox a").eq(1).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='化妆师'){
		 	$(".sidebox a").eq(2).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='摄影师'){
		 	$(".sidebox a").eq(3).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='摄像师'){
		 	$(".sidebox a").eq(4).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='花艺师'){
		 	$(".sidebox a").eq(5).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='婚礼执行'){
		 	$(".sidebox a").eq(6).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='婚礼管家'){
		 	$(".sidebox a").eq(7).children().addClass('sidebox_on').siblings('').removeClass();
		}
		findAllParticularInfo(type,address,sort,pageNo,pageSize,1,1);
}else if(sort==2){
	$(".main_nav01").eq(2).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
		if(type=='主持人'){
		 	$(".sidebox a").eq(1).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='化妆师'){
		 	$(".sidebox a").eq(2).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='摄影师'){
		 	$(".sidebox a").eq(3).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='摄像师'){
		 	$(".sidebox a").eq(4).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='花艺师'){
		 	$(".sidebox a").eq(5).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='婚礼执行'){
		 	$(".sidebox a").eq(6).children().addClass('sidebox_on').siblings('').removeClass();
		}else if(type=='婚礼管家'){
		 	$(".sidebox a").eq(7).children().addClass('sidebox_on').siblings('').removeClass();
		}
		findAllParticularInfo(type,address,sort,pageNo,pageSize,1,1);
}
//根据导航栏参数判断地址信息
(function(){
	var addrLen=$(".main_nav_bg p");
	for(var i=0;i<addrLen.length;i++){
		if(address==addrLen[i].innerHTML){
			$(".main_nav_bg span").html(address);
			addrLen.eq(i).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		}
	}
})()
// 点击侧边栏人员类型
$(".sidebox div").click(function(){
	type=$(this).html();
	$(this).addClass("sidebox_on").parent().siblings('').children().removeClass("sidebox_on");
	history.pushState(history.state,"",'?type='+$(this).html()+'&address='+address+'&sort='+sort+'&pageNo=1');
	findAllParticularInfo(type,address,sort,pageNo,pageSize,1,1);
})
$(".main_nav01").click(function(){
	var index=$(this).index();
	if(index==0){
		sort=0;
		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort=0&pageNo=1');
	}else if(index==1){
		sort=1;
		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort=1&pageNo=1');
	}else if(index==2){
		sort=2;
		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort=2&pageNo=1');
	}
	//$(".main_nav_bg span").html("商家所在地");
	$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
	//$(".main_nav_x10 p").removeClass('main_nav_x10_on');
	$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	findAllParticularInfo(type,address,sort,pageNo,pageSize,1,1);
})
// 点击地址栏地区
$(".main_nav_x10 p").click(function(){
	if($(this).html()=='全部'){
		address=null;
	}else{
		address=$(this).text();
	}
	$(".main_nav_bg span").html($(this).text());
	//$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
	//$(".main_nav01").removeClass('main_nav_on');
	$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	history.pushState(history.state,"",'?type='+type+'&address='+$(this).html()+'&sort=2&pageNo=1');
	findAllParticularInfo(type,address,sort,pageNo,pageSize,1,1);
})
$(".main_nav_bg").hover(
	function(){
		var main_nav = $(".main_nav_x20").outerHeight();
		$(".main_nav_x10").css("height",main_nav);
	},function(){
		$(".main_nav_x10").css("height","0");
	}
)

//BusinessPersonnel/findAllParticularInfo人员信息分页
//type:查询人员类型
//address：查询人员所在地
//sort：排序方式---综合-0；星级-1；人气-2
//pageNo:当前页数
//pageSize:每页的最大数据数量
//Reset===>>判断是否刷新分页Dom(1:是)
function findAllParticularInfo(type,address,sort,pageNo,pageSize,state,Reset){
	$.ajax({
		type:"post",
		url:apiUrl+'/BusinessPersonnel/findAllParticularInfo',
		data:{type:type,address:address,sort:sort,pageNo:pageNo,pageSize:pageSize},
		success:function(e){
			var businessPersonnels=e.businessPersonnels;
			if(businessPersonnels.length>0){
				var perHtml='';
				for(var i=0;i<businessPersonnels.length;i++){
					var case_img=businessPersonnels[i].case_img.split(",");//案例图片
					perHtml+='<li>'+
								'<a href="b_Preferred_ZCR_Case.html?PersonnelNo='+businessPersonnels[i].personnelNo+'">'+
									'<div class="details">'+
										'<div class="details_user">'+
											'<div class="details_logo"><div class="img_auto" style="background-image:url('+apiUrl+businessPersonnels[i].headPortait+')"></div></div>'+
											'<h1>'+businessPersonnels[i].name+'</h1>'+
											'<p>'+businessPersonnels[i].address.split(",").join('')+'</p>'+
											'<span>';
											var star=businessPersonnels[i].star;
											for(var j=0;j<star;j++){
													perHtml+='<i></i>'
											}
					perHtml+=				'</span>'+
											'<div class="details_but">查 看 详 情</div>'+
										'</div>'+
										'<div class="details_cont">'+
											'<div class="details_cont_x10">'+
												'<div class="img_auto" style="background-image:url('+apiUrl+case_img[0]+')"></div>'+
											'</div>';
											
					perHtml+=				'<div class="details_cont_x20">';	
												if(case_img.length==2){
													perHtml+='<div class="details_cont_x50">'+
																'<div class="img_auto" style="background-image:url('+apiUrl+case_img[1]+')"></div>'+
															'</div>';
												}else{
													perHtml+='<div class="details_cont_x50">'+
																'<div class="img_auto" style="background-image:url('+apiUrl+case_img[1]+')"></div>'+
															'</div>'+
															'<div  class="details_cont_x50">'+
																'<div class="img_auto" style="background-image:url('+apiUrl+case_img[2]+')"></div>'+
															'</div>';
												}
												
							perHtml+=		'</div>'+
										'</div>'+
									'</div>'+
								'</a>'+
							'</li>';
				}
				$("ul.main_cont").html(perHtml);	
			}else{
				//数据为空的时候
				$(".main_cont").html("当前区域没有你查找的相关人员");
			}
			if(Reset==1){
				$(".main_Pagination").html();
				var totalCount = Math.ceil(e.totalCount/pageSize);
				if(totalCount>1){
					$('.main_Pagination').paging({
						initPageNo: pageNo, // 初始页码
			            totalPages: totalCount, //总页数
			            slideSpeed: 600, // 缓动速度。单位毫秒
			            jump: true, //是否支持跳转
			           	 callback: function(page){ // 回调函数	
			            	if(state == 1){
								state = 2 
			            	}else if(state == 2){
			            		pageNo=page;
			            		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort='+sort+'&pageNo='+page)
			            		findAllParticularInfo(type,address,sort,pageNo,pageSize,1,2);
			            	}
			            }
		        	})
				}	
			}
		},
		error:function(){
			meg("提示","网络故障，请稍后再试！","body");
		}
	})

}

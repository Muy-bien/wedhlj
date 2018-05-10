var state=1;//防止多次点击
$(".nav_li").eq(3).find("a").addClass("nav_on");
var type=getUrlParam("type");
var address=getUrlParam('address');
var sort=getUrlParam('sort');
var pageNo=getUrlParam('pageNo');
var pageSize=6;
// 默认情况下
// 根据排序方式导航栏上的数据做判断
if(!sort){
	history.pushState(history.state,"",'?type=主持人&address=null&sort=0&pageNo=1');
	findAllParticularInfo('主持人',null,0,1,pageSize,1);//默认调用
}else if(sort==0){
	$(".main_nav01").eq(0).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	// findAllParticularInfo('主持人',null,0,1,pageSize,1);
}else if(sort==1){
	$(".main_nav01").eq(1).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
}else if(sort==2){
	$(".main_nav01").eq(2).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	// findAllParticularInfo('主持人',null,2,1,pageSize,1);
}
// 根据导航栏判断人员类型
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
	console.log(address);
	console.log(sort);
	$(this).addClass("sidebox_on").parent().siblings('').children().removeClass("sidebox_on");
	history.pushState(history.state,"",'?type='+$(this).html()+'&address='+address+'&sort='+sort+'&pageNo=1');
})
$(".main_nav01").click(function(){
	var index=$(this).index();
	if(index==0){
		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort=0&pageNo=1');
	}else if(index==1){
		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort=1&pageNo=1');
	}else if(index==2){
		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort=2&pageNo=1');
	}
	//$(".main_nav_bg span").html("商家所在地");
	$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
	//$(".main_nav_x10 p").removeClass('main_nav_x10_on');
	$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
})
$(".main_nav_x10 p").click(function(){
	$(".main_nav_bg span").html($(this).text());
	//$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
	//$(".main_nav01").removeClass('main_nav_on');
	$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	history.pushState(history.state,"",'?type='+type+'&address='+$(this).html()+'&sort=2&pageNo=1');
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
function findAllParticularInfo(type,address,sort,pageNo,pageSize,state){
	
console.log(type);
console.log(address);
console.log(sort);
console.log(pageNo);
console.log(pageSize);
	$.ajax({
		type:"post",
		url:apiUrl+'/BusinessPersonnel/findAllParticularInfo',
		data:{type:type,address:address,sort:sort,pageNo:pageNo,pageSize:pageSize},
		success:function(e){
			console.log(e);
			if(e.businessPersonnels.length){
				$('.main_Pagination').paging({
		            totalPages: Math.ceil(e.totalCount/pageSize), //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            // 回调函数		            initPageNo: pageNo, // 初始页码

		            callback: function(page){
		            	if(state == 1){
							state = 2 
		            	}else if(state == 2){
		            		history.pushState(history.state,"",'?type='+type+'&address='+address+'&sort='+sort+'&pageNo='+page)
		            		findAllParticularInfo(type,address,sort,pageNo,pageSize,1);
		            	}
		            }
	        	})
			}else{
				//数据为空的时候
				$(".main_cont").html("当前区域没有你查找的相关人员");
			}
		},
		error:function(){
			meg("提示","网络故障，请稍后再试！","body");
		}
	})

}
//var commonType=$(".sidebox a");
//点击侧边栏人员类型
// $(".sidebox a").click(function(e){
// 	var addrData=$(".main_nav_bg div div p.main_nav_x10_on").html();
// 	$(this).children().addClass("checked_on");
// 	$(this).siblings().children().removeClass("checked_on");
// 	// on_Loading();//加载
// 		//人员类型
// 	var personType=$(this).children().html();
// 	var type={
// 			type:personType,
// 		};
// 	var navState=$("li.main_nav_on");
// 	for(var i=0;i<navState.length;i++){
// 		if(navState.html()=="综合排序"){
// 		loadData(type,'person/personCount','person/showAll',0);
// 		}else if(navState.html()=="星级"){
// 			loadData(type,'person/personCount','person/showAllAndStar',0);
// 		}else if(navState.html()=="人气"){
// 			loadData(type,'person/personCount','person/showAllAndSellNumber',0);
// 		}else{
// 			return false;
// 		}
// 	}
// 	if(!addrData){
// 		return false;
// 	}else if(addrData=="全部"){
// 		addrData="成都";
// 		loadData(type,'person/personByAddressCount','/person/showAllAndAddress',1,addrData);
// 	}else{
// 		loadData(type,'person/personByAddressCount','/person/showAllAndAddress',1,addrData);
// 	}
// })
//点击横条的数据综合排序，星级，人气，商家所在地
// $(".main_nav_cont li").click(function(){
// 	if($(this).html()=="综合排序"){
// 		testLineType('person/personCount','person/showAll',0);
// 	}else if($(this).html()=="星级"){
// 		testLineType('person/personCount','person/showAllAndStar',0);
// 	}else if($(this).html()=="人气"){
// 		testLineType('person/personCount','person/showAllAndSellNumber',0);
// 	}else{
// 		var addrData=$(".main_nav_bg div div p.main_nav_x10_on").html();
// 		if(!addrData){
// 			return false;
// 		}else if(addrData=="全部"){
// 			addrData="成都";
// 			testLineType('person/personByAddressCount','/person/showAllAndAddress',1,addrData);
// 		}else{
// 			testLineType('person/personByAddressCount','/person/showAllAndAddress',1,addrData)
// 		}
// 	}
// })


//dataurl 请求数据条数的地址
//typeurl 根据数据类型和当前页码请求人员数据
//dataState地址的数据为1，其他的为0
//addressdata地址数据，不用放在对象里面
var dataTypeContent;
// function testLineType(dataurl,typeurl,dataState,addressdata){
// 	if($(".sidebox a").children().hasClass("checked_on")){
// 		    dataTypeContent=$(".sidebox a").children(".checked_on").html();
// 			var postdata={
// 				type:dataTypeContent,
// 			}
// 		}else{
// 			postdata={
// 				type:"主持人"
// 			}
// 		}
// 		loadData(postdata,dataurl,typeurl,dataState,addressdata);
// }


//persontypedata人员类型的数据
//dataurl 请求数据条数的地址
//typeurl 根据数据类型和当前页码请求人员数据
//dataState地址的数据为1，其他的为0
//addressdata地址数据，不用放在对象里面
// function loadData(persontypedata,dataurl,typeurl,dataState,addressdata){
// 	if(state==1){
// 	if(dataState==1){
// 		persontypedata.address=addressdata;
// 	}
// 	$.ajax({
// 			type:"post",
// 			url: apiUrl+dataurl,
// 			dataType: 'json',
// 			data: persontypedata,
// 			success:function(e){
// 				var totalPage=e;
// 				if(totalPage<=0){
// 					meg("提示","没有您需要的人员","body");
// 				}
// 				$('.main_Pagination').paging({
// 		            initPageNo: 1, // 初始页码
// 		            totalPages: totalPage, //总页数
// 		            // totalCount: '合计' + 5 + '条数据', // 条目总数
// 		            slideSpeed: 600, // 缓动速度。单位毫秒
// 		            jump: true, //是否支持跳转
// 		            callback: function(page) {
// 		            	var showAllData={};
// 		            	if(dataState==0){
// 		            		showAllData={
// 			            		type:persontypedata.type,
// 			            		currentPage:page,
// 		            		}
// 		            	}else if(dataState==1){
// 		            		showAllData={
// 			            		type:persontypedata.type,
// 			            		currentPage:page,
// 			            		address:addressdata,
// 		            		}
// 		            	}
// 		            	$.ajax({
// 							type:"post",
// 							url: apiUrl+typeurl,
// 							dataType: 'json',
// 							async: true,
// 							data: showAllData,
// 							success:function(e){
// 								var persons=e.lists;
// 								var html="";
// 								for(var i=0;i<persons.length;i++){
// 									var person=persons[i];
// 									// //人员地址
// 									 var addr=person.p_address.split(",").join("");
// 									// // 人员星级
// 									 var star='';
// 									 for(var j=0;j<person.p_star;j++){
// 									 	star+='<i></i>';
// 									 }
// 									 //案例
// 									 var personcase=person.p_case.split(",");
// 									 html+='<li>'+
// 										'<a href="b_Preferred_ZCR_Case.html?pid='+person.p_id+'">'+
// 											'<div class="details">'+
// 												'<div class="details_user">'+
// 													'<div class="details_logo" style="background:url('+person.p_logo+') no-repeat scroll center center/cover"></div>'+
// 													'<h1>'+person.p_name+'</h1>'+
// 													'<p>'+addr+'</p>'+
// 													'<span>'+star+'</span>'+
// 													'<div class="details_but">查 看 详 情</div>'+
// 												'</div>'+
// 												'<div class="details_cont">'+
// 													'<div class="details_cont_x10"  style="background:url('+personcase[0]+') no-repeat scroll center center/cover">'+
// 														'<div>'+
// 															'<img src="images/index_Avatar01.png" alt="">'+
// 															'<p>让婚礼人更专注</p>'+
// 														'</div>'+
// 													'</div>'+
// 													'<div class="details_cont_x20">'+
// 														'<div class="details_cont_x50" style="background:url('+personcase[1]+') no-repeat scroll center center/cover">'+
// 															'<div>'+
// 																'<img src="images/index_Avatar01.png" alt="">'+
// 																'<p>让婚礼人更专注</p>'+
// 															'</div>'+
// 														'</div>';
// 														if(personcase.length > 2){
// 															html+='<div class="details_cont_x50" style="background:url('+personcase[2]+') no-repeat scroll center center/cover">'+
// 																'<div>'+
// 																	'<img src="images/index_Avatar01.png" alt="">'+
// 																	'<p>让婚礼人更专注</p>'+
// 																'</div>'+
// 															'</div>';
// 														};
// 														html+='</div></div></div></a></li>';
// 								}
// 								$(".main_cont").html(html);
// 							},
// 							error:function(){
// 								meg("提示","网络故障","body");
// 							}
// 		            	})
// 		            }
// 		        })

// 				down_Loading();//加载完成
// 			},
// 			error:function(){
// 				down_Loading();//加载完成
// 				meg("提示","网络故障","body");
// 			}
// 		})
// 	}
// }

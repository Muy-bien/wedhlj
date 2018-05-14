$(document).ready(function(){
	//导航栏默认选中
  $(".nav_li").eq(0).find("a").addClass("nav_on");
})
//导航栏默认选中
$(".nav_li").eq(0).find("a").addClass("nav_on");
var state = 1;
var status=1;
var token=$.cookie("login_on");
var auditStatus=1;//展示的都是通过审核的数据
var sort=getUrlParam("sort");
var schemeStyle=getUrlParam("schemeStyle");//策划风格
var pageNo=getUrlParam("pageNo");
var pageSize=8;
// 做地址栏参数为空判断
if(!sort||!schemeStyle||!pageNo){
	sort=0;pageNo=1,schemeStyle=null;
	history.pushState(history.status,"",'?sort='+sort+'&pageNo='+pageNo+'&schemeStyle='+schemeStyle+'')
}
//当前页面默认选中
$(".nav_li").eq(0).find("a").addClass("nav_on");
queryAllScheme(auditStatus,sort,schemeStyle,pageNo,pageSize,1);
if(sort==0){
	$(".main_nav01").eq(0).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
}else if(sort==1){
	$(".main_nav01").eq(1).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
}else if(sort==2){
	$(".main_nav01").eq(2).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
}
if(!schemeStyle){
	$(".main_nav_x10 p").eq(0).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	$(".main_nav_bg span").html('全部');
}else if(schemeStyle=='西式案例'){
	$(".main_nav_x10 p").eq(1).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	$(".main_nav_bg span").html('西式案例');
}else if(schemeStyle=='中式案例'){
	$(".main_nav_x10 p").eq(2).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	$(".main_nav_bg span").html('中式案例');
}else if(schemeStyle=='森式案例'){
	$(".main_nav_x10 p").eq(3).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	$(".main_nav_bg span").html('森式案例');
}else if(schemeStyle=='户外案例'){
	$(".main_nav_x10 p").eq(4).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	$(".main_nav_bg span").html('户外案例');
}else if(schemeStyle=='教堂案例'){
	$(".main_nav_x10 p").eq(5).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	$(".main_nav_bg span").html('教堂案例');
}
//点击导航栏执行命令
$(".main_nav01").click(function(){
	 if(schemeStyle=='全部'||schemeStyle==undefined){
	 	schemeStyle=null
	 }
	$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
	$(".main_nav_x10 p").removeClass('main_nav_x10_on');
	$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	var this_index = $(this).index();
	if(this_index == 0){
		history.pushState(history.status,"",'?sort=0&pageNo=1&schemeStyle='+schemeStyle+'');
		queryAllScheme(auditStatus,sort,schemeStyle,pageNo,pageSize,1);
	}else if(this_index == 1){
		history.pushState(history.status,"",'?sort=1&pageNo=1&schemeStyle='+schemeStyle+'');
		queryAllScheme(auditStatus,sort,schemeStyle,pageNo,pageSize,1);
	}else if(this_index == 2){
		history.pushState(history.status,"",'?sort=2&pageNo=1&schemeStyle='+schemeStyle+'');
		queryAllScheme(auditStatus,sort,schemeStyle,pageNo,pageSize,1);
	}
})
$(".main_nav_x10 p").click(function(){
	if($(this).html()=='全部'){
		schemeStyle=null;
		history.pushState(history.status,"",'?sort='+sort+'&pageNo='+pageNo+'&schemeStyle='+schemeStyle+'');
		queryAllScheme(auditStatus,sort,null,pageNo,pageSize,1);
	}else{
		schemeStyle=$(this).html();
		history.pushState(history.status,"",'?sort='+sort+'&pageNo='+pageNo+'&schemeStyle='+schemeStyle+'');
		queryAllScheme(auditStatus,sort,schemeStyle,pageNo,pageSize,1);	
	}
	$(".main_nav_bg span").html($(this).text());
	//$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
	//$(".main_nav01").removeClass('main_nav_on');
	$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
	//dis(data,"scheme/showAllAndStyle","scheme/schemeByStyleCount");
})

//下拉框高度
$(".main_nav_bg").hover(
	function(){
		var main_nav = $(".main_nav_x20").outerHeight();
		$(".main_nav_x10").css("height",main_nav);
	},function(){
		$(".main_nav_x10").css("height","0");
	}
)

///scheme/queryAllScheme
///@token：$.cookie("login_on")
///@auditStatus:1--已通过的策划
///@sort:(按照什么排序 综合排序：0；星级：1；人员)
///@schemeStyle：风格类型，全部可以传空
///@pageNo：当前页码
///@pageSize：每页的策划数量
function queryAllScheme(auditStatus,sort,schemeStyle,pageNo,pageSize,state){
	on_Loading();
	$.ajax({
		type:'post',
		url:apiUrl+'/scheme/queryAllScheme',
		data:{auditStatus:auditStatus,sort:sort,schemeStyle:schemeStyle,pageNo:pageNo,pageSize:pageSize},
		dataType:'json',
		success:function(e){
			var schemeList=e.schemeList;
			if(schemeList.length!=0){
				var schemeListCont="";
				for(var i=0;i<schemeList.length;i++){
					showPic=schemeList[i].schemeSignArea.split(",");
					schemeListCont+='<li>'+
										'<a href="b_CaseDetails.html?schemeNo='+schemeList[i].schemeNo+'">'+
											'<div class="main_img" >'+
												'<div class="img_contain" style="background:url('+apiUrl+showPic[0]+')"></div>'+
												//'<img src="'+apiUrl+showPic[0]+'" alt="">'+
											'</div>'+
											'<div class="main_cont_x10">'+
												'<h1>'+schemeList[i].schemeName+'</h1>'+
												'<p class="main_cont_x20">￥'+schemeList[i].schemePrice+'</p>'+
												'<p>策划师：'+schemeList[i].schemeDesigner+'</p>'+
												'<p>风格分类：'+schemeList[i].schemeStyle+'</p>'+
											'</div>'+
										'</a>'+
									'</li>'
				}
				//分页
				$('.main_Pagination').paging({
		            initPageNo: pageNo, // 初始页码
		            totalPages: Math.ceil(e.totalCount/pageSize), //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            callback: function(page) { // 回调函数
		            	if(state==1){
		            		state=2
		            	}else if(state==2){
	            			history.pushState(history.status,"",'?sort='+sort+'&pageNo='+page+'&schemeStyle='+schemeStyle+'');
							queryAllScheme(auditStatus,sort,schemeStyle,page,pageSize,1);
							state=1;
		            	}
		            }
		        })
				$(".main_cont").html(schemeListCont);
			}else{
				$(".main_cont").html('当前区域没有您需要的数据！');
				$(".main_Pagination").html('');
			}
			down_Loading();
		},
		error:function(){
			down_Loading();
 			meg("提示","服务器开了小差，请稍后重试","body");
		}
	})
}

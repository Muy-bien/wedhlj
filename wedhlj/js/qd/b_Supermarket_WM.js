$(".main_nav01").click(function(){
	$(".main_nav_bg span").html("商家所在地");
	$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
	$(".main_nav_x10 p").removeClass('main_nav_x10_on');
	$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
})
$(".main_nav_x10 p").click(function(){
	$(".main_nav_bg span").html($(this).text());
	$(".main_nav_bg").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
	$(".main_nav01").removeClass('main_nav_on');
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

function warning(){
    meg("提示","功能正在升级","body")
}
var state = 1;
var ptype = "";
//页面初始化，导入信息
$(document).ready(function(){
	//当前页面默认选中
	$(".nav_li").eq(2).find("a").addClass("nav_on")
	//接收URL中的参数
	var id = getUrlParam('fws');
	//展示内容
	NewInfo(0,"成都","道具",1)
})

//获取最新信息
function NewInfo(sort,address,type,pageNo){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/product/queryAllProduct',
		data: {token:"",auditStatus:1,pageNo:pageNo,pageSize:5,sort:sort,address:address,type:type},
		dataType: 'json',
		success:function(e){
			console.log(e)
			$(".main_Pagination").html("")//清空分页列表
			/*if(e.productList != ""){
				$('.main_Pagination').paging({
		            initPageNo: page, // 初始页码
		            totalPages: Math.ceil(e.totalCount/5), //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            // 回调函数
		            callback: function(page){
		            	if(state == 1){
							state = 2 
		            	}else if(state == 2){
		            		history.pushState(history.state,"","?page="+page+"&auditStatus="+auditStatus)
		            		show(page,auditStatus,1)
		            	}
		            }
	        	})
			}*/
		}
	})
}
//获取广告

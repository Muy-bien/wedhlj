var state=1;
$(document).ready(function(){
	$(".nav_li").eq(4).find("a").addClass("nav_on");
	//	星级
	$(".main_nav01").click(function(){
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	//酒店所在地
	$(".main_nav_x10 p").click(function(){
		$(".main_nav_bg span").html($(this).text());
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
	var priceDec;
	//价格
	$(".main_nav01").click(function(){
		$(".price span").html("价格");
		$(".price").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
		$(this).addClass('main_nav_on').siblings('').removeClass('main_nav_on');
	})
	$(".price_x10 p").click(function(){
		$(".price span").html($(this).text());
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".main_nav_bg").css({'background':'url(images/main_nav02.png) no-repeat 120px center'});
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

	// 获取地址栏参数
	var pageSize=getUrlParam('pageSize');
	var sort=getUrlParam('sort');
	var address=getUrlParam('address');
	var pageNo=getUrlParam('pageNo');
	// 默认情况
	if(pageSize==null&&sort==null&&address==null&&pageNo==null){
		pageSize=6;pageNo=1;
		queryAllHotelInfo(6,0,'成都',1);//默认每页6条数据，按星级排序，全成都数据，第一页
	}
	// 根据地址栏做导航栏判断
	// 地址栏中的详细地址p
	
	// 给地区加选中样式的函数
	function placeOn(){
		var place=$(".main_nav_x10 p");
		for(var i=0;i<place.length;i++){
				if(place[i].innerHTML==address){
					place[i].setAttribute('class','main_nav_x10_on');
				}
			}
	}
	// 给价格加选中样式的函数
	function priceOn(){
		var price=$(".datePrice_x20 p");
		for(var i=0;i<price.length;i++){
				if(sort==1){
					if(price[i].innerHTML=='从低到高'){
						price[i].setAttribute('class','main_nav_x10_on');
					}
				}else if(sort==2){
					if(price[i].innerHTML=='从高到低'){
						price[i].setAttribute('class','main_nav_x10_on');
					}
				}
			}
	}
	if(sort==0){//星级
		$(".main_nav01").addClass("main_nav_on");
		//$(".main_nav_x10 p").removeClass('main_nav_x10_on');
		if(address!=null){
			$(".main_nav_bg span").html(address);
			placeOn();
		}else{
			$(".main_nav_bg span").html('成都');
		}
		queryAllHotelInfo(6,0,$(".main_nav_bg span").html(),pageNo);
	}else if(sort==1){//价格从低到高
		priceOn();
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".price span").html("从低到高");
		$(".main_nav01").removeClass("main_nav_on");
		if(address!=null){
			$(".main_nav_bg span").html(address);
			placeOn()
		}else{
			$(".main_nav_bg span").html('成都');
		}
		queryAllHotelInfo(pageSize,1,$(".main_nav_bg span").html(),pageNo);
	}else if(sort==2){//价格从高到低
		priceOn();
		$(".price").css({'background':'rgba(255,255,255,0.2) url(images/main_nav01.png) no-repeat 120px center'});
		$(".main_nav01").removeClass("main_nav_on");
		$(".price span").html("从高到低");
		if(address!=null){
			$(".main_nav_bg span").html(address);
			placeOn()
		}else{
			$(".main_nav_bg span").html('成都');
		}
		queryAllHotelInfo(pageSize,2,$(".main_nav_bg span").html(),pageNo);
	}else{//其他情况，包括先点击地区选中
		if(address!=null){
			$(".main_nav_bg span").html(address);
			placeOn()
		}else{
			$(".main_nav_bg span").html('成都');
		}
		queryAllHotelInfo(pageSize,0,$(".main_nav_bg span").html(),pageNo);
	}
	
	//点击导航栏修改地址栏以及发送对应请求修改页面数据
	// 价格
	$(".datePrice_x20 p").click(function(){
		if($(this).html()=='从低到高'){
			location.href='b_AboutHotel.html?pageSize='+pageSize+'&sort='+1+'&address='+address+'&pageNo=1';
		}else if($(this).html()=='从高到低'){
			location.href='b_AboutHotel.html?pageSize='+pageSize+'&sort='+2+'&address='+address+'&pageNo=1';
		}
	})
	// 星级
	$(".main_nav01").click(function(){
		location.href='b_AboutHotel.html?pageSize='+pageSize+'&sort='+0+'&address='+address+'&pageNo=1';
	})
	//地区encodeURI(name)decodeURI 
	$(".main_nav_x20 p").click(function(){
		location.href='b_AboutHotel.html?pageSize='+pageSize+'&sort='+sort+'&address='+$(this).text()+'&pageNo=1';
	})
})


	//获取类型
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return decodeURI(r[2]); return null; //返回参数值
	}


///hotel/queryAllHotelInfo
	//pageSize:页面容量
	//sort：排序方式 0按照星级排序 1价格升序 2价格降序 
	//address：地区参数
	//pageNo：当前页码
function queryAllHotelInfo(pageSize,sort,address,pageNo){
	on_Loading();
	$.ajax({
			type:"post",
			url: apiUrl+'/hotel/queryAllHotelInfo',
			dataType: 'json',
			data: {pageSize:pageSize,sort:sort,address:address,pageNo:pageNo},
			success:function(e){
				if(e.totalCount>=1){
					var totalPage=Math.ceil(e.totalCount/pageSize);
					var html="";
					for(var i=0;i<e.hotelList.length;i++){
						var img=e.hotelList[i].hotelImgUrl.split(",")[0];
						html+='<div class="h_items">'+
									'<div class="h_item01 img_auto" style="background-image: url('+apiUrl+img+')"></div>'+
									'<div class="h_item02">'+
										'<p class="h_name">'+e.hotelList[i].hotelName+'</p>'+
										'<div class="h_address">'+e.hotelList[i].hotelAddress+'</div>'+
										'<div>'+
											'<div class="h_base">酒店基本信息</div>'+
											'<div class="h_base_content">'+e.hotelList[i].hotelInformation+''+
											'</div>'+
										'</div>'+
										'<div>'+
											'<div class="h_price">价格</div>'+
											'<div class="h_price_content">'+e.hotelList[i].hotelPrice+'</div>'+
										'</div>'+
										'<a href="b_AboutHotelDetail.html?hid='+e.hotelList[i].hotelId+'"><div class="h_detail_button">查看详情</div></a>'+
									'</div>'+
								'</div>'
					}
					$(".main").html(html);
					$('.main_Pagination').paging({
				            initPageNo: pageNo, // 初始页码
				            totalPages: totalPage, //总页数
				            // totalCount: '合计' + 5 + '条数据', // 条目总数
				            slideSpeed: 600, // 缓动速度。单位毫秒
				            jump: true, //是否支持跳转
				            callback: function(page) {
				            	if(state==1){
				            		state=2;
				            	}else if(state==2){
				            		location.href='b_AboutHotel.html?pageSize='+pageSize+'&sort='+sort+'&address='+address+'&pageNo='+page+'';
				            	}
				            }
				         })
				}else{
					$(".main").html('没有您需要的数据！');
				}
			 down_Loading();
			 },
			 error:function(){
			 	down_Loading();
			 	meg("提示","请检查网络，稍后再试！","body");
			 }
	})
}
	max_text();
	//限制字符个数
	function max_text(){
		$(function(){
			$(".h_base_content").each(function(){
				var maxwidth=95;
				if($(this).text().length>maxwidth){ 
					$(this).text($(this).text().substring(0,maxwidth)); 
					$(this).html($(this).html()+'…');
				}
			});
		});
	}	


//页面初始化，导入信息
$(document).ready(function(){
	//当前页面默认选中
	$(".nav_li").eq(2).find("a").addClass("nav_on")
	//接收URL中的参数
	var sort = getUrlParam('sort');//排序
	var address = getUrlParam('address');//所在地
	var type = getUrlParam('type');//类型
	var page = getUrlParam('page');//当前页数
	//导航栏移入选中效果
	hover_nav();
	//导航栏点击事件
	click_nav();
	//右边导航栏点击事件
	click_sidebox();
	//展示内容
	if(sort==null||address==null||type==null||page==null){
		history.pushState(history.state,"","?sort=0&address=成都市&type=舞美&page=1");
		NewInfo(0,"成都市","舞美",1,1,1);
		defaultStyle(0,"成都市");//默认排序
	}else{
		NewInfo(sort,address,type,page,1,1);
		defaultStyle(sort,address);//默认排序
	}

	//展示推荐商品
	if(type==null){
		Recommend("舞美");
	}else if(type=="道具"||type=="舞美"){
		Recommend(type)
	}
})

//获取最新信息
//sort==>排序（综合：0，星级：1，人气：2）
//address==>所在地
//type==>类型(道具、舞美)
//page==>当前页数
//state==>初始化函数
//Reset===>>判断是否刷新分页Dom(1:是)
function NewInfo(sort,address,type,page,state,Reset){
	$(".main_cont").html("加载中......");
	$.ajax({
		type: 'POST',
		url: apiUrl+'/product/showAllProduct',
		data: {type:type,address:address,sort:sort,pageNo:page,pageSize:5},
		dataType: 'json',
		success:function(e){
			if(e.merchantList != ""){
				show(e,type);//渲染商品列表内容
				if(Reset==1){
					$(".main_Pagination").html("");//清空分页列表
					if(Math.ceil(e.totalCount/5)>1){
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
				            		history.pushState(history.state,"","?sort="+sort+"&address="+address+"&type="+type+"&page="+page);
				            		NewInfo(sort,address,type,page,1,2)
				            	}
				            }
			        	})
					}
				}
			}else{
				$(".main_cont").html("未查询到相关信息");
			}
		}
	})
}
//显示商家列表
function show(e,type){
	var str = "";
	for(var i=0;i<e.merchantList.length;i++){
		var data = e.merchantList[i];
		//星级
		var star = "";
		for(var s=0;s<data.star;s++){
			star +='<i></i>'
		}
		//所有商品
		var on_product = "";
		if(data.product != ""){
			for(var x=0;x<(data.product.length >= 3?3:data.product.length);x++){
				var data_product = data.product[x];
				on_product +='<div>'+
					'<a href="b_Addorder.html?productNo='+data_product.productNo+'&type='+type+'">'+
						'<div class="mainc_cont_01">'+
							'<div class="img_auto" style="background-image:url('+apiUrl+data_product.productImage.split(",")[0]+')"></div>'+
						'</div>'+
						'<div class="mainc_cont_title">'+
							'<div class="mainc_cont_x10">'+
								'<h1>【'+data_product.productName+'】</h1>'+
								'<p>'+data_product.productDesc+'</p>'+
							'</div>'+
							'<div class="mainc_cont_x20">'+
								'<p>￥<span class="mainc_cont_x30">'+(data_product.discountPrice=="0.0"?data_product.productPrice:data_product.discountPrice)+'</span></p>'+
							'</div>'+
						'</div>'+
					'</a>'+
				'</div>';
			}
		}
		//所有服务商
		str +='<div class="main_cont_01">'+
			'<div class="mainc_top">'+
				'<div class="mainc_top_box">'+
					'<div class="mainc_top_left">'+
						'<a href="b_Supermarket_FWS.html?id='+data.mId+'&type='+type+'"><div class="img_auto" style="background-image:url('+(data.mLogo==""?"":apiUrl+data.mLogo)+')"></div></a>'+
					'</div>'+
					'<div class="mainc_top_content">'+
						'<p class="mainc_p10"><a href="b_Supermarket_FWS.html?id='+data.mId+'&type='+type+'">'+data.mName+'</a></p>'+
						'<p class="mainc_p20">'+data.mAddress.split(",").join("")+'</p>'+
						'<p class="mainc_p30">'+star+'</p>'+
					'</div>'+
				'</div>'+
				'<div class="mainc_top_right">'+
					'<div><a href="b_Pshowcase.html?id='+data.mId+'&type='+type+'">进入商家</a></div>'+
				'</div>'+
			'</div>'+
			'<div class="mainc_cont">'+on_product+'</div>'+
		'</div>';
	}
	$(".main_cont").html(str);
}
//获取推荐商品
//type==>类型(道具、舞美)
function Recommend(type){
	//默认选中
	if(type=="舞美"){
		$(".sidebox_01").addClass('sidebox_on');
	}else if(type=="道具"){
		$(".sidebox_02").addClass('sidebox_on');
	}
	$.ajax({
		type: 'POST',
		url: apiUrl+'/product/queryTuiJProduct',
		data: {type:type},
		dataType: 'json',
		success:function(e){
			var str = "";
			if(e.productList != ""){
				for(var i=0;i<e.productList.length;i++){
					var data = e.productList[i];
					str+='<div>'+
						'<a href="b_Addorder.html?productNo='+data.productNo+'&type='+type+'">'+
							'<div class="main_rcont_x10"><div class="img_auto" style="background-image:url('+apiUrl+data.productImage.split(",")[0]+')"></div></div>'+
							'<div class="main_rcont_x20">'+
								'<h1>【'+data.productName+'】'+data.productDesc+'</h1>'+
								'<div class="main_rcont_x30">'+(data.discountPrice=="0.0"?'<p class="main_rcont_x40">￥<span>'+data.productPrice+'</span></p>':'<p class="main_rcont_x40">￥<span>'+data.discountPrice+'</span></p><p class="main_rcont_x50">原价￥<span>'+data.productPrice+'</span></p>')+'</div>'+
							'</div>'+
						'</a>'+
					'</div>'
				}
			}else{
				str = "未查询到相关信息"		
			}
			$(".main_right_cont").html(str);
		}
	})
}
//移入导航栏效果
function hover_nav(){
	$(".main_nav_bg").hover(
		function(){
			var main_nav = $(".main_nav_x20").outerHeight();
			$(".main_nav_x10").css("height",main_nav);
		},function(){
			$(".main_nav_x10").css("height","0");
		}
	)
}
//点击导航栏执行函数
function click_nav(){
	//点击排序
	$(".main_nav01").click(function(){
		$(this).addClass('main_nav_on').siblings('.main_nav01').removeClass('main_nav_on');
		var this_index = $(this).index();//当前索引
		//接收URL中的参数
		var address = getUrlParam('address');//所在地
		var type = getUrlParam('type');//类型
		if(type==null||address==null){
			type = "舞美";
			address = "成都市";
		}
		history.pushState(history.state,"","?sort="+this_index+"&address="+address+"&type="+type+"&page=1");
		NewInfo(this_index,address,type,1,1,1);
	})
	//点击所在地
	$(".main_nav_x10 p").click(function(){
		var this_text = $(this).text()=="全部"?"成都市":$(this).text()//当前所在地
		$(".main_nav_bg span").html(this_text);
		$(this).addClass('main_nav_x10_on').siblings('').removeClass('main_nav_x10_on');
		//接收URL中的参数
		var sort = getUrlParam('sort');//排序
		var type = getUrlParam('type');//类型
		if(type==null||sort==null){
			type = "舞美";
			sort = 0;
		}
		history.pushState(history.state,"","?sort="+sort+"&address="+this_text+"&type="+type+"&page=1");
		NewInfo(sort,this_text,type,1,1,1);
	})
}
//点击侧边栏导航
function click_sidebox(){
	$(".sidebox div").click(function(){
		$(this).addClass('sidebox_on').siblings('div').removeClass('sidebox_on');
		var this_index = $(this).index();
		if(this_index==1){
			history.pushState(history.state,"","?sort=0&address=成都市&type=舞美&page=1");
			NewInfo(0,"成都市","舞美",1,1,1);
			Recommend("舞美");//展示推荐商品
		}else if(this_index==2){
			history.pushState(history.state,"","?sort=0&address=成都市&type=道具&page=1");
			NewInfo(0,"成都市","道具",1,1,1);
			Recommend("道具");//展示推荐商品
		}
	})
}
//默认样式
function defaultStyle(sort,address){
	$(".main_nav01").eq(sort).addClass('main_nav_on');
	$(".main_nav_bg span").text(address);
	var list_length = $(".main_nav_x20 p");
	for(var i=0;i<list_length.length;i++){
		if(list_length.eq(i).text()==address){
			$(".main_nav_x20 p").eq(i).addClass('main_nav_x10_on');
		}
	}
}

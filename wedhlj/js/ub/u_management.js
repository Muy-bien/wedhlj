//页面加载时执行
$(document).ready(function(){
	//页面刷新执行内容渲染
	resultCount();
	if(!page || !auditStatus){
		$(".main_title_cont h1").eq(0).addClass('main_title_cont_on')
		show(1,1,1,1)
	}else{
		show(page,auditStatus,1,1)
	}
	if(auditStatus == 1){
		$(".main_title_cont h1").eq(0).addClass('main_title_cont_on')
	}else if(auditStatus == -1){
		$(".main_title_cont h1").eq(1).addClass('main_title_cont_on')
	}else if(auditStatus == 0){
		$(".main_title_cont h1").eq(2).addClass('main_title_cont_on')
	}
	//点击标题渲染相应内容
	$(".main_title_cont h1").click(function(){
		$(this).addClass('main_title_cont_on').siblings('').removeClass('main_title_cont_on');
		var index = $(this).index()
		if(index == 0){
			history.pushState(history.state,"","?page=1&auditStatus=1")
			show(1,1,1,1)
		}else if(index == 1){
			history.pushState(history.state,"","?page=1&auditStatus=-1")
			show(1,-1,1,1)
		}else if(index == 2){
			history.pushState(history.state,"","?page=1&auditStatus=0")
			show(1,0,1,1)
		}
	})
})
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(3).addClass("nav_cont_on");
}
//接收URL中的参数
var page = getUrlParam('page');
var auditStatus = getUrlParam('auditStatus');

//展示全部商品
//Reset===>>判断是否刷新分页Dom(1:是)
function show(page,auditStatus,state,Reset){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/product/queryAllProduct',
		data: {token:$.cookie("login_on"),auditStatus:auditStatus,pageNo:page,pageSize:5},
		dataType: 'json',
		success:function(e){
			showlist(e,auditStatus);//渲染列表内容
			if(Reset==1){
				$(".main_Pagination").html("");//清空分页列表
				if(e.productList != "" && Math.ceil(e.totalCount/5)>1 && Reset==1){
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
			            		show(page,auditStatus,1,2)
			            	}
			            }
		        	})
				}
			}
		}
	})
}
//渲染列表内容
function showlist(data,auditStatus){
	console.log(data.productList);
	var str = "";
	if(data.productList != ""){
		for(var i=0;i<data.productList.length;i++){
			var productList = data.productList[i];
			console.log(productList.productNo);
			console.log(productList.productType);
			str +='<ul onclick="turnShop('+productList.productNo+','+productList.productType+')">'+
				'<li><p>'+productList.productNo+'</p></li>'+
				'<li><div class="main_cont_list_img img_auto" style="background-image:url('+apiUrl+productList.productImage.split(",")[0]+')"></div></li>'+
				'<li><p>'+productList.productName+'</p></li>'+
				'<li><p>'+(productList.discountPrice=="0.0"?productList.productPrice:productList.discountPrice)+'</p></li>'+
				'<li><p>'+productList.sellNumber+'</p></li>'+
				'<li><p>'+jsonDateFormat(productList.createTime.time).substr(0,10)+'</p></li>'+
				'<li>'+
					'<button onclick="Edit('+productList.productNo+')">编辑</button>'+
					'<button onclick="onDelete('+productList.productNo+','+auditStatus+')">删除</button>'+
				'</li>'+
			'</ul>';
		}	
	}else{
		str = "当前没有商品"
	}
	$(".main_cont_list").html(str);
}
//所有审核状态个数
function resultCount(){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/product/resultCount',
		data: {token:$.cookie("login_on")},
		dataType: 'json',
		success:function(e){
			$(".main_title_cont h1").eq(0).find("span").text("("+e.successAuditCount+")");
			$(".main_title_cont h1").eq(1).find("span").text("("+e.reviewAuditCount+")");
			$(".main_title_cont h1").eq(2).find("span").text("("+e.failureAuditingCount+")");
		}
	})
}
//删除
function onDelete(id,auditStatus){
	meg2("提示","是否确认删除商品","body",on_Delete)
	function on_Delete(){
		$.ajax({
			type: 'POST',
			url: apiUrl+'/product/delProduct',
			data: {productNos:id},
			dataType: 'json',
			success:function(e){
				if(e.status == 200){
					meg("提示","商品删除成功","body",dothing)
					function dothing(){
						resultCount();
						show(1,auditStatus,1)
					}
				}else{
					meg("提示","删除失败，请稍后重试","body")
				}		
			}
		})
	}
}
//编辑
function Edit(id){
	window.location.href = "u_management_edit.html?id="+id
}

// 跳转到商品详情页面
function turnShop(productNo,type){
	window.location.href="b_Addorder.html?productNo="+productNo+"&type="+type+"";
}


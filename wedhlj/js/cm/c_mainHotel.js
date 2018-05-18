$(document).ready(function(){
	//获取地址栏上的值，并执行操作
	var pageNo=getUrlParam('pageNo');
	if(pageNo==null){
		history.pushState(history.state,"","?pageNo=1");
		queryAllHotelInfo(1,1);
	}else{
		queryAllHotelInfo(pageNo,1);
	}		
})
///hotel/queryAllHotelInfo
//pageSize:页面容量
//sort：排序方式 0按照星级排序 1价格升序 2价格降序 
//address：地区参数
//pageNo：当前页码 
function queryAllHotelInfo(pageNo,state){
	on_Loading();
	$.ajax({
		type:"post",
		url: apiUrl+'/hotel/queryAllHotelInfo',
		dataType: 'json',
		data: {pageSize:8,pageNo:pageNo},
		success:function(e){
			$(".main_Pagination").html("");
			if(e.totalCount>=1){
				var totalPage=Math.ceil(e.totalCount/8);
				var html="";
				for(var i=0;i<e.hotelList.length;i++){
					html+='<div class="hotel_detail_item">'+
								'<a href="b_AboutHotelDetail.html?hid='+e.hotelList[i].hotelId+'" target="_blank"><div>'+e.hotelList[i].hotelName+'</div></a>'+
								'<div>'+e.hotelList[i].hotelTelephone+'</div>	'+
								'<div>'+e.hotelList[i].hotelAddress+'</div>'+	
								'<div class="buttons">'+
									'<a href="c_AboutHotelEdit.html?id='+e.hotelList[i].hotelId+'"><div class="showbutton">编辑</div></a>'+
									'<div class="showbutton" onclick="meg_delete('+e.hotelList[i].hotelId+')">删除</div>'+
								'</div>'+
						  '</div>'
				}
				$(".hotel_detail_items").html(html);
				if(totalPage > 1){
					$('.main_Pagination').paging({
			            initPageNo: pageNo, // 初始页码
			            totalPages: totalPage, //总页数
			            slideSpeed: 600, // 缓动速度。单位毫秒
			            jump: true, //是否支持跳转
			            callback: function(page) {
			            	if(state==1){
			            		state=2;
			            	}else if(state==2){
			            		history.pushState(history.state,"","?pageNo="+page);
			            		queryAllHotelInfo(page,1);
			            	}
			            }
		         	})
				}
			}else{
				$(".hotel_detail_items").html('当前还没有添加酒店');
			}
		 	down_Loading();
		 },
		 error:function(){
		 	down_Loading();
		 	meg("提示","请检查网络，稍后再试！","body");
		 }
	})
}
//删除酒店  
//hotelId：酒店id
function meg_delete(hid){
	meg2("提示","是否删除该酒店的所有信息？","body",deleteSuccess);
	//删除成功执行的函数
	function deleteSuccess(){
		$.ajax({
			type:"post",
			url: apiUrl+'/hotel/deleteHotel',
			dataType: 'json',
			data: {id:hid},
			success:function(e){
				if(e.status==200){
					meg("提示","删除成功","body",uploaded);
					function uploaded(){
						history.pushState(history.state,"","?pageNo=1");
						queryAllHotelInfo(1,1);
					}
				}else{
					meg("提示","删除失败","body");
				}
			},
			error:function(){
			 	meg("提示","请检查网络，稍后再试！","body");
			}
		})
	}
}
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(4).addClass("nav_cont_on");
}
//修改header样式
var add_header = function(){
	$(".header").prepend('<div class="Return_index"><a href="c_AboutHotelAdd.html" target="_blank"><p>添加酒店</p></a></div>')
}
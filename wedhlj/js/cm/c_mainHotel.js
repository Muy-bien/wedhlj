var state=1;
$(document).ready(function(){
	var username=$.cookie('user');
	if(!username){
		// window.location.href="index.html";
	}else{
		$(".h_name").html(username);
	}
	//点击人员审核 用户基本资料审核
	$(".person").click(function(){//点击人员审核
		window.location.href="c_mainCheck.html?choose=0&&Cstatus=0";
	})
	$(".merchant").click(function(){//点击用户基本资料审核
		window.location.href="c_mainCheck.html?choose=1&&Cstatus=0";
	})
	//退出登录
	$(".sign_out").click(function(){
		meg2("提示","是否确定退出登录","body",doThing)
		function doThing(){
			$.cookie("login_on","",{ path:'/',secure:false , expires: -1});//清空token
			$.cookie("user","",{ path:'/',secure:false , expires: -1});//清空用户名
			$.cookie("h_position","",{ path:'/',secure:false , expires: -1});//清空用户类型定位信息
			window.location.href = "index.html";
		}
	})
})
//获取地址栏中的数据
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return decodeURI(r[2]); return null; //返回参数值
}

var pageNo=getUrlParam('pageNo');
	if(pageNo==null){
	queryAllHotelInfo(1);
	}else{
	queryAllHotelInfo(pageNo);
	}

		
		
///hotel/queryAllHotelInfo
	//pageSize:页面容量
	//sort：排序方式 0按照星级排序 1价格升序 2价格降序 
	//address：地区参数
	//pageNo：当前页码 
function queryAllHotelInfo(pageNo){
	on_Loading();
	$.ajax({
			type:"post",
			url: apiUrl+'/hotel/queryAllHotelInfo',
			dataType: 'json',
			data: {pageSize:8,pageNo:pageNo},
			success:function(e){
				console.log(e);
				if(e.totalCount>=1){
					var totalPage=Math.ceil(e.totalCount/8);
					var html="";
					for(var i=0;i<e.hotelList.length;i++){
						console.log(e.hotelList[i].hotelId);
						html+='<div class="hotel_detail_item">'+
									'<a href="b_AboutHotelDetail.html?hid='+e.hotelList[i].hotelId+'"><div title="'+e.hotelList[i].hotelName+'">'+e.hotelList[i].hotelName+'</div></a>'+
									'<div>'+e.hotelList[i].hotelTelephone+'</div>	'+
									'<div title="'+e.hotelList[i].hotelAddress+'">'+e.hotelList[i].hotelAddress+'</div>'+	
									'<div class="buttons">'+
										'<a href="c_AboutHotelEdit.html?id='+e.hotelList[i].hotelId+'" target="_blank"><div class="showbutton">编辑</div></a>'+
										'<div class="showbutton deleteHotel">删除<div class="hide">'+e.hotelList[i].hotelId+'</div></div>'+
									'</div>'+
							  '</div>'
					}
					$(".hotel_detail_items").html(html);
					$(".deleteHotel").click(function(){
							var hid=$(this).children().html();
							meg2("提示","是否删除该酒店的所有信息？","body",deleteSuccess)
							//删除成功执行的函数
							function deleteSuccess(){
								//发送删除请求，调用删除函数
								deleteHotel(hid);
							}
					})
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
				            		location.href='c_mainHotel.html?pageNo='+page+'';
				            	}
				            }
				         })
				}else{
					$(".hotel_detail_items").html('没有酒店的相关的数据！');
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
function deleteHotel(hotelId){
	$.ajax({
			type:"post",
			url: apiUrl+'/hotel/deleteHotel',
			dataType: 'json',
			data: {id:hotelId},
			success:function(e){
				if(e.status==200){
					meg("提示","删除成功","body",uploaded);
				}else{
					meg("提示","删除失败","body",uploaded);
				}
			},
			error:function(){
			 	meg("提示","请检查网络，稍后再试！","body");
			}
		})
}
//刷新页面
function uploaded(){
	location.reload();
}
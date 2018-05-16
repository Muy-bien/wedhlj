$(document).ready(function(){
	$(".AddOrder_but").click(function(){
		window.location.href="u_AddWeddingOrder_Details.html";
	})
})
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
}
$.ajax({
	type: 'POST',
	url: apiUrl+'/indent/queryAllIndentInfo',
	data: {
		token:$.cookie("login_on"),
		pageNo:1,
		pageSize:6,
		pageIndentOrderStatus:0
	},
	dataType: 'json',
	success:function(e){
		console.log(e)
	}
})
var pageNo=getUrlParam('pageNo');
var chooseStatus=getUrlParam('chooseStatus');
$(".main_title_cont>h1").click(function(){
		if($(this).text().substr(0,3)=='已通过'){
			location.href='u_PlanManagement.html?chooseStatus=1&pageNo=1';
		}else if($(this).text().substr(0,3)=='待审核'){
			location.href='u_PlanManagement.html?chooseStatus=-1&pageNo=1';
		}else if($(this).text().substr(0,3)=='未通过'){
			location.href='u_PlanManagement.html?chooseStatus=0&pageNo=1';
		}
});
if(!chooseStatus){
	location.href='u_PlanManagement.html?chooseStatus=1&pageNo=1';
}
// 根据地址栏中参数
if(chooseStatus==1){//已审核
	$(".one").addClass("main_title_cont_on");
}else if(chooseStatus==-1){//待审核
	$(".two").addClass("main_title_cont_on");
}else if(chooseStatus==0){//未通过
	$(".three").addClass("main_title_cont_on");
}
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(3).addClass("nav_cont_on");
}
///scheme/queryAllScheme策划信息分页
//token
//auditStatus:审核状态  1--已通过  0--未通过  -1未审核
//pageNo：当前页码\
var pageSize=5;
var state=1;
function queryAllScheme(token,auditStatus,pageNo){
	$.ajax({
		type: "post",
		url: apiUrl+"/scheme/queryAllScheme",
		data: {token:token,auditStatus:auditStatus,pageNo:pageNo,pageSize:pageSize},
		success: function(e) {
			down_Loading();
			if(e.schemeList.length!=0){
				var totalpage=Math.ceil(e.totalCount/pageSize);
				$('.main_Pagination').paging({
		            initPageNo: pageNo, // 初始页码
		            totalPages: totalpage, //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            // 回调函数
		            callback: function(page) {
		            	if(state==1){
		            		state=2;
		            	}else if(state==2){
		            		location.href='u_PlanManagement.html?chooseStatus='+chooseStatus+'&pageNo='+page+'';
		            	}
		            }
	       		 });
				var items=e.schemeList;
				var itemsHtml='';
				for(var i=0;i<items.length;i++){
					var img=items[i].schemePassageArea.split(",")[0];
	        		var checStatus=items[i].auditStatus==1?"审核通过":items[i].auditStatus==0?"审核未通过":"未审核";
					itemsHtml+='<ul>'+
									'<li><p>'+items[i].schemeNo+'</p></li>'+
									'<li><div class="main_cont_list_img img_auto" style="background-image:url('+apiUrl+img+')"></div></li>'+
									'<li><p>'+items[i].schemeStyle+'</p></li>'+
									'<li><p>'+items[i].schemeDesigner+'</p></li>'+
									'<li><p>'+items[i].schemePrice+'</p></li>'+
									'<li><p>'+items[i].schemeSellNum+'</p></li>'+
									'<li><p>'+items[i].attentionNum+'</p></li>'+
									'<li><p>'+checStatus+'</p></li>'+
									'<li>'+
										'<a href="u_PlanEditCommodity.html?schemeNo='+items[i].schemeNo+'"><button>编辑</button></a>'+
										'<a href="b_CaseDetails.html?schemeNo='+items[i].schemeNo+'" target="_blank"><button>查看</button></a>'+
										'<button class="removePlan">删除</button>'+
										'<button class="hide schemeNo">'+items[i].schemeNo+'</button>'+
									'</li>'+
								'</ul>';
				}
				$(".main_cont_list").html(itemsHtml);
				// 点击删除
				$(".removePlan").click(function(){
					meg2("提示","确定删除该策划吗？","body",removeState);
					var id=$(this).next('.schemeNo').html();
					function removeState(){
						delSchemeInfo(id);
					}
				});

			}else{
				$(".main_cont_list").html('当前区域没有您需要的相关数据！');
			}
		},
		error : function(e) {
			down_Loading();
			meg("提示","服务器开了小差，请稍后重试","body");
		}
	});
}
// 调用策划信息分页函数
queryAllScheme($.cookie("login_on"),chooseStatus,pageNo);

//scheme/delSchemeInfo策划信息删除（可批量）
//delSchemeInfo:策划编号
function delSchemeInfo(schemeNos){
	$.ajax({
		type: "post",
		url: apiUrl+"/scheme/delSchemeInfo",
		data: {schemeNos:schemeNos},
		success: function(e) {
			down_Loading();
			if(e.status==200){
				meg("提示","策划删除成功！","body",refresh);
			}else{
				meg("提示","策划删除失败！","body",refresh);
			}
		},
		error : function(e) {
			down_Loading();
			meg("提示","服务器开了小差，请稍后重试","body");
		}
	});
}
// 刷新页面
function refresh(){
	window.location.reload();
}
///scheme/resultCount返回审核状态行数
function resultCount(token){
	$.ajax({
		type: "post",
		url: apiUrl+"/scheme/resultCount",
		data: {token:token},
		success: function(e) {
			down_Loading();
			$(".one span").html('('+e.successAuditCount+')');
			$(".two span").html('('+e.reviewAuditCount+')');
			$(".three span").html('('+e.failureAuditingCount+')');
		},
		error : function(e) {
			down_Loading();
			meg("提示","服务器开了小差，请稍后重试","body");
		}
	});
}
resultCount($.cookie("login_on"));

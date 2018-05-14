//获取地址栏信息
var type = getUrlParam("type");
var AuditStatus = getUrlParam("AuditStatus");
var pageNo = getUrlParam("pageNo");
var dataUrl = "";//接口地址
var dataHref=["","","",""]//跳转地址
//导航栏默认选中
if(!type || type==0 || !AuditStatus || !pageNo){
	function on_navli(){
		$(".nav_cont_a").eq(0).addClass("nav_cont_on");
	}
	dataUrl="/user/queryAllUser";
}else if(type==1){
	function on_navli(){
		$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	}
	dataUrl="/BusinessPersonnel/queryAuditingAllParticularInfo";
}else if(type==2){
	function on_navli(){
		$(".nav_cont_a").eq(2).addClass("nav_cont_on");
	}
	dataUrl="/scheme/queryAllScheme";
}else if(type==3){
	function on_navli(){
		$(".nav_cont_a").eq(3).addClass("nav_cont_on");
	}
	dataUrl="/product/queryAllProduct";
}
//审核状态渲染内容
if(!type || !AuditStatus || !pageNo){
	history.pushState(history.state,"","?type=0&AuditStatus=-1&pageNo=1");
	$(".stateItem").eq(0).addClass('stateItem_on');
	show(-1,1,1,1);
}else if(AuditStatus=="-1"){
	history.pushState(history.state,"","?type="+type+"&AuditStatus=-1&pageNo="+pageNo);
	$(".stateItem").eq(0).addClass('stateItem_on');
	show(-1,pageNo,1,1);
}else if(AuditStatus==1){
	history.pushState(history.state,"","?type="+type+"&AuditStatus=1&pageNo="+pageNo);
	$(".stateItem").eq(1).addClass('stateItem_on');
	show(1,pageNo,1,1);
}else if(AuditStatus==0){
	history.pushState(history.state,"","?type="+type+"&AuditStatus=0&pageNo="+pageNo);
	$(".stateItem").eq(2).addClass('stateItem_on');
	show(0,pageNo,1,1);
}
//点击审核状态
$(".stateItem").click(function(){
	var this_index = $(this).index();
	$(this).addClass('stateItem_on').siblings('').removeClass('stateItem_on');
	if(this_index==0){
		history.pushState(history.state,"","?type="+type+"&AuditStatus=-1&pageNo=1");
		show(-1,1,1,1);
	}else if(this_index==1){
		history.pushState(history.state,"","?type="+type+"&AuditStatus=1&pageNo=1");
		show(1,1,1,1);
	}else if(this_index==2){
		history.pushState(history.state,"","?type="+type+"&AuditStatus=0&pageNo=1");
		show(0,1,1,1);
	}
})
/**
 *获取数据
 *Reset===>>判断是否刷新分页Dom(1:是)
 *type==>>种类(0:用户,1:人员,2:策划,3:商品);
 *AuditStatus==>>审核状态(未审核：-1，未通过审核：0，审核通过：1);
 *pageNo==>>当前页数;
**/
function show(sAuditStatus,spageNo,state,Reset){
	$(".checkList").html("加载中......");
	$.ajax({
		type: 'POST',
		url: apiUrl+dataUrl,
		data: {auditStatus:sAuditStatus,pageNo:spageNo,pageSize:20},
		dataType: 'json',
		success:function(e){
			if(e.status=="200"){
				RenderingList(e);
				var totalCount=Math.ceil(Number(e.totalCount)/20);//总页数
				if(Reset==1){
					$(".main_Pagination").html("");//清空分页列表
					if(totalCount>0 && Reset==1){
						$('.main_Pagination').paging({
				            initPageNo: spageNo, // 初始页码
				            totalPages: totalCount, //总页数
				            slideSpeed: 600, // 缓动速度。单位毫秒 
				            jump: true, //是否支持跳转
				            // 回调函数
				            callback: function(page){
				            	if(state == 1){
									state = 2 
				            	}else if(state == 2){
				            		history.pushState(history.state,"","?type="+type+"&AuditStatus="+sAuditStatus+"&pageNo="+page)
				            		show(sAuditStatus,page,1,2)
				            	}
				            }
			        	})
					}
				}
			}else{
				$(".checkList").html("未查询到相关信息，请稍后重试");
			}
		}
	})
}
//渲染列表内容
function RenderingList(e){
	var data = "";
	if(type==0){
		data=e.userList;//用户基本信息
	}else if(type==1){
		data=e.businessPersonnels;//人员
	}else if(type==2){
		data=e.schemeList;//策划
	}else if(type==3){
		data=e.productList;//商品
	}
	if(data.length>0){
		str="";
		for(var i=0;i<data.length;i++){
			if(type==0){
				str+='<a href="c_businessCheckDetail.html?id='+data[i].userId+'"><div class="checklistItem"><p>'+data[i].merchantName+'</p></div></a>'
			}else if(type==1){
				str+='<a href="c_personCheckDetail.html?id='+data[i].personnelNo+'"><div class="checklistItem"><p>'+data[i].name+'</p></div></a>'
			}else if(type==2){
				str+='<a href="c_PlanToExamine.html?id='+data[i].schemeNo+'"><div class="checklistItem"><p>'+data[i].schemeName+'</p></div></a>'
			}else if(type==3){
				str+='<a href="c_commodityToExamine.html?id='+data[i].productNo+'"><div class="checklistItem"><p>'+data[i].productName+'</p></div></a>'
			}
		}
		$(".checkList").html(str);
	}else{
		$(".checkList").html("未查询到相关信息")
	}
	
}



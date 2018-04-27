//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
}
//接收URL中的参数
var PersonnelType = getUrlParam('PersonnelType');
var page = getUrlParam('page');
// history.pushState(history.state,"","?PersonnelType=0&")
	//导入信息
$(document).ready(function(){
	//u_AddCollaborator.html固定人员
	//u_AddFixedPersonnel.html合作人员
	//点击添加人员
	$(".addPer").click(function(){
		console.log($(".main_title_cont h1").eq(0).hasClass("main_title_cont_on"));
		if($(".main_title_cont h1").eq(0).hasClass("main_title_cont_on")==true){
			location.href="u_AddFixedPersonnel.html";
		}else{
			location.href="u_AddCollaborator.html";
		}
	})
	// 点击人员类型
	$(".main_title_cont h1").click(function(){
		$(this).addClass("main_title_cont_on").siblings().removeClass("main_title_cont_on");
		var index=$(this).index();
		if(index==0){
			history.pushState(history.state,"","?PersonnelType=0&page=1");
		}else if(index==1){
			history.pushState(history.state,"","?PersonnelType=1&page=1");
		}
	})
	// 根据导航栏判断人员类型
	if(!PersonnelType){
		$(".main_title_cont h1").eq(0).addClass('main_title_cont_on');
	}else if(PersonnelType==0){
		$(".main_title_cont h1").eq(0).addClass('main_title_cont_on');
	}else if(PersonnelType==1){
		$(".main_title_cont h1").eq(1).addClass('main_title_cont_on');
	}
})
///BusinessPersonnel/queryAllParticularInfo
///PersonnelType  0---合作 1--固定
var pageSize=5;
function queryAllParticularInfo(token,pageNo,PersonnelType,state){
	console.log(token);
	console.log(pageNo);
	console.log(PersonnelType);
	console.log(state);
	$.ajax({
		type: 'POST',
		url: apiUrl+'/BusinessPersonnel/queryAllParticularInfo',
		data: {token:token,pageNo:pageNo,pageSize:pageSize,PersonnelType:PersonnelType},
		dataType: 'json',
		success:function(e){
			console.log(e);
			var businessPersonnels=e.businessPersonnels;
			if(businessPersonnels.length!=0){
				$('.main_Pagination').paging({
		            initPageNo: page, // 初始页码
		            totalPages: Math.ceil(e.totalCount/pageSize), //总页数
		            slideSpeed: 600, // 缓动速度。单位毫秒
		            jump: true, //是否支持跳转
		            // 回调函数
		            callback: function(page){
		            	if(state == 1){
							state = 2 
		            	}else if(state == 2){
		            		history.pushState(history.state,"","?PersonnelType="+PersonnelType+"&page="+page)
		            		//show(page,auditStatus,1)
		            	}
		            }
	        	})
			}else{

			}

		},
		error:function(){
			meg("提示","网络错误，请稍后再试","body")
		}
	})
}
queryAllParticularInfo($.cookie("login_on"),1,1,1)

//获取url中的参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
}
//接收URL中的参数
var PersonnelType = getUrlParam('PersonnelType');
var page = getUrlParam('page');
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
			queryAllParticularInfo($.cookie("login_on"),1,0,1)
		}else if(index==1){
			history.pushState(history.state,"","?PersonnelType=1&page=1");
			queryAllParticularInfo($.cookie("login_on"),1,1,1)
		}
	})
	// 根据导航栏判断人员类型
	if(!PersonnelType){
		$(".main_title_cont h1").eq(0).addClass('main_title_cont_on');
		queryAllParticularInfo($.cookie("login_on"),1,0,1)
	}else if(PersonnelType==0){
		$(".main_title_cont h1").eq(0).addClass('main_title_cont_on');
		queryAllParticularInfo($.cookie("login_on"),1,0,1);
	}else if(PersonnelType==1){
		$(".main_title_cont h1").eq(1).addClass('main_title_cont_on');
		queryAllParticularInfo($.cookie("login_on"),1,1,1);
	}

})
///BusinessPersonnel/queryAllParticularInfo
///PersonnelType  0---合作 1--固定
var pageSize=5;
function queryAllParticularInfo(token,pageNo,PersonnelType,state){
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
		            initPageNo: pageNo, // 初始页码
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
	        	var personHtml="";
	        	if(PersonnelType==0){//合作人员
		        	personHtml+='<ul class="main_cont_title">'+
									'<li>编号</li>'+
									'<li>头像</li>'+
									'<li>姓名</li>'+
									'<li>接单价格</li>'+
									'<li>基础工资</li>'+
									'<li>预约次数</li>'+
									'<li>关注量</li>'+
									'<li>订单量</li>'+
									'<li>完成订单</li>'+
									'<li>审核状态</li>'+
									'<li>操作</li>'+
								'</ul>';
	        		for(var i=0;i<businessPersonnels.length;i++){
						personHtml+='<div class="main_cont_list">'+
										'<ul>'+
											'<li><p>'+businessPersonnels[i].personnelNo+'</p></li>'+
											'<li><div class="main_cont_list_img img_auto" style="background-image:url('+apiUrl+businessPersonnels[i].headPortait+')"></div></li>'+
											'<li><p>霸刀杨壹</p></li>'+
											'<li><p>500</p></li>'+
											'<li><p>'+businessPersonnels[i].wage+'</p></li>'+
											'<li><p>520</p></li>'+
											'<li><p>520</p></li>'+
											'<li><p>360</p></li>'+
											'<li><p>360</p></li>'+
											'<li><p>审核通过</p></li>'+
											'<li>'+
												'<button>编辑</button>'+
												'<button>删除</button>'+
											'</li>'+
										'</ul>'+
									'</div>'
		        		}
	        	}else if(PersonnelType==1){//固定人员
	        			personHtml+='<ul class="main_cont_title main_cont_title_x10">'+
										'<li>编号</li>'+
										'<li>姓名</li>'+
										'<li>基础工资</li>'+
										'<li>提成率</li>'+
										'<li>提成工资</li>'+
										'<li>本月业绩</li>'+
										'<li>总业绩</li>'+
										'<li>备注</li>'+
										'<li>操作</li>'+
									'</ul>';
						for(var i=0;i<businessPersonnels.length;i++){
							personHtml+='<div class="main_cont_list main_cont_list_x10">'+
											'<ul>'+
												'<li><p>00001</p></li>'+
												'<li><p>霸刀杨壹</p></li>'+
												'<li><p>500</p></li>'+
												'<li><p>10%</p></li>'+
												'<li><p>135</p></li>'+
												'<li><p>520</p></li>'+
												'<li><p>360</p></li>'+
												'<li>'+
													'<div class="Remarks">'+
														'<div class="Remarks_cont">'+
															'<div class="Remarks_text">霸刀杨壹霸刀杨壹霸刀杨壹霸刀杨壹霸刀杨壹'+
													'</div>'+
												'</li>'+
												'<li>'+
													'<button>编辑</button>'+
													'<button>删除</button>'+
												'</li>'+
											'</ul>'+
										'</div>';
						}
	        	}

				$(".main_cont").html(personHtml);
			}else{
				$(".main_cont").html('当前区域没有你查找的相关人员！');
			}

		},
		error:function(){
			meg("提示","网络错误，请稍后再试","body")
		}
	})
}

//获取url中的参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}
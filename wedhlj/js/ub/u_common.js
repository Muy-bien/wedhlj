$(document).ready(function(){
	//验证是否为登录状态
	if ($.cookie("login_on") == "" || !$.cookie("login_on")){
		//window.location.href = "index.html";
	}else{
		$.ajax({
			type: 'POST',
			url: apiUrl+'/user/resultUserType',
			dataType: 'json',
			data: {userName:$.cookie("user"),token:$.cookie("login_on")},
			success: function(e){
				if($("div").hasClass("nav") == true){
					onNav(e.userType);//用户类型定位信息
				}
				if($("header").length >= 1){
					header(e.userType);//头部
				}
			}
		})
	}
	
	//侧边栏
	function onNav(h_position){
		var h_nav = "";
		if(h_position == 4){
			h_nav += '<div class="nav_top">商家后台</div>'+
			'<ul class="nav_cont">'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off person">'+
						'<a href="c_mainCheck.html?choose=1&&Cstatus=0">用户基本资料审核</a>'+
					'</div>'+
				'</li>'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off merchant">'+
						'<a href="c_mainCheck.html?choose=0&&Cstatus=0">人员审核</a>'+
					'</div>'+
				'</li>'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off hotel">'+
						'<a href="#">策划审核</a>'+
					'</div>'+
				'</li>'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off hotel">'+
						'<a href="#">商品审核</a>'+
					'</div>'+
				'</li>'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off hotel">'+
						'<a href="c_mainHotel.html">上传酒店信息</a>'+
					'</div>'+
				'</li>'+
			'</ul>';
		}else{
			h_nav += '<div class="nav_top">商家后台</div>'+
			'<ul class="nav_cont">'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off">'+
						'<a href="u_PersonalCenter.html">个人中心</a>'+
					'</div>'+
				'</li>';
				if(h_position == 1){
					h_nav +='<li>'+
						'<i></i>'+
						'<div class="nav_cont_a nav_cont_off">'+
							'<a href="u_WeddingOrderManagement.html">订单管理</a>'+
						'</div>'+
					'</li>';
				}else if(h_position == 2 || h_position == 3){
					h_nav +='<li>'+
						'<i></i>'+
						'<div class="nav_cont_a nav_cont_off">'+
							'<a href="u_SupplierOrder_Details.html">订单管理</a>'+
						'</div>'+
					'</li>';
				}
				if(h_position == 3){
					h_nav +='<li>'+
						'<i></i>'+
						'<div class="nav_cont_a nav_cont_off">'+
							'<a href="u_management.html">商品管理</a>'+
						'</div>'+
					'</li>';
				}
				h_nav +='<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off">'+
						'<a href="u_personnelManagement.html">人员管理</a>'+
					'</div>'+
				'</li>';
				if(h_position == 1){
					h_nav +='<li>'+
						'<i></i>'+
						'<div class="nav_cont_a nav_cont_off">'+
							'<a href="u_PlanManagement.html">策划管理</a>'+
						'</div>'+
					'</li>';
				}
				h_nav +='<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off">'+
						'<a href="u_Focus.html">我的关注</a>'+
					'</div>'+
				'</li>'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off">'+
						'<a href="#">运营中心</a>'+
					'</div>'+
				'</li>'+
				'<li>'+
					'<i></i>'+
					'<div class="nav_cont_a nav_cont_off">'+
						'<a href="#">设置中心</a>'+
					'</div>'+
				'</li>'+
			'</ul>';
		}
		$(".nav").html(h_nav);
		if(typeof on_navli === "function"){
			on_navli()
		}
	}

	//头部
	function header(h_position){
		var h_header = "";
		if(h_position == 4){
			h_header += '<div class="header">'+
				'<div class="Return_index">'+
					'<a href="index.html"><p>返回首页</p></a>'+
				'</div>'+
				'<div class="header_name">'+
					'<p><i></i><span class="h_name">'+$.cookie("user")+'</span></p>'+
				'</div>'+
				'<div class="sign_out">'+
					'<p onclick="sign_out()">退出登录</p>'+
				'</div>'+
			'</div>';
		}else{
			h_header += '<div class="header">'+
				'<div class="Return_index">'+
					'<a href="index.html"><p>返回首页</p></a>'+
				'</div>'+
				'<div class="header_name">'+
					'<p><i></i><span class="h_name">'+$.cookie("user")+'</span></p>'+
				'</div>'+
				'<div class="haeder_notice"></div>'+
				'<div class="sign_out">'+
					'<p onclick="sign_out()">退出登录</p>'+
				'</div>'+
			'</div>';
		}
		$("header").html(h_header);
		$(".haeder_notice").click(function(){
			window.location.href = "u_NoticeInTheStation.html";
		})
		if(typeof add_header === "function"){
			add_header()
		}
		
	}	
	//退出登录
	function sign_out(){
		$(".sign_out").click(function(){
			meg2("提示","是否确定退出登录","body",doThing)
			function doThing(){
				$.cookie("login_on","",{ path:'/',secure:false , expires: -1});//清空token
				$.cookie("user","",{ path:'/',secure:false , expires: -1});//清空用户名
				$.cookie("h_position","",{ path:'/',secure:false , expires: -1});//清空用户类型定位信息
				window.location.href = "index.html";
			}
		})
	}	
})

/*var dt = new Date();   
dt.setSeconds(dt.getSeconds() + 60);   
document.cookie = "cookietest=1; expires=" + dt.toGMTString();   
var cookiesEnabled = document.cookie.indexOf("cookietest=") != -1;   
if(!cookiesEnabled) {   
    //没有启用cookie   
    alert("没有启用cookie ");  
} else{  
    //已经启用cookie   
    alert("已经启用cookie ");  
}  */

var user_length = 1;
//初始化页面时验证是否记住了密码 
$(document).ready(function() { 
	if ($.cookie("rmbUser") == 'true'){ 
		user_length = 2;
		$("#rmbUser").attr("checked", true);
		$(".username").val($.cookie("userName")); 
		$(".password").val($.cookie("passWord")); 
	} 
}); 
//保存用户信息 
function saveUserInfo() {
	if ($("#rmbUser").is(':checked') == true) { 
		var userName = $(".username").val(); 
		var passWord = $(".password").val(); 
		$.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie 
		$.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie 
		if(user_length == 1){
			$.cookie("passWord",hex_md5(passWord),{ expires: 7 }); // 存储一个带7天期限的 cookie 
		}else if(user_length == 2){
			$.cookie("passWord",passWord,{ expires: 7 }); // 存储一个带7天期限的 cookie 
		}	
	} 
	else { 
		$.cookie("rmbUser",null); 
		$.cookie("userName",null); 
		$.cookie("passWord",null); 
	} 
} 

//用户名发生改变清空密码框
$(".username").change(function(){
	$(".password").val("");
	user_length = 1
})
$(".password").change(function(){
	user_length = 1
})

//-----完成登录
var state = 1;
function login(){
	if (state == 1) {
		state = 2;
		console.log(hex_md5(hex_md5("hljadmin")));
		var userVal = $('.username').val();
		var passVal = $('.password').val();
	  	var checked = $("input[name='vehicle']").is(':checked');
	  	remove()
	  	if(userVal == ""){
	  		state = 1;
	      	$(".login_uesr").text("账号不能为空");
	      	return false;
	  	}else if(passVal == ""){
	  		state = 1;
	    	$(".login_pass").text("密码不能为空");
	   	 	return false;
	  	}else if(!(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(passVal)) && user_length == "1"){
	  		state = 1;
	  		$(".login_pass").text("密码错误");
	   	 	return false;
	  	}else if(6 > passVal.length >18 && user_length == "1"){
	  		state = 1;
	    	$(".login_pass").text("密码错误");
	   	 	return false;
	   	}else if($("input[name='vehicle']").is(':checked') == true){
	   		checked = "0"
	   	}
	   	if(user_length == 1){
			var pass_cont = hex_md5(passVal);
		}else if(user_length == 2){
			var pass_cont = $.cookie("passWord");
		}
		state = 1;
   		//  @data  获取验证码需要的数据
		//注册需要的参数
		var data = {
			username: userVal,
			password: pass_cont,
			flag: checked,
		};

		$.ajax({
			type: 'POST',
			url: apiUrl+'login/validation',
			dataType: 'json',
			data: data,
			success: function(e) {
				//登录失败返回
				if(e['loginStatus'] == 400){
					state = 1;
					$(".login_uesr").text("账户或密码不正确");
				}else if(e['loginStatus'] == 200){
					$.cookie("user", userVal,{ path:'/',secure:false }); //储存用户名
					$.cookie("h_position", e.user.uStatus,{ path:'/',secure:false}); //储存商户类型定位
					$.cookie("login_on", e.token,{ path:'/',secure:false}); //登录成功返回信息
					saveUserInfo();//保存用户信息
					if($.cookie("referrer") == "true"){
						location.href = "index.html";
					}else{
						$.cookie("referrer","false",{ path:'/',secure:false});//清空储存状态
						window.location.href=document.referrer;
					}	
				}else{
					state = 1;
					$(".login_uesr").text("发生未知错误");
				}
			},
			error : function(e) {
				state = 1;
				$(".login_uesr").text("请检查网络");
			}
		})
	}
}


//-----点击回车执行登录命令
$(document).ready(function(e) {
  $(this).keydown(function (e){
    if(e.which == "13"){
    	login()
    }
  })
});

//点击登录按钮执行命令
$('.button').click(function(){
	login();
})



//-------格式化提示框内容
function remove(){
	$(".login_ts").text("");
};

//验证是否点击进入特殊页面
$(".referrer").click(function(){
	$.cookie("referrer","true",{ path:'/',secure:false}); //储存状态
})




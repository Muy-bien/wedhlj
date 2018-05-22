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
	user_length = 1;
});
$(".password").change(function(){
	user_length = 1;
});
$("input").focus(function(){
	remove();
});
//点击记住密码，清空缓存
$("input[name='vehicle']").click(function(){
	var checkedType=$(this).is(':checked');
	if(checkedType==false){
		$.cookie("passWord","",{ path:'/',secure:false , expires: -1});
		$.cookie("userName","",{ path:'/',secure:false , expires: -1});
		$.cookie("rmbUser","",{ path:'/',secure:false , expires: -1});
	}
});
//-----完成登录
var state = 1;
function login(){
	if (state == 1) {
			state = 2;
			var userVal = $('.username').val();
			var passVal = $('.password').val();
	  	var checked = $("input[name='vehicle']").is(':checked');
	  	remove();
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
	   		checked = "1";
	   	}else if($("input[name='vehicle']").is(':checked') == false){
	   		checked = "0";
	   	}
	   	if(user_length == 1){
			var pass_cont = hex_md5(passVal);
		}else if(user_length == 2){
			var pass_cont = $.cookie("passWord");
		}
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
			success: function(e){
				//登录失败返回
				if(e.status == "401.2"){
					state = 1;
					$(".login_uesr").text("用户名不存在");
				}else if(e.status == "401.1"){
					state = 1;
					$(".login_pass").text("密码错误");
				}else if(e.status == 200){
					$.cookie("user", userVal,{ path:'/',secure:false }); //储存用户名
					$.cookie("login_on", e.token,{ path:'/',secure:false}); //登录成功返回信息
					saveUserInfo();//保存用户信息
					PreviousUrl = decodeURIComponent($.cookie("PreviousUrl")).split("/")[0];
					if(!PreviousUrl){
						window.location.href = "index.html";
					}else{
						$.cookie("PreviousUrl","",{ path:'/',secure:false , expires: -1});
						window.location.href = PreviousUrl;
					}
				}else{
					state = 1;
					$(".login_uesr").text("发生未知错误,请稍后重试");
				}
			},
			error : function(e) {
				state = 1;
				$(".login_uesr").text("未能成功连接服务器,请稍后重试");
			}
		});
	}
}
//-----点击回车执行登录命令
$(document).ready(function(e) {
  $(this).keydown(function (e){
    if(e.which == "13"){
    	login();
    }
  });
});
//点击登录按钮执行命令
$('.button').click(function(){
	login();
});
//-------格式化提示框内容
function remove(){
	$(".login_ts").text("");
}
//驗證是否登錄
setInterval("settime()",1000);
function settime(){
	if ($.cookie("login_on")!= "" || $.cookie("login_on") || $.cookie("login_on")!=null){
		window.location.href = "index.html";
	}
}

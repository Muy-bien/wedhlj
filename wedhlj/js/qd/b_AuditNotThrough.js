$(document).ready(function(){
	if($.cookie("login_on")==""){
		$(".main_bg_cont span").click(function(){
			window.location.href = "index.html"
		})
	}else{
		window.location.href = "index.html"
	}
	//获取用户类型
	$.ajax({
		type: 'POST',
		url: apiUrl+'/user/resultUserType',
		dataType: 'json',
		data: {userName:$.cookie("user"),token:$.cookie("login_on")},
		success: function(e){
			$.cookie("position",e.userType,{ path:'/',secure:false });
			var h_position = e.userType;//用户类型定位信息
			var h_checkStatus = e.auditStatus;//审核状态
			if(h_checkStatus == 1){
				if(h_position == 4){
					window.location.href = "c_mainCheck.html";
				}else if(h_position == 1||h_position == 2||h_position == 3){
					window.location.href = "u_PersonalCenter.html";
				}
			}else if(h_checkStatus == "-1"){
				if(h_position == 0){
					window.location.href = "u_PersonalCenter.html";
				}else{
					window.location.href = "b_Audit.html";
				}
			}
		}
	})
})
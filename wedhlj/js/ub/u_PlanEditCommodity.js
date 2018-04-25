var schemeNo=getUrlParam('schemeNo');
console.log(schemeNo);
queryScheme(schemeNo);
//价格必须为正数
$(".input_money").change(function() {
	if($(this).val() > 0 == false){
		$(this).val("");
	}else if($(this).val().length > 15){
		$(this).val("");
	}
});

//点击策划风格
$(".input_style_cont li").click(function(){
	$(this).addClass('input_style_x10').siblings('').removeClass('input_style_x10');
})

var state = 1;
$(".Upload").click(function(){
	if (state == 1) {
		state = 2;
		//策划风格
		$("input[name=schemeStyle]").val($(".input_style_x10").find("p").text());
		//上传前验证
		if(!$("input[name=schemeName]").val()){
			meg("提示","案例名称不能为空","body");
			return false;
		}else if(!$("input[name=schemeDesigner]").val()){
			meg("提示","策划师名称不能为空","body");
			return false;
		}else if(!$("input[name=schemePrice]").val()){
			meg("提示","价格不能为空","body");
			return false;
		}else if(!$(".desc").val()){
			meg("提示","案例介绍不能为空","body");
			return false;
		}else if($(".desc").val().length > 200){
			meg("提示","案例介绍输入字数不能超过200字","body");
			return false;
		}else if(!$(".design").val()){
			meg("提示","设计思路不能为空","body");
			return false;
		}else if($(".design").val().length > 200){
			meg("提示","设计思路输入字数不能超过200字","body");
			return false;
		}else if(imgFile){
			for(var p=0;p<imgFile.length;p++){
				if(imgFile[p].length <= 0){
					meg("提示","上传图片不能为空","body");//限制上传个数
					return false;
				}
			}
		}
		on_Loading()	
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		//返回商品管理页面/scheme/addSchemeInfo
		function dothing(){
			window.location.href = "u_PlanManagement.html"
		}
		data.append("token",$.cookie('login_on'));
		$.ajax({
			type: "post",
			url: apiUrl+"/scheme/addSchemeInfo",
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()
				console.log(e);
				if (e.status == "200") {
					meg("提示","策划上传成功","body",dothing);
				}else{
					meg("提示","策划上传失败","body");
				}
			},
			error : function(e) {
				down_Loading()
				meg("提示","服务器开了小差，请稍后重试","body");
			}
		});	
	}
})
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(3).addClass("nav_cont_on");
}


//获取url中的参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);//匹配目标参数
	if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
///scheme/queryScheme策划信息详情查询
function queryScheme(schemeNo){
	$.ajax({
			type: "post",
			url: apiUrl+"/scheme/queryScheme",
			data: {schemeNo:schemeNo},
			success: function(e) {
				down_Loading()
				console.log(e.scheme);
				var scheme=e.scheme[0];
				console.log(scheme.schemeName);
				// 案例名称
				$("input[name=schemeName]").val(scheme.schemeName);
				// 案例风格
				 //$("input[name=schemeStyle]").val(scheme.schemeStyle);
				// 策划师
				$("input[name=schemeDesigner]").val(scheme.schemeDesigner);
				// 价格
				$("input[name=schemePrice]").val(scheme.schemePrice)
				// 案例介绍
				// 设计思路
				// 主舞台
				// 礼道区
				// 签到区
				// 合影区
				// 甜品区
			},
			error : function(e) {
				down_Loading()
				meg("提示","服务器开了小差，请稍后重试","body");
			}
		});	
}
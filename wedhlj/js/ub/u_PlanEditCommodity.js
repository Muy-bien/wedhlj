var schemeNo=getUrlParam('schemeNo');
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
				if(imgbox_default[p].length+imgFile[p].length <= 0){
					meg("提示","上传图片不能为空","body");//限制上传个数
					return false;
				}
			}
		}
		on_Loading()
		//修改图片
		for(var r=0;r<imgbox_name.length;r++){
			var img_hide = "";
			for(var t=0;t<imgbox_name[r].length;t++){
				if(imgbox_name[r][t]){
					img_hide += imgbox_name[r][t]+",";
				}	
			}
			$(".img_hide input").eq(r).val(img_hide);
		}	
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
		data.append("schemeNo",schemeNo);
		///scheme/updateScheme
		$.ajax({
			type: "post",
			url: apiUrl+"/scheme/updateScheme",
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()
				if (e.status == "200") {
					meg("提示","策划修改成功","body",dothing);
				}else{
					meg("提示","策划修改失败","body");
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
				var scheme=e.scheme[0];
				// 案例名称
				$("input[name=schemeName]").val(scheme.schemeName);
				// 案例风格
				 for(var i=0;i<$(".input_style_cont li>p").length;i++){
				 	if($(".input_style_cont li>p")[i].innerHTML==scheme.schemeStyle){
				 		$(".input_style_cont li")[i].setAttribute('class','input_style_x10');
				 	}
				 }
				// 策划师
				$("input[name=schemeDesigner]").val(scheme.schemeDesigner);
				// 价格
				$("input[name=schemePrice]").val(scheme.schemePrice)
				// 案例介绍
				$("textarea[name=schemeDesc]").html(scheme.schemeDesc)
				// 设计思路
				$("textarea[name=schemeDesign]").html(scheme.schemeDesign)
				// 主舞台
				var sStage_img = new Array();
				sStage_img = (scheme.schemeStageArea).split(",");
				if(sStage_img.length >= 5){
					$(".upload_img").eq(0).find(".upload_img_Choice").css("display","none");
				}
				var sStage = "";
				for(var a=0;a<sStage_img.length;a++){
					imgbox_img[0].push(sStage_img[a])
					sStage +='<div class="main_file">'+
						'<div class="show">'+
						'<img src="'+apiUrl+sStage_img[a]+'" alt="">'+
						'</div>'+
						'<div onclick="remove_default(this,\'0\')" class="main_file_hide remove_default">删除</div>'+
						'</div>';
				}
				$("#imgBox01").html(sStage);
				// 礼道区
				var sPassage_img = new Array();
				sPassage_img = (scheme.schemePassageArea).split(",");
				if(sPassage_img.length >= 5){
					$(".upload_img").eq(1).find(".upload_img_Choice").css("display","none");
				}
				var sPassage = "";
				for(var a=0;a<sPassage_img.length;a++){
					imgbox_img[1].push(sPassage_img[a])
					sPassage +='<div class="main_file">'+
						'<div class="show">'+
						'<img src="'+apiUrl+sPassage_img[a]+'" alt="">'+
						'</div>'+
						'<div onclick="remove_default(this,\'1\')" class="main_file_hide remove_default">删除</div>'+
						'</div>';
				}
				$("#imgBox02").html(sPassage);
				// 签到区
				var sSign_img = new Array();
				sSign_img = (scheme.schemeSignArea).split(",");
				if(sSign_img.length >= 5){
					$(".upload_img").eq(2).find(".upload_img_Choice").css("display","none");
				}
				var sSign = "";
				for(var a=0;a<sSign_img.length;a++){
					imgbox_img[2].push(sSign_img[a])
					sSign +='<div class="main_file">'+
						'<div class="show">'+
						'<img src="'+apiUrl+sSign_img[a]+'" alt="">'+
						'</div>'+
						'<div onclick="remove_default(this,\'2\')" class="main_file_hide remove_default">删除</div>'+
						'</div>';
				}
				$("#imgBox03").html(sSign);
				// 合影区
				var sPhoto_img = new Array();
				sPhoto_img = (scheme.schemePhotoArea).split(",");
				if(sPhoto_img.length >= 5){
					$(".upload_img").eq(3).find(".upload_img_Choice").css("display","none");
				}
				var sPhoto = "";
				for(var a=0;a<sPhoto_img.length;a++){
					imgbox_img[3].push(sPhoto_img[a])
					sPhoto +='<div class="main_file">'+
						'<div class="show">'+
						'<img src="'+apiUrl+sPhoto_img[a]+'" alt="">'+
						'</div>'+
						'<div onclick="remove_default(this,\'3\')" class="main_file_hide remove_default">删除</div>'+
						'</div>';
				}
				$("#imgBox04").html(sPhoto);
				// 甜品区
				var sSweetmeats_img = new Array();
				sSweetmeats_img = (scheme.schemeSweetmeatsArea).split(",");
				if(sSweetmeats_img.length >= 5){
					$(".upload_img").eq(4).find(".upload_img_Choice").css("display","none");
				}
				var sSweetmeats = "";
				for(var a=0;a<sSweetmeats_img.length;a++){
					imgbox_img[4].push(sSweetmeats_img[a])
					sSweetmeats +='<div class="main_file">'+
						'<div class="show">'+
						'<img src="'+apiUrl+sSweetmeats_img[a]+'" alt="">'+
						'</div>'+
						'<div onclick="remove_default(this,\'4\')" class="main_file_hide remove_default">删除</div>'+
						'</div>';
				}
				$("#imgBox05").html(sSweetmeats);
				//获取需要修改的图片，存入数组
				for(var j=0;j<$(".upload_img").length;j++){
					var this_box = $(".upload_img").eq(j).find(".main_file");
					for(var k=0;k<this_box.length;k++){
						imgbox_default[j].push('<div class="main_file">'+this_box.eq(k).html()+'</div>')
					}
				}
			},
			error : function(e) {
				down_Loading()
				meg("提示","服务器开了小差，请稍后重试","body");
			}
		});	
}


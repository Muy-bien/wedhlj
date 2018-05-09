//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
}
var doThing=function(){}
var PersonnelNo=getUrlParam("PersonnelNo");
// 验证输入的内容位数字的函数
function testNumber(thisSelector){
	thisSelector.blur(function(){
		var result=/^[0-9]*$/.test($(this).val());
		if(!result){
			meg("提示","请输入数字","body",doThing);
			$(this).val("");
		}
	})
}
//地址改变清空详细地址
$("select[name=county]").on("change",function(){
	$("input[name=address]").val("");
})
//身高，价格
testNumber($(".yourHeight"));
testNumber($(".yourPrice"));
// 风格
queryUser($.cookie("login_on"));

//上传头像
$(".myFileUpload_head").change(function(e){ 
 	var file = this.files[0];
 	if (file){
 		$(".blueButton_head").css("display","none");
 		if (window.FileReader) {    
            var reader = new FileReader();
            reader.readAsDataURL(file); //将文件读取为DataURL  
            //监听文件读取结束后事件 
          	reader.onloadend = function (e){
          		var result=$(this).result;
          		// console.log(e.target.result);
          		var src=e.target.result.substr(22);
          		var base64Img=e.target.result;
          		$(".show_head").html('<div class="img_auto" style="background-image:url('+base64Img+')"></div>');
          	};    
       	}
	}else{
   		$(".blueButton_head").css("display","block");
   		$(".show_head").html("");
    }
});

//添加案例视频
	/*添加地址*/
	$(".add_addr_btn").on("click",function(){
		var value=$(this).prev().val();
		var li=$(".upload_addr li").length+1;
		if(!value){
			meg("提示","地址内容不能为空","body",doThing);
		}else{
			$(".upload_addr").append("<li><span>"+value+"</span><input type='button' name='' value='删除' class='addr_delete'></li>");
			$(this).prev().val("");
		}
		if(li>=8){
			$(this).attr("disabled",true);
		}
		/*删除地址*/
		$('.addr_delete').on("click",function(){
			$(this).parent().remove();
			if(li<8){
				$(".add_addr_btn").attr("disabled",false);
			}	
		})
	})
//上传
var state = 1;
$("#btn").on('click', function() {
	if (state == 1) {
		state = 2;
		// 详细地址
		var addressTot=$("#s1").val()+','+$("#s2").val()+','+$("#s3").val()+','+$("#s4").val();
		$("input[name=address]").val(addressTot);
		console.log(addressTot);
		console.log($("#s4").val());
		//风格上传
		var style="";
		for(var i=0;i<$(".Posttask_x20_on").length;i++){
			style += $(".Posttask_x20_on p").eq(i).text() + ",";
		}
		$(".style").val(style);
		//视频地址上传
		var addr="";
		for(var i=0;i<$(".upload_addr li").length;i++){
			addr+=$(".upload_addr li").eq(i).first().text() + ",";
		}
		$("input[name=video]").val(addr);

		//表单项不能为空验的证
		if(!$("input[name=name]").val()){
			meg("提示","名称不能为空","body");
			return false;//名称验证
		}else if(!$("input[name=address]").val()){
			meg("提示","详细地址不能为空","body");
			return false;//地址验证
		}else if($("input[name=height]").css("display")=="block"&&!$("input[name=height]").val()){
			meg("提示","身高不能为空","body");
			return false;//身高验证
		}else if(!$("input[name=style]").val()){
			meg("提示","至少选择一种风格","body");
			return false;//风格验证
		}else if(!$("input[name=wage]").val()){
			meg("提示","基本工资不能为空","body");
			return false;//基本工资
		}else if(!$("input[name=commission]").val()){
			meg("提示","提成率不能为空","body");
			return false;//提成率
		}else if(!$(".show_head").html()){
			meg("提示","头像不能为空","body");
			return false;//头像验证
		}else if(imgFile[0].length + imgbox_default[0].length< 2){
			meg("提示","请至少上传2张案例图片","body");
			return false;
		}else if(!$("textarea[name=introduce]").val()){
			meg("提示","请填写人员简介","body");
			return false;//人员简介验证
		}
		
		on_Loading();
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
		data.append("token",$.cookie("login_on"));
		data.append("PersonnelType",0)//合作人员;
		data.append("PersonnelNo",PersonnelNo);
		for(a of data){
			console.log(a);
		}
		///BusinessPersonnel/updateProduct修改人员
		$.ajax({
			type: "post",
			url: apiUrl+'/BusinessPersonnel/updateProduct',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				function uploadSuccess(){
					location.href="u_personnelManagement.html?PersonnelType=0&page=1";
				}
				console.log(e)
				if(e.status==200){
					meg("提示","人员修改成功","body",uploadSuccess);
				}else{
					meg("提示","人员修改失败","body");
				}
				down_Loading();

			},
			error:function(e) {
				down_Loading();
				meg("提示","网络错误，请稍后再试","body");
				//state = 1
			}
		});	
	}
})

// 查询人员详情/queryUser
function queryUser(token){
	$.ajax({
			type: "post",
			url: apiUrl+'user/queryUser',
			data:{token:token},
			dataType:'json',
			success: function(e){
				console.log(e)
				// var type=e.user.companyType;
				var type=e.companyType;
				console.log(type);
				if(type=='婚庆公司'||type=='个人策划'){
					arr=["西式","新中式","小清新","简约","户外","汉婚","教堂"];
					style(arr);
				}else if(type=='舞美'||type=='道具'){
					arr=["靠谱","效率","省心","沟通达人","细致","布场能手","耐心"];
					style(arr);
				}else if(type=='主持人'){
					arr=["风趣","简洁","成熟","大气","稳重","温馨","欢快","控场达人"];
					style(arr);
				}else if(type=="摄影师"){
					arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
					style(arr);
				}else if(type=="摄像师"){
					arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
					style(arr);
				}else if(type=="化妆师"){
					arr=["靠谱","效率","省心","沟通达人","唯美","古典","摩登","清新自然"];
					style(arr);
				}else if(type=="婚礼管家"){
					arr=["靠谱","效率","省心","沟通达人","礼仪专家","有范","贴心"];
					style(arr);
				}else if(type=="花艺师"){
					arr=["靠谱","效率","省心","沟通达人","创意","搭配专家","色彩控"];
					style(arr);
				}
				//选风格,最多只能添加三种风格
				var addStyle=1;//是否可以添加样式
				$(".Posttask_x10 li").click(function(){
					var choosedLi=$(".Posttask_x20_on").length+1;
					 if(choosedLi>3){
					 	if($(this).hasClass("Posttask_x20_on")){
					 		$(this).toggleClass(".Posttask_x20_on");
					 		addStyle=1;
					 	}else{
					 		meg("提示", "风格最多只能选择三个", "body", doThing);
					 		addStyle=0;
					 	}
					 }
					 if(addStyle==1){	
						 $(this).toggleClass("Posttask_x20_on");
					}
				})
				queryBusinessPersonnelInfo(PersonnelNo)
			},
			error:function(e) {
				meg("提示","网络错误，请稍后再试","body");
			}
		});	
}
//arr是哪个风格数组
function style(arr){
	var html="";
	for(var i=0;i<arr.length;i++){
		html+='<li class="Posttask_x20">'+
						'<p>'+arr[i]+'</p>'+
					'</li>';
	}
	$(".Posttask_x10 ul").html(html);
}
//BusinessPersonnel/queryBusinessPersonnelInfo查询人员详情
function queryBusinessPersonnelInfo(PersonnelNo){
	// queryUser($.cookie("login_on"))
	$.ajax({
		type:'post',
		url:apiUrl+'/BusinessPersonnel/queryBusinessPersonnelInfo',
		data:{PersonnelNo:PersonnelNo},
		dataType:'json',
		success:function(e){
			var list=e.businessPersonnelList[0];
			// 名称
			$("input[name=name]").val(list.name);
			// 地址
			var address=list.address.split(",");
			$("select[name=province]").val(address[0]);
			$("select[name=city]").val(address[1]);
			$("select[name=county]").val(address[2]);
			$("#s4").val(address[3]);
			// 身高
			$("input[name=height]").val(list.height);
			// 风格
			var style=list.style.split(",");
			for(var i=0;i<style.length;i++){
				for(var j=0;j<$(".Posttask_x10 ul>li>p").length;j++){
					if(style[i]==$(".Posttask_x10 ul>li>p")[j].innerHTML){
							$(".Posttask_x10 ul>li").eq(j).addClass("Posttask_x20_on");
					}
				}
			}
			// 基础工资
			$("input[name=wage]").val(list.wage);
			// 提成率
			$("input[name=commission]").val(list.commission);
			// 头像<img src='+apiUrl+list.headPortait+'/>
			$(".show_head").html('<div class="img_auto" style="background:url('+apiUrl+list.headPortait+')"></div>')
			//$("input[name=headPortait]");
			// 案例图片
			var sPassage_img = new Array();
			sPassage_img = (list.case_img).split(",");
			if(sPassage_img.length >= 6){
				$(".upload_img").eq(1).find(".upload_img_Choice").css("display","none");
			}
			var sPassage = "";
			for(var a=0;a<sPassage_img.length;a++){
				imgbox_img[0].push(sPassage_img[a]);
				sPassage +='<div class="main_file">'+
					'<div class="show">'+
					'<img src="'+apiUrl+sPassage_img[a]+'" alt="">'+
					'</div>'+
					'<div onclick="remove_default(this,\'1\')" class="main_file_hide remove_default">删除</div>'+
					'</div>';
			}
			$("#imgBox").html(sPassage);
			//获取需要修改的图片，存入数组
			for(var j=0;j<$(".upload_img").length;j++){
				var this_box = $(".upload_img").eq(j).find(".main_file");
				for(var k=0;k<this_box.length;k++){
					imgbox_default[j].push('<div class="main_file">'+this_box.eq(k).html()+'</div>')
				}
			}
			//添加案例视频
			var video=list.case_video.split(",");
			video.pop();
			console.log(video);
			var videoHtml="";
			for(var i=0;i<video.length;i++){
				videoHtml+='<li>'+
								'<span>'+video[i]+'</span>'+
								'<input type="button" name="" value="删除" class="addr_delete">'+
							'</li>'
			}
			$(".upload_addr").html(videoHtml);
			/*删除地址*/
			$('.addr_delete').on("click",function(){
				$(this).parent().remove();
				})
			// 人员简介
			$("textarea[name=introduce]").val(list.introduce);
			// 备注
			$("textarea[name=notice]").val(list.notice)
		},
		error:function(){
			meg("提示","网络错误，请稍后再试！",'body');
		}
	})
}
// var state=1;
// //导航栏默认选中
// function on_navli(){
// 	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
// }
// //获取地址栏中的参数
// var PersonnelNo=getUrlParam("PersonnelNo");
// //选风格,最多只能添加三种风格
// queryUser($.cookie("login_on"))
// // var addStyle=1;//是否可以添加样式
// // $(".Posttask_x10 li").click(function(){
// // 	var choosedLi=$(".Posttask_x20_on").length+1;
// // 	 if(choosedLi>3){
// // 	 	if($(this).hasClass("Posttask_x20_on")){
// // 	 		$(this).toggleClass(".Posttask_x20_on");
// // 	 		addStyle=1;
// // 	 	}else{
// // 	 		meg("提示","最多只能选择3种风格！",'body');
// // 	 		addStyle=0;
// // 	 	}
// // 	 }
// // 	 if(addStyle==1){	
// // 		 $(this).toggleClass("Posttask_x20_on");
// // 	}
// // })
// //BusinessPersonnel/queryBusinessPersonnelInfo查询人员详情
// function queryBusinessPersonnelInfo(PersonnelNo){
// 	// queryUser($.cookie("login_on"))
// 	$.ajax({
// 		type:'post',
// 		url:apiUrl+'/BusinessPersonnel/queryBusinessPersonnelInfo',
// 		data:{PersonnelNo:PersonnelNo},
// 		dataType:'json',
// 		success:function(e){
// 			console.log(e);
// 			console.log(e.businessPersonnelList[0]);
// 			var list=e.businessPersonnelList[0];
// 			// 名称
// 			$("input[name=name]").val(list.name);
// 			// 地址
// 			var address=list.address.split(",");
// 			console.log(address);
// 			$("select[name=province]").val(address[0]);
// 			$("select[name=city]").val(address[1]);
// 			$("select[name=county]").val(address[2]);
// 			$("#s4").val(address[3]);
// 			// 身高
// 			$("input[name=height]").val(list.height);
// 			// 风格
// 			console.log($(".Posttask_x10 ul>li>p").length);
// 			console.log(list.style);
// 			var style=list.style.split(",");
// 			console.log(style);
// 			for(var i=0;i<style.length;i++){
// 				console.log('coming1');
// 				for(var j=0;j<$(".Posttask_x10 ul>li>p").length;j++){
// 					console.log('coming2');
// 					if(style[i]==$(".Posttask_x10 ul>li>p")[j].innerHTML){
// 					console.log('coming3');
// 							$(".Posttask_x10 ul>li").eq(j).addClass("Posttask_x20_on");
// 					}
// 				}
// 			}
// 			// 基础工资
// 			$("input[name=wage]").val(list.wage);
// 			// 提成率
// 			$("input[name=commission]").val(list.commission);
// 			// 头像
// 			//$("input[name=headPortait]").val('<img src='+apiUrl+list.headPortait+'/>')
// 			// 案例图片
// 			// 备注
// 			$("textarea[name=note]").val(list.note)
// 		},
// 		error:function(){
// 			meg("提示","网络错误，请稍后再试！",'body');
// 		}
// 	})
// }
// //BusinessPersonnel/addBusinessPersonnel添加人员
// $(".upload").click(function(){
// 	if(state==1){
// 		state=2;
// 		//风格
// 		var stylePer='';
// 		for(var i=0;i<$(".Posttask_x10 li.Posttask_x20_on p").length;i++){
// 			stylePer+=$(".Posttask_x10 li.Posttask_x20_on p")[i].innerHTML+','
// 		}
// 		$("input[name=style]").val(stylePer);
// 		console.log(stylePer);
// 		if(!$("input[name=name]").val()){//名称
// 			meg("提示","请填写名称！","body");
// 			return false;
// 		}else if(!$("input[name=style]").val()){//风格
// 			meg("提示","至少选择一种风格！","body");
// 			return false;
// 		}else if(!$("input[name=wage]").val()){//基础工资
// 			meg("提示","请填写基础工资！","body");
// 			return false;
// 		}else if(!$("input[name=commission]").val()){//提成率
// 			meg("提示","请填写提成率！","body");
// 			return false;
// 		}
// 		on_Loading();
// 		var data=new FormData($("#uploadForm")[0]);
// 		data.append("PersonnelType",1)//固定人员;
// 		data.append("token",$.cookie("login_on"));//加token
// 		for(p of data){
// 			console.log(p)
// 		}
// 		$.ajax({
// 			type: 'POST',
// 			url: apiUrl+'BusinessPersonnel/addBusinessPersonnel',
// 			data: data,
// 			processData:false,
// 			contentType:false,
// 			success:function(e){
// 				if(e.status==200){
// 					meg("提示","人员上传成功！","body",dothing);
// 				}else{
// 					meg("提示","人员上传失败！","body");
// 				}
// 				function dothing(){
// 					location.href="u_personnelManagement.html?PersonnelType=1&page=1";
// 				}
// 				down_Loading();
// 			},
// 			error:function(){
// 				down();
// 				meg("提示","网络错误，请稍后再试！","body")
// 			}
// 		})
// 	}
// })

// // 查询人员详情/queryUser
// function queryUser(token){
// 	$.ajax({
// 			type: "post",
// 			url: apiUrl+'user/queryUser',
// 			data:{token:token},
// 			dataType:'json',
// 			success: function(e){
// 				console.log(e)
// 				// var type=e.user.companyType;
// 				var type=e.companyType;
// 				console.log(type);
// 				if(type=='婚庆公司'||type=='个人策划'){
// 					arr=["西式","新中式","小清新","简约","户外","汉婚","教堂"];
// 					style(arr);
// 				}else if(type=='舞美'||type=='道具'){
// 					arr=["靠谱","效率","省心","沟通达人","细致","布场能手","耐心"];
// 					style(arr);
// 				}else if(type=='主持人'){
// 					arr=["风趣","简洁","成熟","大气","稳重","温馨","欢快","控场达人"];
// 					style(arr);
// 				}else if(type=="摄影师"){
// 					arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
// 					style(arr);
// 				}else if(type=="摄像师"){
// 					arr=["靠谱","效率","省心","沟通达人","创意","艺术","古典","简约"];
// 					style(arr);
// 				}else if(type=="化妆师"){
// 					arr=["靠谱","效率","省心","沟通达人","唯美","古典","摩登","清新自然"];
// 					style(arr);
// 				}else if(type=="婚礼管家"){
// 					arr=["靠谱","效率","省心","沟通达人","礼仪专家","有范","贴心"];
// 					style(arr);
// 				}else if(type=="花艺师"){
// 					arr=["靠谱","效率","省心","沟通达人","创意","搭配专家","色彩控"];
// 					style(arr);
// 				}
// 				//选风格,最多只能添加三种风格
// 				var addStyle=1;//是否可以添加样式
// 				$(".Posttask_x10 li").click(function(){
// 					var choosedLi=$(".Posttask_x20_on").length+1;
// 					 if(choosedLi>3){
// 					 	if($(this).hasClass("Posttask_x20_on")){
// 					 		$(this).toggleClass(".Posttask_x20_on");
// 					 		addStyle=1;
// 					 	}else{
// 					 		meg("提示", "风格最多只能选择三个", "body", doThing);
// 					 		addStyle=0;
// 					 	}
// 					 }
// 					 if(addStyle==1){	
// 						 $(this).toggleClass("Posttask_x20_on");
// 					}
// 				})
// 				queryBusinessPersonnelInfo(PersonnelNo)
// 			},
// 			error:function(e) {
// 				meg("提示","网络错误，请稍后再试","body");
// 			}
// 		});	
// }
// //arr是哪个风格数组
// function style(arr){
// 	var html="";
// 	for(var i=0;i<arr.length;i++){
// 		html+='<li class="Posttask_x20">'+
// 						'<p>'+arr[i]+'</p>'+
// 					'</li>';
// 	}
// 	$(".Posttask_x10 ul").html(html);
// }


// //导航栏默认选中
// function on_navli(){
//     var position = $.cookie("position");
//     if(position==2){
//         $(".nav_cont_a").eq(5).addClass("nav_cont_on");
//     }else if(position==1||position==3){
//         $(".nav_cont_a").eq(6).addClass("nav_cont_on");
//     }
// }
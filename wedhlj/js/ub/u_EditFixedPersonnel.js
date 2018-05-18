//防止多次点击
 var state = 1;
 // var lilength;
//导入信息
$(document).ready(function(){
	on_Loading()//加载
	//导航栏默认选中
	 $(".nav_cont_a").eq(1).addClass("nav_cont_on");
	 $("input[name=username]").val($.cookie("user"));
	//接收URL中的参数spid
	var p_id = getUrlParam('p_id');
	$("input[name=pid]").val(p_id);
	var p_id_data={
		pid:p_id,
	}
})
var doThing=function(){}
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
//身高，价格
testNumber($(".yourHeight"));
testNumber($(".yourPrice"));

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

//上传头像
$(".myFileUpload_head").change(function(e){ 
 	var file = this.files[0];
 	if (file) {
 		$(".blueButton_head").css("display","none");
 		if (window.FileReader) {    
            var reader = new FileReader(); 
            reader.readAsDataURL(file);  //将文件读取为DataURL  
            //监听文件读取结束后事件 
          	reader.onloadend = function (e){
          		var result=$(this).result;
          		var src=e.target.result.substr(22);
          		var base64Img=e.target.result;
          		$(".show_head").html('<div class="img_auto" style="background-image:url('+e.target.result+')"></div>');
          	};    
       	}
	}else{
   		$(".blueButton_head").css("display","block");
   		$(".show_head").html("")
    }
});

//上传
var state = 1;
$("#btn").on('click', function() {
	if (state == 1) {
		state = 2;

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
		//名称验证
			//imgbox_default获取已经有的图片个数
			//imgFile获取添加的图片的个数
		if(!$("[name=pname]").val()){
			meg("提示","名称不能为空","body");
			return false;
		}else if($("input[name=height]").css("display")=="block"&&!$("input[name=height]").val()){
			meg("提示","身高不能为空","body");
			return false;//身高验证
		}else if(!$("input[name=style]").val()){
			meg("提示","至少选择一种风格","body");
			return false;//风格验证
		}else if(!$("input[name=price]").val()){
			meg("提示","价格不能为空","body");
			return false;//价格验证
		}else if(!$("textarea[name=desc]").val()){
			meg("提示","请填写人员简介","body");
			return false;//人员简介验证
		}else if((imgbox_default[0].length+imgFile[0].length)< 2){
			meg("提示","请至少上传2张案例图片","body");
			return false;
		}else if(!$("textarea[name=desc]").val()){
			meg("提示","请填写人员简介","body");
			return false;//人员简介验证
		}
			
		//修改图片
		
		for(var r=0;r<imgbox_name.length;r++){
			var img_hide = "";
			for(var t=0;t<imgbox_name[r].length;t++){
				if (imgbox_name[r][t]) {
					img_hide += imgbox_name[r][t]+",";
				}
			}
			$("input[name=imgCase]").val(img_hide);
		}
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		$.ajax({
			type: "post",
			url: apiUrl+'person/personEdit',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				function uploadSuccess(){
					location.href="p_management.html";
				}
				if(e.updateStatus==200){
					meg("提示","修改成功","body",uploadSuccess);
				}else if(e.updateStatus==400){
					meg("提示","修改失败","body");
				}

			},
			error:function(e) {
				meg("提示","网络错误，请稍后再试","body");
				state = 1
			}
		});	
	}
})

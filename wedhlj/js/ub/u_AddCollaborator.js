var state=1;
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
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
	 		meg("提示","最多只能选择3种风格！",'body');
	 		addStyle=0;
	 	}
	 }
	 if(addStyle==1){	
		 $(this).toggleClass("Posttask_x20_on");
	}
})
//BusinessPersonnel/addBusinessPersonnel添加人员
$(".upload").click(function(){
	if(state==1){
		state=2;
		//风格
		var stylePer='';
		for(var i=0;i<$(".Posttask_x10 li.Posttask_x20_on p").length;i++){
			stylePer+=$(".Posttask_x10 li.Posttask_x20_on p")[i].innerHTML+','
		}
		$("input[name=style]").val(stylePer);
		console.log(stylePer);
		if(!$("input[name=name]").val()){//名称
			meg("提示","请填写名称！","body");
		}else if(!$("input[name=style]").val()){//风格
			meg("提示","至少选择一种风格！","body");
		}else if(!$("input[name=wage]").val()){//基础工资
			meg("提示","请填写基础工资！","body");
		}else if(!$("input[name=commission]").val()){//提成率
			meg("提示","请填写基础工资！","body");
		}
		var data=new FormData($("#uploadForm")[0]);
		data.append("PersonnelType",1)//固定人员;
		for(p of data){
			console.log(p)
		}
		$.ajax({
			type: 'POST',
			url: apiUrl+'BusinessPersonnel/addBusinessPersonnel',
			data: data,
			processData:false,
			contentType:false,
			success:function(e){
				if(e.status==200){
					meg("提示","人员上传成功！","body",dothing);
				}else{
					meg("提示","人员上传失败！","body");
				}
				function dothing(){
					location.href="u_personnelManagement.html?PersonnelType=1&page=1";
				}
			},
			error:function(){
				meg("提示","网络错误，请稍后再试！","body")
			}
		})
	}
})
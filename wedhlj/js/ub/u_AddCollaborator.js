var state=1;
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
}
//选风格,最多只能添加三种风格
queryUser($.cookie("login_on"))
// var addStyle=1;//是否可以添加样式
// $(".Posttask_x10 li").click(function(){
// 	var choosedLi=$(".Posttask_x20_on").length+1;
// 	 if(choosedLi>3){
// 	 	if($(this).hasClass("Posttask_x20_on")){
// 	 		$(this).toggleClass(".Posttask_x20_on");
// 	 		addStyle=1;
// 	 	}else{
// 	 		meg("提示","最多只能选择3种风格！",'body');
// 	 		addStyle=0;
// 	 	}
// 	 }
// 	 if(addStyle==1){	
// 		 $(this).toggleClass("Posttask_x20_on");
// 	}
// })
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
		if(!$("input[name=name]").val()){//名称
			meg("提示","请填写名称！","body");
			return false;
		}else if(!$("input[name=style]").val()){//风格
			meg("提示","至少选择一种风格！","body");
			return false;
		}
		on_Loading();
		var data=new FormData($("#uploadForm")[0]);
		data.append("PersonnelType",1)//固定人员;
		data.append("token",$.cookie("login_on"));//加token
		$.ajax({
			type: 'POST',
			url: apiUrl+'/BusinessPersonnel/addFixedBusinessPersonnel',
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
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg("提示","网络错误，请稍后再试！","body")
			}
		})
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
				var type=e.companyType;
				if(type=='婚庆公司'||type=='个人策划'){
					arr=["西式","新中式","小清新","简约","户外","汉婚","教堂"];
					style(arr);
				}else if(type=='舞美'||type=='道具'||type=="婚礼执行"){
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
					arr=["靠谱","效率","省心","唯美","古典","摩登","清新自然"];
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
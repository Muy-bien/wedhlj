var blob='';
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(2).addClass("nav_cont_on");
}
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
//地址改变清空详细地址
$("select[name=county]").on("change",function(){
	$("input[name=address]").val("");
})
//身高，价格
testNumber($(".yourHeight"));
testNumber($(".yourPrice"));
// 风格
queryUser($.cookie("login_on"));
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
		//风格上传
		var style="";
		for(var i=0;i<$(".Posttask_x20_on").length;i++){
			style += $(".Posttask_x20_on p").eq(i).text() + ",";
		}
		$(".style").val(style);
		//视频地址上传
		var addr=[];
		for(var i=0;i<$(".upload_addr li").length;i++){
			addr.push($(".upload_addr li").eq(i).first().text());
		}
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
		}else if(!$("input[name=order_price]").val()){
			meg("提示","接单价格不能为空","body");
			return false;//接单价格
		}else if(!blob){
			meg("提示","头像不能为空","body");
			return false;//头像验证
		}else if(imgFile[0].length < 2){
			meg("提示","请至少上传2张案例图片","body");
			return false;
		}else if(!$("textarea[name=introduce]").val()){
			meg("提示","请填写人员简介","body");
			return false;//人员简介验证
		}
		
		on_Loading();
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		data.append("token",$.cookie("login_on"));
		data.append("PersonnelType",0)//合作人员;
		data.append("headPortait",blob);
		data.append("case_video",addr);
		//BusinessPersonnel/addBusinessPersonnel
		$.ajax({
			type: "post",
			url: apiUrl+'BusinessPersonnel/addBusinessPersonnel',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				function uploadSuccess(){
					location.href="u_personnelManagement.html?PersonnelType=0&page=1";
				}
				if(e.status==200){
					meg("提示","人员上传成功","body",uploadSuccess);
				}else{
					meg("提示","人员上传失败","body");
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

// 剪裁头像插件

    //弹出框水平垂直居中
    (window.onresize = function () {
        var win_height = $(window).height();
        var win_width = $(window).width();
        if (win_width <= 768){
            $(".tailoring-content").css({
                "top": (win_height - $(".tailoring-content").outerHeight())/2,
                "left": 0
            });
        }else{
            $(".tailoring-content").css({
                "top": (win_height - $(".tailoring-content").outerHeight())/2,
                "left": (win_width - $(".tailoring-content").outerWidth())/2
            });
        }
    })();

    //弹出图片裁剪框
    $("#replaceImg").on("click",function () {
        $(".tailoring-container").toggle();
    });
    //图像上传
    function selectImg(file) {
        if (!file.files || !file.files[0]){
            return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            var replaceSrc = evt.target.result;
            //更换cropper的图片
            $('#tailoringImg').cropper('replace', replaceSrc,false);//默认false，适应高度，不失真
        }
        reader.readAsDataURL(file.files[0]);
    }
    //cropper图片裁剪
    $('#tailoringImg').cropper({
        aspectRatio: 1/1,//默认比例
        preview: '.previewImg',//预览视图
        guides: false,  //裁剪框的虚线(九宫格)
        autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
        movable: false, //是否允许移动图片
        dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        movable: true,  //是否允许移动剪裁框
        resizable: true,  //是否允许改变裁剪框的大小
        zoomable: false,  //是否允许缩放图片大小
        mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
        touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
        rotatable: true,  //是否允许旋转图片
        crop: function(e) {
            // 输出结果数据裁剪图像。
        }
    });
    //旋转
    $(".cropper-rotate-btn").on("click",function () {
        $('#tailoringImg').cropper("rotate", 45);
    });
    //复位
    $(".cropper-reset-btn").on("click",function () {
        $('#tailoringImg').cropper("reset");
    });
    //换向
    var flagX = true;
    $(".cropper-scaleX-btn").on("click",function () {
        if(flagX){
            $('#tailoringImg').cropper("scaleX", -1);
            flagX = false;
        }else{
            $('#tailoringImg').cropper("scaleX", 1);
            flagX = true;
        }
        flagX != flagX;
    });

    //裁剪后的处理
    $("#sureCut").on("click",function () {
        if ($("#tailoringImg").attr("src") == null ){
            return false;
        }else{
            var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
            var base64url = cas.toDataURL('image/png'); //转换为base64地址形式
            $("#replaceImg").html('<img id="finalImg" src="'+base64url+'" width="100%">');//显示为图片的形式base64url
            /*裁剪后处理里面*/
            blob = base64url
            //关闭裁剪框
            closeTailor();
        }
    });
    //关闭裁剪框
    function closeTailor() {
        $(".tailoring-container").toggle();
    }
    /*
    **需要将dataURL转成Blob对象. 这儿在全局写个方法
    **将canvas图片转换为文件类型
    */
    function dataURLtoBlob(dataURI) {
        var arr = dataURI.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = (arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime
        });
    }



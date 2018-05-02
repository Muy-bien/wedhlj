//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(3).addClass("nav_cont_on");
}

//价格必须为正数
$(".input_money").change(function() {
	if($(this).val() > 0 == false){
		$(this).val("");
	}
});

var state = 1;//防止多次点击
function login(){
	if (state == 1) {
		state = 2;
		//判断复选框
		var sp_color = [];
		for(var i = 0;i< $(".input_color input").length;i++){
			if ($(".input_color input").eq(i).is(':checked')) {
				sp_color.push($(".input_color input").eq(i).val())
			}
		}
		var pname = $("input[name='productName']").val(); //商品名称
		var height = $(".height").val(); //商品尺寸
		var width = $(".width").val(); //商品尺寸
		var length = $(".length").val(); //商品尺寸
		var price = $("input[name='productPrice']").val(); //商品原价
		var dis_price = $("input[name='discountPrice']").val(); //商品折扣价
		var number = $("input[name='productNumber']").val(); //商品数量
		var pdesc = $("textarea[name='productDesc']").val(); //商品描述
		if (!pname) {
			meg('提示','请输入商品名称','body');
			return false;
		}else if (!height || !width || !length){
			meg('提示','请输入商品尺寸','body');
			return false;
		}else if (!sp_color) {
			meg('提示','请选择商品颜色','body');
			return false;
		}else if (!price) {
			meg('提示','请输入商品原价','body');
			return false;
		}else if (Number(price) < Number(dis_price)) {
			meg('提示','折扣价不能大于原价','body');
			return false;
		}else if (!number) {
			meg('提示','请输入库存数量','body');
			return false;
		}else if (!pdesc) {
			meg('提示','请输入商品描述','body');
			return false;
		}else if(imgFile){
			for(var p=0;p<imgFile.length;p++){
				if(imgbox_default[p].length+imgFile[p].length <= 0){
					meg("提示","上传图片不能为空","body");//限制上传个数
					return false;
				}
			}
		}
		on_Loading();
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		data.append('productProperty',sp_color)//颜色
		data.append('productSize',height+','+width+','+length)//尺寸
		data.append('token',$.cookie("login_on"))//token
		//刷新页面
		var doThing = function(){
			window.location.reload();
		}

		var hrefing = function(){
			window.location.href  = 'u_management.html'
		}
		
		$.ajax({
			type: 'POST',
			url: apiUrl+'/product/addProductInfo',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()
				if(e.status == 200) {
					meg2('提示','上传成功,返回商品管理页面','body',hrefing,doThing); 
				}else{				
					meg('提示','上传失败','body',doThing); 
				}
			},
			error : function(e) {
				down_Loading()
				meg('提示','未能成功连接服务器，请稍后重试','body',doThing); 
			}
		})
	}	
}

//上传商品
$(".Upload").click(function(){
	login()
})


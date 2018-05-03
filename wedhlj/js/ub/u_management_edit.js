//导入数据
$(document).ready(function(){
	//接收URL中的参数spid
	var id = getUrlParam('id');
	//获取商品数据渲染页面
	showInfo(id)
	//修改商品
	$(".Upload").click(function(){
		login(id)
	})
})
//获取商品数据渲染页面
function showInfo(productNo){
	on_Loading()//加载
	$.ajax({
		type: 'POST',
		url: apiUrl+'/product/queryProduct',
		dataType: 'json',
		data: {productNo:productNo},
		success:function(e){
			if(e.status == 200){
				var data = e.product[0];
				$("input[name=productName]").val(data.productName);//名称
				//尺寸
				var size = data.productSize.split(",");
				$(".height").val(size[0]);
				$(".width").val(size[1]);
				$(".length").val(size[2]);
				//颜色
				var arr = data.productProperty.split(",");
				for(var i=0;i<$(".input_color input").length;i++){
					for(var a=0;a<arr.length;a++){
						if ($(".input_color input").eq(i).val() == arr[a]) {
							$(".input_color input").eq(i).attr("checked", true);
						}
					}
				}
				$("input[name=productPrice]").val(data.productPrice);//商品原价
				$("input[name=discountPrice]").val(data.discountPrice == "0.0"?"":data.discountPrice);//商品折扣价
				$("input[name=productNumber]").val(data.productNumber);//商品数量
				$("textarea[name=productDesc]").val(data.productDesc);//商品描述
				//商品图片
				var sStage_img = (data.productImage).split(",");
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
				//获取需要修改的图片，存入数组
				for(var j=0;j<$(".upload_img").length;j++){
					var this_box = $(".upload_img").eq(j).find(".main_file");
					for(var k=0;k<this_box.length;k++){
						imgbox_default[j].push('<div class="main_file">'+this_box.eq(k).html()+'</div>')
					}
				}
				down_Loading();
			}else{
				down_Loading()
				meg("提示","未查找到相应内容,返回上一页","body",dothing)
				function dothing(){
					window.location.href = "u_management.html"
				}
			}
		}
	})
}
var state = 1;//防止多次点击
function login(id){
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
		on_Loading()//加载
		//用formDate对象上传
		var data = new FormData($('#uploadForm')[0]);
		//修改图片
		for(var r=0;r<imgbox_name.length;r++){
			var img_hide = [];
			for(var t=0;t<imgbox_name[r].length;t++){
				if(imgbox_name[r][t]){
					img_hide.push(imgbox_name[r][t]);
				}	
			}
			data.append('oldimgs',img_hide)
		}
		//上传的图片
		for(var i=0;i<imgFile.length;i++){
			for(var s=0;s<imgFile[i].length;s++){
				data.append(files_data[i],imgFile[i][s]);	
			}
		}
		data.append('productProperty',sp_color)//颜色
		data.append('productSize',height+','+width+','+length)//尺寸
		data.append('productNo',id)//token
		//刷新页面
		var doThing = function(){
			window.location.reload();
		}
		//返回商品管理页面
		var hrefing = function(){
			window.location.href  = 'u_management.html'
		}
		for(p of data){
			console.log(p)
		}
		$.ajax({
			type: 'POST',
			url: apiUrl+'/product/updateProduct',
			data: data,
			processData: false,
			contentType: false,
			success: function(e) {
				down_Loading()//加载
				if (e.status == 200) {
					meg2('提示','修改成功,返回商品管理页面','body',hrefing,doThing); 
				}else{				
					meg('提示','修改失败，请稍后重试','body',doThing); 
				}
			},
			error : function(e) {
				down_Loading()//加载
				meg('提示','未能成功连接服务器','body',doThing); 
			}
		})
	}	
}
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(3).addClass("nav_cont_on");
}
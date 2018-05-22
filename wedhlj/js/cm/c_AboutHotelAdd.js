$(document).ready(function(){
	//小图标多选按钮
	$(".main_box_x30 li").click(function(){
		if($(this).hasClass('main_box_x30_on')){
			$(this).removeClass('main_box_x30_on')
		}else{
			$(this).addClass('main_box_x30_on')
		}
	})
})


//上传酒店
$(".main_but_on").click(function(){
	if(!$("input[name=T_hotel_name]").val()){
		meg("提示","酒店名称不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_telephone]").val()){
		meg("提示","酒店电话不能为空","body")
		return false;
	}else if(!$(".address_x40").val()){
		meg("提示","酒店地址不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_price]").val()){
		meg("提示","价格区间不能为空","body")
		return false;
	}else if(!$(".T_hotel_introduction").val()){
		meg("提示","酒店简介不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_cuisine_price_section]").val()){
		meg("提示","酒店菜品价格区间不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_door_money_status]").val()){
		meg("提示","酒店是否收取入场费不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_matrimonial_home_status]").val()){
		meg("提示","酒店是否提供婚房不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_lamplight_status]").val()){
		meg("提示","酒店是否提供音响和灯光不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_information]").val()){
		meg("提示","酒店基本信息不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_feature]").val()){
		meg("提示","酒店特色不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_facility]").val()){
		meg("提示","网络设施不能为空","body")
		return false;
	}else if(!$("input[name=T_hotel_park]").val()){
		meg("提示","停车服务不能为空","body")
		return false;
	}else if(imgFile){
		for(var p=0;p<imgFile.length;p++){
			if(imgbox_default[p].length+imgFile[p].length < 7){
				meg("提示","酒店图片至少上传七张","body");//限制上传个数
				return false;
			}
		}
	}
	//用formDate对象上传
	var data = new FormData($('#uploadForm')[0]);
	for(var i=0;i<imgFile.length;i++){
		for(var s=0;s<imgFile[i].length;s++){
			data.append(files_data[i],imgFile[i][s]);
		}
	}
	//酒店地址
	var T_hotel_address=[$(".address_x10").val(),$(".address_x20").val(),$(".address_x30").val(),$(".address_x40").val()];
	data.append('T_hotel_address',T_hotel_address);
	//验证图标
	var icon = ["T_hotel_wifi_status","T_hotel_park_status","T_hotel_restaurant_status","T_hotel_luggage_status"];
	for(var x=0;x<icon.length;x++){
		if($(".main_box_icon li").eq(x).hasClass('main_box_x30_on')){
			data.append(icon[x],1)
		}else{
			data.append(icon[x],0)
		}
	}
	on_Loading();
	$.ajax({
		type: 'POST',
		url: apiUrl+'/hotel/addHotelInfo',
		data: data,
		processData: false,
		contentType: false,
		success: function(e) {
			if(e.status == 200){
				down_Loading()
				meg('提示','上传成功','body',dothing);
				function dothing(){
					window.location.href = "c_AboutHotelEdit.html?id="+e.hotelId
				}
			}else if(e.status == 401){
				down_Loading()
				meg('提示','上传失败','body');
			}else if(e.status == 500){
				down_Loading()
				meg('提示','服务器开了小差，请稍后重试','body');
			}	
		},
		error : function(e) {
			down_Loading()
			meg('提示','当前网络不畅通,请检查您的网络','body'); 
		}
	})
	
})
//点击取消按钮
$(".main_but_off").click(function(){
	window.location.href = "c_mainHotel.html"
})

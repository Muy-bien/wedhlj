var state = 1;//防止多次点击事件
$(document).ready(function(){
	$(".main_box_x30 li").click(function(){
		if($(this).hasClass('main_box_x30_on')){
			$(this).removeClass('main_box_x30_on')
		}else{
			$(this).addClass('main_box_x30_on')
		}
	})
	//获取url中的参数
	function getUrlParam(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r != null) return decodeURI(r[2]); return null; //返回参数值
	}
	var id = getUrlParam("id");
	Exhibition(id);//获取数据
	on_addhall(id);//点击添加大厅
	edit_Hotel(id);//点击修改酒店信息
})
var HallInfo = [];//所有添加的大厅
Array.prototype.insert = function (index,item) { 
	this.splice(index,1,item); 
};
	
//获取所有数据
function Exhibition(id){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/hotel/queryHotelInfo',
		data: {id:id},
		dataType: 'json',
		success:function(e){
			Refresh_hotelInfo(e);
			Refresh_hallInfo(e);
		}
	})
}
//获取大厅信息
function Exhibition_hall(id){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/hotel/queryHotelInfo',
		data: {id:id},
		dataType: 'json',
		success:function(e){
			Refresh_hallInfo(e);
		}
	})
}
//上传大厅
function addHall(id,input_img){
	if(state == 1){
		state = 2;
		var HallInfo_img_describe = [];//大厅图片描述
		var HallInfo_name = $(".HallInfo_name").val();
		var HallInfo_size = $(".HallInfo_size").val();
		var HallInfo_number = $(".HallInfo_number").val();
		var HallInfo_price = $(".HallInfo_price").val();
		var HallInfo_describe = $(".HallInfo_describe").val();
		var HallInfo_size = [];
		for(var b=0;b<$(".HallInfo_bg_x20_size input").length;b++){
			HallInfo_size.push($(".HallInfo_bg_x20_size input").eq(b).val())
		}
		console.log(HallInfo_size)
		if(!HallInfo_name){
			meg("提示","大厅名称为空","body")
			return false;
		}else if(!HallInfo_size[0]){
			meg("提示","大厅尺寸长度为空","body")
			return false;
		}else if(!HallInfo_size[1]){
			meg("提示","大厅尺寸宽度为空","body")
			return false;
		}else if(!HallInfo_size[2]){
			meg("提示","大厅尺寸高度为空","body")
			return false;
		}else if(!HallInfo_number){
			meg("提示","最大桌数为空","body")
			return false;
		}else if(!HallInfo_price){
			meg("提示","大厅价格为空","body")
			return false;
		}else if(HallInfo_img_describe){
			for(var i = 0;i<4;i++){
				var HallInfo_img_describe_val = $(".HallInfo_img_describe input").eq(i).val();
				HallInfo_img_describe.push(HallInfo_img_describe_val);
				if(input_img[i]==""){
					meg("提示","最少选择4张图片","body")
					return false;
				}else if(HallInfo_img_describe[i]==""){
					meg("提示","请填写所有的图片描述","body")
					return false;
				}
			}
		}
		//用formDate对象上传
		var data = new FormData($('#hallForm')[0]);
		data.append('lobbySize',HallInfo_size);
		data.append("lobbyImgIntro",HallInfo_img_describe);
		data.append("hotelId",id);
		for(var i=0;i<input_img.length;i++){
			data.append("lobbyImgUrl",input_img[i])
		}
		//发送请求上传大厅
		$.ajax({
			type: 'POST',
			url: apiUrl+'/hotelLobby/addHotelInfo',
			data: data,
			processData: false,
			contentType: false,
			success:function(e){
				if(e.status == 200){
					meg("提示","上传成功","body",dothing)
					function dothing(){
						Exhibition_hall(id)
					}
					//关闭窗口
					$(".HallInfo_bg").remove();
				}else{
					meg("提示","上传失败，请稍后重试","body")
				}
			}
		})
	}				
}
//点击添加大厅
function on_addhall(id){
	$(".main_HallInfo").click(function(){
		hall_Exhibition();
		$(".HallInfo_bg_but01").click(function(){
			addHall(id,input_img);
		})
		//预览图片
		var input_img = ["","","",""];
		file_img_change(input_img);
	})			
}
//关闭大厅上传
function Close_hall(){
	$(".HallInfo_bg").remove();
}
//修改图片
function file_img_change(input_img){
	$(".myFileUpload").change(function(e){ 
	   	var file = this.files[0];
	   	var i = $(this).parents("li").index();
	   	if (file) {
	   		if (window.FileReader) {    
              	var reader = new FileReader();    
              	reader.readAsDataURL(file);  //将文件读取为DataURL 
              	input_img.insert(i,file);
              	//监听文件读取结束后事件    
            	reader.onloadend = function (e){
            		$(".HallInfo_bg_images_box li").eq(i).find(".HallInfo_imgc_Prompt").css("display","none");
            		$(".HallInfo_bg_images_box li").eq(i).find(".HallInfo_imgc_show").html("<img src='"+e.target.result+"'>");
            		$(".HallInfo_bg_images_box li").eq(i).find('.HallInfo_imgc_delete').remove();
            		$(".HallInfo_bg_images_box li").eq(i).append(`<div class="HallInfo_imgc_delete">删除</div>`);
            		HallInfo_img_delete(input_img,i);
            	};    
	        } 
	    } 	
	});
}
//删除图片
function HallInfo_img_delete(input_img,i){
	$(".HallInfo_bg_images_box li").eq(i).find(".HallInfo_imgc_delete").click(function(){
		var index = $(this).parents("li").index();
		input_img.insert(index,"")
		this_Label = $(".HallInfo_bg_images_box li").eq(index);
		this_Label.find(".HallInfo_imgc_show").html("");
		this_Label.find(".HallInfo_imgc_Prompt").css("display","block");
		this_Label.find('.HallInfo_imgc_delete').remove();
	})
}
//大厅展示
function hall_Exhibition(){
	$("body").append(`<div class="HallInfo_bg">
		<div class="HallInfo_bg_cont">
			<div class="HallInfo_bg_header">
				<h2>添加大厅</h2>
				<div class="HallInfo_bg_Close HallInfo_Close" onclick="Close_hall()"></div>
			</div>
			<div class="HallInfo_bg_x10">
				<form id="hallForm" enctype="multipart/form-data" method="post">
					<div class="HallInfo_bg_x20">
						<h3>大厅名称：</h3>
						<input type="text" name="lobbyName" class="HallInfo_bg_x20_input HallInfo_name" maxlength="10" placeholder="名称不超过十个字(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅尺寸：</h3>
						<div class="HallInfo_bg_x20_size">
							长：<input type="text" maxlength="7" placeholder="单位(米)" class="input_Num">
							宽：<input type="text" maxlength="7" placeholder="单位(米)" class="input_Num">
							高：<input type="text" maxlength="7" placeholder="单位(米)" class="input_Num">
						</div>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>最大桌数：</h3>
						<input type="text" name="lobbyDeskNum" class="HallInfo_bg_x20_input HallInfo_number input_Num" placeholder="(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅价格：</h3>
						<input type="text" name="lobbyPrice" class="HallInfo_bg_x20_input HallInfo_price input_Num" placeholder="(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅描述：</h3>
						<textarea name="lobbyIntro" class="HallInfo_bg_x20_textarea HallInfo_describe" placeholder="最大字数不能超过500字,输入内容不支持换行符" maxlength="500"></textarea>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片上传：</h3>
						<ul class="HallInfo_bg_images_box">
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最多选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最多选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最多选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt"><p>(最多选择4张)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
						</ul>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片描述</h3>
						<div class="HallInfo_img_describe">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
							<input type="text" maxlength="15" placeholder="输入不超过15字">
						</div>
					</div>
				</form>
				<div class="HallInfo_bg_x30">
					<button class="HallInfo_bg_but01">确定</button>
					<button class="HallInfo_bg_but02 HallInfo_Close" onclick="Close_hall()">取消</button>
				</div>
			</div>
		</div>
	</div>`);
	/*设置input框必须输入正数*/
	$(".input_Num").change(function() {
		if($(this).val() > 0 == false){
			$(this).val("");
		}
	});
}
//刷新酒店信息
function Refresh_hotelInfo(info){
	var info = info.hotel[0];
	$("input[name=T_hotel_name]").val(info.hotelName);
	$("input[name=T_hotel_telephone]").val(info.hotelTelephone);
	$("input[name=T_hotel_address]").val(info.hotelAddress);
	$("input[name=T_hotel_price]").val(info.hotelPrice);
	$(".T_hotel_introduction").val(info.hotelIntroduction);
	$("input[name=T_hotel_cuisine_price_section]").val(info.hotelCuisinePriceSection);
	$("input[name=T_hotel_door_money_status]").val(info.doorMoneyStatus);
	$("input[name=T_hotel_matrimonial_home_status]").val(info.matrimonialHomeStatus);
	$("input[name=T_hotel_lamplight_status]").val(info.lamplightStatus);
	$("input[name=T_hotel_information]").val(info.hotelInformation);
	$("input[name=T_hotel_feature]").val(info.hotelFeature);
	$("input[name=T_hotel_facility]").val(info.hotelFacility);
	$("input[name=T_hotel_park]").val(info.hotelPark);
	var icon_info = [info.wifiStatus,info.parkStatus,info.restaurantStatus,info.luggageStatus]
	for(var i=0;i<icon_info.length;i++){
		if(icon_info[i] == 1){
			$(".main_box_icon li").eq(i).addClass('main_box_x30_on')
		}
	}
	//酒店图片
	var sStage_img = (info.hotelImgUrl).split(",");
	if(sStage_img.length >= 15){
		$(".upload_img").eq(0).find(".upload_img_Choice").css("display","none");
	}
	var sStage = "";
	for(var a=0;a<sStage_img.length;a++){
		imgbox_img[0].push(sStage_img[a])
		sStage +='<div class="main_file">'+
			'<div class="show">'+
			'<img src="'+apiUrl+sStage_img[a]+'">'+
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
}
//刷新大厅信息
function Refresh_hallInfo(info){
	var hall_info = info.hotel[0].hotelLobbies;
	var str = "";
	if(hall_info.length > 0){
		hall_info.reverse()
		for(var i=0;i<hall_info.length;i++){
			str+=`<li>
				<div class="HallInfo_cont">
					<h2>大厅名称：`+hall_info[i].lobbyName+`</h2>
					<div class="HallInfo_but">
						<button class="HallInfo_cont_edit" onclick="edit_hallInfo(`+hall_info[i].lobbyId+`,`+info.hotel[0].hotelId+`)">编辑</button>|
						<button class="HallInfo_cont_delete" onclick="delete_hallInfo(`+hall_info[i].lobbyId+`,`+info.hotel[0].hotelId+`)">删除</button>
					</div>
				</div>
			</li>`
		}
	}
	$(".HallInfo").html(str);
}
//删除大厅
function delete_hallInfo(hall_id,id){
	meg2("提示","是否确定删除大厅","body",dathing)
	function dathing(){
		$.ajax({
			type: 'POST',
			url: apiUrl+'/hotelLobby/deleteHotelLobby',
			data: {lobbyId:hall_id},
			dataType: 'json',
			success:function(e){
				if(e.status == 200){
					meg("提示","删除成功","body",dothing)
					function dothing(){
						Exhibition_hall(id)
					}
				}else{
					meg("提示","删除大厅失败","body")
				}
			}
		})
	}	
}
//编辑大厅
function edit_hallInfo(hall_id,id){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/hotel/queryHotelInfo',
		data: {id:id},
		dataType: 'json',
		success:function(e){
			if(e.status == 200){
				var img_edit = [];
				edit_hallInfo_Rendering(e,hall_id,img_edit)
				//预览图片
				var input_img = ["","","",""];
				file_img_change(input_img);
				on_edit_hallInfo(hall_id,img_edit,input_img,id);
			}else{
				meg("提示","获取大厅数据失败","body")
			}
		}
	})
}
//编辑大厅信息渲染
function edit_hallInfo_Rendering(e,hall_id,img_edit){
	var info = "";
	for(var i=0;i<e.hotel[0].hotelLobbies.length;i++){
		if(e.hotel[0].hotelLobbies[i].lobbyId == hall_id){
			info = e.hotel[0].hotelLobbies[i]
		}
	}
	for(var s=0;s<4;s++){
		img_edit.push(info.lobbyImgUrl.split(",")[s]);
	}
	$("body").append(`<div class="HallInfo_bg">
		<div class="HallInfo_bg_cont">
			<div class="HallInfo_bg_header">
				<h2>添加大厅</h2>
				<div class="HallInfo_bg_Close HallInfo_Close" onclick="Close_hall()"></div>
			</div>
			<div class="HallInfo_bg_x10">
				<form id="hallForm" enctype="multipart/form-data" method="post">
					<div class="HallInfo_bg_x20">
						<h3>大厅名称：</h3>
						<input type="text" value="`+info.lobbyName+`" name="lobbyName" class="HallInfo_bg_x20_input HallInfo_name" maxlength="10" placeholder="名称不超过十个字(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅尺寸：</h3>
						<div class="HallInfo_bg_x20_size">
							长：<input type="text" maxlength="7" placeholder="单位(米)" value="`+info.lobbySize.split(",")[0]+`" class="input_Num">
							宽：<input type="text" maxlength="7" placeholder="单位(米)" value="`+info.lobbySize.split(",")[1]+`" class="input_Num">
							高：<input type="text" maxlength="7" placeholder="单位(米)" value="`+info.lobbySize.split(",")[2]+`" class="input_Num">
						</div>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>最大桌数：</h3>
						<input type="text" value="`+info.lobbyDeskNum+`" name="lobbyDeskNum" class="HallInfo_bg_x20_input HallInfo_number input_Num" placeholder="(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅价格：</h3>
						<input type="text" value="`+info.lobbyPrice+`" name="lobbyPrice" class="HallInfo_bg_x20_input HallInfo_price input_Num" placeholder="(必填)">
					</div>
					<div class="HallInfo_bg_x20">
						<h3>大厅描述：</h3>
						<textarea name="lobbyIntro" class="HallInfo_bg_x20_textarea HallInfo_describe" placeholder="最大字数不能超过500字,输入内容不支持换行符" maxlength="500">`+info.lobbyIntro+`</textarea>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片上传：</h3>
						<ul class="HallInfo_bg_images_box">
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(不选视为不修改)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+apiUrl+info.lobbyImgUrl.split(",")[0]+`"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(不选视为不修改)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+apiUrl+info.lobbyImgUrl.split(",")[1]+`"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(不选视为不修改)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+apiUrl+info.lobbyImgUrl.split(",")[2]+`"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
							<li>
								<div class="HallInfo_imgc_Prompt" style="display:none"><p>(不选视为不修改)<br>选择图片</p></div>
								<div class="HallInfo_imgc_show"><img src="`+apiUrl+info.lobbyImgUrl.split(",")[3]+`"></div>
								<input type="file" class="myFileUpload" multiple accept="image/png,image/jpg,image/gif,image/JPEG">
							</li>
						</ul>
					</div>
					<div class="HallInfo_bg_x20">
						<h3>图片描述</h3>
						<div class="HallInfo_img_describe">
							<input type="text" value="`+info.lobbyImgIntro.split(",")[0]+`" maxlength="15" placeholder="输入不超过15字">
							<input type="text" value="`+info.lobbyImgIntro.split(",")[1]+`" maxlength="15" placeholder="输入不超过15字">
							<input type="text" value="`+info.lobbyImgIntro.split(",")[2]+`" maxlength="15" placeholder="输入不超过15字">
							<input type="text" value="`+info.lobbyImgIntro.split(",")[3]+`" maxlength="15" placeholder="输入不超过15字">
						</div>
					</div>
				</form>
				<div class="HallInfo_bg_x30">
					<button class="HallInfo_bg_but01">确定</button>
					<button class="HallInfo_bg_but02 HallInfo_Close" onclick="Close_hall()">取消</button>
				</div>
			</div>
		</div>
	</div>`);
	/*设置input框必须输入正数*/
	$(".input_Num").change(function() {
		if($(this).val() > 0 == false){
			$(this).val("");
		}
	});
}
//确认修改大厅
function on_edit_hallInfo(hall_id,img_edit,input_img,id){
	$(".HallInfo_bg_but01").click(function(){
		var HallInfo_img_describe = [];//大厅图片描述
		var HallInfo_name = $(".HallInfo_name").val();
		var HallInfo_number = $(".HallInfo_number").val();
		var HallInfo_price = $(".HallInfo_price").val();
		var HallInfo_describe = $(".HallInfo_describe").val();
		var HallInfo_oldImg = [];//修改图片名称
		var HallInfo_size = [];
		for(var b=0;b<$(".HallInfo_bg_x20_size input").length;b++){
			HallInfo_size.push($(".HallInfo_bg_x20_size input").eq(b).val())
		}
		if(!HallInfo_name){
			meg("提示","大厅名称为空","body")
			return false;
		}else if(!HallInfo_size[0]){
			meg("提示","大厅尺寸长度为空","body")
			return false;
		}else if(!HallInfo_size[1]){
			meg("提示","大厅尺寸宽度为空","body")
			return false;
		}else if(!HallInfo_size[2]){
			meg("提示","大厅尺寸高度为空","body")
			return false;
		}else if(!HallInfo_number){
			meg("提示","最大桌数为空","body")
			return false;
		}else if(!HallInfo_price){
			meg("提示","大厅价格为空","body")
			return false;
		}else if(HallInfo_img_describe){
			for(var i=0;i<4;i++){
				var HallInfo_img_describe_val = $(".HallInfo_img_describe input").eq(i).val();
				HallInfo_img_describe.push(HallInfo_img_describe_val);
				if(HallInfo_img_describe[i]==""){
					meg("提示","请填写所有的图片描述","body")
					return false;
				}
			}
		}
		//用formDate对象上传
		var data = new FormData($('#hallForm')[0]);
		data.append('lobbySize',HallInfo_size);
		data.append("lobbyImgIntro",HallInfo_img_describe);
		data.append("id",hall_id);
		for(var i=0;i<input_img.length;i++){
			if(input_img[i]!=""){
				data.append("lobbyImgUrl",input_img[i]);
				HallInfo_oldImg.push(img_edit[i]);
			}
		}
		//修改大厅图片名称
		data.append("oldImg",HallInfo_oldImg)
		//发送请求上传大厅
		$.ajax({
			type: 'POST',
			url: apiUrl+'/hotelLobby/updateHotelLobbyInfo',
			data: data,
			processData: false,
			contentType: false,
			success:function(e){
				if(e.status == 200){
					meg("提示","修改成功","body",dothing)
					function dothing(){
						Exhibition_hall(id)
					}
					//关闭窗口
					$(".HallInfo_bg").remove();
				}else{
					meg("提示","修改失败","body")
				}
			}
		})
	})
}
//修改酒店信息
function edit_Hotel(id){
	$(".main_but_on").click(function(){
		if(!$("input[name=T_hotel_name]").val()){
			meg("提示","酒店名称不能为空","body")
			return false;
		}else if(!$("input[name=T_hotel_telephone]").val()){
			meg("提示","酒店电话不能为空","body")
			return false;
		}else if(!$("input[name=T_hotel_address]").val()){
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
		//验证图标
		var icon = ["T_hotel_wifi_status","T_hotel_park_status","T_hotel_restaurant_status","T_hotel_luggage_status"];
		for(var x=0;x<icon.length;x++){
			if($(".main_box_icon li").eq(x).hasClass('main_box_x30_on')){
				data.append(icon[x],1)
			}else{
				data.append(icon[x],0)
			}
		}
		//修改图片名称
		data.append("oldImg",imgbox_name);
		//酒店id
		data.append("id",id)
		on_Loading()
		$.ajax({
			type: 'POST',
			url: apiUrl+'/hotel/updateHotelInfo',
			data: data,
			processData: false,
			contentType: false,
			success: function(e){
				if(e.status == 200){
					down_Loading()
					meg('提示','酒店信息修改成功','body',dothing);
					function dothing(){
						window.location.href = "c_mainHotel.html"
					}
				}else if(e.status == 401){
					down_Loading()
					meg('提示','酒店信息修改失败','body');
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
}
//点击取消按钮
$(".main_but_off").click(function(){
	window.location.href = "c_mainHotel.html"
})
	
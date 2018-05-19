//导入信息
$(document).ready(function(){
	if($.cookie("position")==2){
		$(".serviceDet_Prop").css("display","none");
	}else if($.cookie("position")==3){
		$(".serviceDet_personnel").css("display","none");
	}else{
		$(".serviceDet").css("display","none");
	}
	// 返回顶部按钮
	$("body").append('<div id="icon"><a href=".box"><img src="images/icon.png" alt=""></a></div>')
	$(".main_title_cont a").click(function () {
	    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top}, 500);
	    return false;//不要这句会有点卡顿
	});
	$("#icon a").click(function () {
	    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top}, 500);
	    return false;//不要这句会有点卡顿
	});
	//返回顶部
	$(window).scroll(function(){
		var window_s = $(window).scrollTop();
		var window_h = $(window).height();
		if (window_s >= window_h) {
			$("#icon").css("display","block");
		}else if(window_s < window_h){
			$("#icon").css("display","none");
		}
	})
	//_item 下拉框中的选项标记 
	//_content 选中框内容填放处标记
	function dropDown(_item,_content){
		$(_item).click(function(){
			$(_content).html($(this).html())
		})
	}
	//取消返回上一页
	$(".Cancel").click(function(){
		window.location.href="u_WeddingOrderManagement.html"
	})
	//下拉框样式
	dropDown('.orderStatusContent a','.orderStatus');//订单状态
	dropDown('.hotelAddrContent a','.hotelAddr');//酒店地址
	dropDown('.addOrderItem_AddrContent a','.addOrderItem_Addr');//添加订单详情的区域
	dropDown('.addOrderItem_PriContent a','.addOrderItem_Pri');//添加订单详情的性质
	dropDown('.addPersonItem_TypeContent a','.addPersonItem_Type');//添加人员详情的人员类型
	//报销业务
	$(".Reimbursement li").click(function(){
		if($(this).hasClass("Reimbursement_on")){
			$(this).removeClass('Reimbursement_on');
		}else{
			$(this).addClass('Reimbursement_on');
		}
	})
	//获取订单详情信息
	var indentNos = getUrlParam("id");
	pick_up_information(indentNos);
	//点击确认修改
	$("#Upload").click(function(){
		addOrder(indentNos);
	})
})
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
}
//添加订单
var state=1;
function addOrder(indentNos){
	if(state==1){
		state=2;
		//订单状态
		var _orderStatusVal=$(".orderStatus").text();
		var indentOrderStatus=(_orderStatusVal=="预 定"?0:(_orderStatusVal=="跟 单"?1:(_orderStatusVal=="执 行"?2:(_orderStatusVal=="完 成"?3:0))))
		var indentTime=$("#datetimepicker4").val();//仪式时间
		var indentEinlass=$("#datetimepicker5").val();//入场时间
		var indentBusiness=$(".indentBusiness input").val();//订单来源
		var indentOrderMerchant=$(".indentOrderMerchant input").val();//订单商家
		var indentPrincipal=$(".indentPrincipal input").val();//订单负责人
		var indentPrincipalPhone=$(".indentPrincipalPhone input").val();//负责人电话
		var indentRitualHotel=$(".indentRitualHotel input").val();//仪式酒店
		var indentRemarks=$(".indentRemarks").val();//备注
		//酒店地址
		var dropdown_x10=$(".dropdown_x10").text();//省
		var dropdown_x20=$(".dropdown_x20").text();//市
		var dropdown_x30=$(".dropdown_x30").text();//区
		var dropdown_x40=$(".dropdown_x40 input").val();//详细地址
		if(!indentTime){
			meg("提示","请选择仪式时间","body");
			return false;
		}else if(!indentEinlass){
			meg("提示","请选择入场时间","body");
			return false;
		}else if(!indentBusiness){
			meg("提示","请填写业务来源","body");
			return false;
		}else if(!indentOrderMerchant){
			meg("提示","请填写订单商家","body");
			return false;
		}else if(!indentPrincipal){
			meg("提示","请填写订单负责人","body");
			return false;
		}else if(!indentPrincipalPhone){
			meg("提示","请填写负责人电话","body");
			return false;
		}else if(!indentRitualHotel){
			meg("提示","请填写仪式酒店","body");
			return false;
		}else if(!dropdown_x40){
			meg("提示","请填写酒店详细地址","body");
			return false;
		}
		var particularArea=[];//区域
		var particularNature=[];//性质
		var particularName=[];//名字
		var particularSize=[];//尺寸
		var particularColour=[];//颜色
		var particularSubtotal=[];//小计
		var particularPrincipalMessage=[];//负责人信息
		var personnelType=[];//人员类型
		var personnelName=[];//人员名字
		var personnelPrice=[];//价格
		var personnelPhone=[];//联系方式
		var particularNumber=[];//数量
		if(addProp.length>0){
			for(var i=0;i<addProp.length;i++){
				particularArea.push(addProp[i].x10);
				particularNature.push(addProp[i].x60);
				particularName.push(addProp[i].x20);
				particularSize.push(addProp[i].x30);
				particularColour.push(addProp[i].x40);
				particularSubtotal.push(addProp[i].x50);
				particularPrincipalMessage.push(addProp[i].x70);
				particularNumber.push(addProp[i].x80);
			}
		}
		if(addpersonnel.length>0){
			for(var s=0;s<addpersonnel.length;s++){
				personnelType.push(addpersonnel[s].x10);
				personnelName.push(addpersonnel[s].x20);
				personnelPrice.push(addpersonnel[s].x30);
				personnelPhone.push(addpersonnel[s].x40);
			}
		}
		var data = {
			indentNo:indentNos,
			indentOrderStatus:indentOrderStatus,
			indentTime:indentTime,
			indentBusiness:indentBusiness,
			indentPrincipal:indentPrincipal,
			indentPrincipalPhone:indentPrincipalPhone,
			indentRitualHotel:indentRitualHotel,
			indentDetailedHotelAddress:dropdown_x10+','+dropdown_x20+','+dropdown_x30+','+dropdown_x40,
			particularArea:particularArea.join(","),
			particularNature:particularNature.join(","),
			particularName:particularName.join(","),
			particularSize:particularSize.join(","),
			particularColour:particularColour.join(","),
			particularSubtotal:particularSubtotal.join(","),
			particularPrincipalMessage:particularPrincipalMessage.join(","),
			personnelType:personnelType.join(","),
			personnelName:personnelName.join(","),
			personnelPrice:personnelPrice.join(","),
			personnelPhone:personnelPhone.join(","),
			indentRemarks:indentRemarks,
			particularNumber:particularNumber.join(","),
			indentEinlass:indentEinlass,
			indentOrderMerchant,indentOrderMerchant
		}
		on_Loading();
		$.ajax({
			type: 'POST',
			url: apiUrl+'/indent/addIndent',
			data: data,
			dataType: 'json',
			success:function(e){
				down_Loading();
				if(e.status==200){
					meg("提示","保存成功，返回订单管理","body",dothing);
					function dothing(){
						window.location.href="u_WeddingOrderManagement.html"
					}
				}else{
					meg("提示","保存失败，请稍后再试","body");
				}
			},
			error(){
				down_Loading();
				meg("提示","服务器繁忙，请稍后再试","body");
			}
		})
	}
}
var addProp=[];
addProps();
//道具舞美添加
function addProps(){
	ToupdateProp();
	// 点击订单详情的添加按钮
	$(".orderAddButton").click(function(){
		$(".addOrderItems").css("display","block");
	})
	//添加
	$(".add_order").click(function(){
		var addProp_x10=$(".addProp_x10").text();//区域
		var addProp_x20=$(".addProp_x20 input").val();//名称
		var addProp_x30=$(".addProp_x30 input").val();//尺寸
		var addProp_x40=$(".addProp_x40 input").val();//颜色
		var addProp_x50=$(".addProp_x50 input").val();//小计
		var addProp_x60=$(".addProp_x60").text();//性质
		var addProp_x70=$(".addProp_x70 input").val();//责任人电话
		var addProp_x80=$(".addProp_x80 input").val();//数量
		if(!addProp_x20||!addProp_x30||!addProp_x40||!addProp_x50||!addProp_x70||!addProp_x80){
			meg("提示","请填写完整的信息","body");
			return false;
		}
		addProp.push({
			x10:addProp_x10,
			x20:addProp_x20,
			x30:addProp_x30,
			x40:addProp_x40,
			x50:addProp_x50,
			x60:addProp_x60,
			x70:addProp_x70,
			x80:addProp_x80
		})
		$(".addOrderItems").css("display","none");
		emptyProp();
		ToupdateProp();
	})
	//清空框
	function emptyProp(){
		$(".addProp_x10").text("主舞台");
		$(".addProp_x60").text("舞美");
		$(".addProp_x20 input").val("");
		$(".addProp_x30 input").val("");
		$(".addProp_x40 input").val("");
		$(".addProp_x50 input").val("");
		$(".addProp_x70 input").val("");
		$(".addProp_x80 input").val("");
		$(".ordercheck").attr("checked",false);
		$(":checkbox[name=cds]").attr("checked",false);
	}
	//更新内容
	function ToupdateProp(){
		var str="";
		var number=""
		for(var i=0;i<addProp.length;i++){
			str+='<div class="orderTableTr">'+
				'<div>'+
					'<label for="totalChoose">'+
						'<input type="checkbox" name="cds" id="totalChoose">'+
					'</label>'+
				'</div>'+
				'<div>'+addProp[i].x10+'</div>'+
				'<div>'+addProp[i].x60+'</div>'+
				'<div>'+addProp[i].x20+'</div>'+
				'<div>'+addProp[i].x30+'</div>'+
				'<div>'+addProp[i].x40+'</div>'+
				'<div>'+addProp[i].x80+'</div>'+
				'<div>'+addProp[i].x50+'</div>'+
				'<div class="rightBorderNone">'+addProp[i].x70+'</div>'+
			'</div>'
			number=Number(number)+(Number(addProp[i].x50)*Number(addProp[i].x80));
		}
		$(".orderTableTr_box").html(str);
		$(".part_calcProp").text(number==""?0:number);//小计
		$(".total_calc_Total").text(Number(number)+Number($(".part_calc_personnel").text()));//合计
		$(function(){
			$(".ordercheck").click(function(){
				$(":input[name='cds']").prop("checked",this.checked);
			});
			$(":checkbox[name='cds']").click(function(){
				$(".ordercheck").prop("checked",$(":checkbox[name='cds']").length==$(":checkbox[name='cds']:checked").length);
			});
		})
	}
	//点击删除
	$(".removeButton_Prop").click(function(){
		var delete_index=[]
		for(var i=0;i<$(".orderTableTr_box .orderTableTr").length;i++){
			if($(".orderTableTr_box .orderTableTr").eq(i).find(":checkbox[name='cds']").is(":checked")){
				delete_index.push(i)
			}
		};
		delete_index.reverse();
		for(var s=0;s<delete_index.length;s++){
			addProp.splice(delete_index[s],1)
		}
		emptyProp();
		ToupdateProp();
	})
	//点击关闭
	$(".CloseProps").click(function(){
		$(".addOrderItems").css("display","none");
		emptyProp();
	})
}	
//人员添加
var addpersonnel=[];
addpersonnels();
function addpersonnels(){
	ToupdateProp();
	// 点击订单详情的添加按钮
	$(".personAddButton").click(function(){
		$(".addPersonItems").css("display","block");
	})
	//添加
	$(".add_person").click(function(){
		var addpersonnel_x10=$(".addpersonnel_x10").text();//人员类型
		var addpersonnel_x20=$(".addpersonnel_x20 input").val();//名称
		var addpersonnel_x30=$(".addpersonnel_x30 input").val();//价格
		var addpersonnel_x40=$(".addpersonnel_x40 input").val();//联系方式
		if(!addpersonnel_x40||!addpersonnel_x20||!addpersonnel_x30){
			meg("提示","请填写完整的信息","body");
			return false;
		}
		addpersonnel.push({
			x10:addpersonnel_x10,
			x20:addpersonnel_x20,
			x30:addpersonnel_x30,
			x40:addpersonnel_x40
		})
		$(".addPersonItems").css("display","none");
		emptyProp();
		ToupdateProp();
	})
	//清空框
	function emptyProp(){
		$(".addpersonnel_x10").text("主持人");
		$(".addpersonnel_x20 input").val("");
		$(".addpersonnel_x30 input").val("");
		$(".addpersonnel_x40 input").val("");
		$(".check").attr("checked",false);
		$(":checkbox[name=ids]").attr("checked",false);
	}
	//更新内容
	function ToupdateProp(){
		var str="";
		var number=""
		for(var i=0;i<addpersonnel.length;i++){
			str+='<div class="orderTableTr">'+
				'<div>'+
					'<label for="totalChoose">'+
						'<input type="checkbox" name="ids" id="totalChoose">'+
					'</label>'+
				'</div>'+
				'<div>'+addpersonnel[i].x10+'</div>'+
				'<div>'+addpersonnel[i].x20+'</div>'+
				'<div>'+addpersonnel[i].x30+'</div>'+
				'<div class="rightBorderNone">'+addpersonnel[i].x40+'</div>'+
			'</div>'
			number=Number(number)+Number(addpersonnel[i].x30);
		}
		$(".personnel_box").html(str);
		$(".part_calc_personnel").text(number==""?0:number);//小计
		$(".total_calc_Total").text(Number(number)+Number($(".part_calcProp").text()));//合计
		$(function(){
			$(".check").click(function(){
				$(":input[name='ids']").prop("checked",this.checked);
			});
			$(":checkbox[name='ids']").click(function(){
				$(".check").prop("checked",$(":checkbox[name='ids']").length==$(":checkbox[name='ids']:checked").length);
			});
		})
	}
	//点击删除
	$(".removeButton_person").click(function(){
		var delete_index=[]
		for(var i=0;i<$(".personnel_box .orderTableTr").length;i++){
			if($(".personnel_box .orderTableTr").eq(i).find(":checkbox[name='ids']").is(":checked")){
				delete_index.push(i)
			}
		};
		delete_index.reverse();
		for(var s=0;s<delete_index.length;s++){
			addpersonnel.splice(delete_index[s],1)
		}
		emptyProp();
		ToupdateProp();
	})
	//点击关闭
	$(".remove_person").click(function(){
		$(".addPersonItems").css("display","none");
		emptyProp();
	})
}
//获取订单信息
function pick_up_information(indentNos){
	on_Loading();
	$.ajax({
		type: 'POST',
		url: apiUrl+'/indent/queryIndentInfo',
		data: {indentNo:indentNos},
		dataType: 'json',
		success:function(e){
			down_Loading();
			if(e.status==200){
				var data = e.indent[0];
				var _orderStatusVal=data.indentOrderStatus;//订单状态
				$(".orderStatus").text((_orderStatusVal=="0"?"预 定":(_orderStatusVal=="1"?"跟 单":(_orderStatusVal=="2"?"执 行":(_orderStatusVal==3?"完 成":"预 定")))))
				$("#datetimepicker4").val(data.indentTime);//仪式时间
				$("#datetimepicker5").val(data.indentEinlass);//入场时间
				$(".indentFieldTime input").val(data.indentFieldTime);//布场时长
				$(".indentBusiness input").val(data.indentBusiness);//业务来源
				$(".indentOrderMerchant input").val(data.indentOrderMerchant);//订单商家
				$(".indentPrincipal input").val(data.indentPrincipal);//订单负责人
				$(".indentPrincipalPhone input").val(data.indentPrincipalPhone);//负责人电话
				$(".indentRitualHotel input").val(data.indentRitualHotel);//仪式酒店
				$(".dropdown_x30").val(data.indentDetailedGreetAddress.split(",")[2]);//酒店地址
				$(".dropdown_x40 input").val(data.indentDetailedGreetAddress.split(",")[3]);//酒店地址
				$(".indentRemarks").val(data.indentRemarks);//备注
				//道具舞美
				if(data.indentParticulars!=""){
					for(var x=0;x<data.indentParticulars.length;x++){
						var data01=data.indentParticulars[x];
						addProp.push({
							x10:data01.particularArea,
							x20:data01.particularName,
							x30:data01.particularSize,
							x40:data01.particularColour,
							x50:data01.particularSubtotal,
							x60:data01.particularNature,
							x70:data01.particularPrincipalMessage,
							x80:data01.particularNumber
						})
					}
				}
				addProps();
				//人员
				if(data.indentPersonnels!=""){
					for(var v=0;v<data.indentPersonnels.length;v++){
						var data02=data.indentPersonnels[v];
						addpersonnel.push({
							x10:data02.personnelType,
							x20:data02.personnelName,
							x30:data02.personnelPrice,
							x40:data02.personnelPhone
						})
					}
				}
				addpersonnels();
			}else{
				meg("提示","订单信息查询失败，请稍后重试","body");
			}
		},
		error(){
			down_Loading();
			meg("提示","服务器繁忙，请稍后再试","body");
		}
	})
}


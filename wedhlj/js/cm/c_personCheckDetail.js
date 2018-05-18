$(document).ready(function(){
	//接收URL中的参数id
	var id = getUrlParam('id');
	//当前页面默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	//获取审核数据详情
	selectById(id);
})
//防止多次点击
var state=1;
///user/ selectById  根据ID查询用户
function selectById(myid){
	$.ajax({
		type:'post',
		url: apiUrl+'/BusinessPersonnel/queryBusinessPersonnelInfo',
		data:{PersonnelNo:myid},
		dataType: 'json',
		success:function(e){
			var user=e.businessPersonnelList[0];
			// 名称
			$(".name").html(user.name);
			// 地址
			$(".address").html(user.address.split(",").join(""));
			// 身高
			$(".height").html(user.height);
			// 风格
			$(".style").html(user.style);
			// 基本工资
			$(".wage").html(user.wage+"元");
			// 提成率
			$(".commission").html(user.commission+"%");
			// 接单价格
			$(".order_price").html(user.order_price+"元");
			// 人员简介
			$(".introduce").html(user.introduce);
			// 公告
			$(".notice").html(user.notice);
			//头像
			$(".add_type_logo").html('<li><img src="'+apiUrl+user.headPortait+'"></li>')
			//案例视频
			var case_video=user.case_video.split(",");
			for(var x=0;x<case_video.length;x++){
				$(".case_video").append('<p>'+case_video[x]+'</p>');
			}
			//图片
			var Planimg_whole=[];//全部图片
			var Planimg=user.case_img.split(",");
			for(var s=0;s<Planimg.length;s++){
				Planimg_whole.push(Planimg[s]);
				$(".add_type_map").append('<li><img src="'+apiUrl+Planimg[s]+'"></li>')
			}
			//酒店图片渲染
			var hotel_img = "";
			for(var q=0;q<Planimg_whole.length;q++){
				hotel_img+='<div class="swiper-slide swiper-no-swiping Exhibition_img_box"><img src="'+apiUrl+Planimg_whole[q]+'"></div>'
			}
			$(".Exhibition_cont_img .swiper-wrapper").html(hotel_img);
			var mySwiper = new Swiper('.Exhibition_cont_img', {
				keyboardControl : true,
				mousewheelControl : true,
				pagination : '.swiper-pagination',
				paginationType : 'fraction',
			})
			$(".Exhibition").css("display","none");
			img_block();
			//审核按钮
			Examine(user.personnelNo);
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//审核
function Examine(username){
	//通过
	$(".confirm").click(function(){
		if(state==1){
			state=2;
			ToExamine(username,1)
		}
	})
	//未通过
	$(".cancel").click(function(){
		if(state==1){
			state=2;
			ToExamine(username,0)
		}
	})
}
//审核
function ToExamine(username,auditStatus){
	$.ajax({
		type:'post',
		url: apiUrl+'/BusinessPersonnel/businessPersonnel',
		data:{PersonnelNo:username,audit:auditStatus},
		dataType: 'json',
		success:function(e){
			if(e.status==200){
				meg("提示","操作成功！","body",reload)
			}else{
				meg("提示","操作失败！","body",reload)
			}
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
function reload(){
	window.location.href = document.referrer;
}
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
}
//图片展示
function img_block(){
	$(".Exhibition_bg").click(function(){
		$(".Exhibition").css("display","none")
	})
	$(".add_type_map li").click(function(){
		var this_index = $(this).index();
		$(".Exhibition").css({"display":"block","opacity":"0"});
		var mySwiper = new Swiper('.Exhibition_cont_img', {
			keyboardControl : true,
			mousewheelControl : true,
			initialSlide :this_index,
			pagination : '.swiper-pagination',
			paginationType : 'fraction',
		})
		$(".Exhibition").css({"display":"block","opacity":"1"});
	})	
}
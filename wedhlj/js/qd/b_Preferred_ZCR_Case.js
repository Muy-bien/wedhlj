$(document).ready(function(){
	$(".nav_li").eq(3).find("a").addClass("nav_on");
	//接收URL中的参数spid
	var PersonnelNo = getUrlParam('PersonnelNo');
	//请求数据
	queryBusinessPersonnelInfo(PersonnelNo)
})
//查询人员详情/BusinessPersonnel/queryBusinessPersonnelInfo
function queryBusinessPersonnelInfo(PersonnelNo){
	$.ajax({
		type:"post",
		url: apiUrl+'/BusinessPersonnel/queryBusinessPersonnelInfo',
		dataType: 'json',
		data:{PersonnelNo:PersonnelNo},
		success:function(e){
			var person=e.businessPersonnelList[0];
			var htmlOne='';
			htmlOne+='<div class="person_pic_left">'+
							'<div class="person_pic_left_bg">'+
								
								'<div class="person_pic_left_head">'+
									'<img src="'+apiUrl+person.headPortait+'">'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="person_detail_right">'+
							'<div class="p_name">'+person.name+'</div>'+
							'<div class="p_star">';
							var star=person.star;
							for(var i=0;i<star;i++){
								htmlOne+='<i></i>'
							}
			htmlOne+=		'<div class="p_price">￥20000<em>起</em></div>'+
							'<div class="p_addr">'+person.address.split(",").join('')+'</div>'+
							'<div class="p_sale_content">'+person.notice+'</div>'+
							'<input type="button" value="预约TA" class="pre_con">'+
							'<input type="button" value="联系TA" class="ing_con">'+
							'</div>'+
						'</div>';
				$(".person_detail").html(htmlOne);

				$(".pre_con").click(function(){
					meg('提示','功能正在升级！','body');
				})
				$(".ing_con").click(function(){
					meg('提示','功能正在升级！','body');
				})
				//团队介绍
				$(".teamIntro").html(person.mDesc+'<hr class="simple_intr_hr"/>');
				$(".simpIntr").html(person.introduce+'<hr class="simple_intr_hr"/>');
				// 形象展示
				var show_pic=person.case_img.split(",");
				var showHtml='';
				for(var i=0;i<show_pic.length;i++){
					showHtml+='<div>'+
									'<div class="img_auto" style="background-image:url('+apiUrl+show_pic[i]+')"></div>'+
								'</div>'
				}
				$(".show_pic").html(showHtml);
				//作品展示
				var videoHtml='';
				var video=person.case_video.split(",");
				video.pop();
				if(video.length<=0){
					$(".result_video_show").html('该人员没有上传对应作品！');
				}else{
					for(var i=0;i<video.length;i++){
						videoHtml+='<a href="'+video[i]+'">'+
									'<img src="images/b_Preferred_ZCR_Case/image_show_pic07.png">'+
								'</a>'
					}
					$(".result_video_show").html(videoHtml);
				}


		},
		error:function(e){meg("提示","网络开小差，请检查！","body")}
	})
}

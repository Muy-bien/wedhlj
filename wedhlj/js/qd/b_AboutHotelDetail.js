$(document).ready(function(){
	$(".nav_li").eq(4).find("a").addClass("nav_on");	
	//接收URL中的参数spid
	var hid = getUrlParam('hid');
	Exhibition(hid)
})
//展示详情
function Exhibition(id){
	$.ajax({
		type: 'POST',
		url: apiUrl+'/hotel/queryHotelInfo',
		data: {id:id},
		dataType: 'json',
		success:function(e){
			if(e.status == 200){
				var hotel = e.hotel[0];
				//酒店图片渲染
				var hotel_img = "";
				for(var i=0;i<hotel.hotelImgUrl.split(",").length;i++){
					hotel_img+='<div class="swiper-slide swiper-no-swiping Exhibition_img_box"><img src="'+apiUrl+hotel.hotelImgUrl.split(",")[i]+'"></div>'
				}
				$(".Exhibition_cont_img .swiper-wrapper").html(hotel_img);
				var mySwiper = new Swiper('.Exhibition_cont_img', {
					keyboardControl : true,
					mousewheelControl : true,
					pagination : '.swiper-pagination',
					paginationType : 'fraction',
				})
				$(".Exhibition").css("display","none")
				//酒店详情头部
				var main_header = "";
				main_header += ''+
				'<h1>'+hotel.hotelName+'</h1>'+
				'<h2>'+hotel.hotelAddress.split(",").join("")+'</h2>'+
				'<ul class="main_header_Icon">';
					if(hotel.wifiStatus == 1){
						main_header +='<li class="Icon_01"></li>'
					}
					if(hotel.parkStatus == 1){
						main_header +='<li class="Icon_02"></li>'
					}
					if(hotel.restaurantStatus == 1){
						main_header +='<li class="Icon_03"></li>'
					}
					if(hotel.luggageStatus == 1){
						main_header +='<li class="Icon_04"></li>'
					}
				main_header +='</ul>'+
				'<div class="main_header_img">'+
					'<div class="main_header_img_x10 img_auto" style="background-image: url('+apiUrl+hotel.hotelImgUrl.split(",")[0]+')"></div>'+
					'<ul>'+
						'<li class="main_header_img_x20 img_auto" style="background-image: url('+apiUrl+hotel.hotelImgUrl.split(",")[1]+')"></li>'+
						'<li class="main_header_img_x20 img_auto" style="background-image: url('+apiUrl+hotel.hotelImgUrl.split(",")[2]+')"></li>'+
						'<li class="main_header_img_x20 img_auto" style="background-image: url('+apiUrl+hotel.hotelImgUrl.split(",")[3]+')"></li>'+
						'<li class="main_header_img_x20 img_auto" style="background-image: url('+apiUrl+hotel.hotelImgUrl.split(",")[4]+')"></li>'+
						'<li class="main_header_img_x20 img_auto" style="background-image: url('+apiUrl+hotel.hotelImgUrl.split(",")[5]+')"></li>'+
						'<li class="main_header_img_x20 img_auto" style="background-image: url('+apiUrl+hotel.hotelImgUrl.split(",")[6]+')"></li>'+
					'</ul>'+
				'</div>';
				$(".main_header").html(main_header);
				//酒店内容
				var main_cont = "";
				main_cont +='<ul class="main_cont_title"><li class="main_cont_title_on">酒店介绍</li>';
				for(var d = 0;d<hotel.hotelLobbies.length;d++){
					main_cont +='<li>'+hotel.hotelLobbies[d].lobbyName+'</li>'
				};
				main_cont +='</ul>'+
				'<div class="main_cont_box">'+
					'<div class="main_cont_x10 main_cont_on">'+
						'<div class="main_cont_x10_header">'+
							'<h1 class="main_cont_x10_title">酒店介绍</h1>'+
							'<p>'+hotel.hotelIntroduction+'</p>'+
						'</div>'+
						'<div class="main_cont_x10_info">'+
							'<h1 class="main_cont_x10_title">酒店政策</h1>'+
							'<ul>'+
								'<li>'+
									'<h2>酒店菜品价格区间</h2>'+
									'<p>'+hotel.hotelCuisinePriceSection+'</p>'+
								'</li>'+
								'<li>'+
									'<h2>酒店是否收取入场费</h2>'+
									'<p>'+hotel.doorMoneyStatus+'</p>'+
								'</li>'+
								'<li>'+
									'<h2>酒店是否提供婚房</h2>'+
									'<p>'+hotel.matrimonialHomeStatus+'</p>'+
								'</li>'+
								'<li>'+
									'<h2>酒店是否提供音响和灯光</h2>'+
									'<p>'+hotel.lamplightStatus+'</p>'+
								'</li>'+
							'</ul>'+
						'</div>'+
						'<div class="main_cont_x10_info">'+
							'<h1 class="main_cont_x10_title">设施服务</h1>'+
							'<ul>'+
								'<li>'+
									'<h2>基本信息</h2>'+
									'<p>'+hotel.hotelInformation+'</p>'+
								'</li>'+
								'<li>'+
									'<h2>酒店特色</h2>'+
									'<p>'+hotel.hotelFeature+'</p>'+
								'</li>'+
								'<li>'+
									'<h2>网络设施</h2>'+
									'<p>'+hotel.hotelFacility+'</p>'+
								'</li>'+
								'<li>'+
									'<h2>停车服务</h2>'+
									'<p>'+hotel.hotelPark+'</p>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
				for(var s=0;s<hotel.hotelLobbies.length;s++){
					var hotelLobbies = hotel.hotelLobbies[s];
					var lobbySize = hotelLobbies.lobbySize.split(",");
					main_cont +='<div class="main_cont_x20">'+
						'<div class="main_cont_x20_header">'+
							'<h1>大厅简介</h1>'+
							'<p>大厅尺寸：<br>'+lobbySize[0]+'m * '+lobbySize[1]+'m * '+lobbySize[2]+'m （长*宽*高）<br>大厅总共可以容纳：<br>'+hotelLobbies.lobbyDeskNum+'桌<br>价格：<br>'+hotelLobbies.lobbyPrice+'元</p>'+
							'<p class="main_cont_x20_text">大厅描述：<br>'+hotelLobbies.lobbyIntro+'</p>'+
						'</div>'+
						'<div class="main_cont_x20_info">'+
							'<h1>大厅图片</h1>'+
							'<ul>';
							for(var c=0;c<hotelLobbies.lobbyImgUrl.split(",").length;c++){
								main_cont +='<li>'+
									'<img src="'+apiUrl+hotelLobbies.lobbyImgUrl.split(",")[c]+'">'+
									'<p>'+hotelLobbies.lobbyImgIntro.split(",")[c]+'</p>'+
								'</li>'
							}
					main_cont +='</ul></div></div>';
				}
				main_cont +='</div></div>'
				$(".main_cont").html(main_cont);
				main_hover();
				img_block();
			}
		}
	})
}

//移入切换
function main_hover(){
	$(".main_cont_title li").hover(function(){
		var this_index = $(this).index();
		$(this).addClass('main_cont_title_on').siblings('').removeClass('main_cont_title_on');
		$(".main_cont_box > div").eq(this_index).addClass('main_cont_on').siblings('').removeClass('main_cont_on');
	})
}

//图片展示
function img_block(){
	$(".Exhibition_bg").click(function(){
		$(".Exhibition").css("display","none")
	})
	$(".main_header_img").click(function(){
		$(".Exhibition").css({"display":"block","opacity":"1"})
	})	
}
$(document).ready(function(){
	$(".nav_li").eq(0).find("a").addClass("nav_on");
	//接收URL中的参数spid
	var schemeNo = getUrlParam('schemeNo');
	queryScheme(schemeNo);
})
//scheme/queryScheme
function queryScheme(schemeNo){
	on_Loading();
	$.ajax({
		type:"post",
		url: apiUrl+"scheme/queryScheme",
		dataType: 'json',
		data: {schemeNo:schemeNo},
		success:function(e){
			var scheme=e.scheme;
			//头像
			$(".main_top_logo").html('<div><img src="'+apiUrl+scheme[0].merchant.mLogo+'" alt=""></div>')
			// 价格
			$(".main_top_footer>p>span").html(scheme[0].schemePrice);
			// 星级
			var star=scheme[0].merchant.mStar;
			var starHtml='';
			for(var i=0;i<star;i++){
				starHtml+='<i class="main_top_ion"></i>'
			}
			$(".main_top_i").html(starHtml);
			// 设计思路schemeDesign
			$(".Design>p").html(scheme[0].schemeDesign);
			// 主舞台
			var main_img01 = new Array;
			var sStage = "";
			main_img01 = scheme[0].schemeStageArea.split(",");
			for(var i=0;i<main_img01.length;i++){
				sStage +='<div class="swiper-slide swiper-no-swiping" style="background:url('+apiUrl+main_img01[i]+') no-repeat scroll center center/contain"></div>'
			}
			$(".main_cont_x10").html(sStage);
			// 礼道区
			var main_img02 = new Array;
			var sPassage = "";
			main_img02 = scheme[0].schemePassageArea.split(",");
			for(var i=0;i<main_img02.length;i++){
				sPassage +='<div class="swiper-slide swiper-no-swiping" style="background:url('+apiUrl+main_img02[i]+') no-repeat scroll center center/contain"></div>'
			}
			$(".main_cont_x20").html(sPassage)
			// 签到区
			var main_img03 = new Array;
			var sSign = "";
			main_img03 = scheme[0].schemeSignArea.split(",");
			for(var i=0;i<main_img03.length;i++){
				sSign +='<div class="swiper-slide swiper-no-swiping" style="background:url('+apiUrl+main_img03[i]+') no-repeat scroll center center/contain"></div>'
			}
			$(".main_cont_x30").html(sSign)
			// 合影区
			var main_img04 = new Array;
			var sPhoto = "";
			main_img04 = scheme[0].schemePhotoArea.split(",");
			for(var i=0;i<main_img04.length;i++){
				sPhoto +='<div class="swiper-slide swiper-no-swiping" style="background:url('+apiUrl+main_img04[i]+') no-repeat scroll center center/contain"></div>'
			}
			$(".main_cont_x40").html(sPhoto)
			// 甜品区
			var main_img05 = new Array;
			var sSweetmeats = "";
			main_img05 = scheme[0].schemeSweetmeatsArea.split(",");
			for(var i=0;i<main_img05.length;i++){
				sSweetmeats +='<div class="swiper-slide swiper-no-swiping" style="background:url('+apiUrl+main_img05[i]+') no-repeat scroll center center/contain"></div>'
			}
			$(".main_cont_x50").html(sSweetmeats)
			 //图片展示
			var mySwiper = new Swiper('.main_Exhibition_cont', {
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				loop: false,
			})
			down_Loading();
		},
		error:function(){
			down_Loading();
			meg("提示","服务器开了小差，请稍后重试","body")
		}
	})
}
function warning(){
	meg("提示","功能正在升级","body")
}
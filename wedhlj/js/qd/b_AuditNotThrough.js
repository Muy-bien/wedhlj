$(document).ready(function(){
	if($.cookie("user")){
		$(".main_bg_cont span").click(function(){
			$.ajax({
				type:"post",
				url: apiUrl+"user/uploadAgain",
				dataType: 'json',
				data: {username:$.cookie("user")},
				success:function(e){
					window.location.href = "index.html"
				}
			})
		})
	}else{
		window.location.href = "index.html"
	}
})

//任务公告栏
$.ajax({
	type: 'POST',
	url: apiUrl+'/task/queryAllTask',
	dataType: 'json',
	data:{sort:2,pageNo:1,pageSize:100},
	success:function(e){
		if(e.status==200){
			if(e.taskList.length>0){
				var rw_html = "";
				for(var i=0;i<e.taskList.length;i++){
					var list = e.taskList[i];
					rw_html+='<li class="swiper-slide swiper-no-swiping blue-slide"><span>用户 '+list.contactPhone.substring(0,7)+'**** 成功预约</span><span>"'+list.takeName+'"</span></li>'
				}
				$('.Preparation_cont ul').html(rw_html);
				var height=Number(e.taskList.length>13?13:e.taskList.length)*36
				$(".Preparation_cont").css("max-height",height);
				var mySwiper = new Swiper('.Preparation_cont', {
					direction: 'vertical',
					autoplay: 3000,//可选选项，自动滑动
					autoplayDisableOnInteraction: false,
					loop: true,
					slidesPerView: 'auto',
					loopedSlides: 13,
				})
				
			}
		}
	}
})
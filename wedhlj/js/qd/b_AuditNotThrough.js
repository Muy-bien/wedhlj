$(document).ready(function(){
	if($.cookie("user")){
		$(".main_bg_cont span").click(function(){
			$.ajax({
				type:"post",
				url: apiUrl+"user/uploadAgain",
				dataType: 'json',
				data: {username:$.cookie("user")},
				success:function(e){
					console.log(e)
					window.location.href = "index.html"
				}
			})
		})
	}else{
		window.location.href = "index.html"
	}
})

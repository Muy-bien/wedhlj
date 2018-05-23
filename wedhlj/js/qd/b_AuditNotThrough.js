$(document).ready(function(){
  console.log($.cookie("login_on"))
  if ($.cookie("login_on") == "") {
    window.location.href = "index.html";
	}else{
    $(".main_bg_cont span").click(function(){
      //清除商户
      on_Loading();
      $.ajax({
        type: 'POST',
        url: apiUrl + '/user/updateUserAndDelMer',
        dataType: 'json',
        data: {
          userName: $.cookie("user"),
          token: $.cookie("login_on")
        },
        success: function(e) {
          down_Loading();
          if (e.status == 200) {
            window.location.href = "index.html";
          } else {
            meg("提示", "服务器繁忙，请稍后重试", "body");
          }
        },
        error: function() {
          down_Loading();
          meg("提示", "未能成功连接服务器，请稍后重试", "body");
        }
      });
    });
  }
});

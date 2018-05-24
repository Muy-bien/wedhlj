var state = 1;//防止多次点击
var username=$.cookie("user");//username
$(document).ready(function(){
  //导航栏默认选中
  $(".nav_li").eq(1).find("a").addClass("nav_on");
  $("input[name=username]").val(username);
})
if(!$.cookie('login_on')){
  var PreviousUrl = window.location.pathname + window.location.search + window.location.hash;
  $.cookie("PreviousUrl",PreviousUrl.split("/")[1],{ path:'/',secure:false});
  window.location.href="login.html";
}else if($.cookie('checkStatus')!=1){
  meg("提示","商户未通过审核，暂时不能发布任务！","body",turn);
  function turn(){
   window.location.href="b_MissionHall.html";
  }
}else{
  //预览图片
var str=["","","",""];
  $(".myFileUpload").change(function(e){ 
   	var file = this.files[0];
   	var i = $(this).parent(".main_file").index()
   	if (file) {
   		if (window.FileReader) {    
              var reader = new FileReader();    
              reader.readAsDataURL(file);  //将文件读取为DataURL  
              str[i]=file;
              //监听文件读取结束后事件    
            	reader.onloadend = function (e){
            		$(".show").eq(i).html("<img src='"+e.target.result+"'>")
            };    
         } 
     }else{
     		$(".show").eq(i).html("")
     }
     	
  }); 
  //点击类型
  $(".Posttask_x20").click(function(){
    $(this).addClass("Posttask_x20_on").siblings().removeClass("Posttask_x20_on")
  })
  //限制价格只能输入数字
  $("input[name=takePrice]").blur(function(){
    numberLimte($(this).val());
  })
  function numberLimte(str){
    var result=/^[0-9]*$/.test(str);
    if(!result){
      str=0;
      meg("提示","请用数字表示价格","body");
    }else{
      return;
    }
  }
  //地址
    $("select[name=county]").on("change",function(){
      $("input[name=address]").val("");
    })
  //上传
  $(".Posttask_but").click(function(){
    // 酒店详细地址
    $("input[name=hotelAddress]").val($("#s1").val()+','+$("#s2").val()+','+$("#s3").val()+','+$("input[name=address]").val());
    //确定类型
    $("input[name=takeType]").val($(".Posttask_x20_on p").html());
    //方案草图的实际上传个数
    var imgFiles=$(".show img");
    //验证任务项目
    if(!$("input[name=takeName]").val()){
      meg("提示","请填写任务名称","body");
      return false;//任务名称验证
    }else if(!$("input[name=etiquetteTime]").val()){
      meg("提示","请填写礼仪时间！","body");
      return false;//礼仪时间验证
    }else if(!$("input[name=contactName]").val()){
      meg("提示","请填写联系人姓名","body");
      return false;//联系人姓名验证
    }else if(!$("input[name=contactPhone]").val()){
      meg("提示","请输入手机号","body");
      return false;//联系人电话
    }else if(!(/^1[3|4|5|7|8]\d{9}$/.test($("input[name=contactPhone]").val()))){
      meg("提示","请输入正确的手机号","body");
      return false;//联系人电话手机号格式验证
    }else if(!$("input[name=hotelName]").val()){
      meg("提示","请填写酒店名称","body");
      return false;//验证酒店名称
    }else if(!$("input[name=address]").val()){
      meg("提示","请填写酒店详细地址","body");
      return false;//验证酒店地址
    }else if(!$("input[name=takePrice]").val()){
      meg("提示","请填写价格","body");
      return false;//验证最高价格
    }else if(!$("input[name=entranceTime]").val()){
      meg("提示","请选择入场时间","body");
      return false;//验证入场时间
    }
    // else if(!$("textarea[name=takeRequire]").val()){
    //   meg("提示","请填写入场需求","body");
    //   return false;//验证入场需求
    // }else if(!$("textarea[name=taskDesc]").val()){
    //   meg("提示","请填写方案描述","body");
    //   return false;//验证需求描述
    //  }else if(imgFiles.length<4){
    //   meg("提示","请上传4张草图","body");
    //   return false;//验证方案草图的个数
    // }
    if (state == 1){
      state = 2;
      //上传整个form标签
      var form = new FormData($('#uploadForm')[0]);
      form.append("token",$.cookie("login_on"));
      //案例图片
      for(var s=0;s<str.length;s++){
        if(str[s]){
          form.append("taskSketch",str[s]);//新图oldTaskSketch
        }
      }
      //刷新页面
      var doThing = function(){
        window.location.reload();
      }
      //跳转页面
      var hrefing = function(){
        window.location.href  = 'b_MissionHall.html'
      }
     on_Loading();
      ///task/addTask发布任务
      $.ajax({
        type: 'POST',
        url: apiUrl+'/task/addTask',
        data: form,
        processData: false,
        contentType: false,
        success: function(e) {
          down_Loading();
          if(e.status==200){
            meg("提示","任务发布成功","body",hrefing);
          }else{
             meg("提示","任务发布失败","body");
          }
        },
        error : function(e) {
          down_Loading();
          meg('提示','当前网络不畅通,请检查您的网络','body'); 
        }
      })
    }
  })
}

var state = 1;//防止多次点击
var username=$.cookie("user");//username
var takeId=getUrlParam('takeId');
var taskSketchCom//全局变量，用来保存案例图片，方便修改任务的操作
queryTask(takeId)
$(document).ready(function(){
  //导航栏默认选中
  $(".nav_li").eq(1).find("a").addClass("nav_on");
  $("input[name=username]").val(username);
})
var str=["","","",""];
if(!username){
  window.location.href="login.html";
}else{
  //预览图片
  $(".myFileUpload").change(function(e){ 
    var file = this.files[0];
    var i = $(this).parent(".main_file").index();
    str[i]=file;

    if (file) {
      if (window.FileReader) {    
              var reader = new FileReader();    
              reader.readAsDataURL(file);  //将文件读取为DataURL  
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
       // 案例图片
      for(var s=0;s<str.length;s++){
        if(str[s]){
          form.append("taskSketch",str[s]);//新图
          if(taskSketchCom[s]){
            form.append("oldTaskSketch",taskSketchCom[s]);//新图oldTaskSketch//旧图
          }
        }
      }
      form.append("taskId",takeId);
      for(var a of form){
      }
      //跳转页面
      var hrefing = function(){
        window.location.href  = 'u_PersonalCenter.html'
      }
     on_Loading();
      ///task/addTask发布任务/task/updateTask//修改任务
      $.ajax({
        type: 'POST',
        url: apiUrl+'/task/updateTask/',
        data: form,
        processData: false,
        contentType: false,
        success: function(e) {
          down_Loading();
          if(e.status==200){
            meg("提示","任务修改成功","body",hrefing);
          }else{
             meg("提示","任务修改失败","body");
          }
        },
        error : function(e) {
          down_Loading();
          meg('提示','当前网络不畅通,请检查您的网络','body',reload); 
        }
      })
    }
  })
}

///task/queryTask任务详情查询
function queryTask(taskId){
   $.ajax({
        type: 'POST',
        url: apiUrl+'/task/queryTask',
        data: {taskId:taskId},
        success: function(e) {
          var task=e.task[0];
          console.log(e);
          //任务类型
          var lip=$('.Posttask_x10 p');
          for(var j=0;j<lip.length;j++){
            if(lip[j].innerHTML==task.takeType){
              $('.Posttask_x10 li').eq(j).addClass('Posttask_x20_on');
            }
          }
          //任务名称
          $('input[name=takeName]').val(task.takeName);
          //礼仪时间
          $('input[name=etiquetteTime]').val(task.etiquetteTime);
          //联系人姓名
          $('input[name=contactName]').val(task.contactName);
          //联系人电话
          $('input[name=contactPhone]').val(task.contactPhone);
          //酒店名称
          $('input[name=hotelName]').val(task.hotelName);
          //地区
          $("#s1").val(task.hotelAddress.split(',')[0]);
          $("#s2").val(task.hotelAddress.split(',')[1]);
          $("#s3").val(task.hotelAddress.split(',')[2]);
          //详细地址
          $("input[name=address").val(task.hotelAddress.split(',')[3]);
          //价格
          $('input[name=takePrice]').val(task.takePrice);
          //入场时间
          $('input[name=entranceTime]').val(task.entranceTime);
          //入场需求
          $('textarea[name=takeRequire]').val(task.takeRequire);
          //方案描述
          $('textarea[name=taskDesc]').val(task.taskDesc);
          //方案草图
          if(task.taskSketch){
            var taskSketch=task.taskSketch.split(',');
            for(var i=0;i<taskSketch.length;i++){
             $('.main_file').eq(i).find('.show').append('<img src='+apiUrl+taskSketch[i]+'/>')
            }
          }
          taskSketchCom=task.taskSketch.split(',');//存放旧图
        },
        error : function(e) {
          meg('提示','当前网络不畅通,请检查您的网络','body'); 
        }
      })
}
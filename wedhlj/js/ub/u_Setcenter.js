$(document).ready(function(){
    status_show();
})
//防止多次点击事件
var state=1;
var blob = "";//头像图片
//获取商户信息
function Obtain_info(){
    on_Loading();
    $.ajax({
        type: 'POST',
        url: apiUrl+'/merchant/queryMerchant',
        dataType: 'json',
        data: {token:$.cookie("login_on")},
        success: function(e){
            console.log(e)
            if(e.status==200){
                var data=e.merchant
                $(".cp_name").text(data.mName);//名称
                var mAddress=data.mAddress.split(",");//地址切割
                $(".county").val(mAddress[2]);//地区
                $(".address").val(mAddress[3]);//详细地址
                $(".phone").val(data.mPhone);//商家电话
                $(".but_file").html(data.mLogo==""?'<p>(点击添加头像)</p>':'<img src="'+apiUrl+data.mLogo+'">')
                if($("textarea").hasClass("mDesc") == true){
                    $(".mDesc").val(data.mDesc);//商户简介
                }
                if($("textarea").hasClass("notice") == true){
                    $(".notice").val(data.mNotice);//店铺公告
                }
                upload();
                down_Loading();
            }else{
                down_Loading();
                meg("提示","获取商户信息失败，请稍后重试","body")
            }
        }
    })
}
//根据不同人员展示不同内容
function status_show(){
    var style = $.cookie("position");
    if(style==2||style==3){
        $(".main_left").append('<p>简介</p>');
        $("#uploadForm").append('<div class="input_textarea"><textarea name="mDesc" class="mDesc" placeholder="(输入内容不能超过200字)" maxlength="200"></textarea></div>')
    }
    if(style==3){
        $(".main_left").append('<p class="main_left_x20">店铺公告</p>');
        $("#uploadForm").append('<div class="input_textarea"><textarea name="mNotice" class="notice" placeholder="(输入内容不能超过200字)" maxlength="200"></textarea></div>')
    }
    Obtain_info();
}
//点击上传按钮
function upload(){
    $(".Upload").click(function(){
        if(state==1){
            state=2;
            if(!$(".address").val()){
                meg("提示","请填写详细地址","body");
                return false;
            }else if(!$(".phone").val()){
                meg("提示","请填写商家电话","body");
                return false;
            }
            var data = new FormData($('#uploadForm')[0]);
            data.append('mAddress',$(".province").val()+","+$(".city").val()+","+$(".county").val()+","+$(".address").val());//地址
            data.append('mLogo',blob);//头像
            data.append('token',$.cookie("login_on"));//token
            for(var p of data){
                console.log(p)
            }
            on_Loading();
            $.ajax({
                type: "post",
                url: apiUrl+"/merchant/updateMerchant",
                data: data,
                processData: false,
                contentType: false,
                success: function(e) {
                    down_Loading()
                    if (e.status == "200") {
                        meg("提示","商户信息成功","body");
                    }else{
                        meg("提示","商户信息失败","body");
                    }
                },
                error : function(e) {
                    down_Loading()
                    meg("提示","服务器开了小差，请稍后重试","body");
                }
            });
        }
    })
}
//弹出框水平垂直居中
(window.onresize = function () {
    var win_height = $(window).height();
    var win_width = $(window).width();
    if (win_width <= 768){
        $(".tailoring-content").css({
            "top": (win_height - $(".tailoring-content").outerHeight())/2,
            "left": 0
        });
    }else{
        $(".tailoring-content").css({
            "top": (win_height - $(".tailoring-content").outerHeight())/2,
            "left": (win_width - $(".tailoring-content").outerWidth())/2
        });
    }
})();
//弹出图片裁剪框
$("#replaceImg").on("click",function () {
    $(".tailoring-container").toggle();
});
//图像上传
function selectImg(file) {
    if (!file.files || !file.files[0]){
        return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        var replaceSrc = evt.target.result;
        //更换cropper的图片
        $('#tailoringImg').cropper('replace', replaceSrc,false);//默认false，适应高度，不失真
    }
    reader.readAsDataURL(file.files[0]);
}
//cropper图片裁剪
$('#tailoringImg').cropper({
    aspectRatio: 1/1,//默认比例
    preview: '.previewImg',//预览视图
    guides: true,  //裁剪框的虚线(九宫格)
    autoCropArea: 0.5,  //0-1之间的数值，定义自动剪裁区域的大小，默认0.8
    movable: false, //是否允许移动图片
    dragCrop: true,  //是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
    movable: true,  //是否允许移动剪裁框
    resizable: true,  //是否允许改变裁剪框的大小
    zoomable: false,  //是否允许缩放图片大小
    mouseWheelZoom: false,  //是否允许通过鼠标滚轮来缩放图片
    touchDragZoom: true,  //是否允许通过触摸移动来缩放图片
    rotatable: true,  //是否允许旋转图片
    crop: function(e) {
        // 输出结果数据裁剪图像。
    }
});
//旋转
$(".cropper-rotate-btn").on("click",function () {
    $('#tailoringImg').cropper("rotate", 45);
});
//复位
$(".cropper-reset-btn").on("click",function () {
    $('#tailoringImg').cropper("reset");
});
//换向
var flagX = true;
$(".cropper-scaleX-btn").on("click",function () {
    if(flagX){
        $('#tailoringImg').cropper("scaleX", -1);
        flagX = false;
    }else{
        $('#tailoringImg').cropper("scaleX", 1);
        flagX = true;
    }
    flagX != flagX;
});
//裁剪后的处理
$("#sureCut").on("click",function () {
    if ($("#tailoringImg").attr("src") == null ){
        return false;
    }else{
        var cas = $('#tailoringImg').cropper('getCroppedCanvas');//获取被裁剪后的canvas
        var base64url = cas.toDataURL('image/jpg'); //转换为base64地址形式
        $("#replaceImg").html('<img src="'+base64url+'">');//显示为图片的形式
        /*裁剪后处理里面*/
		blob = base64url;
        //关闭裁剪框
        closeTailor();
    }
});
//关闭裁剪框
function closeTailor() {
    $(".tailoring-container").toggle();
}
//导航栏默认选中
function on_navli(){
    var position = $.cookie("position");
    if(position==2){
        $(".nav_cont_a").eq(3).addClass("nav_cont_on");
    }else if(position==1||position==3){
        $(".nav_cont_a").eq(4).addClass("nav_cont_on");
    }
}
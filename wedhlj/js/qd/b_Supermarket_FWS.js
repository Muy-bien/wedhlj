$(document).ready(function(){
    //当前页面默认选中
    $(".nav_li").eq(2).find("a").addClass("nav_on")
    //获取地址栏上的值
    var id = getUrlParam('id');//商品编号
    //展示信息
    show(id);
})
//服务商信息展示
function show(id){
    $.ajax({
        type:"POST",
        url:apiUrl+"/product/queryUserByProduct",
        data:{userId:id},
        dataType:"json",
        success:function(e){
            console.log(e)
            if(e.userAndProduct != ""){
                var data = e.userAndProduct;
                $(".info_logo_box").html(data.headPhoto==""?"":'<div class="img_auto" style="background-image:url('+data.headPhoto+');"></div>');//头像
                $(".info_cont h1").text(data.companyName);//名称
                //星级
                for(var i=0;i<data.star;i++){
                    $(".info_xin").append('<i></i>');
                }
                $(".info_contact h2").text(data.userAddress);//商家所在地
            }
        }
    })
}
$(document).ready(function(){
    //当前页面默认选中
    $(".nav_li").eq(2).find("a").addClass("nav_on")
    //获取地址栏上的值
    var productNo = getUrlParam('id');//商品编号
    //展示信息
    show(productNo);
})
//服务商信息展示
function show(productNo){
    $.ajax({
        type:"POST",
        url:apiUrl+"/product/queryUserByProduct",
        data:{productNo:productNo},
        dataType:"json",
        success:function(e){
            console.log(e)
        }
    })
}
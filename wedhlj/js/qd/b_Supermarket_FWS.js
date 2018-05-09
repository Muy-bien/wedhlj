$(document).ready(function(){
    //当前页面默认选中
    $(".nav_li").eq(2).find("a").addClass("nav_on")
    //获取地址栏上的值
    var id = getUrlParam('id');//商品编号
    var type = getUrlParam('type');//类型
    //展示信息
    show(id,type);
    Recommend(type);
})
//服务商信息展示
function show(id,type){
    $.ajax({
        type:"POST",
        url:apiUrl+"/product/queryUserByProduct",
        data:{merchantId:id},
        dataType:"json",
        success:function(e){
            console.log(e)
            if(e.merchantAndProduct != ""){
                var data = e.merchantAndProduct;
                $(".info_logo_img").html(data.logo==""?"":'<img src="'+apiUrl+data.logo+'">');//头像
                $(".info_cont h1").text(data.companyName);//名称
                //星级
                for(var i=0;i<Math.floor(data.star);i++){
                    $(".info_xin").append('<i></i>');
                }
                $(".info_contact h2").text("地址："+data.address.split(",").join(""));//商家所在地
                $(".info_amt").text("公告："+data.notice);//商家所在地
                $(".main_left_01 p").text(data.desc==""?"暂无简介":data.desc);//商家简介
                //商家案例
                var str = "";
                if(data.product!=""){
                   for(var i=0;i<data.product.length;i++){
                        var list = data.product[i];
                        str+='<a href="b_Addorder.html?productNo='+list.productNo+'&type='+type+'">'+
                            '<div>'+
                                '<div>'+
                                    '<div class="img_auto" style="background-image:url('+apiUrl+list.productImage.split(",")[0]+')"></div>'+
                                    '<div class="main_left03_text">'+
                                        '<h1>【'+list.productType+'】'+list.productName+'</h1>'+
                                        '<p>'+(list.discountPrice=="0.0"?'￥'+list.productPrice:'￥'+list.discountPrice+'<span>￥'+list.productPrice+'</span>')+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'
                    } 
                }else{
                    str="当前暂无商品";
                }
                $(".main_left03").html(str);
                //查看更多
                $(".main_left03_but").on("click",function(){
                    window.location.href = "b_Pshowcase.html?id="+id;
                })
            }
        }
    })
}
//推荐商品
function Recommend(type){
    $.ajax({
        type: 'POST',
        url: apiUrl+'/product/queryTuiJProduct',
        data: {type:type},
        dataType: 'json',
        success:function(e){
            var str = "";
            if(e.productList != ""){
                for(var i=0;i<e.productList.length;i++){
                    var data = e.productList[i];
                    str+='<div>'+
                        '<a href="b_Addorder.html?productNo='+data.productNo+'&type='+type+'">'+
                            '<div class="main_rcont_x10"><div class="img_auto" style="background-image:url('+apiUrl+data.productImage.split(",")[0]+')"></div></div>'+
                            '<div class="main_rcont_x20">'+
                                '<h1>【'+data.productName+'】'+data.productDesc+'</h1>'+
                                '<div class="main_rcont_x30">'+(data.discountPrice=="0.0"?'<p class="main_rcont_x40">￥<span>'+data.productPrice+'</span></p>':'<p class="main_rcont_x40">￥<span>'+data.discountPrice+'</span></p><p class="main_rcont_x50">原价￥<span>'+data.productPrice+'</span></p>')+'</div>'+
                            '</div>'+
                        '</a>'+
                    '</div>'
                }
            }else{
                str = "未查询到相关信息"        
            }
            $(".main_right_cont").html(str);
        }
    })
}
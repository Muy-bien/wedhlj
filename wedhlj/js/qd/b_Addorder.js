$(document).ready(function(){
    //on_Loading();
    $(".nav_li").eq(2).find("a").addClass("nav_on");
    //接收URL中的参数spid
    var productNo = getUrlParam('productNo');
    var type = getUrlParam('type');
    if(!productNo||!type){
        window.location.href = "b_Supermarket_WM.html";
    }
    show(productNo,type);
})
//获取商品信息
//productNo==>商品编号
//type==>商品类型
function show(productNo,type){
    $.ajax({
        type: 'POST',
        url: apiUrl+"/product/queryProduct",
        dataType: 'json',
        data: {productNo:productNo},
        success:function(e){
            console.log(e);
            var data = e.product[0];
            //商品图片
            var pimage = data.productImage.split(",");
            var str = "";
            for(var i=0;i<pimage.length;i++){
                str +='<li><img src="'+apiUrl+pimage[i]+'"></li>'
            }
            $(".show_sale_list").html(str);
            //默认选中
            $(".target_pic").html('<img src="'+apiUrl+pimage[0]+'">');
            $(".show_sale_list>li:first-child").addClass("show_img_style");
            //点击其他图片时的样式切换
            $(".show_sale_list>li img").click(function(e){
                var src=$(this).attr("src");
                $("div.target_pic img").attr("src",src);
                $(this).parent().addClass("show_img_style");
                $(this).parent().siblings().removeClass("show_img_style");
            });
            //星级
            for(var i=0;i<e.star;i++){
                $(".show_sale_part2_right_star").append('<img src="images/b_Supermarket_FWS/star.png">')
            }
            $(".show_sale_part2_tit").text(data.productName);//商品名称
            $(".show_sale_part2_intru").text(data.productDesc);//商品描述
            //价格
            $(".show_sale_part2_price").html('<span><span>￥</span>'+(data.discountPrice=="0.0"?data.productPrice+'</span>':data.discountPrice+'</span> <span>市场价</span><span>￥'+data.productPrice+'</span>'));
            //库存,销量
            $(".show_sale_part2_right_sale").html('<span>库存：'+data.productNumber+' 件</span><span>销量：'+data.sellNumber+'</span>');
            //商品简介
            var productSize = data.productSize.split(",");
            $(".shop_type").html('商品种类：'+type+'<br>商品尺寸：长：'+productSize[0]+'cm  宽：'+productSize[1]+'cm  高：'+productSize[2]+'cm<br>商品颜色：'+data.productProperty)
            //商品描述
            $(".shop_detail").text(data.productDesc);          
            calcNumber(Number(data.productNumber));
            down_Loading();
        },
        error:function(){
            down_Loading();
            meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
}
//点击添加商品
function addCommodity(id){
    //添加商品
    $(".submit_sho").click(function(){
        if(!$.cookie("login_on")){
            function dothing(){
                window.open("login.html");
            }
            meg("提示","请先登录","body",dothing);
            return false;
        }else if($(".show_num").val() < 1){
            meg("提示","商品数量不能小于1","body");
            return false;
        }
        on_Loading();
        var data = {
            pid:id,
            num:$(".show_num").val(),
            username:$.cookie("user"),
        }
        $.ajax({
            type:"post",
            url: apiUrl+'cart/add',
            dataType: 'json',
            data: data,
            success:function(e){
                function dothing(){
                    window.open("b_Pshowcase.html?fwsid="+fwsid)
                }
                down_Loading();
                meg("提示","添加成功","body",dothing);
            },
            error:function(){
                down_Loading();
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        })
    });
}

/*限时特惠部分*/
/*显示特惠展示图片*/
// 商品数量加减以及数量输入框的值输入标准判断
//storage==>库存
function calcNumber(storage){
    //商品数量加减
    $(".show_sale_part2_num>button").click(function(e){
        var inputNumber=Number($(".show_sale_part2_num>input").val());
        if($(this).html()=="+"&&inputNumber<storage){
            inputNumber++;
        }else if($(this).html()=="—"&&inputNumber>1){
            inputNumber--;
        }
        $(".show_sale_part2_num>input").val(inputNumber);
    })
    // 数量输入框的值输入标准判断
    $(".show_sale_part2_num>input").change(function(e){
        var myInput=Number($(this).val());
        if(isNaN(myInput)||myInput<1||!myInput){
            $(this).val(1);
        }else if(myInput>storage){
            $(this).val(storage);
        }
    })
}

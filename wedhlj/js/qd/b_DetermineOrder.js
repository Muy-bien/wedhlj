$(document).ready(function(){
    if(!$.cookie("login_on")){
        window.location.href="login.html"
        return false;
    }else if($.cookie("position")==0 || !$.cookie("position")){
        window.location.href="b_Pshowcase.html?id="+id+"&type="+type;
        return false;
    }
	$(".nav").html('<i class="nav_border"></i>'+
		'<i class="nav_border_x10"></i>'+
		'<div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p>缴纳保证金</p><p>等待卖家确认</p><p>缴纳尾款</p><p>等待确认收款</p><p>退还保证金</p><p>完成</p></div>'
	);
	$(".address_ul li").click(function(){
		$(this).addClass('address_on').siblings('').removeClass('address_on');
		$(".DOrder_right_cont").eq(2).find('span').text($(this).text());
	});
	ShoppingCart();
})
var id = getUrlParam('mid');//商户id
var type = getUrlParam('type');//商家类型
//获取最新商品清单信息
function ShoppingCart(){
    on_Loading();
    $.ajax({
        type: 'post',
        url: apiUrl+"/cart/queryCart",
        dataType: 'json',
        data:{token:$.cookie("login_on")},
        success:function(e){
            if(e.status==200){
                var str = "";
                var Total = "";//总价
                var Total_num = "";//总数
                if(e.merchantAndProductList!=""){
                    for(var i=0;i<e.merchantAndProductList.length;i++){
                        for(var p=0;p<e.merchantAndProductList[i].product.length;p++){
                            var list = e.merchantAndProductList[i].product[p];
                            //价钱
                            var moeny = (list.discountPrice=="0.0"?Number(list.productPrice)*Number(list.productNum):Number(list.discountPrice)*Number(list.productNum));
                            str +='<li>'+
                                '<div class="main03_cont_x10">'+
                                    '<img src="'+apiUrl+list.productImg.split(',')[0]+'">'+
                                    '<div class="main03_cont_user">'+
                                        '<p class="main03_user_x10">'+list.productName+'</p>'+
                                        '<p class="main03_user_x20">'+
                                            '<span>库存：'+list.productNumber+'</span>'+
                                            '<span>售价：￥'+(list.discountPrice=="0.0"?list.productPrice:list.discountPrice)+'</span>'+
                                        '</p>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="main03_cont_x20">'+
                                    '<div class="main03_cont_x30">'+list.productNum+'</div>'+
                                    '<div class="main03_cont_x40">￥'+moeny+'</div>'+
                                '</div>'+
                            '</li>';
                            Total = Number(Total)+Number(moeny);
                        }   
                        Total_num = Number(Total_num)+Number(e.merchantAndProductList[i].product.length);
                    }
                    $(".main03_cont").html(str);
                    $(".main04_x10 span").html(Total_num);
                    $(".main04_x20 span").html("￥"+Total);
                    Transaction((Total*0.15).toFixed(2),Total,e.cartId)//确认交易
                }else{
                    window.location.href="b_Pshowcase.html?id="+id+"&type="+type;
                }   
            }else{
                window.location.href="b_Pshowcase.html?id="+id+"&type="+type;
            }
            down_Loading();
        },
        error:function(){
            down_Loading();
            window.location.href="b_Pshowcase.html?id="+id+"&type="+type;
        }
    })
} 

//确认交易
//orderCash==>>押金
//amount==>>订单总金额
//cartId==>>购物车ID
var state = 1;//防止多次点击
function Transaction(orderCash,amount,cartId){
    $(".main04_but").click(function(){
        if(state == 1){
            state=2;
            if($.cookie("login_on")){
                //地址选择
                var userName = $(".userName").val();//姓名
                var address_x10 = $(".address_x10").html();//省
                var address_x20 = $(".address_x20").html();//市
                var address_x30 = $(".address_x30").html();//区
                var address_x40 = $(".address_x40").val();//详细地址
                var ceremonyTime = $(".ceremonyTime").val();//礼仪时间
                var hotelName = $(".hotelName").val();//酒店名称
                var newName = $(".newName").val();//新人姓名
                var phone = $(".phone").val();//联系电话
                //使用时期
                var startTime = $(".startTime").val();//开始使用日期
                var endTime = $(".endTime").val();//结束使用日期
                var remarks = $(".remarks").val();//备注
                if(!userName){
                    meg("提示","收件人不能为空","body");
                    return false;
                }else if(!ceremonyTime){
                    meg("提示","礼仪时间不能为空","body");
                    return false;
                }else if(!hotelName){
                    meg("提示","酒店名称不能为空","body");
                    return false;
                }else if(!newName){
                    meg("提示","新人姓名不能为空","body");
                    return false;
                }else if(!address_x40){
                    meg("提示","详细地址不能为空","body");
                    return false;
                }else if(!phone){
                    meg("提示","手机号码不能为空","body");
                    return false;
                }else if(!startTime){
                    meg("提示","开始使用日期不能为空","body");
                    return false;
                }else if(!endTime){
                    meg("提示","结束使用日期不能为空","body");
                    return false;
                }
                var map = new BMap.Map("container");
                var localSearch = new BMap.LocalSearch(map);
                var keyword = address_x10+address_x20+address_x30+address_x40;
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    var poi = searchResult.getPoi(0)
                    var location = poi.point.lng+","+poi.point.lat; //获取经度和纬度
                    map_ajax(location);
                });
                localSearch.search(keyword);
                function map_ajax(location){
                    on_Loading();
                    var data = {
                        token:$.cookie("login_on"),
                        userName:userName,
                        hotelName:hotelName,
                        ceremonyTime:ceremonyTime,
                        newName:newName,
                        useAddress:keyword,
                        phone:phone,
                        startTime:startTime,
                        endTime:endTime,
                        remarks:remarks,
                        toLocation:location,
                        orderCash:orderCash,
                        amount:amount,
                        cartId:cartId
                    }
                    $.ajax({
                        type: 'post',
                        url: apiUrl+"/ProductOrder/addProductOrderInfo",
                        dataType: 'json',
                        data:data,
                        success:function(e){
                            down_Loading();
                            if(e.status == "200"){
                                PayDeposit(orderCash,e.orderNo,e.orderName);
                            }else{
                                meg("提示","服务器开了小差，请稍后重试","body");
                            }
                            state=1;
                        },
                        error:function(){
                            down_Loading();
                            state=1;
                            meg("提示","服务器开了小差，请稍后重试","body");
                        }
                    })
                }
            }else{
                window.location.reload();
            }
        }
    })
}
//打开缴纳保证金窗口
//WIDout_trade_no==>>商户订单号
//WIDsubject==>>订单名称
//orderCash==>>付款金额
//WIDbody==>>商品描述
function PayDeposit(orderCash,WIDout_trade_no,WIDsubject){
    $(".box").append('<div class="deposit">'+
        '<div class="deposit_cont">'+
            '<div class="deposit_title">缴纳押金<span onclick="Close_PayDeposit()"></span></div>'+
            '<div class="deposit_info">'+
                '<p class="deposit_info_x20">需支付保证金<em>￥</em><span>'+orderCash+'</span>元</p>'+
                '<button class="deposit_but">确认支付</button>'+
            '</div>'+
            '<div class="deposit_footer">'+
                '<p>为什么要交保证金？</p>'+
                '<p class="deposit_footer_on">押金缴纳旨在保障服务质量，减少服务失信行为。共同构建良好的婚嫁行业交易环境！</p>'+
                '<p>押金何时可退？</p>'+
                '<p class="deposit_footer_on">押金缴纳为双向押金缴纳，由第三方平台托管。订单完成后可随时退款，即时到帐。</p>'+
                '<p>押金计算方式。</p>'+
                '<p class="deposit_footer_on">押金缴纳金额按每笔订单金额的15%缴纳。</p>'+
            '</div>'+
        '</div>'+
    '</div>')
    //婚礼匠网站商品租赁服务保证金缴纳
    $(".deposit_but").click(function(){
        if(state==1){
            state=2
            $.ajax({
                type: 'post',
                url: apiUrl+"/pay/aliPay",
                dataType: 'text',
                data:{
                    WIDout_trade_no:WIDout_trade_no,
                    WIDsubject:WIDsubject,
                    WIDtotal_amount:orderCash,
                    WIDbody:"婚礼匠网站商品租赁服务保证金缴纳"
                },
                success:function(e){
                    $("body").html(e);
                },
                error:function(){
                    state=1;
                    meg("提示","服务器开了小差，请稍后重试","body");
                }
            })
        } 
    })
}

//关闭缴纳押金窗口
function Close_PayDeposit(){
    meg2("提示","是否确认放弃支付订单<br>放弃后可在后台订单继续支付","body",dothing);
    function dothing(){
        window.location.href="b_Pshowcase.html?id="+id+"&type="+type;
    }
}
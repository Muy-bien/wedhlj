$(document).ready(function(){
	$(".nav").html('<i class="nav_border"></i>'+
		'<i class="nav_border_x10"></i>'+
		'<div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p>等待卖家确认</p><p>缴纳尾款</p><p>等待确认收款</p><p>退还保证金</p><p>完成</p></div>'
	);
	//获取url中的参数
    function getUrlParam(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);//匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    //接收URL中的参数spid
    var id = getUrlParam('oId');
    $.ajax({
    	type: 'post',
        url: apiUrl+"order/selectOrderById",
        dataType: 'json',
        data:{orderId:id},
        success:function(e){
            //验证是否为当前用户
        	if(e.order.oUserinfo == $.cookie("user")){
                var order = e.order
                var number_x10 = "0";
                var number_x20 = "0";
                var number_x30 = "0";
                //展示等待确认，已接单商家
                if(order.list != null){
                    var ToBeConfirmed = "";//待确认
                    var Receipt = "";//已确认
                    for(var i=0;i<order.list.length;i++){
                        var list = order.list[i];
                        if(list.toStatus == "待确认"){
                            ToBeConfirmed+='<div class="main_commodity_minbox">'+
                                '<div class="main_title_box"><a href="b_Pshowcase.html?fwsid='+list.list[0].mId+'" target="_blank"><p>'+list.list[0].mName+'</p></a><i></i></div>'+
                                '<div class="main_commodity_cont_x10"><ul class="main_commodity_cont">';
                                for(var o=0;o<list.list[0].list.length;o++){
                                    var list_o = list.list[0].list[o];
                                    if(list_o.discountPrice == "-1"){
                                        var moeny = Number(list_o.productNum)*Number(list_o.price)
                                    }else{
                                        var moeny = Number(list_o.productNum)*Number(list_o.discountPrice)
                                    }
                                    ToBeConfirmed+='<li>'+
                                        '<div class="main_commodity_x10">'+
                                            '<img src="'+list_o.pimage.split(',')[0]+'">'+
                                            '<p><a href="b_Addorder.html?spid='+list_o.pid+'" target="_blank">'+list_o.pname+'</a></p>'+
                                        '</div>'+
                                        '<div class="main_commodity_x20">'+
                                            '<p>'+list_o.productNum+'</p>'+
                                            '<p>￥'+moeny+'</p>'+
                                        '</div>'+
                                    '</li>'
                                };
                                ToBeConfirmed+= '</ul></div></div>';
                                number_x10 = Number(number_x10)+Number(list.list[0].list.length);//商品数量
                        }else{
                            Receipt+='<div class="main_commodity_minbox">'+
                                '<div class="main_title_box"><a href="b_Pshowcase.html?fwsid='+list.list[0].mId+'" target="_blank"><p>'+list.list[0].mName+'</p></a><i></i></div>'+
                                '<div class="main_commodity_cont_x10"><ul class="main_commodity_cont">';
                                for(var o=0;o<list.list[0].list.length;o++){
                                    var list_o = list.list[0].list[o];
                                    if(list_o.discountPrice == "-1"){
                                        var moeny = Number(list_o.productNum)*Number(list_o.price)
                                    }else{
                                        var moeny = Number(list_o.productNum)*Number(list_o.discountPrice)
                                    }
                                    Receipt+='<li>'+
                                        '<div class="main_commodity_x10">'+
                                            '<img src="'+list_o.pimage.split(',')[0]+'">'+
                                            '<p><a href="b_Addorder.html?spid='+list_o.pid+'" target="_blank">'+list_o.pname+'</a></p>'+
                                        '</div>'+
                                        '<div class="main_commodity_x20">'+
                                            '<p>'+list_o.productNum+'</p>'+
                                            '<p>￥'+moeny+'</p>'+
                                        '</div>'+
                                    '</li>'
                                };
                                Receipt+= '</ul></div></div>';
                                number_x20 = Number(number_x20)+Number(list.list[0].list.length);//商品数量
                        }
                    }

                    //验证是否有待确定商家
                    if(ToBeConfirmed == ""){
                        $(".main_box_x10").css("display","none");
                    }else{
                        $(".main_commodity_box01").html(ToBeConfirmed);
                    } 
                    //验证是否有已接单商家
                    if(Receipt == ""){
                        $(".main_box_x20").css("display","none");
                    }else{
                        $(".main_commodity_box02").html(Receipt);
                    }                 
                }
                //展示已放弃订单商家
                if(order.list1 != null){
                    var HaveBeenCancelled = "";
                    for(var i=0;i<order.list1.length;i++){
                        HaveBeenCancelled+='<div class="main_commodity_minbox">'+
                        '<div class="main_title_box"><a href="b_Pshowcase.html?fwsid='+order.list1[i].list[0].mId+'" target="_blank"><p>'+order.list1[i].list[0].mName+'</p></a><i></i></div>'+
                        '<div class="main_commodity_cont_x10"><ul class="main_commodity_cont">';
                        for(var o=0;o<order.list1[i].list[0].list.length;o++){
                            var list_o = order.list1[i].list[0].list[o];
                            if(list_o.discountPrice == "-1"){
                                var moeny = Number(list_o.productNum)*Number(list_o.price)
                            }else{
                                var moeny = Number(list_o.productNum)*Number(list_o.discountPrice)
                            }
                            HaveBeenCancelled+='<li>'+
                                '<div class="main_commodity_x10">'+
                                    '<img src="'+list_o.pimage.split(',')[0]+'">'+
                                    '<p><a href="b_Addorder.html?spid='+list_o.pid+'" target="_blank">'+list_o.pname+'</a></p>'+
                                '</div>'+
                                '<div class="main_commodity_x20">'+
                                    '<p>'+list_o.productNum+'</p>'+
                                    '<p>￥'+moeny+'</p>'+
                                '</div>'+
                            '</li>'
                        };
                        HaveBeenCancelled+= '</ul></div></div>';
                        number_x30 = Number(number_x30)+Number(order.list1[i].list[0].list.length);//商品数量
                    }
                    $(".main_commodity_box03").html(HaveBeenCancelled);
                }else{
                    $(".main_box_x30").css("display","none");
                }
                var order_number = Number(number_x10)+Number(number_x20)+Number(number_x30);//商品数量
                zoom();
                if(order.oStatus == "待支付"){
                    var ordercash = "未支付";
                }else{
                    var ordercash = "已支付";
                }
                $(".main_Order_left").html('<p>订单号：'+order.oOrderid+'</p><p>商品数量：'+order_number+'</p><p>商品总金额：'+order.oAmount+'元</p><p>需缴纳保证金：'+Math.round(Number(order.oAmount)*0.15)+'元</p><p>是否缴纳保证金：'+ordercash+'</p><p>订单状态：'+order.oStatus+'</p>');
                $(".main_Order_right").html('<p>收件人：'+order.oUsername+'</p><p>收货地址：'+order.useaddress.split(',').join('')+'</p><p>联系电话：'+order.oPhone+'</p><p>交易开始日期：'+order.starttime+'</p><p>交易结束日期：'+order.endtime+'</p><p>备注：'+order.remarks+'</p>');
                //当前状态展示不同的样式
                if(order.oStatus == "待支付"){
                    //nav样式
                    $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10"></i><div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p>等待卖家确认</p><p>缴纳尾款</p><p>等待确认收款</p><p>退还保证金</p><p>完成</p></div>');
                    $(".main_Order_btn").html('<button class="btn_x10 color_x10">缴纳保证金</button>');
                    GoToPayDeposit(order.oOrderid);
                }else if(order.oStatus == "已支付"){
                    //nav样式
                    $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:400px"></i><div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">等待卖家确认</p><p>缴纳尾款</p><p>等待确认收款</p><p>退还保证金</p><p>完成</p></div>');
                }else if(order.oStatus == "交易进行中"){
                    //nav样式
                    $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:520px"></i><div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">等待卖家确认</p><p class="nav_cont_x10">缴纳尾款</p><p>等待确认收款</p><p>退还保证金</p><p>完成</p></div>');
                    $(".main_Order_btn").html('<button class="btn_x10 color_x10">线上支付</button><button class="btn_x10 color_x10">线下支付</button>');
                    OnlinePayment(order.oOrderid);
                }else if(order.oStatus == "尾款已缴纳"){
                    //nav样式
                    $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:660px"></i><div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">等待卖家确认</p><p class="nav_cont_x10">缴纳尾款</p><p class="nav_cont_x10">等待确认收款</p><p>退还保证金</p><p>完成</p></div>');
                }else if(order.oStatus == "退还保证金"){
                    //nav样式
                    $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:790px"></i><div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">等待卖家确认</p><p class="nav_cont_x10">缴纳尾款</p><p class="nav_cont_x10">等待确认收款</p><p class="nav_cont_x10">退还保证金</p><p>完成</p></div>');
                    $(".main_Order_btn").html('<button class="btn_x10 color_x10">退还保证金</button>');
                    RefundableDeposit(id)
                }else if(order.oStatus == "完成"){
                    //nav样式
                    $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:880px"></i><div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">等待卖家确认</p><p class="nav_cont_x10">缴纳尾款</p><p class="nav_cont_x10">等待确认收款</p><p class="nav_cont_x10">退还保证金</p><p class="nav_cont_x10">完成</p></div>');
                }
            }else{
                window.location.href == "h_MerchantCenter.html"
            }
        },
        error:function(){
        	meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
})
var state = 1;
//缩放
function zoom(){
    $(".main_title_box i").click(function(){
        if($(this).parent(".main_title_box").hasClass("main_title_on")){
            $(this).parent(".main_title_box").removeClass('main_title_on');
            $(this).parent(".main_title_box").siblings(".main_commodity_cont_x10").css({'height':'0px'});
        }else{
            var height_info = $(this).parent(".main_title_box").siblings(".main_commodity_cont_x10").find(".main_commodity_cont").height();
            $(this).parent(".main_title_box").addClass('main_title_on');
            $(this).parent(".main_title_box").siblings(".main_commodity_cont_x10").css({'height':height_info+'px'});
        }
    })
}
//点击缴纳保证金按钮
function GoToPayDeposit(id){
    //确认交易
    $(".btn_x10").click(function(){
        if($.cookie("user")){
            $.ajax({
                type: 'post',
                url: apiUrl+"order/selectAmountByRelease",
                dataType: 'json',
                data: {orderId:id},
                success:function(e){
                    $(".deposit").css("display","block");
                    if(e.Amount > 0){
                        on_deposit(id);
                    }else if(e.Amount <= 0){
                        off_deposit(id);
                        $(".deposit_but").text("确认订单");
                    }
                    $(".deposit_info_x10 span").html("￥"+e.Deposit);
                    $(".deposit_info_x20 span").html(e.Amount);
                    //关闭缴纳押金窗口
                    $(".deposit_title span").click(function(){
                        $(".deposit").css("display","none")
                        $(".deposit_but").unbind();
                        state = 1;
                    })
                },
                error:function(){
                    meg("提示","服务器开了小差，请稍后重试","body");
                }
            })
        }else{
            window.location.reload();
        }
    })
}
//保证金不够
function on_deposit(id){
    $(".deposit_but").click(function(){
        if(state == 1){
            state = 2;
            if($.cookie("user")){
                $.ajax({
                    type: 'post',
                    url: apiUrl+"order/continuePay",
                    dataType: 'json',
                    data:{username:$.cookie("user"),orderId:id},
                    success:function(e){
                        if(e.status == "100"){
                            window.location.href = "/payIndex"
                        }else if(e.status == "400"){
                            meg("提示","服务器开了小差，请稍后重试","body");
                        }
                    },
                    error:function(){
                        meg("提示","服务器开了小差，请稍后重试","body");
                    }
                })
            }else{
                window.location.reload();
            }
        }
    })
}
//保证金够
function off_deposit(id){
    $(".deposit_but").click(function(){
        if(state == 1){
            state = 2;
            if($.cookie("user")){
                $.ajax({
                    type: 'post',
                    url: apiUrl+"order/skipProductOrderPay",
                    dataType: 'json',
                    data:{orderId:id},
                    success:function(e){
                        window.location.reload();
                    },
                    error:function(){
                        meg("提示","服务器开了小差，请稍后重试","body");
                    }
                })
            }else{
                window.location.reload();
            }
        }
    })
}
//支付尾款
function OnlinePayment(id){
    //确认交易
    $(".btn_x10").click(function(){
        if($.cookie("user")){
            if($(this).text()=="线上支付"){
                $.ajax({
                    type: 'post',
                    url: apiUrl+"order/productFinalAmount",
                    dataType: 'json',
                    data: {orderId:id},
                    success:function(e){
                        $(".Retainage").css("display","block");
                        $(".Retainage_info_x20 span").html(e.amount);
                        on_OnlinePayment(id);
                        //关闭支付尾款
                        $(".Retainage_title span").click(function(){
                            $(".Retainage").css("display","none")
                            $(".Retainage_but").unbind();
                        })
                    },
                    error:function(){
                        meg("提示","服务器开了小差，请稍后重试","body");
                    }
                })
            }else if($(this).text()=="线下支付"){
                meg2("提示","是否确定为线下支付","body",UnderLinePayment)
                function UnderLinePayment(){
                    $.ajax({
                        type: 'post',
                        url: apiUrl+"order/offlineProductFinal",
                        dataType: 'json',
                        data: {orderId:id},
                        success:function(e){
                            window.location.reload();
                        },
                        error:function(){
                            meg("提示","服务器开了小差，请稍后重试","body");
                        }
                    })
                }
            }       
        }else{
            window.location.reload();
        }
    })
}
//去支付
function on_OnlinePayment(id){
    $(".Retainage_but").click(function(){
        $.ajax({
            type: 'post',
            url: apiUrl+"order/productFinalPayment",
            dataType: 'json',
            data: {orderId:id,username:$.cookie("user")},
            success:function(e){
                if(e.status==200){
                    window.location.href = "/payIndex"
                }else if(e.status==400){
                    meg("提示","服务器开了小差，请稍后重试","body");
                }
            },
            error:function(){
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        })
    })
}

//退还保证金
function RefundableDeposit(id){
    $(".btn_x10").click(function(){
        if(state == 1){
            state = 2;
            meg2("提示","是否确认退还保证金","body",RefundableDeposit_x10);
            function RefundableDeposit_x10(){
                $.ajax({
                    type: 'post',
                    url: apiUrl+"order/orderRefund",
                    dataType: 'json',
                    data:{orderId:id},
                    success:function(e){
                        if(e.status==200){
                            window.location.href = "/payIndex"
                        }else if(e.status==400){
                            meg("提示","服务器开了小差，请稍后重试","body");
                        }
                    },
                    error:function(){
                        meg("提示","服务器开了小差，请稍后重试","body");
                    }
                })
            }
        }
    })
}
$(document).ready(function(){
	$(".nav").html('<i class="nav_border"></i>'+
		'<i class="nav_border_x10"></i>'+
		'<div class="nav_cont"><p class="nav_cont_x10">确认订单</p><p>缴纳保证金</p><p>交易进行中</p><p>确认尾款</p><p>退还保证金</p><p>交易完成</p></div>'
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
        url: apiUrl+"order/selectAcceptOrder",
        dataType: 'json',
        data:{orderId:id},
        success:function(e){
        	if(e.productorder != null){
                //订单详情
                var order = e.productorder;
                //验证订单是否为当前用户
                if(order.toUserinfo == $.cookie("user")){
                   //商品详情
                    var orderHTML = "";
                    for(var i=0;i<e.productorder.list.length;i++){
                        var list = e.productorder.list[i];
                        if(list.discountPrice == "-1"){
                            var moeny = Number(list.productNum)*Number(list.price)
                        }else{
                            var moeny = Number(list.productNum)*Number(list.discountPrice)
                        }
                        orderHTML+='<li>'+
                            '<div class="main_commodity_x10">'+
                                '<img src="'+list.pimage.split(',')[0]+'">'+
                                '<p><a href="b_Addorder.html?spid='+list.pid+'" target="_blank">'+list.pname+'</a></p>'+
                            '</div>'+
                            '<div class="main_commodity_x20">'+
                                '<p>'+list.productNum+'</p>'+
                                '<p>￥'+moeny+'</p>'+
                            '</div>'+
                        '</li>'
                        //数量
                        var Total_num = i+1;
                    }
                    $(".main_commodity_cont").html(orderHTML);
                    //判断是否缴纳保证金
                    if(order.toStatus == "待确认" || order.toStatus == "待支付"){
                        var ordercash = "待支付";
                    }else if(order.toStatus == "已取消"){
                        var ordercash = "订单已取消";
                    }else{
                        var ordercash = "已支付";
                    }
                    $(".main_Order_left").html('<p>订单号：'+order.toOrderid+'</p><p>商品数量：'+Total_num+'</p><p>商品总金额：'+order.toAmount+'元</p><p>需缴纳保证金：'+Math.round(Number(order.toAmount)*0.15)+'元</p><p>是否缴纳保证金：'+ordercash+'</p><p>订单状态：'+order.toStatus+'</p>');
                    $(".main_Order_right").html('<p>收件人：'+order.toUsername+'</p><p>收货地址：'+order.useaddress.split(',').join('')+'</p><p>联系电话：'+order.toPhone+'</p><p>交易开始日期：'+order.createtime+'</p><p>交易结束日期：'+order.updatetime+'</p><p>备注：'+order.remarks+'</p>');
                    //当前状态展示不同的样式
                    if(order.toStatus == "待确认"){
                        //nav样式
                        $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10"></i><div class="nav_cont"><p class="nav_cont_x10">确认订单</p><p>缴纳保证金</p><p>交易进行中</p><p>确认尾款</p><p>退还保证金</p><p>交易完成</p></div>'
                        );
                        $(".main_Order_btn").html('<button class="btn_x10 color_x10">确认接收订单</button><button class="btn_x10">放弃接收订单</button>');
                        WhetherToAnswerTheBill(order.toOrderid)
                    }else if(order.toStatus == "已取消"){
                        //nav样式
                        $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:115px"></i><div class="nav_cont"><p class="nav_cont_x10">订单已取消</p></div>'
                        );
                    }else if(order.toStatus == "待支付"){
                        //nav样式
                        $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:250px"></i><div class="nav_cont"><p class="nav_cont_x10">确认订单</p><p class="nav_cont_x10">缴纳保证金</p><p>交易进行中</p><p>确认尾款</p><p>退还保证金</p><p>交易完成</p></div>'
                        );
                        $(".main_Order_btn").html('<button class="btn_x10 color_x10">前往缴纳保证金</button>');
                        GoToPayDeposit(id);
                    }else if(order.toStatus == "已支付"){
                        //nav样式
                        $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:390px"></i><div class="nav_cont"><p class="nav_cont_x10">确认订单</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">交易进行中</p><p>确认尾款</p><p>退还保证金</p><p>交易完成</p></div>'
                        );
                    }else if(order.toStatus == "尾款确认中"){
                        //nav样式
                        $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:520px"></i><div class="nav_cont"><p class="nav_cont_x10">确认订单</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">交易进行中</p><p class="nav_cont_x10">确认尾款</p><p>退还保证金</p><p>交易完成</p></div>'
                        );
                        $(".main_Order_btn").html('<button class="btn_x10 color_x10">确认已收款</button>');
                        ConfirmationOfTheTail(id);
                    }else if(order.toStatus == "退还保证金"){
                        //nav样式
                        $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:660px"></i><div class="nav_cont"><p class="nav_cont_x10">确认订单</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">交易进行中</p><p class="nav_cont_x10">确认尾款</p><p class="nav_cont_x10">退还保证金</p><p>交易完成</p></div>'
                        );
                        $(".main_Order_btn").html('<button class="btn_x10 color_x10">退还保证金</button>');
                        RefundableDeposit(id);
                    }else if(order.toStatus == "完成"){
                        //nav样式
                        $(".nav").html('<i class="nav_border"></i><i class="nav_border_x10" style="width:790px"></i><div class="nav_cont"><p class="nav_cont_x10">确认订单</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">交易进行中</p><p class="nav_cont_x10">确认尾款</p><p class="nav_cont_x10">退还保证金</p><p class="nav_cont_x10">交易完成</p></div>'
                        );
                    }
                }else{
                    window.location.href == "h_MerchantCenter.html"
                }     
            }
        },
        error:function(){
        	meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
})
var state = 1;//防止多次点击
//点击接单按钮
function WhetherToAnswerTheBill(id,status){
    $(".btn_x10").click(function(){
        if(state == 1){
            state = 2;
            var this_text = $(this).text();
            if(this_text == "确认接收订单"){
                var status = "1";
                meg2("提示","是否确认接收订单","body",WhetherToAnswerTheBill_x10);
            }else if(this_text == "放弃接收订单"){
                var status = "0";
                meg2("提示","亲，真的要放弃订单吗","body",WhetherToAnswerTheBill_x10);
            }
            function WhetherToAnswerTheBill_x10(){
                $.ajax({
                    type: 'post',
                    url: apiUrl+"order/confirmAcceptOrder",
                    dataType: 'json',
                    data:{orderId:id,status:status},
                    success:function(e){
                        location.reload();
                    },
                    error:function(){
                        meg("提示","服务器开了小差，请稍后重试","body");
                    }
                })
            }
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
                url: apiUrl+"order/selectAmountByAccept",
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
//确认尾款
function ConfirmationOfTheTail(id){
    $(".btn_x10").click(function(){
        if(state == 1){
            state = 2;
            meg2("提示","是否确认已收款","body",ConfirmationOfTheTail_x10);
            function ConfirmationOfTheTail_x10(){
                $.ajax({
                    type: 'post',
                    url: apiUrl+"order/confirmFinalPayment",
                    dataType: 'json',
                    data:{orderId:id},
                    success:function(e){
                        location.reload();
                    },
                    error:function(){
                        meg("提示","服务器开了小差，请稍后重试","body");
                    }
                })
            }
        }
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
                    url: apiUrl+"order/productOrderRefund",
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
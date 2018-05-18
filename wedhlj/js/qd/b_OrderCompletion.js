$(document).ready(function(){
	$(".nav").html('<i class="nav_border"></i>'+
		'<i class="nav_border_x10"></i>'+
		'<div class="nav_cont"><p class="nav_cont_x10">确定订单信息</p><p class="nav_cont_x10">缴纳保证金</p><p class="nav_cont_x10">等待卖家确认</p><p>交易进行中</p><p>缴纳尾款</p><p>交易完成</p></div>'
	);
	//获取url中的参数
    function getUrlParam(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);//匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    //接收URL中的参数spid
    var id = getUrlParam('OrderId');

    $.ajax({
    	type: 'post',
        url: apiUrl+"order/selectOrderByOrderId",
        dataType: 'json',
        data:{orderId:id},
        success:function(e){
        	if(e.order.list){
        		var str = "";
        		var Total = "";//总价
                var Total_num = "";//总数
                //商品详情
        		for(var i=0;i<e.order.list.length;i++){
        			for(var s=0;s<e.order.list[i].list.length;s++){
        				var list = e.order.list[i].list[s];
        				//价钱
                        if(list.discountPrice == "-1"){
                            var moeny = list.productNum*list.price;
                        }else{
                            var moeny = list.productNum*list.discountPrice;
                        }
        				str+='<li><div class="main_commodity_x10">'+
        					'<img src="'+list.pimage.split(',')[0]+'">'+
        					'<p><a href="" target="_blank">'+list.pname+'</a></p>'+
        					'</div><div class="main_commodity_x20">'+
        					'<p>'+list.productNum+'</p><p>￥'+moeny+'</p></div></li>';
        				Total = Number(Total)+Number(moeny);
        			}
        			Total_num = Number(Total_num)+Number(e.order.list[i].list.length);
        		}
        		$(".main_commodity_cont").html(str);
        		//订单详情
        		var order = e.order;
        		//判断是否缴纳保证金
        		if(order.oStatus == "已支付"){
        			var ordercash = order.ordercash;
        		}else if(order.oStatus == "未支付"){
        			var ordercash = "0";
        		}
        		$(".main_Order_left").html('<p>订单号：'+order.oOrderid+'</p><p>商品数量：'+Total_num+'</p><p>商品总金额：'+order.oAmount+'元</p><p>需缴纳保证金：'+order.ordercash+'元</p><p>已缴纳保证金：'+ordercash+'元</p><p>订单状态：'+order.oStatus+'</p>');
        		$(".main_Order_right").html('<p>收件人：'+order.oUsername+'</p><p>收货地址：'+order.useaddress.split(',').join('')+'</p><p>联系电话：'+order.oUserinfo+'</p><p>交易开始日期：'+order.starttime+'</p><p>交易结束日期：'+order.endtime+'</p><p>备注：'+order.remarks+'</p>')
        	}
        },
        error:function(){
        	meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
})
$(document).ready(function(){
    if(!$.cookie("login_on")){
        window.location.href="login.html"
        return false;
    }else if($.cookie("position")==0 || !$.cookie("position")){
        window.location.href="b_Supermarket_WM.html"
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
//获取最新商品清单信息
function ShoppingCart(){
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
            }else{
                window.location.href = "b_Supermarket_WM.html";
            }
        },
        error:function(){
            meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
} 

//确认交易
$(".main04_but").click(function(){
    if($.cookie("user")){
        var data = {
            username:$.cookie("user"),
        }
        $.ajax({
            type: 'post',
            url: apiUrl+"order/selectAmount",
            dataType: 'json',
            data: data,
            success:function(e){
                $(".deposit").css("display","block");
                var deposit = "";
                if(e.Amount - e.Deposit > 0){
                    deposit = e.Amount - e.Deposit;
                    on_deposit();
                }else if(e.Amount - e.Deposit <= 0){
                    deposit = "0";
                }
                $(".deposit_info_x10 span").html("￥"+e.Deposit);
                $(".deposit_info_x20 span").html(deposit);
            },
            error:function(){
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        })
    }else{
        window.location.reload();
    }
})

function on_deposit(){
    var state = 1;
    $(".deposit_but").click(function(){
        if(state == 1){
            state = 2;
            if($.cookie("user")){
                //地址选择
                var DOrder_user = $(".DOrder_input_x10").val();//姓名
                var address_x10 = $(".address_x10").html();//省
                var address_x20 = $(".address_x20").html();//市
                var address_x30 = $(".address_x30").html();//区
                var DOrder_info = $(".DOrder_input_x20").val();//详细地址
                var DOrder_phone = $(".DOrder_input_x30").val();//联系电话
                //使用时期
                var time_x10 = $("#datetimepicker6 input").val();//开始使用日期
                var time_x20 = $("#datetimepicker7 input").val();//结束使用日期
                var Remarks = $(".main02_Remarks").val();//备注
                if(!DOrder_user){
                    meg("提示","收件人不能为空","body");
                    return false;
                }else if(!DOrder_info){
                    meg("提示","详细地址不能为空","body");
                    return false;
                }else if(!DOrder_phone){
                    meg("提示","手机号码不能为空","body");
                    return false;
                }else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(DOrder_phone))){
                    meg("提示","请输入正确的手机号码","body");
                    return false;
                }else if(!time_x10){
                    meg("提示","开始使用日期不能为空","body");
                    return false;
                }else if(!time_x20){
                    meg("提示","结束使用日期不能为空","body");
                    return false;
                }
                var map = new BMap.Map("container");
                var localSearch = new BMap.LocalSearch(map);
                var keyword = address_x10+address_x20+address_x30+DOrder_info;
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    var poi = searchResult.getPoi(0)
                    var location = poi.point.lng+","+poi.point.lat; //获取经度和纬度
                    map_ajax(location);
                });
                localSearch.search(keyword);
                
                function map_ajax(location){
                    var data = {
                        username:$.cookie("user"),
                        oUsername:DOrder_user,
                        province:address_x10,
                        city:address_x20,
                        county:address_x30,
                        address:DOrder_info,
                        phone:DOrder_phone,
                        startTime:time_x10,
                        endTime:time_x20,
                        remarks:Remarks,
                        location:location,
                    }
                    $.ajax({
                        type: 'post',
                        url: apiUrl+"order/create",
                        dataType: 'json',
                        data:data,
                        success:function(e){
                            if(e.status == "200"){
                                //window.location.href = ""
                            }else if(e.status == "400"){
                                meg("提示","订单已支付","body");
                            }
                        },
                        error:function(){
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

//关闭缴纳押金窗口
$(".deposit_title span").click(function(){
    $(".deposit").css("display","none")
    $(".deposit_but").unbind();
    state = 1;
})
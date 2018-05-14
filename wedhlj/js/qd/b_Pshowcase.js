$(document).ready(function(){
	$(".nav_li").eq(2).find("a").addClass("nav_on");//导航栏默认选中
	// 商品导航栏切换效果
	$(".Categories_nav li").click(function(){
		$(this).removeClass("Categories_tit_off").addClass("Categories_tit_on").siblings().removeClass("Categories_tit_on").addClass("Categories_tit_off");
	})
	$(".Categories_x10").click(function(){
		$(".Categories_x10").removeClass("Categories_x10_on");
		$(this).addClass("Categories_x10_on");
	})
    //接收URL中的参数spid
    var id = getUrlParam('id');
    var pageNo = getUrlParam('pageNo');
    Recommend(type);
    if(!id||!type){
        window.location.href = "b_Supermarket_WM.html";
    }else if(!pageNo){
        history.pushState(history.state,"","?id="+id+"&type="+type+"&pageNo=1");
        Cont(id,1,1,1);
    }else{
        history.pushState(history.state,"","?id="+id+"&type="+type+"&pageNo="+pageNo);
        Cont(id,pageNo,1,1);
    }
    //购物车
    if(!$.cookie("login_on")){
        $(".splist_x10").html('<p class="splist_Prompt">登陆后可查看购物车</p>')
    }else{
        ShoppingCart();
    }
})
var type = getUrlParam('type');//商家类型
//商品列表内容刷新
//id==>商家id
//pageNo==>当前页
//state==> 判断是否执行分页回调
//Reset===>>判断是否刷新分页Dom(1:是)
function Cont(id,pageNo,state,Reset){
    $.ajax({
        type: 'POST',
        url: apiUrl+"/product/queryAllProductOfMerchant",
        dataType: 'json',
        data: {merchantId:id,pageNo:pageNo,pageSize:9},
        success:function(e){
            show(e.allProductOfMerchant.productList,id);//商品展示
            var PageCount=Math.ceil(e.totalCount/9);
            //分页
            if(PageCount > 1&& Reset==1){
                $('.main_Pagination').paging({
                    initPageNo: pageNo, // 初始页码
                    totalPages: PageCount, //总页数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: true, //是否支持跳转
                    callback: function(page) {
                        if(state==1){
                            state=2
                        }else{
                            history.pushState(history.state,"","?id="+id+"&type="+type+"&pageNo="+page);
                            Cont(id,page,1,2);
                        }
                    }
                })
            }
        },
        error:function(){
            meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
}
//商品展示
function show(data,id){ 
    if(data!=null){
        var str = "";
        for(var i=0;i<data.length;i++){
            var list = data[i];
            str +='<li><div class="spcont_x10"><a href="b_Addorder.html?productNo='+list.productNo+'&type='+type+'">'+
            '<div class="img_auto Categories_spad_img" style="background-image:url('+apiUrl+list.productImage.split(",")[0]+')"></div></a>'+
            '</div><div class="spcont_x20"><h1>'+list.productName+'</h1>'+
            '<p>'+(list.discountPrice=="0.0"?'￥'+list.productPrice:'<span>￥'+list.productPrice+'</span>￥'+list.discountPrice)+'</p>'+
            '<div onclick="AddGoods('+list.productId+','+id+',1'+')">添加</div></div></li>';
        }
        $(".spcont_cont").html(str);
    }else{
        $(".spcont_cont").html("当前暂无商品,逛逛其它商家吧");
    }
}
//推荐商品内容
//type==>商家类型
function Recommend(type){
    $.ajax({
        type: 'POST',
        url: apiUrl+"/product/queryTuiJProduct",
        dataType: 'json',
        data: {type:type},
        success:function(e){
            var str = "";
            if(e.status==200){
                //热销商品
                var productList_length = e.productList.length;
                if(productList_length!=""){
                    for(var i=0;i<(productList_length>=3?3:productList_length);i++){
                        var data = e.productList[i];
                        str += '<a href="b_Addorder.html?productNo='+data.productNo+'&type='+type+'"><li>'+
                        '<div class="img_auto Categories_spad_img" style="background-image:url('+apiUrl+data.productImage.split(",")[0]+')"></div>'+
                        '<div class="Categories_spad_text"><p class="Categories_spad_xin">'+
                        '<i class="sp_xin_on"></i><i class="sp_xin_on"></i><i class="sp_xin_on"></i><i class="sp_xin_on"></i><i class="sp_xin_on"></i>'+
                        '</p><p class="Categories_spad_user">'+data.productName+'</p>'+
                        '<p class="Categories_spad_money">￥'+(data.discountPrice=="0.0"?data.productPrice:data.discountPrice)+'</p></div></li></a>'
                    }
                }
            }else{
                str="未查询到商品"
            }
            $(".Categories_spad_cont").html(str);       
        },
        error:function(){
            $(".Categories_spad_cont").html("未查询到商品");
        }
    }) 
}   

//获取最新购物车信息
function ShoppingCart(){
    $.ajax({
        type: 'post',
        url: apiUrl+"/cart/queryCart",
        dataType: 'json',
        data:{token:$.cookie("login_on")},
        async: false,
        success:function(e){
            if(e.merchantAndProductList != ""){
                var str = "";
                var Total = "";//总价
                for(var i=0;i<e.merchantAndProductList.length;i++){
                    var list = e.merchantAndProductList[i];
                    str +='<div class="splist_x20 splist_x20_on">'+
                        '<h1><p>'+list.merchantName+'</p><i></i></h1>'+
                        '<ul class="splist_cont">';
                        for(var p=0;p<list.product.length;p++){
                            var list_two = list.product[p];
                            //价钱
                            var moeny = (list_two.discountPrice=="0.0"?Number(list_two.productPrice)*Number(list_two.productNum):Number(list_two.discountPrice)*Number(list_two.productNum));
                            //内容
                            str +='<li class="splist_li">'+
                                '<div class="splist_cont_img">'+
                                    '<a href="b_Addorder.html?productNo='+list_two.productNo+'&type='+type+'">'+
                                        '<img src="'+apiUrl+list_two.productImg.split(',')[0]+'">'+
                                    '</a>'+
                                '</div>'+
                                '<div class="splist_cont_user">'+
                                    '<a href="b_Addorder.html?productNo='+list_two.productNo+'&type='+type+'">'+list_two.productName+'</a>'+
                                '</div>'+
                                '<div class="main_lcont_Quantity">'+
                                    ''+(Number(list_two.productNum)<=1?'<button class="main_lcont_Less main_lcont_on">':'<button class="main_lcont_Less">')+''+
                                    '-</button><input maxlength="'+String(list_two.number).length+'" value="'+list_two.productNum+'" type="text" class="main_lcont_amount">'+
                                    ''+(Number(list_two.productNum)>=Number(list_two.productNumber)?'<button class="main_lcont_plus main_lcont_on">':'<button class="main_lcont_plus">')+'+</button>'+
                                    '<div class="hide splist_pid">'+list_two.productId+'</div>'+
                                    '<div class="hide splist_number">'+list_two.productNumber+'</div>'+
                                    '<div class="hide splist_merchantId">'+list.merchantId+'</div>'+
                                '</div>'+
                                '<div class="splist_cont_money">￥<span>'+moeny+'</span></div>'+
                                '<div class="splist_cont_delete" onclick="PromptGoods('+list_two.productId+','+list.merchantId+')"></div>'+
                            '</li>';
                            Total = Number(Total)+Number(moeny);
                        }
                    str +='</ul></div>';
                }

                $(".splist_total span").html("￥"+Total+" 元");
                $(".splist_x10").html(str);
                calcNumber()
                zoom()
            }else{
                $(".splist_total span").html("￥0");
                $(".splist_x10").html("");
            }
        },
        error:function(){
            meg("提示","服务器开了小差，请稍后重试","body");
        }
    })
} 

// 商品数量加减以及数量输入框的值输入标准判断
function calcNumber(){
    //商品数量加减
    $(".main_lcont_Quantity>button").click(function(e){
        var this_pid = $(this).siblings('.splist_pid').html();//获取当前商品id
        var inputNumber=Number($(this).siblings(".main_lcont_amount").val());//当前的数量
        var storage_index =Number($(this).siblings(".splist_number").html());//当前商品的库存
        var this_mid = $(this).siblings(".splist_merchantId").html();//当前商户的id
        var this_input = $(this).siblings(".main_lcont_amount");//当前的input
        if($(this).html()=="+"&&inputNumber<storage_index){
            inputNumber++;
            modifyGoods(this_pid,this_mid,inputNumber);
        }
        else if($(this).html()=="-"&&inputNumber>1){
            inputNumber--;
            modifyGoods(this_pid,this_mid,inputNumber);
        }
        $(this).siblings(".main_lcont_amount").val(inputNumber);
        butStyle(this_input);
    })
    // 数量输入框的值输入标准判断
    $(".main_lcont_Quantity>input").change(function(e){
        var this_pid = $(this).siblings('.splist_pid').html();//获取当前商品id
        var this_mid = $(this).siblings(".splist_merchantId").html();//当前商户的id
        var this_index = $(this).parents(".splist_li").index();//当前商品索引
        var this_input = $(this);//当前的input
        var storage_index = $(this).siblings(".splist_number").html()//当前商品的库存
        var myInput=this_input.val();
        if(isNaN(myInput)||Number(myInput)<1||!myInput){
            this_input.val(1);
            modifyGoods(this_pid,this_mid,1);
        }else if(Number(myInput)>Number(storage_index)){
            this_input.val(storage_index);
            modifyGoods(this_pid,this_mid,storage_index);
        }else{
            modifyGoods(this_pid,this_mid,$(this).val());
        }
        butStyle(this_input);
    })
    //判断当前值的效果
    function butStyle(this_input){
        var this_Less = this_input.siblings(".main_lcont_Less");
        var this_plus = this_input.siblings(".main_lcont_plus");
        var this_input = Number(this_input.val());
        var storage_index = Number($(this).siblings(".splist_number").html());//当前商品的库存
        if(this_input <= 1){
            this_Less.addClass('main_lcont_on');
            this_plus.removeClass('main_lcont_on');
        }else if(this_input >= storage_index){
            this_plus.addClass('main_lcont_on');
            this_Less.removeClass('main_lcont_on');
        }else if(1 < this_input < storage_index){
            this_Less.removeClass('main_lcont_on');
            this_plus.removeClass('main_lcont_on');
        }
    }
}

//添加商品
function AddGoods(spid,id,number){
    if($.cookie("login_on")){
        $.ajax({
            type: 'post',
            url: apiUrl+"/cart/addProductToCartOrUpdate",
            dataType: 'json',
            data: {token:$.cookie("login_on"),strProductId:spid,strMerchantId:id,strProductNum:number},
            success:function(e){
                if(e.status==200){
                    meg("提示","添加成功","body");
                    ShoppingCart();
                }else{
                    meg("提示","添加失败","body");
                }
            },
            error:function(){
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        }) 
    }else{
        window.open("login.html");
    }  
}
//修改商品
function modifyGoods(spid,id,num){
    if($.cookie("login_on")){
        $.ajax({
            type: 'post',
            url: apiUrl+"/cart/addProductToCartOrUpdate",
            dataType: 'json',
            data: {token:$.cookie("login_on"),strProductId:spid,strMerchantId:id,strProductNum:num},
            success:function(e){
                if(e.status!=200){
                    meg("提示","修改失败","body");
                }
                ShoppingCart();
            },
            error:function(){
                meg("提示","服务器开了小差，请稍后重试","body");
            }
        }) 
    }else{
        window.open("login.html");
    }  
}  
//删除商品
function PromptGoods(spid,mid){
    if($.cookie("user")){
        meg2("提示","是否确定删除商品","body",deleteGoods);
        var pid = spid;
        function deleteGoods(){
            $.ajax({
                type: 'post',
                url: apiUrl+"/cart/delProductToCart",
                dataType: 'json',
                data: {token:$.cookie("login_on"),productId:spid,merchantId:mid},
                success:function(e){
                    ShoppingCart()
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
$(".splist_but").click(function(){
    if($(".splist_li").length > 0){
        if(!$.cookie("login_on")){
            meg("提示","请先登录","body");
            return false;
        }else if($.cookie("position")==0){
            meg("提示","请先注册商户，点击商家入驻注册商户","body");
            return false;
        }else{
            window.open("b_DetermineOrder.html")
        }
    }else{
        meg("提示","请选择需要购买得商品","body");
    }
    
})
//缩放
function zoom(){
    $(".splist_x20 h1").click(function(){
        if($(this).parent(".splist_x20").hasClass("splist_x20_on")){
            $(this).parent(".splist_x20").removeClass('splist_x20_on')
        }else{
            $(this).parent(".splist_x20").addClass('splist_x20_on')
        }
    })
}
     
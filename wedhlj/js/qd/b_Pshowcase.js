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
    //获取url中的参数
    function getUrlParam(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);//匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    //接收URL中的参数spid
    var id = getUrlParam('fwsid');
    var data = {
        currentPage:1,
        mid:id,
    }
    Cont(data);
    if($.cookie("user")){
        ShoppingCart();
    }
})

var First=1;//分页验证
//商品列表内容刷新
function Cont(data){
    $.ajax({
        type: 'POST',
        url: apiUrl+"merchant/allProduct",
        dataType: 'json',
        data: data,
        success:function(e){
            //热销商品
            var str = "";
            var lists2_length = "";
            if(e.lists2.length < 3){
               lists2_length = e.lists2.length;
            }else if(e.lists2.length >= 3){
                lists2_length = 3;
            }
            if(lists2_length){
                for(var i=0;i<lists2_length;i++){
                    var lists2 = e.lists2[i];
                    if(lists2.discountPrice == -1){
                        var moeny = lists2.price;
                    }else{
                        var moeny = lists2.discountPrice;
                    }
                    str += '<a href="b_Addorder.html?spid='+lists2.pid+'"><li>'+
                    '<img src="'+lists2.pimage.split(",")[0]+'">'+
                    '<div><p class="Categories_spad_xin">'+
                    '<i class="sp_xin_on"></i><i class="sp_xin_on"></i><i class="sp_xin_on"></i><i class="sp_xin_on"></i><i class="sp_xin_on"></i>'+
                    '</p><p class="Categories_spad_user">'+lists2.pname+'</p>'+
                    '<p class="Categories_spad_money">￥'+moeny+'</p></div></li></a>'
                }
                $(".Categories_spad_cont").html(str);
            } 
            //商品列表
            main_cont(e);
            //分页
            if(e.totalPage > 1){
                $('.main_Pagination').paging({
                    initPageNo: 1, // 初始页码
                    totalPages: e.totalPage, //总页数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: true, //是否支持跳转
                    callback: function(page) {
                        if(First==1){
                            return First=2
                        }else if(First==2){
                            data.currentPage = page;
                            $.ajax({
                               type: 'POST',
                                url: apiUrl+"merchant/allProduct",
                                dataType: 'json',
                                data: data,
                                success:function(e){
                                    console.log(e)
                                    main_cont(e);
                                },
                                error:function(){
                                    meg("提示","服务器开了小差，请稍后重试","body");
                                }
                            })
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
//商品内容
function main_cont(data){
    if(data.list3.length != 0){
        var str = "";
        for(var i=0;i<data.list3.length;i++){
            var list3 = data.list3[i];
            str +='<li><div class="spcont_x10"><a target="_blank" href="b_Addorder.html?spid='+list3.pid+'">'+
            '<img src="'+list3.pimage.split(",")[0]+'"></a></div>'+
            '<div class="spcont_x20"><h1>'+list3.pname+'</h1><p>';
            if(list3.discount_price == -1){
                str +='￥'+list3.price;
            }else{
                str +='<span>￥'+list3.price+'</span>￥'+list3.discount_price;
            }
            str +='</p><div onclick="AddGoods('+list3.pid+')">添加</div></div></li>';
        }
        $(".spcont_cont").html(str);
    }else{
        $(".spcont_cont").html("当前暂无商品");
    }
}   

//获取最新购物车信息
function ShoppingCart(){
    $.ajax({
        type: 'post',
        url: apiUrl+"cart/cart",
        dataType: 'json',
        data:{username:$.cookie("user"),},
        async: false,
        success:function(e){
            if(e.list != null){
                var str = "";
                var Total = "";//总价
                for(var i=0;i<e.list.length;i++){
                    var list = e.list[i];
                    str +='<div class="splist_x20 splist_x20_on">'+
                        '<h1><p>'+list.mName+'</p><i></i></h1>'+
                        '<ul class="splist_cont">';
                        for(var p=0;p<list.list.length;p++){
                            var list_two = list.list[p];
                            //价钱
                            if(list_two.discountPrice == "-1"){
                                var moeny = list_two.productNum*list_two.price;
                            }else{
                                var moeny = list_two.productNum*list_two.discountPrice;
                            }
                            str +='<li class="splist_li">'+
                                '<div class="splist_cont_img">'+
                                    '<a href="b_Addorder.html?spid='+list_two.pid+'">'+
                                        '<img src="'+list_two.pimage.split(',')[0]+'">'+
                                    '</a>'+
                                '</div>'+
                                '<div class="splist_cont_user">'+
                                    '<a href="b_Addorder.html?spid='+list_two.pid+'">'+list_two.pname+'</a>'+
                                '</div>'+
                                '<div class="main_lcont_Quantity">';
                                    if(list_two.productNum <= 1){
                                        str +='<button class="main_lcont_Less main_lcont_on">' 
                                    }else{
                                        str +='<button class="main_lcont_Less">'
                                    };
                                    str +='-</button><input maxlength="'+String(list_two.number).length+'" value="'+list_two.productNum+'" type="text" class="main_lcont_amount"><';
                                    if(list_two.productNum >= list_two.number){
                                        str +='button class="main_lcont_plus main_lcont_on">+</button>'
                                    }else{
                                        str +='button class="main_lcont_plus">+</button>'
                                    }
                                    str +='<div class="hide splist_pid">'+list_two.pid+'</div>'+
                                    '<div class="hide splist_number">'+list_two.number+'</div>'+
                                '</div>'+
                                '<div class="splist_cont_money">￥<span>'+moeny+'</span></div>'+
                                '<div class="splist_cont_delete" onclick="PromptGoods('+list_two.pid+')"></div>'+
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
        var this_input = $(this).siblings(".main_lcont_amount");//当前的input
        if($(this).html()=="+"&&inputNumber<storage_index){
            inputNumber++;
            modifyGoods(this_pid,inputNumber);
        }
        else if($(this).html()=="-"&&inputNumber>1){
            inputNumber--;
            modifyGoods(this_pid,inputNumber);
        }
        $(this).siblings(".main_lcont_amount").val(inputNumber);
        butStyle(this_input);
    })
    // 数量输入框的值输入标准判断
    $(".main_lcont_Quantity>input").change(function(e){
        var this_pid = $(this).siblings('.splist_pid').html();//获取当前商品id
        var this_index = $(this).parents(".splist_li").index();//当前商品索引
        var this_input = $(this);//当前的input
        var storage_index = $(this).siblings(".splist_number").html()//当前商品的库存
        var myInput=this_input.val();
        if(isNaN(myInput)||Number(myInput)<1||!myInput){
            this_input.val(1);
            modifyGoods(this_pid,1);
        }else if(Number(myInput)>Number(storage_index)){
            this_input.val(storage_index);
            modifyGoods(this_pid,storage_index);
        }else{
            modifyGoods(this_pid,$(this).val());
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
function AddGoods(spid){
    if($.cookie("login_on")){
       var data = {
            pid:spid,
            num:1,
            username:$.cookie("user"),
        }
        $.ajax({
            type: 'post',
            url: apiUrl+"cart/add",
            dataType: 'json',
            data: data,
            success:function(e){
                ShoppingCart()
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
function modifyGoods(spid,num){
    if($.cookie("user")){
        var data = {
            pid:spid,
            num:num,
            username:$.cookie("user"),
        }
        $.ajax({
            type: 'post',
            url: apiUrl+"cart/update",
            dataType: 'json',
            data: data,
            success:function(e){
                if(e.status == "200"){
                    ShoppingCart() 
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
//删除商品
function PromptGoods(spid){
    if($.cookie("user")){
        meg2("提示","是否确定删除商品","body",deleteGoods);
        var pid = spid;
        function deleteGoods(){
            var data = {
                pid:pid,
                username:$.cookie("user"),
            }
            $.ajax({
                type: 'post',
                url: apiUrl+"cart/delete",
                dataType: 'json',
                data: data,
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
        window.open("b_DetermineOrder.html")
    }else{
        meg("提示","请选择需要购买得商品","body")
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
     
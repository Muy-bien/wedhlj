//导入信息
$(document).ready(function(){
	// 日历插件
	$('#ca').calendar({
        width: 520,
        height: 520	,
        data: [//多事件之间用 ; 分开
			{
			  date: '2015/12/24',
			  value: 'Christmas Eve'
			},
			{
			  date: '2015/12/25',
			  value: 'Merry Christmas'
			},
			{
			  date: '2016/01/01',
			  value: 'Happy New Year'
			},
			{
			  date: '2018/10/04',
			  value: 'could you marry me'
			},
			{
			  date: '2018/04/12',
			  value: '杨勇，你，这个小坟蛋！;杨勇，你，去吃冰冰凉'
			}
		],
        onSelected: function (view, date, data) {
           // detail day
            console.log('date:' + (Number(date.toISOString().slice(8,10))+1));
            console.log('data:' + (data || 'None'));
            if(data){
            	var dataArr=data.split(";");
            	var thingHtml='';
            	for(var i=0;i<dataArr.length;i++){
            		thingHtml+='<div class="boxc_item">'+
									'<div class="box_radius"></div>'+
									'<div class="box_content">'+dataArr[i]+'</div>'+
								'</div>'
            	}
            	$(".boxc").html(thingHtml);
            }else{
            	$(".boxc").html(' ');
            }
        }
    });
    //
})
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
}
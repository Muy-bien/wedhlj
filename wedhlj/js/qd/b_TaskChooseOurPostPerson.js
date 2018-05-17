var state=1;
$(document).ready(function(){
	$(".nav_li").eq(1).find("a").addClass("nav_on");
})
var taskId=getUrlParam('taskId');
	/*全选*/
$(function(){
	$(".check").click(function(){
		$(":input[name='ids']").prop("checked",this.checked);
	});
	$(":checkbox[name='ids']").click(function(){
		$(".check").prop("checked",$(":checkbox[name='ids']").length==$(":checkbox[name='ids']:checked").length);
	});
})
//推送人员的展示 /BusinessPersonnel/queryAllParticularInfo
//PersonnelType:合作--0；固定--1
queryAllParticularInfo($.cookie('login_on'),1,100,0)
function queryAllParticularInfo(token,pageNo,pageSize,PersonnelType){
	on_Loading();
	$.ajax({
			type:"post",
			url: apiUrl+'/BusinessPersonnel/queryAllParticularInfo',
			dataType: 'json',
			data: {token:token,pageNo:pageNo,pageSize:pageSize,PersonnelType:PersonnelType},
			success:function(e){
				console.log(e);
				var businessPersonnels=e.businessPersonnels;
				var html='';
				if(businessPersonnels.length>0){
					for(var k=0;k<businessPersonnels.length;k++){
						html+='<div class="control_total_person_item">'+
								'<div class="c_check">'+
									'<input type="checkbox" name="ids" value="'+businessPersonnels[k].id+'">'+//value='+businessPersonnels[k].id+'
								'</div>'+
								'<div>'+businessPersonnels[k].name+'</div>'+
								'<div><div class="c_pic"><img src="'+apiUrl+businessPersonnels[k].headPortait+'"/></div></div>'+
								'<div>'+businessPersonnels[k].order_price+'</div>'+
								'<div>'+businessPersonnels[k].reservationNumber+'</div>'+
								'<div>'+businessPersonnels[k].address.split(',').join('')+'</div>'+
								'<div>已审核</div>'+
							'</div>'
					}
					 $(".control_total_person").append(html);
				}else{
					$(".main").html('<a href="u_AddFixedPersonnel.html">您还没有人员可以推送，请前去添加！</a>')
				}
				down_Loading();
			},
			error:function(){
				down_Loading();
				meg("提示","网络开小差，请检查！","body");
			}
		})
}

//推送人员
 $(".p_manage_add").click(function(){
		if(state==1){
			state=2;
			var pids="";
			var checkedPerson=$(":checkbox[name='ids']:checked");
			for(var s=0;s<checkedPerson.length;s++){
				pids+=checkedPerson[s].value+",";
			}
			if(!checkedPerson.length){
				meg("提示","请添加推送商品或者人员","body");
			}else{
				pushPerson(pids,taskId);
		}
	}
})
///task/pushPerson推送人员
function pushPerson(personnelId,taskId){
	$.ajax({
        type: 'POST',
        url: apiUrl+'/task/pushPerson',
        data: {personnelId:personnelId,taskId:taskId},
        success: function(e) {
        	console.log(e);
        	if(e.status==200){
        		theBidding($.cookie('login_on'),taskId);
        	}else{
        		meg("提示","人员推送失败，请联系客服！","body");
        	}
        },
        error : function() {
          meg('提示','当前网络不畅通,请检查您的网络','body'); 
        }
	})
}
 //竞标/task/theBidding
function theBidding(token,taskId){
	$.ajax({
			type:"post",
			url: apiUrl+'/task/theBidding',
			data:{token:token,taskId:taskId},
			dataType:'json',
			success:function(e){
				console.log(e);
				if(e.status==200){
					meg("提示","人员推送成功，竞标中！","body",propDance);
				}else{
					meg("提示","竞标操作失败，请联系客服！","body");
				}
				function propDance(){
				 	window.location.href="b_TaskStateDetail_YF.html?taskId="+taskId+"";
				}
			},
			error:function(){
				meg("提示","网络开小差，请检查！","body");
			}
		})
}
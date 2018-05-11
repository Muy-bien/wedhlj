$(document).ready(function(){
	//接收URL中的参数id
	var id = getUrlParam('id');
	//当前页面默认选中
	$(".nav_cont_a").eq(1).addClass("nav_cont_on");
	//获取审核数据详情
	selectById(id);
})
//防止多次点击
var state=1;
///user/ selectById  根据ID查询用户
function selectById(myid){
	$.ajax({
		type:'post',
		url: apiUrl+'/user/queryUserAudit',
		data:{userId:myid},
		dataType: 'json',
		async: false,
		success:function(e){
			var user=e.userList[0];
			// 上传图片
			var images=user.userPhoto.split(",");
		    var imgHtml="";
			for(var i=0;i<images.length;i++){
				if(images[i]!="null"){
					imgHtml+='<li><div class="small-img"><img src="'+apiUrl+images[i]+'"></div></li>';
				}
			}
			$(".animation03").html(imgHtml);
			// 商家名字
			$(".merchantName").html(user.merchantName);
			// 公司类型
			$(".companyType").html(user.companyType);
			// 地址
			$(".address").html(user.address.split(",").join(""));
			// 联系电话
			$(".userPhone").html(user.userPhone);
			// 营业执照名称
			$(".licenseName").html(user.licenseName);
			// 执照编码
			$(".licenseNo").html(user.licenseNo);
			// 身份证名称
			$(".identityName").html(user.identityName);
			// 身份证号
			$(".identityNo").html(user.identityNo);
			//审核按钮
			Examine(user.userName);
		},
		error:function(){
			meg("提示","网络开小差，请检查！","body");
		}
	})
}
//审核
function Examine(username){
	//通过
	$(".confirm").click(function(){
		if(state==1){
			state=2;
			ToExamine(username,1)
		}
	})
	//未通过
	$(".cancel").click(function(){
		if(state==1){
			state=2;
			ToExamine(username,0)
		}
	})
}
//审核
function ToExamine(username,auditStatus){
	$.ajax({
		type:'post',
		url: apiUrl+'/user/auditUser',
		data:{userNames:username,auditStatus:auditStatus},
		dataType: 'json',
		success:function(e){
			if(e.status==200){
				meg("提示","操作成功！","body",reload)
			}else{
				meg("提示","操作失败！","body",reload)
			}
		},
		error:function(){meg("提示","网络开小差，请检查！","body");}
	})
}
function reload(){
	window.location.href = document.referrer;
}
//导航栏默认选中
function on_navli(){
	$(".nav_cont_a").eq(0).addClass("nav_cont_on");
}
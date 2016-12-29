ff.page.init({
	vm:{
		goActivity:goActivity,
		goOrderList:goOrderList
	},
	url:'userMessSearch',
	afterLoad:function(vm){
		setTimeout(function() {
			findMessageCount()
		},700);
	}
	
});
//跳转到待收货页面
function goOrderList(){
	ff.page.go({url:"Order/Index",data:{status:"1"}});
}
//抢购消息跳转到抢购商品详情页面
function goActivity(item){
	var dataparam = {activityCommodityId:item.activityId};
	ff.page.go({url:"ActivityCommodity/Detail",data:dataparam});
}

function findMessageCount(){
	//获取消息未读数量，用作右上角小红点显示
	ff.page.submit({
 		url:"Message/FindunReadCount",
 		success:function(data)
 		{	
 			if(data.obj<=0){
 				$("#goMsg").find("span").hide();
 			}
 		}
 	});
}
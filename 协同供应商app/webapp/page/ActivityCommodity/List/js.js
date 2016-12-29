ff.page.init({
	vm:{
		activity_banner:{},
		banner_list: [],
		tab_change: tab_change,
		banner_click: banner_click,
		statusFormater: statusFormater,
		time_down: 0,
		timer: timer
	},
    url:'ActivityCommodity/FindActivityCommodityList',
    isPage:true,
    afterLoad:function(vm){
    	var req = ff.page.req();
    	ff.page.submit({
	 		url:'ActivityManager/FindActivityInfo',
	 		data:req.activityId,
 	 		success:function(rsp)
	 		{
	 			vm.activity_banner = rsp.obj;
	 			if ("1" == vm.activity_banner.activityStatus) {
	 				// 距离结束所剩秒数
	 				var endDate = vm.activity_banner.endDate
	 				if (endDate == null) {
	 					endDate = new Date();
	 				}
	 				var second = new Date(endDate).getTime() - new Date().getTime();
	 				vm.time_down = second / 1000;
				}
	  		}
	 	});
    	ff.page.submit({
	 		url:'ActivityCommodity/FindActivityBennerList',
	 		data:req.activityId,
 	 		success:function(rsp)
	 		{
 	 			if(null == rsp.obj)
 	 			{
 	 				vm.banner_list = [];
 	 			}
 	 			else
 	 			{
 		 			vm.banner_list = rsp.obj;
 	 			}	
	  		}
	 	});
    }
});


// 活动商品列表
function tab_change(item){
	var vm = ff.page.vm();
	// 活动商品tab查询
	var params = [{activityId:vm.activity_banner.id,sort:'',desc:'',},
	              {activityId:vm.activity_banner.id,sort:'price',desc:'1',},
	              {activityId:vm.activity_banner.id,sort:'price',desc:'',}
	              ];
	var param = {};
	// 设置参数
	$('.result-sort ul li').removeClass('now');
	$('.result-sort ul li').eq(item).addClass('now');
	param = params[item];
	ff.page.submit({
 		url:'ActivityCommodity/FindActivityCommodityList',
 		condition:param,
 		isPage:true,
	 	success:function(rsp)
 		{
 			vm.obj = rsp.obj.dataList;
  		}
 	});
}

// 单击banner，链接到活动商品详情
function banner_click(item){
	// 活动状态
	var vm = ff.page.vm();
	var status = vm.activity_banner.activityStatus;
	// 判断活动状态
	if (status == "0") { // 即将开始
		ff.util.show("活动即将开始，请稍候再来。");
	}
	else if(status == "2") // 已结束
	{
		ff.util.show("活动已结束，感谢您的关注。");
	}
	else if(status == "1") // 进行中
	{
		var  dataparam = {activityCommodityId:item.id};
		ff.page.go({url:"ActivityCommodity/Deatilordinary",data:dataparam});
	}
}

/**
 * 活动状态描述
 * @param item
 */
function statusFormater(){
	var vm = ff.page.vm();
	var desc = "";
	if ("0" == vm.activity_banner.activityStatus || "2" == vm.activity_banner.activityStatus) {
		desc = new Date(vm.activity_banner.startDate).format("MM月dd日  hh:mm")+" 开售";
	}
	return desc;
}



function timer(){

	var vm = ff.page.vm();
	if(vm.time_down>0)
	{
		vm.time_down = vm.time_down - 1;
		var timeqj = vm.time_down;
		 if(timeqj!=null && timeqj!=""){
//				if( )
			 var dd = parseInt(timeqj  / 60 / 60 / 24 , 10);//计算剩余的天数  
			 var hh = parseInt(timeqj  / 60 / 60 % 24 , 10);//计算剩余的小时数  
			 var mm = parseInt(timeqj  / 60 % 60, 10);//计算剩余的分钟数  
			 var ss = parseInt(timeqj  % 60, 10);//计算剩余的秒数  
			
			 var hhval = checkTime(hh);  
			 var mmhhval = checkTime(mm);  
			 var ssval = checkTime(ss); 
			 if(null == document.getElementById("time_activity"))
			 {
				 return;
			 }	 
		     if(hh<=0 && mm<=0 && ss<=0 ){
		    	 document.getElementById("time_activity").innerHTML = "";  
		         
		     }else{
		    		 document.getElementById("time_activity").innerHTML = 
		    			 "<i>"+  dd + "</i><b>天</b><i>"+  hhval + "</i><b>时</b>" +
		    			 "<i>" + mmhhval + "</i><b>分</b><i>" + ssval + "</i><b>秒</b>";  
		     }
	     }
	}
	else
	{
		if(document.getElementById("time_activity")!=null)
		{
			 document.getElementById("time_activity").innerHTML = ""; 	
		}
	}	


}

var timestop=setInterval(timer,1000);

function checkTime(i)    
{    
   if (i < 10) {    
       i = "0" + i;    
    }    
   return i;    
}    

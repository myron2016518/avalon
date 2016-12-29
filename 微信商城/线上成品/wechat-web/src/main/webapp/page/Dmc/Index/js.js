
ff.page.init({
	vm:{
 		banner_list: [],
        formatter:statusFormatter,
        tab_change:tab_change,
        click_advert:click_advert
       },
	url:'ActivityManager/Load',
	isPage:true,
	afterLoad:function(vm)
	{
		ff.page.submit({
	 		url:'AdvertRegion/LoadAll',
	 		condition:{number:'DMC'},
 	 		success:function(rsp)
	 		{
	 			vm.banner_list = rsp.obj;
	  		}
	 	});
	}
});

/*
 * 状态描述
 * @param status 状态
 * @param startDate 开始时间
 * @param endDate 结束时间
 * @returns {String} 状态描述内容
 */
function statusFormatter(status,startDate,endDate)
{
	var today=new Date();
	var desc = "";
	if ("0" == status) 
	{
		desc = "已结束";
	} 
	else if("1" == status)
	{
		desc = new Date(startDate).format("yyyy-MM-dd hh:mm")+"开售";
	} 
	else if("2" == status)
	{
		var now = (new Date()).format("yyyy-MM-dd hh:mm");
		var hour = GetDateDiff(now,endDate,"hour");
		var day = GetDateDiff(now,endDate,"day");
		if (day >= 1) 
		{
			desc = "仅剩"+day+"天";
		} 
		else 
		{
			if(hour >= 1)
			{
				desc = "仅剩"+hour+"小时";
			}
			else
			{
				desc = "少于1小时";
			}
		}
	}
	return desc;
}

// 跳转到活动详情
function tab_change(item){
	if (item.actStatus != "0") {
		ff.page.go({url:"ActivityCommodity/List",data:{activityId:item.id}});
	}
	else
	{
		ff.util.show("该活动已结束，感谢您的关注。");
	}
}

//广告点击跳转
function click_advert(item){
	var type = item.type;//广告类型
	var url = item.url;//跳转url（广告类型为WEB或者优惠券）
	var objId = item.objId;
	if(type==="CATEGORY_LIST"){//分类列表
		ff.page.go({url:"Commodity/Index",data:{cid:objId,desc:1,sort:"sales"}});
	}else if(type==="PRESALE_LIST"){//预售列表 (TODO 暂无)
//		ff.page.go({url:"",data:{}});
	}else if(type==="PRESALE_DETAIL"){//预售详情 (TODO 暂无)
//		ff.page.go({url:"",data:{}});
	}else if(type==="PANICBUYING_LIST"){//抢购列表
		ff.page.go({url:"ActivityCommodity/Index",data:{defaultPanic:"1"}});
	}else if(type==="PANICBUYING_DETAIL"){//抢购详情
		ff.page.go({url:"ActivityCommodity/Detail",data:{activityCommodityId:objId}});
	}else if(type==="ORDINARYGOODS_DETAIL"){//普通商品详情
		ff.page.go({url:"Commodity/Detail",data:{goodsId:objId}});
	}else if(type==="ACTIVITY_LIST"){//活动列表
		ff.page.go({url:"ActivityCommodity/List",data:{activityId:item.id}});
	}else if(type==="WHOLESALE_LIST"){//批发列表 (TODO 暂无)
//		ff.page.go({url:"",data:{}});
	}else if(type==="NEWUSER_LIST"){//新用户专享列表(TODO 暂无)
		ff.page.go({url:"ActivityCommodity/List",data:{activityId:item.id}});
	}else if(type==="MENU_TYPE"){//菜单类型 (TODO 暂无)
		//TODO
	}else if(type==="BACKGROUND_IMAGE"){//背景图片 (TODO 暂无)
		//TODO
	}else if(type==="WEB_LINK"){//WEB链接
		ff.page.go({url:url,data:{}});
	}else if(type==="COUPON_VIEW"){//优惠券
		ff.page.go({url:url,data:{}});
	}
}

/*
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
* 返回精度为：秒，分，小时，天
*/
function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}
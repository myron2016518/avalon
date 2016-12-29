
var recommentInfoUrl = "RecommendCommodity/Load" ;//请求为您推荐列表数据

var $cid = "";//当前推荐类别
ff.page.init({
	vm:{
 		sub_list: {},
 		homeTabListItem:[],
 		judgeEnough:judgeEnough,
		cartObj:{//购物车
			title:"",//商品标题
			image:"",//商品图片
			salePrice:'0.0',//优惠售价
			attrList:[],//属性列表
			originElems:[],//原始数据
			cartNum:1,//加入购物车的数量
			activityCommodityId:null,

			storageNum:0,//当前商品库存数
			total:0,//合计价格
			skuId:"",//当前指向的sku
			windowType:"",//窗体类型 half or half-attr
			buyType:"",//购买类型
			flag:""
		}
       },
       loadMore:function(page,flag){
       	if(!flag){
       		noMore(true);
       		return;
       	}
       	ff.page.submit({
   	 		url:recommentInfoUrl,
   	 		condition:{cid:$cid,homeType:1},
   	 		page:page,
   	 		isPage:true,	 
   	 		success:function(data)
   	 		{	
   	 			ff.page.vm().homeTabListItem.pushArray(data.obj.dataList);
    	 	}
   	 	});
       },
	afterLoad:function(vm)
	{

		vm.sub_list=ff.page.req();
		var categoryId=ff.page.req().categoryId;
		$cid = categoryId;
 		ff.page.submit({
	 		url:recommentInfoUrl,
	 		page:vm.page,
			item_click:item_click,
	 		condition:{cid:categoryId,homeType:1},
 	 		success:function(rsp)
	 		{
 	 			vm.homeTabListItem = rsp.obj.dataList;
 	  		}
	 	});
	}
});
//控制显示与隐藏“没有更多了”
function noMore(flag){
	if(flag){
		$("#NoMore").css("display","block");
	}else{
		$("#NoMore").css("display","none");
	}
}
/***
 * 判断是否有货
 * @param obj
 */
function judgeEnough(obj){
	return obj.$model.storageNum && obj.$model.storageNum>0?true:false;
}
function item_click(item)
{
	var  dataparam={activityCommodityId:item.activityId};
	ff.page.go({url:"ActivityCommodity/Detail",data:dataparam});
}

//推荐商品点击跳转
function clickRecommendCommodity(item){
	var goodsId = item.$model.goodsId;
	ff.page.go({url:"Commodity/Detail",data:{goodsId:goodsId}});
}


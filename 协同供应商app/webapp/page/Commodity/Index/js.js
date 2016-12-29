var currentSortType="sales1";//当前排序方式
ff.page.init({
	vm:{
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
	isPage:true,
	url:'Commodity/Load',
 	sortList:sortList,
	judgeVip:judgeVip,
	judgeEnough:judgeEnough,
	commodityItemClick:commodityItemClick,
	loadMore:function(page,flag){
	 	if(!flag){
    		noMore(true);
    		return;
    	}
	}
});

 
//排序
function sortList(sort,desc,obj){
	noMore(false);
	ff.page.vm().page.currentPage=1;//继续第一页
	if(currentSortType==sort+desc ){
		return;
	}
	currentSortType = sort+desc;
	var req = ff.page.req();
	//设置请求参数值
	req.sort=sort;
	req.desc=desc;
	
	var title = req&&req.title?req.title:null;
	var cid =  req&&req.cid?req.cid:null;
	ff.page.submit({
 		url:"Commodity/Load",
 		condition:{cid:cid,title:title,sort:sort,desc:desc},
 		page:{currentPage:1,pageSize:20},
 		success:function(data)
 		{	
 			if(data.obj.dataList){
 				ff.page.vm().obj = data.obj.dataList;
 			}
 		}
 	});
	
	changeStyle(obj);
}

function changeStyle(obj){
	var parentObj = $(obj).parent().parent();
	var nowObj = $(parentObj).find("li[class='now']");
	nowObj.removeClass();
	$(obj).parent().attr("class","now");
}


/***
 * 判断是否显示专享价图标
 */
function judgeVip(obj){
	return obj.$model.showType?true:false;
}

/***
 * 判断是否有货
 * @param obj
 */
function judgeEnough(obj){
	return obj.$model.storageNum && obj.$model.storageNum>0?true:false;
}

//控制显示与隐藏“没有更多了”
function noMore(flag){
	if(flag){
		$("#NoMore").css("display","block");
	}else{
		$("#NoMore").css("display","none");
	}
}

/***
 * 点击跳转至商品详情
 * @param goodsId
 */
function commodityItemClick(item){
	if( !item.activityId || !item.showType ){
		ff.page.go({url:"Commodity/Detail",data:{goodsId:item.commodityId}});
	}else if( item.showType=="PANIC_BUY" ){ //跳抢购详情
		ff.page.go({url:"ActivityCommodity/Detail",data:{activityCommodityId:item.activityId}});
	}else if( item.showType=="ORDINARY_ACTIVITY" ){//跳普通活动详情
		ff.page.go({url:"ActivityCommodity/Deatilordinary",data:{activityCommodityId:item.activityId}});
	}else if(item.showType=="PRE_SALE" )
	{
		ff.util.show("敬请期待");
	}
	else if(item.showType=="NEWUSER_VIP")
	{
		ff.util.show("敬请期待");
	}
	else if(item.showType == "WHOLESALE_MANAGER")
	{
		ff.util.show("敬请期待");
	}	
	else
	{
		ff.page.go({url:"Commodity/Detail",data:{goodsId:item.commodityId}});	
	}
	
}
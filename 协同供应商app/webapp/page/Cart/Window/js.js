/***
 * 自己输入数量改变事件
 */
function changeNum(){
	var vm = ff.page.vm();
	var cartNum = vm.cartObj.cartNum;
	cartNum = cartNum.replace(/[^0-9]+/g, '');
	if( !cartNum || cartNum.length==0 || Number(cartNum)<1 ){
		cartNum = 1;
	}else{
		var storageNum =  vm.cartObj.storageNum;//库存数量
		if(Number(cartNum) > Number(storageNum)){
			cartNum = Number(storageNum);
		}
	}
	//针对多属性进行校验
	if( !vm.cartObj.skuId || vm.cartObj.skuId=="" ){
		cartNum = 1;
	}
//console.log(cartNum,storageNum)
	updateTotal(cartNum,vm);
}

/***
 * 减少购物车数量
 */
function reduceNum(){
	var vm = ff.page.vm();
	
	var skuId = vm.cartObj.skuId;
	
	if( !vm.cartObj.skuId || vm.cartObj.skuId=="" )
	{
		ff.util.show("请选择商品属性");
		return;
	}
	
	var currentNum =  vm.cartObj.cartNum;//当前加入购物车数量
	if(currentNum <= 1){
		return;
	}
	updateTotal( --currentNum,vm);
}

/***
 * 增加购物车数量
 */
function addNum(){
	var vm = ff.page.vm();
	
	var skuId = vm.cartObj.skuId;
	
	if( !vm.cartObj.skuId || vm.cartObj.skuId=="" )
	{
		ff.util.show("请选择商品属性");
		return;
	}
	
	var currentNum =  vm.cartObj.cartNum;//当前加入购物车数量
	var storageNum =  vm.cartObj.storageNum;//库存数量
	if( currentNum >= Number(storageNum) ){
		return;
	}
	updateTotal( ++currentNum,vm);
}

function updateTotal(addNum,vm){
	var price = vm.cartObj.salePrice; //单价
	var newPrice = addNum * Number(price);
	newPrice = newPrice.toFixed(2);
	vm.cartObj.total = newPrice;
	vm.cartObj.cartNum = addNum;
}

/***
 * 购物车点击确定
 */
function confirmAddCart(){
	var vm = ff.page.vm();
	var skuId = vm.cartObj.skuId;
	
	if( !skuId || skuId=="" ){
		ff.util.show("请先选择完商品属性哦！");
		return;
	}	
	
	if ($('.detail-footer').length > 0) {
		bottomNav('hide');
	} else {
		bottomNav('show');
	}
	
	if(vm.cartObj.flag && vm.cartObj.flag=="BUY"){//点击的是立即购买
		goToBuy( vm );
	}else{
		saveToCart( vm );		
	}		
}

function goToBuy(vm){
	var objList = [];
	var obj = {};
	var cartObj = vm.cartObj;
	obj.skuId = cartObj.skuId;
	obj.favourablePrice =	cartObj.salePrice;
	obj.cartNum = cartObj.cartNum;
	obj.skuAttrs = findSelectedAttr();
	obj.commodityTitle = cartObj.title;
	obj.commoditySkuPic = cartObj.image;
	obj.buyType = cartObj.buyType;
	obj.activityCommodityId = cartObj.activityCommodityId;
 	objList.push(obj);
 	ff.page.go({url:"Pay/Index",data:objList});
}

function saveToCart(vm){
	var skuId = vm.cartObj.skuId;
	ff.page.submit({
		url:'Cart/Create',
		data:{skuId:skuId, cartNum: vm.cartObj.cartNum,activityCommodityId:vm.cartObj.activityCommodityId},
		success:function(rsp)
	    {
			if( !ff.util.isSuccess(rsp) ){
				if( rsp.message && rsp.message!=""){
					ff.util.show( rsp.message );
				}else{
					ff.util.show("加入失败");
				}
			}else{
				ff.util.show("加入成功");
				ff.service.loadCartNum();
				if(vm.cartObj.reload)
				{
					ff.page.reload();
				}	
			}
			closeWindow();
	    }
	});
}
/***
 * 关闭或打开window
 * type BLOCK,CLOSE
 */
function closeWindow(){
	var vm = ff.page.vm();
	var windowType = vm.cartObj.windowType;
	$("#"+windowType).removeClass();
	$("#"+windowType).attr("class","pro-detail-win weui-popup-container popup-bottom");
	$("#"+windowType).css({"display":"none"});
}
/***
 * 点击购物车图标，弹出购物车窗体
 * type:0 :推荐列表数据，1；商品列表数据，2：商品详情数据
 */
function openWindow(item,type,flag){
	//隐藏底部导航
	bottomNav('hide');
	
	var title=null;
	var imgPath = null;
	var discountPrice =null;
	var storageNum = null;
	var existExtra = "0";
	var goodsId = null;//商品ID
	var activityCommodityId = null;//如果参加了活动，则需要根据此id去缓存中计算剩余可购买量
	var skuId = null;//如果有辅助属性，那么此值将会为空
	var lowPrice = null;//最小价格
	var maxPrice = null;//最大价格
	var buyType = "COMMON_BUY";//购买类型，默认为普通购买
	var vm = ff.page.vm();
	
	if( type=='0' ){
		title = item.title1;
		imgPath = item.imgPath;
		discountPrice = item.discountPrice;
		storageNum = item.storageNum;
		existExtra = item.existExtra;
		goodsId = item.goodsId;
		//如果有辅助属性，则为NULL
		skuId = item.skuId && item.skuId.length>0?item.skuId:null;
		if(existExtra && existExtra=="1"){
			skuId = null;
		}
		lowPrice = item.lowPrice;
		maxPrice = item.maxPrice;
	}else if( type=='1' ){
		title = item.finalTitle;
		imgPath = item.finalImageUrl;
		discountPrice = item.finalPrice;
		storageNum = item.storageNum;
		existExtra = !item.skuId?"1":"0";
		goodsId = item.commodityId;
		activityCommodityId = item.activityId && item.activityId.length>0?item.activityId:null;
		skuId = item.skuId && item.skuId.length>0?item.skuId:null;
		lowPrice = item.lowPrice;
		maxPrice = item.maxPrice;
		buyType = item.showType&&item.showType!=""?item.showType:buyType;
	}else if( type=='2' ){//普通商品是goods
		title = item.goods.title1;
		imgPath = item.goods.imgPath;
		discountPrice = item.goods.discountPrice;
		storageNum = item.goods.storageNum;
		existExtra = item.goods.existExtra;
		goodsId = item.goods.goodsId;
		activityCommodityId = item.activityGoods?item.activityGoods.activityCommodityId:null;
		skuId = item.goods.skuId && item.goods.skuId.length>0?item.goods.skuId:null;
		lowPrice = item.goods.lowPrice;
		maxPrice = item.goods.maxPrice;
		buyType=item.goodsType&&item.goodsType!=""?item.goodsType:buyType;
	}else if( type=='3' ){//抢购活动有限购数量
		title = item.activityGoods.title1;
		imgPath = item.activityGoods.imgPath;
		discountPrice = item.activityGoods.discountPrice;
		if(null != item.activityGoods.idLimit && 0 != item.activityGoods.idLimit && item.activityGoods.surplusNum > item.activityGoods.idLimit)
		{
			storageNum = item.activityGoods.idLimit;

		}
		else
		{
			storageNum = item.activityGoods.surplusNum;
		}	
		existExtra = item.activityGoods.existExtra;
		goodsId = item.activityGoods.goodsId;
		activityCommodityId = item.activityGoods?item.activityGoods.activityCommodityId:null;
		skuId = item.activityGoods.skuId && item.activityGoods.skuId.length>0?item.activityGoods.skuId:null;
		lowPrice = item.activityGoods.lowPrice;
		maxPrice = item.activityGoods.maxPrice;
		buyType=item.goodsType&&item.goodsType!=""?item.goodsType:buyType;
	}else if( type=='4' ){//普通活动无限制数量
		title = item.activityGoods.title1;
		imgPath = item.activityGoods.imgPath;
		discountPrice = item.activityGoods.discountPrice;
		storageNum = item.activityGoods.storageNum;
		existExtra = item.activityGoods.existExtra;
		goodsId = item.activityGoods.goodsId;
		activityCommodityId = item.activityGoods?item.activityGoods.activityCommodityId:null;
		skuId = item.activityGoods.skuId && item.activityGoods.skuId.length>0?item.activityGoods.skuId:null;
		lowPrice = item.activityGoods.lowPrice;
		maxPrice = item.activityGoods.maxPrice;
		buyType=item.goodsType&&item.goodsType!=""?item.goodsType:buyType;
	}
	
	vm.cartObj.title = title;
	vm.cartObj.image = imgPath;
	vm.cartObj.salePrice = discountPrice;
	vm.cartObj.total = discountPrice;
	vm.cartObj.cartNum = 1;
	vm.cartObj.storageNum = storageNum;
	vm.cartObj.skuId = skuId;
	vm.cartObj.buyType = buyType;
	vm.cartObj.activityCommodityId = activityCommodityId;
	if(existExtra=='1'){
		vm.cartObj.windowType="half";
		//初始化价格，可能是一个价格区间
		if(lowPrice && maxPrice && lowPrice!=maxPrice){
			vm.cartObj.salePrice = lowPrice +" ~ " + maxPrice;
		}
		initAttr(goodsId,activityCommodityId);
	}else{
		vm.cartObj.windowType="half-attr";
	}
	
	//用作标识，如果是立即购买，则此值为BUY，否则无值
	vm.cartObj.flag = flag?flag:null;
}


/***
 * 初始化商品属性
 */
function initAttr(goodsId,activityId){
	console.log(goodsId+"========"+activityId)
	//清空VM属性数据
	ff.page.vm().cartObj.attrList = []; 
	ff.page.vm().cartObj.originElems = [];
	
	ff.page.submit({
 		url:"CommodityAttr/LoadAll",
 		condition:{goodsId:goodsId,activityId:activityId},
 		success:function(data)
 		{	
 			if(!data.obj || data.obj.length==0){
 				return;
 			}
 			//开始计算属性
  			eachAttr(data.obj);
 		}
 	});
}

function eachAttr(items){
	var originElems = [];//原始数据，用来做页面元素点击联动处理
	var attrObjs = [];//页面需要显示的数据
	var attrNames = findAttrNames(items);
	//构建属性名
	$.each(attrNames,function(index,obj){
		attrObjs[index] = {
			name:obj,//属性名	
			attrs:[]//下面的属性值集合
		};
	})
	
	//构建属性值
	for(var i = 0 ; i<items.length ; i++){
		var commodityAttributeValues = items[i].commodityAttributeValues;
		if(!commodityAttributeValues)continue;
		var valuesArr = commodityAttributeValues.split(",");//得到结果如===>>> 红色，XL,纯棉
		//构建原始数据
		originElems[originElems.length] = {
			image:items[i].smallImage,
			attributeValues:commodityAttributeValues,
			storageNum:items[i].stockUsed?items[i].stockUsed.currStockNum:0,
		    price:items[i].favourablePrice.toFixed(2),
		    skuId:items[i].id
		};
		
		//构建页面需要显示的数据===>>>start
		$.each( valuesArr,function(vIndex,vObj){
			var flag = false;//标记是否已存在该属性
			var attrs = attrObjs[vIndex].attrs;
			$.each(attrs,function(aIndex,aObj){
				if(aObj==vObj){
					flag = true;
					return;
				}
			});
			if(!flag){
				attrs[attrs.length] = vObj;
			}
		})
		//===>>>end
		
	}
	ff.page.vm().cartObj.attrList = attrObjs;
	ff.page.vm().cartObj.originElems = originElems;
}

/***
 * 取得属性名
 * @param items
 * @returns
 */
function findAttrNames(items){
	var firstItem = null;
	$.each(items,function(index,obj){
		firstItem = obj.commodityAttributes;
		if(firstItem)return;
	});
	return firstItem.split(",");
	
}

/***
 * ==========================================属性点击==============================================
 * @param item
 */
function clickAttr(item,obj){
	//检查是否允许点击
	var rgbText = $(obj).css("color");
	if(rgbText){
		if( "#bbbbbb"== rgb2hex(rgbText) )return;
	}
	var vm = ff.page.vm();
	//凡是有一个大类下的属性没有选择，则不允许增加或减少数量；也不可以点击确定（点击确定关闭窗体，其它则无反应）
	//若全部选择完毕，则生成skuId，改变价格，切换库存数量
	vm.cartObj.skuId=null;
	changeCurrentObjStyle(obj);
	changeGroupAttrStyle(obj);
	changeStyleByStorageNum();
}

/***
 * 如果点击的是已经点击过的，则移除样式； no_StorageNum
 * @param obj
 */
function changeCurrentObjStyle(obj){
	var classValue = $(obj).attr("class");
	if( classValue=="active" ){
		 $(obj).attr( "class", "" );
	}else{
		$(obj).attr( "class","active" );
	}
}

/***
 * 如果选择的是当前大类中的属性，且该大类已有选择属性，则移除当前大类中其它已选择的样式，并高亮当前选中属性；
 * @param obj
 */
function changeGroupAttrStyle(obj){
	var parentObj = $(obj).parent().parent();
	var allElem = $(parentObj).find("ul>li[class='active']");
	$.each(allElem,function(index,aObj){
		if(aObj!=obj){
			 $(aObj).attr( "class", "" );
		}
	});
}

/***
 * 如果当前属性中没有任何一个是处于点击状态，则全部可选；
 * 凡是有一个是处于点击状态，则便利判断库存；切换样式；
 */
function changeStyleByStorageNum(){
	var flag = checkAllAttr();
	if(!flag){
		//没有选中任何元素，则全部可选
		$.each( $("div[class='pro-color pro-block']"),function(index,obj){
			var attrs = $(obj).find("ul>li")
			$.each(attrs,function(aIndex,aObj){
				$(aObj).css("color","");
			});
		});
		return;
	}
	
	//根据库存决定是否可选中
	var vm = ff.page.vm();
	var allAttrs = findSelectedAttr();//取得被选中的元素
	var allAttrsArr = allAttrs.split(",");
	var originElems = vm.cartObj.originElems;//原始数据
	var imgPath = null;//图片路径
	//先取得图片路径，取第一个匹配的数据
	$.each(originElems,function(index,obj){
		var attributeValues  = obj.attributeValues;
		var flag = true;//是否匹配
		for( var i = 0 ;i<allAttrsArr.length;i++ ){
			if( !eqArrText(attributeValues,allAttrsArr[i]) ){
				flag = false;
				break;
			}
		}
		if( flag ){
			imgPath = obj.image;
			return false;
		}
	});
	
	$.each( $("div[class='pro-color pro-block']"),function(index,obj){
		var liAttrs = $(obj).find("ul>li")
		var groupArr = findGroupAttr (liAttrs);
		$.each(liAttrs,function (lIndex,lObj){
			
			var flag = judgeAllowShow(lObj,allAttrs,groupArr,originElems);
			
			if(flag){
				$(lObj).css("color","");
			}else{
				$(lObj).css("color","#BBBBBB");
			}
			
//			var attrText = $(lObj).text();
//			var flag = false;//是否显示
//			for( var j = 0 ; j<beStorageNumArr.length;j++ ){
//				var bObj = beStorageNumArr[j];
//				if( eqArrText(bObj,attrText) ){
//					flag = true;
//					break;
//				}
//			}
//			if(flag){
//				$(lObj).css("color","");
//			}else{
//				$(lObj).css("color","#BBBBBB");
//			}
			
		});
	});
	//改变图片
	changeImage(imgPath);
	//改变价格等数据
	checkIsSelectAll(allAttrs);
}

/***
 * 检查是否有元素被选中
 * @returns {Boolean}
 */
function checkAllAttr(){
	//记录是否有属性为选中状态
	var flag = false;
	$.each( $("div[class='pro-color pro-block']"),function(index,obj){
		var attrs = $(obj).find("ul>li[class='active']")
		if( attrs && attrs.length>0 ){
			flag = true;
			return false;
		}
	});
	return flag;
}

/***
 * 凡是有一个是处于点击状态，则需要改变图片路径
 * selectesAttrs 当前被选中的元素集合
 */
function changeImage(imgPath){
	imgPath = FFWX.vm.base.img(imgPath);
	var vm = ff.page.vm();
	vm.cartObj.image = imgPath;
}

/***
 * 检查子属性是否全部被选中，若全部被选中，则需要改变价格以及当前库存，已经生成sku，否则反之;
 */
function checkIsSelectAll( allAttrs ){
	var vm = ff.page.vm();
	if( !allAttrs ){
		allAttrs = findSelectedAttr();
	}
	if( allAttrs.length==0 )return false;
	
	//对比长度
	var size = $("div[class='pro-color pro-block']").length;
	var allAttrsArr = allAttrs.split(",");
	if( allAttrsArr.length<size ){
		return false;
	}
	//改变数据 
	var originElems = vm.cartObj.originElems;//原始数据
	var finalObj = null;//最终匹配的数据
	$.each(originElems,function(index,obj){
		var attributeValues  = obj.attributeValues;
		var flag = true;//是否完全匹配
		for( var i = 0 ;i<allAttrsArr.length;i++ ){
			if( !eqArrText(attributeValues,allAttrsArr[i]) ){
				flag = false;
				break;
			}
		}
		if(flag){
			finalObj = obj;
			return false;
		}
	});
	vm.cartObj.salePrice = finalObj.price;
	vm.cartObj.storageNum = finalObj.storageNum;
	vm.cartObj.skuId = finalObj.skuId;
	updateTotal(vm.cartObj.cartNum,vm);
	return true;
}

/***
 * 取得被选中的元素
 */
function findSelectedAttr(){
	var allAttrs = "";
	$.each( $("div[class='pro-color pro-block']"),function(index,obj){
		var attrs = $(obj).find("ul>li[class='active']")
		if( attrs && attrs.length>0 ){
			if(allAttrs.length>0){
				allAttrs += ",";
			}
			allAttrs+=$(attrs[0]).text();
		}
	});
	return allAttrs;
}

function eqArrText(arrStr,str){
	var arr = arrStr.split(",");
	for(var i = 0 ; i<arr.length ; i++){
		if( arr[i] == str ){
			return true;
		}
	}
	return false;
}


function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/***
 * 判断某元素是否允许显示
 * item 当前需要判断的属性
 * allAttrs 当前选中的所有属性
 * groupAttr 当前属性对应的一组属性数据
 * originElems 原始属性数据
 */
function judgeAllowShow(item,allAttrs,groupAttr,originElems){
	var flag = false;
	var allAttrsArr = allAttrs.split(",");
	var text = $(item).text();
	var finalAttr = "";
	for( var i = 0 ; i<allAttrsArr.length ; i++ ){

		if( -1!= $.inArray(allAttrsArr[i],groupAttr) ){
			if(allAttrsArr.length==1){
				return true;
			}
			continue;
		}
		finalAttr += (allAttrsArr[i]+",");
	}
	
	
	var newAllAttrsArr = (finalAttr+text).split(",");
	
	for(var j = 0 ; j<originElems.length ; j++){
		var oElem = originElems[j];
		flag = true;
		for( var k = 0 ; k<newAllAttrsArr.length ; k++ ){
			if( !eqArrText(oElem.attributeValues,newAllAttrsArr[k]) ){
				flag = false;
				break;
			}
		}
		if(Number(oElem.storageNum)<=0){
			flag = false;
		}
		if(flag){
			return flag;
		}
		
	}
	
	
	return flag;
	
}
/***
 * 获得一组属性
 */
function findGroupAttr(item){
	var result=[];
	$.each(item,function (index,obj){
		result[index] = $(obj).text()
	});
	return result;
}
ff.page.init({
	vm:{
		isShowRedPoint:true,
		statusNum:{},
		recommendList:[],
		member:{
			id:"",
			phone:"",
			nickName:"",
			pictureUrl:"",
			gender:""
		},
		cartObj:{//购物车
			title:"",//商品标题
			image:"",//商品图片
			salePrice:'0.0',//优惠售价
			attrList:[],//属性列表
			originElems:[],//原始数据
			activityCommodityId:null,
			cartNum:1,//加入购物车的数量
			storageNum:0,//当前商品库存数
			total:0,//合计价格
			skuId:"",//当前指向的sku
			windowType:"",//窗体类型 half or half-attr
			buyType:"",//购买类型
			flag:""
		},
		couponList:function(){
			var status = "0";
			ff.page.go({url:"Coupon/My",data:{status:status}});
		},
		toOrderList:function(status,title){
			ff.page.go({url:"Order/Index",title:title,data:{status:status}});
		},
	    help:function(){
	    	var base = $("#base").val();
	    	location.href = "http://app-client.ffzxnet.com/app-client-web/ebsite/suggestMobile/help.do";
	    }   
       },
	afterLoad:function(vm)
	{
		var vm = ff.page.vm();
		ff.page.submit({
			url : "Message/FindunReadCount",
			success : function(data) {
				if (data.obj <= 0) {
					$("#msg_red_point").hide();
					vm.isShowRedPoint=false;
				}else{
					$("#msg_red_point").show();
					vm.isShowRedPoint=true;
				}
			}
		});
		ff.page.submit({
			url : "Order/getOrderStatusNum",
			success : function(data) {
				if(ff.util.isSuccess(data)){
					vm.statusNum = data.obj;
	 			}
			}
		});
		initMemberInfo ( vm );
		initRecommendCommodityList( vm );
	}
});

/***
 * 初始化用户详细信息
 */
function initMemberInfo( vm ){
	ff.page.submit({
		url:'MemberInfo/findMemberInfo',
		success:function(rsp)
	    {
			var obj = rsp.obj;
			vm.member.id = obj.id;
			vm.member.phone = obj.phone;
			vm.member.nickName = obj.nickName;
			vm.member.pictureUrl = obj.pictureUrl;
			vm.member.gender = obj.gender;
			ff.util.show(rsp.message);
	    }
	});
}

/***
 * 初始化推荐商品列表 ，不分页，获取15条
 */
function initRecommendCommodityList( vm ){
	ff.page.submit({
 		url:"RecommendCommodity/Load",
 		condition:{cid:null,homeType:1},
 		page:{currentPage:1,pageSize:15},
 		success:function(data)
 		{	
 			vm.recommendList = data.obj.dataList;
 		}
 	});
}

/***
 * 点击头像，进入个人详细信息页
 */
function photoClick(){
	var vm = ff.page.vm();
	var member = vm.member;
	ff.page.go({url:"My/Setting",data:{
		id:member.id,
		phone:member.phone,
		nickName:member.nickName,
		pictureUrl:member.pictureUrl,
		gender:member.gender
		}
	});
}

//推荐商品点击跳转
function clickRecommendCommodity(item){
	var goodsId = item.$model.goodsId;
	ff.page.go({url:"Commodity/Detail",data:{goodsId:goodsId}});
}

/***
 * 判断是否有货
 * @param obj
 */
function judgeEnough(obj){
	return obj.$model.storageNum && obj.$model.storageNum>0?true:false;
}


        

          

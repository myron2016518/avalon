
var advertUrl = "AdvertRegion/LoadAll";//请求广告数据
var panicUrl = "ActivityCommodity/Load";//请求抢购数据
var messageUrl = ""//请求消息数量数据
var recommentCateUrl = "Category/LoadAll" ;//请求为您推荐类目数据
var recommentInfoUrl = "RecommendCommodity/Load" ;//请求为您推荐列表数据
var $cid = "";//当前推荐类别
ff.page.init({
	vm:{
		homebannerList: [],//banner
		homeicoList: [],//8个广告位
		homeFavList :[],//聚特惠
		homenewsList: {},
		homeseckillList:[],//抢购商品列表
		bannerOne: {}, //banner1
		homeSelected: {},//麦场精选
		bannerTwo: {},//banner2
		homeHotMarket: {},//热门市场
		bannerThree: {},//banner3
		homeTabList: [],//为您推荐类目
		homeTabDefaultId: 0,//标识
		homeTabListItem: [],//同类商品数据
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
    		//noMore(true);
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
    afterLoad:function(vm){
    	fillVMDate(vm);
    	ff.service.loadCartNum();
    	findMessageCount();
    	
    	/*var $twoButtonSroll = document.getElementsByClassName('twoButton');
		
		$twoButtonSroll[0].onclick = function() {
			$('#content').animate({scrollTop: '0px'}, 800);

		};*/
    }
 });
	
/***
 * 填充VM数据
 */
function fillVMDate(vm){
	ff.page.submit({
 		url:advertUrl,
 		condition:{number:"AD_INDEX"},
 		success:function(data)
 		{
 			vm.homebannerList=data.obj[0].adverts;
 			vm.homeicoList = data.obj[1].adverts;
 			
 			if( vm.homeicoList.length>8 ){
 				var bgImg = FFWX.vm.base.img(vm.homeicoList[8].imgPath);
 				$(".homeico").css("background","url('"+ bgImg +"')");
 			}
 			vm.homeFavList = data.obj[2].adverts;
 			vm.bannerOne = data.obj[3].adverts[0];
 			
 			vm.homeSelected = data.obj[4];
 			vm.homeSelected.itemOne = data.obj[4].adverts[0];
			vm.homeSelected.itemRowTwo = [ data.obj[4].adverts[1], data.obj[4].adverts[2]];
			vm.homeSelected.itemCellTwo = [ data.obj[4].adverts[3], data.obj[4].adverts[4]];
 			
 			vm.bannerTwo = data.obj[5].adverts[0];
 			
 			vm.homeHotMarket = data.obj[6];
 			vm.homeHotMarket.itemRowTwo = [data.obj[6].adverts[0],data.obj[6].adverts[1]];
 			vm.homeHotMarket.itemCellThree = [data.obj[6].adverts[2],data.obj[6].adverts[3],data.obj[6].adverts[4],
 			                                 data.obj[6].adverts[5],data.obj[6].adverts[6],data.obj[6].adverts[7]];
 			
 			vm.bannerThree = data.obj[7].adverts[0];
 			
 			initPage();
  		}
 	});
	
	//抢购数据
	ff.page.submit({
		url:panicUrl,
		page:{currentPage:1,pageSize:10},
		success:function(data)
		{	
			vm.homeseckillList = data.obj.dataList;
		}
	});
	
	//推荐类目数据
	ff.page.submit({
 		url:recommentCateUrl,
 		condition:{id:null,findType:'1'},
 		
 		success:function(data)
 		{	
 			vm.homeTabList.pushArray(data.obj);
 		}
 	});
	
	show_commoditys(null);
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

//点击类目获取同类商品推荐数据
function show_commoditys(cid){
	$cid = cid;
	var vm = ff.page.vm();
	vm.page.currentPage=1;//继续第一页
	noMore(false);
	if(vm.homeTabDefaultId === cid) return;
	vm.homeTabDefaultId = cid;			
	ff.page.submit({
 		url:recommentInfoUrl,
 		condition:{cid:cid,homeType:1},
 		page:vm.page,
 		isPage:true,
 		success:function(data)
 		{	
 			vm.homeTabListItem = data.obj.dataList;
 		}
 	});
}

 

//更多抢购点击跳转
function clickPanicList(){
	ff.page.go({url:"ActivityCommodity/Index"});
}

//抢购商品点击跳转
function clickPanicInfo(item){
	var activityId = item.$model.activityId;
	ff.page.go({url:"ActivityCommodity/Detail",data:{activityCommodityId:activityId}});
}

//购物车点击
function clickAddCart(item){
	var cart = {};
//	cart.skuCode = item.skuCode;
	cart.skuId = item.skuId;
	cart.cartNum = 1;
	ff.page.submit({
		url:'Cart/Create',
		data:cart,
		success:function(rsp)
	    {
			ff.util.show(rsp.message);
	    }
	});
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

//广告点击跳转
function clickAdvert(item){console.log(item)
	var $model = item.$model;
	var type = !$model||$model==null?item.type:$model.type;//广告类型
	var url = !$model||$model==null?item.url:$model.url;//跳转url（广告类型为WEB或者优惠券）
	var objId = !$model||$model==null?item.objId:$model.objId;
	if(type==="CATEGORY_LIST"){//分类列表
		ff.page.go({
			url:"Commodity/Index",title:item.title,data:{cid:objId,desc:1,sort:"sales"}
		});
	}else if(type==="PRESALE_LIST"){//预售列表 (TODO 暂无)
//		ff.page.go({url:"",data:{}});
		ff.util.show("敬请期待");
	}else if(type==="PRESALE_DETAIL"){//预售详情 (TODO 暂无)
//		ff.page.go({url:"",data:{}});
		ff.util.show("敬请期待");
	}else if(type==="PANICBUYING_LIST"){//抢购列表
		ff.page.go({url:"ActivityCommodity/Index"});
	}else if(type==="PANICBUYING_DETAIL"){//抢购详情
		ff.page.go({url:"ActivityCommodity/Detail",data:{activityCommodityId:objId}});
	}else if(type==="ORDINARYGOODS_DETAIL"){//普通商品详情
		ff.page.go({url:"Commodity/Detail",data:{goodsId:objId}});
	}else if(type==="ACTIVITY_LIST"){//活动列表
		ff.page.go({url:"ActivityCommodity/List",data:{activityId:objId}});
	}else if(type==="WHOLESALE_LIST"){//批发列表 (TODO 暂无)
//		ff.page.go({url:"",data:{}});
		ff.util.show("敬请期待");
	}else if(type==="NEWUSER_LIST"){//新用户专享列表(TODO 暂无)
		ff.util.show("敬请期待");
//		ff.page.go({url:"ActivityCommodity/List",data:{activityId:objId}});
	}else if(type==="MENU_TYPE"){//菜单类型 (TODO 暂无)
		//TODO
		//ff.util.show("敬请期待");
	}else if(type==="BACKGROUND_IMAGE"){//背景图片 (TODO 暂无)
		//TODO
		ff.util.show("敬请期待");
	}else if(type==="WEB_LINK"){//WEB链接
		ff.page.go({url:url,data:{}});
	}else if(type=="SECOND_VIEW"){//会场广告（二级页面）
		//TODO
		ff.util.show("敬请期待");
	}else if(type==="COUPON_VIEW"){//优惠券
		ff.page.go({url:"Coupon/Index",data:objId});
	}else if(type==="REWARD_VIEW"){//领取红包
		ff.util.show("敬请期待");
	}else {//其他活动
		ff.util.show("敬请期待");
	}
	
}

function initPage(){
	requirejs(['swiper'], function() {
		console.log(FFWX.currPage + ' after rendered');

		$(".swiper-container").swiper({autoplay: 5000,autoplayDisableOnInteraction : false,pagination: '.swiper-pagination',paginationClickable: true,loop: true,autoHeight: true});
		
		setTimeout(function() {
			/* .find_nav   左右滑动，点击居中效果 ，其改变值后改变数据事件依然在 tab_click  中实现 。            strat */
			$('.find_nav ul').append('<li class="sideline"></li>');
			
			var _name = '';
		    var _left = 0;
		    $(".find_nav_list").css("left",_left+"px");
		    $(".find_nav_list li").each(function(){
		        if($(this).find("a").text()==_name){
		            $(".sideline").css({left:$(this).position().left});
		            $(".sideline").css({width:$(this).outerWidth()});
		            $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
		            _name = _name;
	
		            return false
		        }
		        else{
		            $(".sideline").css({left:0});
		            $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
		        }
		    });
		    var nav_w=$(".find_nav_list li").first().width();
		    $(".sideline").width(nav_w);
		   // $(document).on('click', '.find_nav_list li', function() {
		        $(".find_nav_list li").on('click', function(){
		        nav_w=$(this).width();
		        $(".sideline").stop(true);
		        $(".sideline").animate({left:$(this).position().left},300);
		        $(".sideline").animate({width:nav_w});
		        $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
		        var fn_w = ($(".find_nav").width() - nav_w) / 2;
		        var fnl_l;
		        var fnl_x = parseInt($(this).position().left);
		        if (fnl_x <= fn_w) {
		            fnl_l = 0;
		        } else if (fn_w - fnl_x <= flb_w - fl_w) {
		            fnl_l = flb_w - fl_w;
		        } else {
		            fnl_l = fn_w - fnl_x;
		        }
		        $(".find_nav_list").animate({
		            "left" : fnl_l
		        }, 300);
		        _left=fnl_l;
		        var c_nav=$(this).find("a").text();
	
		       _name = c_nav;
		    });
		    var fl_w=$(".find_nav_list").width();
		    var flb_w=$(".find_nav_left").width();
		   // $(document).on('touchstart', '.find_nav_list li', function(e) {
		        $(".find_nav_list").on('touchstart', function (e) {
		        var touch1 = e.originalEvent.targetTouches[0];
		        x1 = touch1.pageX;
		        y1 = touch1.pageY;
		        ty_left = parseInt($(this).css("left"));
		    });
		    
		    //$(document).on('touchmove', '.find_nav_list li', function(e) {
		    $(".find_nav_list").on('touchmove', function (e) {
		        var touch2 = e.originalEvent.targetTouches[0];
		        var x2 = touch2.pageX;
		        var y2 = touch2.pageY;
		        if(ty_left + x2 - x1>=0){
		            $(this).css("left", 0);
		        }else if(ty_left + x2 - x1<=flb_w-fl_w){
		            $(this).css("left", flb_w-fl_w);
		        }else{
		            $(this).css("left", ty_left + x2 - x1);
		        }
		        if(Math.abs(y2-y1)>0){
		            e.preventDefault();
		        }
		    });
		    /* .find_nav   左右滑动，点击居中效果，其改变值后改变数据事件依然在 tab_click  中实现 。     end */
		    $(".find_nav_list li:first").attr("class","find_nav_cur");
		},500);
	});
}



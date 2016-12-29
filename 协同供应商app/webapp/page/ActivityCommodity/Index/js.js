ff.page.init({
	vm:{
 		sub_list: {},
 		adverList:[],
		select_tab:'0',
		select_item:{},
		is_RemindType:'-1',
		getAdver:getAdver,
		clickAdvert:clickAdvert,
		homeicoList:[],
		tab_change: tab_change,
		time_down:0,
		is_remind:is_remind,
		timer:timer,
		item_click:item_click,
		itemRecommend_click:itemRecommend_click
       },
	url:'Load',
	title:'大麦场-限时秒杀',
	success:function(rsp)
	{
		var vm = ff.page.vm();
		if(null != rsp.obj && null != rsp.obj.dataList && rsp.obj.dataList.length > 0)
		{
			vm.obj = rsp.obj.dataList;
			vm.time_down = vm.obj[0].panicDate.rangeDate;
		}	
		else
		{
			vm.obj = [];
		}
		timer();
	},
	loadMore:function(page,flag){
    	if(!flag){
    		return;
    	}
    	var vm = ff.page.vm();
     	ff.page.submit({
     		url:'Load',
     		condition:vm.select_item,
     		page:page,
     		isPage:true,
     		success:function(rsp)
     		{
      			if(null != rsp.obj && null != rsp.obj.dataList && rsp.obj.dataList.length > 0)
     			{
      				vm.obj.pushArray(rsp.obj.dataList);
     				vm.time_down = vm.obj[0].panicDate.rangeDate;
     			}	
        	}
     	});
     	
    },
	afterLoad:function(vm)
	{
		vm.select_tab='0';
 		ff.page.submit({
	 		url:'findPanicCategory',
 	 		success:function(rsp)
	 		{
 	 			vm.sub_list = rsp.obj;
 	  		}
	 	});
 		getAdver();
 		
  	}
 
});

function getAdver(){
	var vm = ff.page.vm();
 	ff.page.submit({
 		url:'AdvertRegion/LoadAll',
 		condition:{number:'PANIC_BANNER'},
 		success:function(rsp)
 		{
 			vm.homeicoList = rsp.obj[0].adverts;
 			
 			setTimeout(function() {
 	 			requirejs(['swiper'], function() {
 	 				var swiper = new Swiper('.swiper-container', {
 	 					autoplay: 5000,
 	 					autoplayDisableOnInteraction : false,
 	 					pagination: '.swiper-pagination',
 	 					paginationClickable: true,
 	 					loop: true,
 	 					autoHeight: true
 	 				});
 	 				
 	 				//var swiperWidth = $(".swiper-slide").width();
 	 				//$(".swiper-wrapper").height(swiperWidth);
 	 				
 	 			});
 	 			
 	 			/* .find_nav   左右滑动，点击居中效果 ，其改变值后改变数据事件依然在 tab_click  中实现 。            strat */
 				//$('.find_nav ul').append('<li class="sideline"></li>');
 				
 				var _name = '';
 			    var _left = 0;
 			    $(".find_nav_list").css("left",_left+"px");
 			    $(".find_nav_list li").each(function(){
 			        if($(this).find("a").text()==_name){
 			           // $(".sideline").css({left:$(this).position().left});
 			           // $(".sideline").css({width:$(this).outerWidth()});
 			         //   $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
 			            _name = _name;
 		
 			            return false
 			        }
 			        else{
 			          //  $(".sideline").css({left:0});
 			          //  $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
 			        }
 			        
 			    });
 			    var nav_w=$(".find_nav_list li").first().width();
 			    //$(".sideline").width(nav_w);
 			   // $(document).on('click', '.find_nav_list li', function() {
 			        $(".find_nav_list li").on('click', function(){
 			        nav_w=$(this).width();
 			      //  $(".sideline").stop(true);
 			      //  $(".sideline").animate({left:$(this).position().left},300);
 			      //  $(".sideline").animate({width:nav_w});
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
 			  //  $(".find_nav_list li.current").addClass("find_nav_cur");
 			    $(".find_nav_list li.current").click();
 				
 	 			},500);
    	}
 	});
}


//广告点击跳转
function clickAdvert(item){
	var $model = item.$model;
	var type = !$model||$model==null?item.type:$model.type;//广告类型
	var url = !$model||$model==null?item.url:$model.url;//跳转url（广告类型为WEB或者优惠券）
	var objId = !$model||$model==null?item.objId:$model.objId;
	if(type==="CATEGORY_LIST"){//分类列表
		ff.page.go({
			url:"Commodity/Index",data:{cid:objId,desc:1,sort:"sales"}
		});
	}else if(type==="PRESALE_LIST"){//预售列表 (TODO 暂无)
		ff.page.go({url:"",data:{}});
	}else if(type==="PRESALE_DETAIL"){//预售详情 (TODO 暂无)
		ff.page.go({url:"",data:{}});
	}else if(type==="PANICBUYING_LIST"){//抢购列表
		ff.page.go({url:"ActivityCommodity/Index",data:{defaultPanic:"1"}});
	}else if(type==="PANICBUYING_DETAIL"){//抢购详情
		ff.page.go({url:"ActivityCommodity/Detail",data:{activityCommodityId:objId}});
	}else if(type==="ORDINARYGOODS_DETAIL"){//普通商品详情
		ff.page.go({url:"Commodity/Detail",data:{goodsId:objId}});
	}else if(type==="ACTIVITY_LIST"){//活动列表
		ff.page.go({url:"",data:{}});
	}else if(type==="WHOLESALE_LIST"){//批发列表 (TODO 暂无)
//		ff.page.go({url:"",data:{}});
	}else if(type==="NEWUSER_LIST"){//新用户专享列表(TODO 暂无)
		ff.page.go({url:"",data:{}});
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

function is_remind(item,isRemind){

	//defaultPanic=0默认随便查  =1,查默认选中的数据
	var vm = ff.page.vm();
	var activityCommodityId=item.activityId;
	var goodsId=item.goodsId;
 
	ff.page.submit({
 		url:'updatePanicBuyRemind',
 		condition:{activityCommodityId:activityCommodityId,goodsId:goodsId,isRemind:isRemind},
 		success:function(rsp)
 		{
 			item.isRemind = rsp.obj;
 			if(rsp.obj=='1'){//提醒我+1
 				item.remindCount=parseInt(item.remindCount)+1+"";
 			}else{

 				item.remindCount=parseInt(item.remindCount)-1+"";
 			}
   		}
 	});
}
function item_click(item)
{
	var  dataparam={activityCommodityId:item.activityId};
	ff.page.go({url:"ActivityCommodity/Detail",data:dataparam});
}

function itemRecommend_click(item)
{
	ff.page.go({url:"ActivityCommodity/Recommendlist",data:item});
}
 
function timer(){

	var vm = ff.page.vm();
	if(vm.time_down>0)
	{
		vm.time_down = vm.time_down - 1;
		var timeqj = vm.time_down;
		 if(document.getElementById("time_diff_span")!=null){
				if( timeqj!=null && timeqj!="")
 				 var hh = parseInt(timeqj  / 60 / 60 , 10);//计算剩余的小时数  
				 var mm = parseInt(timeqj  / 60 % 60, 10);//计算剩余的分钟数  
				 var ss = parseInt(timeqj  % 60, 10);//计算剩余的秒数  
				
				 var hhval = checkTime(hh);  
				 var mmhhval = checkTime(mm);  
				 var ssval = checkTime(ss); 
 			     if(hh<=0 && mm<=0 && ss<=0){
			    	 document.getElementById("time_diff_span").innerHTML = "";  
			         
			     }else{
			    		 document.getElementById("time_diff_span").innerHTML = "<i>"+  hhval + "</i><b>:</b><i>" + mmhhval + "</i><b>:</b><i>" + ssval + "</i>";  
			         
			     }
	     }
	}	
	else
	{
		if(document.getElementById("time_diff_span")!=null)
		{
			 document.getElementById("time_diff_span").innerHTML = ""; 	
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
function tab_change(item,defaultPanic)
{
	//defaultPanic=0默认随便查  =1,查默认选中的数据
	var vm = ff.page.vm();
	vm.select_tab = item.activityId;
	vm.select_item = item;
 
 	ff.page.submit({
 		url:'Load',
 		condition:item,
 		isPage:true,
 		success:function(rsp)
 		{
  			if(null != rsp.obj && null != rsp.obj.dataList && rsp.obj.dataList.length > 0)
 			{
 				vm.obj = rsp.obj.dataList;
 				vm.time_down = vm.obj[0].panicDate.rangeDate;
 			}	
  			else
  			{
  				vm.obj = [];
  			}
    	}
 	});
  	
}
 

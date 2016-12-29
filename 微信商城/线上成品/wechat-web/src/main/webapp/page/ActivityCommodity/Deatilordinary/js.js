ff.page.init({
	vm:{
 		sub_list: {},
		select_tab:'0',
		tab_change: tab_change,
		timer:timer,
		// 配送地址
		address_name:'',
		address_id:'',
		select_addr:{province:'',city:'',country:''},
		select_addr_name:{province:'请选择',city:'请选择',country:'请选择'},
		select_kind:'province',
		select_class:'',
		kind_class:'',
		addr_list:[],
		addr_change: addr_change,
		addr_click:addr_click,
		addr_kind_change: addr_kind_change,
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
	url:'Show',
	afterLoad:function(vm)
	{
		var para = ff.page.req();
		setTimeout(function() {
		requirejs(['swiper'], function() {
			console.log(1);
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true
			});
			var swiperWidth = $(".swiper-slide").width();
			$(".swiper-wrapper").height(swiperWidth);
		});
		},100);
		// 商品详情显示默认地址
		ff.page.submit({
	 		url:'MemberAddress/findDefReceiptAddress',
 	 		success:function(rsp)
	 		{
	 			vm.address_name = rsp.obj.fullAddress;
	  		}
	 	});
	}
});



var ts=-1;
function timer(){

	var vm = ff.page.vm();
	if(vm!=null && vm.obj!=null && vm.obj.activityGoods!=null ){
		if( vm.obj.activityGoods.leftSecond!=null &&  vm.obj.activityGoods.isPanicbuy=='1' ){
			var leftSecond=vm.obj.activityGoods.leftSecond;
			//leftSecond
			 if(document.getElementById("ordinary")!=null){
				if( ts <= 0)
					ts=leftSecond;
                var dd = parseInt(ts/ 60 / 60 / 24, 10);//计算剩余的天数 
                var hh = parseInt(ts / 60 / 60 % 24, 10);//计算剩余的小时数   
				 var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数  
				 var ss = parseInt(ts  % 60, 10);//计算剩余的秒数  
				
				 var hhval = checkTime(hh);  
				 var mmhhval = checkTime(mm);  
				 var ssval = checkTime(ss); 
				 ts--;
			     if(hh<=0 && mm<=0 && ss<=0){
			    	 document.getElementById("ordinary").innerHTML = "";  
			         
			     }else{
			    		 document.getElementById("ordinary").innerHTML = "<p>距结束：<span>"+  dd + "</span>天<span>" + 
			    		 hhval + "</span>小时<span>" + 
			    		 mmhhval + "</span>分<span>" + ssval + "</span>秒</p>";  
			         
			     }
			 }
		}
	}
}
function checkTime(i)    
{    
   if (i < 10) {    
       i = "0" + i;    
    }    
   return i;    
}  
var timestop=setInterval(timer,1000);
function tab_change(item,defaultCheck)
{
	var vm = ff.page.vm();
	vm.select_tab = defaultCheck;
	
  	
}

/*=======================修改配送地址==========================*/
function addr_kind_change(item)
{
	var vm = ff.page.vm();
	var id = '0';
	if ('city' == item) 
	{
		vm.kind_class = vm.select_addr_name.city;
		id = vm.select_addr.province.id;
	}
	else if ('country' == item) 
	{
		vm.kind_class = vm.select_addr_name.country;
		id = vm.select_addr.city.id;
	}
	else
	{
		vm.kind_class = vm.select_addr_name.province;
	}
	vm.select_class = item;
	loadCitys(id);
}

function addr_change(item)
{
	var vm = ff.page.vm();
	
	$('.selectAddr li').removeClass('active');
	$('.address-list li').removeClass('active');
	if (item.type == '1')
	{
		vm.select_kind = 'province';
		vm.select_addr_name.province = item.name;
		// 选中省，显示市列表
		vm.select_class = 'city';
		$('#city').show();
	}		
	else if(item.type == '2')
	{
		vm.select_kind = 'city';
		vm.select_addr_name.city = item.name;
		// 选中市，显示区县列表
		vm.select_class = 'country';
		$('#country').show();
	}
	else if(item.type == '3')
	{
		vm.select_kind = 'country';
		vm.select_addr_name.country = item.name;
		// 选中区县，关闭选择框
		$('.addrClose').click();
		vm.address_id = item.id; // 最后选中的cityId
		vm.address_name = vm.select_addr_name.province + vm.select_addr_name.city + vm.select_addr_name.country; // 组合的配送地址
		vm.kind_class = ''; // 选中地址高亮样式 清空
		// 选择地址后，并查询商品可购买数
		setRedis();
	}
	vm.select_addr[vm.select_kind] = item;
	loadCitys(item.id);
	
}
function loadCitys(addrId)
{
	var vm = ff.page.vm();
	ff.page.submit({
 		url:'Address/FindBuyCitys',
 		condition:{parentId:addrId},
 		success:function(rsp)
 		{
 			vm.addr_list = rsp.obj;
  		}
 	});
}
// 点击修改地址
function addr_click()
{
	$('.selectAddr li').hide();
	$('.address-list li').removeClass('active');
	var vm = ff.page.vm();
	// 清空现有数据
	vm.select_addr_name = {province:'请选择',city:'请选择',country:'请选择'};
	vm.select_class = 'province';
	$('#province').show();
	loadCitys('0');
}
// 选择地址后，并查询商品可购买数
function setRedis()
{
	var vm = ff.page.vm();
	ff.page.submit({
 		url:'ActivityCommodity/FindCommodityAbleCount',
 		condition:{goodsId:vm.obj.activityGoods.goodsId,cityId:vm.address_id},
 		success:function(rsp)
 		{
 			var ableCount = rsp.obj;
 			// 如果返回的可购买数小于等于0，则该商品不可购买
 			if (ableCount <= 0) {
 				vm.obj.activityGoods.surplusNum = '0';
			}
  		}
 	});
}
ff.page.init({
	res:['ospinner'],
	vm:{
		obj:[],
		recommentList:[],
 		$spinnerOpt: {
 
			onDecrease : function(value) {
  
                  var obj =  $(this).closest('.change_num');
                  var sku = obj.attr('data-option');
                  modifyCart(sku,-1);
             },
            onIncrease : function(value) {
 
            	var obj =  $(this).closest('.change_num');
                var sku = obj.attr('data-option');
            	modifyCart(sku,1);
             }

		},
 		selected: [],
		ttl: 0,
		total_num:0,
		cartObj:{//购物车
			title:"",//商品标题
			image:"",//商品图片
			salePrice:'0.0',//优惠售价
			attrList:[],//属性列表
			originElems:[],//原始数据
			cartNum:1,//加入购物车的数量
			storageNum:0,//当前商品库存数
			activityCommodityId:null,
			total:0,//合计价格
			skuId:"",//当前指向的sku
			windowType:"",//窗体类型 half or half-attr
			buyType:"",//购买类型
			flag:"",
			reload:true
		},
		total: function(){
			var ttl = 0;
             var vm = ff.page.vm();
            var total_num = 0;
			$.each(vm.obj, function(idx, e){
				$.each(e.voList, function(idx, ele)
				{
					if ($.inArray(ele.id, vm.selected) > -1) {
						if(ele.cartNum != '')
						{
							if(isNaN(ele.cartNum) )
							{
								ele.cartNum = 1;
							}	
							
							ttl += ele.favourablePrice * ele.cartNum;
							total_num = total_num + parseInt(ele.cartNum);
						}
						
					}
				});
				
			});			
			vm.ttl = ttl;
			vm.total_num = total_num;			
		},
		changeNum:function(item)
		{
			var obj =  $(this).closest('.change_num');
            var sku = obj.attr('data-option');
            
            
            if(isNaN(item.cartNum))
			{
            	item.cartNum = 1;
			}
            if(item.cartNum > item.storageNum)
            {
            	item.cartNum = item.storageNum;
            }	
            modifyCart(sku,item.cartNum-item.old_num);
           
  
 		},
		changeBefore:function(item)
		{
			  
			 item.old_num = item.cartNum;
		},
		check_item: function(){
			var arr = [];			
			var isAllChecked = true;
			var $carList = $('.carList');
			var $checkbox = $carList.find(':checkbox');
			var len = $checkbox.length;
			var vm = ff.page.vm();
			
			$.each($carList.find(':checkbox'), function(idx, ele){
				
				if ($(this).is(':checked')) {
					arr.push(this.value);
				} else {
					isAllChecked = false;
				}
				
				if (idx == len - 1) {
					vm.selected = arr;
					$('.check-all').prop('checked', isAllChecked);
				}
			});			
			vm.total();
			
			if (FFWX.os == 'ios') reRender($('.settlement'));
		},
		
		check_all: function(){
			var $this = $('.check-all');
			var isChecked = $this.is(':checked');
			var $checkbox = $('.carList :checkbox');
			var len = $checkbox.length;
			var arr = [];

			var vm = ff.page.vm();
			$.each($checkbox, function(idx, ele){
				
				if($(this).prop("disabled"))
				{
					return;
				}	
				
				$(this).prop('checked', isChecked);
				
				if (isChecked) {					
					arr.push(this.value);
				}
				
				if (idx == len - 1) {
					vm.selected = arr;
					vm.total();
				}
			});
			
			if (FFWX.os == 'ios') reRender($('.settlement'));
		},
		del: function(id){
			
			ff.util.confirm({
				text:'确认要删除这件商品吗?',
				onOK:function()
				{
					var vm = ff.page.vm();
					ff.page.submit({url:'Delete',
						            data:id,
						            success:function(rsp)
						            {
						            	if(ff.util.isSuccess(rsp))
						            	{
						            		vm.selected.remove(id);
						            		vm.total(); 
						            		ff.page.reload();
						            		ff.service.loadCartNum();
						            		ff.util.show(rsp);
						            	}
							        }
			       });
				}
				
			});
			
  			 
		},
		del_all: function(){

			ff.util.confirm({
				text:'确认要清空购物车吗?',
				onOK:function()
				{
					var vm = ff.page.vm();
		 			ff.page.submit({url:'Delete',
						            success:function(rsp)
						            {
						            	if(ff.util.isSuccess(rsp))
						            	{
						            		vm.selected = [];
						            		vm.total();
						            		ff.page.reload();
		 					    			ff.util.show(rsp);
		 					    			ff.service.loadCartNum();
						            	}
		 				            }
					});
				}
				
			});
			
		},
		cart_rendered: function(){
			var vm = ff.page.vm();
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			
			this.timeout = setTimeout(function(){
				
				$('.carList button').bindFirst('click', function(){				
					vm.total();
				});
				
				$('.change_num input').on('keyup', function(){
					vm.total();
				});				
			}, 0);
		},
		create:function()
		{
			var vm = ff.page.vm();

			if(vm.selected.length == 0)
			{
				ff.util.show("请选择商品");
				return ;
			}	
			var selectObjs = [];
			for(index in vm.obj)
			{
				for(key in vm.obj[index].voList)
				{
					if(vm.selected.indexOf(vm.obj[index].voList[key].id) >= 0)
					{
						selectObjs.push(vm.obj[index].voList[key]);
					}	
				}	
				
			}	
			ff.page.go({url:"Pay/Index",data:selectObjs});
		},
		showDetail:function(item)
		{
			var type = item.activityType;
			// 跳转商品详情
			if ("PANIC_BUY" == type) { 	// 抢购详情
				var  dataparam={activityCommodityId:item.activityCommodityId};
				ff.page.go({url:"ActivityCommodity/Detail",data:dataparam});
			} else if("ORDINARY_ACTIVITY" == type){	// 普通活动商品详情
				var  dataparam={activityCommodityId:item.activityCommodityId};
				ff.page.go({url:"ActivityCommodity/Deatilordinary",data:dataparam});
			} else if(null != type){ // 其他商品详情
				ff.util.show("敬请期待");
			}
			// 普通商品详情
			if (null == type && "COMMON_BUY" == item.buyType) {
				var  dataparam={goodsId:item.commodityId};
				ff.page.go({url:"Commodity/Detail",data:dataparam});
			}
		}
		
 
    },
	url:'LoadAll',
	success:function(rsp)
	{
		var vm = ff.page.vm();
		avalon.scan();
		//vm.check_all();
		 
		//$('.check-all').click();
		vm.selected = [];
		vm.total();		
	},
	afterLoad: function(){
		var vm = ff.page.vm();			
		
		ff.page.submit({
	 		url:'RecommendCommodity/Load',
	 		page:{pageSize:20,currentPgae:1},
	 		isPage:true,
	 		success:function(data)
	 		{	
	 			vm.recommentList = data.obj.dataList;
	 			 
	 		}
	 	});
	}
});

function modifyCart(skuId,num)
{
	ff.page.submit({
		url:'Cart/Create',
		data:{skuId:skuId, cartNum: num},
		success:function(rsp)
	    {
			if(ff.util.isSuccess(rsp) ){
				ff.service.loadCartNum();
				ff.page.vm().total();
			}
	    }
	});
}

 
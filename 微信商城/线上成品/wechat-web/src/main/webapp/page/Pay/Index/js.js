ff.page.init({
	vm:{
		total_price:0,
		buy_price:0,
		total_num:0,
		addr:{},
		coupon:null,
		coupon_select:false,
		coupon_list:[],
		submit_enbale:true,
		submit:function()
		{

			var vm = ff.page.vm();
			if(null==vm.addr || null==vm.addr.id || ""==vm.addr.id)
			{
				ff.util.alert("请填写收货地址等信息");
				return;
			}	
			
			
			if(!vm.submit_enbale)
			{
				return;
			}	
			vm.submit_enbale = false;
			
 			ff.page.submit({url:"Order/Create",
				            data:buildOrder(),
				            success:function(rsp)
				            {
				            	if(ff.util.isSuccess(rsp))
				            	{
				            		ff.service.pay(rsp.obj.orderNo,function(result)
				            				{
				            			         if(result)
				            			         {
				            			        	ff.service.loadCartNum(); 
				            			         }
				            				});
				            	}	
				            	vm.submit_enbale = true;
				            },
				            error:function()
				            {
				            	vm.submit_enbale = true;
				            }
			});
	 
		},
		select_addr:function()
		{
			ff.temp = 'select_addr';
			ff.page.go({url:"MemberAddress/Index"});
		},
		select_coupon:function()
		{
			ff.temp = 'select_coupon';
			ff.page.go({url:"Coupon/ForOrder",data:buildOrder()});
		},
		check_coupon:function()
		{
			var vm = ff.page.vm();
			if(null == vm.coupon || null == vm.coupon.id)
			{
				vm.coupon_select = false;
			}	
			else
			{
				vm.coupon_select = !vm.coupon_select;
			}	
			if(vm.coupon_select)
	    	{
	    		vm.buy_price = vm.total_price - vm.coupon.amount;
	    	}
			else
			{
				vm.buy_price = vm.total_price;
			}	
		}
	},
	title:'确认下单',
    afterLoad:function(vm)
    {
    	if(null == ff.temp)
    	{
    		ff.page.submit({
        		url:'MemberAddress/findDefReceiptAddress',
        		success:function(rsp)
        		{
        			if(ff.util.isSuccess(rsp))
        			{
        				vm.addr = rsp.obj;
        			}	
        		}
        	});
    		
    		ff.page.submit({
        		url:'Coupon/ForOrder',
        		data:buildOrder(),
        		success:function(rsp)
        		{
        			if(ff.util.isSuccess(rsp))
        			{
        				vm.coupon_list = rsp.obj;
        			}	
        		}
        	});
    		vm.coupon_select = false;
        	vm.coupon = null;
    		
    	}
    	else
    	{
    		if(null != ff.temp_obj)
    		{
    			if('select_addr'==ff.temp)
            	{
            		vm.addr = ff.temp_obj;
            		ff.temp = null;
            		ff.temp_obj = null;
            	}
            	if('select_coupon'==ff.temp)
            	{
            		vm.coupon = ff.temp_obj;
            		vm.coupon_select = true;
            		ff.temp = null;
            		ff.temp_obj = null;
            	}
    		}
        	
    	}	

    	var total_price = 0;
    	var total_num = 0;
    	for(var i=0;i<vm.obj.length;i++)
    	{
    		total_price = total_price + vm.obj[i].favourablePrice * vm.obj[i].cartNum;
    		total_num = total_num + parseInt(vm.obj[i].cartNum);
    	}	
    	
    	vm.buy_price = total_price;
    	if(vm.coupon_select)
    	{
    		vm.buy_price = vm.total_price - vm.coupon.amount;
    	}
  
    	vm.total_price = total_price;
    	vm.total_num = total_num;
    	
    	

    	
    }
	

});

function buildOrder()
{			
	var vm = ff.page.vm();

	var order = {};
	 
	order.regionId = vm.addr.id;
	order.detailList = [];
	if(null != vm.coupon)
	{
		order.couponId = vm.coupon.receiveId;	
	}
	
	for(var i=0;i<vm.obj.length;i++)
	{
		var detail = {};
		detail.id = vm.obj[i].id;
		detail.skuId = vm.obj[i].skuId;
		detail.buyType = vm.obj[i].buyType;
		detail.skuCode = vm.obj[i].skuCode;
		detail.activityCommodityItemId = vm.obj[i].activityCommodityId;
		detail.buyNum = vm.obj[i].cartNum;
		order.detailList.push(detail);
	}
	return order;
}

 

 
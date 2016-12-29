var ff = ff || {};
ff.req = ff.req || {};
 
ff.service = {};

ff.service.goCommodity = function(id)
{
	ff.page.go({url:"Commodity/Detail",data:{goodsId:id}});
}
ff.service.loadCartNum = function()
{
	ff.page.submit({
			url:'Cart/Count',
		success:function(rsp)
		{
			if(ff.util.isSuccess(rsp))
			{
				if(rsp.obj>99)
				{
					FFWX.vm.base.cart_count = '99+';
				}
				else
				{
					FFWX.vm.base.cart_count = rsp.obj;
				}	
						
			}	
		}
	});
}

ff.service.pay = function(orderNo,callback)
{
	ff.util.submit({url:'Order/GetCharge',
		data:orderNo,
		success:function(rsp)
		{
		    if(ff.util.isSuccess(rsp))
		    {
				require(['pingjs'],function(pingpp)
						{
							pingpp.createPayment(rsp.obj, function(result, err){
							    console.log(result);
							    console.log(err.msg);
							    console.log(err.extra);
							    if (result == "success") {
							        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
							    	 ff.util.show("支付成功");
							    	 ff.page.go({url:"Order/Index",data:{status:1}});
							    	 if(null != callback)
								     {
								    	callback(true);
								     }
							    } else if (result == "fail") {
							        ff.util.show("付款失败"+err.msg + err.extra);
							        if(null != callback)
							    	{
							    		callback(false);
							    	}
							    } else if (result == "cancel") {
							    	ff.util.show("取消付款");
							    	if(null != callback)
							    	{
							    		callback(false);
							    	}
							    }
						    });
						});
		    }
		    else
		    {
		    	if(null != callback)
		    	{
		    		callback(false);
		    	}	
		    }	

		}
	});
}
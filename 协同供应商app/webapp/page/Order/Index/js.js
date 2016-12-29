ff.page.init({
	vm:{
		formatter:function(data)
		{
			if(data =="0"){
				return "待付款";
			}else if(data =="1"){
				return "待收货";
			}else if(data =="2"){
				return "退款申请中";
			}else if(data =="3"){
				return "交易关闭";
			}else if(data =="4"){
				return "交易完成";
			}else if(data =="5"){
				return "订单已取消";
			}
		},
		format:function(data)
		{
			if(data =="1"){
				return "退款处理中";
			}else if(data =="2"){
				return "换货处理中";
			}else if(data =="3"){
				return "退款成功";
			}else if(data =="4"){
				return "换货成功";
			}
		},
		toPay:function(obj){
			ff.service.pay(obj.orderNo,function(result){
				var vm = ff.page.vm();
				if(result)
				{
					ff.page.reload();
				}	
			});
		},
		// 查看物流
		logistics:function (item){
			ff.page.go({url:'Logistics',data:item.id});
		}
	},
	isPage:true,
	url:'Order/Load',
	cancel:cancel
});

function cancel(item)
{
	var vm = ff.page.vm();
  
	ff.util.confirm({
		text:'请确认是否取消订单?',
		onOK:function()
		{
			ff.page.submit({
		 		url:'Cancel',
		 		data:item.id,
		 		success:function(rsp)
		 		{
		 			if(ff.util.isSuccess(rsp)){
		 				ff.page.reload();
		 			}else{
		 				ff.util.show(rsp.message);
		 			}
		  		}
		 	});
		}
		
	});
}

function orderDelete(item)
{
	var vm = ff.page.vm();
  
	ff.util.confirm({
		text:'请确认是否删除订单?',
		onOK:function()
		{
			ff.page.submit({
		 		url:'Delete',
		 		data:item.id,
		 		success:function(rsp)
		 		{
		 			if(ff.util.isSuccess(rsp)){
		 				ff.page.reload();
		 			}else{
		 				ff.util.show(rsp.message);
		 			}
		  		}
		 	});
		}
		
	});
}


function todetail(item)
{
	var vm = ff.page.vm();
	ff.page.go({url:'Show',data:item.orderNo});
 
}


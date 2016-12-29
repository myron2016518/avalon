ff.page.init({
	vm:{
		can_delete:true,
		formatter:function(data)
		{
			if(data =="0"){
				return "等待买家付款";
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
		format:function(good){
			if(good.goodsStatus =="0"){
				return "申请售后";
			}else if(good.goodsStatus =="1"){
				ff.page.vm().can_delete = false;
				return "退款申请中";
			}else if(good.goodsStatus =="2"){
				ff.page.vm().can_delete = false;
				return "换货处理中";
			}else if(good.goodsStatus =="3"){
				return "退款成功";
			}else if(good.goodsStatus =="4"){
				return "换货成功";
			}
		},
		logistics:function (item){
			ff.page.go({url:'Logistics',data:item.orderId});
		},
		cancel:function (item)
		{
			var vm = ff.page.vm();
		  	ff.util.confirm({
				text:'请确认是否取消订单?',
				onOK:function()
				{
					ff.page.submit({
				 		url:'Cancel',
				 		data:item.orderId,
				 		success:function(rsp)
				 		{
				 			if(ff.util.isSuccess(rsp)){
				 				ff.page.reload()
				 			}else{
				 				ff.util.show(rsp.message);
				 			}
				  		}
				 	});
				}
			});
		},
		orderDelete:function (item)
		{
			var vm = ff.page.vm();
			var status = null;
		  	ff.util.confirm({
				text:'请确认是否删除订单?',
				onOK:function()
				{
					ff.page.submit({
				 		url:'Delete',
				 		data:item.orderId,
				 		success:function(rsp)
				 		{
				 			if(ff.util.isSuccess(rsp)){
				 				ff.page.go({url:"Order/Index",data:{status:status}});
				 			}else{
				 				ff.util.show(rsp.message);
				 			}
				  		}
				 	});
				}
				
			});
		},
		toRefound:function(obj,skuId){
			if(obj.type =="COMMON_BUY"){
				if(obj.status == 1){
					ff.page.go({url:"AfterSaleApply/RefundApplyform",data:obj});
				}else{
					obj.skuId = skuId;
					ff.page.go({url:"AfterSaleApply/RefundApplyform",data:obj});
				}
			}else if(obj.type =="EXCHANGE_ORDER"){
				$.modal({
					  title: "温馨提示",
					  text: obj.typeContent,
					  buttons: [
					    { text: "我知道了" }
					  ]
					});
			}
			
		},
		toRefoundDetail:function (obj,skuId){
			if(obj.afterSalesType == 1 || obj.afterSalesType == 2){
				ff.page.go({url:"AfterSaleApply/RefundInfo",title:"售后详情",data:{orderId:obj.orderId,type:obj.afterSalesType,afterSalesId:obj.afterSalesId,skuId:skuId}});
			}else{
				ff.page.go({url:"AfterSaleApply/RefundInfo",title:"售后详情",data:{orderId:obj.orderId,type:obj.afterSalesType,afterSalesId:obj.afterSalesId}});
			}
		},
		toPay:function(obj){
			ff.service.pay(obj.orderNumber);
		}
	},
	title:'订单详情',
	url:'Show'
});


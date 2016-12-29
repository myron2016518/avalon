ff.page.init({
	vm:{
		formatter:function(data)
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
		format:function(data)
		{
			if(data =="0"){
				return "退款详情";
			}else if(data =="1"){
				return "退货详情";
			}else if(data =="2"){
				return "换货详情";
			}
		}
		
	},
	isPage:true,
	url:'Load',
});

function refoundDetail(obj){
	var data = obj.goods[0].goodsStatus;
	var title = "售后详情";
	if(data =="1"){
		title= "退款处理中";
	}else if(data =="2"){
		title= "换货处理中";
	}else if(data =="3"){
		title= "退款成功";
	}else if(data =="4"){
		title= "换货成功";
	}
	if(obj.afterSalesType == 1 || obj.afterSalesType == 2){
		ff.page.go({url:"AfterSaleApply/RefundInfo",title:title,data:{orderId:obj.orderId,type:obj.afterSalesType,afterSalesId:obj.afterSalesId,skuId:obj.goods[0].skuId}});
	}else{
		ff.page.go({url:"AfterSaleApply/RefundInfo",title:title,data:{orderId:obj.orderId,type:obj.afterSalesType,afterSalesId:obj.afterSalesId}});
	}
}
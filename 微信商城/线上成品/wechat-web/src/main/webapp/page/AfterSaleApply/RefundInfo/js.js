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
	},
	url:'refoundDetail',
});


function detail(item)
{
	var vm = ff.page.vm();
  
	ff.page.go({url:'Order/Show',title:'换货订单详情',data:item.newOrderNo});
 
}
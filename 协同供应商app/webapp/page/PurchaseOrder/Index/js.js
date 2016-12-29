

ff.page.init({
	vm:{
		//采购订单列表显示不是供应商补货来源的
		notSource:'4', 
		filterSelected: null,
		filter: [
			{
				id: null,
				label: '全部'
			},
			{
				id: '0',
				label: '未关闭'
			},
			{
				id: '1',
				label: '已关闭'
			}
		],
		purchaseOrders: [{}],
		runFilter: runFilter,
		closeStateFormat:function(itme)
		{
			
		}
		
	},
	isPage: true,
	title: '采购订单列表',
	detail:detail,
    loadMore:function(page,flag){

    },
    afterLoad:function(vm){		
		// 与后端数据对接后，以下删除！
		dummyData();
    }
 });
 

 
 
 function runFilter(id) {
	 ff.page.vm().filterSelected = id;
	 dummyData();
 }
 
 // 以下改成 AJAX 的回调
 function dummyData(){
	var vm = ff.page.vm();
	ff.page.submit({
 		url:"PurchaseOrder/Load",
 		condition:{closeState:vm.filterSelected, notSource:vm.notSource},
 		page:{currentPage:1,pageSize:10},
 		isPage:true,
 		success:function(rsp)
 		{	
 			if(ff.util.isSuccess(rsp)){
 				vm.purchaseOrders = rsp.obj.dataList;
 			}else{
 				ff.util.show(rsp.message);
 			}
 			
 		}
 	});
 }
 
 function detail(el) {
	 ff.page.go({url:"PurchaseOrder/Detail",data:el.number});
 }
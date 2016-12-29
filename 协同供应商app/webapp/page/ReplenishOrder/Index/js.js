

ff.page.init({
	vm:{
		source: '4', 
		filterSelected: null,
		filter: [
			{
				id: null,
				label: '全部'
			},
			{
				id: '0',
				label: '待交货'
			},
			{
				id: '1',
				label: '部分交货'
			},
			{
				id: '2',
				label: '交货完成'
			}
		],
		replenishOrders: [{}],
		runFilter: runFilter,
		submitState: submitState
	},
	isPage: true,
	title: '补货列表',
	detail:detail,
    loadMore:function(page,flag){

    },
    afterLoad:function(vm){		
		// 与后端数据对接后，以下删除！
		dummyData();
    }
 });
 
function isNotNull(dom) {
	if (dom != null && dom != undefined && dom != '') {
		return true;
	} else {
		return false;
	}
}
 
 
 function runFilter(id) {
	 ff.page.vm().filterSelected = id;
	 dummyData();
 }
 
 function submitState(el) {
	if (isNotNull(el.closeAuthor)) {
		return el.closeState;
	} else {
		return el.purchaseState;
	}
 }
 
 // 以下改成 AJAX 的回调
 function dummyData(){	 
	var vm = ff.page.vm();
	ff.page.submit({
 		url:"ReplenishOrder/Load",
 		condition:{deliveryState:vm.filterSelected, source:vm.source},
 		page:{currentPage:1,pageSize:10},
 		isPage:true,
 		success:function(rsp)
 		{	
 			if(ff.util.isSuccess(rsp)){
 				vm.replenishOrders = rsp.obj.dataList;
 			}else{
 				ff.util.show(rsp.message);
 			}
 		}
 	});
 }
 
 function detail(el) {
	 ff.page.go({url:"ReplenishOrder/Detail",data:el.number});
 }
 

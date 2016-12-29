ff.page.init({
	vm:{
		purchaseOrder: {
			details: [{}]
		},
		toggle: toggle
	},
	loadMore:function(page,flag){

	},
	afterLoad:function(vm){
		// 与后端数据对接后，以下删除！
	},
	url: 'Show',
	success: function(data) {
		var vm = ff.page.vm();
		vm.purchaseOrder = data.obj;
	}
});

function toggle() {
	var $tbody = $(this);
	var $tr = $tbody.parent().parent().parent().find('>tr:eq(1)');
	var $arrow = $tbody.parent().parent().parent().find('[class*=icon-scms]');

	if ($tr.is(':visible')) {
		$tr.hide();
		$arrow.removeClass().addClass('icon-scms-ico22');
	} else {
		$tr.css({display: 'table-row'});
		$arrow.removeClass().addClass('icon-scms-ico21');
	}
}
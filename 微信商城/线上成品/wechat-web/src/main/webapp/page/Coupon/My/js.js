ff.page.init({
	vm:{
		obj:[],
		toCouponList:function (status){
			$(".result-sort li").removeClass("now");
			if(status == 0){
				$(".result-sort li:eq(0)").addClass("now");
			}else if(status == 1){
				$(".result-sort li:eq(1)").addClass("now");
			}else{
				$(".result-sort li:eq(2)").addClass("now");
			}
			ff.page.reload({condition:{status:status}});
		},
		to_detail:function(item){
			ff.page.go({url:"Detail",data:item});
		}
	},
	title:'我的优惠券',
	url:"LoadAll"
});


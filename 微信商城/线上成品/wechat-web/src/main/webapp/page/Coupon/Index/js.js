ff.page.init({
	vm:{
		formaterStatus: formaterStatus,
		coupon_reveive: coupon_reveive
	},
	url:'Coupon/CouponReceiveList'
});

/**
 * 优惠券状态
 * @param item
 */
function formaterStatus(item){
	var _statusText = item.receiveState==0?"领取":"已领取";
	 
	if(item.grantDate > new Date().format('yyyy-MM-dd hh:mm:ss')){
		_statusText = '未开始';
	}else if(item.grantEndDate < new Date().format('yyyy-MM-dd hh:mm:ss')){
		_statusText = '已结束';
	}else if(item.surplusNum <= 0 ){
		_statusText = '已领完';
	}
	return _statusText;
}


/**
 * 优惠券领取操作
 * @param item
 */
function coupon_reveive(item){
	ff.page.submit({
 		url:'Coupon/ReceiveCoupon',
 		condition:{couponId:item.adminId,grantId:item.grantId},
	 	success:function(rsp)
 		{
	 		if(ff.util.isSuccess(rsp))
	 		{
	 			ff.util.show("领取成功");
	 			ff.page.reload();
	 		}	
 			
  		}
 	});
}
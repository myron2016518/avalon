package com.ffzx.wechat.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.web.json.BaseRspJson;
import com.ffzx.order.api.dto.OmsOrder;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.model.CouponGrantInfo;
import com.ffzx.wechat.model.CouponReceiveInfo;
import com.ffzx.wechat.service.CouponService;

@Controller
@RequestMapping("/Coupon")
public class CouponController extends WTableController<CouponReceiveInfo>
{
	@Autowired
	private CouponService coupinService;

	
	@Override
	public BaseRspJson Create() {
		// TODO Auto-generated method stub
		BaseRspJson rsp = new BaseRspJson();
		String couponCode = this.getObj(String.class);
		Map<String,Object> result = coupinService.convertCoupon(this.GetSysUser(), couponCode);
		rsp.setObj(result);
		return rsp;
	}

	/**
	 * 获取我的优惠券列表
	 * @param response
	 * add by 柯典佑   2016-11-04
	 */
	@RequestMapping(value = "ForOrder")
	@ResponseBody
	public BaseRspJson ForOrder(HttpServletResponse response){
		BaseRspJson rsp = new BaseRspJson();
		OmsOrder order = this.getObj(OmsOrder.class);
 		List<CouponReceiveInfo> result=coupinService.findCouponForOrder(this.GetSysUser(), order);
		rsp.setObj(result);
		return rsp;
	}
	
	/**
	 * 优惠券用户领取列表2016-11-14
	 * @param response
	 */
	@RequestMapping(value = "CouponReceiveList")
	@ResponseBody
	public BaseRspJson couponReceiveList(HttpServletResponse response) {
		BaseRspJson rsp = new BaseRspJson();
		String couponGrantId = this.getObj(String.class);// 优惠券发放id
		List<CouponGrantInfo> result = coupinService.couponReceiveList(this.GetSysUser(), couponGrantId);
		rsp.setObj(result);
		return rsp;
	}
	
	
	/**
	 * 领取优惠券2016-11-14
	 * @param response
	 */
	@RequestMapping(value = "ReceiveCoupon")
	@ResponseBody
	public BaseRspJson receiveCoupon(HttpServletResponse response){
		BaseRspJson rsp = new BaseRspJson();
		int result = coupinService.receiveCoupon(this.GetSysUser(),this.GetFilterCondition());
		rsp.setObj(result);
		return rsp;
	}
	
}

package com.ffzx.wechat.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ff.common.util.format.JsonConvert;
import com.ff.common.web.json.BaseRspJson;
import com.ffzx.order.api.dto.OmsOrder;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.model.OmsOrderInfo;
import com.ffzx.wechat.model.OmsOrderRecordInfo;
import com.ffzx.wechat.model.OrderBiInfo;
import com.ffzx.wechat.model.OrderNumInfo;
import com.ffzx.wechat.service.OrderService;


@Controller
@RequestMapping("/Order")
public class OrderController extends WTableController<OmsOrder>
{
	@Autowired
	private OrderService orderService;
	/**
	 * 日志
	 */
	protected final Logger logger = LoggerFactory.getLogger(OrderController.class);
	/**
	 * 取消订单
	 * @param response
	 */
	@ResponseBody
	@RequestMapping(value = "/Cancel")
	public BaseRspJson Cancel(HttpServletResponse response) {
		BaseRspJson rsp = new BaseRspJson();
		String orderId = this.getObj(String.class);
		orderService.orderCancel(this.GetSysUser(), orderId, "ALREADCANCEL");
		return rsp;
	}
	
	
 
	@ResponseBody
	@RequestMapping(value = "/GetCharge")
 	public BaseRspJson GetCharge()
	{
		BaseRspJson rsp = new BaseRspJson();
 		String orderNo =  this.getObj(String.class);
 		OrderService service = (OrderService) this.getService();
 		JSON charge = service.getCharge(this.GetSysUser(), orderNo);
  		rsp.setObj(charge);
		
		return rsp;
	}


	/**
	 * 查看订单详情
	 * @param response
	 */
	@Override
	public BaseRspJson Show() {
		BaseRspJson rsp = new BaseRspJson();
		String orderNo = this.getObj(String.class);
		OmsOrderInfo omsOrderInfo = orderService.orderDetail(this.GetSysUser(), orderNo);
		rsp.setObj(omsOrderInfo);
		return rsp;
	}
	
	/**
	 * 查看物流
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "Logistics")
	public BaseRspJson Logistics(){
		BaseRspJson rsp = new BaseRspJson();
		String orderId = this.getObj(String.class);
		List<OmsOrderRecordInfo> omsOrderRecordInfo = orderService.getOrderRecord(this.GetSysUser(), orderId);
		rsp.setObj(omsOrderRecordInfo);
		return rsp;
	}

	
	/**
	 * 我的账单
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getBills")
	public BaseRspJson getBills(){
		BaseRspJson rsp = new BaseRspJson();
		String month = this.getObj(String.class);
		OrderBiInfo OrderBiInfo = orderService.biUserOrder(this.GetSysUser(), month);
		rsp.setObj(OrderBiInfo);
		return rsp;
	}
	
	/**
	 * 订单数量
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getOrderStatusNum")
	public BaseRspJson getOrderStatusNum(){
		BaseRspJson rsp = new BaseRspJson();
		OrderNumInfo orderNumInfo = orderService.getOrderStatusNum(this.GetSysUser());
		rsp.setObj(orderNumInfo);
		return rsp;
	}
}

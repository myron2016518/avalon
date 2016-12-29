package com.ffzx.wechat.controller;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.web.json.BaseRspJson;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.model.AfterSaleApplyInfo;
import com.ffzx.wechat.service.AfterSaleApplyService;
import com.ffzx.wechat.service.OrderService;

@Controller
@RequestMapping("/AfterSaleApply")
public class AfterSaleApplyController  extends WTableController<AfterSaleApplyInfo>{

	@Autowired
	private AfterSaleApplyService afterSaleApplyService;
	/**
	 * 日志
	 */
	protected final Logger logger = LoggerFactory.getLogger(AfterSaleApplyController.class);
	/**
	 * 售后详情
	 * @param response
	 */
	@ResponseBody
	@RequestMapping(value = "/refoundDetail")
	public BaseRspJson refoundDetail(HttpServletResponse response) {
		BaseRspJson rsp = new BaseRspJson();
		AfterSaleApplyInfo afterSaleInfo = afterSaleApplyService.refoundDetail(this.GetSysUser(),this.GetFilterCondition());
		rsp.setObj(afterSaleInfo);
		return rsp;
	}
	
	
	
	@Override
	public BaseRspJson Create() {
		// TODO Auto-generated method stub
		BaseRspJson rsp = new BaseRspJson();
		AfterSaleApplyInfo obj = this.getObj(this.GetTableClass());
		String result = afterSaleApplyService.saveAfterSale(this.GetSysUser(), obj);
		rsp.setObj(result);
		return rsp;
	}
	
	
}

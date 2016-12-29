package com.ffzx.wechat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ff.common.web.json.BaseRspJson;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.model.CommodityVo;
import com.ffzx.wechat.model.GoodsMap;
import com.ffzx.wechat.service.ActivityCommodityService;

/***
 * 商品控制器
 * @author ying.cai
 * @date 2016年10月18日 下午2:45:56
 * @email ying.cai@ffzxnet.com
 * @version V1.0
 *
 */
@Controller
@RequestMapping("/Commodity")
public class CommodityController extends WTableController<CommodityVo>
{

	@Autowired
	private ActivityCommodityService activityService;
	/**
	 * 4.5.2.4	商品详细信息获取,统一方法
	 * @param response
	 */
	@Override
	public BaseRspJson Show(){
		BaseRspJson rsp = new BaseRspJson();
		GoodsMap result=activityService.findGoodsInfo(this.GetFilterCondition(),this.GetSysUser());
		rsp.setObj(result);
		return rsp;
				
	}
}

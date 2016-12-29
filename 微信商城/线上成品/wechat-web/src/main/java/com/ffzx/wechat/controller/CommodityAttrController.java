package com.ffzx.wechat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ffzx.bms.api.dto.CommoditySku;
import com.ffzx.wechat.controller.base.WTableController;

/***
 * 商品属性控制器
 * @author ying.cai
 * @date 2016年10月27日 下午6:27:33
 * @email ying.cai@ffzxnet.com
 * @version V1.0
 *
 */
@Controller
@RequestMapping("/CommodityAttr/*")
public class CommodityAttrController extends WTableController<CommoditySku> {
	
}

package com.ffzx.wechat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.model.RecommendCommodity;

/***
 * 同类商品推荐控制器
 * @author ying.cai
 * @date 2016年10月24日 下午5:11:59
 * @email ying.cai@ffzxnet.com
 * @version V1.0
 *
 */
@Controller
@RequestMapping("/RecommendCommodity")
public class RecommendCommodityController extends WTableController<RecommendCommodity>{
	
}

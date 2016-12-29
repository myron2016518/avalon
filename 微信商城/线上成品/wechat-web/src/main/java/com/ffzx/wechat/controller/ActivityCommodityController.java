/**
 * 
 */
package com.ffzx.wechat.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.dao.model.ConditionTypeEnum;
import com.ff.common.dao.model.FFCondition;
import com.ff.common.util.validate.ValidatorUtil;
import com.ff.common.web.json.BaseRspJson;
import com.ff.common.web.json.PageDataJson;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.dubbo.ActivityCommodityConsumer;
import com.ffzx.wechat.model.ActivitySaleAppCategory;
import com.ffzx.wechat.model.GoodsMap;
import com.ffzx.wechat.model.PanicActivityModel;
import com.ffzx.wechat.service.ActivityCommodityService;


/**
* @Description: 获取活动控制器
* @author yuzhao.xu
* @email  yuzhao.xu@ffzxnet.com
* @date 2016年5月20日 下午4:02:58
* @version V1.0 
*
*/
@Controller
@RequestMapping("/ActivityCommodity")
public class ActivityCommodityController extends WTableController<PanicActivityModel>{

	/**
	 * 日志
	 */
	protected final Logger logger = LoggerFactory.getLogger(ActivityCommodityController.class);
	
	@Autowired
	private ActivityCommodityService activityService;
	/**
	 * 获取抢购类别
	 * @param response
	 */
	@ResponseBody
	@RequestMapping(value = "/findPanicCategory")
	public BaseRspJson<List<ActivitySaleAppCategory>> findPanicCategory(HttpServletResponse response) {
		BaseRspJson<List<ActivitySaleAppCategory>> rsp = new BaseRspJson<List<ActivitySaleAppCategory>>();
		List<ActivitySaleAppCategory> dataList =activityService.getActivityCategoryList();
		rsp.setObj(dataList);
		return rsp;
	}
	

	
	/**
	 * 抢购商品开售提醒
	 */
	@ResponseBody
	@RequestMapping(value="/updatePanicBuyRemind")
	public BaseRspJson updatePanicBuyRemind(){
		BaseRspJson rsp = new BaseRspJson();
		// 获取数据
		rsp.setObj(activityService.updatePanicBuyRemind(this.GetFilterCondition(),this.GetSysUser()));
		return rsp;
	    
	}
	

	/**
	 * 4.5.2.4	活动商品详细信息获取,统一方法
	 * @param response
	 */
	@Override
	public BaseRspJson Show(){
		BaseRspJson rsp = new BaseRspJson(); 
			GoodsMap result=activityService.findActivityInfo(this.GetFilterCondition(),this.GetSysUser());//activityService.findActivityGoodsInfo(goodsId, activityId, type, uid, cityId);
			rsp.setObj(result);
		
		return rsp;
				
	}
	
	@ResponseBody
	@RequestMapping(value="/FindActivityCommodityList")
	public BaseRspJson findActivityCommodityList(){
		BaseRspJson rsp = new BaseRspJson(); 
		// 获取数据
		try {
			rsp.setObj(activityService.findActivityCommodityList(this.GetSysUser(), this.GetFilterCondition(), this.GetPage()));
		} catch (Exception e) {
			rsp.setObj(null);
			rsp.setErrorCode(-1);
			rsp.setMessage(e.getMessage());
		}
		return rsp;
	}
	
	@ResponseBody
	@RequestMapping(value="/FindActivityBennerList")
	public BaseRspJson findActivityBennerList(){
		BaseRspJson rsp = new BaseRspJson(); 
		String obj = this.getObj(String.class);
		// 获取数据
		rsp.setObj(activityService.findActivityBennerList(this.GetSysUser(), obj));
		return rsp;
	}
	
	@ResponseBody
	@RequestMapping(value="/FindCommodityAbleCount")
	public BaseRspJson findCommodityAbleCount(){
		BaseRspJson rsp = new BaseRspJson();
		// 获取数据
		rsp.setObj(activityService.findCommodityAbleCount(this.GetSysUser(), this.GetFilterCondition()));
		return rsp;
	}
}

package com.ffzx.wechat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.web.json.BaseRspJson;
import com.ffzx.promotion.api.dto.ActivityManager;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.service.impl.ActivityManagerServiceImpl;

/**
 * 活动管理控制器
 * @author sheng.shan
 * @email  sheng.shan@ffzxnet.com
 * @date 2016年10月25日 上午10:13:24
 * @version V1.0 
 */
@Controller
@RequestMapping("/ActivityManager")
public class ActivityManagerController extends WTableController<ActivityManager> {

	
	@RequestMapping("/FindActivityInfo")
	@ResponseBody
	public BaseRspJson findActivityInfo()
	{
		BaseRspJson rsp = new BaseRspJson();
		ActivityManagerServiceImpl activityManagerService = (ActivityManagerServiceImpl) getService();
		String obj = this.getObj(String.class);
		ActivityManager data = activityManagerService.findActivityManagerInfo(this.GetSysUser(), obj);
		rsp.setObj(data);
		return rsp;
	}
	
}

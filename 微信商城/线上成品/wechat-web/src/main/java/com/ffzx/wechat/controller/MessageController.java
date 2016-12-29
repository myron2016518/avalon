package com.ffzx.wechat.controller;


import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.web.json.BaseRspJson;
import com.ffzx.member.api.dto.MemberMessage;
import com.ffzx.member.api.enums.MessTypeEnum;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.service.MessageService;

/**
 * 
* @ClassName: MessageController 
* @Description: 消息控制器
* @author Qin.Huang
* @date 2016年10月24日 下午5:29:06 
* @version V1.0
 */

@Controller
@RequestMapping("/Message/*")
public class MessageController extends WTableController<MemberMessage>{

	@Autowired
	private MessageService messageService;
	/**
	 * 获取用户某一类型消息列表
	 * 
	 * @param response
	 * @param params
	 */
	@ResponseBody
	@RequestMapping(value = "/userMessSearch")
	public BaseRspJson userMessSearch(HttpServletResponse response, String params) {
		BaseRspJson rsp = new BaseRspJson();
		String userId = this.GetSysUser().getUser_id();//用户id
		String type = this.getObj(String.class);//消息类型
		List<MemberMessage> memberMessageList = messageService.userMessSearch(userId, type);
		rsp.setObj(memberMessageList);
		return rsp;
	}
	
	

	
	/***
	 * 获取用户未读消息数量
	 * @return
	 * @date 2016年10月26日 下午5:36:09
	 * @author ying.cai
	 * @email ying.cai@ffzxnet.com
	 */
	@ResponseBody
	@RequestMapping("FindunReadCount")
	public BaseRspJson findunReadCount(){
		List<String> types = new ArrayList<String>();
		types.add(MessTypeEnum.SYSTEM.getValue());
		types.add(MessTypeEnum.ORDERNOTICE.getValue());
		types.add(MessTypeEnum.PROMOTION.getValue());
		types.add(MessTypeEnum.PREORDER.getValue());
		
		BaseRspJson rsp = new BaseRspJson();
		int unCount = 0;
		if(isLogin())
		{
			unCount = messageService.findunReadCountForTypes(this.GetSysUser(),types);
		}
				
		rsp.setObj(unCount);
		return rsp;
	}
	
}

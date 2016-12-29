/**   
* @Title: MemberAddressController.java 
* @Package com.ffzx.wechat.controller 
* @Description: 会员地址控制器
* @author Qin.Huang 
* @date 2016年10月26日 下午2:39:19 
* @version V1.0   
*/
package com.ffzx.wechat.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.web.json.BaseRspJson;
import com.ffzx.member.api.dto.MemberAddress;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.dubbo.MemberAddressConsumer;

/** 
* @ClassName: MemberAddressController 
* @Description: 会员地址控制器
* @author Qin.Huang
* @date 2016年10月26日 下午2:39:19 
* @version V1.0
*/
@Controller
@RequestMapping("/MemberAddress")
public class MemberAddressController extends WTableController<MemberAddress>{
	@Autowired
	private MemberAddressConsumer memberAddressConsumer;
	private Logger logger = LoggerFactory.getLogger(MemberAddressController.class);
	/**
	 * 获取用户默认签收地址
	 * 
	 * @param response
	 * @param params
	 */
	@ResponseBody
	@RequestMapping(value = "/findDefReceiptAddress")
	public BaseRspJson findDefReceiptAddress(HttpServletResponse response, String params) {
		BaseRspJson rsp = new BaseRspJson();
		String userId = this.GetSysUser().getUser_id();//用户id
		logger.info("findDefReceiptAddress==>>userId:" + userId);
		List<MemberAddress>  memberAddressList = memberAddressConsumer.findReceiptAddress(1,userId);
		MemberAddress defMemberAddress = new MemberAddress();
		if(memberAddressList != null && memberAddressList.size()>=1){
			defMemberAddress = memberAddressList.get(0);
		}
		rsp.setObj(defMemberAddress);
		return rsp;
	}
}

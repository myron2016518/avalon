package com.ffzx.wechat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ff.common.dao.model.FFCondition;
import com.ff.common.web.json.BaseRspJson;
import com.ffzx.appclient.constant.AppConstants;
import com.ffzx.commerce.framework.constant.Constant;
import com.ffzx.commerce.framework.dto.ResultDto;
import com.ffzx.commerce.framework.thirdparty.ShortMsgEnum;
import com.ffzx.commerce.framework.thirdparty.ShortMsgFactory;
import com.ffzx.commerce.framework.utils.JsonMapper;
import com.ffzx.member.api.dto.Member;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.model.RegisterModel;
import com.ffzx.wechat.service.SignService;
import com.ffzx.wechat.utils.MemberRequestStateUtils;
import com.ffzx.wechat.web.MemberContextHolder;

import net.sf.json.JSONObject;

 /**
 * @Description: 登录注册 控制器
 * @author qh.xu
 * @email  qianghui.xu@ffzxnet.com
 * @date 2016年9月22日 上午11:04:37
 * @version V1.0 
 *
 */
@Controller
@RequestMapping("/Sign")
public class SignController extends WTableController<MemberInfo> {

	@Autowired
	private SignService signService;
	
	@ResponseBody
	@RequestMapping("/Login")
	public BaseRspJson Login(HttpServletRequest request){
		BaseRspJson rsp = new BaseRspJson();
		MemberInfo param = this.getObj(MemberInfo.class);
		MemberContextHolder.set(MemberRequestStateUtils.newRequestState(request));
		MemberInfo info = MemberContextHolder.getMemberInfo();
		ResultDto result = signService.login(param.getPhone(), param.getPassword(),info.getOpenid());
		if(result.getCode().equals("0")){
			//存入redies
			MemberContextHolder.set(MemberRequestStateUtils.newRequestState(request));
			Member member = (Member)result.getData();
			MemberInfo memberInfo = new MemberInfo();
			memberInfo.setId(member.getId());
			memberInfo.setOpenid(info.getOpenid());
 			memberInfo.setNickName(member.getNickName());
			memberInfo.setPictureUrl(member.getPictureUrl());
			memberInfo.setPhone(member.getPhone());
			memberInfo.setGender(member.getGender());
			MemberRequestStateUtils.setMemberInfoToRedis(request,memberInfo );
		}
		rsp.setObj(result);
		return rsp;
	}
	
	@ResponseBody
	@RequestMapping("/GetCode")
	public BaseRspJson GetCode(HttpServletRequest request){
		BaseRspJson rsp = new BaseRspJson();
		MemberInfo param = this.getObj(MemberInfo.class);
		ResultDto result = signService.sendRegisterCode(param.getPhone());
		rsp.setObj(result);
		return rsp;
	}
	
	@ResponseBody
	@RequestMapping("/GetFindpwCode")
	public BaseRspJson GetFindpwCode(HttpServletRequest request){
		BaseRspJson rsp = new BaseRspJson();
		MemberInfo param = this.getObj(MemberInfo.class);
		ResultDto result = signService.sendFindpwCode(param.getPhone());
		rsp.setObj(result);
		return rsp;
	}
	
	@ResponseBody
	@RequestMapping(value="Register")
	public BaseRspJson Register(HttpServletResponse response){
		BaseRspJson rsp = new BaseRspJson();
		RegisterModel param = this.getObj(RegisterModel.class);
		Member member = new Member();
		member.setNickName(param.getPhone());
		member.setPhone(param.getPhone());
		member.setAccountNo(param.getPhone());
		member.setRemoccendPhone(param.getRemoccendPhone());
		member.setRecommendAccount(param.getRemoccendPhone());
/*			if(StringUtils.isBlank(param.getRemoccendPhone())){
				member.setRemoccendPhone(JsonErrorUtils.getStringValue(myJsonObject, "rcode"));
				member.setRecommendAccount(JsonErrorUtils.getStringValue(myJsonObject, "rcode"));
			}
			member.setGender(JsonErrorUtils.getStringValue(myJsonObject, "gender"));*/
		member.setPassword(param.getPassword());
		rsp =signService.addMember(member,param.getCode(),Constant.NO);
        return rsp;
	}

	@ResponseBody
	@RequestMapping(value="Findpwd")
	public BaseRspJson Findpwd(HttpServletResponse response){
		BaseRspJson rsp = new BaseRspJson();
		RegisterModel param = this.getObj(RegisterModel.class);
		Member member = new Member();
		member.setPhone(param.getPhone());
/*			if(StringUtils.isBlank(param.getRemoccendPhone())){
				member.setRemoccendPhone(JsonErrorUtils.getStringValue(myJsonObject, "rcode"));
				member.setRecommendAccount(JsonErrorUtils.getStringValue(myJsonObject, "rcode"));
			}
			member.setGender(JsonErrorUtils.getStringValue(myJsonObject, "gender"));*/
		member.setPassword(param.getPassword());
		rsp =signService.updateMember(member, param.getCode());
        return rsp;
	}
}

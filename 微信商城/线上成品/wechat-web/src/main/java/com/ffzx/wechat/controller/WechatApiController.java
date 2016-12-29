
package com.ffzx.wechat.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ffzx.commerce.framework.dto.ResultDto;
import com.ffzx.member.api.dto.Member;
import com.ffzx.wechat.controller.base.WBaseController;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.service.ActivityCommodityService;
import com.ffzx.wechat.service.SignService;
import com.ffzx.wechat.service.WechatApiService;
import com.ffzx.wechat.utils.MemberRequestStateUtils;


/**
 * 
 * @description
 * @author  柯典佑
 * @date 2016年10月25日 上午11:29:49 
 *
 */
@Controller	
public class WechatApiController extends WBaseController{

	@Autowired
	private WechatApiService wechatApiService;
	
	@Autowired
	private SignService signService;
	
	/**
	 * 微信接口token认证
	 * @return
	 */
	@RequestMapping("/Checktoken")
	public void checktoken(HttpServletRequest request,PrintWriter out) {
		
		String timestamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String signature = request.getParameter("signature");
		String echostr = request.getParameter("echostr");
		ArrayList<String> list=new ArrayList<String>();
		list.add(nonce);
		list.add(timestamp);
		list.add("weixin");
		Collections.sort(list);
		String sign = DigestUtils.sha1Hex(list.get(0)+list.get(1)+list.get(2));
		if(sign.equals(signature)){
			//验证成功
			out.print(echostr);
		}
		
	}
	
	@RequestMapping("/Test")
	public void test(HttpServletRequest request,PrintWriter out,HttpServletResponse response) {
		String redirectUrl = response.encodeURL("http://kedianyou.eicp.net/wechat-web/oauth.do");
		String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx87da20ebc1661215&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
		try {
			response.sendRedirect(url);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping("/Oauth")
	public void oauth(HttpServletRequest request,HttpServletResponse response,HttpSession session) {
 
		String code = request.getParameter("code");
		Map<String,String> map = wechatApiService.oauth(code);
		MemberInfo info=new MemberInfo();
		info.setOpenid(map.get("openid"));
		info.setWeNickName(map.get("nickname"));
		info.setWePictureUrl(map.get("headimgurl"));
		ResultDto result = signService.getMemberByOpenid(map.get("openid"));
		if(result.getCode().equals("0") && result.getData() != null){
			//该微信已经绑定
			Member member = (Member)result.getData();
			info.setNickName(member.getNickName());
			info.setPictureUrl(member.getPictureUrl());
			info.setPhone(member.getPhone());
			info.setId(member.getId());
		}
		MemberRequestStateUtils.setMemberInfoToRedis(request, info);
		try {
			response.sendRedirect("");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}


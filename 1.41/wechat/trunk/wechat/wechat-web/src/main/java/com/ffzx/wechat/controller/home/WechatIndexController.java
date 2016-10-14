package com.ffzx.wechat.controller.home;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ffzx.commerce.framework.controller.BaseController;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.utils.MemberRequestStateUtils;


 /**
 * @Description: 微信商城首页
 * @author qh.xu
 * @email  qianghui.xu@ffzxnet.com
 * @date 2016年9月12日 下午5:22:27
 * @version V1.0 
 *
 */
@Controller
public class WechatIndexController extends BaseController{
	
	@RequestMapping(value="/wechatIndex/index")
	public ModelAndView index(){
		ModelAndView mv=new ModelAndView();
		mv.addObject("objOne", "test");
		mv.setViewName("home_page");
		return mv;
	}
	
	@RequestMapping("/wechatIndex/demo")
	public ModelAndView demo(){
		ModelAndView mv=new ModelAndView();
		mv.setViewName("plugin_demo");
		return mv;
	}
	
	@RequestMapping("/needLogin/demo")
	public ModelAndView needLogin(){
		ModelAndView mv=new ModelAndView();
		mv.setViewName("plugin_demo");
		return mv;
	}
	
	@RequestMapping("/putLoginInfo")
	public ModelAndView putLoginInfo(HttpServletRequest request){
		ModelAndView mv=new ModelAndView();
		MemberInfo info=new MemberInfo();
		info.setId(UUID.randomUUID().toString());
		info.setGender("male");
		info.setNickName("merlin");
		info.setPhone("181238021596");
		info.setPictureUrl("this is picture url..");
		MemberRequestStateUtils.setMemberInfoToRedis(request, info);
		mv.addObject("memberInfo", info);
		mv.setViewName("plugin_demo");
		return mv;
	}
	
	@RequestMapping(value="/needLogin/postFun")
	public @ResponseBody MemberInfo postFun(){
		MemberInfo info=new MemberInfo();
		info.setPhone("1234567");
		return info;
	}
	
}

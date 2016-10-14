package com.ffzx.wechat.controller.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.ffzx.commerce.framework.controller.BaseController;

 /**
 * @Description: 登录注册 控制器
 * @author qh.xu
 * @email  qianghui.xu@ffzxnet.com
 * @date 2016年9月22日 上午11:04:37
 * @version V1.0 
 *
 */
@Controller
public class LoginController extends BaseController{

	@RequestMapping("login")
	public ModelAndView login(){
		ModelAndView mv=new ModelAndView();
		mv.setViewName("login/wechat_login");
		mv.addObject("redirectURL", getString("redirectURL"));
		return mv;
	}
}

package com.ffzx.wechat.interceptor;

import java.io.PrintWriter;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.annotate.JsonCachable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.WebUtils;

import com.ff.common.util.format.JsonConvert;
import com.ff.common.web.controller.FFBaseController;
import com.ff.common.web.json.BaseRspJson;
import com.ffzx.wechat.constant.WCErrorCode;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.utils.MemberRequestStateUtils;
import com.ffzx.wechat.web.MemberContextHolder;

/**
 * 	授权拦截器
 * @author 柯典佑
 *
 */
public class OauthInterceptor extends HandlerInterceptorAdapter
{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		MemberContextHolder.set(MemberRequestStateUtils.newRequestState(request));
		String WECHAT_WEB_DEBUG = System.getProperty("wechat.web.debug");
		MemberInfo memberInfo = MemberContextHolder.getMemberInfo();
		//判断浏览器类型
		String ua = ((HttpServletRequest) request).getHeader("user-agent").toLowerCase();  
		boolean isWechat = false;
		if (ua.indexOf("micromessenger") > 0) {// 是微信浏览器  
			isWechat = true;  
		}  
		
		if("true".equals(WECHAT_WEB_DEBUG) && memberInfo == null && !isWechat){
			//开启了网页调试
			String WECHAT_WEB_DEBUG_OPENID = System.getProperty("wechat.web.debug.openid");
			MemberInfo info=new MemberInfo();
			info.setOpenid(WECHAT_WEB_DEBUG_OPENID);
			MemberRequestStateUtils.setMemberInfoToRedis(request, info);
		}
		
		if(memberInfo == null){
			String baseUrl =  request.getScheme()+"://" + request.getServerName(); //服务器地址  
			String redirectUrl = URLEncoder.encode(baseUrl+"/wechat-web/Oauth.do", "utf-8");
			String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+System.getProperty("wechat.appid")+"&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
	        PrintWriter out = response.getWriter();  
	        BaseRspJson rsp = new BaseRspJson();
	        rsp.setErrorCode(WCErrorCode.OAUTH_INVALID); 
	        rsp.setObj(url);
	        out.print(JsonConvert.ObjectToJson(rsp));  
	        return false;
		}

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception
	{
 		super.postHandle(request, response, handler, modelAndView);
 	}
	 
}

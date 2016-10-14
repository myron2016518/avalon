package com.ffzx.wechat.interceptor;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.ObjectUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ffzx.wechat.common.WechatContants;
import com.ffzx.wechat.utils.MemberRequestStateUtils;
import com.ffzx.wechat.web.MemberContextHolder;

 /**
 * @Description: 微信商城 登录拦截器
 * @author qh.xu
 * @email  qianghui.xu@ffzxnet.com
 * @date 2016年9月13日 下午3:16:59
 * @version V1.0 
 *
 */
public class WechatLoginInterceptor extends HandlerInterceptorAdapter{

	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		/**
		 * 设置当前请求信息
		 */
		MemberContextHolder.set(MemberRequestStateUtils.newRequestState(request));
		String requestUrl=request.getServletPath();
		if(requestUrl.contains(WechatContants.WECHAT_NEED_LOGIN)){//需要登录
			if(!MemberContextHolder.isLogin()){//未登录
				StringBuilder urlBuilder = new StringBuilder();
				urlBuilder.append(request.getScheme());
				urlBuilder.append("://");
				urlBuilder.append(request.getServerName());
				urlBuilder.append(":");
				urlBuilder.append(request.getServerPort());
				urlBuilder.append(obtainRequestContextPath(request));
				urlBuilder.append(WechatContants.WECHAT_LOGIN_PATH);
				// Http request with ajax
				if ("XMLHttpRequest".equalsIgnoreCase(request.getHeader("X-Requested-With"))) {
					response.addHeader("Pragma", "no-cache");
					response.addHeader("Cache-Control", "no-cache, no-store, max-age=0");
					response.addDateHeader("Expires", 1L);
					response.addHeader("Location", urlBuilder.toString());
					response.setContentType("text/html; charset=UTF-8");
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().println("用户会话已过期请重新登录！");
					return false;
				}
				
				urlBuilder.append("?redirectURL=");
				urlBuilder.append(URLEncoder.encode(getRedirectURL(request), "UTF-8"));
				response.sendRedirect(urlBuilder.toString());
				return false;
			}
		}
		request.setAttribute(WechatContants.WECHAT_MEMBER_INFO, MemberContextHolder.getMemberInfo());
		return true;
	}
	/**
	 * 获取请求url
	 * @param request
	 * @return
	 */
	public String getRedirectURL(HttpServletRequest request){
		String direct = request.getScheme()
				+ "://"
				+ request.getServerName()
				+ (request.getServerPort() == 80
						|| request.getServerPort() == 443 ? "" : (":" + request
						.getServerPort())) + request.getContextPath();
		direct += request.getServletPath()
				+ (request.getQueryString() == null ? "" : ("?" + request
						.getQueryString()));
		
		return direct;
	}
	
	/**
	 * 获取请求上下文
	 * 
	 * @param request
	 * @return String
	 */
	protected String obtainRequestContextPath(HttpServletRequest request) {
		String prefix = request.getContextPath();
		String suffix = ObjectUtils.toString(request.getAttribute("_urlrewrite_site"), "");
		String separator = (!prefix.endsWith("/") && !suffix.equals("") && !suffix.startsWith("/") ? "/" : "");
		return prefix + separator + suffix;
	}
	
}

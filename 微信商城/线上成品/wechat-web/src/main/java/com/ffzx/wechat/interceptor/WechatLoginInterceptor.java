package com.ffzx.wechat.interceptor;

import java.io.PrintWriter;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ff.common.util.format.JsonConvert;
import com.ff.common.util.validate.ValidatorUtil;
import com.ff.common.web.json.BaseRspJson;
import com.ffzx.commerce.framework.dto.ResultDto;
import com.ffzx.member.api.dto.Member;
import com.ffzx.wechat.common.WechatContants;
import com.ffzx.wechat.constant.WCErrorCode;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.service.SignService;
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

	@Autowired
	private SignService signService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		/**
		 * 设置当前请求信息
		 */
		MemberContextHolder.set(MemberRequestStateUtils.newRequestState(request));
		String requestUrl=request.getServletPath();
		MemberInfo memberInfo = MemberContextHolder.getMemberInfo();
		if(memberInfo == null && ValidatorUtil.isEmpty(memberInfo.getOpenid())){
			ResultDto result = signService.getMemberByOpenid(memberInfo.getOpenid());
			if(result.getCode().equals("0") && result.getData() != null){
				//该微信已经绑定
				Member member = (Member)result.getData();
			}
		}
		ResultDto result = signService.getMemberByOpenid(memberInfo.getOpenid());
		if(result.getCode().equals("0") && result.getData() != null){
			//该微信已经绑定
			Member member = (Member)result.getData();
		}
		if(memberInfo == null || ValidatorUtil.isEmpty(memberInfo.getPhone()) || ValidatorUtil.isEmpty(memberInfo.getOpenid()))
		{//未登录
			String baseUrl =  request.getScheme()+"://" + request.getServerName(); //服务器地址  
			String redirectUrl = "/wechat-web/?#!/Sign/Signin";
	        PrintWriter out = response.getWriter();  
	        BaseRspJson rsp = new BaseRspJson();
	        rsp.setErrorCode(WCErrorCode.OAUTH_INVALID); 
	        rsp.setObj(redirectUrl);
	        out.print(JsonConvert.ObjectToJson(rsp));   
			return false;
		}
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

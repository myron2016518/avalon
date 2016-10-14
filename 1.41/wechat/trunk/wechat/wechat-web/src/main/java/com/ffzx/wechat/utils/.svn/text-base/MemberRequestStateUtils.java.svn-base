package com.ffzx.wechat.utils;


import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.ArrayUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.ffzx.commerce.framework.constant.RedisPrefix;
import com.ffzx.commerce.framework.utils.RedisUtil;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.web.MemberInfoRequestState;


/**
 * 
 * @author chenjia
 * 
 */
public class MemberRequestStateUtils {
	
	public static RedisUtil getRedis(){
		WebApplicationContext wac = ContextLoader.getCurrentWebApplicationContext();
		RedisUtil redisUtil = (RedisUtil) wac.getBean("redisUtil");
		return redisUtil;
	}

	/**
	 * 获取请求IP
	 * 
	 * @param request
	 * @return String
	 */
	private static String getRequestIP(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");
		if (StringUtils.isEmpty(ip) == false) {
			// 多级反向代理 X-Forwarded-For 中第一个非 unknown 的字符串为有效 IP
			Matcher matcher = Pattern.compile("(?<!unknown)(\\d+\\.\\d+\\.\\d+\\.\\d+)").matcher(ip);
			ip = matcher.find() ? matcher.group(1) : null;
		} else {
			if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getHeader("Proxy-Client-IP");
			}
			if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getHeader("WL-Proxy-Client-IP");
			}
			if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getRemoteAddr();
			}
		}
        return StringUtils.isEmpty(ip) ? null : ip;
    }
 
    /**
     * 获取请求浏览器类型<br>
     * 0 Unknown<br>
     * 1 MSIE<br>
     * 2 Firefox<br>
     * 3 Safari<br>
     * 4 Chrome<br>
     * 5 Other<br>
     * 
     * @param request
     * @return int
     */
	private static int getRequestBrowser(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        if (StringUtils.isEmpty(userAgent)) {
        	return 0;
        } else if (userAgent.indexOf("MSIE") != -1) {
        	return 1;
        } else if (userAgent.indexOf("Firefox") != -1) {
        	return 2;
        } else if (userAgent.indexOf("Safari") != -1) {
        	return 3;
        } else if (userAgent.indexOf("Chrome") != -1) {
        	return 4;
        } else {
        	return 5;
        } 
    }
	
	/**
	 * 获取redis中的登录会员信息 放入ThreadLocal
	 * @param request
	 * @return
	 */
	public static MemberInfo getMemberInfoFromRedis(HttpServletRequest request){
		
		MemberInfo info=null;
		HttpSession session=request.getSession();
		String redisKey=RedisPrefix.WECHAT_LOGIN_MEMBER+"_"+session.getId();
		if(getRedis().exists(redisKey)){
			info=getRedis().get(redisKey, MemberInfo.class);
			if(null != info){
				setMemberInfoToRedis(request,info);
			}
		}
		return info;
	}
	
	/**
	 * 将登录会员信息 存到redis
	 * @param redisKey
	 * @param info
	 */
	public static void setMemberInfoToRedis(HttpServletRequest request, MemberInfo info){
		getRedis().setAsJson(RedisPrefix.WECHAT_LOGIN_MEMBER+"_"+request.getSession().getId(), info, 1800L);//半小时有效
	}

	@SuppressWarnings("unchecked")
	public static MemberInfoRequestState newRequestState(HttpServletRequest request) {
		Map<String, String> cookieMap = new HashMap<String, String>();
		Cookie[] cookies = request.getCookies();
		if (ArrayUtils.isNotEmpty(cookies)) {
			for (Cookie cookie : cookies) {
				cookieMap.put(cookie.getName(), cookie.getValue());
			}
		}

		Map<String, String> headerMap = new HashMap<String, String>();
		Enumeration<String> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String headerName = headerNames.nextElement();
			headerMap.put(headerName, request.getHeader(headerName));
		}
		
		return new MemberInfoRequestState(cookieMap, headerMap, getRequestIP(request), getRequestBrowser(request), getMemberInfoFromRedis(request));
	}
}

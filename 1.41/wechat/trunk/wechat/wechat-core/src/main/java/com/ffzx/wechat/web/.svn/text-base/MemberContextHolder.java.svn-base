package com.ffzx.wechat.web;

import java.util.Set;

import org.springframework.core.NamedThreadLocal;

import com.ffzx.commerce.framework.utils.StringUtil;
import com.ffzx.wechat.model.MemberInfo;

/**
 * ThreadLocal  获取 当前请求会话数据
 * @author chenjia
 *
 */
public abstract class MemberContextHolder {

	private static final ThreadLocal<MemberInfoRequestState> requestStateHolder = new NamedThreadLocal<MemberInfoRequestState>("WechatRequestState attributes");
	
	/**
	 * 重置请求环境属性
	 */
	public static void reset() {
		requestStateHolder.set(null);
	}
	
	/**
	 * 设置请求环境信息
	 * 
	 * @param userSession
	 */
	public static void set(MemberInfoRequestState requestState) {
		requestStateHolder.set(requestState);
	}
	
	

	/**
	 * 获取 Header
	 * 
	 * @param name
	 * @return String
	 */
	public final static String getHeader(String name) {
		MemberInfoRequestState requestState = requestStateHolder.get();
		if(StringUtil.isNotNull(requestState)){
			return requestState.getHeader(name);
		}
		return "";
	}
	
	/**
	 * 判断是否登录
	 * @return
	 */
	public static boolean isLogin(){
		MemberInfoRequestState requestState = requestStateHolder.get();
		if(null != requestState && null != requestState.getMemberInfo()){
			return true;
		}
		return false;
	}
	
	
	/**
	 * 从ThreadLocal中获取登录会员信息
	 * @return
	 */
	public static MemberInfo getMemberInfo(){
		MemberInfoRequestState requestState = requestStateHolder.get();
		return requestState.getMemberInfo();
	}
	
	

	/**
	 * 获取 Headers
	 * 
	 * @param name
	 * @return Enumeration
	 */
	public final static String getHeaders(String name) {
		MemberInfoRequestState requestState = requestStateHolder.get();
		if(StringUtil.isNotNull(requestState)){
			return requestState.getHeaders(name);
		}
		return "";
	}
	
	/**
	 * 获取 HeaderNames
	 * 
	 * @return Set
	 */
	public final static Set<String> getHeaderNames() {
		return requestStateHolder.get().getHeaderNames();
	}

	/**
	 * 获取 Cookie
	 * 
	 * @param name
	 * @return String
	 */
	public final static String getCookie(String name) {
		MemberInfoRequestState requestState = requestStateHolder.get();
		if(StringUtil.isNotNull(requestState)){
			return requestState.getCookie(name);
		}
		return "";
	}
	
	/**
	 * 获取 CookieNames
	 * 
	 * @return Set
	 */
	public final static Set<String> getCookieNames() {
		return requestStateHolder.get().getCookieNames();
	}
	
	/**
	 * 获取请求IP
	 * 
	 * @return String
	 */
	public final static String getRequestIP() {
		MemberInfoRequestState requestState = requestStateHolder.get();
		if(StringUtil.isNotNull(requestState)){
			return requestState.getRequestIP();
		}
		return "";
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
     * @return int
     */
	public final static int getRequestBrowser() {
		return requestStateHolder.get().getRequestBrowser();
	}
}

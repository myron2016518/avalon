package com.ffzx.wechat.web;

import java.util.Collections;
import java.util.Map;
import java.util.Set;

import com.ffzx.wechat.model.MemberInfo;

 /**
 * @Description: 微商城 request state
 * @author qh.xu
 * @email  qianghui.xu@ffzxnet.com
 * @date 2016年9月14日 上午8:11:50
 * @version V1.0 
 *
 */
public final class MemberInfoRequestState {
	private final Map<String, String> currentUserCookies;
	private final Map<String, String> currentUserHeaders;
	private final String requestIP;
	private final int requestBrowser;
	private final MemberInfo memberInfo;

	public MemberInfoRequestState( Map<String, String> currentUserCookies) {
		this(currentUserCookies, Collections.<String, String>emptyMap());
	}

	public MemberInfoRequestState( Map<String, String> currentUserCookies, Map<String, String>  currentUserHeaders) {
		this(currentUserCookies, currentUserHeaders, null, 0, null);
	}
	
	public MemberInfoRequestState( Map<String, String> currentUserCookies, Map<String, String> currentUserHeaders, String requestIP, int requestBrowser, MemberInfo memberInfo) {
		this.currentUserCookies = currentUserCookies;
		this.currentUserHeaders = currentUserHeaders;
		this.requestIP = requestIP;
		this.requestBrowser = requestBrowser;
		this.memberInfo=memberInfo;
	}


	protected String getHeader(String name) {
		return getHeaders(name);
	}

	protected String getHeaders(String name) {
		return currentUserHeaders.get(name);
	}
	
	protected Set<String> getHeaderNames() {
		return Collections.unmodifiableSet(currentUserHeaders.keySet());
	}

	protected String getCookie(String name) {
		return currentUserCookies.get(name);
	}
	
	protected Set<String> getCookieNames() {
		return Collections.unmodifiableSet(currentUserCookies.keySet());
	}
	
	protected String getRequestIP() {
		return requestIP;
	}
	
	protected int getRequestBrowser() {
		return requestBrowser;
	}

	public MemberInfo getMemberInfo() {
		return memberInfo;
	}
	
	
}

package com.ffzx.wechat.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ff.common.util.format.JsonConvert;
import com.ff.common.web.controller.FFBaseController;

public class WDataInterceptor extends HandlerInterceptorAdapter
{
	private Logger log = LoggerFactory.getLogger(getClass());

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		try
		{
			String url = request.getRequestURL().toString();
			String data = request.getParameter(FFBaseController.PARA);
  			log.info("the req url is " + url);
			log.info("the req data is " + data);

		}
		catch(Exception e)
		{
			log.error("loggin error ",e);
		}

		// TODO Auto-generated method stub
		return super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception
	{
 		super.postHandle(request, response, handler, modelAndView);
 	}
	 
}

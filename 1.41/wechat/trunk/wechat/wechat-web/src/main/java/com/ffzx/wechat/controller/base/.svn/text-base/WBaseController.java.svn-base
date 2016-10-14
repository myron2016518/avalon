package com.ffzx.wechat.controller.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ff.common.constant.FFErrorCode;
import com.ff.common.util.format.JsonConvert;
import com.ff.common.util.validate.ValidatorUtil;
import com.ff.common.web.controller.FFBaseController;
import com.ff.common.web.json.BaseRspJson;
import com.ffzx.commerce.framework.exception.ServiceException;

public class WBaseController extends FFBaseController
{
	private Logger log = LoggerFactory.getLogger(getClass());

	@ExceptionHandler
	public String exp(HttpServletRequest request,HttpServletResponse response, Exception ex)
	{

		log.error(ex.getMessage(), ex);

		BaseRspJson rsp = new BaseRspJson<>();
		if (ex instanceof ServiceException)
		{
			rsp.setErrorCode(((ServiceException) ex).getCode());
		} else
		{
 			rsp.setErrorCode(FFErrorCode.FAIL);
 		}

		this.responseWrite(response, JsonConvert.ObjectToJson(rsp));

		return null;
	}
}

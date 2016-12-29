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
import com.ff.common.web.json.BaseReqJson;
import com.ff.common.web.json.BaseRspJson;
import com.ff.common.web.json.FFSysUser;
import com.ffzx.commerce.framework.exception.ServiceException;
import com.ffzx.wechat.exception.CallInterfaceException;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.util.AppUtils;
import com.ffzx.wechat.utils.MemberRequestStateUtils;
import com.ffzx.wechat.web.MemberContextHolder;

public class WBaseController extends FFBaseController
{
	private Logger log = LoggerFactory.getLogger(getClass());

	@ExceptionHandler
	public String exception(HttpServletRequest request,HttpServletResponse response, Exception ex)
	{

		log.error(ex.getMessage(), ex);

		BaseRspJson rsp = new BaseRspJson<>();
		if (ex instanceof ServiceException)
		{
			if(FFErrorCode.SUCCESS != ((ServiceException) ex).getCode())
			{
				rsp.setErrorCode(((ServiceException) ex).getCode());
			}
			else
			{
				rsp.setErrorCode(FFErrorCode.FAIL);
			}
 			rsp.setMessage(((ServiceException) ex).getMessage());
		}else if(ex  instanceof CallInterfaceException){

			rsp.setErrorCode(FFErrorCode.FAIL);
 			rsp.setMessage(((CallInterfaceException) ex).getErrorMsg());
		}
		else
		{
 			rsp.setErrorCode(FFErrorCode.FAIL);
 			rsp.setMessage("操作失败");
 		}
		
//		catch(CallInterfaceException e){
//			rsp.setErrorCode(WCErrorCode.FAIL);
//			rsp.setMessage(e.getErrorMsg());
//		}

		this.responseWrite(response, JsonConvert.ObjectToJson(rsp));

		return null;
	}

	public boolean isLogin()
	{
		FFSysUser user = super.GetSysUser();

		if(null == user)
		{
			return false;
		}
		if(ValidatorUtil.isEmpty(user.getUser_id()))
		{
			return false;
		}
		return true;
	}
	@Override
	protected FFSysUser GetSysUser()
	{
		// TODO Auto-generated method stub
		FFSysUser user = super.GetSysUser();
 		MemberContextHolder.set(MemberRequestStateUtils.newRequestState(getRequest()));
		MemberInfo memberInfo = MemberContextHolder.getMemberInfo();
		if(null == memberInfo)
		{
			memberInfo = new MemberInfo();
		}
		user.setUser_id(memberInfo.getId());
		user.setUser_name(memberInfo.getPhone());
		user.setInfo(memberInfo);
		
		return user;
	}

	@Override
	protected String GetReqJson()
	{
		// TODO Auto-generated method stub
		String req = super.GetReqJson();
		req = AppUtils.decode(req);
		return req;
	}

 
	
	
	
}

package com.ffzx.wechat.controller.base;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.util.log.FFLogFactory;
import com.ff.common.util.meta.ReflectionUtil;
import com.ff.common.util.validate.ValidatorUtil;
import com.ff.common.web.json.BaseRspJson;
import com.ff.common.web.json.PageDataJson;
import com.ffzx.wechat.service.base.WBaseService;

import net.sf.json.JSONObject;

public class WTableController<E> extends WBaseController implements InitializingBean
{
	private Logger log = FFLogFactory.getLog(this.getClass());
	@Autowired
	private WBaseService<E> wBaseService; 
	
	
	
	public WBaseService<E> getService()
	{
		return wBaseService;
	}

	public Class GetTableClass()
	{
		// TODO Auto-generated method stub
		return  ReflectionUtil.getSuperClassGenricType(getClass());
	}

	@Override
	public BaseRspJson Load()
	{
		BaseRspJson rsp = new BaseRspJson();
		PageDataJson<E> dataList = this.getService().load(this.GetSysUser(), this.GetFilterCondition(), this.GetPage());
		rsp.setObj(dataList);
		return rsp;
	}
	
	@RequestMapping("/LoadAll")
	@ResponseBody
	public BaseRspJson LoadAll()
	{
		BaseRspJson rsp = new BaseRspJson();
		List<E> dataList = this.getService().load(this.GetSysUser(), this.GetFilterCondition());
		rsp.setObj(dataList);
		return rsp;
	}
	
	@RequestMapping("/Count")
	@ResponseBody
	public BaseRspJson Count()
	{
		BaseRspJson rsp = new BaseRspJson();
		int count = this.getService().count(this.GetSysUser(), this.GetFilterCondition());
		rsp.setObj(count);
		return rsp;
	}
	
	@RequestMapping("/Show")
	@ResponseBody
	public BaseRspJson Show()
	{
		BaseRspJson rsp = new BaseRspJson();
 		String obj_id = this.getObj(String.class);
 		E obj = this.getService().show(this.GetSysUser(), obj_id);
		rsp.setObj(obj);
		return rsp;
	}
	
	@RequestMapping("/Delete")
	@ResponseBody
	public BaseRspJson Delete()
	{
		BaseRspJson rsp = new BaseRspJson();
		
		String obj_id = this.getObj(String.class);
		
		this.getService().delete(this.GetSysUser(), obj_id);
		
		return rsp;
	}
	
	@RequestMapping("/Modify")
	@ResponseBody
	public BaseRspJson Modify()
	{
		BaseRspJson rsp = new BaseRspJson();
		
		E obj = this.getObj(this.GetTableClass());
		
		this.getService().update(this.GetSysUser(), obj);
		
		return rsp;
	}
	
	@RequestMapping("/Create")
	@ResponseBody
	public BaseRspJson Create()
	{
		BaseRspJson rsp = new BaseRspJson();
		
		E obj = this.getObj(this.GetTableClass());
		
		obj = this.getService().create(this.GetSysUser(), obj);
		rsp.setObj(obj);
		
		return rsp;
	}
	
	public String getCityId()
	{
		JSONObject obj = null;
		try
		{
			String json = this.GetReqJson();
			if(!ValidatorUtil.isEmpty(json))
			{
				obj = JSONObject.fromObject(json);	
			}
			 
		}
		catch(Exception e)
		{
			log.warn("convert req faield");
		}
		
 		
		if(null != obj)
		{
			return obj.getString("cityId");
		}
 		return "";
 	}
 
	@Override
	public void afterPropertiesSet() throws Exception
	{
		if(null != getService())
		{
			getService().setEntityClass(this.GetTableClass());
			getService().setCityId(this.getCityId());
		}
		
	}
	
	
}

package com.ffzx.wechat.controller.base;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.util.meta.ReflectionUtil;
import com.ff.common.web.json.BaseRspJson;
import com.ff.common.web.json.PageDataJson;
import com.ffzx.wechat.service.base.WBaseService;

public class WTableController<E> extends WBaseController implements InitializingBean
{
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
	
	@RequestMapping("/Show")
	@ResponseBody
	public BaseRspJson Show()
	{
		// TODO Auto-generated method stub
		return super.Load();
	}

	@Override
	public void afterPropertiesSet() throws Exception
	{
		if(null != getService())
		{
			getService().setEntityClass(this.GetTableClass());
		}
		
	}
	
	
}

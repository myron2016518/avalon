package com.ffzx.wechat.service.base;

import java.util.List;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ff.common.dao.model.FFCondition;
import com.ff.common.service.IBaseService;
import com.ff.common.util.meta.ReflectionUtil;
import com.ff.common.web.json.FFSysUser;
import com.ff.common.web.json.PageDataJson;
import com.ff.common.web.json.PageJson;
import com.ffzx.wechat.dubbo.BaseConsumer;
import com.ffzx.wechat.dubbo.ConsumerContext;

@Service()
@Scope("prototype")
public class WBaseService<E> implements IBaseService<E>
{
	@Autowired
	BaseConsumer<E> baseConsumer;
	private Class<?> entityClass;
	 

	public WBaseService()
	{
		this.entityClass = ReflectionUtil.getSuperClassGenricType(getClass());
	}

 
	public Class<?> getEntityClass()
	{
		return entityClass;
	}
	
	
	public void setEntityClass(Class<?> entityClass)
	{
		this.entityClass = entityClass;
		baseConsumer = (BaseConsumer<E>)ConsumerContext.getInstance().getConsumer(this.getEntityClass());
	}


	@Override
	public PageDataJson<E> load(FFSysUser user, List<FFCondition> conditionList, PageJson page)
	{
		// TODO Auto-generated method stub
		return baseConsumer.load(conditionList, page);
	}

	@Override
	public List<E> load(FFSysUser user, List<FFCondition> conditionList)
	{
		// TODO Auto-generated method stub
		return baseConsumer.load(conditionList);
	}

	@Override
	public void create(FFSysUser user, E obj)
	{
		baseConsumer.create(obj);
 	}

	@Override
	public void update(FFSysUser user, E obj)
	{
		baseConsumer.update(obj);
 	}

	@Override
	public E show(FFSysUser user, String id)
	{
 		return baseConsumer.get(id);
	}

	@Override
	public void delete(FFSysUser user, String id)
	{
		baseConsumer.delete(id);
 	}

	@Override
	public void delete(FFSysUser user, List<String> idList)
	{
		baseConsumer.delete(idList);
 	}
 
}

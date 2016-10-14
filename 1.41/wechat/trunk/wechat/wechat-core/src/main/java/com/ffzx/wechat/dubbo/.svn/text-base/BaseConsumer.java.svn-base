package com.ffzx.wechat.dubbo;

import java.util.List;

import com.ff.common.dao.model.FFCondition;
import com.ff.common.util.meta.ReflectionUtil;
import com.ff.common.web.json.PageDataJson;
import com.ff.common.web.json.PageJson;

public class BaseConsumer<E>
{
	
	public Class<?> getEntityClass()
	{
 		return  ReflectionUtil.getSuperClassGenricType(getClass());
	}
	
	public PageDataJson<E> load(List<FFCondition> conditionList,PageJson page)
	{
		return null;
	}
	
	public List<E> load(List<FFCondition> conditionList)
	{
		return null;
	}
	public void create(E obj)
	{
		
	}
	public void update(E obj)
	{
		
	}
	public E get(String id)
	{
		return null;
	}
	public void delete(String id)
	{
		
	}
	public void delete(List<String> idList)
	{
		
	}
}

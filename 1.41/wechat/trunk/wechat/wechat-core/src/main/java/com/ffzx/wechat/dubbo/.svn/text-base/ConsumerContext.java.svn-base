package com.ffzx.wechat.dubbo;

import java.util.Map;

import com.ff.common.service.BaseService;
import com.ff.common.util.spring.SpringContextUtil;

public class ConsumerContext
{
	private static ConsumerContext instance;
	 
	 

 	private ConsumerContext()
	{

	}

	public static synchronized ConsumerContext getInstance()
	{
		if (null == instance)
		{
			instance = new ConsumerContext();
		}
		return instance;
	}
	public <T> BaseConsumer<T> getConsumer(Class<T> clazz)
	{
		Map<String,BaseConsumer> map = SpringContextUtil.getBeans(BaseConsumer.class);
	 
		for(String beanName : map.keySet())
		{
			BaseConsumer consumer = map.get(beanName);
			if(clazz.equals(consumer.getEntityClass()))
			{
				return consumer;
			}
		}
		
   		return null;
	}
}

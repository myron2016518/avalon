package com.ffzx.wechat.interceptor;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.ff.common.util.format.JsonConvert;

public class WRspConverter extends MappingJackson2HttpMessageConverter
{
	private Logger log = LoggerFactory.getLogger(getClass());

	@Override
	protected void writeInternal(Object object, HttpOutputMessage outputMessage)
			throws IOException, HttpMessageNotWritableException
	{
		super.writeInternal(object, outputMessage);
		
		String data = JsonConvert.ObjectToJson(object);
		
		if(null != data && data.length() > 2000)
		{
			data = data.substring(0,1000) + "..............." + data.substring(data.length()-1000,data.length());
			log.info("the data is too long so just print 2000");
		}
		
		log.info("the rsp data is " + data);

	}

 

 
 
 
}

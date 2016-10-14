package com.ffzx.wechat.dubbo;


import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ff.common.dao.model.FFCondition;
import com.ff.common.web.json.PageDataJson;
import com.ff.common.web.json.PageJson;
import com.ffzx.commerce.framework.exception.ServiceException;
import com.ffzx.commodity.api.dto.Category;

@Service
public class CategoryConsumer extends BaseConsumer<Category>
{
	private Logger log = LoggerFactory.getLogger(getClass());
	@Override
	public PageDataJson<Category> load(List<FFCondition> conditionList, PageJson page)
	{
		PageDataJson<Category> dataList = new PageDataJson<>();
		log.info("now load");
		throw new ServiceException();
		//return dataList;
	}

}

var ff = ff || {};
ff.req = ff.req || {};
ff.img = "http://image.ffzxnet.com";
ff.com = {};



ff.com.log  = {};
ff.com.log.debug =function (message,obj)
{
	 ff.log.debug(message,obj,ff.com.name);
};
ff.com.log.info =function (message,obj)
{
	 ff.log.info(message,obj,ff.com.name);
};
ff.com.log.warn =function (message,obj)
{
	 ff.log.warn(message,obj,ff.com.name);
};
ff.com.log.error =function (message,obj)
{
	 ff.log.error(message,obj,ff.com.name);
};

ff.com.getFilterObj = function(element,otherCondition)
{
	
	element = element || "ff_filter";
	try
	{
	    var conditionList = [];
	    //获取搜索form中所有的input
	    var inputs = ff.com.getJqObj(element).find("input");
	    //获取searchForm中的input内容。
	    //引用EasyUI格式的input运行后审查元素会发现生成了3个input，所以需要根据filterType属性筛选。
	    //循环这个input数组取值
	    var attrName;
	    var condition = new Object;
	    inputs.each(function () {
	        
	        if (null != $(this).attr("filter"))
	        {
	            condition.filterType = $(this).attr("filter");
	            //attrName = $(this).attr("name");
	            condition.name = $(this).attr("name");
	            condition.value = $(this).val();
	            if(condition.name !=""  && condition.value != "")
	            {
	            	conditionList.push(condition);
		            condition = new Object;
	            }
	        }
	    });
	    if(null != otherCondition)
    	{
	    	conditionList.push(searchObj);
    	}
	}
	catch(e)
	{
		ff.com.log.warn("get filter error",e);
	}

    return conditionList;
};

ff.com.getCondition = function(obj)
{
  	try
	{
	    var conditionList = [];
	    
	    if(null != obj)
	    {
	    	if(Object.prototype.toString.call(obj) === "[object String]")
	    	{
    	    	var condition = {};
    	    	condition.value = obj;
    	    	condition.filterType = "eq";
    	        conditionList.push(condition);
	    	}
	    	else if(obj instanceof Array)
	    	{
	    		conditionList = obj;
	    	}
	    	else
	    	{
	    		if(('name' in obj )&& ('value' in obj))
	    		{
	    			conditionList.push(obj);
	    		}	
	    		else
	    		{
	    			 for(var key in obj)
	 	    	    {  
	 	    	    	var condition = {};
 	 	    	    	condition.name = key;
	 	    	    	condition.value = obj[key];
	 	    	    	condition.filterType = "eq";
	 	    	        conditionList.push(condition);
	 	    	    }
	    		}	
	    	    
	    	}	
 	    }	
 
	}
	catch(e)
	{
		ff.com.log.warn("get filter error",e);
	}

    return conditionList;
};

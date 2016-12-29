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

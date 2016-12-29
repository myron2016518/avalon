var ff = ff || {};
ff.log = {};
ff.log.level = 2; //debug 1 , info 2, warn 3, error 4

ff.log.debug =function (message,obj,location)
{
	 ff.log.log(message,obj,location,1);
};
ff.log.info =function (message,obj,location)
{
	 ff.log.log(message,obj,location,2);
};
ff.log.warn =function (message,obj,location)
{
	 ff.log.log(message,obj,location,3);
};
ff.log.error =function (message,obj,location)
{
	 ff.log.log(message,obj,location,4);
};

ff.log.log  = function (message,obj,location,level)
{
	if(level>=ff.log.level)
	{
		try
		{
			if(null != location)
			{
				console.log(JSON.stringify(message)+":"+JSON.stringify(obj) + ",the location is " + location);
			}	
			else if(null != obj)
			{
				console.log(JSON.stringify(message)+":"+JSON.stringify(obj));
			}
			else
			{
				console.log(JSON.stringify(message));
			}
		}
		catch(e)
		{
			console.log(e);
		}
	}

};
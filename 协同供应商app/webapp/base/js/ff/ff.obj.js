var ff = ff || {};
ff.obj = {};
 
ff.obj.find = function(objList,name,value)
{
	if(null == objList)
	{
		return null;
	}
    for(var i=0;i<objList.length;i++)
    {
        if(objList[i][name] == value)
        {
            return objList[i];
        }
    }
    return null;
};

ff.obj.findList = function(objList,name,value)
{
     
};

ff.obj.isString = function(obj)
{
	if(null == obj)
	{
		return false;
	}	
	if(Object.prototype.toString.call(obj) === "[object String]")
	{
		return true;
	}	
	return false;
}

ff.obj.isArray = function(obj)
{
	if(null == obj)
	{
		return false;
	}	
	if(obj instanceof Array)
	{
		return true;
	}	
	return false;
}

ff.obj.add = function(array1,array2)
{
	if(ff.obj.isArray(array1))
	{
		if(ff.obj.isArray(array2))
		{
			for(var i=0;i<array2.length;i++)
			{
				array1.push(array2[i]);
			}	
		}
		else
		{
			if(null != array2)
			{
				array1.push(array2);
			}
		}	
	}	
	return array1;
}
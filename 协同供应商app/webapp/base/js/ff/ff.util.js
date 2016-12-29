var ff = ff || {};

 

ff.util = {};


ff.util.date = {};
ff.util.date.format = function()
{
	if (!Date.prototype.format) {
	    Date.prototype.format = function(fmt) {
	        var o = {
	            'M+': this.getMonth() + 1,
	            'd+': this.getDate(),
	            'h+': this.getHours(),
	            'm+': this.getMinutes(),
	            's+': this.getSeconds(),
	            'q+': Math.floor((this.getMonth() + 3) / 3),
	            'S': this.getMilliseconds()
	        }

	        if (/(y+)/.test(fmt))
	            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));

	        for (var k in o)
	            if (new RegExp('(' + k + ')').test(fmt))

	                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));

	        return fmt;
	    }
	}
};

ff.util.date.format();


ff.util.show = function(message,type)
{ 
	type = type || "text";
	if(ff.obj.isString(message))
	{
		if(type == 'success')
		{
	 		$.toast(message);
		}	
		else
		{
	 		$.toast(message, type);
		}	
	}	
	else
	{
		if(null != message)
		{
			if(null != message.message)
			{
				if(type == 'success')
				{
			 		$.toast(message.message);
				}	
				else
				{
			 		$.toast(message.message, type);
				}	
			}	
			
 		}	
	}	
}


ff.util.confirm = function(data)
{
	
	if(null == data.title)
	{
		data.title = '温馨提示';
	}	
	if(null == data.onCancel)
	{
		data.onCancel = function()
		{
			
		};
	}
		
	$.confirm(data);
}

ff.util.alert = function(data)
{
	$.modal({
		  title: "温馨提示",
		  text: data,
		  buttons: [
		    { text: "我知道了" }
		  ]
		});
}

ff.util.rootUrl = function()
{
    //获取当前网址，如： http://localhost:8080/Tmall/index.jsp 
    var curWwwPath = window.document.location.href;

    //获取主机地址之后的目录如：/Tmall/index.jsp 
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);

    //获取主机地址，如： http://localhost:8080 
    var localhostPath = curWwwPath.substring(0, pos);
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    //获取带"/"的项目名，如：/Tmall
    return localhostPath + projectName ;
};

 
ff.util.isFullPath = function(url)
{
	if(null == url)
	{
		return false;
	}	
	var index = url.indexOf("http");
	if(index>0)
	{
		return true;
	}	

	return false;
}

ff.util.buildUrl = function (url)
{
	var abUrl = ff.util.rootUrl();
	
	if(ff.util.isFullPath(url))
	{
		return url;
	}	
	
	if(url.indexOf("/") != 0)
	{
		abUrl = abUrl + "/"; 
	}	
	abUrl = abUrl +  url + ".do";
 
	return abUrl; 
};

 
ff.util.objToJson = function (obj)
{
	return JSON.stringify(obj);
};
ff.util.jsonToObj = function (json)
{
	try
	{
		var obj = JSON.parse(json);
	}
	catch(e)
	{
		ff.log.error("json convert error", json);
	}
	return obj;
};

ff.util.isSuccess = function (obj) {
    var result = false;
    if (obj.errorCode == 0) {
        result = true;
    }
    return result;
};


ff.util.submit = function(data)
{
	ff.req = {};
	if(null == data)
	{
		 ff.log.error("data is null when submit");
		 return;
	}
	if((null != data.data)&&ff.obj.isString(data.data)&&(data.data.indexOf("#")>=0))
	{
    	ff.req.obj = $(data.data).serializeObject();			
	}
	else if(null != data.data){
		ff.req.obj = ff.page.vmData(data.data);
	}
	
	if(null != data.condition)
	{
		ff.req.condition = ff.com.getCondition(ff.page.vmData(data.condition));
		
	}	
	
	if(null != data.page)
	{
		if(null != data.page.$model)
		{
			ff.req.page = data.page.$model;
		}
		else
		{
			ff.req.page = data.page;
		}	
			
	}
	
	if(data.isPage == true)
	{
 		ff.req.needPage = true;
	}
	else
	{
		ff.req.needPage = false;
	}

    var json = ff.util.objToJson(ff.req);
    data.url = ff.util.buildUrl(data.url) + "?para=" + json;;
    data.data = json;
    var callback = data.success;
    data.success = function(rsp)
    {
         if (!ff.util.isSuccess(rsp))
         {
    		if(null != rsp)
    		{
    			if(rsp.errorCode == '10001')
    			{
    				if(null != rsp.obj)
    				{
    					location.href=rsp.obj;
    				}	
    			}
    			else
    			{
    				ff.util.show(rsp);
    			}
    		}
    		else
    		{
    			ff.util.show(rsp);
    		}	
            
        }
         if(null != callback)
         {
         	callback(rsp);
         }
    	
    };
 
    ff.util.ajax(data);
};

 

ff.util.ajax = function(para)
{
	try
	{
		var waiting = true;
		if(null == para.wait)
		{
			var $loading = $('.weui_loading_toast');
			
			//判断是否已经有“加载中...”提示在显示
			if ($loading.length == 0 || $loading.is(':visible') == false) {
				$.showLoading("加载中...");
			}
		}
		else if(false == para.wait)
		{
			waiting = false;
		}
		else
		{
			if(ff.util.isString(para.wait))
			{
				$.showLoading(para.wait);
			}
		}	
		
		var contentType = "";
	    {
	        contentType = "text/html";
	    }
	    
        $.ajax({
            type: "post",
            url: para.url ,
            contentType: contentType,
            dataType: "json",
            success:function (data)
            {
            	if(waiting)
            	{
        			//$.hideLoading();
            	}	
        		if(data.errorCode == 10)
        		{
        			//top.location = ff.util.buildPageUrl("Index/Login.html");      //error to login
        		}
        		try
        		{
            		para.success(data);
        		}
        		catch(e)
        		{
        			ff.log.error("failed",e);
        		}
            },
            error: function (error) {
        		if(waiting)
            	{
        			$.hideLoading();
            	}	
        		if(null != para.error)
        		{
        			
        			try
            		{
        				para.error(error);
            		}
            		catch(e)
            		{
            			ff.log.error("failed",e);
            		}
        		}	
        		ff.util.show("网络请求失败");
            }
        });
	}
	catch(e)
	{
		alert(e);
	}
};


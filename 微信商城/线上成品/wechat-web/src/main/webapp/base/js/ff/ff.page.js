/**
 * @Description 
 * @author tangjun
 * @date 2016年8月14日
 * 
 */
var ff = ff || {};

ff.page = {};

//页面初始化
//data: {vm:{},url:''}
//init: function(vm)
ff.page.init = function(data)
{
	var res = ['css!./css.css', 'text!./html.html'];
	if(null != data.res)
	{
		res = ff.obj.add(res,data.res);
	}	
	define(res, function(css, html) {

		var pageName = FFWX.currPage;
 
		data = data || {};
		data.vm = data.vm || {};
		data.isPage = data.isPage || false;
		
		var vm_data = data.vm;
		vm_data.$id=pageName;
		if(null == vm_data.obj)
		{
			vm_data.obj = {};
		}	
 
		vm_data.html = html;
		
		vm_data.page = {currentPage:1,pageSize:10};	
		
		if(null != data.title)
		{
			FFWX.pageOpt[pageName] = FFWX.pageOpt[pageName] || {};
			FFWX.pageOpt[pageName].label = data.title
		}	
		
		var cache = {};
		cache.url = data.url;
		cache.loadMore = data.loadMore ;
		cache.isPage = data.isPage ;
		cache.afterLoad = data.afterLoad ;
		cache.data = data.data;
		cache.condition = data.condition;
		cache.success = data.success;
		vm_data.ff_page_cache = cache;
		
		//初始化完成的事件
		vm_data.afterLoad = function()
		{
			try
			{
	 			 ff.page.reload(data);	
			}
			catch(e)
			{
				ff.log.error("afterload failed",e);
			}
		};
		if(null != data.init)
		{
			var temp = data.init(vm_data);
			if(null != temp )
		    {
				vm_data = temp;
		    }		
		}	
 		try
 		{
 	  		var vm = initVm(vm_data,pageName);

 		}catch(e)
 		{
 			ff.log.error("init failed",e);
 		}
 	
  		
	});
}
ff.page.reload = function(data)
{
	var vm = ff.page.vm();

	data = data || {};
	var cache = vm.ff_page_cache;
	data.url = data.url || cache.url;
	data.loadMore = data.loadMore || cache.loadMore;
	if(null == data.isPage)
	{
		data.isPage = cache.isPage || false;
	}	
	
	data.afterLoad = data.afterLoad || cache.afterLoad;
	data.data = data.data || cache.data;
	data.condition = data.condition || cache.condition;
	data.success = data.success || cache.success;
 	
		var req =  ff.page.req();
		if(null != req && null == data.url)
		{
			vm.obj = req;
		}	
		
	if(data.isPage == true || null != data.loadMore)
	{
		vm.page = {currentPage:1,pageSize:10};
		//初始上拉加载更多的方法
		bottomLoad(function()
		{
			var vm = ff.page.vm();
			                                   
			if(vm.page.currentPage*vm.page.pageSize >= vm.page.total)
			{
				if(null != data.loadMore)
				{
					data.loadMore(vm.page,false);
				}
				ff.page.loadFinish();
				return;
			}	
			vm.page.currentPage = vm.page.currentPage + 1;

			if(data.isPage == true && null != data.url)
			{
				ff.page.load(data,true);
			}
			if(null != data.loadMore)
			{
				data.loadMore(vm.page,true);
			}
		});	
			
	}
		
	if(null != data.url)
	{
		ff.page.load(data,vm);
	}
		
	if(null != data.afterLoad)
	{
		data.afterLoad(ff.page.vm());
	}
}
ff.page.loadFinish = function()
{
	bottomLoad('Done');
}
ff.page.loadEnd = function()
{
	bottomLoad('End');
}
ff.page.load = function(data,append)
{
	var req = data.data || ff.page.req();
	var condition = data.condition || ff.page.req();

	var vm = ff.page.vm();
	
	
	
	
 	
	ff.page.submit({
		url:data.url,
		data:req,
		condition:condition,
		isPage:data.isPage,
		page:vm.page,
		
		success:function(rsp)
		{
			if(data.isPage == false)
			{
				if(null != rsp.obj)
				{
					vm.obj = rsp.obj;
				}	
				
			}	
			else
			{
				if(null == rsp.obj)
				{
				   ff.log.warn("the rsp obj is empty");
				   return;
				}
 				if(null != append && append == true)
				{
					if(null == rsp.obj.dataList || rsp.obj.dataList.length == 0)
					{
						//ff.page.loadEnd();
						return;
					}	
					if(null == vm.obj)
					{
						vm.obj = [];
					}	
					if(!(vm.obj instanceof Array))
					{
						obj = [];
					}	
					vm.obj = ff.obj.add(vm.obj,rsp.obj.dataList);
					//vm.obj.push(rsp.obj.dataList)
 				}	
				else
				{
					if(null == rsp.obj.dataList)
					{
						vm.obj = [];
					}
					else
					{
						vm.obj = rsp.obj.dataList;

					}	
					
				}	
				
				
			}	
			if(null != data.success)
			{
				data.success(rsp);
			}	
		},
	});
}

ff.page.req = function(key)
{
	if(null == para)
	{
		key = 'para';
	}
	if(null == FFWX.urlParam)
	{
		return null;
	}	
	if(null == FFWX.urlParam.query)
	{
		return null;
	}
	if(null == FFWX.urlParam.query[key])
	{
		return null;
	}
	var para = FFWX.urlParam.query[key];
	para = decodeURIComponent(para);
	var rsp = ff.util.jsonToObj(para);
	if(null == rsp)
	{
		return para;
	}	
 
	return rsp;
}

ff.page.vm = function(page)
{
	var pageName = page||FFWX.currPage;
	return FFWX.vm[pageName];
}

ff.page.url = function(url)
{
	if(null == url)
	{
		return url;
	}
	if(ff.util.isFullPath(url))
	{
		return url;
	}
	
	
	var index = url.indexOf("/");
	if(index>0)
	{
		return url;
	}	
	
	return ff.page.action() + "/" + url;
}

ff.page.action = function()
{
	var page = FFWX.currPage;
	var temp =page.split("/");
	return temp[0];
}

ff.page.submit = function(data)
{
	if(null != data.url)
	{
		data.url = ff.page.url(data.url);
	}	
	data.isPage = data.isPage || false; 
	if(data.isPage == true)
	{
		data.page = data.page || {currentPage:1,pageSize:10};
		var callback = data.success;
		 	
		data.success = function(rsp)
		{
			if(null != callback)
			{
				callback(rsp);
			}	
			if(null != rsp && null != rsp.obj)
			{
				ff.page.vm().page = rsp.obj.page;
			}	
			ff.page.loadFinish();
		};
		
		var error = data.error;
		data.error = function(rsp)
		{
			if(null != error)
			{
				error(rsp);
			}
			ff.page.loadFinish();
		};
	}		
	var temp = data.success;
	data.success = function(rsp)
	{
		if(null != temp)
		{
			temp(rsp);

		}	
	
 	};	
	ff.util.submit(data);
}
ff.page.back = function()
{
	window.history.back(-1); 
}
ff.page.go = function(data)
{
	data = data || {};
	
	var url ="";
	if(ff.obj.isString(data))
	{
		url = data;
	}	
	else
	{
		url = data.url;
	}	
 	
	if(ff.util.isFullPath(url))
	{
		return;
	}
 
 	url = ff.page.url(url);
 	
	var _opt = null;

	if(null != data.data)
	{
 		para = ff.page.vmData(data.data);
 		_opt = para;
		//url = url+ "?para=" + ff.util.objToJson(para); 
	}
	//_opt.replace = data.replace || _opt.replace;
	//_opt.silent = data.silent || _opt.silent;
	
	if(null != data.title)
	{
		FFWX.pageOpt[url] = FFWX.pageOpt[url] || {};
		FFWX.pageOpt[url].label = data.title
	}	

	goPage(url,_opt);
	
}

//去除avalon 附加的属性
ff.page.vmData = function(data)
{
	if(null == data)
	{
		return data;
	}	
	var result = data;
	if(ff.obj.isArray(data))
	{
		result = [];
		for(var i=0;i<data.length;i++)
		{
			var e;
			if(null != data[i].$model)
			{
				e = data[i].$model;
			}	
			else
			{
				e = data[i];
			}
			result.push(e);
		}	
	}	
	else
	{
		if(null != data.$model)
		{
			result = data.$model;
		}	
		else
		{
			result = data;
		}
	}	
	
	return result;
};
 

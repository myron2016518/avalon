ff.page.init({
	vm:{
 		sub_list: [],
		recommend_list: [],
		select_tab:'0',
		tab_change: tab_change,
		item_click: item_click
       },
	url:'LoadAll',
	success:function(rsp)
	{
		if(ff.util.isSuccess(rsp))
		{
			if(null != rsp.obj && rsp.obj.length >0)
			{
				var vm = ff.page.vm();
				vm.select_tab = rsp.obj[0].id;
				loadSub(vm.select_tab);
			}	
			
		}	
	}
});

function tab_change(item)
{
	var vm = ff.page.vm();
	vm.select_tab = item.id;
  
	loadSub(item.id);
}

function loadSub(itemId)
{
  	ff.page.submit({
 		url:'LoadAll',
 		condition:itemId,
 		success:function(rsp)
 		{
 			var vm = ff.page.vm();
 			vm.sub_list = rsp.obj;
  		}
 	});
  	
  	ff.page.submit({
 		url:'RecommendCommodity/Load',
 		page:{pageSize:20,currentPgae:1},
 		condition:{cid:itemId},
 		isPage:true,
 		success:function(data)
 		{	
 			ff.page.vm().recommend_list = data.obj.dataList;
 		}
 	});
}

function item_click(item)
{
	ff.page.go({
		url:"Commodity/Index",
		title:item.name,
		data:{cid:item.id,desc:1,sort:"sales"}
	});
}

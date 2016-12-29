
var vm ={		 
 		sub_list: [],
		recommend_list: [],
		select_tab:'0',
		tab_change: tab_change
       };

ff.page.init({
	vm:vm,
	url:'LoadAll',
    afterLoad:function(vm)
    {
    	
    }
});

function tab_change(item)
{
	var vm = ff.page.vm();
	vm.select_tab = item.id;
  
  	ff.page.submit({
 		url:'LoadAll',
 		condition:item.id,
 		success:function(rsp)
 		{
 			vm.sub_list = rsp.obj;
 		 
  		}
 	});
}

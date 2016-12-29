ff.page.init(
   {
	vm:{
		goEdit:goEdit,
		goDelete:goDelete,
		goCreate:goCreate,
		select_addr:function(item)
		{
			if(ff.temp == 'select_addr')
			{
				ff.temp_obj = item;
				ff.page.go("Pay/Index");
			}	
			
		}
	},
	url:'LoadAll',
 
});
//修改
function goEdit(item)
{
	
	ff.page.go({url:"Show",data:item});
}

//删除
function goDelete(item)
{
	var vm = ff.page.vm();	  
  	ff.page.submit({
 		url:'Delete',
 		data:item.id,
 		success:function(rsp)
 		{
 			if(ff.util.isSuccess(rsp)){ 				
 				ff.page.reload();
 			}
 		}
 	});
}
//添加
function goCreate()
{
	item = {
		    "id": "",
		    "sqlMap": {},
		    "remarks": null,
		    "createBy": null,
		    "createDate": "",
		    "lastUpdateBy": null,
		    "lastUpdateDate": "",
		    "delFlag": "0",
		    "consignee": "",
		    "regionId": "",
		    "regionName": "",
		    "detailedAddress": "",
		    "fullAddress": "",
		    "phone": "",
		    "isDefault": "0",
		    "member": {
		        "id": ""
		    },
		    "number": "",
		    "parentIds": ""
		}
	ff.page.go({url:"Show",data:item});
}
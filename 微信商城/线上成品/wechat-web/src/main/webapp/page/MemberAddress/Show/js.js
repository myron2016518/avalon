ff.page.init({
	vm:{
		goModifyOrCreate:goModifyOrCreate,
		select_addr:{province:'',city:'',country:'',town:'',village:'',street:''},
		select_addr_name:{province:'请选择',city:'请选择',country:'请选择',town:'请选择',village:'请选择',street:'请选择'},
		select_kind:'province',
		select_class:'',
		kind_class:'',
		addr_list:[],
		addr_change: addr_change,
		addr_kind_change: addr_kind_change,
		isShowSubAddr : true,
		defaultAddress:function(){
			var vm = ff.page.vm();
			if(vm.obj.isDefault == '1'){
				vm.obj.isDefault = '0';
			}else{
				vm.obj.isDefault = '1';
			}
		}
	}	
});

function goModifyOrCreate()
{
	var vm = ff.page.vm();
	if(vm.obj != null && vm.obj.id != null && vm.obj.id != ''){
		ff.page.submit({
			url:'Modify',
			data:vm.obj,
			success:function(rsp)
			{
				if(ff.util.isSuccess(rsp)){
					ff.page.go({url:"Index"});
				}
			}
		});
	}else{
		ff.page.submit({
			url:'Create',
			data:vm.obj,
			success:function(rsp)
			{
				if(ff.util.isSuccess(rsp)){
					ff.page.go({url:"Index"});
				}
			}
		});
	}
}

/*=======================修改收货地址==========================*/
function addr_kind_change(item)
{
	var vm = ff.page.vm();
	var id = '0';
	if ('city' == item) 
	{
		vm.kind_class = vm.select_addr_name.city;
		id = vm.select_addr.province.id;
	}
	else if ('country' == item) 
	{
		vm.kind_class = vm.select_addr_name.country;
		id = vm.select_addr.city.id;
	}
	else if ('town' == item) 
	{
		vm.kind_class = vm.select_addr_name.town;
		id = vm.select_addr.country.id;
	}

	else if ('village' == item) 
	{
		vm.kind_class = vm.select_addr_name.village;
		id = vm.select_addr.town.id;
	}
	else if ('street' == item) 
	{
		vm.kind_class = vm.select_addr_name.street;
		id = vm.select_addr.village.id;
	}
	else
	{
		vm.kind_class = vm.select_addr_name.province;
	}
	loadCitys(id);
	
}

function addr_change(item)
{
	var vm = ff.page.vm();
	
	$('.selectAddr li').removeClass('active');
	if (item.type == '1')
	{
		vm.select_kind = 'province';
		vm.select_addr_name.province = item.name;
		// 选中省，显示市列表
		vm.select_class = 'city';
		$('#city').show();
	}		
	else if(item.type == '2')
	{
		vm.select_kind = 'city';
		vm.select_addr_name.city = item.name;
		isShowSubAddr(item.id, function() {
			if (vm.isShowSubAddr) {
				// 选中市，显示区县列表
				vm.select_class = 'country';
				$('#country').show();
			} else {
				vm.select_addr_name.country = '';
				vm.select_addr_name.town = '';
				vm.select_addr_name.village = '';
				vm.select_addr_name.street = '';
				// 关闭选择框
				closeAddr(item);
			}
		});
	}
	else if(item.type == '3')
	{
		vm.select_kind = 'country';
		vm.select_addr_name.country = item.name;
		isShowSubAddr(item.id, function() {
			if (vm.isShowSubAddr == true) {
				// 选中区县，显示镇列表
				vm.select_class = 'town';
				$('#town').show();
			} else {
				vm.select_addr_name.town = '';
				vm.select_addr_name.village = '';
				vm.select_addr_name.street = '';
				// 关闭选择框
				closeAddr(item);
			}
		});
	}
	else if(item.type == '4')
	{
		vm.select_kind = 'town';
		vm.select_addr_name.town = item.name;
		isShowSubAddr(item.id, function() {
			if (vm.isShowSubAddr == true) {
				// 选中区县，显示村列表
				vm.select_class = 'village';
				$('#village').show();
			} else {
				vm.select_addr_name.village = '';
				vm.select_addr_name.street = '';
				// 关闭选择框
				closeAddr(item);
			}
		});
	}
	else if(item.type == '5')
	{
		vm.select_kind = 'village';
		vm.select_addr_name.village = item.name;
		isShowSubAddr(item.id,function(){
			if(vm.isShowSubAddr == true){
				// 选中区县，显示街列表
				vm.select_class = 'street';
				$('#street').show();
			}else{
				vm.select_addr_name.street = '';
				//关闭选择框
				closeAddr(item);			
			}
		});
	}
	else if(item.type == '6')
	{
		vm.select_kind = 'street';
		vm.select_addr_name.street = item.name;
		//选中街，关闭选择框
		closeAddr(item);
	}
	vm.select_addr[vm.select_kind] = item;
	loadCitys(item.id);
	
}
function loadCitys(addrId)
{
	var vm = ff.page.vm();
	ff.page.submit({
 		url:'Address/FindBuyCitys',
 		condition:{parentId:addrId},
 		success:function(rsp)
 		{
 			vm.addr_list = rsp.obj;
  		}
 	});
}

function closeAddr(item){
	var vm = ff.page.vm();
	$('.addrClose').click();
	vm.address_id = item.id; // 最后选中的
	vm.obj.regionId = item.id;
	vm.obj.regionName = vm.select_addr_name.province + vm.select_addr_name.city + vm.select_addr_name.country + vm.select_addr_name.town + vm.select_addr_name.village + vm.select_addr_name.street; // 组合的收货地址名称
	vm.obj.parentIds = vm.select_addr.province.id + ',' + vm.select_addr.city.id + ',' + vm.select_addr.town.id + ',' + vm.select_addr.village.id + ',' + vm.select_addr.street.id; // 组合的收货地址id
}
//是否显示下级地址
function isShowSubAddr(addrId,callback)
{
	var vm = ff.page.vm();
	ff.page.submit({
 		url:'Address/FindBuyCitys',
 		condition:{parentId:addrId},
 		success:function(rsp)
 		{
 			if(rsp.obj == null || rsp.obj.length == 0){
 				vm.isShowSubAddr = false;
 			}else{
 				vm.isShowSubAddr =  true;
 			}
 			if(null != callback)
 			{
 				callback();
 			}	
  		}
 	});
	true;
}
// 点击修改地址
function addr_click()
{
	$('.selectAddr li').hide();
	var vm = ff.page.vm();
	// 清空现有数据
	vm.select_addr_name = {province:'请选择',city:'请选择',country:'请选择',town:'请选择',village:'请选择',street:'请选择'};
	vm.select_class = 'province';
	$('#province').show();
	loadCitys('0');
}
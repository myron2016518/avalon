ff.page.init({
	vm:{
		obj:{phone:""},
		getCode:getCode
    },
});

               

function getCode()
{
	var vm = ff.page.vm();
  	ff.page.submit({
 		url:'GetFindpwCode',
 		data:vm.obj,
 		success:function(rsp)
 		{
 			if(rsp.obj.code == "-1"){
 				ff.util.show(rsp.obj.message);
 			}else{
 				ff.page.go({url:"Findpw",data:{phone:rsp.obj.message,code:"",password:"",passwordr:""}});
 			}
  		}
 	});
}
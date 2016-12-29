
/*ff.page.init({
	vm:{
		phoneFormat:function(phone){
			var phone1 = phone.substring(0,3);
			var phone2 = phone.substring(7,11);
			return phone1+"****"+phone2;
		},
		findpw:findpw
    }
});*/

ff.page.init({
	vm:{
		phoneFormat:function(phone){
			var phone1 = phone.substring(0,3);
			var phone2 = phone.substring(7,11);
			return phone1+"****"+phone2;
		},
		findpw:findpw
    }
});
var time = 120;
function findpw()
{
	var vm = ff.page.vm();
	if(vm.obj.password!=vm.obj.passwordr){
		
		ff.util.show("密码不一致，请重新输入");
	}
	if(vm.obj.password==""||vm.obj.passwordr==""){
		ff.util.show("请输入密码");
	}
	if(vm.obj.password.length<6){
		ff.util.show("请输入6位以上密码");
	}
  	ff.page.submit({
 		url:'Findpwd',
 		data:vm.obj,
 		success:function(rsp)
 		{
 			if(rsp.errorCode == "0"){
 				ff.page.go({url:"Sign/Signin"});
 			}else{
 				ff.util.show(rsp.obj.message);
 			}
  		}
 	});
};

$(function(){
	setInterval("timer()",1000);
});

function timer(){
	time--;
	if(time == 0){
		$("#repeat").show();
		$("#down").hide();
		time = 1;
	}
	$("#down").html(time+"秒后重新获取");
};

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
 				time = 120;
 				$("#down").show();
 				$("#repeat").hide();
 			}
 			
  		}
 	});
}
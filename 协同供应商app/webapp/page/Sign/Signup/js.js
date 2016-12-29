/*ff.page.init({
	vm:{
		phoneFormat:function(phone){
			var phone1 = phone.substring(0,3);
			var phone2 = phone.substring(7,11);
			return phone1+"****"+phone2;
		},
		register:register
    }
});
function register()
{
	var vm = ff.page.vm();
  	ff.page.submit({
 		url:'Register',
 		data:vm.obj,
 		success:function(rsp)
 		{
 			if(rsp.errorCode == "0"){
 				ff.page.go({url:"Sign/Signin"});
 			}else{
 				alert(rsp.obj.message);
 			}
  		}
 	});
}
	//验证机制的文档 http://ued.qunar.com/oniui/index.html#!/widgets?widgetId=validation&ex=doc
	var validationVM;
	var vm = initVm({
		html: html,
		$skipArray: ["validation"],
		step: 1,
		$step1:['phone'],
		next: false,
		valid: false,
		xxxx: '',
		'form': {
			phone: '',			
			validate_code: '',
			pw:'',
			pw_confirm: '',
			reference: ''
		},
		go: function(step) {
			
			if (vm.next) {
				vm.step = step;
			}			
		},		
		check_phone: function(){
			
			if (this.value.length == 11) {
				this.blur();
				this.focus();
			} else {
				vm.next = false;
			}
		},
		check_all: function() {
			validationVM && validationVM.validateAll();
		},
		validation: $.extend({}, FFWX.validate.opt, {
			onInit: function(v) {
				validationVM = v
			},
			onSuccess: function() {

				if (this.name == 'phone') {
					var phone = vm.form.phone;
					var arr = phone.split('');
					arr.splice(3,4, '****');
					vm.xxxx = arr.join('');
				}
			},
			onValidateAll: function(reasons) {
				vm.next = true;
				
				$.each(reasons, function(idx, ele){

					if ($.inArray(ele.element.name, vmData().$step1) > -1) {
						vm.next = false;
						return false;
					}
				});
				vm.valid = (reasons.length === 0) ? true : false;
			}
		}),
		send: function(){
			
			if (vm.valid) {
				console.log(vmData().form);
				alert('查看控制台返回的数据');
			}
		}
	}); 

	function showError(el, data) {
		
		if (el.name == 'phone') {
			vm.next = false;
		}
		
		$.toast(data, "text");		
	}	
});
*/

ff.page.init({
	vm:{
		phoneFormat:function(phone){
			var phone1 = phone.substring(0,3);
			var phone2 = phone.substring(7,11);
			return phone1+"****"+phone2;
		},
		register:register
    }
});

function register()
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
 		url:'Register',
 		data:vm.obj,
 		success:function(rsp)
 		{
 			if(rsp.errorCode == "0"){
 				ff.page.go({url:"/Sign/Signin"});
 			}else{
 				ff.util.show(rsp.obj.message);
 			}
  		}
 	});
}
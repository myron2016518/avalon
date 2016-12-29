/* ff.page.init({
	vm:{
		obj:{phone:"",password:""},
		login:login
    },
});

function login()
{
	var vm = ff.page.vm();
  	ff.page.submit({
 		url:'Login',
 		data:vm.obj,
 		success:function(rsp)
 		{
 			if(rsp.obj.code == "-1"){
 				ff.util.show(rsp.obj.message,"success") 
 			//	alert(rsp.obj.message);
 			}else{
 				ff.page.go({url:"Home/Index"});
 			}
  		}
 	});
} */

define(['css!./css.css', 'text!./html.html', 'ovalidation'], function(css, html) {

	//验证机制的文档 http://ued.qunar.com/oniui/index.html#!/widgets?widgetId=validation&ex=doc
	var validationVM;
	var vm = initVm({
		html: html,
		$skipArray: ["validation"],
		valid: false,
		'obj': {
			phone: '',	
			password: '',	
			validate_code: ''
		},	
		check_phone: function(){
			
			if (this.value.length == 11) {
				this.blur();
				this.focus();
			}
			vm.check_all();
		},
		check_all: function() {			
			validateAll(validationVM);
		},
		validation: $.extend({}, FFWX.validate.opt, {
			onInit: function(v) {
				validationVM = v;
			},
			onValidateAll: function(reasons) {
				vm.valid = (reasons.length === 0) ? true : false;
			}
		}),
		check: function(){
			var vm = ff.page.vm();
		    if(!(/^0?1[3|4|5|8][0-9]\d{8}$/.test(vm.obj.phone))){ 
		    	$("#submi").attr("class","dmc-btn-dark true"); 
            }else{
            	$("#submi").attr("class","dmc-btn-dark dmc-btn-positive"); 
            }

		},
		send: function(){
			var vm = ff.page.vm();
			if($("#submi").attr("class")!="dmc-btn-dark dmc-btn-positive"){
				return false;
			}
			if(vm.obj.password==""){
				ff.util.show("请输入密码!");
				return false;
			}
		    if(!(/^0?1[3|4|5|8][0-9]\d{8}$/.test(vm.obj.phone))){ 
		        ff.util.show("请输入正确的手机号码!");
		        return false; 
            } 
			  	ff.page.submit({
			 		url:'Login',
			 		data:vm.obj,
			 		success:function(rsp)
			 		{
			 			if(rsp.obj.code == "-1"){
			 				ff.util.show(rsp.obj.message);
			 			}else{
			 				ff.page.go({url:"Home/Index"});
			 			}
			  		}
			 	});
		},
		toPhone: function() {
			$("#phone").val('');
			ff.page.go({url:"Sign/Phone"});
		},
		toFindpwPhone: function() {
			$("#phone").val('');
			ff.page.go({url:"Sign/FindpwPhone"});
		}
	}); 
});


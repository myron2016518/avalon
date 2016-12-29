
define(['css!./css.css', 'text!./html.html', 'ovalidation'], function(css, html) {

	//验证机制的文档 http://ued.qunar.com/oniui/index.html#!/widgets?widgetId=validation&ex=doc
	var validationVM;
	var vm = initVm({
		html: html,
		$skipArray: ["validation"],
		valid: false,
		'obj': {
			phone: ''
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
		getCode :function ()
		{
			var vm = ff.page.vm();
		  	ff.page.submit({
		 		url:'GetCode',
		 		data:vm.obj,
		 		success:function(rsp)
		 		{
		 			if(rsp.obj.code == "-1"){
		 				ff.util.show(rsp.obj.message);
		 			}else{
		 				ff.page.go({url:"Signup",data:{phone:rsp.obj.message,code:"",password:"",passwordr:"",remoccendPhone:""}});
		 			}
		  		}
		 	});
		}
	}); 
});
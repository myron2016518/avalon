define(['css!./css.css', 'text!./html.html', 'ovalidation'], function(css, html) {

	//验证机制的文档 http://ued.qunar.com/oniui/index.html#!/widgets?widgetId=validation&ex=doc
	var validationVM;
	var vm = initVm({
		html: html,
		$skipArray: ["validation"],
		step: 1,
		$step1:['phone', 'validate_code'],
		next: false,
		valid: false,
		second: 0,
		'form': {
			phone: '',		
			validate_code: '',
			pw:'',
			pw_confirm: ''
		},		
		go: function(step) {
			
			if (vm.next) {
				vm.step = step;							
			}			
		},		
		check_step1: function(){

		},
		check_all: function() {
			validateAll(validationVM);
		},
		validation: $.extend({}, FFWX.validate.opt, {
			onInit: function(v){				
				validationVM = v;
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
		},
		get_code: function(){
			vm.second = 120;
			
			//倒计时开始
			var countdown = function(){				
				setTimeout(function(){
					
					if (vm.second > 0) {
						
						if (vm.second == 1) {
							vm.next = false;
							vm.form.validate_code = '';
						}
						vm.second--;
						countdown();						
						
					} else {
						vm.valid = false;
						return false;
					}
				}, 1000);
			};
			countdown();	
		}
	});
});
define(['css!./css.css', 'text!./html.html'], function(css, html) {

	var vm = initVm({
		html: html,
		go: function(){
			window.history.go(-1);
		}
	}); 
});
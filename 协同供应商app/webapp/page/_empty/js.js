define(['css!./css.css', 'text!./html.html'], function(css, html) {

	var pageName = '';	
	cacheTemplate(pageName, html);
	
	FFWX.vm[pageName] = avalon.define({
		
		$id: pageName
	});
	
	FFWX.callback[pageName].afterLoad = function() {		
		console.log(pageName + ' after rendered');
	};	
});
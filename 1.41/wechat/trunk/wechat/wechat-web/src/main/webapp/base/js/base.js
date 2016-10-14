var FFWX = {
	
	wrapper_content: $('#wrapper_content'),
	content: $('#content'),
	
	vm: {
		// Cache avalon vm
	},
	
	callback: {},
	
	title: {
		home: '大卖场',
		category: '分类',
		cart: '购物车',
		dmc: '大卖场',
		my: '我的'
	},
	
	template: {
		// Cache avalon template
	}
}

requirejs(['avalon'], function(){
		
	avalon.config({debug: false});

	avalon.ready(function(){
		
		avalon.templateCache.base = "&nbsp;";
		
		FFWX.vm.base = avalon.define({
			$id: 'base',
			page: 'base',
			topAd: true,
			hideAd: function(){
				FFWX.vm.base.topAd = false;
			},
			go_page: function(pageName){
				loadPage(pageName);
			},
			base_rendered: function(){
				
				console.log(FFWX.vm.base.page+' rendered');
				var $tab_bd = $(".weui_tab_bd");
				
				// 顶部搜索滚动事件
				if (FFWX.vm.base.page == 'home') {
					var fy = $('.frame').offset().top;
					
					$tab_bd.bind('scroll', function() {
						
						if ($tab_bd.scrollTop() == fy) {
							
							$('.frame')
								.removeClass('frameScroll')
								.css({ top: ($(window).scrollTop() - fy) + 'px', position: (FFWX.vm.base.page == 'home')?'relative':'fixed' });					   
						}else {
							
							$('.frame')
								.addClass('frameScroll')
								.css({ top: '0px', position: 'fixed' });
						}
					}).scroll();
					
				}else{
					
					$tab_bd.unbind('scroll');
					$('.frame')
						.addClass('frameScroll')
						.css({ position: 'fixed' });
				}
				
				if (FFWX.vm.base.page in FFWX.callback) {
					var callback = FFWX.callback[FFWX.vm.base.page];
					
					if ('afterLoad' in callback) {
						if ($.isFunction(callback.afterLoad)) {
							callback.afterLoad();
						}
					}
				}
			}
		});
		
		avalon.scan(document.body);

		loadPage('home');
		//loadPage('category');
		
		//requirejs(['mmRouter'], function(){		
				//avalon.router.navigate(hash, mode)
				//mode:
				//0或undefined, 不改变URL, 不产生历史实体, 执行回调 
				//1, 改变URL, 不产生历史实体, 执行回调 
				//2, 改变URL, 产生历史实体, 执行回调
				//avalon.router.navigate('/page/' + pageName, 2)
				//alert(pageName)
				
			/* avalon.router.add("/page/:page", function () {
				var page = this.params.page;
				console.log(page)
				loadPage(page);
			})
			
			avalon.history.start({
				root: '/page',
				html5: true, //是否使用HTML5 history 
				hashPrefix: "!",//
				autoScroll: true //滚动			
			});
			avalon.router.navigate('/page/home', 1)//默认打开
			avalon.scan(document.body); */
		//});

	});
});

// Global setup for all ajax call
$.ajaxSetup({
	dataType: 'json'
});

function ajax(obj){
	
	// TODO if any global change on $.ajax	
	return $.ajax(obj);
}

function ajaxPath(str) {
	
	// TODO if any global change on ajax url
	return str
}

function cacheTemplate(pageName, html) {
	avalon.templateCache[pageName] = html;
	FFWX.callback[pageName] = {};
}

function renderPage(pageName) {
	avalon.vmodels.base.page = pageName;
}

function loadPage(pageName){
	
	var title = '大卖场';
	
	if (pageName in avalon.templateCache) {
		renderPage(pageName);
		
	} else {	
		requirejs([pageName+'/js'], function(){			
			renderPage(pageName);
		});
	}

	if (pageName in FFWX.title) {
		title = FFWX.title[pageName];
	}	
	$('title').text(title);
}
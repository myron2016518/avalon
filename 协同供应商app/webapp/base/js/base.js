if (window.location.href.indexOf('/?') == -1) {
	window.location.href = '//' + window.location.host + window.location.pathname + '?';
}

var userAgent = navigator.userAgent;
var appVersion = navigator.appVersion;
var FFWX = {
	$body: $('body'),
	$tabBody: $(".weui_tab_bd"),
	$content: $('#content'),	
	$bottom: $('.bottom-menu'),
	
	currPage: 'Home/Index',
	error: {},
	urlParam: {},
	ajaxing: 0,
	timeout: {},
	
	os: {
		android: function(){
			return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1; 
		},
		ios: function(){
			return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		}
	},
	
	vm: {
		// Cache avalon vm
	},
	
	pageHistory: {},
	
	callback: {},
	
	validate: {
		opt: {
			validateInKeyup: false,	
			//validateInBlur: false,
			onError: function(reasons) {
				var arr = [];
				
				reasons.forEach(function(reason) {
					var msg = reason.getMessage();
					
					if (arr.indexOf(msg) == -1) {
						arr.push(msg);
					}			
				}, this);

				$.toast(arr.join('，'), "text");
			}
		}
	},
	
	pageOpt: {
		'Home/Index': {
			label: '供应商协同APP',
			search: true
		},
		'Main/Index': {
			label: '非凡大麦场首页',
			search: false
		},
		'Category/Index': {
			label: '库存查询',
			search: true,
			searchTitle:'search'
		},
		'PurchaseOrder/Index': {
			label: '采购订单列表',
			search: true
		},
		'PurchaseOrder/Detail': {
			label: '订单详情',
			search: true
		},
		'SettleBill/Index': {
			label: '结款明细',
			search: true
		},
		'ReplenishOrder/Index': {
			label: '补货单列表',
			search: true
		},
		'ReplenishOrder/add': {
			label: '添加补货单',
			search: true
		},
		'ReplenishOrder/SelectGood': {
			label: '选择商品',
			search: true,
			searchTitle:'search'
		},
		'PurchaseWarning/Index': {
			label: '采购预警',
			search: true,
			searchTitle:'select'
		},
		'PurchaseWarning/add': {
			label: '添加采购补货单',
			search: true
		},
		'Sign/UpdateSignup': {
			label: '修改及退出',
			search: true
		},
		
		'Home/Recharge': {
			label: '话费充值',
			search: false
		},
		'Category/List': {
			label: '商品列表',
			search: false
		},
		'Cart/Index': {
			label: '购物车',
			search: false
		},
		'Dmc/Index': {
			label: '大麦场',
			search: true
		},
		'My/Index': {
			label: '我的',
			search: false
		},
		'My/Order': {
			label: '订单',
			search: false
		},
		'My/OrderInfo': {
			label: '订单详情',
			search: false
		},
		'My/Refund': {
			label: '退款售后',
			search: false
		},
		'My/RefundInfo': {
			label: '退款售后详情',
			search: false
		},
		'My/RefundApplyform': {
			label: '退款售后申请',
			search: false
		},
		'My/MyBill': {
			label: '我的账单',
			search: false
		},
		'My/CouponLlist': {
			label: '兑换优惠券',
			search: false
		},
		'My/Coupon': {
			label: '我的优惠券',
			search: false
		},
		'Rulehelp/Index': {
			label: '优惠券详情',
			search: false
		},
		'My/Setting': {
			label: '账户设置',
			search: false
		},
		'My/Address': {
			label: '地址管理',
			search: false
		},
		'MemberAddress/Index': {
			label: '地址管理',
			search: false
		},
		'MemberAddress/Show': {
			label: '地址编辑',
			search: false
		},
		'Message/MsgInfo': {
			label: '消息详情',
			search: false
		},
		'Order/Logistics': {
			label: '物流',
			search: false
		},
		'Message/Index': {
			label: '消息中心',
			search: true
		},
		'Sign/Changepw': {
			label: '修改密码',
			search: false
		},
		'Sign/Signin': {
			label: '登录',
			search: false
		},
		'Sign/Signup': {
			label: '修改密码',
			search: true
		},
		'Sign/Findpw': {
			label: '重设密码',
			search: true
		},
		'Sign/Phone': {
			label: '手机号码',
			search: true
		},
		'Sign/FindpwPhone': {
			label: '手机号码',
			search: true
		},
		'Pay/Index': {
			label: '支付页面',
			search: false
		},
		'Pay/Success': {
			label: '支付成功',
			search: false
		},
		'ActivityCommodity/Index': {
			label: '限时秒杀',
			search: false
		},
		'ActivityCommodity/Detail': {
			label: '商品详情',
			search: false,
			top: true
		},
		'Commodity/Detail': {
			label: '商品详情',
			search: false,
			top: true
		}
		
	}
};

$.each(FFWX.os, function(key, val){
	
	if ($.type(val) == 'function' && val() == true) {

		FFWX.os = key;
		$('html').addClass(key);
		return false;
	}
});

requirejs(['avalon'], function(){
		
	avalon.config({debug: false});

	avalon.ready(function(){
		
		avalon.templateCache.base = "&nbsp;";
		
		FFWX.vm.base = avalon.define({
			$id: 'base',
			page: 'base',
			login: false, // 登录后为 true，显示顶部右侧“退出”
			user: {},
			topAd: true,
			top:false,
			search: true,
			searchTitle:'string',
			searchSelectText:'仓库',
			searchSelectStrat: true,
			searchSelectList: [],
			load_more: false,
			no_more: false,
			ifGoTop: false,
			title_page: '',
			cart_count:0,
			hideAd: function(){
				FFWX.vm.base.topAd = false;
				$('.homebg').css({'padding-bottom':0});
				$('.frame').css({top:0});
			},
			changeStrat: function(){
				FFWX.vm.base.searchSelectStrat = !FFWX.vm.base.searchSelectStrat;
			},
			changeSelectList: function(e){
				FFWX.vm.base.searchSelectText = e;
				FFWX.vm.base.searchSelectStrat = !FFWX.vm.base.searchSelectStrat;
			},
			img: function(str)
			{
 				if(null == str)
				{
					return "";
				}
 				var flagStr = "image-web/commodity-image";
 				var flagIndex = str.indexOf(flagStr);
 				if(flagIndex >= 0){
 					str = str.substring ( flagIndex+flagStr.length, str.length )
 				}
 				
 				str = str.replace('size',"origin");
 				if(str.indexOf("http") >= 0)
 				{
 					
 					return str;
 				}	
				var url = str;
 				url = ff.img + url;
 				return url;
			},
			to_fixed: function(num, decimal_len){
				var len = decimal_len || 2;
				return Number(num).toFixed(len);
			},
			sub_str:function(str,length){//截取字符长度
				if( !str ){
					return "";
				}
				if( length>=str.length ){
					return str;
				}
				var suffix = "...";
				return str.substr(0,length)+suffix;
			},
			go_back: function(){
				history.go(-1);
			},
			go_page: function(pageName, opt){
				
				var $this = $(this).addClass('now');
				var $other = $this.closest('ul').find('a').not($this).removeClass('now');

				goPage(pageName, opt);
			},
			sign_out: function(){
				goPage('Sign/Signin');
			},
			base_loaded: function(tpl){
				
				//DOM 渲染前，为 <img> 添加 onerror 属性
				var ret = tpl.replace(/<img /g, '<img onerror="this.src=\'base/img/blank.png\';this.onerror=null" ');

				return ret;
			},
			base_rendered: function(){
					
				console.log('Page rendered: ' + FFWX.vm.base.page);
				
				if (FFWX.vm.base.page.indexOf('Sign/') > -1) {
					$('html').addClass('page-sign');
				} else {
					$('html').removeClass('page-sign');
				}
				
				if (FFWX.vm.base.page in FFWX.pageOpt && FFWX.vm.base.page != 'base') {
					
					$.each(FFWX.pageOpt[FFWX.vm.base.page], function(key, val){
						
						if (key != 'label') {
							FFWX.vm.base[key] = val;
							
							if (key == 'search') {
								
								if (val == false) {
									FFWX.$body.addClass('no-search');
								} else {
									FFWX.$body.removeClass('no-search');
								}
							}
						}
						
						if (key === 'top') {
							FFWX.vm.base[key] = val;
							$('.page-content').append('<ul class="actionButton"><li class="twoButton"><img src="images/top.png" alt=""/></li></ul>');
						}else{
							FFWX.vm.base['top'] = false;
						}
					});
				}
				
				// 底部导航高亮显示选中项
				$.each(['Home', 'Category', 'Dmc', 'Cart', 'My'], function(idx, ele){
					var hash = window.location.hash;
					
					if (hash.indexOf('#!/' + ele) == 0) {						
						FFWX.$bottom.find('a').removeClass('now');
						FFWX.$bottom.find('.' + ele).addClass('now');
						return false;
					}					
				});
				
				// 顶部搜索滚动事件				
				var $frame = $('.frame');				
					
				if (FFWX.vm.base.page == 'Home/Index') {
					var scrolling = null;
					
					FFWX.$content.unbind('scroll').bind('scroll', function() {
						
						// 减少滚动时的计算，只在滚动结束时触发一次！
						if (scrolling != null) {
							clearTimeout(scrolling);
						}
						
						scrolling = setTimeout(function(){
							/* var downloadHeight = (FFWX.vm.base.topAd == true) ? $('.hd_download').outerHeight() : 0;
							if (FFWX.$content.scrollTop() == $frame.offset().top) {							
								$frame
									.removeClass('frameScroll hd_bar')
									.css({top: downloadHeight, position: 'relative'});									
							}else {							
								$frame.addClass('frameScroll hd_bar').css({position:'absolute', top:0});
							}
							
							
							var $twoButtonSroll = document.getElementsByClassName('twoButton');
							
								$twoButtonSroll[0].onclick = function() {
									$('#content').animate({scrollTop: '0px'}, 800);

							}; */
							
							if(document.getElementsByClassName('twoButton').length > 0){
								var $twoButtonSroll = document.getElementsByClassName('twoButton');
								var scrollTop = document.getElementById('content').scrollTop ;
								$twoButtonSroll[0].style.visibility = (scrollTop >= 300) ? "visible" : "hidden";
							}
							
						}, 100);
						
					}).scroll();
				
				}else if (FFWX.vm.base['top'] === true) {

					var $topC = document.querySelector('.wrapper-scroll');
					if($topC==null || $topC=="" || typeof($topC)=="undefined"){
						$topC = document.getElementById('content');
					}
					 
					var scrolling = null;
					$($topC).unbind('scroll').bind('scroll', function() {
						
						// 减少滚动时的计算，只在滚动结束时触发一次！
						if (scrolling != null) {
							clearTimeout(scrolling);
						}
						
						scrolling = setTimeout(function(){
							
							var $twoButtonSroll = document.getElementsByClassName('twoButton');
							
								$twoButtonSroll[0].onclick = function() {
									$($topC).animate({scrollTop: '0px'}, 800);

							};
							if(document.getElementsByClassName('twoButton') != null){
								var $twoButtonSroll = document.getElementsByClassName('twoButton');
								//var scrollTop = document.getElementById('content').scrollTop ;
								//var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
								var scrollTop = $topC.scrollTop ;
								$twoButtonSroll[0].style.visibility = (scrollTop >= 300) ? "visible" : "hidden";
							}
						}, 100);
						
					}).scroll();
					
				}else{
					FFWX.$content.unbind('scroll');
					$frame.addClass('frameScroll hd_bar').css({position:'absolute', top:0});
				}				
				$frame.removeClass('loading-hide').parent().show();
				
				// 触发 vm 中的 afterLoad
				var callback = FFWX.callback[FFWX.vm.base.page];				
				if (typeof callback != 'undefined') {					
					if ('afterLoad' in callback) {
						if ($.isFunction(callback.afterLoad)) {
							console.log('After rendered: ' + FFWX.vm.base.page);
							callback.afterLoad();
						}
					}
				}
				
				// 渲染结束后显示全部内容
				setTimeout(function(){
					FFWX.$body.removeClass('loading');
					
					if (FFWX.vm.base.ifGoTop) {
						FFWX.$content.animate({scrollTop:0},500, function(){
							//reRender();
						});
					} else {
						//reRender();
					}					
				}, 500);
			}
		});
		
		requirejs(['mmRouter', 'mmHistory'], function(){
			
			/*
			pageHistory = avalon.define('pageHistory', function(vm) {
				vm.currPath = "";
				vm.params = {};
				vm.query = {};
				vm.args = "[]";
			});
			*/
			
			avalon.router.get("/:page/:sub", function () {
				var page = this.params.page;
				var path = this.path;
				
				console.log('Route to: ' + path);
				FFWX.urlParam = this;
				
				//解密 URI
				if ($.type(this.query.para) != 'undefined') {
					var para = decrypt(this.query.para);					
					FFWX.urlParam.query.para = para;					
				}
				
				if(null != path && path.charAt(0) == '/')
				{
					path = path.substr(1,path.length-1);
				}
				loadPage(path);
			});
			
			avalon.router.error(function(){
				//console.log(this)
			});
			
			avalon.history.start({
				basepath: "/"
			});			

			avalon.scan(document.body);

			var param = '';
			
			if ($.type(FFWX.urlParam.query) != 'undefined' && $.type(FFWX.urlParam.query.para) != 'undefined') {
				param = '?para=' + encrypt(FFWX.urlParam.query.para);
			}

			window.location.hash = '#!/' + FFWX.currPage + param;
		});
	});
});


$(function(){
	
	//加快手机浏览器点击事件响应速度
	FastClick.attach(document.body);
	
	//TODO: 绑定下拉刷新事件（暂时有问题）
	/*
	$(document.body).pullToRefresh();
	$(document.body).on("pull-to-refresh", function() {
		renderPage('base');
		loadPage(FFWX.currPage);
		//window.location.hash = window.location.hash;
		$(document.body).pullToRefreshDone();
	});
	*/
	
	/* $('.weui_tabbar, .settlement').on('touchmove touchstart', function (event) {
		event.preventDefault();
	}); */
});

// Global setup for all ajax call
$.ajaxSetup({
	cache: false,
	dataType: 'json',
	beforeSend: function() {
		FFWX.ajaxing++;
		var $loading = $('.weui_loading_toast');
			
		//判断是否已经有“加载中...”提示在显示
		if ($loading.length == 0 || $loading.is(':visible') == false) {
			$.showLoading("加载中...");
		}
	},
	complete: function(){
		FFWX.ajaxing--;
		
		if (FFWX.ajaxing == 0) {
			$.hideLoading('weui_loading_toast');
		}
	}
});

function goPage(url, opt) {
	
	// 页面转换时，隐藏之前页面遗留的“加载中...”提示
	$.hideLoading('weui_loading_toast');
	
	// 移除滚动加载事件
	FFWX.$content.off('infinite');
	
	//opt.replace: true 替换history，否则生成一条新的历史记录
	//opt.silent: true 表示只同步url，不触发url变化监听绑定
	
	var param = '';
	var	_strOpt = '';

	if ($.type(opt) == 'object') {
		
		if ('ifGoTop' in opt) {
			FFWX.vm.base.ifGoTop = opt.ifGoTop;
			delete opt.ifGoTop;
		}
		
		if (!$.isEmptyObject(opt)) {			
			
			//加密 URI（JSON）
			_strOpt = encrypt(JSON.stringify(opt));
		}
		
	} 
	if (null != opt) {			
		
		_strOpt = encrypt(JSON.stringify(opt));
	}
	
 	if (_strOpt != '') {
		param = '?para=' + _strOpt;
	}
	window.location.hash = '#!/' + url + param;
}

function initVm(opt, pageName){
	
	var pageName = (typeof pageName == 'undefined') ? FFWX.currPage : pageName;
	var html = (typeof opt.html != 'undefined') ? opt.html : 'HTML 引入失败';
	var afterLoad = (typeof opt.afterLoad != 'undefined' && $.isFunction(opt.afterLoad)) ? opt.afterLoad : function(){};
	var _opt = {
		$id: pageName
	};	
	_opt = $.extend(true, _opt, opt);
	
	cacheTemplate(pageName, html);	
	FFWX.vm[pageName] = avalon.define(_opt);	
	FFWX.callback[pageName].afterLoad = afterLoad;
	return FFWX.vm[pageName];
}

function ajax(obj){
	
	// TODO if any global change on $.ajax	
	return $.ajax(obj);
}

function ajaxPath(str) {
	
	// TODO if any global change on ajax url
	return str
}

function getParam(){
	var eva1 = eval;
	
	if ($.type(FFWX.urlParam.query.para) == 'undefined') {
		return false;
	}
	
	eva1('var ret = ' + FFWX.urlParam.query.para);
	return ret;
}

// 获取 vm 的纯数据（JSON 格式，剔除 vm 中的各种方法）
function vmData(pageName){
	var pageName = pageName || FFWX.currPage;
	var model = avalon.mix({}, avalon.vmodels[pageName].$model);
	return JSON.parse(JSON.stringify(model));
}

function cacheTemplate(pageName, html) {	
	avalon.templateCache[pageName] = html;
}	

function renderPage(pageName) {
	avalon.vmodels.base.page = pageName;
}

function loadPage(pageName){

	console.log('Load page: ' + pageName);
	FFWX.currPage = pageName;
	var _pageName = pageName;
	
	bottomNav('show');
	
	if (!(pageName in FFWX.callback)) {
		FFWX.callback[pageName] = {};
	}
	
	if (FFWX.vm.base.page == pageName) {
		return false;
	}
	
	//在 <body> 上添加模块对应的 id，用作当前模块 CSS 的命名空间
	FFWX.$body.attr('id', 'page' + _pageName.replace('/', ''));
	
	FFWX.$body.addClass('loading');
	
	var title = '大麦场';
	
	requirejs(['page/' + pageName + '/js'], function(){			
		renderPage(pageName);
		
		if (pageName in FFWX.pageOpt) {
			
			if ('label' in FFWX.pageOpt[pageName]) {
				title = FFWX.pageOpt[pageName].label;
			}
		}	
		updateTitle(title);
	});
}

function bottomLoad(callback){	
	
	var hideAll = function(){
		FFWX.vm.base.load_more = false;
		FFWX.vm.base.no_more = false;
	};	
	hideAll();
	
	if ($.type(callback) == 'function') {
				
		FFWX.$content.off('infinite');
		FFWX.$content.infinite().on('infinite', function() {
			
			if (FFWX.vm.base.load_more || FFWX.vm.base.no_more) return;
			FFWX.vm.base.load_more = true;
			callback();
		});
		
	} else if (callback == 'Done') {
		hideAll();
		
	} else if (callback == 'End') {
		FFWX.vm.base.no_more = true;
	}
}

function dialogCustomShow(content){
	var _html = '<div class="weui_mask weui_mask_visible"></div><div class="weui_dialog weui_dialog_visible"><div class="weui_dialog_bd check_box ffwx_check_box">';

	_html = _html + content + '</div></div>';
	$('body').append(_html);
}

function dialogCustomHide(time){
	time = time || 1000 ;
	setTimeout(function(){
		$('.weui_mask_visible,.weui_dialog_visible').remove();
	},time);
}

function bottomNav(opt){
	
	if ($.inArray(opt, ['show', 'hide']) == -1) {
		alert('如果显示底部导航，传参 show；隐藏，hide');
		return false;
	}
	
	if (opt == 'hide') {
		FFWX.$body.addClass('hide-bottom');
	} else {
		FFWX.$body.removeClass('hide-bottom');
	}
}

function reRender(obj) {
	var obj = obj || FFWX.$body;
	obj.css({visibility:'hidden'});
	obj.outerHeight();
	obj.css({visibility:'visible'});
}

function validateAll(vm, time) {
	var time = time || 500;	
	
	if (typeof FFWX.timeout[FFWX.currPage] == 'undefined') {
		FFWX.timeout[FFWX.currPage] = null;
	}
	
	if (FFWX.timeout[FFWX.currPage] != null) {
		clearTimeout(FFWX.timeout[FFWX.currPage]);
	}
	
	FFWX.timeout[FFWX.currPage] = setTimeout(function(){
		vm && vm.validateAll();
	}, time);
}

function updateTitle(txt) {
	
	// Super Hack: 修正在微信等webview中无法修改 document.title 的情况 
	// https://www.zhihu.com/question/27849091/answer/38399344

	document.title = txt;
	
	if (FFWX.os == 'ios') {
		
		var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {			

			setTimeout(function() {
				$iframe.off('load').remove();
			}, 0);

		}).appendTo(FFWX.$body);
		
	} else {
		$('title').text(txt);
	}
	
	$('title').text(txt);
	FFWX.vm.base.title_page = txt;
}

//Window大小变化时（比如：软键盘弹出/收回），强制重新渲染页面
window.onresize = function(){	
	reRender();
};

// https://github.com/private-face/jquery.bind-first
(function(t){function e(e){return u?e.data("events"):t._data(e[0]).events}function n(t,n,r){var i=e(t),a=i[n];if(!u){var s=r?a.splice(a.delegateCount-1,1)[0]:a.pop();return a.splice(r?0:a.delegateCount||0,0,s),void 0}r?i.live.unshift(i.live.pop()):a.unshift(a.pop())}function r(e,r,i){var a=r.split(/\s+/);e.each(function(){for(var e=0;a.length>e;++e){var r=t.trim(a[e]).match(/[^\.]+/i)[0];n(t(this),r,i)}})}function i(e){t.fn[e+"First"]=function(){var n=t.makeArray(arguments),i=n.shift();return i&&(t.fn[e].apply(this,arguments),r(this,i)),this}}var a=t.fn.jquery.split("."),s=parseInt(a[0]),f=parseInt(a[1]),u=1>s||1==s&&7>f;i("bind"),i("one"),t.fn.delegateFirst=function(){var e=t.makeArray(arguments),n=e[1];return n&&(e.splice(0,2),t.fn.delegate.apply(this,arguments),r(this,n,!0)),this},t.fn.liveFirst=function(){var e=t.makeArray(arguments);return e.unshift(this.selector),t.fn.delegateFirst.apply(t(document),e),this},u||(t.fn.onFirst=function(e,n){var i=t(this),a="string"==typeof n;if(t.fn.on.apply(i,arguments),"object"==typeof e)for(type in e)e.hasOwnProperty(type)&&r(i,type,a);else"string"==typeof e&&r(i,e,a);return i})})(jQuery);

// 字串加密/解密
function encrypt(a,b){for(var b=b||"base64",a=encodeURIComponent(a),c="",d=0;d<b.length;d++)c+=b.charCodeAt(d).toString();var e=Math.floor(c.length/5),f=parseInt(c.charAt(e)+c.charAt(2*e)+c.charAt(3*e)+c.charAt(4*e)+c.charAt(5*e)),g=Math.ceil(b.length/2),h=Math.pow(2,31)-1;if(2>f)return alert("\u4eb2\uff0c\u5bc6\u7801\u592a\u77ed\u4e86\uff0c\u957f\u70b9\u513f~"),null;var i=Math.round(1e9*Math.random())%1e8;for(c+=i;c.length>10;)c=(parseInt(c.substring(0,10))+parseInt(c.substring(10,c.length))).toString();c=(f*c+g)%h;for(var j="",k="",d=0;d<a.length;d++)j=parseInt(a.charCodeAt(d)^Math.floor(c/h*255)),k+=16>j?"0"+j.toString(16):j.toString(16),c=(f*c+g)%h;for(i=i.toString(16);i.length<8;)i="0"+i;return k+=i}function decrypt(a,b){var b=b||"base64";if(null==a||a.length<8)return void alert("\u4eb2\uff0c\u5b57\u4e32\u592a\u77ed\u4e86\uff0c\u65e0\u6cd5\u89e3\u5bc6\uff01");for(var c="",d=0;d<b.length;d++)c+=b.charCodeAt(d).toString();var e=Math.floor(c.length/5),f=parseInt(c.charAt(e)+c.charAt(2*e)+c.charAt(3*e)+c.charAt(4*e)+c.charAt(5*e)),g=Math.round(b.length/2),h=Math.pow(2,31)-1,i=parseInt(a.substring(a.length-8,a.length),16);for(a=a.substring(0,a.length-8),c+=i;c.length>10;)c=(parseInt(c.substring(0,10))+parseInt(c.substring(10,c.length))).toString();c=(f*c+g)%h;for(var j="",k="",d=0;d<a.length;d+=2)j=parseInt(parseInt(a.substring(d,d+2),16)^Math.floor(c/h*255)),k+=String.fromCharCode(j),c=(f*c+g)%h;return decodeURIComponent(k)}
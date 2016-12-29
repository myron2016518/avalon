ff.page.init({
	url:'Order/getBills',
	obj:{orderList:[]},
	
	afterLoad: function(){
		var vm = ff.page.vm();
		$(document).off("click", "#select-month").on('click', "#select-month", function() {
			$.modal({
				title: "选择月份",
				text: '<div class="select-month"><ul><li>1月</li><li>2月</li><li>3月</li><li>4月</li><li>5月</li><li>6月</li><li>7月</li><li>8月</li><li>9月</li><li>10月</li><li>11月</li><li>12月</li></ul></div>',
				buttons: [
		    		{ text: "取消", className: "default"},
		    		{ text: "确定", onClick: function(){ 
		    			var _callVal = $('.weui_dialog .select-month li.active').html(); 
		    			var year = new Date().getFullYear() + '-'
		    			var monthStr = new Date().getFullYear() + '-'+_callVal;
		    			console.log(_callVal);
		    			if(_callVal ==null){
		    				return;
		    			}
		    			ff.page.reload({data:monthStr,
		    				success:function(rsp)
		    				{
		    					$(window).resize();
		    				}});
		    			//ff.page.go({url:"My/MyBill",data:monthStr});  使用不了，框架有缓存
		    		} }
				]
		    });
		});
		
		$(document).off("click",".weui_dialog .select-month li").on('click', ".weui_dialog .select-month li", function() {
			$('.weui_dialog .select-month li').removeClass('active');
			$(this).addClass('active');
		});	
	}
});


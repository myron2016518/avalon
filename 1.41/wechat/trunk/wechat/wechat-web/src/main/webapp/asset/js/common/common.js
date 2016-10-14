$(function(){
	//////////--------------重写ajax方法
    // 备份jquery的ajax方法    
    var _ajax=$.ajax;  
    $.ajax=function(opt){  
        var _success = opt && opt.success || function(a, b){};  
        var _opt = $.extend(opt, {  
            success:function(data, textStatus){  
                _success(data, textStatus);    
            },
            statusCode: {401: function() {//需要登录
                //TODO 弹出登录框
            	console.log("open login dialog...");
            }}
        });  
        _ajax(_opt);  
    };
	
});





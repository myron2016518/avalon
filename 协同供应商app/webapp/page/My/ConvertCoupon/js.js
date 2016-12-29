ff.page.init({
	vm:{
		obj:"",
		convertCoupon:function(data){
			
		    if(""==data)
		    {
		    	ff.util.show('请输入优惠码');
		    	return;
		    }	
			ff.page.submit({
		 		url:'Coupon/Create',
		 		data:data,
		 		success:function(rsp)
		 		{
		 			if(ff.util.isSuccess(rsp)){
		 				ff.util.show(rsp);
		 			}
		  		}
		 	});
		}
    },
    title:'兑换优惠券',
    afterLoad:function()
    {
    	var vm = ff.page.vm();
    	vm.obj="";
    	setTimeout(function(){
    		//reRender($('page-content'));
    		var obj = obj || FFWX.$body;
    		obj.css({display:'none'});
    		obj.outerHeight();
    		obj.css({display:'block'});
    		
    		},0);
    	
    }
});

               


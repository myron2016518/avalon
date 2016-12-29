ff.page.init({
	vm:{
		formatDesc:function(str){
			var reg = /\d{11}/;
			var phone = str.match(reg);
			var result = str.replace(phone,"<font color=#436EEE>"+phone+"</font>");
			return result;
		}
	},
	title:'订单跟踪',
	url:'Logistics'
});
ff.page.init({
	vm:{
		afterLoad: function() {
			var _callData = getParam();
			
			switch(_callData.type)
			{
			case "notUsed":	//未使用
				vm.pageAction  = '';
				vm.pageImgBg = 'images/orangebg.png';
				
			break;
			case "Expired": //已过期
				vm.pageAction  = '<img src="images/Expiredico2.png" class="img" alt=""/>';
				vm.pageImgBg = 'images/ashbg.png';
			break;
			case "AlreadyUsed": 		//已使用
				vm.pageAction  = '<img src="images/Usedico2.png" class="img" alt=""/>';
				vm.pageImgBg = 'images/ashbg.png';
			break;
			default:
				vm.pageAction  = '';
				vm.pageImgBg = 'images/orangebg.png';
			}
			
		}
	},
});
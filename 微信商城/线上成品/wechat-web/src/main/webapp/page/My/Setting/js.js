ff.page.init({
	vm:{
		member:{
			id:"",
			phone:"",
			nickName:"",
			simpleNickName:"",//中文性别
			pictureUrl:"",
			gender:""
		}
    },
	afterLoad:function(vm){
		var req = ff.page.req();
		var member = vm.member;
		member.id = req.id;
		member.phone = req.phone;
		member.nickName = req.nickName;
 		member.pictureUrl = req.pictureUrl;
		setNickName( req.gender );
		initUploadImage();
	}
});
function setNickName(gender){
	var vm = ff.page.vm();
	var simpleNickName = gender=="male"?"男":"女";
	vm.member.simpleNickName = simpleNickName;
	vm.member.gender = gender;
}

function getSimplePhone(phone){
	var prefix = phone.substr(0,3);
	var suffix = phone.substr(phone.length-4,phone.length);
	return prefix+"****"+suffix;
}

/***
 * 保存会员资料
 * @param nickName
 * @param gender
 */
function submitMemberInfo(nickName,gender,pictureUrl){
	var vm = ff.page.vm();
	ff.page.submit({
 		url:"MemberInfo/modifyMemberInfo",
 		condition:{id:vm.member.id,nickName:nickName,gender:gender,photo:pictureUrl} ,
 		success:function(data)
 		{	
 			ff.util.show(data.message);
 			if(nickName){//更新vm昵称
 				vm.member.nickName = nickName;
 			}
 			if(pictureUrl){//更新头像路径，不能用vm更新
 				$("#headerImg").attr("src",FFWX.vm.base.img(pictureUrl));
 			}
 		}
 	});
}

function clickNickName(nickName){
	$.prompt({
		//text: "名字不能超过6个字符，不得出现不和谐文字",
		title: "昵称填写",
		onOK: function(text) {
			if(!text || text.trim().length==0){
				ff.util.show("请填写您的昵称！");
				return;
			}
			if(text.trim().length>6){
				ff.util.show("昵称长度不能大于6位！");
				return;
			}
			submitMemberInfo(text);
		},
		onCancel: function() {

		},
		input: nickName
	});
}

// 性别初始对象
var sexObj = null;
// 性别选择
function clickGender(gender){
	$.modal({
		title: "性别选择",
		text: 	
		 '<div class="setting-sex-div">'
		+'	<div class="" dir="male" onClick="changeGender(this)">'
		+'		<div class="radio-div">'
		+'			<span></span>'
		+'		</div>男'
		+'	</div>'
		+'	<div class="" dir="female" onClick="changeGender(this)">'
		+'		<div class="radio-div">'
		+'			<span></span>'
		+'		</div>女'
		+'	</div>'
		+'</div>',
		buttons: [
    		{ text: "取消", className: "default", onClick: function(){
    			changeGender(sexObj); // 取消还原数据
    		}},
    		{ text: "确定", onClick: function(){
    			submitMemberInfo(null,ff.page.vm().member.gender );
    		} 
    		}
		]
    });
	
	var elem = gender=="男"?$("div[dir='male']"):$("div[dir='female']");
	sexObj = elem;
	changeGender(elem);
}

/***
 * 性别改变
 * @param elem
 */
function changeGender( elem ){
	$(".setting-sex-div>div").each(function(index,obj){
		$(obj).attr("class","sex-female");
	})
	
	$(elem).attr("class","sex-female active");
	var gender = $(elem).attr("dir");
	setNickName( gender );
}

/***
 * 初始化头像上传插件
 */
function initUploadImage(){
	var webuploader_callback = {
			uploadSuccess: function(file, response){ 
				var vm = ff.page.vm();
				//更新头像资料 
				submitMemberInfo(null,null,response.obj);
			}
		};

	requirejs(['ff/webuploader'], function(webuploader){			
		var vm = ff.page.vm();
		webuploader({
			formData:{direc:"user/photo"},
			type: 'image', 
			list: '#upload_image_div',
			pick: '#upload_image_div',
			server: 'Wechat/file/upload.do',
			accept: {					
				extensions: 'gif,jpg,jpeg,bmp,png' // 英文逗号前后不要有空格！
			},
			callback: webuploader_callback
		});			
	});	

	
	setTimeout(function(){
		$(".webuploader-pick").attr("class","");
	},500);

}

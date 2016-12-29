ff.page.init({
	res:['ospinner'],
	vm:{
		desc:"",
		count:"",
		$spinnerOpt: {
			min: 1,
			max: 5
		},
		is_empty: false,
		selected: 0,
		expReasonStrat: false,
		explanationReason: '',
		reasonSelected: 0,
		check_item: function(val){
			//$('input[name="radiokbox"]').attr('checked','false');
			
			//$(this).attr('checked','true');
			var vm = ff.page.vm();
			vm.selected = val;
			vm.expReasonStrat = false;
			vm.explanationReason = '';
		},
		clickASA: function() {
			var vm = ff.page.vm();
			if(vm.selected == 0){
				$.toast("请选择服务类型", "text");
			}else {
				if(!vm.expReasonStrat){
					$.toast("请选择原因", "text");
				}else{
					$.toast("通过", "text");
					vm.sumbitRefund();
				}
			
			}
		},
		clickReason: function(){
			var _html = '';
			var _changeList = [];
			var vm = ff.page.vm();
			if(vm.selected == 0){
				_html="请选择服务类型";
				$.toast(_html, "text");
			}else if(vm.selected == 1){	//①退款（没收到货）——原因
				_changeList =["长时间没收到货","信息填写错误，没收到货","没收到货，不想要了","其他原因"];
			}else if(vm.selected == 2){ //退货（已收到货）——原因
				_changeList = ["收到商品破损","商品错发/漏发","收到商品不符","商品质量问题","商品比周边商超贵"];
			}else if(vm.selected == 3){ //换货(已收到货)——原因
				_changeList = ["收到商品破损","商品错发/漏发","商品质量问题","其他原因"];
			}else {
				_html ='异常错误';
				$.toast(_html, "text");
			}

			
			if(_changeList.length > 0){
				_html = '<ul style="text-align: left;margin-top: 11px;margin-bottom: 11px">';
				$.each(_changeList, function(idx, ele){
					_html = _html + '<li style="height: 30px;" value="'+idx+'">'+ele+'<label style="float: right;"><input type="radio" name="radiokbox2" value="'+ele+'"  class="dmc_check_box reasonRadio" /><i class="weui_icon_checked ffwx_icon_checked"></i></label></li>';
				});
				_html = _html + '</ul>';
				dialogCustomShow(_html);
			}
			
			
			$('#pageAfterSaleApplyRefundApplyform .reasonRadio').unbind('click').on('click', function(e) {
				
				//$('.selectReasonRadio').html($(this).val());
				vm.explanationReason = $(this).val();
				vm.reasonSelected = $(this).parent().parent().val();
				vm.expReasonStrat = true;
				dialogCustomHide();
			});
			
		},
		sumbitRefund:function(){
			var vm = ff.page.vm();
			var obj = vm.obj;
			var refund = {};
			var imgpath = "";
			refund.orderId = obj.orderId;
			refund.serviceType = (vm.selected - 1);
			refund.reason = vm.reasonSelected;
			refund.desc = vm.desc;
			
			$("#ff_WebUploader_imgList li").each(function(){
				imgpath= imgpath+$(this).attr("name")+","; 
			});
				  
			refund.imgPaths = imgpath.substr(0,imgpath.length-1);
			
			if(obj.afterSalesType != 0){
				refund.skuId = obj.skuId;
				refund.count = vm.count;
			}
			
			refund.status = obj.status;
			refund.orderNumber = obj.orderNumber;
			
			ff.page.submit({
		 		url:'Create',
		 		data:refund,
		 		success:function(rsp)
		 		{
		 			if(ff.util.isSuccess(rsp)){
		 				if(refund.serviceType == 1 || refund.serviceType == 2){
		 					ff.page.go({url:"AfterSaleApply/RefundInfo",data:{orderId:obj.orderId,type:refund.serviceType,afterSalesId:rsp.obj,skuId:refund.skuId}});
		 				}else{
		 					ff.page.go({url:"AfterSaleApply/RefundInfo",data:{orderId:obj.orderId,type:refund.serviceType,afterSalesId:rsp.obj}});
		 				}
		 			}
		  		}
		 	});
		},
		
		checkImg:function(){
			if($("#ff_WebUploader_imgList li").length >3){
				ff.page.show("上传图片不能超过三张");
			}
		}
	},
	title:'申请售后',
	init:function(vm_data)
	{
		var status = vm_data.status;
		if(status == "4"){
			vm_data.$spinnerOpt.max = getGoodsCount();
		}
		return vm_data;
	},
	afterLoad: function(vm){
		//document.getElementsByClassName("dmc_check_box")[0].checked="checked";
		// 清空售后申请说明
		vm.selected = 0;
		vm.explanationReason = "";
		vm.desc = "";
		
		var status = vm.obj.status;
		if(status == "1"){
			var a=$(".orderStatus li:eq(1)").fadeOut();
			var b=$(".orderStatus li:eq(2)").fadeOut();
			vm.select
		}
		if(status == "4"){
			// 获取商品最大可申请售后数
			vm.$spinnerOpt.max = getGoodsCount();
			var c=$(".orderStatus li:eq(0)").fadeOut();
		}
		var webuploader_callback = {
				
				// Before single file selected
				beforeFileQueued: function(file){
					//console.log(uploaderInstance.getStats())
				},
						
				// When single file selected
				fileQueued: function(file){},
				
				// When multiple files selected
				filesQueued: function(files){ },
				
				// When single file deleted
				fileDeleted: function(file){
					
					setTimeout(function(){
						
						reRender();
					},0);
					
				},
				
				fileDequeued: function(file){},
				// Uploading
				uploadProgress: function(file, percentage){ },
				
				// 'response' is returned from server
				uploadSuccess: function(file, response){ 
					$("#ff_WebUploader_imgList li:last-child").attr("name",response.obj);
				},
				
				// Detailed error messages are printed in console
				uploadError: function(file){ },
				
				// Single file finished no matter it is uploaded successfully or not
				uploadComplete: function(file){ },
				
				// All finished
				uploadFinished: function(){ }
			};
		
		// init image uploader
		requirejs(['ff/webuploader'], function(webuploader){			
			var vm = ff.page.vm();
			webuploader({
				formData:{direc:"new_2016/order/refundApply/"},
				type: 'image', // type: image, file
				list: '#ff_WebUploader_imgList',
				pick: '#ff_WebUploader_imgPicker',
				fileNumLimit: 3,
				server: 'Wechat/file/upload.do', // Backend script receiving the file(s)
				accept: {					
					extensions: 'gif,jpg,jpeg,bmp,png' // 英文逗号前后不要有空格！
					//mimeTypes: 'image/*' // If only images are allowed strictly
				},
				callback: webuploader_callback
			});			
			
			// webuploader.instance.removeFile(file.id)			
		});	
		
		$("input[name='file']").bind("click",function(){
			checkImg();
		});
		
	}
});

// 获取商品可申请售后最大数量
function getGoodsCount(){
	var data = ff.page.req();
	var obj = ff.obj.find(data.goods,'skuId',data.skuId);
	return obj.count;
}

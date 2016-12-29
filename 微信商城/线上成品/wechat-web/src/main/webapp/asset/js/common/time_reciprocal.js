/*封装时间倒数对象*/
;(function($){
	var TimeReciprocal=function(){
		var self=this;
		this.targetList=[];//到达时间集合
		this.showList=[];//显示内容id集合
		this.backFunList=[];//储存回调函数集合
		this.startMession=true;
	}
	TimeReciprocal.prototype={
			init:function(settings){//执行 倒数方法
				/**
				 * settings:{
				 *    targetTime: ,//目标时间
				 *    curServerTime: ,服务器当前时间
				 *    showId: ,//倒计时显示标签id
				 *    backFun: //回调函数
				 * }
				 */
				
				var self=this;
				self.targetList.push(settings.targetTime);//往集合中添加 结束时间
				self.showList.push(settings.showId);//添加显示内容id
				self.backFunList.push(settings.backFun);//添加本次调用 回调函数
				if(self.startMession){
					self.curServerTime=settings.curServerTime;//将服务器时间设置
					self.intervalObj=setInterval(function(){//循环调用
						self.runAllMession();
					},1000);
					self.startMession=false;
				}
			},
			remove:function(settings){//清除对象
				var self=this;
				var showId=settings.showId;//显示ID
				var theIndex;
				self.showList.forEach(function(item,index){
					if(showId == item){
						theIndex=index;
						return false;
					}
				});
				if(null != theIndex){
					delete self.targetList[theIndex];
					delete self.showList[theIndex];
					delete self.backFunList[theIndex];
				}
			},
			stopAllMession:function(){//暂停 定时任务
				clearInterval(this.intervalObj);
			},
			runAllMession:function(){//启动所有任务
				var self=this;
				var param={};
				self.targetList.forEach(function(obj,index){
					param.targetTime=self.targetList[index];
					param.showId=self.showList[index];
					param.backFun=self.backFunList[index];
					self.run(param);
				});
				if(typeof(self.curServerTime) != 'undefined'){
					self.curServerTime=self.curServerTime+1000;//执行一次  时间加一秒
				}
			},
			run:function(settings){
				var self=this;
	            //计算目标时间与当前时间间隔(毫秒数)
				var _targetTime=self.curServerTime;
				if(typeof(_targetTime) == 'undefined'){
					_targetTime=new Date().getTime();
				}
	            var timeold=settings.targetTime-_targetTime; //getTime 方法返回一个整数值，这个整数代表了从 1970 年 1 月 1 日开始计算到 Date 对象中的时间之间的毫秒数。
	            
	            //计算目标时间与当前时间的秒数
	            var sectimeold=timeold/1000;

	            //计算目标时间与当前时间的秒数(整数)
	            var secondsold=Math.floor(sectimeold);

	            //计算一天的秒数
	            var  msPerDay=24*60*60*1000;

	            //得到剩余天数
	            var e_daysold=timeold/msPerDay;
	            //得到剩余天数(整数)
	            var daysold=Math.floor(e_daysold);

	            //得到剩余天数以外的小时数
	            var e_hrsold=(e_daysold-daysold)*24;
	            //得到剩余天数以外的小时数(整数)
	            var hrsold=Math.floor(e_hrsold);

	            //得到尾剩余分数
	            var e_minsold=(e_hrsold-hrsold)*60;
	            //得到尾剩余分数(整数)
	            minsold=Math.floor((e_hrsold-hrsold)*60);

	            //得到尾剩余秒数(整数)
	            seconds=Math.floor((e_minsold-minsold)*60);
	            if (daysold<0){
	            	//清除本次定时任务对象
	        		var _backFun = settings.backFun;
	        		var _showId=settings.showId;
	        		self.remove(settings);
	        		if(window[_backFun]){
	        			window[_backFun].call(null,_showId);//执行回调函数
	        		}
	            }else{
	                $("#"+settings.showId).html(daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒");
	            }
			}
	}
	window["TimeReciprocal"]=TimeReciprocal;
})(jQuery);
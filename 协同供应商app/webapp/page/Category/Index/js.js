var defaultDate = timestamp2date(+new Date()-1000*60*60*24);

ff.page.init({
	vm:{
		filterSelected: 0,
		filter: [
			{
				id: 0,
				label: '全部'
			},
			{
				id: 1,
				label: '普通'
			},
			{
				id: 2,
				label: '预售'
			},
			{
				id: 3,
				label: '抢购'
			},
			{
				id: 4,
				label: '活动'
			},
			{
				id: 5,
				label: '批发'
			},
			{
				id: 6,
				label: '新用户专享'
			}
		],
		obj: [
			{
				id: '',
				barCode: '',
				sales: '',
				salesReturn: '',
				salesReal: '',
				name: '',
				code: '',
				specification: '',
				attributes: '',
				isVisible: false
			}
		],
		dateRange: -1,
		dateFrom: defaultDate,
		dateTo: defaultDate,
		setDate: setDate,
		runFilter: runFilter,
		toggle: toggle
	},
    loadMore:function(page,flag){

    },
    afterLoad:function(vm){		
    	
		
		// 与后端数据对接后，以下删除！
		dummyData();
    }
 });
 
 function initDateRange() {	
	
	$('.dateFrom, .dateTo').calendar({
		value: [defaultDate],
		maxDate: defaultDate,
		onClose: function(e){
			var vm = ff.page.vm();
			var isTo = $(e.input).hasClass('dateTo');
			var dateFrom = vm.dateFrom;
			var dateTo = vm.dateTo;
			var isValid = function (){

				if (dateFrom != '' && dateTo != '') {
					var _curr = Number(timestamp2date(e.value[0], ''));
					var _dateFrom = Number(timestamp2date(+new Date(dateFrom), ''));
					var _dateTo = Number(timestamp2date(+new Date(dateTo), ''));
					console.log(_curr, _dateFrom, _dateTo)
					return (isTo) ? _curr >= _dateFrom : _curr <= _dateTo;
				}
				return true;
			};
			var msg = '';
			var clearDate = function(){
				vm[(isTo) ? 'dateTo' : 'dateFrom'] = '';
			};
			
			if (dateFrom == '') {
				msg = '请选择开始日期';
				clearDate();
			} else {
			
				if (!isValid()) {
					msg = '开始日期不可以晚于结束日期';
					clearDate();
				}
			}
			
			if (msg != '') {
				$.alert(msg);
			}
			
			ff.page.vm().dateRange = 0;
		},
		onChange: function(){
			//ff.page.vm().dateRange = 0;
		}
	});
 }
 
 function timestamp2date(timestamp, delimiter) {
	 var delimiter = (typeof delimiter == 'undefined') ? '-' : delimiter;
	 var date = new Date(timestamp);
	 var currDate = function(){
		 var _date = date.getDate();
		 
		 if (String(_date).length == 1) {
			 return '0' + _date.toString();
		 }
		 return _date;
	 };
	 var currMonth = function(){
		 var _month = date.getMonth()+1;
		 
		 if (String(_month).length == 1) {
			 return '0' + _month.toString();
		 }
		 return _month;
	 };
	 
	 var arr = [date.getFullYear().toString(), currMonth(), currDate()];

	 return arr.join(delimiter);
 }
 
 function setDate(offset) {
	// 昨天：-1
	// 近7天：-7
	// 近30天：-30
	var oneDay = 1000*60*60*24;
	var vm = ff.page.vm();
	var timestamp = +new Date - ((offset == -1) ? 0 : oneDay);
	var dateFrom = timestamp2date(timestamp + oneDay * offset);
	var dateTo = timestamp2date(timestamp);

	if (offset == -1) {		
		dateTo = dateFrom;
	}
	
	vm.dateRange = offset;
	vm.dateFrom = dateFrom;
	vm.dateTo = dateTo;
	
	$('.dateFrom').calendar("setValue", [dateFrom]);
	$('.dateTo').calendar("setValue", [dateTo]);
	console.log(vm.dateRange)
 }
 
 function runFilter(id) {
	 ff.page.vm().filterSelected = id;
	 dummyData();
 }
 
 // 以下改成 AJAX 的回调
 function dummyData(){	 
	 
	var vm = ff.page.vm();
	vm.obj = [
		{
			id: 0,
			barCode: '9234567890123',
			sales: 25962290,
			salesReturn: 25962290,
			salesReal: 25962290,
			name: '本子，本子，本子，本子，本子，本子，本子，本子，本子，本子，本子，本子，本子，本子',
			code: 'prod214',
			specification: '大',
			attributes: '红色'
		},
		{
			id: 1,
			barCode: '9234567890124',
			sales: 25962290,
			salesReturn: 25962290,
			salesReal: 25962290,
			name: '笔记本',
			code: 'prod214',
			specification: '中',
			attributes: '黄色'
		},
		{
			id: 2,
			barCode: '9234567890125',
			sales: 25962290,
			salesReturn: 25962290,
			salesReal: 25962290,
			name: '苹果笔记本',
			code: 'prod214',
			specification: '小',
			attributes: '白色'
		}
	];
 }
 
 function toggle() {
	var $tbody = $(this);
	var $tr = $tbody.find('>tr:eq(1)');
	var $arrow = $tbody.find('[class*=icon-scms]');
	
	if ($tr.is(':visible')) {
		$tr.hide();
		$arrow.removeClass().addClass('icon-scms-ico22');
	} else {
		$tr.css({display: 'table-row'});
		$arrow.removeClass().addClass('icon-scms-ico21');
	}
 }
var title = "搜索你想找的商品名称";
ff.page.init({
	vm:{
		defaultTitle:"搜索你想找的商品名称",
		onBlur:onBlur,
		onFocus:onFocus,
		onClick:onClick,
		subSearch:subSearch,
		cleanKeyword:cleanKeyword,
		cid:""//当前类目ID，搜索一次后清空
	},
	url:'HotWord/LoadAll'
});

function onFocus(){
	if( ff.page.vm().defaultTitle==title){
		ff.page.vm().defaultTitle="";
	}
}

function onBlur(){
	var vm = ff.page.vm();
	if(!vm.defaultTitle || vm.defaultTitle.trim().length==0 ){
		ff.page.vm().defaultTitle=title;
	}
}

function onClick(){
	var vm = ff.page.vm();
	if(!vm.defaultTitle || vm.defaultTitle.length==0 || vm.defaultTitle==title){
		return;
	}
	subSearch(vm.defaultTitle);
}

function subSearch(title){
	var cid = null;
	var req = ff.page.req();
	if(req && req.cid){
		cid = req.cid;
	}
	ff.page.go({url:"Commodity/Index",
		        title:'商品列表',
		        data:{title:title,cid:cid,desc:1,sort:"sales"}});
}

function cleanKeyword(){
	ff.page.vm().defaultTitle="";
}
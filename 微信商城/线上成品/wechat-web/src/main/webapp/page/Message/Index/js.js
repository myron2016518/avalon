ff.page.init(
   {
	vm:{
		goInfo:goInfo
	},
	url:'LoadAll'
});

function goInfo(item)
{
	ff.page.go({url:"MsgInfo",data:item.type});
}
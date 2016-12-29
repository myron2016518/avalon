package com.ffzx.wechat.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.web.json.BaseRspJson;
import com.ffzx.basedata.api.dto.Address;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.service.impl.AddressServiceImpl;


@Controller
@RequestMapping("/Address")
public class AddressController extends WTableController<Address>
{
 	
	@RequestMapping("/FindBuyCitys")
	@ResponseBody
	public BaseRspJson findBuyCitys()
	{
		BaseRspJson rsp = new BaseRspJson();
		AddressServiceImpl addressService = (AddressServiceImpl) getService();
		List<Address> dataList = addressService.findBuyCitys(this.GetSysUser(), this.GetFilterCondition());
		rsp.setObj(dataList);
		return rsp;
	}
}

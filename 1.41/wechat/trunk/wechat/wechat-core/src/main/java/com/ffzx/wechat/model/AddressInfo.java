package com.ffzx.wechat.model;


 /**
 * @Description: 会员收货地址信息
 * @author qh.xu
 * @email  qianghui.xu@ffzxnet.com
 * @date 2016年9月14日 上午11:15:12
 * @version V1.0 
 *
 */
public class AddressInfo {
	
  private String addressId;//地址ID
  
  private String addressInfo;//地址全称
  
  private String regionId;//地区id
  
  private String name;//收货人姓名
  
  private String phone;//收货人电话

public String getAddressId() {
	return addressId;
}

public void setAddressId(String addressId) {
	this.addressId = addressId;
}

public String getAddressInfo() {
	return addressInfo;
}

public void setAddressInfo(String addressInfo) {
	this.addressInfo = addressInfo;
}

public String getRegionId() {
	return regionId;
}

public void setRegionId(String regionId) {
	this.regionId = regionId;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}
  
  
}

package com.ffzx.wechat.model;

import com.ffzx.commerce.framework.common.persistence.BaseEntity;

/**
 * 
 * @Description: 登录会员信息
 * @author qh.xu
 * @email  qianghui.xu@ffzxnet.com
 * @date 2016年9月14日 上午9:13:52
 * @version V1.0 
 *
 */
public class MemberInfo extends BaseEntity<MemberInfo>{
   
	/**
	 * 
	 */
	private static final long serialVersionUID = 3505955724286283284L;

	private String nickName;//昵称
	
	private String pictureUrl;//头像地址
	
	private String gender;//性别 male:男,female:女 默认男
	
	private String phone;//手机
	
	private String password;//
	
	private int isNewUser;//是否新用户 1是,0否
	
	private AddressInfo addressInfo;//地址信息
	
	public AddressInfo getAddressInfo() {
		return addressInfo;
	}

	public void setAddressInfo(AddressInfo addressInfo) {
		this.addressInfo = addressInfo;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getPictureUrl() {
		return pictureUrl;
	}

	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getIsNewUser() {
		return isNewUser;
	}

	public void setIsNewUser(int isNewUser) {
		this.isNewUser = isNewUser;
	}
	
}

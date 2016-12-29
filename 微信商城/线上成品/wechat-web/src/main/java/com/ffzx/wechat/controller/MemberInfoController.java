package com.ffzx.wechat.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ff.common.dao.model.FFCondition;
import com.ff.common.web.json.BaseRspJson;
import com.ffzx.member.api.dto.Member;
import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.dubbo.ConsumerUtil;
import com.ffzx.wechat.dubbo.MemberApiConsumer;
import com.ffzx.wechat.model.MemberInfo;
import com.ffzx.wechat.utils.MemberRequestStateUtils;
import com.ffzx.wechat.web.MemberContextHolder;

/***
 * 会员信息控制器
 * @author ying.cai
 * @date 2016年11月2日 下午5:41:54
 * @email ying.cai@ffzxnet.com
 * @version V1.0
 *
 */
@Controller
@RequestMapping("/MemberInfo/*")
public class MemberInfoController extends WTableController<MemberInfo> {
	
	@Autowired
	private MemberApiConsumer memberApiConsumer;
	/***
	 * 获取当前登录用户信息
	 * @return
	 * @date 2016年11月2日 下午5:49:49
	 * @author ying.cai
	 * @email ying.cai@ffzxnet.com
	 */
	@RequestMapping("findMemberInfo")
	@ResponseBody
	public BaseRspJson findActivityInfo()
	{
		BaseRspJson rsp = new BaseRspJson();
		MemberInfo memberInfo = MemberContextHolder.getMemberInfo();
/*		if(memberInfo.getPictureUrl()==null){
			memberInfo.setPictureUrl("images/a1.jpg");
		}*/
		rsp.setObj(memberInfo);
		return rsp;
	}
	
	/***
	 * 修改会员信息
	 * @return
	 * @date 2016年11月2日 下午7:31:58
	 * @author ying.cai
	 * @email ying.cai@ffzxnet.com
	 */
	@RequestMapping("modifyMemberInfo")
	@ResponseBody
	public BaseRspJson modifyMemberPhoto(HttpServletRequest request){
		BaseRspJson rsp = new BaseRspJson();
		List<FFCondition> conditionList = this.GetFilterCondition();
		String id = ConsumerUtil.getStrValueByName("id", conditionList);
		String photo = ConsumerUtil.getStrValueByName("photo", conditionList);
		String gender = ConsumerUtil.getStrValueByName("gender", conditionList);
		String nickName = ConsumerUtil.getStrValueByName("nickName", conditionList);
		Member member = new Member();
		member.setId(id);
		member.setPictureUrl(photo);
		//性别(CONSTANT.GENDER_MALE 男,GENDER_FEMALE 女) 性别(男:male,女:female)
		member.setGender(gender); 
		member.setNickName(nickName);
		
		MemberContextHolder.set(MemberRequestStateUtils.newRequestState(request));
		MemberInfo sessionInfo = MemberContextHolder.getMemberInfo();
		if(member.getGender()!=null&&!"".equals(member.getGender())){
			sessionInfo.setGender(member.getGender());
		}
		if(member.getNickName()!=null&&!"".equals(member.getNickName())){
			sessionInfo.setNickName(member.getNickName());
		}
		if(member.getPictureUrl()!=null&&!"".equals(member.getPictureUrl())){
			sessionInfo.setPictureUrl(member.getPictureUrl());
		}
		MemberRequestStateUtils.setMemberInfoToRedis(request,sessionInfo );
		try{
			memberApiConsumer.updateMember(member);
			rsp.setMessage("资料修改成功，请重新登录刷新资料");
		}catch(Exception e){
			rsp.setMessage("修改个人信息失败，请重试");
		}
		return rsp;
	}
	
	
}

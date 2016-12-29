package com.ffzx.wechat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ffzx.wechat.controller.base.WTableController;
import com.ffzx.wechat.model.HotWord;

/***
 * 热词控制器
 * @author ying.cai
 * @date 2016年10月25日 下午4:06:41
 * @email ying.cai@ffzxnet.com
 * @version V1.0
 *
 */
@Controller
@RequestMapping("/HotWord")
public class HotWordController extends WTableController<HotWord>{

}

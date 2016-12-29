package com.ffzx.wechat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ffzx.promotion.api.dto.ShoppingCartVo;
import com.ffzx.wechat.controller.base.WTableController;

@Controller
@RequestMapping("/Cart")
public class CartController extends WTableController<ShoppingCartVo>
{

}

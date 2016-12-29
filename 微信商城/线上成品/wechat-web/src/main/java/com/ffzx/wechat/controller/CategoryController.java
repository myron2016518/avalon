package com.ffzx.wechat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ffzx.commodity.api.dto.Category;
import com.ffzx.wechat.controller.base.WTableController;

@Controller
@RequestMapping("/Category")
public class CategoryController extends WTableController<Category>
{

}

package org.cj.demo.controller;

import javax.annotation.Resource;

import org.cj.demo.service.DemoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/demo")
public class DemoController {

	public DemoController() {

	}

	@Resource
	private DemoService demoService;

	@RequestMapping(value = "test", method = { RequestMethod.GET, RequestMethod.POST })
	public String test(Model model) {
		return "test";
	}

}

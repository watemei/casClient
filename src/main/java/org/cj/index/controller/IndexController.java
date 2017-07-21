package org.cj.index.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.jasig.cas.client.util.AssertionHolder;
import org.jasig.cas.client.validation.Assertion;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
@RequestMapping(value = "/index")
public class IndexController {
	
	@RequestMapping(value = "", method = { RequestMethod.GET, RequestMethod.POST })
	public String login(Model model,HttpServletRequest request) {
		Assertion assertion=AssertionHolder.getAssertion();
		if(assertion!=null)
		{
			AttributePrincipal attributePrincipal=assertion.getPrincipal();
			if(attributePrincipal!=null)
			{
				 String name=attributePrincipal.getName();
				 model.addAttribute("name", name);
				 Map<String,Object> map=attributePrincipal.getAttributes();
				 if(map!=null)
				 {
					 Object id=map.get("id");
					 Object account=map.get("account");
					 model.addAttribute("id", id);
					 model.addAttribute("account", account);
				 }
			}
		}
		
		return "index";
	}
}

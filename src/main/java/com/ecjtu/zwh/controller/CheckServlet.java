package com.ecjtu.zwh.controller;

import com.alibaba.druid.support.json.JSONUtils;
import com.ecjtu.zwh.entity.User;
import com.ecjtu.zwh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/check")
public class CheckServlet {
    @Autowired
    private UserService userService;

    @RequestMapping("/checkUsername")
    @ResponseBody
    public String checkUsername(String name) {
        HashMap<String, Boolean> hashMap = new HashMap<>();
        User user = userService.getUserByUserName(name);
        if (user == null) {
            hashMap.put("valid", true);
        } else {
            hashMap.put("valid", false);
        }
        return JSONUtils.toJSONString(hashMap);
    }

    @RequestMapping("/checkEmail")
    @ResponseBody
    public String checkEmail(String email) {
        HashMap<String, Boolean> hashMap = new HashMap<>();
        User user = userService.getUserByEmail(email);
        if (user == null) {
            hashMap.put("valid", true);
        } else {
            hashMap.put("valid", false);
        }
        return JSONUtils.toJSONString(hashMap);
    }
}

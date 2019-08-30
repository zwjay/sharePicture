package com.ecjtu.zwh.controller;

import com.ecjtu.zwh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserServlet {
    @Autowired
    private UserService userService;

    @RequestMapping("/{userId}")
    public String userSpace(@PathVariable Integer userId) {
        return "user";
    }
}

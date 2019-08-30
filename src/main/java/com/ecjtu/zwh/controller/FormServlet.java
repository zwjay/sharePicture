package com.ecjtu.zwh.controller;

import com.ecjtu.zwh.entity.User;
import com.ecjtu.zwh.service.UserService;
import com.ecjtu.zwh.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/action")
public class FormServlet {
    @Autowired
    private UserService userService;

    @RequestMapping("/doRegistered")
    @ResponseBody
    public Msg doRegistered(User user) {
        if (userService.saveUser(user) > 0) {
            return Msg.success();
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/doLogin")
    @ResponseBody
    public Msg doLogin(User user, HttpServletRequest request) {
        if (userService.login(user) == 1) {
            User loginUser = userService.getUserByUserName(user.getUserName());
            HttpSession session = request.getSession();
            session.setAttribute("loginUser", loginUser);
            return Msg.success();
        } else if (userService.login(user) == -1) {
            String message = "用户不存在";
            return Msg.fail().add("message", message);
        } else if (userService.login(user) == 0) {
            String message = "密码错误";
            return Msg.fail().add("message", message);
        } else {
            String message = "登录失败！";
            return Msg.fail().add("message", message);
        }
    }
}

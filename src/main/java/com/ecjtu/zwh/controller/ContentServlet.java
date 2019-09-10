package com.ecjtu.zwh.controller;

import com.ecjtu.zwh.entity.Picture;
import com.ecjtu.zwh.entity.Type;
import com.ecjtu.zwh.service.PictureService;
import com.ecjtu.zwh.service.TypeService;
import com.ecjtu.zwh.service.UserService;
import com.ecjtu.zwh.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class ContentServlet {
    @Autowired
    private UserService userService;
    @Autowired
    private PictureService pictureService;
    @Autowired
    private TypeService typeService;

    @RequestMapping(value = {"/", "/index"})
    public String index(Model model) {
        List<Picture> pictures = pictureService.getAllPicture();
        List<Type> types = typeService.getAllType();
        model.addAttribute("pictures", pictures);
        model.addAttribute("types", types);
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/logout")
    @ResponseBody
    public Msg logout(HttpSession session) {
        session.invalidate();
        return Msg.success();
    }

    @RequestMapping("/registered")
    public String registered() {
        return "registered";
    }

}

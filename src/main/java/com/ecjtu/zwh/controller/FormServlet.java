package com.ecjtu.zwh.controller;

import com.ecjtu.zwh.entity.Picture;
import com.ecjtu.zwh.entity.User;
import com.ecjtu.zwh.service.PictureService;
import com.ecjtu.zwh.service.UserService;
import com.ecjtu.zwh.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/action")
public class FormServlet {
    @Autowired
    private UserService userService;
    @Autowired
    private PictureService pictureService;

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

    @RequestMapping("/deletePics")
    @ResponseBody
    public Msg deletePics(Integer[] checkIds) {
        List<Integer> picIds = new ArrayList<>(Arrays.asList(checkIds));
        if (pictureService.deletePicByPicId(picIds) > 0) {
            return Msg.success();
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/doChangeName")
    @ResponseBody
    public Msg doChangeName(String userId, String new_userName) {
        User user = userService.getUserById(Integer.valueOf(userId));
        user.setUserName(new_userName);
        if (userService.updateUser(user) > 0) {
            return Msg.success().add("new_userName", new_userName);
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/uploadHeadPic")
    @ResponseBody
    public Msg uploadHeadPic(@RequestParam(value = "file") MultipartFile file, HttpServletRequest request) throws IOException {
        User user = (User) request.getSession().getAttribute("loginUser");
        if (!file.isEmpty()) {
            String picName = UUID.randomUUID().toString();
            String fileName = file.getOriginalFilename();
            String extName = fileName.substring(fileName.lastIndexOf("."));
            file.transferTo(new File("G:/upload/img_sharePic/userHead/"+picName+extName));
            user.setUserHeadUrl(picName + extName);
            if (userService.updateUser(user) > 0) {
                request.getSession().setAttribute("loginUser", user);
                return Msg.success().add("fileName", picName+extName);
            } else {
                return Msg.fail();
            }
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/uploadPic")
    public String uploadPic( int uploadPicture_type, @RequestParam(value = "file") MultipartFile file,HttpServletRequest request) throws IOException {
        User user = (User) request.getSession().getAttribute("loginUser");
        if (!file.isEmpty()) {
            String picName = UUID.randomUUID().toString();
            String fileName = file.getOriginalFilename();
            String extName = fileName.substring(fileName.lastIndexOf("."));
            file.transferTo(new File("G:/upload/img_sharePic/img/"+picName+extName));
            Picture picture = new Picture(picName+extName, uploadPicture_type, user.getUserId());
            pictureService.uploadPic(picture);
        }
        return "redirect:/user/"+user.getUserId();
    }

    @RequestMapping("/doChangePassword")
    @ResponseBody
    public Msg doChangePassword(String userId, String new_password) {
        User user = userService.getUserById(Integer.valueOf(userId));
        user.setPassword(new_password);
        if (userService.updateUser(user) > 0) {
            return Msg.success();
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/doChangeEmail")
    @ResponseBody
    public Msg doChangeEmail(String userId, String new_email) {
        User user = userService.getUserById(Integer.valueOf(userId));
        user.setEmail(new_email);
        if (userService.updateUser(user) > 0) {
            return Msg.success().add("new_email", new_email);
        } else {
            return Msg.fail();
        }
    }
}

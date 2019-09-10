package com.ecjtu.zwh.controller;

import com.ecjtu.zwh.entity.Picture;
import com.ecjtu.zwh.entity.Type;
import com.ecjtu.zwh.entity.User;
import com.ecjtu.zwh.service.FollowService;
import com.ecjtu.zwh.service.PictureService;
import com.ecjtu.zwh.service.TypeService;
import com.ecjtu.zwh.service.UserService;
import com.ecjtu.zwh.util.Msg;
import com.ecjtu.zwh.vo.FollowerVO;
import com.mysql.cj.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserServlet {
    @Autowired
    private UserService userService;
    @Autowired
    private PictureService pictureService;
    @Autowired
    private TypeService typeService;
    @Autowired
    private FollowService followService;

    @RequestMapping("/{userId}")
    public String userSpace(@PathVariable Integer userId, Model model) {
        User user = userService.getUserById(userId);

        List<Type> types = typeService.getAllType();

        int followers = followService.getFollowerNumByFansId(userId);
        int fans = followService.getFansNumByUserId(userId);
        FollowerVO follower = new FollowerVO(followers, fans);

        model.addAttribute("user", user);
        model.addAttribute("types", types);
        model.addAttribute("follower", follower);
        return "user";
    }

    @RequestMapping("/{userId}/setting")
    public String setting(@PathVariable Integer userId, Model model) {
        User user = userService.getUserById(userId);

        model.addAttribute("user", user);
        return "setting";
    }

    @RequestMapping(value = "/{userId}/picture")
    @ResponseBody
    public Msg userPicture(@PathVariable Integer userId, Model model) {
        List<Picture> pictures = pictureService.getPictureByUserId(userId);
        model.addAttribute("userPics", pictures);
        return Msg.success().add("model", model);
    }

    @RequestMapping(value = "/{userId}/following")
    @ResponseBody
    public Msg following(@PathVariable Integer userId, Model model) {
        List<User> followers = followService.getAllUserByFansId(userId);
        model.addAttribute("followers", followers);
        return Msg.success().add("model", model);
    }

    @RequestMapping(value = "/{userId}/fans")
    @ResponseBody
    public Msg fans(@PathVariable Integer userId, Model model) {
        List<User> fans = followService.getAllFansByUserId(userId);
        model.addAttribute("fans", fans);
        return Msg.success().add("model", model);
    }

    @RequestMapping(value = "/{userId}/upload")
    public String upload(@PathVariable Integer userId, Model model) {
        return "upload";
    }
}

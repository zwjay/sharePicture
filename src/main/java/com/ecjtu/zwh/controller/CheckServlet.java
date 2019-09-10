package com.ecjtu.zwh.controller;

import com.alibaba.druid.support.json.JSONUtils;
import com.ecjtu.zwh.entity.Follow;
import com.ecjtu.zwh.entity.User;
import com.ecjtu.zwh.service.FollowService;
import com.ecjtu.zwh.service.UserService;
import com.ecjtu.zwh.util.Msg;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/check")
public class CheckServlet {
    @Autowired
    private UserService userService;
    @Autowired
    private FollowService followService;

    @RequestMapping("/checkUsername")
    @ResponseBody
    public String checkUsername(String name) {
        User user = userService.getUserByUserName(name);
        HashMap<String, Boolean> hashMap = new HashMap<>();
        if (user == null) {
            hashMap.put("valid", true);
        } else {
            hashMap.put("valid", false);
        }
        return JSONUtils.toJSONString(hashMap);
    }

    @RequestMapping("/checkOldPassword")
    @ResponseBody
    public String checkOldPassword(String old_password, String userId) {
        User user = userService.getUserById(Integer.valueOf(userId));
        HashMap<String, Boolean> hashMap = new HashMap<>();
        if (user.getPassword().equals(old_password)) {
            hashMap.put("valid", true);
        } else {
            hashMap.put("valid", false);
        }
        return JSONUtils.toJSONString(hashMap);
    }

    @RequestMapping("/checkOldEmail")
    @ResponseBody
    public String checkOldEmail(String old_email, String userId) {
        User user = userService.getUserById(Integer.valueOf(userId));
        HashMap<String, Boolean> hashMap = new HashMap<>();
        if (user.getEmail().equals(old_email)) {
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
        if (userService.getUserByEmail(email) == null) {
            hashMap.put("valid", true);
        } else {
            hashMap.put("valid", false);
        }
        return JSONUtils.toJSONString(hashMap);
    }

    @RequestMapping("/checkIsFollow")
    @ResponseBody
    public Msg checkIsFollow(int follower, int fans) {
        boolean isFollow = followService.isFansFollowUser(fans, follower);
        if (isFollow) {
            return Msg.success();
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/followAjax")
    @ResponseBody
    public Msg followAjax(int follower, int fans) {
        Follow follow = new Follow(follower, fans);
        if (followService.saveFollow(follow) > 0) {
            return Msg.success().add("userId", follower);
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/unfollowAjax")
    @ResponseBody
    public Msg unfollowAjax(int follower, int fans) {
        Follow follow = new Follow(follower, fans);
        if (followService.deleteFollow(follow) > 0) {
            return Msg.success().add("userId", follower);
        } else {
            return Msg.fail();
        }
    }

    @RequestMapping("/checkIsFollowFL")
    @ResponseBody
    public Msg checkIsFollow(@RequestParam("followers") String followers, int fans) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JavaType jt = mapper.getTypeFactory().constructParametricType(ArrayList.class, User.class);
        List<User> followersList = mapper.readValue(followers, jt);
        Map<String, String> isFollowMap = new HashMap<>();
        for (User follower :
                followersList) {
            Integer userId = follower.getUserId();
            boolean isFollow = followService.isFansFollowUser(fans, userId);
            isFollowMap.put(userId.toString(), String.valueOf(isFollow));
        }
        if (isFollowMap.size() > 0) {
            return Msg.success().add("isFollowMap", isFollowMap);
        } else {
            return Msg.fail();
        }
    }

}

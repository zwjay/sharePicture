package com.ecjtu.zwh.service.impl;

import com.ecjtu.zwh.entity.Follow;
import com.ecjtu.zwh.entity.User;
import com.ecjtu.zwh.mapper.FollowMapper;
import com.ecjtu.zwh.mapper.UserMapper;
import com.ecjtu.zwh.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FollowServiceImpl implements FollowService {
    @Autowired
    private FollowMapper followMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public int getFansNumByUserId(Integer userId) {
        return followMapper.getFansNumByUserId(userId);
    }

    @Override
    public int getFollowerNumByFansId(Integer fansId) {
        return followMapper.getFollowerNumByFansId(fansId);
    }

    @Override
    public List<User> getAllFansByUserId(Integer userId) {
        List<User> users = new ArrayList<>();
        List<Follow> follows = followMapper.getAllFansByUserId(userId);
        for (Follow follow:
             follows) {
            User user = userMapper.getUserById(follow.getFansId());
            users.add(user);
        }
        return users;
    }

    @Override
    public List<User> getAllUserByFansId(Integer fansId) {
        List<User> users = new ArrayList<>();
        List<Follow> follows = followMapper.getAllUserByFansId(fansId);
        for (Follow follow:
                follows) {
            User user = userMapper.getUserById(follow.getUserId());
            users.add(user);
        }
        return users;
    }

    @Override
    public boolean isFansFollowUser(Integer fansId, Integer userId) {
        Follow follow = followMapper.isFansFollowUser(fansId, userId);
        if (follow != null) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int saveFollow(Follow follow) {
        return followMapper.saveFollow(follow);
    }

    @Override
    public int deleteFollow(Follow follow) {
        return followMapper.deleteFollow(follow);
    }
}

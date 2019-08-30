package com.ecjtu.zwh.service.impl;

import com.ecjtu.zwh.entity.User;
import com.ecjtu.zwh.mapper.UserMapper;
import com.ecjtu.zwh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;


    @Override
    public int login(User user) {
        User logUser = userMapper.getUserByUserName(user.getUserName());
        if (logUser == null) {
            return -1;
        } else {
            if (logUser.getPassword().equals(user.getPassword())) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    @Override
    public List<User> getAllUser() {
        return null;
    }

    @Override
    public User getUserById(Integer userId) {
        return userMapper.getUserById(userId);
    }

    @Override
    public User getUserByUserName(String userName) {
        return userMapper.getUserByUserName(userName);
    }

    @Override
    public User getUserByEmail(String email) {
        return userMapper.getUserByEmail(email);
    }

    @Override
    public int updateUser(User user) {
        return 0;
    }

    @Override
    public int deleteUserById(Integer userId) {
        return 0;
    }

    @Override
    public int saveUser(User user) {
        return userMapper.saveUser(user);
    }

    @Override
    public void deleteBatch(List<Integer> userIds) {

    }
}

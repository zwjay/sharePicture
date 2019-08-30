package com.ecjtu.zwh.mapper;

import com.ecjtu.zwh.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    // 获取所有用户信息
    List<User> getAllUser();

    // 通过 id 查询该用户
    User getUserById(Integer userId);

    // 通过用户名查询该用户
    User getUserByUserName(String userName);

    // 通过邮箱查询该用户
    User getUserByEmail(String email);

    // 修改用户信息
    int updateUser(User user);

    // 通过 id 删除该用户
    int deleteUserById(Integer userId);

    // 添加用户信息
    int saveUser(User user);

    // 批量删除
    void deleteBatch(@Param("userIds") List<Integer> userIds);
}

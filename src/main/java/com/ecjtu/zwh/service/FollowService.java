package com.ecjtu.zwh.service;

import com.ecjtu.zwh.entity.Follow;
import com.ecjtu.zwh.entity.User;

import java.util.List;

public interface FollowService {
    // 通过 userId 得到粉丝数
    int getFansNumByUserId(Integer userId);

    // 通过 fansId 得到关注数
    int getFollowerNumByFansId(Integer fansId);

    // 通过 userId 查询所有粉丝
    List<User> getAllFansByUserId(Integer userId);

    // 通过 fansId 查询所有关注
    List<User> getAllUserByFansId(Integer fansId);

    // 查询 fansId 是否关注 userId
    boolean isFansFollowUser(Integer fansId, Integer userId);

    // 插入 fansId 关注了 userId
    int saveFollow(Follow follow);

    // 删除 fansId 取消关注了 userId
    int deleteFollow(Follow follow);

}

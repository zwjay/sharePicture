package com.ecjtu.zwh.service;

import com.ecjtu.zwh.entity.Picture;

import java.util.List;

public interface PictureService {
    // 获取所有图片
    List<Picture> getAllPicture();

    // 通过 picId 查询该张图片
    Picture getPictureByPicId(Integer picId);

    // 通过 typeId 查询该类图片
    List<Picture> getPictureByTypeId(Integer typeId);

    // 通过 userId 查询该用户所有图片
    List<Picture> getPictureByUserId(Integer userId);
}

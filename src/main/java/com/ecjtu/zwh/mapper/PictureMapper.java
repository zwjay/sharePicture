package com.ecjtu.zwh.mapper;

import com.ecjtu.zwh.entity.Picture;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PictureMapper {
    // 获取所有图片
    List<Picture> getAllPicture();

    // 通过 picId 查询该张图片
    Picture getPictureByPicId(Integer picId);

    // 通过 typeId 查询该类图片
    List<Picture> getPictureByTypeId(Integer typeId);

    // 通过 userId 查询该用户所有图片
    List<Picture> getPictureByUserId(Integer userId);

    // 上传图片
    int uploadPic(Picture picture);

    // 通过 picId 删除图片
    int deletePicByPicId(@Param("picIds") List<Integer> picIds);
}

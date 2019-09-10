package com.ecjtu.zwh.service.impl;

import com.ecjtu.zwh.entity.Picture;
import com.ecjtu.zwh.mapper.PictureMapper;
import com.ecjtu.zwh.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PictureServiceImpl implements PictureService {
    @Autowired
    private PictureMapper pictureMapper;

    @Override
    public List<Picture> getAllPicture() {
        return pictureMapper.getAllPicture();
    }

    @Override
    public Picture getPictureByPicId(Integer picId) {
        return null;
    }

    @Override
    public List<Picture> getPictureByTypeId(Integer typeId) {
        return null;
    }

    @Override
    public List<Picture> getPictureByUserId(Integer userId) {
        return pictureMapper.getPictureByUserId(userId);
    }

    @Override
    public int uploadPic(Picture picture) {
        return pictureMapper.uploadPic(picture);
    }

    @Override
    public int deletePicByPicId(List<Integer> picIds) {
        return pictureMapper.deletePicByPicId(picIds);
    }
}

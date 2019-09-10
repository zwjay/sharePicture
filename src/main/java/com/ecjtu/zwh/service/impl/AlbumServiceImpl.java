package com.ecjtu.zwh.service.impl;

import com.ecjtu.zwh.entity.Album;
import com.ecjtu.zwh.mapper.AlbumMapper;
import com.ecjtu.zwh.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AlbumServiceImpl implements AlbumService {
    @Autowired
    private AlbumMapper albumMapper;

    @Override
    public List<Album> getAllAlbumByUserId(Integer userId) {
        return null;
    }
}

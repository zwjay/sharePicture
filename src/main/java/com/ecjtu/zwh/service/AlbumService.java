package com.ecjtu.zwh.service;

import com.ecjtu.zwh.entity.Album;

import java.util.List;

public interface AlbumService {
    // 通过 userId 查询该用户所有图片集
    List<Album> getAllAlbumByUserId(Integer userId);
}

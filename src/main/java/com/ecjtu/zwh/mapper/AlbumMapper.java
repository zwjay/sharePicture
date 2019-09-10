package com.ecjtu.zwh.mapper;

import com.ecjtu.zwh.entity.Album;

import java.util.List;

public interface AlbumMapper {
    // 通过 userId 查询该用户所有图片集
    List<Album> getAllAlbumByUserId(Integer userId);


}

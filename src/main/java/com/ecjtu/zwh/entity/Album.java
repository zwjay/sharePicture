package com.ecjtu.zwh.entity;

import java.sql.Timestamp;

public class Album {
    private Integer picAlbumId;
    private String picAlbumName;
    private Timestamp createTime;
    private Timestamp uploadTime;
    private Integer typeId;
    private Integer userId;

    public Album() {
    }



    public Integer getPicAibumId() {
        return picAlbumId;
    }

    public void setPicAibumId(Integer picAibumId) {
        this.picAlbumId = picAibumId;
    }

    public String getPicAlbumName() {
        return picAlbumName;
    }

    public void setPicAlbumName(String picAlbumName) {
        this.picAlbumName = picAlbumName;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public Timestamp getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(Timestamp uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Album{" +
                "picAibumId=" + picAlbumId +
                ", picAlbumName='" + picAlbumName + '\'' +
                ", createTime=" + createTime +
                ", uploadTime=" + uploadTime +
                ", typeId=" + typeId +
                ", userId=" + userId +
                '}';
    }
}

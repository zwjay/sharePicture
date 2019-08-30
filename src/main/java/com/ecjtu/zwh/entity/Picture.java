package com.ecjtu.zwh.entity;

import java.sql.Timestamp;

public class Picture {
    private Integer picId;
    private String picDescription;
    private String picUrl;
    private Integer uploadUserId;
    private Timestamp uploadTime;
    private String tags;
    private Integer typeId;
    private Integer userId;

    public Picture() {
    }

    public Picture(Integer picId, String picUrl, Integer typeId, Integer userId) {
        this.picId = picId;
        this.picUrl = picUrl;
        this.typeId = typeId;
        this.userId = userId;
    }

    public Picture(Integer picId, String picUrl, Integer uploadUserId, Integer typeId, Integer userId) {
        this.picId = picId;
        this.picUrl = picUrl;
        this.uploadUserId = uploadUserId;
        this.typeId = typeId;
        this.userId = userId;
    }

    public Picture(Integer picId, String picDescription, String picUrl, Integer uploadUserId, Timestamp uploadTime, String tags, Integer typeId, Integer userId) {
        this.picId = picId;
        this.picDescription = picDescription;
        this.picUrl = picUrl;
        this.uploadUserId = uploadUserId;
        this.uploadTime = uploadTime;
        this.tags = tags;
        this.typeId = typeId;
        this.userId = userId;
    }

    public Integer getPicId() {
        return picId;
    }

    public void setPicId(Integer picId) {
        this.picId = picId;
    }

    public String getPicDescription() {
        return picDescription;
    }

    public void setPicDescription(String picDescription) {
        this.picDescription = picDescription;
    }

    public String getPicUrl() {
        return picUrl;
    }

    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }

    public Integer getUploadUserId() {
        return uploadUserId;
    }

    public void setUploadUserId(Integer uploadUserId) {
        this.uploadUserId = uploadUserId;
    }

    public Timestamp getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(Timestamp uploadTime) {
        this.uploadTime = uploadTime;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
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
        return "Picture{" +
                "picId=" + picId +
                ", picDescription='" + picDescription + '\'' +
                ", picUrl='" + picUrl + '\'' +
                ", uploadUserId=" + uploadUserId +
                ", uploadTime=" + uploadTime +
                ", tags='" + tags + '\'' +
                ", typeId=" + typeId +
                ", userId=" + userId +
                '}';
    }
}

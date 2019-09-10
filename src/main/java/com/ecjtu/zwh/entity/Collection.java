package com.ecjtu.zwh.entity;

import java.sql.Timestamp;

public class Collection {
    private Integer collectionId;
    private Integer picAlbumId;
    private Integer picId;
    private Timestamp collectionTime;
    private Integer userId;

    public Collection() {
    }

    public Integer getCollectionId() {
        return collectionId;
    }

    public void setCollectionId(Integer collectionId) {
        this.collectionId = collectionId;
    }

    public Integer getPicAlbumId() {
        return picAlbumId;
    }

    public void setPicAlbumId(Integer picAlbumId) {
        this.picAlbumId = picAlbumId;
    }

    public Integer getPicId() {
        return picId;
    }

    public void setPicId(Integer picId) {
        this.picId = picId;
    }

    public Timestamp getCollectionTime() {
        return collectionTime;
    }

    public void setCollectionTime(Timestamp collectionTime) {
        this.collectionTime = collectionTime;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Collection{" +
                "collectionId=" + collectionId +
                ", picAlbumId=" + picAlbumId +
                ", picId=" + picId +
                ", collectionTime=" + collectionTime +
                ", userId=" + userId +
                '}';
    }
}

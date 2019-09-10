package com.ecjtu.zwh.entity;

public class Follow {
    private Integer userId;
    private Integer fansId;

    public Follow() {
    }

    public Follow(Integer userId, Integer fnasId) {
        this.userId = userId;
        this.fansId = fnasId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFansId() {
        return fansId;
    }

    public void setFansId(Integer fansId) {
        this.fansId = fansId;
    }

    @Override
    public String toString() {
        return "Follow{" +
                "userId=" + userId +
                ", fnasId=" + fansId +
                '}';
    }
}

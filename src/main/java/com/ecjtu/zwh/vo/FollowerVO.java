package com.ecjtu.zwh.vo;

import com.ecjtu.zwh.entity.Follow;

import java.util.List;

public class FollowerVO {
    private int followNum;
    private int fansNum;
    private List<Follow> followers;
    private List<Follow> fans;
    private boolean isFollow;

    public FollowerVO() {
    }

    public FollowerVO(int followNum, int fansNum) {
        this.followNum = followNum;
        this.fansNum = fansNum;
    }

    public FollowerVO(int followNum, int fansNum, boolean isFollow) {
        this.followNum = followNum;
        this.fansNum = fansNum;
        this.isFollow = isFollow;
    }

    public int getFollowNum() {
        return followNum;
    }

    public void setFollowNum(int followNum) {
        this.followNum = followNum;
    }

    public int getFansNum() {
        return fansNum;
    }

    public void setFansNum(int fansNum) {
        this.fansNum = fansNum;
    }

    public List<Follow> getFollowers() {
        return followers;
    }

    public void setFollowers(List<Follow> followers) {
        this.followers = followers;
    }

    public List<Follow> getFans() {
        return fans;
    }

    public void setFans(List<Follow> fans) {
        this.fans = fans;
    }

    public boolean isFollow() {
        return isFollow;
    }

    public void setFollow(boolean follow) {
        isFollow = follow;
    }

    @Override
    public String toString() {
        return "FollowerVO{" +
                "followNum=" + followNum +
                ", fansNum=" + fansNum +
                ", followers=" + followers +
                ", fans=" + fans +
                ", isFollow=" + isFollow +
                '}';
    }
}

// 初始化 user.html 页面
$(document).ready(function () {

    $("#user_picture_btn").click();

});


// 点击图片按钮，加载用户图片
$(document).on("click", "#user_picture_btn", function () {
    var userId = $("#get_user_id").text();
    var sessionId = $("#get_session_id").text();

    $.ajax({
        type: "post",
        url: "../user/"+ userId +"/picture",
        success: function (result) {
            if (result.code == 100) {
                var userPics = result.extend.model.userPics;
                var userPicBox = "";
                if (userId == sessionId) {
                    userPicBox = "<h4 id='picPart_head'>我的图片：</h4>";
                } else {
                    userPicBox = "<h4 id='picPart_head'>他的图片：</h4>";
                }
                if (userId == sessionId) {    // 只要当前页面为自己页面时，才拼接编辑按钮
                    userPicBox += "<a class=\"btn btn-default edit_btn edit_btn_close\"><span class=\"glyphicon glyphicon-remove\"></span> 取消</a>\n" +
                        "<a class=\"btn btn-default edit_btn edit_btn_delete\"><span class=\"glyphicon glyphicon-trash\"></span> 删除</a>\n" +
                        "<a class=\"btn btn-default edit_btn edit_btn_edit\"><span class=\"glyphicon glyphicon-edit\"></span> 编辑</a>";
                }
                userPicBox += "<div class=\"myContainer\">";
                $.each(userPics, function (index, userPic) {
                    userPicBox +=
                        "<div class=\"col-lg-4 col-sm-4 col-md-6 myItem\">\n" +
                        "    <div class=\"portfolio-box zoom-effect\">\n" +
                        "        <img src=\"../../../pic/img_sharePic/img/"+ userPic.picUrl +"\" class=\"img-responsive\" alt=\"\">\n" +
                        "        <div class=\"portfolio-box-caption\">" +
                        "            <input class=\"pic_checkbox\" name=\"pic_checkbox\" type=\"checkbox\" value=\""+ userPic.picId +"\" style=\"float: left;margin: 10px auto auto 15px;\">\n" +
                        "            <div class=\"portfolio-box-caption-content\">\n" +
                        "                <div class=\"project-social\">\n" +
                        "                    <ul class=\"list-inline\">\n" +
                        "                        <li><a href=\"../../../pic/img_sharePic/img/"+ userPic.picUrl +"\" download><i class=\"fa fa-download\"></i></a></li>\n" +
                        "                        <li><a href=\"../../../pic/img_sharePic/img/"+ userPic.picUrl +"\" data-lightbox=\"example-set\"><i class=\"fa fa-search\"></i></a></li>\n" +
                        "                        <li><a href=\"../user/"+ userPic.userId +"\"><i class=\"fa fa-user\"></i></a></li>\n" +
                        "                    </ul>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</div>\n";
                });
                userPicBox += "</div>";
                $("#user-right-box").html(userPicBox);
                // 检查该用户是否关注
                checkIsFollow();

                // 加载页面，隐藏删除和取消按钮，并隐藏图片上的复选框
                $(".edit_btn_close").hide();
                $(".edit_btn_delete").hide();
                $(".pic_checkbox").hide();

                // init Masonry
                var $grid = $('.myContainer').masonry({
                    itemSelector: '.myItem'
                });
                // layout Masonry after each image loads
                $grid.imagesLoaded().progress( function() {
                    $grid.masonry('layout');
                });
                var $items = $(html).find('.myItem');
                $grid.append($items).masonry('appended', $items);
            }
        }
    });
});

// 点击编辑按钮触发事件，隐藏编辑按钮，显示删除和取消按钮，并在所有图片上显示复选框
$(document).on("click", ".edit_btn_edit", function () {
    // 隐藏编辑按钮，显示删除和取消按钮，并在所有图片上显示复选框
    $(".edit_btn_edit").hide();
    $(".edit_btn_close").show();
    $(".edit_btn_delete").show();
    $(".pic_checkbox").show();
});

// 点击取消按钮触发事件，显示编辑按钮，隐藏删除和取消按钮，并隐藏所有图片上的复选框
$(document).on("click", ".edit_btn_close", function () {

    // 显示编辑按钮，隐藏删除和取消按钮，并隐藏所有图片上的复选框
    $(".edit_btn_edit").show();
    $(".edit_btn_close").hide();
    $(".edit_btn_delete").hide();
    $(".pic_checkbox").hide();

    // 消除所有已选选项
    $(".portfolio-box-caption").find('input:checkbox').each(function () {
        $(this).prop('checked',false);
    });
});

// 点击删除按钮触发事件
$(document).on("click", ".edit_btn_delete", function () {
    var checkIds = [];
    $(".portfolio-box-caption").find('input[name="pic_checkbox"]:checked').each(function () {
        checkIds.push($(this).val());
    });
    if (checkIds.length == 0) {
        alert("你还没有选择任何内容！");
    } else {
        var bool = confirm("确定删除这 "+ checkIds.length +" 张图片吗");
        if (bool) {
            $.ajax({
                type: "post",
                url: "../action/deletePics",
                data: {
                    checkIds: checkIds
                },
                traditional: true,
                success: function (result) {
                    if (result.code == 100) {
                        $("#user_picture_btn").click();
                    } else {
                        alert("图片删除失败...");
                    }
                }
            });
        } else {
            return;
        }
    }
});


// 加载页面时，自动发送 Ajax，检查该用户是否关注
function checkIsFollow() {
    var userId = $("#get_user_id").text();
    var sessionId = $("#get_session_id").text();

    if (sessionId==="" || userId===sessionId) {    // 如果用户未登录，或为用户自己的界面，不用检查
        return;
    } else {
        $.ajax({
            type: "post",
            url: "../check/checkIsFollow",
            data: {
                follower: userId,
                fans: sessionId
            },
            success: function (result) {
                if (result.code == 100) {    // 检查到已关注该用户，改变按钮样式
                    $("#checkIsFollow").html("已关注 <span class=\"glyphicon glyphicon-ok\"></span>").addClass("active");
                }
            }
        });
    }
}

// 关注按钮点击事件，点击关注或取关
$("#checkIsFollow").click(function () {
    var userId = $("#get_user_id").text();
    var sessionId = $("#get_session_id").text();

    // 如果用户未登录，则跳转到登录页面
    if (sessionId === "") {
        var r = confirm("您还未登录，前往登录...");
        if (r === true) {
            window.location.href = "../login.html";
        } else {
            return;
        }
    }

    $("#checkIsFollow").hasClass("active") ?
        $.ajax({    // 已关注，点击取关
            type: "post",
            url: "../check/unfollowAjax",
            data: {
                follower: userId,
                fans: sessionId
            },
            success: function (result) {
                if (result.code == 100) {
                    $("#checkIsFollow").html("<span class=\"glyphicon glyphicon-plus\"></span> 关注").removeClass("active");
                    var fansNum = Number($("#fansNum").text());
                    $("#fansNum").html(fansNum - 1);
                } else {
                    alert("取消关注失败！");
                }
            }
        }) :
        $.ajax({    // 未关注，点击关注
            type: "post",
            url: "../check/followAjax",
            data: {
                follower: userId,
                fans: sessionId
            },
            success: function (result) {
                if (result.code == 100) {
                    $("#checkIsFollow").html("已关注 <span class=\"glyphicon glyphicon-ok\"></span>").addClass("active");
                    var fansNum = Number($("#fansNum").text());
                    $("#fansNum").html(fansNum + 1);
                } else {
                    alert("关注失败！");
                }
            }
        });
});


// 点击关注部分，发送 Ajax，获得关注列表
$("#user_follow_div").click(function () {
    var userId = $("#get_user_id").text();
    var sessionId = $("#get_session_id").text();

    $.ajax({
        type: "post",
        url: "../user/"+ userId + "/following",
        success: function (result) {
            if (result.code == 100) {
                var followers = result.extend.model.followers;
                var followingBox = "";
                if (userId == sessionId) {
                    followingBox = "<h4>我的关注：</h4>\n";
                } else {
                    followingBox = "<h4>他的关注：</h4>\n";
                }
                $.each(followers, function (index, follower) {
                    followingBox +=
                        "<div class=\"col-md-4\">\n" +
                        "<div class=\"col-md-10 col-md-offset-1 follow_box_div\">" +
                        "    <div class=\"col-md-12\">\n" +
                        "        <img src=\"../../pic/img_sharePic/userHead/"+ follower.userHeadUrl +"\" class=\"img-responsive img-circle center-block\" alt=\"\" style=\"width: 200px;\">\n" +
                        "    </div>\n" +
                        "    <div class=\"col-md-12 text-center othUserName\">\n" +
                        "        <a href=\"../user/"+ follower.userId +"\"><span>"+ follower.userName +"</span></a>\n" +
                        "    </div>\n" +
                        "    <div class=\"col-md-12 text-center\">\n" +
                        "        <a class=\"btn btn-default checkIsFollow-fl follower"+ follower.userId +"\"><span class=\"glyphicon glyphicon-plus\"></span> 关注</a>\n" +
                        "        <span class=\"hidden get_user_id_fl\">"+ follower.userId +"</span>\n" +
                        "    </div>\n" +
                        "</div>" +
                        "</div>";
                });
                $("#user-right-box").html(followingBox);
                checkIsFollow_fl(followers);
            }
        }
    });
});

// 点击粉丝部分，发送 Ajax，获得粉丝列表
$("#user_fans_div").click(function () {
    var userId = $("#get_user_id").text();
    var sessionId = $("#get_session_id").text();

    $.ajax({
        type: "post",
        url: "../user/"+ userId + "/fans",
        success: function (result) {
            if (result.code == 100) {
                var fans = result.extend.model.fans;
                var fansBox = "";
                if (userId == sessionId) {
                    fansBox = "<h4>我的粉丝：</h4>\n";
                } else {
                    fansBox = "<h4>他的粉丝：</h4>\n";
                }
                $.each(fans, function (index, fan) {
                    fansBox +=
                        "<div class=\"col-md-4\">\n" +
                        "<div class=\"col-md-10 col-md-offset-1 follow_box_div\">" +
                        "    <div class=\"col-md-12\">\n" +
                        "        <img src=\"../../pic/img_sharePic/userHead/"+ fan.userHeadUrl +"\" class=\"img-responsive img-circle center-block\" alt=\"\" style=\"width: 200px;\">\n" +
                        "    </div>\n" +
                        "    <div class=\"col-md-12 text-center othUserName\">\n" +
                        "        <a href=\"../user/"+ fan.userId +"\"><span>"+ fan.userName +"</span></a>\n" +
                        "    </div>\n" +
                        "    <div class=\"col-md-12 text-center\">\n" +
                        "        <a class=\"btn btn-default checkIsFollow-fs fans"+ fan.userId +"\"><span class=\"glyphicon glyphicon-plus\"></span> 关注</a>\n" +
                        "        <span class=\"hidden\">"+ fan.userId +"</span>\n" +
                        "    </div>\n" +
                        "</div>" +
                        "</div>";
                });
                $("#user-right-box").html(fansBox);
                checkIsFollow_fs(fans);
            }
        }
    });
});


// 自动发送 Ajax，检查关注列表中的用户是否关注
function checkIsFollow_fl(followers) {
    var sessionId = $("#get_session_id").text();

    if (sessionId==="") {    // 如果用户未登录，或为用户自己的界面，不用检查
        return;
    } else {
        $.ajax({
            type: "post",
            url: "../check/checkIsFollowFL",
            data: {
                followers: JSON.stringify(followers),
                fans: sessionId
            },
            success: function (result) {
                if (result.code == 100) {    // 检查到已关注用户列表，改变按钮样式
                    var isFollowMap = result.extend.isFollowMap;
                    $.each(isFollowMap, function (userId, isFollow) {
                        if (sessionId === userId) {
                            $(".follower" + userId).css("visibility", "hidden");
                        }
                        if (isFollow === "true") {
                            $(".follower" + userId).html("已关注 <span class=\"glyphicon glyphicon-ok\"></span>").addClass("active");
                        }
                    });
                }
            }
        });
    }
}


// 自动发送 Ajax，检查粉丝列表中的用户是否关注
function checkIsFollow_fs(followers) {
    var sessionId = $("#get_session_id").text();

    if (sessionId==="") {    // 如果用户未登录，或为用户自己的界面，不用检查
        return;
    } else {
        $.ajax({
            type: "post",
            url: "../check/checkIsFollowFL",
            data: {
                followers: JSON.stringify(followers),
                fans: sessionId
            },
            success: function (result) {
                if (result.code == 100) {    // 检查到已关注用户列表，改变按钮样式
                    var isFollowMap = result.extend.isFollowMap;
                    $.each(isFollowMap, function (userId, isFollow) {
                        if (sessionId === userId) {
                            $(".fans" + userId).css("visibility", "hidden");
                        }
                        if (isFollow === "true") {
                            $(".fans" + userId).html("已关注<span class=\"glyphicon glyphicon-ok\"></span>").addClass("active");
                        }
                    });
                }
            }
        });
    }
}


// 关注列表部分的关注按钮点击事件
$(document).on("click", ".checkIsFollow-fl", function() {
    var userId = $(this).next().text();
    var id = $("#get_user_id").text();
    var sessionId = $("#get_session_id").text();

    // 如果用户未登录，则跳转到登录页面
    if (sessionId === "") {
        var r = confirm("您还未登录，前往登录...");
        if (r === true) {
            window.location.href = "../login.html";
        } else {
            return;
        }
    }

    $(this).hasClass("active") ?
        $.ajax({    // 已关注，点击取关
            type: "post",
            url: "../check/unfollowAjax",
            data: {
                follower: userId,
                fans: sessionId
            },
            success: function (result) {
                if (result.code === 100) {
                    var follower = result.extend.userId;
                    $(".follower" + follower).html("<span class=\"glyphicon glyphicon-plus\"></span> 关注").removeClass("active");
                    if (sessionId === id) {    // 如果是用户自己的页面，关注数-1
                        var fansNum = Number($("#followNum").text());
                        $("#followNum").html(fansNum - 1);
                    }
                } else {
                    alert("取消关注失败！");
                }
            }
        }) :
        $.ajax({    // 未关注，点击关注
            type: "post",
            url: "../check/followAjax",
            data: {
                follower: userId,
                fans: sessionId
            },
            success: function (result) {
                if (result.code === 100) {
                    var follower = result.extend.userId;
                    $(".follower" + follower).html("已关注 <span class=\"glyphicon glyphicon-ok\"></span>").addClass("active");
                    if (sessionId === id) {    // 如果是用户自己的页面，关注数+1
                        var fansNum = Number($("#followNum").text());
                        $("#followNum").html(fansNum + 1);
                    }
                } else {
                    alert("关注失败！");
                }
            }
        });
});

// 关注列表部分的关注按钮点击事件
$(document).on("click", ".checkIsFollow-fs", function() {
    var userId = $(this).next().text();
    var id = $("#get_user_id").text();
    var sessionId = $("#get_session_id").text();

    // 如果用户未登录，则跳转到登录页面
    if (sessionId === "") {
        var r = confirm("您还未登录，前往登录...");
        if (r === true) {
            window.location.href = "../login.html";
        } else {
            return;
        }
    }

    $(this).hasClass("active") ?
        $.ajax({    // 已关注，点击取关
            type: "post",
            url: "../check/unfollowAjax",
            data: {
                follower: userId,
                fans: sessionId
            },
            success: function (result) {
                if (result.code === 100) {
                    var follower = result.extend.userId;
                    $(".fans" + follower).html("<span class=\"glyphicon glyphicon-plus\"></span> 关注").removeClass("active");
                    if (sessionId === id) {    // 如果是用户自己的页面，关注数-1
                        var fansNum = Number($("#fansNum").text());
                        $("#fansNum").html(fansNum - 1);
                    }
                } else {
                    alert("取消关注失败！");
                }
            }
        }) :
        $.ajax({    // 未关注，点击关注
            type: "post",
            url: "../check/followAjax",
            data: {
                follower: userId,
                fans: sessionId
            },
            success: function (result) {
                if (result.code === 100) {
                    var follower = result.extend.userId;
                    $(".fans" + follower).html("已关注 <span class=\"glyphicon glyphicon-ok\"></span>").addClass("active");
                    if (sessionId === id) {    // 如果是用户自己的页面，关注数+1
                        var fansNum = Number($("#fansNum").text());
                        $("#fansNum").html(fansNum + 1);
                    }
                } else {
                    alert("关注失败！");
                }
            }
        });
});

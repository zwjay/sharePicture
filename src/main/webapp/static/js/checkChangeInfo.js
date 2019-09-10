$(document).ready(function () {

    initChangeName();
    initChangePassword();
    initChangeEmail();

});

/* --------------------------------------------------
        Ajax changeName Form
-------------------------------------------------- */
function initChangeName() {
    $(".changeName_form").bootstrapValidator({
        live: 'enabled',//验证时机，enabled 是内容有变化就验证（默认），disabled 和 submitted 是提交再验证
        submitButtons: '.changeName_btn',
        message: '输入信息错误',
        feedbackIcons: false,
        fields: {
            name: {
                message: '用户名不合法',
                validators: {
                    notEmpty: {message: '用户名不能为空'},
                    stringLength: {min: "2", max: "20", message: "用户名最短为2,最长为20"},
                    regexp: {regexp: /^[a-zA-Z0-9\u4e00-\u9fa5]{2,20}$/, message: '只能为字母数字汉字，最短2，最长20'},
                    threshold:2,
                    remote: {
                        type: 'POST',
                        url: '/sharePicture/check/checkUsername',
                        data: '',
                        message: '用户名已被占用',
                        delay: 2000
                    }
                }
            }
        }
    });
    $(".changeName_btn").click(function () {
        var bootstrapValidator = $('.changeName_form').data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var data = {
                userId: $("#get_session_id").text(),
                new_userName: $("#new_userName").val()
            };
            $.ajax({
                type: "POST",
                url: "/sharePicture/action/doChangeName",
                data: data,
                success: function (result) {
                    if (result.code == 100) {
                        var newName = result.extend.new_userName;
                        alert("用户名修改成功！.");
                        $("#changeNameModal").modal('hide');
                        $("#name").html(newName);
                        $("#user_name").html(newName);
                    } else {
                        alert("用户名修改失败！");
                        $("#changeNameModal").modal('hide');
                    }
                }
            });
        }
    });
}


/* --------------------------------------------------
        Ajax changePassword Form
-------------------------------------------------- */
function initChangePassword() {
    $(".changePassword_form").bootstrapValidator({
        live: 'enabled',//验证时机，enabled 是内容有变化就验证（默认），disabled 和 submitted 是提交再验证
        submitButtons: '.changePassword_btn',
        message: '输入信息错误',
        feedbackIcons: false,
        fields: {
            old_password: {
                message: '密码不合法',
                validators: {
                    notEmpty: {message: '密码不能为空'},
                    stringLength: {min: "6", max: "16", message: "密码最短为6,最长为16"},
                    regexp: {regexp: /^[a-zA-Z0-9]{6,16}$/, message: '只能为字母数字，最短6，最长16'},
                    threshold:6,
                    remote: {
                        type: 'POST',
                        url: '/sharePicture/check/checkOldPassword',
                        data: function () {
                            return {
                                "userId": $("#get_session_id").text()
                            };
                        },
                        message: '密码错误',
                        delay: 2000
                    }
                }
            },
            new_password: {
                message: '密码不合法',
                validators: {
                    notEmpty: {message: '密码不能为空'},
                    stringLength: {min: "6", max: "16", message: "密码最短为6,最长为16"},
                    regexp: {regexp: /^[a-zA-Z0-9]{6,16}$/, message: '只能为字母数字，最短6，最长16'}
                }
            }
        }
    });
    $(".changePassword_btn").click(function () {
        var bootstrapValidator = $('.changePassword_form').data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var data = {
                userId: $("#get_session_id").text(),
                new_password: $("#new_password").val()
            };
            $.ajax({
                type: "POST",
                url: "/sharePicture/action/doChangePassword",
                data: data,
                success: function (result) {
                    if (result.code == 100) {
                        alert("密码修改成功!");
                        $("#changePasswordModal").modal('hide');
                    } else {
                        alert("密码修改失败...");
                        $("#changePasswordModal").modal('hide');
                    }
                }
            });
        }
    });
}


/* --------------------------------------------------
        Ajax changeEmail Form
-------------------------------------------------- */
function initChangeEmail() {
    $(".changeEmail_form").bootstrapValidator({
        live: 'enabled',//验证时机，enabled 是内容有变化就验证（默认），disabled 和 submitted 是提交再验证
        submitButtons: '.changeEmail_btn',
        message: '输入信息错误',
        feedbackIcons: false,
        fields: {
            old_email: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    },
                    emailAddress: {
                        message: '请输入正确的邮箱地址'
                    },
                    remote: {
                        type: 'POST',
                        url: '/sharePicture/check/checkOldEmail',
                        data: function () {
                            return {
                                "userId": $("#get_session_id").text()
                            };
                        },
                        message: 'E-mail错误',
                        delay: 2000
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    },
                    emailAddress: {
                        message: '请输入正确的邮箱地址'
                    },
                    remote: {
                        type: 'POST',
                        url: '/sharePicture/check/checkEmail',
                        data: '',
                        message: 'E-mail已被使用',
                        delay: 2000
                    }
                }
            }
        }
    });
    $(".changeEmail_btn").click(function () {
        var bootstrapValidator = $('.changeEmail_form').data('bootstrapValidator');
        bootstrapValidator.validate();
        if (bootstrapValidator.isValid()) {
            var data = {
                userId: $("#get_session_id").text(),
                new_email: $("#new_email").val()
            };
            $.ajax({
                type: "POST",
                url: "/sharePicture/action/doChangeEmail",
                data: data,
                success: function (result) {
                    if (result.code == 100) {
                        var newEmail = result.extend.new_email;
                        alert("邮箱修改成功!");
                        $("#changeEmailModal").modal('hide');
                        $("#email").html(newEmail);
                    } else {
                        alert("密码修改失败...");
                        $("#changeEmailModal").modal('hide');
                    }
                }
            });
        }
    });
}

// changeNameModal 验证销毁重构，防止第二次打开 modal 时显示上一次的验证痕迹
$('#changeNameModal').on('hidden.bs.modal', function() {
    $('#changeName_form').data('bootstrapValidator', null);
    initChangeName();
});

// changePasswordModal 验证销毁重构，防止第二次打开 modal 时显示上一次的验证痕迹
$('#changePasswordModal').on('hidden.bs.modal', function() {
    $('#changePassword_form').data('bootstrapValidator', null);
    initChangePassword();
});

// changeEmailModal 验证销毁重构，防止第二次打开 modal 时显示上一次的验证痕迹
$('#changeEmailModal').on('hidden.bs.modal', function() {
    $('#changeEmail_form').data('bootstrapValidator', null);
    initChangeEmail();
});


// 点击退出登录按钮触发此事件，发送 ajax 请求，退出登录，并跳转到首页
$("#user_logout").click(function () {
    $.ajax({
        type: "post",
        url: "../../logout",
        data: "",
        success: function (result) {
            if (result.code == 100) {
                window.location.href = "../../index.html";
            }
        }
    })
});


// 点击头像，上传并预览
$(document).on("click", "#user_head", function () {
    $("#file_input").click();
    $("#file_input").on("change", function () {
        var objUrl = getObjectUrl(this.files[0]);
        if (objUrl) {
            $("#user_head").attr("src", objUrl);
        }

        $.ajaxFileUpload({
            url: "../../action/uploadHeadPic",
            fileElementId: "file_input",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8", // 告诉jQuery不要去设置Content-Type请求头
            success: function (result) {
                if (result.code == 100) {
                    var fileName = result.extend.fileName;
                    $("#user_head").attr("src", "../../../pic/img_sharePic/userHead/"+fileName);
                }
            }
        });
    });
});

function getObjectUrl(file){
    var url = null;
    if(window.createObjectURL != undefined){//basic
        url = window.createObjectURL(file);
    }else if(window.URL != undefined){//mozila(firefox)
        url = window.URL.createObjectURL(file);
    }else if(window.webkitURL != undefined){//webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
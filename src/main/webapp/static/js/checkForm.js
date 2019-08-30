$(document).ready(function () {

    /* --------------------------------------------------
            Ajax Registered Form
        -------------------------------------------------- */
    $(".registered_form").bootstrapValidator({
        live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
        excluded: [':disabled', ':hidden', ':not(:visible)'],//排除无需验证的控件，比如被禁用的或者被隐藏的
        submitButtons: '.registered_btn',
        message: '输入信息错误',
        feedbackIcons: {//根据验证结果显示的各种图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
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
            },
            password: {
                message: '密码不合法',
                validators: {
                    notEmpty: {message: '密码不能为空'},
                    stringLength: {min: "6", max: "16", message: "密码最短为6,最长为16"},
                    regexp: {regexp: /^[a-zA-Z0-9]{6,16}$/, message: '只能为字母数字，最短6，最长16'}
                }
            },
            repassword: {
                message: '确认密码不合法',
                validators: {
                    notEmpty: {message: '确认密码不能为空'},
                    identical: {
                        field: 'password',
                        message: '两次密码输入不一致'
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
    $(".registered_btn").click(function () {
        var bootstrapValidator = $('.registered_form').data('bootstrapValidator');
        if (bootstrapValidator.isValid()) {
            var user = {
                userName: $("#registered_name").val(),
                password: $("#registered_password").val(),
                email: $("#registered_email").val()
            };
            $.ajax({
                type: "POST",
                url: "/sharePicture/action/doRegistered",
                data: user,
                success: function (result) {
                    if (result.code == 100) {
                        location.href = "login.html"
                    } else {
                        bootstrapValidator.resetForm(true); // 重置校验
                        $('.registered_form')[0].reset(); // 表单清空
                        alert("注册失败");
                    }
                }
            });
        }
    });

    /* --------------------------------------------------
        Ajax Login Form
    -------------------------------------------------- */
    $(".login_form").bootstrapValidator({
        live: 'enabled',//验证时机，enabled 是内容有变化就验证（默认），disabled 和 submitted 是提交再验证
        excluded: [':disabled', ':hidden', ':not(:visible)'],//排除无需验证的控件，比如被禁用的或者被隐藏的
        submitButtons: '.login_btn',
        message: '输入信息错误',
        feedbackIcons: false,
        fields: {
            name: {
                message: '用户名不合法',
                validators: {
                    notEmpty: {message: '用户名不能为空'},
                    stringLength: {min: "2", max: "20", message: "用户名最短为2,最长为20"},
                    regexp: {regexp: /^[a-zA-Z0-9\u4e00-\u9fa5]{2,20}$/, message: '只能为字母数字汉字，最短2，最长20'},
                }
            },
            password: {
                message: '密码不合法',
                validators: {
                    notEmpty: {message: '密码不能为空'},
                    stringLength: {min: "6", max: "16", message: "密码最短为6,最长为16"},
                    regexp: {regexp: /^[a-zA-Z0-9]{6,16}$/, message: '只能为字母数字，最短6，最长16'}
                }
            }
        }
    });
    $(".login_btn").click(function () {
        var bootstrapValidator = $('.login_form').data('bootstrapValidator');
        if (bootstrapValidator.isValid()) {
            var user = {
                userName: $("#login_name").val(),
                password: $("#login_password").val()
            };
            $.ajax({
                type: "POST",
                url: "/sharePicture/action/doLogin",
                data: user,
                success: function (result) {
                    if (result.code == 100) {
                        location.href = "index.html"
                    } else {
                        bootstrapValidator.resetForm(true); // 重置校验
                        $('.login_form')[0].reset(); // 表单清空
                        alert(result.extend.message);
                    }
                }
            });
        }
    });
});
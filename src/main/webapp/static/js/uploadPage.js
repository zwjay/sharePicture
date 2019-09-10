$(function () {
    // 点击上传图片按钮
    $(document).on("click", "#upload_picture_img", function () {
        $("#upload_picture_input").click();
        $("#upload_picture_input").on("change", function () {
            var objUrl = getObjectUrl(this.files[0]);
            if (objUrl) {
                $("#upload_picture_img").attr("src", objUrl);
            }
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
});
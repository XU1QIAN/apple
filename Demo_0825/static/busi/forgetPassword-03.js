$(function() {

    //隐藏显示密码
    $('.eys-icon').click(function() {
        var $i = $(this).find('i');
        var $input = $(this).parents('.weui-cell__ft').siblings('.weui-cell__bd').find('input');
        if ($i.hasClass("icon-biyanjing")) {
            $i.removeClass('icon-biyanjing').addClass('icon-chakanyanjingshishifenxi');
            $input.prop('type', 'text')
        } else {
            $i.removeClass('icon-chakanyanjingshishifenxi').addClass('icon-biyanjing');
            $input.prop('type', 'password')
        }

    })

    //点击提交 验证
    $("#submit").click(function() {
        var newPassword = $('#newPassword').val();
        var aginPassword = $('#aginPassword').val();
        if (!newPassword) {
            $.toptip('新密码不能为空')
        } else if (!aginPassword) {
            $.toptip('在次输入密码不能为空')
        } else if (newPassword != aginPassword) {
            $.toptip('密码输入不一致')
        } else {
            $.toptip('提交成功', 'success');
            window.location.href = "login.html"
        }
    });

});
$(function() {

    //点击提交 验证
    $("#submit").click(function() {
        var code = $('#code').val();
        if (!code || !/\d{6}/.test(code)) {
            $.toptip('请输入六位手机验证码')
        } else {
            $.toptip('登录成功', 'success');
            //window.location.href = "index.html"
        };
    });

    //点击发送验证码

    $('#vCode').on('click', function() {
        time(this);
    });
})


var wait = 59; //验证秒数设置
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.style.background = "#fa7a07";
        o.style.color = "#fff";
        o.value = "获取验证码";
        wait = 59;
    } else {
        o.setAttribute("disabled", true);
        o.style.background = "#fff";
        o.style.color = "#3e3e3e";
        o.value = "重新发送(" + wait + "s)";
        wait--;
        setTimeout(function() {
            time(o)
        }, 1000)
    }
}
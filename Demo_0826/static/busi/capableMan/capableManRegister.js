layui.define(['element', 'layer', 'form'], function(exports){
    var $ = layui.jquery,
    element = layui.element,
    layer = layui.layer,
    form = layui.form;

    // 校验手机号，成功，将验证码按钮变为可点击状态
    $('#phoneNumber').keyup(function() {
        var value = $('#phoneNumber').val();
        if(/^1[3,4,5,7,8]\d{9}$/.test(value)) {
            $('#identifyingCode').removeClass('layui-btn-disabled').addClass('layui-btn-sure');
        } else {
            $('#identifyingCode').addClass('layui-btn-disabled').removeClass('layui-btn-sure');
        }
    });
    $('#phoneNumber').blur(function() {
        var value = $('#phoneNumber').val();
        if(!(/^1[3,4,5,7,8]\d{9}$/.test(value))) {
            layer.msg('请输入有效的手机号码');
        }
    });

    // 点击验证码
    $('body').on('click', '#identifyingCode.layui-btn-sure', function() {
        time($('#identifyingCode'), 59);
    });

    //倒计时方法
    function time(o, wait) {
        if (wait == 0) {
            var value = $('#phoneNumber').val();
            if(/^1[3,4,5,7,8]\d{9}$/.test(value)) {
                o.removeClass('layui-btn-disabled').addClass('layui-btn-sure');
            } else {
                o.addClass('layui-btn-disabled').removeClass('layui-btn-sure');
            }
            o.html("获取验证码");
        } else {
            o.addClass('layui-btn-disabled').removeClass('layui-btn-sure');
            o.html("重新发送(" + wait + "s)");
            wait--;
            setTimeout(function() {
                time(o, wait);
            }, 1000)
        }
    }

    //自定义验证规则
    form.verify({
        phone: [/^1[3,4,5,7,8]\d{9}$/, '请输入有效的手机号码']
        ,pass: [/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/, '至少8位且必须包含数字及字母']
        ,repass: function(value) {
            if(value != $('#password').val() ) {
                return '两次输入的密码不一致';
            }
        }
    });

    //监听提交
    form.on('submit(registerForm)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //     title: '最终的提交信息'
        // })
        self.location='capableManRegisterSuccess.html'; 
        return false;
    });

    exports('capableManRegister', {});    
});


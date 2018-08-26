$(function() {
    var _text = '手机号码'; //切换类型文字存储

    var app = new Vue({
        el: '#passwordInfo',
        data: {
            tel: '',
            email: '',
            oldPassword: '',
            newPassword: '',
            rePassword: '',
            type: ''
        }, 
        methods: {
            edit: function(){
                var oldPassword = $('#oldPassword').val();
                var newPassword = $('#newPassword').val();
                var rePassword = $('#rePassword').val();
                if (!oldPassword) {
                    $.toptip('旧密码不能为空')
                } else if (!newPassword) {
                    $.toptip('新密码不能为空')
                } else if (rePassword != newPassword) {
                    $.toptip('密码输入不一致')
                } else {
                    let data = {};
                    data.tel = this.tel;
                    data.email = this.email;
                    data.oldPassword = this.oldPassword;
                    data.newPassword = this.newPassword;
                    data.type = _text;
                    axios.post('', data, function(resp) {
                        if(resp.respCode == '200') {
                            // 返回成功后的操作
                            $.toptip('修改成功', 'success');
                            window.location.href = "login.html";
                        }
                    });
                }
            }
        }
    });

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

    //切换注册类型选择弹出层
    FnBtmPopup($('#registerTypeSelect'), $('#registerType'), $('#selectChoose'));

    //选择切换方式的确定事件
    $('#selectChoose .weui-cell').click(function() {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        _text = _this.find('p').html();
        $('#registerTypeSelect em').html(_text);
        if (_text === '手机号码') {
            $('.tel-item').show().siblings().hide();
        } else {
            $('.email-item').show().siblings().hide();
        }
    })
});
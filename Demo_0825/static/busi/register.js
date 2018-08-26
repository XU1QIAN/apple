$(function() {
    var app = new Vue({
        el: '#register',
        data: {
            tel: '',
            checkNum: '',
            setpassword: ''
        },
        methods: {
            edit: function() {
                let data = {};
                data.tel = this.tel;
                data.checkNum = this.checkNum;
                data.address = this.address;
                data.setpassword = this.setpassword;
                axios.post('', data, function(resp) {
                    if (resp.respCode == '200') {
                        // 返回成功后的操作
                        window.history.go(-1);
                    }
                });
            }
        }
    });

    var _text = ''; //切换类型文字存储
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
            $.toast("注册成功!", "", function() {
                window.location.href = "login.html"
            });
        }
    });

    //点击发送验证码
    $('#vCode').on('click', function() {
        time(this);
    });

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

var wait = 59; //验证秒数设置
//倒计时方法
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

/**
 * 底部弹出框的调用方法
 * @param {*} clickBtn 点击触发事件的按钮
 * @param {*} popupId 需要弹出的弹出层id
 * @param {*} closeBtn 需要关闭的弹出层事件(arry)
 */
function FnBtmPopup(clickBtn, popupId, closeBtn) {
    var popubBody = popupId.find('.popup-bottom');
    if (null != clickBtn && null != popupId) {
        var popubMask = popupId.find('.span-mask');
        clickBtn.click(function() {
            popupId.show();
            popubBody.removeClass('slideOutDown').addClass('slideInUp');
            popubMask.click(function() {
                FnClose();
            });
        });
    }

    var list = [];
    if (typeof closeBtn != 'undefined') {
        if (closeBtn instanceof Array) {
            for (var i = 0; i < closeBtn.length; i++) {
                list.push(closeBtn[i]);
            }
        } else if (closeBtn instanceof Object) {
            list.push(closeBtn);
        }
    };
    if (null != list && list.length > 0) {
        list.forEach(element => {
            element.click(function() {
                FnClose();
            });
        });
    };

    function FnClose() {
        popubBody.removeClass('slideInUp').addClass('slideOutDown');
        setTimeout(function() {
            popupId.fadeOut()
        }, 100)
    }

}
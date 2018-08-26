$(function() {
    var _text = '手机号码'; //切换类型文字存储
    
    var app = new Vue({
        el: '#capableManInfo',
        data: {
            name: '',
            tel: '',
            email: '',
            verificationCode: '',
            type: ''
        }, 
        methods: {
            edit: function(){
                let data = {};
                data.name = this.name;
                data.tel = this.tel;
                data.email = this.email;
                data.verificationCode = this.verificationCode;
                data.type = _text;
                axios.post('', data, function(resp) {
                    if(resp.respCode == '200') {
                        // 返回成功后的操作
                        $.toptip('申请成功', 'success');
                        window.history.go(-1);
                    }
                });
            }
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
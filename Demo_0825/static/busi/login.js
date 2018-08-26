$(function() {

    axios.post("../static/mockData/login.json").then(function(resp) {
        var loginData = resp.data;
        var app = new Vue({
            el: '#loginbox',
            data: {
                account: loginData.account,
                password: loginData.password,
                tel: loginData.tel
            },
            methods: {
                edit: function() {
                    let data = {};
                    data.account = this.account;
                    data.password = this.password;
                    data.tel = this.tel;
                    axios.post('', data, function(resp) {
                        if (resp.respCode == '200') {
                            // 返回成功后的操作
                            window.history.go(-1);
                        }
                    });
                }
            }
        });
    });
    FnTab();
    //点击提交 验证
    $("#submit").click(function() {
        var account = $('#account').val();
        var password = $('#password').val();
        if (!account) {
            $.toptip('用户名不能为空')
        } else if (!password) {
            $.toptip('密码不能为空')
        } else {
            $.toptip('提交成功', 'success');
            //window.location.href = "index.html"
        };

    });
    //获取密码验证
    $('#obtain').click(function() {
        var tel = $('#tel').val();
        if (!tel || !/1[3|4|5|7|8]\d{9}/.test(tel)) {
            $.toptip('请输入手机号')
        } else {
            $.toptip('验证码已发送', 'success');
            window.location.href = "quickLogin.html"
        }

    });
    //隐藏显示密码
    $('.eys-icon').click(function() {
        var $password = $('#password');
        var $i = $(this).find('i');
        if ($i.hasClass("icon-biyanjing")) {
            $i.removeClass('icon-biyanjing').addClass('icon-chakanyanjingshishifenxi');
            $password.prop('type', 'text')

        } else {
            $i.removeClass('icon-chakanyanjingshishifenxi').addClass('icon-biyanjing');
            $password.prop('type', 'password')
        }

    })
});

function FnTab() {
    var tabsSwiper = new Swiper('#tabs-container', {
        initialSlide: 0,
        speed: 500,
        onSlideChangeStart: function(swiper) {
            $(".top-tab-ul li.active").removeClass('active')
            $(".top-tab-ul li").eq(swiper.activeIndex).addClass('active');
        }
    })
    $(".top-tab-ul li").on('touchstart mousedown', function(e) {
        e.preventDefault()
        $(".top-tab-ul li.active").removeClass('active')
        $(this).addClass('active')
        tabsSwiper.slideTo($(this).index())
    })
    $(".top-tab-ul li").click(function(e) {
        e.preventDefault()
    })
}
layui.define(['form'], function (exports) {
    var form = layui.form,
        $ = layui.jquery;

    //选择登录方式--微信登录
    $('#wechat').on('click', function() {
        $('.wechat-login').show();
        $('.jobNo-login').hide();
    });

    //选择登录方式--工号登录
    $('#jobNo').on('click', function() {
        $('.jobNo-login').show();
        $('.wechat-login').hide();
    });

    exports(['login'], {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
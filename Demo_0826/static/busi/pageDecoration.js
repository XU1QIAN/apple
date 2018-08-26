layui.define(['element', 'layer', 'form'], function (exports) {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        form = layui.form;

    // 初始化个模块高度
    heightCalculate();

    // 计算模块高度
    function heightCalculate() {
        var height = $('.decoration-content').height();
        $('.decoration-left-tabs').height(height);
    }

    // 页面装修--轮播图模块
    orderArrowState();   // 初始化排序箭头可点击状态更改

    // 页面装修--轮播图模块--排序箭头可点击状态更改
    function orderArrowState() {
        var length = $('#carousel-module .each-image').length;
        if (length > 1) {
            $('#carousel-module .each-image').each(function (index) {
                if (index == 0) {
                    $(this).find('.icon-arrowDown').addClass('abled');
                    $(this).find('.icon-arrowUp').removeClass('abled');
                } else if (index == (length - 1)) {
                    $(this).find('.icon-arrowUp').addClass('abled');
                    $(this).find('.icon-arrowDown').removeClass('abled');
                } else {
                    $(this).find('.icon-arrowUp, .icon-arrowDown').addClass('abled');
                }
            })
        } else {
            $('#carousel-module .each-image').find('.icon-arrowUp, .icon-arrowDown').removeClass('abled');
        }
    }

    // 删除图片
    $('body').on('click', '.icon-delete', function () {
        $(this).parents('.each-image').remove();
        var num = parseInt($('#img-number').html());
        num--;
        $('#img-number').html(num);
        isAddabled();
        orderArrowState();
    });

    // 图片顺序下移
    $('body').on('click', '.icon-arrowDown.abled', function () {
        var _this = $(this).parents('.each-image');
        var next = _this.next('.each-image');
        _this.insertAfter(next);
        orderArrowState();
    });

    // 图片顺序上移
    $('body').on('click', '.icon-arrowUp.abled', function () {
        var _this = $(this).parents('.each-image');
        var prev = _this.prev('.each-image');
        _this.insertBefore(prev);
        orderArrowState();
    });

    // 添加按钮可点击状态
    isAddabled();

    function isAddabled() {
        var num = parseInt($('#img-number').html());
        if (num < 4) {
            $('#add-btn').addClass('abled');
        } else {
            $('#add-btn').removeClass('abled');
        }
    }

    // 添加图片
    $('body').on('click', '#add-btn.abled', function () {
        $('#carousel-module .image-list').append('<div class="each-image"><div class="arrow-area"><i class="iconfont icon-arrowUp"></i><i class="iconfont icon-arrowDown"></i></div><div class="add-image-btn"><i class="iconfont icon-plus"></i></div><input type="text" value="https://123…" class="layui-input"><i class="iconfont icon-eye"></i><i class="iconfont icon-link"></i><i class="iconfont icon-delete"></i><div class="clearfix"></div></div>');
        var num = parseInt($('#img-number').html());
        num++;
        $('#img-number').html(num);
        isAddabled();
        orderArrowState();
    });

    // 保存
    $('.module-edit .layui-btn-sure').on('click', function () {
        var item = $(this).attr("id");
        if (item == 'saveType') {
            if (!checkPrice()) {
                return false;
            }
        }
        $(this).parents('.module-edit').hide();
        $('.page-module').removeClass('active');
    });

    // 关闭
    $('.module-edit .close-btn').on('click', function () {
        $(this).parents('.module-edit').hide();
        $('.page-module').removeClass('active');
    });

    // 替换图片
    $('body').on('mouseenter', '.each-image img', function () {
        $('.change-img-btn').hide();
        $(this).next('.change-img-btn').show();
    });

    $('body').on('mouseleave', '.each-image .change-img-btn', function () {
        $(this).hide();
    });

    // 选择图片弹出框
    $('body').on('click', '.each-image .change-img-btn, .add-image-btn', function () {
        _this = $(this);
        if (_this.hasClass('change-img-btn')) {
            var img = _this.prev('img');
        }
        var image_src;
        layer.open({
            type: 1,
            title: '选择图片',
            skin: 'pocDialog hasTitle',
            closeBtn: true,
            area: '800px',
            shade: [0.6, '#323232'],
            shadeClose: true,//点击遮罩层关闭
            id: 'imageSelectDialog', //设定一个id，防止重复弹出
            moveType: 1,//拖拽模式，0或者1
            content: $('#imageSelect'),
            btn: ['取消', '确定'],
            btn2: function (index, layero) {
                // 修改图片
                if (_this.hasClass('change-img-btn')) {
                    img.attr('src', image_src);
                }
                // 新增图片
                else if (_this.hasClass('add-image-btn')) {
                    var html = '<img src="' + image_src + '"><div class="change-img-btn">替换图片</div>';
                    $(html).insertAfter(_this);
                    _this.remove();
                }
            }
        });

        // 选择图片弹出框--选择图片
        $('#imageSelect img').off().on('click', function () {
            $('#imageSelect img').removeClass('active');
            $(this).addClass('active');
            image_src = $(this).attr('src');
        });
    });

    // 模块编辑切换
    $('.page-module').on('click', function () {
        $('.module-edit').hide();
        $('.page-module').removeClass('active');
        $(this).addClass('active').next('.module-edit').show();
    });


    // 新建分类弹出框
    $('#new-classification-btn').on('click', function () {
        layer.open({
            type: 1,
            title: '新建分类',
            skin: 'pocDialog hasTitle',
            closeBtn: true,
            area: '500px',
            shade: [0.6, '#323232'],
            shadeClose: true,//点击遮罩层关闭
            id: 'newClassificationDialog', //设定一个id，防止重复弹出
            moveType: 1,//拖拽模式，0或者1
            content: $('#new-classification'),
            btn: ['取消', '确定'],
            btn2: function (index, layero) {
                var name = $('#new-classification-name').val();
                if (!name) {
                    layer.msg('分类名称不能为空!', {
                        time: 5000, //20s后自动关闭
                        btn: ['确定']
                    });
                    return false;
                }
                var option = $("<option value='" + name + "'>" + name + "</option>");
                option.appendTo($("#commodityType"));
                form.render();
            }
        });
    });

    // 链接选择弹出框
    $('.icon-link').on('click', function () {
        var _this = $(this);
        layer.open({
            type: 1,
            title: '链接选择页面',
            skin: 'pocDialog hasTitle',
            closeBtn: true,
            area: '800px',
            shade: [0.6, '#323232'],
            shadeClose: true,//点击遮罩层关闭
            id: 'linkSelectDialog', //设定一个id，防止重复弹出
            moveType: 1,//拖拽模式，0或者1
            content: $('#link-select'),
            btn: ['取消', '确定'],
            btn2: function (index, layero) {
                var link = $('#popupLink').val();
                _this.siblings('input').val(link);
            }
        });
    });

    // 链接选择弹出框--选择链接
    $('body').on('click', '.layui-form-radio', function () {
        $('#link-select .layui-tab .layui-col-sm12').removeClass('checked');
        $(this).parents('.layui-col-sm12').addClass('checked');
        var link = $(this).siblings('input').attr('value');
        $('#popupLink').val(link);
    });


    function checkPrice() {
        var price_min = $("#price_min").val();
        var price_max = $("#price_max").val();
        if ("" != price_min) {
            if (!price_min.match(/^[0-9]+.?[0-9]*$/) || parseInt(price_min) < 0) {
                layer.msg('请输入正确的价格!', {
                    time: 5000,
                    btn: ['确定']
                });
                return false;
            }
        }
        if ("" != price_max) {
            if (!price_max.match(/^[0-9]+.?[0-9]*$/) || parseInt(price_max) < 0) {
                layer.msg('请输入正确的价格!', {
                    time: 5000,
                    btn: ['确定']
                });
                return false;
            }
        }
        if ("" != price_min && "" != price_max) {
            if (parseInt(price_max) <= parseInt(price_min)) {
                layer.msg('价格范围错误，请修改!', {
                    time: 5000,
                    btn: ['确定']
                });
                return false;
            }
        }
        return true;
    }

    exports('pageDecoration', {});
});


layui.define(['element', 'layer', 'table', 'upload', 'form'], function(exports) {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        table = layui.table,
        upload = layui.upload,
        form = layui.form;

    //店铺装修、素材中心切换
    $('.decoration-tab').on('click', function() {
        $('.decoration-tab').removeClass('active');
        $(this).addClass('active');
        var id = 'content-' + $(this).attr("id").substr(4);
        $('.main-content').hide();
        $('#' + id).show();
    });

    //店铺页面、商品分类、店铺风格
    $('.decoration-left-tab').on('click', function() {
        $('.decoration-left-tab').removeClass('active');
        $(this).addClass('active');
    });

    // 页面列表
    table.render({
        elem: '#table',
        url: '../../static/mockData/storeDecoration.json',
        cellMinWidth: 70, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        cols: [
            [{ field: 'name', title: '页面名称', style: 'color: #4688E3' }, { field: 'updateDatetime', title: '更新时间' }, { field: 'state', title: '状态' }, { title: '操作', toolbar: '#barDemo' }]
        ]
    });

    // 初始化模块高度
    heightCalculate();

    // 计算模块高度
    function heightCalculate() {
        var leftHeight = $('.decoration-left').height();
        var rightHeight = $('.decoration-right').height();
        var height = Math.max(leftHeight, rightHeight);
        $('.decoration-left').height(height);
        $('.decoration-right').height(height);
        $('.decoration-left-tabs').height(height);
    }

    // 一键装修弹出框
    $('#oneKeyDecoration').on('click', function() {
        layer.open({
            type: 1,
            title: '选择模板',
            skin: 'pocDialog hasTitle',
            closeBtn: true,
            area: '800px',
            shade: [0.6, '#323232'],
            shadeClose: true, //点击遮罩层关闭
            id: 'templateSelectDialog', //设定一个id，防止重复弹出
            moveType: 1, //拖拽模式，0或者1
            content: $('#templateSelect'),
            btn: ['选择首页商品', '确定'],
            yes: function(index, layero) {
                $('.draggable-element').arrangeable();
                $('li').arrangeable({ dragSelector: '.drag-area' });
                layer.close(index);
                layer.open({
                    type: 1,
                    title: '选择首页展示商品',
                    skin: 'pocDialog hasTitle',
                    closeBtn: true,
                    area: '800px',
                    shade: [0.6, '#323232'],
                    shadeClose: true, //点击遮罩层关闭
                    id: 'homepageCommodityDialog', //设定一个id，防止重复弹出
                    moveType: 1, //拖拽模式，0或者1
                    content: $('#homepageCommodity'),
                    btn: ['取消', '确定'],
                    btn2: function(index, layero) {
                        //按钮【确定】的回调
                    }
                });
            },
            btn2: function(index, layero) {
                //按钮【确定】的回调
            }
        });
    });

    // 一键装修轮播
    var cur_page = 1; //当前页码
    var total_page = Math.ceil($('#template-list li').length / 3); //页码总数
    //初始化箭头可点击状态
    if (total_page == 1) {
        $('#arrow-next').removeClass('abled');
    }
    //右箭头
    $('body').on('click', '#arrow-next.abled', function() {
        $('#template-list ul').stop().animate({ left: -232 * 3 * cur_page }, 1000);
        cur_page++;
        if (cur_page == total_page) {
            $(this).removeClass('abled');
        }
        $('#arrow-prev').addClass('abled');
    });

    //左箭头
    $('body').on('click', '#arrow-prev.abled', function() {
        cur_page--;
        $('#template-list ul').stop().animate({ left: -232 * 3 * (cur_page - 1) }, 1000);
        if (cur_page == 1) {
            $(this).removeClass('abled');
        }
        $('#arrow-next').addClass('abled');
    });

    // 选择装修风格
    $("#templateSelect li img").click(function() {
        $(this).parents("li").addClass("selected").siblings().removeClass("selected");
    });

    // 素材中心--上传图片
    upload.render({
        elem: '#images-btn',
        url: '',
        multiple: true,
        size: 3072 //限制文件大小，单位 KB
            ,
        before: function(obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result) {
                $('#images-list').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
            });
        },
        done: function(res) {
            //上传完毕
        }
    });

    // 新建页面弹出框
    $('#new-page-btn').on('click', function() {
        layer.open({
            type: 1,
            title: '新建页面',
            skin: 'pocDialog hasTitle',
            closeBtn: true,
            area: '500px',
            shade: [0.6, '#323232'],
            shadeClose: true, //点击遮罩层关闭
            id: 'newPageDialog', //设定一个id，防止重复弹出
            moveType: 1, //拖拽模式，0或者1
            content: $('#new-page'),
            btn: ['取消', '确定'],
            btn2: function(index, layero) {
                var name = $('#new-page-name').val();
                if (!name) {
                    layer.msg('页面名称不能为空!', {
                        time: 5000, //20s后自动关闭
                        btn: ['确定']
                    });
                    return false;
                }
            }
        });
    });

    exports('storeDecoration', {});
});
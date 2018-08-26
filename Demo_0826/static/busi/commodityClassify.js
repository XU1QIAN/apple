layui.define(['element', 'layer', 'table', 'upload', 'form'], function(exports){
    var $ = layui.jquery,
    element = layui.element,
    layer = layui.layer,
    table = layui.table,
    upload = layui.upload,
    form = layui.form;

    //店铺页面、商品分类、店铺风格
    $('.decoration-left-tab').on('click', function() {
        $('.decoration-left-tab').removeClass('active');
        $(this).addClass('active');
    });

    // 页面列表
    table.render({
        elem: '#table-classify',
        url: '../../static/mockData/commodityClassify.json',
        cellMinWidth: 70, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        cols: [
            [{field:'name', title: '分类名称', style: 'text-decoration: underline'}
           ,{field:'number', title: '商品数量'}
           ,{field:'createDatetime', title: '创建时间'}
           ,{title: '操作', toolbar: '#barDemo'}]
        ],
        done: function() {
            $('.layui-table tr:last .delete-btn').remove();
        }
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

    // 新建分类弹出框
    $('#new-classify-btn').on('click', function() {
        layer.open({
            type: 1,
            title: '新建分类',
            skin: 'pocDialog hasTitle',
            closeBtn: true,
            area: '500px',
            shade: [0.6, '#323232'],
            shadeClose: true,//点击遮罩层关闭
            id: 'newClassifyDialog', //设定一个id，防止重复弹出
            moveType: 1,//拖拽模式，0或者1
            content: $('#new-classify'),
            btn: ['取消', '确定'],
            btn2: function(index, layero){
                var name = $('#new-page-name').val();
                if(!name) {
                    layer.msg('分类名称不能为空!', {
                        time: 5000, //20s后自动关闭
                        btn: ['确定']
                    });
                    return false;
                }
            }
        });
    });

    exports('commodityClassify', {});    
});


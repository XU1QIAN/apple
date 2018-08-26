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

    // 初始化模块高度
    heightCalculate();

    // 计算模块高度
    function heightCalculate() {
        var leftHeight = $('#store-style').height();
        $('.decoration-left-tabs').height(leftHeight);
    }

    // 选择配色方案 
    $('.color-scheme').on('click', function() {
        $('.color-scheme').removeClass('active');
        $(this).addClass('active');
    });

    exports('storeDecoration', {});    
});


layui.define(['jquery', 'element', 'layer', 'form', 'table', 'laypage'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        laypage = layui.laypage,
        element = layui.element,
        $ = layui.jquery;

    $(function () {
        var options;
        var key;
        var stockType;
        var channel;
        for (var i = 1; i <= 10; i++) {
            key = "test" + i;
            stockType = "Kindle 电子书阅读器 促销商品" + i;
            channel = "所属渠道：渠道" + i;
            options = "<div class='layui-colla-item'>" +
                "<h2 class='layui-colla-title'>" +
                "<p class='tt'>" + stockType + "</p>" +
                "<p class='qd'>" + channel + "</p>" +
                "<em class='flag-em'>展开</em></h2>" +
                "<div class='layui-colla-content'>" +
                "<div class='table-simple'>" +
                "<table class='layui-hide'" + "id='" + key + "'></table></div></div></div>";

            $('#stockList').append(options);
            element.init();
            fnTable("#" + key);
        }
    })

    function fnTable(obj, ds) {
        table.render({
            elem: obj,
            url: '../../static/mockData/stockQueryDate.json',
            cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            cols: [
                [{
                    field: 'proName',
                    title: '名称'
                }, {
                    field: 'brand',
                    width: 120,
                    title: '品牌'
                }, {
                    field: 'category',
                    width: 60,
                    title: '品类'
                }, {
                    field: '',
                    title: '商品编码',
                    templet: '#proCode',
                }, {
                    field: 'costPrice',
                    title: '成本价',
                    sort: true,
                    align: 'right'
                }, {
                    field: 'stock',
                    title: '库存',
                    sort: true
                }, {
                    field: 'total',
                    title: '总货值',
                    width: 120,
                    align: 'right',
                    sort: true
                }]
            ]
        });
    }

    laypage.render({
        elem: 'page'
        , layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
        , count: 50
        //,curr: 5 //设定初始在第 5 页
        //, groups:3 //只显示 1 个连续页码
        , prev: '<em><i class="layui-icon">&#xe603;</i>上一页</em>'
        , next: '<em>下一页<i class="layui-icon">&#xe602;</i></em>'
        , first: false //不显示首页
        , last: false //不显示尾页
        , theme: 'pdiy'
    });

    //监听折叠
    element.on('collapse(stockList)', function (data) {
        if (data.show) {
            $(this).css('background', '#FEF4EB').find('em').text('收起')
        } else (
            $(this).css('background', '#fff').find('em').text('展开')
        )
    });


    exports('stockQuery', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
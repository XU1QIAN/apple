layui.define(['jquery', 'element', 'layer', 'form', 'laydate', 'table'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        element = layui.element,
        laydate = layui.laydate,
        $ = layui.jquery;
    // laydate.render({
    //     elem: '#datetime',
    //     type: 'date'
    // });

    laydate.render({
        elem: '#start'
        , trigger: 'click'
    });
    laydate.render({
        elem: '#end'
        , trigger: 'click'
    });
    table.render({
        elem: '#test',
        url: '../../static/mockData/orderQueryTable.json',
        // cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
            //,curr: 5 //设定初始在第 5 页
            , groups: 4 //只显示 1 个连续页码
            , prev: '<em><i class="layui-icon">&#xe603;</i>上一页</em>'
            , next: '<em>下一页<i class="layui-icon">&#xe602;</i></em>'
            , first: false //不显示首页
            , last: false //不显示尾页
            , theme: 'pdiy'
        },
        cols: [
            [{
                field: 'id',
                width: 140,
                title: '子订单编号'
            }, {
                field: '',
                title: '商品信息',
                minWidth: 400,
                templet: '#goodsInfo'
            }, {
                field: 'money',
                title: '实收金额（元）',
                width: 150,
                templet: '#moneyNum',
                align: 'right'
            }, {
                field: 'from',
                width: 150,
                title: '订单来源'
            }, {
                field: 'tel',
                width: 120,
                title: '客户手机',
            }, {
                field: 'developer',
                width: 150,
                title: '发展人',
            }, {
                field: '',
                width: 150,
                title: '订单状态',
                templet: '#detail'
            }
            ]
        ]
    });
    exports('orderQuery', {})
})
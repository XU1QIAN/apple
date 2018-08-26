layui.define(['jquery', 'element', 'layer', 'form', 'table', 'laydate'], function(exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        element = layui.element,
        laydate = layui.laydate,
        $ = layui.jquery;


    //table
    table.render({
        elem: '#table',
        url: '../../static/mockData/commissionsubsidiary.json',
        cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                ,
            groups: 4 //只显示 1 个连续页码
                ,
            prev: '<em><i class="layui-icon">&#xe603;</i>上一页</em>',
            next: '<em>下一页<i class="layui-icon">&#xe602;</i></em>',
            first: false //不显示首页
                ,
            last: false //不显示尾页
                ,
            theme: 'pdiy'
        },

        cols: [
            [{
                field: 'commisonorder',
                title: '订单',
                templet: '#commisionOrder'
            }, {
                field: 'commisonproname',
                title: '商品名称',
                templet: '#commisionProname'
            }, {
                field: 'orderprice',
                title: '订单金额'
            }, {
                field: 'commission',
                title: '佣金'
            }, {
                field: 'settlementcycle',
                title: '结算周期',
            }, {
                field: 'Settlementstatus',
                title: '结算状态'
            }, {
                field: '',
                title: '操作',
                width: 120,
                templet: '#set'
            }]
        ]

    });


    laydate.render({
        elem: '#start2',
        trigger: 'click'
    });
    laydate.render({
        elem: '#end2',
        trigger: 'click'
    });
    laydate.render({
        elem: '#datetime',
        type: 'month',
        trigger: 'click'
    });

    exports('commissionSubsidiary', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
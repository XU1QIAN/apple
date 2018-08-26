layui.define(['jquery', 'element', 'layer', 'form', 'table','laydate'], function (exports) {
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
        url: '../../static/mockData/activeData.json',
        cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
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
            [
                {
                    field: '',
                    title: '活动编码',
                    templet: '#activeCode'
                }, {
                    field: 'activeName',
                    title: '活动名称'
                }, {
                    field: 'activeType',
                    title: '活动类型'
                }, {
                    field: 'channel',
                    title: '适用渠道'
                }, {
                    field: 'store',
                    title: '适用门店',
                }, {
                    field: 'status',
                    title: '活动状态'
                }, {
                    field: '',
                    title: '有效期',
                    templet: '#timeRange',
                }, {
                    field: '',
                    title: '操作',
                    width: 120,
                    templet: '#set'
                }
            ]
        ]
    });
    laydate.render({
        elem: '#start1',
        trigger: 'click'
    });
    laydate.render({
        elem: '#end1',
        trigger: 'click'
    });
    laydate.render({
        elem: '#start2',
        trigger: 'click'
    });
    laydate.render({
        elem: '#end2',
        trigger: 'click'
    });
    exports('activeManage', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
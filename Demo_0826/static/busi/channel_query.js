layui.define(['jquery', 'element', 'layer', 'form', 'table'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        element = layui.element,
        $ = layui.jquery;
    //table
    table.render({
        elem: '#test',
        url: '../../static/mockData/table.json',
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
            [{
                field: 'id',
                width: 110,
                title: '渠道编码',
                templet: '#channelId',
                sort: true
            }, {
                field: 'username',
                width: 220,
                title: '渠道名称'
            }, {
                field: 'sex',
                width: 220,
                title: '地址',
            }, {
                field: 'city',
                title: '渠道联系人'
            }, {
                field: 'sign',
                title: '联系电话',
            } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                , {
                field: '',
                title: '操作',
                width: 120,
                templet: '#set'
            }
            ]
        ]
    });

    exports('channel_query', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
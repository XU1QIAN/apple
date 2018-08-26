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
        elem: '#test',
        url: '../../../static/mockData/capableManReturn.json',
        cellMinWidth: 70, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
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
                field: '',
                minWidth: 100,
                title: '退单编码',
                templet: '#orderNumber'

            }, {
                field: 'saleType',
                width: 120,
                title: '售后方式'
            }, {
                field: 'ordercode',
                width: 120,
                title: '订单编号',
            }, {
                field: 'goods',
                title: '商品'
            }, {
                field: 'orderPrice',
                title: '订单金额'
            }, {
                field: 'returnPrice',
                title: '退款金额',
                width: 120

            }, {
                field: 'usertel',
                title: '客户手机',
                width: 120
            }, {
                field: 'applyTime',
                title: '申请时间',
                width: 120
            }, {
                field: '',
                title: '处理状态',
                width: 120,
                templet: '#state'

            }]
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


    //生成物流详情页面 

    var active = {
        state: function() {
            layer.open({
                type: 1,
                title: '处理状态',
                skin: 'pocDialog hasTitle',
                closeBtn: true,
                area: '280px',
                shade: [0.6, '#323232'],
                shadeClose: true, //点击遮罩层关闭
                id: '', //设定一个id，防止重复弹出
                moveType: 1, //拖拽模式，0或者1
                content: $('#progress')
            });
        }
    }
    table.on('tool(capableManReturn)', function(obj) {
        var data = obj.data,
            type = obj.event;
        active[type].call(obj)
    });

    $('.layui-link').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });




    exports('capableManReturn', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
layui.define(['jquery', 'element', 'layer', 'form', 'table','laydate'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        laydate = layui.laydate,
        element = layui.element,
        $ = layui.jquery;

    //日期范围选择
    laydate.render({
        elem: '#dateRange',
        range: true
    });

    $('body').on('click', '.sort-li', function () {
        var down = '<i class="layui-icon up-icon">&#xe61a;</i>',
            up = '<i class="layui-icon down-icon">&#xe619;</i>';
        if ($(this).hasClass('active')) {
            if ($(this).hasClass('down')) {
                $(this).find('i').remove();
                $(this).removeClass('down').addClass('up').find('a').append(up);
            } else {
                $(this).find('i').remove();
                $(this).removeClass('up').addClass('down').find('a').append(down);
            }
        } else {
            $(this).addClass('active').siblings().removeClass('active');
        }


    });
    //table
    table.render({
        elem: '#test',
        url: '../../../static/mockData/commission.json',
        cellMinWidth: 70, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
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
                field: 'storeName',
                width: 150,
                title: '能人编码',
                templet: '#storeName'

            }, {
                field: 'dianzhang',
                width: 100,
                title: '能人姓名'
            }, {
                field: 'storeType',
                width: 120,
                title: '所属店铺'
            }, {
                field: 'channel',
                width: 120,
                title: '所属渠道',
            }, {
                field: 'xse',
                title: '销售额',
                align:'right',
                sort: true
            }
            , {
                field: 'nryj',
                title: '能人佣金',
                width: 120,
                align:'right',
                sort: true
            }
            , {
                field: 'jszq',
                title: '结算周期',
                width: 120
            }
                , {
                field: '',
                title: '操作',
                width: 120,
                templet: '#set'
            }
            ]
        ]
    });

    exports('commissionQuery', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
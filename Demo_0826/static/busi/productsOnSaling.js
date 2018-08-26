/*
*@author hexin
* 2018/5/7
*
* */


function getExamineDiastep(option) {
    option.linkCall = option.linkCall || 'layer.closeAll()';
    return function () {
        layer.open({
            type: 1,
            title: false, //不显示标题栏,
            skin: 'pocDialog',//
            closeBtn: false,//不显示关闭按钮
            area: ['420px', '300px'],
            shade: [0.6, '#323232'],
            shadeClose: true,//点击遮罩层关闭
            id: option.id, //设定一个id，防止重复弹出
            moveType: 1,//拖拽模式，0或者1
            content: '<div><span class="examineIcon icon iconfont icon-' + option.iconClass + '"></span><p class="tipBig bold">' + option.title + '</p><p class="tipSmall">' + option.tip + '</p></div>',
            btn: [option.link1,option.link],
            btnAlign: 'c',
            yes: function (index, data) {
                console.log(index, data);
            }
        });
    }
}

layui.define(['jquery', 'element', 'layer', 'form', 'table','laydate'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        laydate = layui.laydate,
        element = layui.element,
        $ = layui.jquery;

    //table
    var active = {
        undercarriage: getExamineDiastep({
            id: 'undercarriage',
            title: '下架成功',
            tip: '本次从微店下架4款商品！',
            link: '进入店铺',
            link1:'继续下架商品',
            iconClass: 'pass',
            linkCall: 'window.location=\'http://baidu.com\''
        }),
        undercarriageorder:function () {
            layer.open({
                type: 1,
                title: '预约设置',
                skin: 'pocDialog hasTitle',//
                closeBtn: true,
                offset:"100px",
               // area: '500px',
                shade: [0.6, '#323232'],
                shadeClose: true,//点击遮罩层关闭
                id: 'logistics', //设定一个id，防止重复弹出
                moveType: 1,//拖拽模式，0或者1
                /*content: '<input type="text" class="layui-input layui-input-icon" id="datetime" placeholder="请选择上架时间">'*/
                content:'<div class="layui-inline" id="test-n1"></div>',
                btn: ['取消', '确定']
            });
           /* laydate.render({
                elem: '#test',
                type: 'datetime'
            });*/
            laydate.render({
                elem: '#test-n1'
                ,position: 'static'
            });


        }
    }


   /* laydate.render({
        elem: '#datetime',
        type: 'month',
        trigger: 'click'
    });*/

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
        url: '../../static/mockData/productsOnSaling.json',
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
            [{type:'checkbox'
                },
                {
                field: 'productInfo',
                width: 150,
                title: '商品信息',
                templet: '#storeName'

            }, {
                field: 'specification',
                width: 120,
                title: '商品规格'
            }, {
                field: 'brand',
                width: 80,
                title: '品牌',
            }, {
                field: 'quantity',
                width: 100,
                title: '库存数量',
                sort: true
            }, {
                field: 'price',
                title: '销售价格',
                align:'right',
                sort: true
            }
                , {
                field: 'date',
                title: '上架时效',
                width: 80,
                align:'right'
            }
                , {
                field: 'store',
                title: '销售店铺',
                width: 100,
                align:'right'
            }
                , {
                field: '',
                title: '操作',
                width: 200,
                templet: '#set'
            }
            ]
        ]
    });
    table.on('tool(grid)', function(obj){
        //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值

        if(layEvent === 'now'){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';

        } else if(layEvent === 'order'){

            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';

        }
    });


    exports('productsOnSaling', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
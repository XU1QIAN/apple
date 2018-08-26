layui.define(['jquery', 'element', 'layer', 'form', 'laydate', 'table'], function(exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        element = layui.element,
        laydate = layui.laydate,
        $ = layui.jquery;
    table.render({
        elem: '#test',
        url: '../../static/mockData/orderQueryTable.json',
        // cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
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
                title: '商品信息',
                minWidth: 400,
                templet: '#goodsInfo'
            }, {
                field: 'money',
                title: '单价(元)',
                width: 150,
                templet: '#moneyNum1',
                align: 'right'
            }, {
                field: 'num',
                width: 100,
                title: '数量'
            }, {
                field: 'totalMoney',
                width: 120,
                title: '总价(元)',
                templet: '#moneyNum2',
                align: 'right'
            }, {
                field: 'logistics',
                width: 150,
                title: '物流信息',
                templet: '#logistics'
            }, {
                field: '',
                width: 150,
                title: '操作',
                toolbar: '#opera'
            }]
        ]
    });
    // 物流信息数据
    var logisticsData = [
        { "date": "2018-03-24 15:32", "text": "已签收，签收人是同事" },
        { "date": "2018-03-24 12:32", "text": "【北京市】北京朝阳公司派件员：幸福路 17633165787正在为您派件请注意接听电话" },
        { "date": "2018-03-24 10:32", "text": "快件已到达【北京公司】" },
        { "date": "2018-03-21 15:32", "text": "由【江苏江阴航空部】发往【北京中转部】" },
        { "date": "2018-03-21 13:32", "text": "【江苏江阴航空部】正在进行【装车】扫描" },
        { "date": "2018-03-21 12:32", "text": "快件已到达【江苏江阴航空部】 扫描员是【江阴航空部到件称重16】" },
        { "date": "2018-03-20 15:32", "text": "由【江苏江阴航空部】发往【北京中转部】" },
        { "date": "2018-03-20 13:32", "text": "【江苏江阴航空部】正在进行【装车】扫描" },
        { "date": "2018-03-20 12:32", "text": "快件已到达【江苏江阴航空部】 扫描员是【江阴航空部到件称重16】" }
    ];
    //生成物流详情页面 
    function listInfo(datalist) {
        var html = [];
        for (var i = 0; i < datalist.length; i++) {
            var dates = [i > 0 && datalist[i - 1].date.substring(0, 10), datalist[i].date.substring(0, 10)], //截取时间，当前和当前的下一个
                time = datalist[i].date.slice(11),
                marginTop = dates[0] == dates[1] ? '' : 'mt20';
            classDateShow = dates[0] == dates[1] ? "logistics-date hidden" : "logistics-date";
            html.push('<li class="' + (i == datalist.length - 1 ? "latest " : "") + (i == 0 ? "logistics-current " : "") + marginTop + '">' +
                '<span class="' + classDateShow + '">' + dates[1] + '</span>' +
                '<span class="logistics-time">' + time + '</span>' +
                '<span class="logistics-process">' + datalist[i].text + '</span>' +
                '</li>');
        }
        return html.join('')
    }
    var active = {
        cancelOrder: function() {
            layer.open({
                type: 1,
                title: false, //不显示标题栏,
                skin: 'pocDialog', //
                closeBtn: true,
                area: ['420px', '300px'],
                shade: [0.6, '#323232'],
                shadeClose: true, //点击遮罩层关闭
                id: 'roleSelect_notCEO', //设定一个id，防止重复弹出
                btn: ['取消', '确定'],
                btnAlign: 'c',
                moveType: 1, //拖拽模式，0或者1
                content: '<div><span class="examineIcon icon iconfont icon-warning"></span><p class="tipBig red bold">您确定取消吗？取消后订单不可恢复！</p></div>'
            });
        },
        print: function() {
            alert('打印订单');
        },
        invoice: function(obj) {
            var flag = $(obj[0]).data('flag') || 0; //是否有发票的标志
            if (flag == 0) {
                layer.open({
                    type: 1,
                    title: false, //不显示标题栏,
                    skin: 'pocDialog', //
                    closeBtn: true,
                    area: ['420px', '300px'],
                    shade: [0.6, '#323232'],
                    shadeClose: true, //点击遮罩层关闭
                    id: 'roleSelect_notCEO', //设定一个id，防止重复弹出
                    btn: ['取消', '确定'],
                    btnAlign: 'c',
                    moveType: 1, //拖拽模式，0或者1
                    content: '<div><span class="examineIcon icon iconfont icon-warning"></span><p class="tipBig red bold">您的订单还未开出发票</p></div>'
                });
            } else {
                location.href = "./invoiceDetail.html"
            }
        },
        logisticsDetail: function() {
            layer.open({
                type: 1,
                title: '物流详情',
                skin: 'pocDialog hasTitle',
                closeBtn: true,
                area: '800px',
                shade: [0.6, '#323232'],
                shadeClose: true, //点击遮罩层关闭
                id: 'logisticsDialog', //设定一个id，防止重复弹出
                moveType: 1, //拖拽模式，0或者1
                content: '<div class="logistics-wrap">' + listInfo(logisticsData) + '</div>'
            });
        },
        back: function() {
            alert('退货')
        },
        change: function() {
            alert('换货')
        }
    }
    table.on('tool(orderDetail)', function(obj) {
        var data = obj.data,
            type = obj.event;
        active[type].call(obj)
    });

    $('.layui-link').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
    $('.cancelOrder').on('click', function() {
        var othis = $(this);
        active['cancelOrder'] ? active['cancelOrder'].call(this, othis) : ''
    })
    exports('orderDetail', {})
})
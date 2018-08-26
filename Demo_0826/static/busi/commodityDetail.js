layui.define(['jquery', 'element', 'laydate', 'table'], function (exports) {
    var element = layui.element,
    laydate = layui.laydate,
    table = layui.table,
    $ = layui.jquery;

    //规格参数--更多参数
    $('.moreParameter').on('click', function() {
        $('.more-specification').show();
        $(this).hide();
    });

    //日期范围选择
    laydate.render({
        elem: '#date',
        range: true,
        value: '2017-11-24 - 2017-11-30',
        change: function(value, date) {
            //重新渲染图标
        }
    });

    //统计
    var data = {};
    data.saleNum = [9, 15, 12, 19, 10, 15, 28];  //销量
    data.saleMoney = [15, 24, 21, 23, 13, 14.3, 23];  //销售额
    data.date =['11.24', '11.25', '11.26', '11.27', '11.28', '11.29', '11.30'];

    function initChart() {
        var chart = echarts.init(document.getElementById('statistics'));
        var option = {
            grid: {
                top: 60,
                left: 3,
                right: 15,
                bottom: 5,
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                backgroundColor:'rgba(57,52,52,.8)',
                textStyle:{
                    fontSize:12,
                    lineHeight:16
                },
                formatter:function(item){
                    var data=item[0];
                    return '<span class="tooltip-label">'+item[0].axisValue+'</span></br><span  class="tooltip-text">'+item[0].seriesName+ '：' +item[0].value+'</span></br><span  class="tooltip-text">'+item[1].seriesName+ '：' +item[1].value+'</span>'
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#C8CBD2'
                    }
                }
            },
            legend: {
                show: true,
                right: 0,
                top: 0,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#2E3448'
                },
                data: [{name: "销量"}, {name: '货值'}]
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.date,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#58627C'
                },
                axisLine: {
                    lineStyle: {
                        color: '#f1f1f1'
                    }
                },
                axisLabel: {
                    color: '#999999'
                }
            },
            yAxis: [{
                type: 'value',
                name: '单位：台',
                axisLabel: {
                    color: '#2E3448'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#f1f1f1'
                    }
                },
                axisLabel: {
                    color: '#999999'
                }
            }, {
                type: 'value',
                name: '单位：万元',
                axisLabel: {
                    color: '#2E3448'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#999999'
                }
            }],
            series: [{
                name: '销量',
                data: data.saleNum,
                type: 'line',
                yAxisIndex: 0,
                symbolSize: 10,
                areaStyle: {
                    color: '#fff',
                    opacity: '0'
                },
                lineStyle: {
                    color: '#C30621'
                },
                itemStyle: {
                    color: '#C30621'
                },
                emphasis:{
                    itemStyle:{
                        color:'#DF403D',
                        borderColor:'rgba(223,64,61,0.2)',
                        borderWidth:10
                    }
                }
            }, {
                name: '货值',
                data: data.saleMoney,
                type: 'line',
                yAxisIndex: 1,
                symbolSize: 10,
                areaStyle: {
                    color: '#fff',
                    opacity: '0'
                },
                lineStyle: {
                    color: '#FA7A07'
                },
                itemStyle: {
                    color: '#FA7A07'
                },
                emphasis:{
                    itemStyle:{
                        color:'#DF403D',
                        borderColor:'rgba(223,64,61,0.2)',
                        borderWidth:10
                    }
                }
            }]
        };
        chart.setOption(option);
    }
    initChart();

    //SKU表格
    table.render({
        elem: '#table',
        url: '../../static/mockData/sku.json',
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
        limit: 5,
        limits: [5, 10, 15, 20],
        cols: [
            [{field:'id', title: '序号'}
           ,{field:'commodityCode', title: '商品编码'}
           ,{field:'specification', title: '规格'}
           ,{field:'price', title: '售价（元）'}
           ,{field:'stock', title: '库存（台）'}
           ,{field:'state', title: '状态'}
           ,{field:'weekSale', title: '本周销售（台）'}
           ,{field:'totalSale', title: '累计销售（台）'}]
        ]
    });

    exports('commodityDetail', {});
});
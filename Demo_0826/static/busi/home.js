layui.define(['jquery', 'element', 'layer', 'form', 'laydate', 'table'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        element = layui.element,
        laydate = layui.laydate,
        $ = layui.jquery;

    function initChart() {
        var chart = echarts.init(document.getElementById('profit'));
        var option = {
            grid: {
                top: 40,
                left: 0,
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
                    return '<span class="tooltip-label">'+data.axisValue+'</span></br><span  class="tooltip-text">'+data.seriesName+data.value+'</span>'
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
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#2E3448'
                },
                data: ['销售额']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['11.24', '11.25', '11.26', '11.27', '11.28', '11.29', '11.30'],
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#58627C'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(216,216,216,0.3)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(216,216,216,0.3)'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#2E3448'
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                name: '销售额',
                data: [12000, 20000, 12000, 11000, 16000, 12000, 11000],
                type: 'line',
                symbol: 'circle',
                smooth: true,
                areaStyle: {
                    color: '#F3B8B6',
                    opacity: '0.2'
                },
                lineStyle: {
                    color: '#DF403D'
                },
                itemStyle: {
                    color: '#DF403D'
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
    // 销售排行表格
    table.render({
        elem: '#table1',
        even: true,
        url: '../../static/mockData/homeData.json',
        cols: [
            [{
                field: 'goodsName',
                width: 260,
                title: '产品',
            }, {
                field: '',
                title: '销量',
                minWidth: 340,
                templet: '#saleTemp'
            }, {
                field: '',
                title: '销售额（元）',
                width: 180,
                templet: '#totalMoney'
            }
            ]
        ]
    });
    //店铺销售排行
    table.render({
        elem: '#table2',
        even: true,
        url: '../../static/mockData/homeData.json',
        cols: [
            [{
                field: '',
                title: '店铺',
                templet: '#storeName'
            }, {
                field: 'shopowner',
                title: '店长'
            }, {
                field: '',
                title: '销售额（元）',
                templet: '#totalMoney'
            }
            ]
        ]
    });
    //店员销售排行
    table.render({
        elem: '#table3',
        even: true,
        url: '../../static/mockData/homeData.json',
        cols: [
            [{
                field: '',
                title: '店员',
                templet: '#clerkTemp'
            }, {
                field: '',
                title: '销售额（元）',
                templet: '#totalMoney'
            }
            ]
        ]
    });

    //区域的状态切换
    $('.bw-title-right .layui-link').click(function () {
        $(this).parent().find('.layui-link').removeClass('layui-link-active');;
        $(this).addClass('layui-link-active');
        //todo 切换后重新加载
        //重新加载图表、表格等
    })

    exports('home', {});
})
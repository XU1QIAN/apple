layui.define(['jquery', 'element', 'layer', 'form', 'table','laypage'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        laypage = layui.laypage,
        element = layui.element,
        $ = layui.jquery;
    //table
    fnTable('#test');
    fnTable('#test1');
    function fnTable(obj){
        table.render({
            elem: obj,
            url: '../../static/mockData/table.json',
            cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            cols: [
                [{
                    type:'checkbox'
                },{
                    field: 'id',
                    width: 110,
                    title: '商品属性',
                    sort: true
                }, {
                    field: 'username',
                    width: 220,
                    title: '商品编码'
                }, {
                    field: 'sex',
                    width: 220,
                    title: '售价',
                    align:'right'
                }, {
                    field: 'city',
                    title: '空闲数量',
                }
                ]
            ]
        });
    }
    $('body').on('click','.sort-li',function(){
         var down   = '<i class="layui-icon up-icon">&#xe61a;</i>',
               up   = '<i class="layui-icon down-icon">&#xe619;</i>';
         if($(this).hasClass('active')){
             if($(this).hasClass('down')){
                 $(this).find('i').remove();
                 $(this).removeClass('down').addClass('up').find('a').append(up);
             }else{
                 $(this).find('i').remove();
                 $(this).removeClass('up').addClass('down').find('a').append(down);
             }
         }else{
             $(this).addClass('active').siblings().removeClass('active');
         }
    });
    laypage.render({
        elem: 'page'
        , layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
        ,count: 50
        //,curr: 5 //设定初始在第 5 页
        //, groups:3 //只显示 1 个连续页码
        , prev: '<em><i class="layui-icon">&#xe603;</i>上一页</em>'
        , next: '<em>下一页<i class="layui-icon">&#xe602;</i></em>'
        , first: false //不显示首页
        , last: false //不显示尾页
        , theme: 'pdiy'
    });

    exports('channelCommodityQuery', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
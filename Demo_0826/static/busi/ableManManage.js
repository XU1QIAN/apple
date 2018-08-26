layui.define(['jquery', 'element', 'layer', 'form', 'table'], function (exports) {
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        element = layui.element,
        $ = layui.jquery;
    //table
    fnTable1('#test');
    fnTable2('#test1');
    function fnTable1(obj) {
        table.render({
            elem: obj,
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
                    title: '能人编码',
                    templet: '#channelId',
                    sort: true
                }, {
                    field: 'username',
                    width: 120,
                    title: '能人姓名'
                }, {
                    field: 'sex',
                    width: 60,
                    title: '性别',
                }, {
                    field: 'experience',
                    title: '年龄'
                }, {
                    field: 'sign',
                    title: '所属店铺',
                }, {
                    field: 'ip',
                    title: '联系电话'
                }, {
                    field: 'email',
                    title: '邮箱'
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
    }
    function fnTable2(obj) {
        table.render({
            elem: obj,
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
                    title: '能人编码',
                    templet: '#channelId',
                    sort: true
                }, {
                    field: 'username',
                    width: 120,
                    title: '能人姓名'
                }, {
                    field: 'sex',
                    width: 60,
                    title: '性别',
                }, {
                    field: 'experience',
                    title: '年龄'
                }, {
                    field: 'sign',
                    title: '所属店铺',
                }, {
                    field: 'ip',
                    title: '联系电话'
                }, {
                    field: 'email',
                    title: '邮箱'
                }
                    , {
                    field: '',
                    title: '操作',
                    width: 120,
                    templet: '#canel'
                }
                ]
            ]
        });
    }

    exports('ableManManage', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
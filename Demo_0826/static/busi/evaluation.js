layui.define(['jquery', 'element','laypage'], function (exports) {
    var jquery = layui.jquery,
        element = layui.element,
        laypage = layui.laypage,
        $ = layui.jquery;

    //好评、中评、差评、追评切换
    $('.evaluation-type').on('click', function() {
        $('.evaluation-type').removeClass("active");
        $(this).addClass("active");
    });

    //分页
    laypage.render({
        elem: 'page'
        ,layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局,
        ,limit: 5
        ,limits: [5, 10, 15, 20]
        ,count: 50
        //,curr: 5 //设定初始在第 5 页
        //, groups:3 //只显示 1 个连续页码
        , prev: '<em><i class="layui-icon">&#xe603;</i>上一页</em>'
        , next: '<em>下一页<i class="layui-icon">&#xe602;</i></em>'
        , first: false //不显示首页
        , last: false //不显示尾页
        , theme: 'pdiy'
        ,jump: function(obj, first){ //当分页被切换时触发
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
            
            //首次不执行
            if(!first){
                //do something
            }
        }
    });

    exports(['evaluation'], {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})
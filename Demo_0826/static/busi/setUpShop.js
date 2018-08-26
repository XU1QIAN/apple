
layui.define(['jquery', 'element', 'layer', 'form', 'laydate', 'table'], function (exports) {
    var type = 0;//判断进入创建店铺页面展示什么内容
    var form = layui.form,
        jquery = layui.jquery,
        layer = layui.layer,
        element = layui.element,
        table = layui.table,
        $ = layui.jquery;
    //步骤跳转函数
    function stepTo(index) {
        $('.setUpShopWrap-doWrap').hide();
        $('.setUpShopWrap-doWrap:eq(' + index + ')').show();
        $('.step-li').removeClass('step-active').removeClass('step-finish');
        $('.step-li:eq(' + index + ')').addClass('step-active');
        $('.step-li:lt(' + index + ')').addClass('step-active').addClass('step-finish');
    }
    $(document).on('click', '.stepTo', function (ev) {
        var othis = $(this), toIndex = othis.data('to');
        stepTo(toIndex);
    })
    //开店审核弹框
    function getExamineDiastep(option) {
        option.linkCall = option.linkCall || 'layer.closeAll()';
        // return function () {
        layer.open({
            type: 1,
            title: false, //不显示标题栏,
            skin: 'pocDialog',//
            closeBtn: false,//不显示关闭按钮 
            area: ['420px', '300px'],
            shade: [0.6, '#323232'],
            // shadeClose: true,//点击遮罩层关闭
            id: option.id, //设定一个id，防止重复弹出
            moveType: 1,//拖拽模式，0或者1
            content: '<div><span class="examineIcon icon iconfont icon-' + option.iconClass + '"></span><p class="tipBig bold">' + option.title + '</p><p class="tipSmall">'+ option.tip+'</p></div>',
            btn:[option.link],
            btnAlign: 'c',
            yes:function(index,data){
                console.log(index,data);
            }
        });
        // }
    }
    //步骤一‘创建店铺’按钮
    form.on('submit(chooseShop)', function (data) {
        alert('数据：' + JSON.stringify(data.field));
        //todo 对步骤一的数据进行处理
        stepTo(1);
        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //步骤三‘个人信息’
    form.on('submit(userInfo)', function (data) {
        alert('数据：' + JSON.stringify(data.field));
        //todo 对步骤三的数据进行处理
        stepTo(3);
        return false;
    });
    //根据不同场景显示不同页面
    switch (type) {
        case 0: $('.setUpShopWrap').show(); break;
        case 1: var option = {
            id: 'examinePass',
            title: '审核通过',
            tip: '恭喜您！您的审核结果显示为：通过！',
            link: '进入店铺',
            iconClass: 'pass',
            linkCall: 'window.location=\'http://baidu.com\''
        }; getExamineDiastep(option); break;
        case 2: var option = {
            id: 'examineFail',
            title: '审核不通过',
            tip: '您的身份证已到期，请补办身份证后重新上传照片！',
            link: '继续提交申请',
            iconClass: 'fail',
            linkCall: 'window.location=\'http://baidu.com\''
        }; getExamineDiastep(option); break;
        case 3: var option = {
            id: 'examining',
            title: '正在审核',
            tip: '您好！您的申请正在审核中，请耐心等待！',
            link: '确定',
            iconClass: 'warning',
            linkCall: 'window.location=\'http://baidu.com\''
        }; getExamineDiastep(option); break;
        default: $('.setUpShopWrap').show(); break;
    }
    $('#queryChannel').click(function(){
        layer.open({
            type: 1,
            title: '渠道查询',
            skin: 'pocDialog hasTitle',//
            closeBtn: true,
            area: '800px',
            shade: [0.6, '#323232'],
            shadeClose: true,//点击遮罩层关闭
            id: 'channelDialog', //设定一个id，防止重复弹出
            moveType: 1,//拖拽模式，0或者1
            btn:['取消','确定'],
            btnAlign:'c',
            content: $('#channelWrap').html()
          });
    })
    table.render({
        elem: '#channerTable',
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
            }, {
                field: '',
                title: '操作',
                width: 120,
                templet: '#set'
            }
            ]
        ]
    });
    exports('setUpShop', {});
})
layui.define(['element', 'layer'], function(exports){
    var $ = layui.jquery,
    element = layui.element,
    layer = layui.layer;

    // 选择角色
    $('.role').on('click', function() {
        $('.role').removeClass('active');
        $(this).addClass('active');
        // 选择小CEO
        var role = $(this).attr("id");
        if(role == "CEO") {
            var layer1 = layer.open({
                type: 1,
                title: false, //不显示标题栏,
                skin: 'pocDialog',//
                closeBtn: true,
                area: ['420px', '300px'],
                shade: [0.6, '#323232'],
                shadeClose: true,//点击遮罩层关闭
                id: 'notCEO', //设定一个id，防止重复弹出
                btn: ['取消', '确定'],
                btnAlign: 'c',
                moveType: 1,//拖拽模式，0或者1
                content: '<div><span class="examineIcon icon iconfont icon-fail"></span><p class="tipBig red bold">目前您不是小CEO角色，请联系管理员赋权</p></div>',
                btn2: function() {
                    //点击确定的操作
                }
            });
        } else {
            var layer2 = layer.open({
                type: 1,
                title: false, //不显示标题栏,
                skin: 'pocDialog',//
                closeBtn: true,
                area: ['420px', '300px'],
                shade: [0.6, '#323232'],
                shadeClose: true,//点击遮罩层关闭
                id: 'submit', //设定一个id，防止重复弹出
                btn: ['取消', '确定'],
                yes: function(){
                    // do something
                    layer.close(layer2);
                },
                btn2: function() {
                    //我想成为店长--是否首次开店
                    if(role == "manager") {
                        var layer3 = layer.open({
                            type: 1,
                            title: false, //不显示标题栏,
                            skin: 'pocDialog',//
                            closeBtn: true,
                            area: ['520px', '280px'],
                            shade: [0.6, '#323232'],
                            shadeClose: true,//点击遮罩层关闭
                            id: 'firstOpenStore', //设定一个id，防止重复弹出
                            btn: ['否，我熟悉流程', '是，进入开店准备'],
                            btn2: function() {
                                //进入开店准备
                            },
                            btnAlign: 'c',
                            moveType: 1,//拖拽模式，0或者1
                            content: '<div><span class="examineIcon icon iconfont icon-warning"></span><p class="tipBig orange bold">您是否首次开店</p></div>'
                        });
                    }
                },
                btnAlign: 'c',
                moveType: 1,//拖拽模式，0或者1
                content: '<div><span class="examineIcon icon iconfont icon-pass"></span><p class="tipBig bold">您的角色申请已提交，稍后请查看审核结果！</p></div>'
            });
        }
    });

    exports('roleSelect', {});    
});


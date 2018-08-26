$(function() {

    axios.post("../static/mockData/broadbandapp.json").then(function(resp) {
        var broad = resp.data;
        var app = new Vue({
            el: '#broad',
            data: {
                address: broad.address,
                hostname: broad.hostname,
                identifyNum: broad.identifyNum,
                telNum: broad.telNum,
            },
            methods: {
                edit: function() {
                    let data = {};
                    data.address = this.address;
                    data.hostname = this.hostname;
                    data.identifyNum = this.identifyNum;
                    data.telNum = this.telNum;
                    axios.post('', data, function(resp) {
                        if (resp.respCode == '200') {
                            // 返回成功后的操作
                            window.history.go(-1);
                        }
                    });
                }
            }
        });
    });
    // 地址选择器遮罩层打开与关闭
    $("#areaLabel").click(function(e) {
        $("#addressSelectWrapper").show();
        e.stopPropagation();
    });
    $(document).click(function() {
        $("#addressSelectWrapper").hide();
    });
    $("#cancel").click(function() {
        $("#addressSelectWrapper").hide();
    });
    $("#addressSelect").click(function(e) {
        e.stopPropagation();
    });

    initAddress();

    var iconOn = '<i class="icon iconfont icon-xuanzejiaobiao"></i>';
    $('.gUl li').eq(0).append(iconOn);
    $('.gUl li').on('click', function() {
        var number = $(this).index();

        $(this).append(iconOn).addClass('active').siblings().removeClass('active').find('.icon-xuanzejiaobiao').remove();
        $('.parabox').find('.weui-cells').eq(number).show();
        bus.$emit('tabChange', $(this).index());
        $('.parabox').find('.weui-cells').eq(number).siblings().hide();

        if ($(this).hasClass('active')) {
            $('.shopping p').addClass('active');
        }
    });
})

//初始化地址选择
function initAddress() {
    $("#Addr").cityLinkage({
        containerId: 'addressSelectWrapper',
        getSelectedCode: function() {
            return $("#Addr").data("code");
        },
        callback: function(data) {
            $("#Addr").val(data.addr).data("code", data.town.code);
        }
    });
}
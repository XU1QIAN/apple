$(function() {
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
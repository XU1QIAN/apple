

$(document).ready(function(){

    $.ajax({
        //请求方式为get
        type:"GET",
        async:false,
        //json文件位置
        url:"../static/mockData/addressManage.json",
        //返回数据格式为json
        dataType: "json",
        //请求成功完成后要执行的方法
        success: function(data){
            var list = data.data;
            console.log(list[0]);

            var app = new Vue({
                el: '#app',
                data: {
                    address: list[0]
                },
                methods:{
                }
            });
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


        }
    });
    initAddress();
    // 地址选择器遮罩层打开与关闭

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
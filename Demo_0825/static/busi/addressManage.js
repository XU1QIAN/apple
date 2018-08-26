$(function() {
    //设置默认地址
/*    $('.address-list-item .default-ads').click(function() {
        var $i = $(this).find('i');
        var $otherI = $(this).parents('.address-list-item').siblings().find('i');
        if ($i.hasClass('icon-weixuanzhongyuanquan')) {
            $i.removeClass('icon-weixuanzhongyuanquan').addClass('icon-wancheng');
            $otherI.removeClass('icon-wancheng').addClass('icon-weixuanzhongyuanquan');
        }
    })*/
    $('body').on('click', '.address-list-item .default-ads', function() {
        var $i = $(this).find('i');
        var $otherI = $(this).parents('.address-list-item').siblings().find('i');
        if ($i.hasClass('icon-weixuanzhongyuanquan')) {
            $i.removeClass('icon-weixuanzhongyuanquan').addClass('icon-wancheng');
            $otherI.removeClass('icon-wancheng').addClass('icon-weixuanzhongyuanquan');
        }
    });

    //删除地址
   /* $('.icon-shanchu').click(function() {
        var _this = $(this);
        $.confirm({
            title: '删除',
            text: '确定要删除这条地址吗？',
            onOK: function() {
                //点击确认
                _this.parents('.address-list-item').remove();
            },
            onCancel: function() {}
        });
    });*/

   axios.get("../static/mockData/addressManage.json").then(function(resp) {
       var list =resp.data.data;
       var app = new Vue({
           el: '#app',
           data: {
               addressList: list
           }
       });
   });
       $('.icon-shanchu').click(function() {
           var _this = $(this);
           $.confirm({
               title: '删除',
               text: '确定要删除这条地址吗？',
               onOK: function() {
                   //点击确认
                   _this.parents('.address-list-item').remove();
               },
               onCancel: function() {}
           });
       });

    /*$.ajax({
        //请求方式为get
        type:"GET",
        //json文件位置
        url:"../static/mockData/addressManage.json",
        //返回数据格式为json
        dataType: "json",
        //请求成功完成后要执行的方法
        success: function(data){
            var list = data.data;

            var app = new Vue({
                el: '#app',
                data: {
                    addressList: list
                },
                methods:{
               /!*     edit:function () {


                    },
                    set:function () {
                        alert("@@@@");
                    }*!/
                }
            });

            $('.icon-shanchu').click(function() {
                var _this = $(this);
                $.confirm({
                    title: '删除',
                    text: '确定要删除这条地址吗？',
                    onOK: function() {
                        //点击确认
                        _this.parents('.address-list-item').remove();
                    },
                    onCancel: function() {}
                });
            });
        }
    });*/



})
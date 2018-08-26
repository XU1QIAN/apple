$(function() {
    axios.post("../static/mockData/ticketManage.json").then(function(resp){
        var list = resp.data;
        var app = new Vue({
            el: '#ticketList',
            data: {
                ticketList: list
            }
        });
        //设置默认地址
        $('.address-list-item .default-ads').on('click', function() {
            var $i = $(this).find('i');
            var $otherI = $(this).parents('.address-list-item').siblings().find('i');
            if ($i.hasClass('icon-weixuanzhongyuanquan')) {
                $i.removeClass('icon-weixuanzhongyuanquan').addClass('icon-wancheng');
                $otherI.removeClass('icon-wancheng').addClass('icon-weixuanzhongyuanquan');
            }
        })

        //删除地址
        $('.icon-shanchu').on('click', function() {
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
    });
});

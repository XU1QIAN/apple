$(function() {
    FnTab();
    // 全部订单
    axios.get("../static/mockData/myOrder_all.json").then(function(resp){
        var orderList = resp.data;
        var app = new Vue({
            el: '#myOrder_all',
            data: {
                orderList: orderList
            }
        });
        var activeHight=$(".swiper-slide-active").height();
        $(".swiper-wrapper").height(activeHight);
    });
    // 待付款
    axios.get("../static/mockData/myOrder_notPay.json").then(function(resp){
        var orderList = resp.data;
        var app = new Vue({
            el: '#myOrder_notPay',
            data: {
                orderList: orderList
            }
        });
    });
    // 待发货
    axios.get("../static/mockData/myOrder_notSend.json").then(function(resp){
        var orderList = resp.data;
        var app = new Vue({
            el: '#myOrder_notSend',
            data: {
                orderList: orderList
            }
        });
    });
    // 待收货
    axios.get("../static/mockData/myOrder_notReceive.json").then(function(resp){
        var orderList = resp.data;
        var app = new Vue({
            el: '#myOrder_notReceive',
            data: {
                orderList: orderList
            }
        });
    });
    // 待评价
    axios.get("../static/mockData/myOrder_notEvaluate.json").then(function(resp){
        var orderList = resp.data;
        var app = new Vue({
            el: '#myOrder_notEvaluate',
            data: {
                orderList: orderList
            }
        });
    });
});

function FnTab() {
    var tabsSwiper = new Swiper('#tabs-container', {
        initialSlide: 0,
        speed: 500,
        autoHeight: true,
        spacebetween: 30,
        onSlideChangeStart: function(swiper) {
            $(".top-tab-ul li.active").removeClass('active')
            $(".top-tab-ul li").eq(swiper.activeIndex).addClass('active');
        },
        onSlideChangeEnd: function(swiper){
            var activeHight=$(".swiper-slide").eq(swiper.activeIndex).height()
            $(".swiper-wrapper").height(activeHight)
        }
    })
    $(".top-tab-ul li").on('touchstart mousedown', function(e) {
        e.preventDefault()
        $(".top-tab-ul li.active").removeClass('active')
        $(this).addClass('active')
        tabsSwiper.slideTo($(this).index())
    })
    $(".top-tab-ul li").click(function(e) {
        e.preventDefault()
    })
}
$(function() {
    FnTab();
    var bus = new Vue();

    function FnTab() {
        var tabsSwiper = new Swiper('#tabs-container', {
            initialSlide: 0,
            speed: 500,
            onSlideChangeStart: function(swiper) {
                $(".top-tab-ul li.active").removeClass('active')
                $(".top-tab-ul li").eq(swiper.activeIndex).addClass('active');
            }
        })
        $(".top-tab-ul li").on('touchstart mousedown', function(e) {
            e.preventDefault()
            $(".top-tab-ul li.active").removeClass('active')
            $(this).addClass('active')
            tabsSwiper.slideTo($(this).index());
            bus.$emit('tabChange', $(this).index());
        })
        $(".top-tab-ul li").click(function(e) {
            e.preventDefault()
        });
    }

    bus.$on("tabChange", function(index) {
        if (index == 0) {
            $.ajax({
                //请求方式为get
                type: "GET",
                //json文件位置
                url: "../static/mockData/keep.json",
                //返回数据格式为json
                dataType: "json",
                //请求成功完成后要执行的方法
                success: function(data) {

                    var list = data.data;
                    var app = new Vue({
                        el: '#keepList',
                        data: {
                            keeplist: list
                        }
                    });
                }
            });
        };
        if (index == 1) {
            $.ajax({
                //请求方式为get
                type: "GET",
                //json文件位置
                url: "../static/mockData/store.json",
                //返回数据格式为json
                dataType: "json",
                //请求成功完成后要执行的方法
                success: function(data) {
                    var list = data.data;
                    var app = new Vue({
                        el: '#store',
                        data: {
                            store: list
                        }
                    });
                }
            });
        }
    });
    bus.$emit('tabChange', 0);
});
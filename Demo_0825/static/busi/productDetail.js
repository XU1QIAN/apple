$(function() {

    var bus = new Vue();

    // 基本信息
    axios.get("../static/mockData/productDetail.json").then(function(resp) {
        var list = resp;
        var app = new Vue({
            el: '#productDetail',
            data: {
                productData: list
            }
        });
        var mySwiper = new Swiper('.swiper-container', {
            speed: 400,
            spaceBetween: 100,
            autoplay: 2000,
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
        });
    });
    // 参数规格
    axios.get("../static/mockData/productDetail.json").then(function(resp) {
        var list02 = resp.data[0].params;
        var app = new Vue({
            el: '#gUl',
            data: {
                gUl: list02
            }
        });
        var iconOn = '<i class="icon iconfont icon-xuanzejiaobiao "></i>';
        // $('.gUl li').eq(0).append(iconOn);
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

    });

    //    参数切换数据
    bus.$on("tabChange", function(index) {
            if (index == 0) {
                axios.get("../static/mockData/productDetail.json").then(function(resp) {
                    var list01 = resp.data[0].tab01;
                    var app = new Vue({
                        el: '#protab01',
                        data: {
                            protab01: list01
                        }
                    });
                });
            }
            if (index == 1) {

                axios.get("../static/mockData/productDetail.json").then(function(resp) {
                    var list02 = resp.data[0].tab02;

                    var app = new Vue({
                        el: '#protab02',
                        data: {
                            protab02: list02
                        }
                    });

                });
            }
        })
        // 评论数据
    axios.get("../static/mockData/productDetail.json").then(function(resp) {
        var list02 = resp.data[0].commend;
        var app = new Vue({
            el: '#comendList',
            data: {
                comendList: list02
            }
        });

    });

    $('.title-Row').on('click', function() {
        $(this).siblings().toggle();
        var titleI = $(this).find('.icon');
        titleI.toggleClass('icon-more');

    });
    $('body').on('click', '.keepbtn', function() {
        $(this).toggleClass('orange');
        $(this).find('.iconfont').toggleClass('icon-shoucang1');
        if ($(this).find('.iconfont').hasClass('icon-shoucang1')) {
            $(this).find('.iconfont').removeClass('icon-shoucang');
        } else {
            $(this).find('.iconfont').addClass('icon-shoucang');
        }
        // $(this).find('p').toggleClass('orange');
    });
    bus.$emit('tabChange', 0);


});
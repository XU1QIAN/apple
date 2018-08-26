$(function() {


    var index = new Vue({
        el: "#index",
        data: function() {
            return {
                "swips": "",
                "module1": "",
                "module2": "",
                "module3": ""
            }
        },
        mounted: function() {
            var _sel = this;
            axios.get("../static/mockData/index.json").then(function(res) {


                var mySwiper = new Swiper('.swiper-container', {
                    speed: 400,
                    spaceBetween: 100,
                    autoplay: 2000,
                    loop: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                });

                _sel.swips = res.data.data.swips;
                _sel.module1 = res.data.data.module1;
                _sel.module2 = res.data.data.module2;
                _sel.module3 = res.data.data.module3;

            });
        }
    });
    $(".footer .footer-col p").click(
        function() {
            $(".footer .footer-col").removeClass("orange");
            $(this).parent().addClass("orange");

        }
    );
    $('body').on('click', '.icon-gengduo2', function() {
        $('.headMenu').toggle();
    });
    $('body').on('click', '.headMenu ul li', function() {
        $(this).toggleClass('On');
    });

});
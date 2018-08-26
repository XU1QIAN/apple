$(function() {

    var loading = false; //状态标记 这个变量主要是用来控制触发次数，事件可能会触发多次
    var countPage = 1; //总页数
    var page = 1; //当前页
    var pageSize = 8; //每页显示几条
    var prolist = [];
    getbalancelist(page);

    var app1 = new Vue({
        el: '#aUl',
        data: {
            protab01: ''
        }
    });

    axios.get("../static/mockData/params.json").then(function(resp) {
        var paralist = resp.data.params;
        var app2 = new Vue({
            el: '#parabox',
            data: {
                paraList: paralist
            }
        });
    });
    $('div.news-main').infinite().on("infinite", function() {
        // alert('page:' + page + ',countPage:' + countPage);
        $("#loading").css("display", "block"); //显示 加载中图标
        if (loading) return;
        loading = true;
        if (page <= countPage) { //如果当前页小于总页面
            getbalancelist(page);
        } else {
            $('div.news-main').destroyInfinite(); //到最后一页时，销毁它
            $("#loading>i").css("display", "none");
            $("#loading>span").html("没有更多商品啦~").css("color", "#BDBDBD");
        }
    });

    function getbalancelist() {
        axios.get("../static/mockData/product.json", { params: { page: page, num: pageSize } }).then(function(resp) {
            var _prolist = resp.data.dataList;
            prolist = prolist.concat(_prolist);
            countPage = Math.ceil(resp.data.count / pageSize);
            app1.protab01 = prolist;
            loading = false; //会多次触发，所以 需要请求完成数据 才能继续触发
            $("#loading").css("display", "none"); //数据加载完隐藏加载提示
        });
        page++;
    }

    // 滑动部分tab切
    $('.netTab-content .netTabcn').eq(0).show();
    $('body').on('click tap', '.netTab-col', function() {
        var name = $(this).attr('name');
        var idcontent = $('#' + name);
        idcontent.show().siblings().hide();
        $(this).addClass('active').siblings().removeClass('active');

    });
    $('body').on('click tap', '.title-Row', function() {
        var titleI = $(this).find('.icon');
        $(this).siblings('.parabox').toggle();
        titleI.toggleClass('icon-more');

    });

    //  });
    //  $('.title-Row').click(function() {
    //      $(this).siblings('.parabox').show();
    //      var titleI = $(this).find('.icon');
    //      titleI.toggleClass('icon-more');
    //  })
    function close() {

    }
    $('body').on('touchmove', '.serchbox', function(e) {
        e.preventDefault();
        $('.productPopbox').css('display', 'none');

    });

    $('body').on('tap click', '#popDone', function() {
        $(this).parents('.productPopbox').animate({ width: "0" });
        $(this).parents('.productPopbox').find('.para-box02 div').animate({ width: "0" });
        $(this).parents('.productPopbox').find('.icon-moreunfold').animate({ width: "0" });
        $('.layer').hide();
        $(this).parents('.pop-btn').animate({ width: "0" });

    });
    $('body').on('tap click', '.layer', function() {
        $('.productPopbox').animate({ width: "0" }).css("display", "none");
        $('.productPopbox').find('.para-box02 div').animate({ width: "0" });
        $('.productPopbox').find('.icon-moreunfold').animate({ width: "0" });
        $('.productPopbox').find('.pop-btn').animate({ width: "0" });
        $(this).hide();
    });


    // 打开pop
    $('body').on('tap click', '#productPop', function() {
        $('.productPopbox').css('display', 'block');
        $('.productPopbox').animate({ width: "6.4rem" });
        $('.layer').show();
        $('.productPopbox').find('.pop-btn').animate({ width: "6.4rem" });
        $('.productPopbox').find('.para-box02 div').animate({ width: "2.5rem" });
        $('.productPopbox').find('.icon-moreunfold').animate({ width: "19px" });
    });

    $('body').on('click tap', '.flex-warp>div', function() {
        $(this).toggleClass('active');
    })
    $('body').on('click tap', '.iconview ', function() {
        $(this).toggleClass('icon-gengduo');
        if ($(this).hasClass('icon-gengduo')) {
            $(this).removeClass('icon-gengduo1');
            $('.netListbox').addClass('netlistrow');
        } else {
            $(this).addClass('icon-gengduo1');
            $('.netListbox').removeClass('netlistrow');
        }
    });

})
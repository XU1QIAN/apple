layui.define(['element'], function (exports) {
    var element = layui.element,
    $ = layui.jquery;

    //图片放大
    $(".jqzoom").imagezoom();
    
    $("#thumblist li a").click(function(){
        $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
        $(".jqzoom").attr('src',$(this).find("img").attr("src"));
    });

    //颜色选择
    $('.eachColor').on('click', function() {
        $('.eachColor').removeClass('active');
        $(this).addClass('active');
        $(".jqzoom").attr('src',$(this).find("img").attr("src"));
    });

    var cur_page = 1;   //当前页码
    var total_page = Math.ceil($('#thumblist li').length / 5);  //页码总数
    //初始化箭头可点击状态
    if(total_page == 1) {
        $('#spec-backward').removeClass('abled');
    }
    //小图片右箭头
    $('body').on('click', '#spec-backward.abled', function() {
        $('#thumblist').stop().animate({left: - 58 * 5 * cur_page}, 1000);
        cur_page ++;
        if(cur_page == total_page) {
            $(this).removeClass('abled');
        }
        $('#spec-forward').addClass('abled');
    });

    //小图片左箭头
    $('body').on('click', '#spec-forward.abled', function() {
        cur_page --;
        $('#thumblist').stop().animate({left: - 58 * 5 * (cur_page-1)}, 1000);
        if(cur_page == 1) {
            $(this).removeClass('abled');
        }
        $('#spec-backward').addClass('abled');
    });

    exports('commoditySelect', {});
});
$(function() {


    //切换注册类型选择弹出层
    FnBtmPopup($('#selectChooseBtn'), $('#registerType'), $('#selectChoose'));

    //选择切换方式的确定事件
    $('#selectChoose .weui-cell').click(function() {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        _text = _this.find('p').html();
        console.log(_text)
        $('#selectChooseBtn .os-list-r').html(_text);

    })


});


/**
 * 底部弹出框的调用方法
 * @param {*} clickBtn 点击触发事件的按钮
 * @param {*} popupId 需要弹出的弹出层id
 * @param {*} closeBtn 需要关闭的弹出层事件(arry)
 */
function FnBtmPopup(clickBtn, popupId, closeBtn) {
    var popubBody = popupId.find('.popup-bottom');
    if (null != clickBtn && null != popupId) {
        var popubMask = popupId.find('.span-mask');
        clickBtn.click(function() {
            popupId.show();
            popubBody.removeClass('slideOutDown').addClass('slideInUp');
            popubMask.click(function() {
                FnClose();
            });
        });
    }

    var list = [];
    if (typeof closeBtn != 'undefined') {
        if (closeBtn instanceof Array) {
            for (var i = 0; i < closeBtn.length; i++) {
                list.push(closeBtn[i]);
            }
        } else if (closeBtn instanceof Object) {
            list.push(closeBtn);
        }
    };
    if (null != list && list.length > 0) {
        list.forEach(element => {
            element.click(function() {
                FnClose();
            });
        });
    };

    function FnClose() {
        popubBody.removeClass('slideInUp').addClass('slideOutDown');
        setTimeout(function() {
            popupId.fadeOut()
        }, 100)
    }

}
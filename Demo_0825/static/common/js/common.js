function FnBtmPopup(clickBtn, popupId, closeBtn) {
    var popubBody = popupId.find('.popup-bottom');
    if (null != clickBtn &&
        null != popupId) {
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
            for (var i = 0; i <
                closeBtn.length; i++) {
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
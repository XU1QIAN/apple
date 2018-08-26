$(function () {


    var icecream = new Vue({

        el: "#icecream",
        data: {
            "numbers": [],
            "productInfo": "",
            "phoneNum": "",
            "filterNumbersList": [],
            "choosenNum": "",
            "choosenPackage": "",
            "belongTo": ""

        }

        /*   function () {
               return {
                   "numbers": [],
                   "productInfo": "",
                   "phoneNum": "",
                   "filterNumbersList": []
               }
           }*/
        ,
        mounted: function () {
            //冰淇淋套餐弹出
            FnBtmPopup($('.ice-btn'), $('#aa'), $('#aa .popup-footer-wrap a'));
            FnBtmPopup($('#chooseTel'), $('#choseTelMain'), $('#choseTelMain .popup-footer-wrap a'));
            var _sel = this;
            axios.get("../static/mockData/iceCreamPackage.json").then(function (res) {
                _sel.numbers = res.data.data.numbers;
                _sel.filterNumbersList = res.data.data.numbers;
                _sel.productInfo = res.data.data.productInfo;
            });
        },
        methods: {
            /*x选择套餐选项*/
            "changePackage": function (e) {
                var dom = e.target;
                if (e.target.nodeName.toLowerCase() === "a" || e.target.nodeName.toLowerCase() === "i") {
                    dom = e.target.parentNode;
                }
                $(dom).addClass('active').siblings().removeClass('active');
                this.choosenPackage = $(dom).find('a').text();
            },
            /*选择电话号码*/
            "chooseNum": function (e) {
                var dom = e.target;
                if (e.target.nodeName.toLowerCase() === "a" || e.target.nodeName.toLowerCase() === "i") {
                    dom = e.target.parentNode;
                }
                $(dom).addClass('active').siblings().removeClass('active');
                this.choosenNum = $(dom).find('a').text();
            },
            /*保存修改事件*/
            "submit":function () {
                alert("提交数据"+"选择套餐："+this.choosenPackage+"选择号码："+this.choosenNum);
                /*ajax提交数据*/
              /*  axios.post("url").then(function (res) {

                    //关闭模态框
                    this.FnClose($('#aa'));
                });*/

            },
            /*选择号码后函数*/
            "doChooseNum": function () {
                this.FnClose($('#choseTelMain'));
                /*ajax根据号码查询号码信息带出 归属地字段*/

            },

            /*取消事件*/
            "cancel": function () {
                this.FnClose($('#choseTelMain'));
            },
            /*关闭弹窗*/
            "FnClose": function (popupId) {
                var popubBody = popupId.find('.popup-bottom');
                popubBody.removeClass('slideInUp').addClass('slideOutDown');
                setTimeout(function () {
                    popupId.fadeOut()
                }, 100);
            }
        },
        /* computed: {
             filterNumbersList: function () {
                 // `this` points to the vm instance
                 var phoneNum = this.phoneNum;
                 var filterNumbersList = this.filterNumbersList;
                 /!*return _sel.filterNumbersList.filter(function (item) {
                     alert(_sel.phoneNum);
                     return item.num.indexOf(_sel.phoneNum) !== -1;
                 });*!/
             }

         },*/
        watch: {
            /*根据号码过滤*/
            // 如果 `phoneNum` 发生改变，这个函数就会运行
            phoneNum: function (newValue, oldValue) {
                this.numbers = this.filterNumbersList.filter(function (item) {
                    return item.num.indexOf(newValue) !== -1;
                });
            }
        },
    });


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
        clickBtn.click(function () {
            popupId.show();
            popubBody.removeClass('slideOutDown').addClass('slideInUp');
            popubMask.click(function () {
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
    }
    ;
    if (null != list && list.length > 0) {
        list.forEach(function (element) {
            element.click(function () {
                FnClose();
            });
        });
    }
    ;

    function FnClose() {
        popubBody.removeClass('slideInUp').addClass('slideOutDown');
        setTimeout(function () {
            popupId.fadeOut()
        }, 100)
    }

}
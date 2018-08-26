$(function () {
    var time_btn; //触发时间选择的dom节点
    var vue = new Vue({
        el: "#orderBalanceSubmit",
        data: function () {
            return {
                "cust_info": "",
                "products": "",
                "aptitude": "",
                "ticket_reciver": "",
                "total":0,
            }
        },
        mounted: function () {
            FnBtmPopup($('#servie-time'), $('#time-select-area'), [$('#confirm-edit')]);
            $("#spec").hide();
            $(".show").hide();
          //  $("#date").hide();
            var _sel = this;
            axios.get("../static/mockData/orderBalanceSubmit.json").then(function (res) {
                _sel.cust_info = res.data.data.cust_info;
                _sel.products = res.data.data.products;
                _sel.aptitude = res.data.data.aptitude;
                _sel.ticket_reciver = res.data.data.ticket_reciver;
                _sel.date_info = res.data.data.date_info;
                _sel.products.forEach(function(e){
                    _sel.total+=e.new_price;
                });
            })
        },
        methods: {
            swicth: function (e) {
                if ($(e.target).val() == "off") {
                    $("#showTicket").val("on");
                    $(".show").hide();
               //     $("#date").hide();
                } else {
                    $("#showTicket").val("off");
                    $(".show").show();
                 //   $("#date").show();
                }
            },
            chooseTicketKind:function (e) {
                var dom =$(e.target);

                if(!dom.hasClass("icon-wancheng")) {
                    dom.toggleClass('icon-wancheng');
                    $(".w-radio").not(dom).removeClass('icon-wancheng');
                }
                if (dom.attr("value") == "1") {
                    $("#spec").show();
                    $("#ticketHead").hide()
                    $("#ordinary").hide();
                }
                else {
                    $("#ticketHead").show()
                    $("#ordinary").show();
                    $("#spec").hide();
                }


            },
            chooseTicketHead:function (e) {

                var dom =$(e.target);
                if(!dom.hasClass("icon-wancheng")) {
                    dom.toggleClass('icon-wancheng');
                    $(".k-radio").not(dom).removeClass('icon-wancheng');
                }

            },
            chooseTicketContent:function (e) {
                var dom=$(e.target);
                dom.addClass('wancheng');
                dom.parent().siblings().find(".btn02").removeClass('wancheng')
            },
            submit:function (e) {
                alert("提交");
                var dom=$(e.target);
                dom.addClass('wancheng');
                dom.parent().siblings().find(".btn02").removeClass('wancheng')
            },
            // 选择配送方式
            chooseDeliveryMethod: function() {
                $('#main-page').hide();
                $('#delivery-select-area').show();
            },
            // 选择服务时间
            chooseServiceTime: function(e) {
                var dom = $(e.currentTarget);
                time_btn = dom;
            }
        }
    });

    var vue2 = new Vue({
        el: "#delivery-select-area",
        data: {
            "method": "物流",
            "deliveryTime": "",
            "pickupTime": ""
        },
        mounted: function () {
            FnBtmPopup($('#delevery-time-edit'), $('#time-select-area'));
            var _this = this;
            axios.get("../static/mockData/timeSelect.json").then(function (res) {
                _this.deliveryTime = res.data.data.date_info.days[0];
                _this.pickupTime = res.data.data.date_info.pickupTime;
            })
        },
        methods: {
            goBack: function () {
                $('#delivery-select-area').hide();
                $('#main-page').show();
                var method = this.method;
                $('#deliveryMethod').html(method);
                var datetime = $('.delivery-detail.selected .datetime').html();
                $('#delivery-time').html(datetime);
            },
            deliveryMethodSelect: function(e) {
                var dom = $(e.currentTarget);
                $('.delivery-method').removeClass('selected');
                dom.addClass('selected');
                this.method = dom.attr('method');
            },
            chooseDeliveryTime: function(e) {
                var dom = $(e.currentTarget);
                time_btn = dom;
            }
        }
    });

    var time = new Vue({
        el: "#time-select",
        data: {
            "date_info": ""
        },
        mounted: function () {
            var _this = this;
            axios.get("../static/mockData/timeSelect.json").then(function (res) {
                _this.date_info = res.data.data.date_info;
            })
        },
        methods: {
            chooseDay:function (e) {
                var dom=$(e.currentTarget);
                $('.w-day').removeClass('active');
                dom.addClass('active');
                var day = dom.attr('day');
                var times = $('.time-area[day="' + day + '"]');
                $('.time-area').hide();
                times.show();
                if (times.find('.w-time.active').length == 0) {
                    $('.w-time').removeClass('active');
                    times.find('.w-time:eq(0)').addClass('active');
                }
                this.updateServiceTime();
            },
            chooseTime:function (e) {
                var dom=$(e.currentTarget);
                $('.w-time').removeClass('active');
                dom.addClass('active');
                this.updateServiceTime();
            },
            updateServiceTime:function () {
                var day = $('.w-day.active').attr('value');
                var time = $('.w-time.active').attr('value');
                var day_time = day + ' ' + time;
                time_btn.find('.datetime').html(day_time);
            }
        }
    })
});
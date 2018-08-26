$(function() {



    var vue =new Vue({
        el: "#myselfFunList",
        data:function(){
            return{
                "user_bg":"",
                "user_img":"",
                "user_name":"",
                "my_order":"",
                "order_return":"",
                "my_collection":"",
                "personal_info":"",
                "address_manage":"",
                "ticket_manage":"",
                "capable_man_apply":"",
                "account_binding":"",
                "payfee":"",
                "change_password":"",
                "nearbyStore":"",
                "my_points":"",
                "my_service":"",
                "orders":"",
                "returns":"",
                "collections":""


            }
        },
        mounted:function(){

            var _sel = this;
            axios.get("../static/mockData/myselfFunList.json").then(function (res) {

                _sel.user_bg=res.data.data.user_bg;
                _sel.user_img=res.data.data.user_img;
                _sel.user_name=res.data.data.user_name;
                _sel.my_order=res.data.data.my_order;
                _sel.order_return=res.data.data.order_return;
                _sel.my_collection=res.data.data.my_collection;
                _sel.personal_info=res.data.data.personal_info;
                _sel.address_manage=res.data.data.address_manage;
                _sel.ticket_manage=res.data.data.ticket_manage;
                _sel.capable_man_apply=res.data.data.capable_man_apply;
                _sel.account_binding=res.data.data.account_binding;
                _sel.payfee=res.data.data.payfee;
                _sel.change_password=res.data.data.change_password;
                _sel.nearbyStore=res.data.data.nearbyStore;
                _sel.my_points=res.data.data.my_points;
                _sel.my_service=res.data.data.my_service;
                _sel.orders=res.data.data.orders;
                _sel.returns=res.data.data.returns;
                _sel.collections=res.data.data.collections;
            })
        }
    })

    $(".footer .footer-col p").click(
        function(){
            $(".footer .footer-col").removeClass("orange");
            $(this).parent().addClass("orange");

        });

})
$(function() {
    axios.get("../static/mockData/afterSales.json").then(function(resp) {
        var list01 = resp;
        var app = new Vue({
            el: '#aftersales',
            data: {
                list: list01
            }
        });


    });

})
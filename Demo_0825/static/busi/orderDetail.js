$(function() {
    axios.get("../static/mockData/orderDetail.json").then(function(resp) {
        var list01 = resp;
        var app = new Vue({
            el: '#orderDetail',
            data: {
                list: list01
            }
        });


    });
    axios.get("../static/mockData/orderDetail.json").then(function(resp) {
        var list02 = resp.data.shop[0];
        var list03 = resp;
        var app = new Vue({
            el: '#store',
            data: {
                storelist: list02,
                order: list03

            }
        });
    })
})
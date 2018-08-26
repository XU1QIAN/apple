$(function() {
    axios.get("../static/mockData/orderReturn.json").then(function(resp) {
        var list = resp.data;
        var app = new Vue({
            el: '#orderReturn',
            data: {
                orderlist: list
            }
        });
    });
})
$(function() {
    axios.post("../static/mockData/invoiceDetail.json").then(function(resp){
        var invoiceList = resp.data;
        var app = new Vue({
            el: '#invoiceList',
            data: {
                invoiceList: invoiceList
            }
        });
    });
});

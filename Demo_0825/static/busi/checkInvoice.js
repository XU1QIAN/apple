$(function() {
    axios.post("../static/mockData/checkInvoice.json").then(function(resp){
        var invoice = resp.data;
        var app = new Vue({
            el: '#invoiceInfo',
            data: {
                invoice: invoice
            }
        });
    });
});

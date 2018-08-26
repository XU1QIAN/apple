$(function() {
    axios.post("../static/mockData/checkLogistics.json").then(function(resp){
        var logisticsList = resp.data;
        var app = new Vue({
            el: '#logisticsList',
            data: {
                state: logisticsList.state,
                stateName: logisticsList.stateName,
                predictReceive: logisticsList.predictReceive,
                expressCompany: logisticsList.expressCompany,
                expressNo: logisticsList.expressNo,
                postStar: logisticsList.postStar,
                orderDate: logisticsList.orderDate,
                orderTime: logisticsList.orderTime,
                sendDate: logisticsList.sendDate,
                sendTime: logisticsList.sendTime,
                stockPickDate: logisticsList.stockPickDate,
                stockPickTime: logisticsList.stockPickTime,
                collectDate: logisticsList.collectDate,
                collectTime: logisticsList.collectTime,
                collectName: logisticsList.collectName,
                collectTel: logisticsList.collectTel,
                transList: logisticsList.transList,
                deliveryDate: logisticsList.deliveryDate,
                deliveryTime: logisticsList.deliveryTime,
                deliveryDepart: logisticsList.deliveryDepart,
                deliveryName: logisticsList.deliveryName,
                deliveryTel: logisticsList.deliveryTel,
                receiveAddress: logisticsList.receiveAddress
            }
        });
    });
});

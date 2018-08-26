$(function() {
    axios.post("../static/mockData/nearbyStoreList.json").then(function(resp){
        var storeList = resp.data;
        var app = new Vue({
            el: '#nearbyStoreList',
            data: {
                storeList: storeList
            }
        });
    });
});

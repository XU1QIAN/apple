$(function() {
    axios.post("../static/mockData/promotionList.json").then(function(resp){
        var data = resp.data;
        var promotionImg = data.promotionImg;
        var commodityList = data.commodityList;
        var app = new Vue({
            el: '#promotion',
            data: {
                promotionImg: promotionImg,
                commodityList: commodityList
            }
        });
    });
});

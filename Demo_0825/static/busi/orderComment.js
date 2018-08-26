$(function() {
    axios.post("../static/mockData/orderComment.json").then(function(resp){
        var orderComment = resp.data;
        var productList =  orderComment.productList;
        for(var i=0; i<productList.length; i++) {
            productList[i].star = 5;
            productList[i].comment = "";
        }
        var app = new Vue({
            el: '#orderComment',
            data: {
                productList: productList,
                descriptionStar: 5,
                logisticsStar: 5,
                serviceStar: 5
            }, 
            methods: {
                publish: function(){
                    let data = {};
                    data.productList = productList;
                    data.descriptionStar = this.descriptionStar;
                    data.logisticsStar = this.logisticsStar;
                    data.serviceStar = this.serviceStar;
                    axios.post('', data, function(resp) {
                        if(resp.respCode == '200') {
                            // 返回成功后的操作
                            $.toptip('评价成功', 'success');
                            window.history.go(-1);
                        }
                    });
                }
            }
        });
        //星级评价
        $('.star-comt-wrap').each(function() {
            $(this).find('i').each(function(index) {
                $(this).click(function() {
                    var comtText = ["非常差", "差", "一般", "很好", "非常好"];
                    $(this).removeClass('icon-mn_xingxing').addClass('icon-mn_xingxing_fill')
                    $(this).prevAll().removeClass('icon-mn_xingxing').addClass('icon-mn_xingxing_fill')
                    $(this).nextAll().removeClass('icon-mn_xingxing_fill').addClass('icon-mn_xingxing');
                    $(this).parent('.star-comt-wrap').siblings('.cmt-span').text(comtText[index]);
                    var star = $(this).parent('.star-comt-wrap').find('.icon-mn_xingxing_fill').size();
                    $(this).parent('.star-comt-wrap').attr('value', star);
                })
            })
        })
    });
})
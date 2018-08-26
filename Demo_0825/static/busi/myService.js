$(function() {
	axios.post("../static/mockData/myService.json").then(function(resp){
        var serviceList = resp.data;
        var app = new Vue({
            el: '#myService',
            data: {
            	serviceList: serviceList
            }
        });

        // 选中服务
	    $('.service .w-radio').on('click', function() {
	        $(this).toggleClass('icon-weixuanzhongyuanquan');
	        $(this).toggleClass('icon-wancheng');
	    });
    });
});
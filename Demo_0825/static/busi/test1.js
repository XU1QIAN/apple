var change = '123456';
var  change1 = '';
$(function() {

    axios.post("../static/mockData/productDetail.json").then(function(resp) {
        var list01 = resp.data[0].tab01;

        var app = new Vue({
            el: '#protab01',
            data: {
                protab01: list01,
                change: change,
                change1:change1,
            },
            methods: {
                edit:function(){
                    let data = {};
                    data.change = this.change;
                    data.change1 = this.change1;
                    axios.post('', data, function(resp) {
                        if(resp.respCode == '200') {
                            // 返回成功后的操作
                        }
                    });
                }
            }
        });
    });
	

    // var bus = new Vue();
    // axios.get("../static/mockData/productDetail.json").then(function(resp) {
    //     var list = resp;
    //     var app = new Vue({
    //         el: '#productDetail',
    //         data: {
    //             productData: list
    //         }
    //     });
    // });
    // var iconOn = '<i class="icon iconfont icon-xuanzejiaobiao"></i>';
    // $('.gUl li').eq(0).append(iconOn);
    // $('.gUl li').on('click', function() {
    //     var number = $(this).index();

    //     $(this).append(iconOn).addClass('active').siblings().removeClass('active').find('.icon-xuanzejiaobiao').remove();
    //     $('.parabox').find('.weui-cells').eq(number).show();
    //     bus.$emit('tabChange', $(this).index());
    //     $('.parabox').find('.weui-cells').eq(number).siblings().hide();

    //     if ($(this).hasClass('active')) {
    //         $('.shopping p').addClass('active');
    //     }
    // });

    // bus.$on("tabChange", function(index) {
    //     if (index == 0) {

    //         axios.get("../static/mockData/productDetail.json").then(function(resp) {
    //             var list01 = resp.data[0].tab01;

    //             var app = new Vue({
    //                 el: '#protab01',
    //                 data: {
    //                     protab01: list01,
	// 					change: change,
	// 					change1:change1,
    //                 },
	// 				methods:{
	// 					edit:function(){
	// 						console.log(this.change);
	// 						console.log(this.change1);
	// 						let data = {};
	// 						data.change = this.change;
	// 						data.change1 = this.change1;
	// 						console.log(data)
	// 					}
	// 				 }
    //             });
    //         });
    //     }
    //     if (index == 1) {

    //         axios.get("../static/mockData/productDetail.json").then(function(resp) {
    //             var list02 = resp.data[0].tab02;

    //             var app = new Vue({
    //                 el: '#protab02',
    //                 data: {
    //                     protab02: list02
    //                 }
    //             });

    //         });
    //     }
    // })
    // $('.title-Row').on('click', function() {
    //     $(this).siblings().toggle();
    //     var titleI = $(this).find('.icon');
    //     titleI.toggleClass('icon-more');

    // });
    // $('body').on('click', '.keepbtn', function() {
    //     $(this).find('.iconfont').toggleClass('orange');
    // });
    // bus.$emit('tabChange', 0);

});

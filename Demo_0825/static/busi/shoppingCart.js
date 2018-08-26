$(function() {
    axios.post("../static/mockData/shoppingCart.json").then(function(resp){
        var shopList = resp.data.validList;
        var invalidList = resp.data.invalidList;
        var app = new Vue({
            el: '#shoppingCart',
            data: {
                shopList: shopList,
                invalidList: invalidList
            }, 
            methods: {
                // 删除
                remove: function(id, e) {
                    let data = {};
                    data.productId = id;
                    axios.post('', data, function(resp) {
                        if(resp.respCode == '200') {
                            // 返回成功后的操作
                            var _this = $(e.currentTarget);
                            var shop = _this.parents('.each-shop');
                            _this.parents('.product').remove();
                            shopChooseAll(shop);
                            // chooseAll();
                            totalCalculate();
                            if(shop.find('.product').length == 0) {
                                shop.remove();
                            }
                            disabledDiffStore();
                        }
                    });
                },
                // 修改
                edit: function(id, e) {
                    var _this = $(e.currentTarget);
                    _this.parents('.product').animate({marginLeft:"0"}, 300);
                    let data = {};
                    data.productId = id;
                    axios.post("../static/mockData/productModels.json", data).then(function(resp){
                        var product = resp.data;
                        var modelList = product.modelList;
                        var selectedModel;
                        for(var i=0; i<modelList.length; i++) {
                            if(modelList[i].checked == true) {
                                selectedModel = modelList[i];
                                break;
                            }
                        }
                        app2.productId = product.productId;
                        app2.name = product.productName;
                        app2.modelList = modelList;
                        app2.selectedModel = selectedModel;
                    });
                },
                submit: function(){
                    let data = {};
                    var selectList = $('.product .icon-wancheng').parents('.product');
                    var selectProductList = [];
                    selectList.each(function() {
                        var id = $(this).attr('productId');
                        var amount = parseInt($(this).find('.quantity').html());
                        var modelId = $(this).find('.product-name .gray').attr('value');
                        var product = {productId: id, amount: amount, modelId: modelId};
                        selectProductList.push(product);
                    });
                    data.productList = selectProductList;
                    axios.post('', data, function(resp) {
                        if(resp.respCode == '200') {
                            // 返回成功后的操作
                            window.location.href = "orderBalanceSubmit.html";
                        }
                    });
                }
            }
        });

        var app2 = new Vue({
            el: '#changeModel',
            data: {
                productId: '',
                name: '',
                modelList: '',
                selectedModel: ''
            },
            methods: {
                selectModel: function(index){
                    // this.price = modelList[index].price;
                    // this.imgUrl = modelList[index].imgUrl;
                    // this.modelName = modelList[index].modelName;
                    var data = {};
                    var modelList = this.modelList;
                    for(var i=0; i<modelList.length; i++) {
                        modelList[i].checked = false;
                    }
                    modelList[index].checked = true;
                    this.selectedModel = modelList[index];
                },
                confirmEdit: function(productId, $event) {
                    var data = {};
                    data.productId = productId;
                    data.modelId = this.selectedModel.modelId;
                    axios.post('', data, function(resp) {
                        if(resp.respCode == '200') {
                            // 返回成功后的操作
                            _this.parents('.product').find('.product-name .gray').html(this.selectedModel.modelName);
                            $('#edit-area').fadeOut();
                        }
                    });
                    
                }
            }
        });
        
        // 商品选中
        $('.product .radio-valid').on('click', function() {
            if($(this).hasClass('icon-circle')) {
                $.toptip('不同店铺的商品请分开下单哦')
            } else {
                $(this).toggleClass('icon-weixuanzhongyuanquan');
                $(this).toggleClass('icon-wancheng');
                var shop = $(this).parents('.each-shop');
                shopChooseAll(shop);
                // chooseAll();
                totalCalculate();
                disabledDiffStore();
            }
        });

        // 不同店铺商品不可以同时选中
        function disabledDiffStore() {
            var select = $('.icon-wancheng');
            if(select.length == 0) {
                $('.product-list .radio-valid').removeClass('icon-circle').addClass('icon-weixuanzhongyuanquan');
            } else {
                select.parents('.each-shop').siblings('.each-shop').find('.radio-valid').removeClass('icon-weixuanzhongyuanquan').addClass('icon-circle');
            }
        }

        // 店铺全选
        $('.shop-title .radio-valid').on('click', function() {
            if($(this).hasClass('icon-circle')) {
                $.toptip('不同店铺的商品请分开下单哦')
            } else {
                var shop = $(this).parents('.each-shop');
                if($(this).hasClass('icon-weixuanzhongyuanquan')) {
                    shop.find('.radio-valid').removeClass('icon-weixuanzhongyuanquan').addClass('icon-wancheng');
                } else {
                    shop.find('.radio-valid').removeClass('icon-wancheng').addClass('icon-weixuanzhongyuanquan');
                }
            }
            chooseAll();
            totalCalculate();
            disabledDiffStore();
        });

        // 所有全选
        // $('.choose-all .radio-valid').on('click', function() {
        //     if($(this).hasClass('icon-weixuanzhongyuanquan')) {
        //         $('.radio-valid').removeClass('icon-weixuanzhongyuanquan').addClass('icon-wancheng');
        //     } else {
        //         $('.radio-valid').removeClass('icon-wancheng').addClass('icon-weixuanzhongyuanquan');
        //     }
        //     totalCalculate();
        // });

        // 店铺全选按钮是否选中
        function shopChooseAll(shop) {
            var unchecked = shop.find('.product .icon-weixuanzhongyuanquan');
            if(unchecked.length > 0){
                shop.find('.shop-title .radio-valid').addClass('icon-weixuanzhongyuanquan').removeClass('icon-wancheng');
            } else {
                shop.find('.shop-title .radio-valid').addClass('icon-wancheng').removeClass('icon-weixuanzhongyuanquan');
            }
        }

        // 所有商品全选按钮是否选中
        function chooseAll() {
            var unchecked= $('.product-list .icon-weixuanzhongyuanquan');
            if(unchecked.length > 0){
                $('.choose-all .radio-valid').addClass('icon-weixuanzhongyuanquan').removeClass('icon-wancheng');
            } else {
                $('.choose-all .radio-valid').addClass('icon-wancheng').removeClass('icon-weixuanzhongyuanquan');
            }
        }

        // 计算合计金额
        function totalCalculate() {
            var select = $('.product .icon-wancheng');
            var total = 0;
            select.each(function() {
                var product = $(this).parents('.product');
                var price = parseFloat(product.find('.product-price').attr('value'));
                var count = parseInt(product.find('.quantity').html());
                total += price * count;
            });
            total = total.toFixed(2);
            $('#total').html(total);
        }

        // 数量加
        $('body').on('click', '.num-area .icon-jia.active', function() {
            var span = $(this).siblings('span');
            var num = parseInt(span.html());
            num++;
            span.html(num);
            $(this).siblings('.icon-jian').addClass('active');
            totalCalculate();
        });

        // 数量减
        $('body').on('click', '.num-area .icon-jian.active', function() {
            var span = $(this).siblings('span');
            var num = parseInt(span.html());
            num--;
            span.html(num);
            if(num == 1) {
                $(this).removeClass('active');
            }
            totalCalculate();
        });

        // 滑出“编辑、删除”按钮部分
        // 初始化元素宽度
        var screenWidth = $("body").width();
        var btnWidth = $('.delete-edit').width();
        $('.product').width(screenWidth + btnWidth);
        $('.product-detail').width(screenWidth - 44);
        var imgWidth = $('.product-img').width();
        $('.product-info').width($('.product-detail').width() - 22 - imgWidth);

        // 获取所有行，对每一行设置监听
        var lines = $(".product");
        var len = lines.length; 
        var lastX, lastXForMobile;

        // 用于记录被按下的对象
        var pressedObj;  // 当前左滑的对象
        var lastLeftObj; // 上一个左滑的对象

        // 用于记录按下的点
        var start;

        // 网页在移动端运行时的监听
        for (var i = 0; i < len; ++i) {
            // 初始化按钮高度
            var product = $(lines[i]);
            var height = product.height();
            product.find('.delete-edit').height(height).css('line-height', height+'px');

            lines[i].addEventListener('touchstart', function(e){
                lastXForMobile = e.changedTouches[0].pageX;
                pressedObj = this; // 记录被按下的对象 

                // 记录开始按下时的点
                var touches = event.touches[0];
                start = { 
                    x: touches.pageX, // 横坐标
                    y: touches.pageY  // 纵坐标
                };
            });

            lines[i].addEventListener('touchmove',function(e){
                // 计算划动过程中x和y的变化量
                var touches = event.touches[0];
                delta = {
                    x: touches.pageX - start.x,
                    y: touches.pageY - start.y
                };

                // 横向位移大于纵向位移，阻止纵向滚动
                if (Math.abs(delta.x) > Math.abs(delta.y)) {
                    event.preventDefault();
                }
            });

            lines[i].addEventListener('touchend', function(e){
                if (lastLeftObj && pressedObj != lastLeftObj) { // 点击除当前左滑对象之外的任意其他位置
                    $(lastLeftObj).animate({marginLeft:"0"}, 300); // 右滑
                    lastLeftObj = null; // 清空上一个左滑的对象
                }
                var diffX = e.changedTouches[0].pageX - lastXForMobile;
                if (diffX < -50) {
                    $(pressedObj).animate({marginLeft:-btnWidth}, 300); // 左滑
                    lastLeftObj && lastLeftObj != pressedObj && 
                        $(lastLeftObj).animate({marginLeft:"0"}, 300); // 已经左滑状态的按钮右滑
                    lastLeftObj = pressedObj; // 记录上一个左滑的对象
                } else if (diffX > 50) {
                if (pressedObj == lastLeftObj) {
                    $(pressedObj).animate({marginLeft:"0"}, 300); // 右滑
                    lastLeftObj = null; // 清空上一个左滑的对象
                }
                }
            });
        }

        FnBtmPopup($('.edit-btn'), $('#edit-area'), [$('#confirm-edit')]);
    });
});
$(function () {
    /* var promise=axios.get("../static/mockData/payfee.json").then(function (res) {
         this.prices=res.data.data;

     })*/

    var payfee = new Vue({
        el: "#payfee",
        data: function () {
            return {
                phone: "",
                area: "",
                prices: "",
                count:"0.00"
            }
        },

        methods: {
            blur: function () {
                /*根据电话号码查询归属地*/
                /*  axios.get("url").then(function (resp) {

                  })*/
                if (this.phone == "") {
                    this.area = "";
                }
                else {
                    this.area = "浙江联通";
                }
            },
            choose:function(e)
            {
                 //事件委托
                 var dom=e.target;
                 if(e.target.nodeName.toLowerCase()==="p")
                 {
                     dom=e.target.parentNode;
                 }
                $(dom).removeClass("price");
                $(dom).addClass("price-ck");
                $(".price").removeClass("price-ck");
                $(dom).addClass("price");
                this.count='￥' +$(dom).val();


            },
            submit:function(){

                alert("提交数据"+this.phone+":"+this.count)
                //提交数据
                /*  axios.post("url").then(function (resp) {

                 })*/

            }
        },
        mounted: function () {
            var _sel = this;
            axios.get("../static/mockData/payfee.json").then(function (res) {
                _sel.prices = res.data.data;
            })
        },
        filters:{
            filter:function (value) {
                return value.split('.')[0];
            }
        }
    });
});
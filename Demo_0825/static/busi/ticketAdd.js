$(function() {
    var app = new Vue({
        el: '#ticket',
        data: {
            header: '',
            no: '',
            address: '',
            tel: '',
            bank: '',
            bankAccount: ''
        }, 
        methods: {
            add: function(){
                let data = {};
                data.header = this.header;
                data.no = this.no;
                data.address = this.address;
                data.tel = this.tel;
                data.bank = this.bank;
                data.bankAccount = this.bankAccount;
                axios.post('', data, function(resp) {
                    if(resp.respCode == '200') {
                        // 返回成功后的操作
                        window.history.go(-1);
                    }
                });
            }
        }
    });
});

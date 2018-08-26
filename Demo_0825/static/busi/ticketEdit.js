$(function() {
    axios.post("../static/mockData/ticketEdit.json").then(function(resp){
        var ticket = resp.data;
        var app = new Vue({
            el: '#ticket',
            data: {
                header: ticket.header,
                no: ticket.no,
                address: ticket.address,
                tel: ticket.tel,
                bank: ticket.bank,
                bankAccount: ticket.bankAccount
            }, 
            methods: {
                edit: function(){
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
});

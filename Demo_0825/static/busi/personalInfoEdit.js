$(function() {
    axios.post("../static/mockData/personalInfo.json").then(function(resp){
        var info = resp.data;
        var app = new Vue({
            el: '#personalInfo',
            data: {
                name: info.name,
                nickname: info.nickname,
                gender: info.gender,
                tel: info.tel,
                email: info.email,
                id: info.id
            }, 
            methods: {
                edit: function(){
                    let data = {};
                    data.name = this.name;
                    data.nickname = this.nickname;
                    data.gender = this.gender;
                    data.tel = this.tel;
                    data.email = this.email;
                    data.id = this.id;
                    axios.post('', data, function(resp) {
                        if(resp.respCode == '200') {
                            // 返回成功后的操作
                            $.toptip('修改成功', 'success');
                            window.history.go(-1);
                        }
                    });
                }
            }
        });
    });
});

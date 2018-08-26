$(function() {
    axios.post("../static/mockData/personalInfo.json").then(function(resp){
        var info = resp.data;
        var app = new Vue({
            el: '#personalInfo',
            data: {
                info: info
            }
        });
    });
});

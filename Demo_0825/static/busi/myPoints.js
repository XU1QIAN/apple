$(function() {
    axios.post("../static/mockData/myPoints.json").then(function(resp){
        var data = resp.data;
        var app = new Vue({
            el: '#myPoints',
            data: {
            	userName: data.userName,
            	totalPoints: data.totalPoints,
                pointsList: data.pointsList
            }
        });
    });
});

$(function() {
    var setTime;
    var time = parseInt($(".time").text());
    setTime = setInterval(function() {
        if (time <= 0) {
            clearInterval(setTime);
            return;
        }
        time--;
        $(".time").text(time);
    }, 1000);
})
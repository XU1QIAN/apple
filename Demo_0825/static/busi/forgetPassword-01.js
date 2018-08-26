/*var lphone = phone.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2");*/

$(function() {

    //点击提交 验证
    $("#submit").click(function() {
        var account = $('#account').val();
        if (!account) {
            $.toptip('用户名不能为空')
        } else {
            $.toptip('提交成功', 'success');
            window.location.href = "forgetPassword-02.html"
        }
    });
})
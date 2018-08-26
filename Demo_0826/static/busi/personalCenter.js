layui.define(['upload', 'form'], function(exports){
    var $ = layui.jquery,
    upload = layui.upload,
    form = layui.form;

    var uploadInst = upload.render({
        elem: '#portraitBtn',
        url: '',//未配置上传接口，所以每次上传都会报提示：请求上传接口出现异常。
        size: 4096, //限制文件大小，单位 KB
        before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#portrait').attr('src', result); //图片链接（base64）
            });
        },
        done: function(res){
            //如果上传失败
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            //上传成功
        },
        error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#errorText');
            demoText.html('<span class="red">上传失败</span> <a class="layui-btn layui-btn-sure demo-reload ml10">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });

    //初始化修改按钮的文字内容，修改or立即绑定。。。
    btnSetting();

    // 基本信息 -- 所在地 -- 修改
    $('.edit-btn').on('click', function() {
        $(this).siblings('.info-value').hide();
        $(this).siblings('.edit-part').show();
        $(this).hide();

        //确定按钮
        $('.layui-btn-sure').off().on('click', function() {
            var id = $(this).attr("id")
            ,input_val
            ,info_value = $(this).parents('.info-item').find('.info-value');
            //所在地
            if(id == 'address-confirm') {
                input_val = $('select[name="province"]').val() + ' ' + $('select[name="city"]').val() + ' ' + $('select[name="district"]').val();
                info_value.html(input_val);
            }
            //切换职位
            else if(id == 'position-confirm') {
                input_val = $('select[name="position"]').val();
                info_value.html(input_val);
            }
            //邮箱
            else if(id == 'email-confirm') {
                input_val = $('#email_address').val();
                info_value.html(input_val);
            }
            //微信
            else if(id == 'wechat-confirm') {
                input_val = $('#wechat_number').val();
                info_value.html(input_val);
            }
            info_value.show().siblings('.edit-btn').show();
            $(this).parents('.edit-part').hide();
            btnSetting();
        });
    });

    //是否已经绑定了邮箱和微信号，如果绑定，则显示“修改”按钮；如果未绑定，则显示“立即绑定”按钮
    function btnSetting() {
        $('.info-item').each(function() {
            var val = $(this).find('.info-value').html();
            if($(this).find('.edit-btn').size() > 0) {
                if(val) {
                    $(this).find('.hasValue').show();
                    $(this).find('.noValue').hide();
                } else {
                    $(this).find('.hasValue').hide();
                    $(this).find('.noValue').show();
                }
            }
        });
    }

    exports('personalCenter', {});    
});


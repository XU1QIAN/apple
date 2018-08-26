layui.define(['element', 'form'], function(exports){
    var $ = layui.jquery,
    element = layui.element,
    form = layui.form;

	
	
    //监听提交
    form.on('submit(weshopSelectForm)', function(data){
        // layer.alert(JSON.stringify(data.field), {
        //     title: '最终的提交信息'
        // })
        self.location='weshopSelectSuccess.html'; 
        return false;
    });

    exports('weshopSelect', {});    
});


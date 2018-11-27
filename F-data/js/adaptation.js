//手机屏幕尺寸适配
document.documentElement.style.fontSize = document.documentElement.clientWidth/6.4 + "px";
window.addEventListener("resize",function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth/6.4 + "px";
})
//屏幕适配尺寸
//var HEIGHT = $('body').height();
//$(window).resize(function() {
//  $('body').height(HEIGHT);
//});
//console.log(1)

var winHeight = $(window).height(); //获取当前页面高度
$(window).resize(function() {
    var thisHeight = $(this).height();
    if (winHeight - thisHeight > 50) {
        //当软键盘弹出，在这里面操作
        //alert('aaa');
        $('body').css('height', winHeight + 'px');
    } else {
        //alert('bbb');
        //当软键盘收起，在此处操作
        $('body').css('height', '100%');
    }
})



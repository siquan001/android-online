
'use strict';
//获取所有元素
var topbar = $('.phone>.topbar'),
    topbar_time = $('.topbar>.center'),
    appframe = $('.phone>.appframe iframe#page'),
    deskframe = $('.phone>.appframe iframe#desk'),
    lockframe = $('.phone>.appframe iframe#lock'),
    footer = $('.phone>.footer'),
    menu_key = $('.phone>.footer .menu-key'),
    home_key = $('.phone>.footer .home-key'),
    back_key = $('.phone>.footer .back-key'),
    menu_main = $('.phone>.menu>.menu-main'),
    menu_bg = $('.phone>.menu>.menu-bg'),
    service = $('.phone>.service'),
    over = $('.phone>.over'),
    menu_range_p1 = $('.phone>.menu .range span.p1'),
    menu_range_p2 = $('.phone>.menu .range span.p2'),
    menu_range_p3 = $('.phone>.menu .range span.p3'),
    menu_quicktime=$('.phone>.menu .quicktime .date'),
    appzz = $('.phone>.appframe .zz'),
    lock = $('.phone>.menu .lock');
    var loname='android-online-app-localstorage';
if(localStorage.getItem(loname)==undefined){
    localStorage.setItem(loname,'{}');
}
var userApp=JSON.parse(localStorage.getItem(loname));
var AllInstallApp=BuiltInApp;
for(var i in userApp){
    AllInstallApp[i]=userApp[i];
}
//亮度
var LIGHT = 1;
setLight(LIGHT);
topbar.mousedown(function (e) {
    appzz.show();
    var y = e.pageY, ny;
    document.onmousemove = function (e) {
        e.preventDefault();
        ny = e.pageY;
        menu_main.css('top', (ny>=menu_main.height()?menu_main.height():ny)  + 'px');
    };
    document.onmouseup = function () {
        appzz.hide();

        if (ny - y > 70) {
            menu_main.css('top', '0');
            menu_main.css('transform', 'none');
            menu_bg.css('opacity', '1');
            menu_bg.css('pointer-events', 'all');
        } else {
            menu_main.css('top', '0');
        }
        document.onmousemove = null;
        document.onmouseup = null;
    }
});
topbar.get()[0].ontouchstart = function (e) {
    var y = e.targetTouches[0].pageY, ny;
    document.ontouchmove = function (e) {
        e.preventDefault();
        ny = e.targetTouches[0].pageY;
        menu_main.css('top', (ny>=menu_main.height()?menu_main.height():ny) + 'px');
    };
    document.ontouchend = function () {
        if (ny - y > 70) {
            menu_main.css('top', '0');
            menu_main.css('transform', 'none');
            menu_bg.css('opacity', '1');
            menu_bg.css('pointer-events', 'all');
        } else {
            menu_main.css('top', '0');
        }
        document.ontouchmove = null;
        document.ontouchend = null;
    }
};
menu_bg.click(function () {
    menu_main.attr('style', '');
    menu_bg.attr('style', '');
});

menu_range_p3.mousedown(function (e) {
    var x = e.pageX, nx, w = menu_range_p1.width(), t;
    document.onmousemove = function (e) {
        e.preventDefault();
        nx = e.pageX;
        t = (nx - x) / w + LIGHT;
        t = t >= 1 ? 1 : t;
        t = t <= 0 ? 0 : t;
        setLight(t);
    };
    document.onmouseup = function () {
        LIGHT = t;
        document.onmousemove = null;
        document.onmouseup = null;
    }
});
menu_range_p3.get()[0].ontouchstart = function (e) {
    var x = e.targetTouches[0].pageX, nx, w = menu_range_p1.width(), t;
    document.ontouchmove = function (e) {
        e.preventDefault();
        nx = e.targetTouches[0].pageX;
        t = (nx - x) / w + LIGHT;
        t = t >= 1 ? 1 : t;
        t = t <= 0 ? 0 : t;
        setLight(t);
    };
    document.ontouchend = function () {
        LIGHT = t;
        document.ontouchmove = null;
        document.ontouchend = null;
    }
};
function setLight(l) {
    over.css('opacity', 1 - l + '');
    menu_range_p2.css('--w', l + '');
    menu_range_p3.css('left', l * 100 + '%')
}
home_key.click(function () {
    if (!appframe.src) {
        deskframe.get()[0].contentWindow.setTab(0);
    };
    if(menu_main.css('transform')=='none'){
        menu_bg.click();
    }
});
var ISMENU_SHOW = false;
menu_key.click(function () {
    if (lockframe.css('display') == 'none') {
        if (ISMENU_SHOW) {
            service.css({
                'opacity': '0',
                'pointer-events': 'none'
            });
            ISMENU_SHOW = false;
        } else {
            service.css({
                'opacity': '1',
                'pointer-events': 'all'
            });
            ISMENU_SHOW = true;
        }
    }

});
back_key.click(function(){
    if(ISMENU_SHOW){
        menu_key.click();
    }else if(menu_main.css('transform')=='none'){
        menu_bg.click();
    }else{
        var a=$($('.appframe .page').get()[$('.appframe .page').length-1]);
        a.css('animation','page-d .3s');
        setTimeout(function(){
            a.remove();
        },300)
    }
});
lock.click(function () {
    lockframe.show();
    menu_bg.click();
});
window.onload = function () {
    $('.loading').css({
        'opacity': '0',
        'pointer-events': 'none'
    });
    updateTime();
    setInterval(function () {
        updateTime();
    }, 1000)
}

function updateTime() {
    var xq = '';
    switch (new Date().getDay()) {
        case 0:
            xq = '日'
            break;
        case 1:
            xq = '一'
            break;
        case 2:
            xq = '二'
            break;
        case 3:
            xq = '三'
            break;
        case 4:
            xq = '四'
            break;
        case 5:
            xq = '五'
            break;
        case 6:
            xq = '六'
            break;

    }
    lockframe.get()[0].contentDocument.querySelector('.time .t').innerHTML = new Date().getHours() + ":" + (new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes());
    lockframe.get()[0].contentDocument.querySelector('.time .d').innerHTML = new Date().getFullYear() + "/" + (new Date().getMonth()+1)+'/'+new Date().getDate()+' 星期'+xq;
    deskframe.get()[0].contentDocument.querySelector('.widght.time .t .n').innerHTML = (new Date().getHours()>12?new Date().getHours()-12:new Date().getHours()) + ":" + (new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes());
    deskframe.get()[0].contentDocument.querySelector('.widght.time .t .ap').innerHTML = (new Date().getHours()>=12?'PM':'AM')
    deskframe.get()[0].contentDocument.querySelector('.widght.time .d').innerHTML =  (new Date().getMonth()+1)+'月'+new Date().getDate()+'日 星期'+xq;
    topbar_time.html(new Date().getHours() + ":" + (new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes()));
    menu_quicktime.html(new Date().getFullYear() + "年" + (new Date().getMonth()+1)+'月');
}
function startPage(go,t){
    if(go.indexOf('://')!=-1){
        window.open(go);
    }else{
        var a=document.createElement('iframe');
        a.classList.add('page');
        document.querySelector('.appframe').append(a);
        a.src='app/'+go+'/pages/'+(t||AllInstallApp[go].start);
        a.onload=function(){
            $(a).css('animation','page .3s');
            $(a).show();
        };
    }
}


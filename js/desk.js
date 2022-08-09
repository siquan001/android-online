var pins = $('.pins');
var tabs = $('.tabs');
var appitem=$('.appitem');
var taboffsets = ['0px', '-100%', '-200%'];
var nowtabsoffset = 0;
var tabhost = $('.tabhost span');
pins.html('');
var loname='android-online-app-localstorage';
if(localStorage.getItem(loname)==undefined){
    localStorage.setItem(loname,'{}');
}
var userApp=JSON.parse(localStorage.getItem(loname));
var AllInstallApp=BuiltInApp;
for(var i in userApp){
    AllInstallApp[i]=userApp[i];
}
queryDesktop();
function queryDesktop(){
    $('.tabs .tab').eq(0).html(`<div class="widght time">
    <div class="t"><span class="n">12:30</span><span class="ap">PM</span></div>
    <div class="d">8月6日 星期六</div>
</div>`);
    $('.tabs .tab').eq(1).html('');
    $('.tabs .tab').eq(2).html('');
    for (var i in AllInstallApp) {
        if (AllInstallApp[i].pin) {
            pins.append('<div class="appitem" data-go="' + i + '"><img src="' + AllInstallApp[i].icon.replace('@image/','../app/'+i+'/images/') + '"/><p>' + AllInstallApp[i].name + '</p></div>')
        }
    }
    var tab1 = $('.tabs .tab').eq(0);
    var tab1n = 0;
    var tab1g = ['4/1/5/2', '4/2/5/3', '4/3/5/4', '4/4/5/5', '5/1/6/2', '5/2/6/3', '5/3/6/4', '5/4/6/5']
    for (var i in AllInstallApp) {
        if (tab1n == 8) break;
        if (!AllInstallApp[i].pin) {
            tab1.append('<div class="appitem" data-go="' + i + '" style="grid-area:' + tab1g[tab1n] + '"><img src="' + AllInstallApp[i].icon.replace('@image/','../app/'+i+'/images/') + '"/><p>' + AllInstallApp[i].name + '</p></div>')
            tab1n++;
        }
    }
    
    var tab2g = [];
    var _a = 1;
    var _b = 1;
    var _c = 2;
    var _d = 2;
    var tab2 = $('.tabs .tab').eq(1);
    var tab2n = 0;
    var tab2c = 0;
    for (var i = 0; i < 21; i++) {
        var _e = Math.floor(i / 4);
        var _f = i % 4;
        tab2g[tab2g.length] = (_a + _e) + '/' + (_b + _f) + '/' + (_c + _e) + '/' + (_d + _f);
    }
    for (var i in AllInstallApp) {
        if (tab2c != 8) {
            if (!AllInstallApp[i].pin) {
            tab2c++;}
        } else {
            if (tab2n == 20) break;
            if (!AllInstallApp[i].pin) {
                tab2.append('<div class="appitem" data-go="' + i + '" style="grid-area:' + tab2g[tab2n] + '"><img src="' + AllInstallApp[i].icon.replace('@image/','../app/'+i+'/images/') + '"/><p>' + AllInstallApp[i].name + '</p></div>')
                tab2n++;
            }
        }
    }
    var tab3 = $('.tabs .tab').eq(1);
    var tab3n = 0;
    var tab3c = 0;
    for (var i in AllInstallApp) {
        if (tab3c != 28) {
            if (!AllInstallApp[i].pin) {
            tab3c++;}
        } else {
            if (tab3n == 20) break;
            if (!AllInstallApp[i].pin) {
                tab3.append('<div class="appitem" data-go="' + i + '" style="grid-area:' + tab2g[tab2n] + '"><img src="' + AllInstallApp[i].icon.replace('@image/','../app/'+i+'/images/') + '"/><p>' + AllInstallApp[i].name + '</p></div>')
                tab3n++;
            }
        }
    }
    appitem=$('.appitem');
    appitemele();
}
tabele();
function tabele(){

tabs.mousedown(function (e) {
    var x = e.pageX, nx;
    document.onmousemove = function (e) {
        e.preventDefault();
        nx = e.pageX;
        tabs.css('left', 'calc(' + taboffsets[nowtabsoffset] + ' + ' + (nx - x) + 'px)');

    };
    document.onmouseup = function () {
        if (nx - x >= 100) {
            if (nowtabsoffset > 0) {
                document.onmousemove = null;
                document.onmouseup = null;
                nowtabsoffset--;
            }
        };
        if (nx - x <= -100) {
            if (nowtabsoffset < 2) {
                document.onmousemove = null;
                document.onmouseup = null;
                nowtabsoffset++;
            }
        }
        setTab(nowtabsoffset);
        document.onmousemove = null;
        document.onmouseup = null;
    }
});
tabs.get()[0].ontouchstart = function (e) {
    var x = e.targetTouches[0].pageX, nx;
    document.ontouchmove = function (e) {
        e.preventDefault();
        nx = e.targetTouches[0].pageX;
        tabs.css('left', 'calc(' + taboffsets[nowtabsoffset] + ' + ' + (nx - x) + 'px)');

    };
    document.ontouchend = function () {
        if (nx - x >= 70) {
            if (nowtabsoffset > 0) {
                nowtabsoffset--;
            }
        };
        if (nx - x <= -70) {
            if (nowtabsoffset < 2) {
                nowtabsoffset++;
            }
        }
        setTab(nowtabsoffset);
        document.ontouchmove = null;
        document.ontouchend = null;
    }
};
}
function setTab(i) {
    nowtabsoffset = i;
    tabs.css('transition', 'left .3s');
    tabs.css('left', taboffsets[i]);
    setTimeout(function () {
        tabs.css('transition', 'none');
    }, 300);
    tabhost.removeClass('select');
    tabhost.eq(i).addClass('select');
};
function appitemele(){
    appitem.click(function(){
        var go=$(this).attr('data-go');
        parent.startPage(go);
    })
}
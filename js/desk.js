var pins = $('.pins');
pins.html('');
for (var i in AppList) {
    if (AppList[i].pin) {
        pins.append('<div class="appitem" data-go="' + i + '"><img src="' + AppList[i].icon + '"/><p>' + AppList[i].name + '</p></div>')
    }
}
var tab1 = $('.tabs .tab').eq(0);
var tab1n = 0;
var tab1g = ['4/1/5/2', '4/2/5/3', '4/3/5/4', '4/4/5/5', '5/1/6/2', '5/2/6/3', '5/3/6/4', '5/4/6/5']
for (var i in AppList) {
    if (tab1n == 8) break;
    if (!AppList[i].pin) {
        tab1.append('<div class="appitem" data-go="' + i + '" style="grid-area:' + tab1g[tab1n] + '"><img src="' + AppList[i].icon + '"/><p>' + AppList[i].name + '</p></div>')
        tab1n++;
    }
}
var tabs = $('.tabs');
var taboffsets = ['0px', '-100%', '-200%'];
var nowtabsoffset = 0;
var tabhost = $('.tabhost span');
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
for (var i in AppList) {
    if (tab2c != 8) {
        if (!AppList[i].pin) {
        tab2c++;}
    } else {
        if (tab2n == 20) break;
        if (!AppList[i].pin) {
            tab2.append('<div class="appitem" data-go="' + i + '" style="grid-area:' + tab2g[tab2n] + '"><img src="' + AppList[i].icon + '"/><p>' + AppList[i].name + '</p></div>')
            tab2n++;
        }
    }
}
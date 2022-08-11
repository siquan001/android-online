document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
reset();
function reset() {
    document.querySelector('.float-icon').onclick = function () {
        UI.message.setItem('add', true);
        finish();
        startPage('editor.html');
    }
    var no = document.querySelector('.notes-main ul');
    no.innerHTML='';
    var b = UI.storage.getItem('texts');
    if (b == undefined) {
        b = '[]';
    }
    b = JSON.parse(b);
    for (var i = 0; i < b.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-id', i);
        li.innerHTML = '<p class="title">' + b[i].title + '</p><p class="date">' + b[i].date + '</p>';
        no.append(li);
    }
    UI.ripple.calls(no.querySelectorAll('li'));
    no.querySelectorAll('li').forEach(function (e) {
        var ac;
        var ad = 0;
        e.onmousedown = a;
        e.ontouchstart = a2;
        function a(event) {
            var aa = document.createElement('ripple-span');
            this.append(aa);
            aa.style.left = event.offsetX + 'px';
            aa.style.top = event.offsetY + 'px';
            setTimeout(function () {
                aa.remove();
            }, 300)
            var events = event;
            ac = setTimeout(function () {
                events.preventDefault();
                ad = 1;
            }, 1000);
        }
        function a2(event) {
            var aa = document.createElement('ripple-span');
            this.append(aa);
            aa.style.left = event.targetTouches[0].offsetX + 'px';
            aa.style.top = event.targetTouches[0].offsetY + 'px';
            setTimeout(function () {
                aa.remove();
            }, 300)
            var events = event;
            ac = setTimeout(function () {
                events.cancelable=true;
                events.preventDefault();
                ad = 1;
            }, 650);
        }
        e.onmouseup = b;
        e.ontouchend = b;
        function b(event) {
            event.cancelable=true;
            clearTimeout(ac);
            if (ad == 0) {
                UI.message.setItem('add', false);
                UI.message.setItem('textid', parseInt(e.getAttribute('data-id')));
                finish();
                startPage('editor.html');
            } else {
                ad = 0;
                var ab = UI.storage.getItem('texts');
                var aab = JSON.parse(ab);
                var al = new UI.alert();
                al.setTitle('删除便签');
                al.setView('你确定要删除 ' + aab[parseInt(this.getAttribute('data-id'))].title + ' 吗？');
                al.setCenterBtn('取消');
                al.setRightBtn('确定', function () {
                    aab.splice(parseInt(this.getAttribute('data-id'))+1,1);
                    var abb=JSON.stringify(aab);
                    UI.storage.setItem('texts',abb);
                    al.hide();
                    reset();
                });
                al.show();
            }
        }
    });
}
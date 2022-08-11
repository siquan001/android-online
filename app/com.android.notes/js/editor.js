var isadd=UI.message.getItem('add');
if(isadd){
    document.querySelector('.float-ok-btn').onclick=function(){
        var a={
            title:document.getElementById('title').value,
            text:document.getElementById('text').value,
            date:getDate()
        }
        var b=UI.storage.getItem('texts');
        if(b==undefined){
            b='[]';
        }
        var c=JSON.parse(b);
        c.unshift(a);
        var d=JSON.stringify(c);
        UI.storage.setItem('texts',d);
        finish();
        startPage('index.html');
    }
}else{
    var textid=UI.message.getItem('textid');
    var b=JSON.parse(UI.storage.getItem('texts'));
    document.getElementById('title').value=b[textid].title;
    document.getElementById('text').value=b[textid].text;
    document.querySelector('.float-ok-btn').onclick=function(){
        var a={
            title:document.getElementById('title').value,
            text:document.getElementById('text').value,
            date:getDate()
        }
        var b=UI.storage.getItem('texts');
        if(b==undefined){
            b='[]';
        }
        var c=JSON.parse(b);
        c[textid]=a;
        var d=JSON.stringify(c);
        UI.storage.setItem('texts',d);
        finish();
        startPage('index.html');
    }
}
document.querySelector('.float-cancel-btn').onclick=function(){
    finish();
    startPage('index.html');
}
function getDate(){
    var a=new Date();
    return a.getFullYear()+'/'+(a.getMonth()+1)+'/'+a.getDate()+' '+a.getHours()+':'+a.getMinutes();
}
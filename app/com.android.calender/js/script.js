var today = new Date();
var nowxuanran=[today.getFullYear(),today.getMonth()];
function xuanran(y=today.getFullYear(), m=today.getMonth()) {
    var yyyy = y || today.getFullYear();
    var mm = m+1 || today.getMonth() + 1;
    if(yyyy<1900||(yyyy==1900&&mm==1)||yyyy>2100){
        alert('合法日期在1900/2到2100/12之间！');
        return false;
    }
    nowxuanran=[y,m];
    var firstDay = new Date(yyyy, mm - 1, 1);
    var fd_dd = firstDay.getDay();
    var monthslist = [31, isLeep(yyyy), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function isLeep(year) {
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                if (year % 400 == 0) {
                    return 29;
                }
            } else {
                return 29;
            }
        };
        return 28;
    }
    var thismonthdays = monthslist[mm - 1];
    var scope_text = document.querySelector('.calender-scope');
    scope_text.innerHTML = yyyy + '年' + mm + '月';
    var calender_table = document.querySelector('.calender-body table');
    calender_table.innerHTML='';
    for (var i = 0; i < 6; i++) {
        var tr = document.createElement('tr');
        calender_table.append(tr);
    }
    var tr1 = document.querySelector('.calender-body table tr');
    for (var i = 0; i < fd_dd; i++) {
        var td = document.createElement('td');
        td.classList.add('no');
        td.innerHTML = '<span class="date">' + (monthslist[mm - 2 < 0 ? 11 : mm - 2] - fd_dd + 1 + i) + '</span><span class="nongli">' + (calendar.solar2lunar(mm - 2 < 0 ? yyyy - 1 : yyyy, mm - 2 < 0 ? 11 : mm - 1, monthslist[mm - 2 < 0 ? 11 : mm - 2] - fd_dd + 1 + i).IDayCn||'') + '</span>';
        tr1.append(td);
    }
    for (var i = 0; i < 7 - fd_dd; i++) {
        var td = document.createElement('td');
        td.innerHTML = '<span class="date">' + (i + 1) + '</span><span class="nongli">' + (calendar.solar2lunar(yyyy, mm, i + 1).IDayCn) + '</span>';
        tr1.append(td);
    }
    var tr2 = document.querySelectorAll('.calender-body table tr')[1];
    for (var i = 0; i < 7; i++) {
        var td = document.createElement('td');
        td.innerHTML = '<span class="date">' + (i + 1 + 7 - fd_dd) + '</span><span class="nongli">' + (calendar.solar2lunar(yyyy, mm, i + 1 + 7 - fd_dd).IDayCn) + '</span>';
        tr2.append(td);
    }
    var tr3 = document.querySelectorAll('.calender-body table tr')[2];
    for (var i = 0; i < 7; i++) {
        var td = document.createElement('td');
        td.innerHTML = '<span class="date">' + (i + 1 + 7 - fd_dd + 7) + '</span><span class="nongli">' + (calendar.solar2lunar(yyyy, mm, i + 1 + 7 - fd_dd + 7).IDayCn) + '</span>';
        tr3.append(td);
    }
    var tr4 = document.querySelectorAll('.calender-body table tr')[3];
    for (var i = 0; i < 7; i++) {
        var td = document.createElement('td');
        td.innerHTML = '<span class="date">' + (i + 1 + 7 - fd_dd + 14) + '</span><span class="nongli">' + (calendar.solar2lunar(yyyy, mm, i + 1 + 7 - fd_dd + 14).IDayCn) + '</span>';
        tr4.append(td);
    }
    var tr5 = document.querySelectorAll('.calender-body table tr')[4];
    for (var i = 0; i < (thismonthdays - (28 - fd_dd) > 7 ? 7 : thismonthdays - (28 - fd_dd)); i++) {
        var td = document.createElement('td');
        td.innerHTML = '<span class="date">' + (i + 1 + 7 - fd_dd + 21) + '</span><span class="nongli">' + (calendar.solar2lunar(yyyy, mm, i + 1 + 7 - fd_dd + 21).IDayCn) + '</span>';
        tr5.append(td);
    }
    var tr6 = document.querySelectorAll('.calender-body table tr')[5];

    if (document.querySelectorAll('td').length - document.querySelectorAll('td.no').length == thismonthdays) {
        var tr5tds = tr5.querySelectorAll('td').length;
        for (var i = 0; i < 7 - tr5tds; i++) {
            var td = document.createElement('td');
            td.classList.add('no');
            td.innerHTML = '<span class="date">' + (i + 1) + '</span><span class="nongli">' + (calendar.solar2lunar(mm > 11 ? yyyy + 1 : yyyy, mm > 11 ? 1 : mm + 1, 1 + i).IDayCn||'') + '</span>';
            tr5.append(td);
        }
        for (var i = 0; i < 7; i++) {
            var td = document.createElement('td');
            td.classList.add('no');
            td.innerHTML = '<span class="date">' + (i + 1 + 7 - tr5tds) + '</span><span class="nongli">' + (calendar.solar2lunar(mm > 11 ? yyyy + 1 : yyyy, mm > 11 ? 1 : mm + 1, 1 + i + 7 - tr5tds).IDayCn||'') + '</span>';
            tr6.append(td);
        }
    } else {
        for (var i = 0; i < thismonthdays - (35 - fd_dd); i++) {
            var td = document.createElement('td');
            td.innerHTML = '<span class="date">' + (i + 1 + 7 - fd_dd + 28) + '</span><span class="nongli">' + (calendar.solar2lunar(yyyy, mm, i + 1 + 7 - fd_dd + 28).IDayCn) + '</span>';
            tr6.append(td);
        }
        var tr6tds = tr6.querySelectorAll('td').length;
        for (var i = 0; i < 7 - tr6tds; i++) {
            var td = document.createElement('td');
            td.classList.add('no');
            td.innerHTML = '<span class="date">' + (i + 1) + '</span><span class="nongli">' + (calendar.solar2lunar(mm > 11 ? yyyy + 1 : yyyy, mm > 11 ? 1 : mm + 1, 1 + i).IDayCn||'') + '</span>';
            tr6.append(td);
        }
    }
    document.querySelectorAll('td').forEach(function(e){
        e.onclick=function(){
            document.querySelectorAll('td').forEach(function(e){
                e.classList.remove('select');
            });
            this.classList.add('select');
        }
    });
    document.querySelectorAll('td.no').forEach(function(e){
        e.onclick=function(){
            if(nowxuanran[1]+1>11){
                nowxuanran[0]++;
                nowxuanran[1]=0;
                xuanran(nowxuanran[0],nowxuanran[1]);
            }else{
                nowxuanran[1]++;
                xuanran(nowxuanran[0],nowxuanran[1]);
            }
        }
    });
    tr1.querySelectorAll('td.no').forEach(function(e){
        e.onclick=function(){
            if(nowxuanran[1]-1<0){
                nowxuanran[0]--;
                nowxuanran[1]=11;
                xuanran(nowxuanran[0],nowxuanran[1]);
            }else{
                nowxuanran[1]--;
                xuanran(nowxuanran[0],nowxuanran[1]);
            }
        }
    });
}
document.querySelector('.calender-toggle .last').onclick=function(){
    if(nowxuanran[1]-1<0){
        nowxuanran[0]--;
        nowxuanran[1]=11;
        xuanran(nowxuanran[0],nowxuanran[1]);
    }else{
        nowxuanran[1]--;
        xuanran(nowxuanran[0],nowxuanran[1]);
    }
}
document.querySelector('.calender-toggle .next').onclick=function(){
    if(nowxuanran[1]+1>11){
        nowxuanran[0]++;
        nowxuanran[1]=0;
        xuanran(nowxuanran[0],nowxuanran[1]);
    }else{
        nowxuanran[1]++;
        xuanran(nowxuanran[0],nowxuanran[1]);
    }
}
setNow();
function setNow(){
    xuanran();
    var a=document.querySelectorAll('td');
    for(var i=0;i<a.length;i++){
        if(!a[i].classList.contains('no')&&a[i].querySelector('span.date').innerHTML==today.getDate().toString()){
            a.forEach(function(e){
                e.classList.remove('select');
            });
            a[i].classList.add('select');
            break;
        }
    }
}
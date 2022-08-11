document.onmousedown=function(e){
    var y=e.pageY,ny;
    document.onmousemove=function(e){
        e.preventDefault();
        ny=e.pageY;
        document.querySelector('.body').style.top=(ny-y>0?0:ny-y)+'px';
    };
    document.onmouseup=function(){
        if(ny-y>-100){
            document.querySelector('.body').style.transition='all .3s';
            document.querySelector('.body').setAttribute('style','');
        }else{
            document.querySelector('.body').style.transition='all .3s';
            document.querySelector('.body').style.top='-100%';
            setTimeout(function() {
            document.querySelector('.body').style.top='0';
                parent.lockframe.hide();
                document.querySelector('.body').style.transition='none';
            }, 300);

        }
        document.onmousemove=null;
        document.onmouseup=null;
    }
}
document.ontouchstart=function(e){
    var y=e.targetTouches[0].pageY,ny;
    document.ontouchmove=function(e){
        e.preventDefault();
        ny=e.targetTouches[0].pageY;
        document.querySelector('.body').style.top=(ny-y>0?0:ny-y)+'px';
    };
    document.ontouchend=function(){
        if(ny-y>-100){
            document.querySelector('.body').style.transition='all .3s';
            document.querySelector('.body').setAttribute('style','');
        }else{
            document.querySelector('.body').style.transition='all .3s';
            document.querySelector('.body').style.top='-100%';
            setTimeout(function() {
                parent.lockframe.hide();
                document.querySelector('.body').style.transition='none';
                document.querySelector('.body').style.top='0';
            }, 300);

        }
        document.ontouchmove=null;
        document.ontouchend=null;
    }
}

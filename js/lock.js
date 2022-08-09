document.onmousedown=function(e){
    var y=e.pageY,ny;
    document.onmousemove=function(e){
        e.preventDefault();
        ny=e.pageY;
        parent.document.querySelector('iframe#lock').style.top=(ny-y>0?0:ny-y)+'px';
    };
    document.onmouseup=function(){
        if(ny-y>-100){
            parent.document.querySelector('iframe#lock').style.transition='all .3s';
            parent.document.querySelector('iframe#lock').setAttribute('style','');
        }else{
            parent.document.querySelector('iframe#lock').style.transition='all .3s';
            parent.document.querySelector('iframe#lock').style.top='-100%';
            setTimeout(function() {
            parent.document.querySelector('iframe#lock').style.top='0';
                parent.document.querySelector('iframe#lock').style.display='none';
                parent.document.querySelector('iframe#lock').style.transition='none';
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
        parent.document.querySelector('iframe#lock').style.top=(ny-y>0?0:ny-y)+'px';
    };
    document.ontouchend=function(){
        if(ny-y>-100){
            parent.document.querySelector('iframe#lock').style.transition='all .3s';
            parent.document.querySelector('iframe#lock').setAttribute('style','');
        }else{
            parent.document.querySelector('iframe#lock').style.transition='all .3s';
            parent.document.querySelector('iframe#lock').style.top='-100%';
            setTimeout(function() {
                parent.document.querySelector('iframe#lock').style.display='none';
                parent.document.querySelector('iframe#lock').style.transition='none';
                parent.document.querySelector('iframe#lock').style.top='0';
            }, 300);

        }
        document.ontouchmove=null;
        document.ontouchend=null;
    }
}

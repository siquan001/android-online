!function(){
    function A(){
        return document;
    }
    function a(e,t){
        if(t==undefined){
            parent.startPage(B.c,e);
        }else{
            parent.startPage(e,t);
        }
    }
    A.fn={
        version:'1.0.0',
        init(c={}){
            if(typeof c!='object'||Array.isArray(c)){}else{
                B.a=c.topbarColor||'#fff';
                B.b=c.footerColor||'#fff';
                B.c=c.package||'';
            }
            var a=document.body.innerHTML;
            document.body.innerHTML='<div class="quick-ui-topbar"></div><div class="ui-app-body">'+a+'</div><div class="quick-ui-footer"></div>';
            var b =document.querySelector('.quick-ui-topbar');
            b.style.backgroundColor=B.a;
            var d =document.querySelector('.quick-ui-footer');
            d.style.backgroundColor=B.b;
            document.body.style.height=window.innerHeight+'px';
        }
    };
    A.ripple={
        call(ele){
            ele.style.position='relative'
            ele.style.overflow='hidden'
            ele.onmousedown=function(e) {
                var aa=document.createElement('ripple-span');
                ele.append(aa);
                aa.style.left=e.offsetX+'px';
                aa.style.top=e.offsetY+'px';
                setTimeout(function(){
                    aa.remove();
                },300)
            }
            ele.ontouchstart=function(e) {
                var aa=document.createElement('ripple-span');
                ele.append(aa);
                aa.style.left=e.targetTouches[0].offsetX+'px';
                aa.style.top=e.targetTouches[0].offsetY+'px';
                setTimeout(function(){
                    aa.remove();
                },300)
            }
        },
        calls(nodelist){
            nodelist.forEach(element => {
                element.style.position='relative'
                element.style.overflow='hidden'
                element.onmousedown=function(e) {
                    var aa=document.createElement('ripple-span');
                    element.append(aa);
                    aa.style.left=e.offsetX+'px';
                aa.style.top=e.offsetY+'px';
                setTimeout(function(){
                        aa.remove();
                    },300)
                }
                element.ontouchstart=function(e) {
                    var aa=document.createElement('ripple-span');
                    element.append(aa);
                    aa.style.left=e.targetTouches[0].offsetX+'px';
                aa.style.top=e.targetTouches[0].offsetY+'px';
                setTimeout(function(){
                        aa.remove();
                    },300)
                }
            });
            
        }
    }
    var B={
        a:'#fff',
        b:'#fff',
        c:''
    }
    window.UI=A;
    window.onresize=function(){
        document.body.style.height=window.innerHeight+'px';
    }
    window.startPage=a;
    window.finish=function(){
        parent.back_key.click();
    }
}();
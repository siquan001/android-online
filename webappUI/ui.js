!function(){
    var ab='android-online-appdata-storage';
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
        version:'1.2.0',
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
            if(localStorage.getItem(ab)==undefined){
                localStorage.setItem(ab,'{}');
            }
        }
    };
    A.storage={
        setItem(e,t){
            var a=JSON.parse(localStorage.getItem(ab));
            if(!a[B.c]){
                a[B.c]={};
            };
            a[B.c][e]=t;
            localStorage.setItem(ab,JSON.stringify(a));
        },
        getItem(e){
            var a=JSON.parse(localStorage.getItem(ab));
            if(!a[B.c]){
                a[B.c]={};
            };
            return a[B.c][e];
        },
        removeItem(e){
            var a=JSON.parse(localStorage.getItem(ab));
            if(!a[B.c]){
                a[B.c]={};
            };
            delete a[B.c][e];
            localStorage.setItem(ab,JSON.stringify(a));
        }
    }
    A.message={
        setItem(e,t){
            var a=parent.window.message;
            if(!a[B.c]){
                a[B.c]={};
            };
            a[B.c][e]=t;
            parent.window.message=a;
        },
        getItem(e){
            var a=parent.window.message;
            return a[B.c][e];
        },
        removeItem(e){
            var a=parent.window.message;
            if(!a[B.c]){
                a[B.c]={};
            };
            delete a[B.c][e];
            parent.window.message=a;
        }
    }
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
    A.toast={
        show(e,t){
            parent.showToast(e,t);
        },
        showAsCustom(e,t){
            parent.showCustomToast(e,t);
        }
    }
    A.alert=function(){
        this.view='';
        this.btns=new Array(3);
        this.btnevents=new Array(3);
        this.title=null;
        this.ele=null;
    }
    A.alert.prototype={
        setTitle(title){
            this.title=title;
        },
        setView(view){
            this.view=view;
        },
        setLeftBtn(btn,fn){
            this.btns[0]=btn;
            this.btnevents[0]=fn;
        },
        setCenterBtn(btn,fn){
            this.btns[1]=btn;
            this.btnevents[1]=fn;
        },
        setRightBtn(btn,fn){
            this.btns[2]=btn;
            this.btnevents[2]=fn;
        },
        getTitle(){
            return this.title;
        },
        getView(){
            return this.view;
        },
        show(){
            var isa=this;
            this.ele=document.createElement('div');
            this.ele.classList.add('alert-build');
            this.ele.innerHTML='<div class="alert-bg"></div><div class="alert-main"><div class="alert-topbar"></div><div class="alert-view"></div><div class="alert-btns"></div></div>';
            document.body.append(this.ele);
            this.ele.querySelector('.alert-main').style.animation='alert .3s';
            this.ele.querySelector('.alert-topbar').innerHTML=this.title;
            this.ele.querySelector('.alert-view').innerHTML=this.view;
            if(this.btns[0]){
                this.ele.querySelector('.alert-btns').innerHTML+='<div class="btn left">'+this.btns[0]+'</div>';
                this.ele.querySelector('.alert-btns .left.btn').onclick=this.btnevents[0]||function(){
                    isa.hide();
                }
            };
            if(this.btns[1]){
                this.ele.querySelector('.alert-btns').innerHTML+='<div class="btn center">'+this.btns[1]+'</div>';
                this.ele.querySelector('.alert-btns .center.btn').onclick=this.btnevents[1]||function(){
                    isa.hide();
                }
            };
            if(this.btns[2]){
                this.ele.querySelector('.alert-btns').innerHTML+='<div class="btn right">'+this.btns[2]+'</div>';
                this.ele.querySelector('.alert-btns .right.btn').onclick=this.btnevents[2]||function(){
                    isa.hide();
                }
            };
            UI.ripple.calls(this.ele.querySelectorAll('.alert-btns .btn'));
            if(this.ele.querySelectorAll('.alert-btns .btn').length==0){
                this.ele.querySelector('.alert-btns').style.height='0px';
            }
            this.ele.querySelector('.alert-bg').style.opacity='1';
            this.ele.querySelector('.alert-bg').onclick=function(){
                isa.hide()
            }
        },
        hide(){
            var isa=this;
            this.ele.querySelector('.alert-main').style.animation='alert-d .3s';
            this.ele.querySelector('.alert-bg').style.opacity='0';
            setTimeout(function() {
                isa.ele.remove();
                isa.ele=null;
            }, 300);
           
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
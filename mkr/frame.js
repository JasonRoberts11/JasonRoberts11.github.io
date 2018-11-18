function Frame(label,color,layout,expand,p){
                this.padding=p;
                this.label=label;
                this.color=color;
                this.layout=layout;
    this.img=null;
    this.x=0;
    this.y=0;
    this.xs=0;
    this.ys=0;
                /*
                Layout:
                    "v";
                    "h";
                */
                this.children=[];
                /*
                Expand:
                    "shrink";
                    "%50";
                    "p50";
                    "a50";
                    "even";
                */
                this.expand=expand;
    
    
                this.render=function(x,y,xs,ys,n){
                    this.x=x;this.y=y;this.xs=xs;this.ys=ys;
                    ctx.scale(1,1);
                    ctx.lineWidth=this.padding/2;
                    ctx.strokeStyle=colors[this.color][0];
                    ctx.fillStyle=colors[this.color][1];
                    ctx.fillRect(x,y,xs,ys);
                    ctx.strokeRect(x,y,xs,ys);
                    ctx.fillStyle="#000000";
                    ctx.fillText(this.label,x+xs/2,y+10);
                    var l = this.children.length;
                    var p = this.padding;
                    var dd=xs-p*(l+1);
                    var dz=ys-p*2;
                    if(this.layout=="v"){
                    dd=ys-p*(l+1);
                    dz=xs-p*2;
                    }
                    var dt=dd;
                    var evencount=0;
                    for(var i = 0; i<l;i++){
                        var c = this.children[i];
                        if(c.expand!="even"&&c.expand!="shrink"){
                            var ter = c.expand.slice(0,1); 
                            var rest = c.expand.slice(1,c.expand.length);
                            if(ter=="%"){
                                dt-=(parseInt(rest)/100.0)*dd;
                            }
                            if(ter=="p"){
                                dt-=(parseInt(rest));
                            }
                            if(ter=="a"){
                                dt-=(parseInt(rest)/100.0)*dz;
                            }
                        }
                        if(c.expand=="even"){
                            evencount++;
                        }
                    }
                    var evend = dt/evencount;
                    var d = 0;
                    for(var i = 0; i<l;i++){
                        var c = this.children[i];
                        if(c.expand=="even"){
                            if(this.layout=="v"){
                                c.render(x+p,y+d+p,xs-2*p,evend,i);
                                d+=evend;
                            }
                            if(this.layout=="h"){
                                c.render(x+d+p,y+p,evend,ys-2*p,i);
                                d+=evend;
                            }
                        }else if(c.expand!="shrink"){
                            var ter = c.expand.slice(0,1); 
                            var rest = c.expand.slice(1,c.expand.length);
                            var ek=0;
                            if(ter=="%"){
                                //c.render(x+d+p,y+p,(parseInt(rest)/100.0)*dd,ys-2*p,i);
                                ek=(parseInt(rest)/100.0)*dd;
                            }
                            if(ter=="p"){
                                //c.render(x+d+p,y+p,(parseInt(rest)),ys-2*p,i);
                                ek=(parseInt(rest));
                            }
                            if(ter=="a"){
                                //c.render(x+d+p,y+p,(parseInt(rest)/100.0)*dz,ys-2*p,i);
                                ek=(parseInt(rest)/100.0)*dz;
                            }  
                            if(this.layout=="h"){
                                c.render(x+d+p,y+p,ek,ys-2*p,i);
                                d+=ek;
                            }
                            if(this.layout=="v"){
                                c.render(x+p,y+d+p,xs-2*p,ek,i);
                                d+=ek;
                            } 
                        }
                        d+=p;
                    }
                }
                this.add=function(frm){
                    this.children.push(frm);
                }
                this.mouse=function(){
                    //console.log(this.label);
                    var x=this.x;
                    var y=this.y;
                    var xs=this.xs;
                    var ys=this.ys;
                    if(mouseX>x&&mouseX<x+xs&&mouseY>y&&mouseY<y+ys){
                        this.mouseover(mouseX-x,mouseY-y);
                        for(var i=0;i<this.children.length;i++){
                            this.children[i].mouse();
                        }
                    }
                }
                this.mouseover=function(x,y){};
            }


var colors=[
            ["#BB0000","#FF4444"],
            ["#BBBB00","#FFFF00"],
            ["#00CA00","#00FF00"],
            ["#00CACA","#00FFFF"],
            ["#0000CA","#0000FF"],
            ["#CA00CA","#FF00FF"],
            ["#AAAAAA","#CCCCCC"],
            ]
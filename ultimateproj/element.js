 function element(i,type,xpos,ypos){
                this.x = xpos;
                this.y = ypos;
				this.close = false;
     this.node=false;
				this.lx=xpos;
				this.ly=ypos;
				this.xv=2;
				this.yv=0;
				this.glow=false;
                this.absx = xpos;
                this.absy = ypos;
                this.type = type;
                this.js=null;
                this.parent = null;
                this.children = [];
                this.id = i;
                this.color = 0;
                this.tint =1;
				this.label="";
                this.bold = 1;
                this.layer=0;
                this.size = defsize;
                //this.open = true;
     this.sleept = null;
                this.connections = [];
     this.create=function(){
         if(this.js!=null&&this.js.gen!=null){
             var res=this.js.gen;
             for(var i = 0;i<res.length;i++){
                 k = new element(0,1,mousex,mousey);
                 k.label="raw";
                 k.color="3";
                 k.js = JSON.parse('{"name":"raw","color":3,"text":"'+res[i]+'"}');
                 k.x=Math.sin(2*3.1415*i/res.length-0.2)*15;
                 k.y=-Math.cos(2*3.1415*i/res.length-0.2)*15;
                 k.parent=this;
                 this.children.push(k);
                 
             }
             this.close=true;
         }
          if(this.js!=null&&this.js.gent!=null){
             var res=this.js.gent;
             for(var i = 0;i<res.length;i++){
                 var k = new element(0,1,mousex,mousey);
                 k.label= res[i].name;
                 k.color= res[i].color;
                 k.js = res[i];
                 k.x=Math.sin(2*3.1415*i/res.length-0.2)*15;
                 k.y=-Math.cos(2*3.1415*i/res.length-0.2)*15;
                 k.parent=this;
                
                 k.create();
                 findVars();
                 if(res[i].name=="var"){
                     k.js.vname= res[i].vname+vars.length;
                 }
				 if(res[i].name=="Sprites"){
					
                     k.js.sname= res[i].sname+sprites.length;
                 }
                  this.children.push(k);
             }
             this.close=true;
         }
     }
                this.render = function(){
                    var t = this.tint;
                    var s = this.bold;
					if(this.glow){
                        t+=1;
					}
                    if(this==maine){
                        t=1;
                        s=1;
                    }
                    ctx.fillStyle= tint(colorblocks[this.color],t);
                    ctx.strokeStyle=tint(colorblocks[this.color],0.6*s);
                    ctx.lineWidth = s*2;
					if(this.node&&this.parent!=null){var er=0.2;
                        var pa = this.parent;
                        var d = Math.atan2(this.absy-pa.absy,this.absx-pa.absx);
					ctx.beginPath();
					ctx.moveTo(pa.absx+Math.cos(d)*pa.size,pa.absy+Math.sin(d)*pa.size);
					ctx.lineTo(this.absx-Math.cos(d)*this.size,this.absy-Math.sin(d)*this.size);
                    ctx.lineTo(this.absx-Math.cos(d+er)*(this.size+10),this.absy-Math.sin(d+er)*(this.size+10));
					ctx.stroke();
                    }
                    ctx.beginPath();
                    ctx.arc(this.absx,this.absy,this.size,0,2*Math.PI);
                    ctx.fill();
                    ctx.stroke();
					
					ctx.font="10px Arial";
					ctx.textAlign="center";
					ctx.textBaseline="mid";
					
                    ctx.fillStyle = tint(colorblocks[this.color],0);
					ctx.fillText(this.label,this.absx,this.absy+this.size-10);
					if(this.js!=null&&this.js.name=="raw"){
                        ctx.fillText(this.js.text,this.absx,this.absy);
                    }
					if(this.js!=null&&this.js.name=="img"){
                        //ctx.fillText(this.js.text,this.absx,this.absy);
						if(this.js.image!=null){
							ctx.drawImage(this.js.image,this.absx,this.absy);
						}
                    }
					if(this.js!=null&&(this.js.name=="OnKeyPress"||this.js.name=="OnKeyRelease"||this.js.name=="KeyDown")){
                        ctx.fillText(this.js.key,this.absx,this.absy-this.size+10);
                    }
					if(this.js!=null&&(this.js.name=="OnMouseClick"||this.js.name=="OnMouseRelease"||this.js.name=="MouseDown")){
                        ctx.fillText(this.js.button,this.absx,this.absy-this.size+10);
                    }
					if(this.js!=null&&this.js.name=="Function"){
                        ctx.fillText(this.js.fname,this.absx,this.absy-this.size+10);
                        ctx.fillStyle= tint(colorblocks[this.color],1);
                            ctx.strokeStyle=tint(colorblocks[this.color],0.6);
                        if(dist(mousex,mousey,this.absx+this.size,this.absy,10)){
                            ctx.fillStyle= tint(colorblocks[this.color],1.4);
                            ctx.strokeStyle=tint(colorblocks[this.color],0.6);
                            if(mousepressed==1){
                                dragged=new element(0,1,mousex,mousey);
								dragged.label=this.js.fname;
                                dragged.js=JSON.parse('{"name":"test","color":6}');
                                dragged.js.name=this.js.fname;
                                dragged.color=5;
                                dragged.create;
								dragged.js.fun=true;
                                mousepressed=2;
                            }
                        }
                          ctx.beginPath();
                    ctx.arc(this.absx+this.size,this.absy,10,0,2*Math.PI);
                    ctx.fill();
                    ctx.stroke();                   
                    }
                    if(this.js!=null&&this.js.name=="var"){
                        ctx.fillText(this.js.vname,this.absx,this.absy-this.size+10);
                        ctx.fillStyle= tint(colorblocks[this.color],1);
                            ctx.strokeStyle=tint(colorblocks[this.color],0.6);
                        if(dist(mousex,mousey,this.absx+this.size,this.absy,10)){
                            ctx.fillStyle= tint(colorblocks[this.color],1.4);
                            ctx.strokeStyle=tint(colorblocks[this.color],0.6);
                            if(mousepressed==1){
                                dragged=new element(0,1,mousex,mousey);
								dragged.label=this.js.vname;
                                dragged.js=JSON.parse('{"name":"test","color":6}');
                                dragged.js.name=this.js.vname;
                                dragged.color=5;
                                dragged.create;
								dragged.js.vun=true;
                                mousepressed=2;
                            }
                        }
                          ctx.beginPath();
                    ctx.arc(this.absx+this.size,this.absy,10,0,2*Math.PI);
                    ctx.fill();
                    ctx.stroke();                   

                    }
					if(!this.close){
                    for(var i =0;i<this.children.length;i++){
                        if(this.children[i].close)
                        this.children[i].render();
                    }
                    for(var i =0;i<this.children.length;i++){
                        if(!this.children[i].close)
                        this.children[i].render();
                    }
                    }else{
                        ctx.font="20px Arial";
						ctx.textAlign="center";
						ctx.textBaseline="mid";
                        ctx.fillStyle = tint(colorblocks[this.color],0);
						ctx.fillText(this.children.length,this.absx,this.absy);
						for(var i =0;i<this.children.length;i++){
                        	if(this.children[i].node)
                        	this.children[i].render();
						}
					}
                    
                };
                this.add = function(e){
                    this.children.push(e);
                };
				this.getSelection = function(){
					if(dist(this.absx,this.absy,mousex,mousey,this.size)){
						selected=this;
					}
					for(i = 0;i<this.children.length;i++){
                        if((!this.close)||this.children[i].node)
						this.children[i].getSelection();
					}
				}
				this.phys=function(){
					var p=this.parent;
					//If collides with parent
					if(!this.node)
					if(dist2(this.absx,this.absy,p.absx,p.absy)+(this.size)+ddde*0.5>p.size){
						//var r=Math.atan2(this.yv,this.xv);
						var b=Math.atan2((this.absy-p.absy),(this.absx-p.absx));
						//var g=r-b;
						this.xv -= Math.cos(b)*0.1;
						this.yv -= Math.sin(b)*0.1;
					}
					//If collides with others
					for(var i=0;i<p.children.length-1;i++){
						c = p.children[i];
						if(c!=this){
						if(dist2(this.absx,this.absy,c.absx,c.absy)<c.size+this.size){
							//console.log("collide");
						//var r=Math.atan2(this.yv,this.xv);
						var b=Math.atan2((this.absy-c.absy),(this.absx-c.absx));
						//var g=r-b;
						this.xv += Math.cos(b)*0.1;
						this.yv += Math.sin(b)*0.1;
						c.xv -= Math.cos(b)*0.1;
						c.yv -= Math.sin(b)*0.1;
					}}
					}
					this.fakeMoveChild(this.xv,this.yv);
					
					this.absx+=this.xv;
					this.absy+=this.yv;
					this.xv+=(this.absx-this.lx)*-0.001;
					this.yv+=(this.absy-this.ly)*-0.001;
					this.xv*=0.9;
					this.yv*=0.9;
					
					this.childPhys();
					this.updateSize();
					
				}
				this.fakeMoveChild=function(xv,yv){
					for(var i=0;i<this.children.length;i++){
					this.children[i].absx+=xv;
					this.children[i].absy+=yv;
					this.children[i].lx+=xv;
					this.children[i].ly+=yv;
					this.children[i].fakeMoveChild(xv,yv);
					}
				}
				this.childPhys=function(){
					for(i = 0;i<this.children.length;i++){
						this.children[i].phys();
					}
				}
				this.move = function(dx,dy){
					this.absx += dx;
					this.absy += dy;
					for(var i =0;i<this.children.length;i++){
                        this.children[i].updatePos();
                    } 
				}
                this.togClose=function(){
                    if(this.close){
                        this.close=false;
                        this.updateSize();
                    }else{
                        this.close=true;
                    }
                }
				this.shrinkWrap=function(){
                    if(!this.close)
					for(var i =0;i<this.children.length;i++){
                        this.children[i].shrinkWrap();
                    } 
				}
                this.findFunctions=function(){
                    for(var i =0;i<this.children.length;i++){
						var cr = this.children[i];	
					//console.log(cr.label);
						if (cr.label=="Function"){
							functions.push(cr);
							//console.log("Initialized");
						}
                    }
                    
                }
				
                 this.findVars=function(){
                    for(var i =0;i<this.children.length;i++){
						var cr = this.children[i];	
					//console.log(cr.label);
						if (cr.label=="var"){
							vars.push(cr);
							//console.log("Initialized");
						}else{
                            cr.findVars();
                        }
                    }
                    
                }
				  this.findSprites=function(){
                    for(var i =0;i<this.children.length;i++){
						var cr = this.children[i];	
					//console.log(cr.label);
						if (cr.label=="Sprite"){
							sprites.push(cr);
							//console.log("Initialized");
						}else{
                            cr.findSprites();
                        }
                    }
                    
                }
                this.dofntoall=function(fn){
                    eval(fn);
                    for(var i =0;i<this.children.length;i++){
                        this.children[i].dofntoall(fn);
                    } 
                }
                
				this.findFunctionByName=function(name){
					ffunction=(null);
                    for(var i =0;i<this.children.length;i++){
						var cr = this.children[i];	
					//console.log(cr.label);
						if (cr.js.fname==name){
							ffunction=(cr);
							//console.log("Initialized");
						}
                    }
                    
                }
				
                this.findVarByName=function(name){
                    vvar=null;
					var er = this.findSiblingByVar(name);
                    if(er!=null){
                        //console.log("success");
                        vvar =er;
                    }else{
                        var dr = this.findSiblingByName("params",0);
                        if(dr!=null){
                            
                            if(dr.children.length>0){
                            dr.children[0].findVarByName(name);
                            //console.log("foundparams");
                            }
                        }else
                        if(this.parent!=null){
                            this.parent.findVarByName(name);
                        }
                    }
                }
                this.findSiblingByName=function(name,ind){
                    var p = this.parent;
                    var found = null;
                    var er = 0;
                    if(p!=null){
                    for(var i=0;i<p.children.length;i++)
                    {
                        if(p.children[i].label == name&&p.children[i]!=this){
                            if(er<=ind){
                            found=p.children[i];
                            }
                            er++;
                            //console.log("found sibling : " + name);
                        }
                    }
                    }
                    return found;
                }
                this.findSiblingByVar=function(vname){
                    var p = this.parent;
                    var found = null;
                    if(p!=null){
                    for(var i=0;i<p.children.length;i++)
                    {
                        //console.log(p.children[i].vname);
                        if(p.children[i].js.vname == vname){
                            found=p.children[i];
                        }
                    }
                    }
                    return found;
                }
				this.updatePos = function(){
					if(this.parent!=null){
					this.absx = this.parent.absx + this.x;
					this.absy = this.parent.absy + this.y;}
					this.lx= this.absx;
					this.ly=this.absy;
					for(var i =0;i<this.children.length;i++){
                        this.children[i].updatePos();
                    } 
				}
                this.reOrder=function(){
                    var e = [];
                    for(var i =0;i<this.children.length;i++){
                        c = this.children[i];
                    e.push([c,Math.atan2(c.y,c.x)]);
                    }
                    e.sort(sf);
                    var d = [];
                    for(var i =0;i<e.length;i++){
                        d.push(e[i][0]);
                    }
                    this.children=d;
                    function sf(a,b){
                        if(a[1]===b[1]){
                            return 0;
                        }
                        else{
                            return(a[1]<b[1])?-1:1;
                        }
                    }
                
                }
                this.parse=function(){
                    if(this.js.name=="raw"){
                        par+=this.js.text;
                    }else{
                    par+=this.js.start;
                    this.parseChildren();
                    par+=this.js.end;
                }
                }
                this.parseChildren=function(){
                    for(var i =0;i<this.children.length;i++){
                        this.children[i].parse();
                    } 
                }
                this.updateSize=function(){
                    //this.parent.size=dist2(this.absx,this.absy,this.parent.absx,this.parent.absy)+(this.size)+ddde;
                    if(!this.close){
                    var maxsize = defsize;
                    var chose=-1;
                    for(var i =0;i<this.children.length;i++){
                        this.children[i].updateSize();
                        var c = this.children[i];
						if(!c.node)
                        if(dist2(this.absx,this.absy,c.absx,c.absy)+(c.size)+ddde>maxsize){
                           maxsize=dist2(this.absx,this.absy,c.absx,c.absy)+(c.size)+ddde;
                            
                           }
                    } 
                    this.size=maxsize;
                    }else{
                        this.size=defsize;
                    }
                }
                this.updateChildSize = function(){
                    for(var i =0;i<this.children.length;i++){
                        this.children[i].updateSize();
                    } 
                }
				this.findParent = function(e){
					parent=null;
					e.recFindParent(this);
					if(parent!=null){
						this.parent = parent;
						parent.children.push(this);
						this.x = -this.parent.absx+this.absx;
						this.y = -this.parent.absy+this.absy;
						this.lx = this.absx;
						this.ly = this.absy;
					}
				}
				this.recFindParent = function(c){
					if(this!=c){
					   if(dist(this.absx,this.absy,mousex,mousey,(this.size))){
					   parent = this;
                       }
                        for(var i =0;i<this.children.length;i++){
                            if((!this.close)||(this.children[i].node))
                        this.children[i].recFindParent(c);
                    	}
					}
				}
				this.removeParent = function(){
					this.parent.children.splice(this.parent.children.indexOf(this),1);
					this.parent = null;
				}
				
				this.orphanize=function(){
					this.parent=null;
					for(var i =0;i<this.children.length;i++){
                        this.children[i].orphanize();
                    } 
				}
				this.deOrphanize=function(){
					for(var i =0;i<this.children.length;i++){
						this.children[i].parent = this;
                        this.children[i].deOrphanize();
                    } 
				}
				this.parseToJSON=function(){
					var robj=this.makeJson();
					for(var i =0;i<this.children.length;i++){
						robj.children.push(this.children[i].parseToJSON());
                    }
					//prev.children.push(robj);
					//console.log(JSON.stringify(robj));
					return robj;
				}
				this.makeJson= function(){
					var obj = new jsobj();
					obj.x=this.x;
					obj.y=this.y;
					obj.size=this.size;
					obj.js=this.js;
					obj.color =this.color;
					obj.label =this.label;
					obj.close = this.close;
                    obj.node=this.node;
					return obj;
				}
				this.readJson = function(obj){
					this.x = obj.x;
					this.y = obj.y;
					this.size = obj.size;
					this.js = obj.js;
					this.color=obj.color;
					this.label=obj.label;
					this.close = obj.close;
                    this.node=obj.node;
					if(this.js!=null){
						if(this.js.image!=null){
							var img = new Image();
							img.src=this.js.imgurl;
							this.js.image=img;
						}
					}
					for(var i =0;i<obj.children.length;i++){
						var ch = new element(null,1,1,1);
						ch.readJson(obj.children[i]);
						this.children.push(ch);
                    }
				}
				this.run = function(){
					//console.log("label:"+this.label);
                    ///TODO//////////////////////////////////////////////////////////////////////
  
					//this.ret = null;
                    if(this.label=="raw"){
                        this.ret = this.js.text;
                    }
					var cont = true;
					if(this.js.fun==true){
						
                        //ffunction.setEnable();
						
					}else if(this.label=="do"&&this.parent.label=="Delay"){
						 cont=false;
						this.goBack(null);
						var teim = this.parent.children[0].ret;
						//console.log(teim);
						 if(this.children.length>0){
						FrunObjAtTime(this.children[0],teim*tempo);
						 }
					}else if(this.label=="for"){
                        if(this.children[0].ret==null){
                            
                        }else{
                            
                        }      
                    }else if(false){}else{
						/*for(var i =0;i<this.children.length;i++){
							this.children[i].run();
                    	}*/
						cont = true;
						//this.reval();
					}					
						if(cont==true){
							if(this.children.length>0){
								this.children[0].run();
							}else{
                                if(this.runAfter())
								this.goBack(this.ret);
								
							}
						}else{
							
						}
						
                    //}
					return this.ret;
					
				}
                this.findGoThis = function(reee){
                    if(this==reee){
                        //console.log("found"+JSON.stringify(this.js));
                        this.glow=false;
                        this.parent.goNext(this.parent.children.indexOf(this));
                    }else{
                        //console.log("no");
                        for(var i=0;i<this.children.length;i++){
                            this.children[i].findGoThis(reee);       
                        }
                    }
                }
				this.findGoThat = function(reee){
                    if(this==reee){
                        this.glow=false;
 						this.run();
                    }else{
                        //console.log("no");
                        for(var i=0;i<this.children.length;i++){
                            this.children[i].findGoThat(reee);       
                        }
                    }
                }
				this.goNext = function(index){
					//console.log(this.children.length);
					//console.log(index);
					if(index<this.children.length-1){
						//console.log(index+1);
						this.children[index+1].run();
					}else{
                       if(this.runAfter()){
						this.goBack();
                       }
					}
					
				}
				this.goBack = function(ret){
					if(this.js.fname!=null){
									//console.log("backup");
									//console.log(this.call);
									this.call.parent.goNext(this.call.parent.children.indexOf(this.call));
								}else {
                                    
                                if(this.label=="Initialize"){
									for(var i =0;i<maine.children.length;i++){
										var cr = maine.children[i];	
										if (cr.label=="Update"){
											cr.run();
										}
                    				}
								}else if(this.label=="OnKeyPress"||this.label=="OnKeyRelease"||this.label=="OnMouseClick"||this.label=="OnMouseRelease"||this.label=="OnMouseMove"){
									
								}else if(this.label=="Update"){
									
								}else{
                                    this.parent.goNext(this.parent.children.indexOf(this));
								}
                                      }}
				
				/////////TODO/////////////////////////////////////////////////////////////////////////////
                this.runAfter=function(){
                    var go = true;
                    if(this.label=="Print"){
                        if(this.children.length>0){
                            var aaa=this.children[0].ret;
                            for(var i = 1 ;i<this.children.length;i++){
                                aaa+=this.children[i].ret;
                            }
                            console.log(aaa);
							log(aaa);
                        }
                    }
                    if(this.label=="raw"){
                        this.ret = this.js.text;
						if(this.children.length>0){
							this.ret="";
					   for(var i =0;i<this.children.length;i++){
							this.ret+=this.children[i].ret;
                    	}
						}
                    }
                     if(this.label=="var"){
                         if(this.children.length>0){
                        this.ret = this.children[0].ret;
						 }
                         else{this.ret=null;}
                    }
					if(this.label=="array"){
						var ar = [];
                         for(i=0;i<this.children.length;i++){
                        ar.push(this.children[i].ret);
						 }
                         this.ret=ar;
                    }
					if(this.label=="get"){
						if(this.children.length==2){
							this.ret = this.children[1].ret[parseInt(this.children[0].ret)];
						}
						if(this.children.length==3){
							var bre = this.children[1].ret[parseInt(this.children[0].ret)];
							this.findVarByName(this.children[1].label);
							
							vvar.ret[this.children[0].ret] = this.children[2].ret; 
							
							
							this.ret = vvar.ret[parseInt(this.children[0].ret)];
						}
                    }
					if(this.label=="push"){
						if(this.children.length==2){

							this.findVarByName(this.children[1].label);
							
							vvar.ret.push(this.children[0].ret); 
							
							
							this.ret = vvar.ret[vvar.length-1];
						}
                    }if(this.label=="pop"){
						if(this.children.length==2){
							this.ret = this.children[1].ret[parseInt(this.children[0].ret)];
							this.findVarByName(this.children[1].label);
							
							vvar.ret.splice(this.children[0].ret,1); 
						}
                    }if(this.label=="length"){
						this.ret=this.children[0].ret.length;
                    }
                    //FUNCTIONS//////////////////////////////////////
                    if(this.js.fun==true){
                        maine.findFunctionByName(this.label);
                        
                        go = false;
                        
						ffunction.call=this;
						//console.log(ffunction.call);
						ffunction.run();
                    }
                    if(this.label=="params"){
                        //console.log("howdy");
                        for(var i =0;i<this.children.length;i++){
                            //console.log("hey");
                            if(this.parent.call.children.length>i){
                                this.children[i].ret=this.parent.call.children[i].ret;
                            }
                        }
                    }
                    //console.log(this.label);
                    if(this.js.vun==true){
                        this.findVarByName(this.label);
                        //console.log("vvar: "+vvar.stringify);
						//console.log(vvar);
                         //console.log(this.label);
                        if(this.children.length==0){
                            this.ret=JSON.parse(JSON.stringify(vvar.ret));
                           // console.log("tdree");
                        }else{
                            vvar.ret = JSON.parse(JSON.stringify(this.children[0].ret));
                           this.ret=JSON.parse(JSON.stringify(vvar.ret));
                        }
                        
                    }
                     if(this.label == "++"){
                         this.parent.findVarByName(this.parent.label);
                         if(this.children.length==0){
                            vvar.ret++;
                            }else{
                                if(parseFloat(vvar.ret)!=NaN){
                                vvar.ret=parseFloat(this.children[0].ret)+parseFloat(vvar.ret);
                                }else{
                                    vvar.ret+=this.children[0].ret;
                                }
                            }

                         this.ret=vvar.ret;
					}
					///////////INPUT
					if(this.label=="KeyDown"){
						this.ret=Keys[this.js.key];
					}
					
					if(this.label=="MouseDown"){
						this.ret=ismouse;
					}
					if(this.label=="MouseX"){
						this.ret=dmx;
					}
					if(this.label=="MouseY"){
						this.ret=dmy;
					}
					/////////////SPRITE FUNCTIONS
					if(this.label=="Move"){
						pare = findSprite(this.parent.label);
						if (pare!=null){
                        if(this.children.length==2){
						var x = parseFloat(this.children[0].ret)+pare.js.xpos;
						var y = parseFloat(this.children[1].ret)+pare.js.ypos;
						}else{
                            
							var dd = parseFloat(this.children[2].ret);
                            pendir+=dd;
                            pendir%=360
                            var d = pendir/180*Math.PI;
							var dx =parseFloat(this.children[0].ret);
							var dy =parseFloat(this.children[1].ret) 
							var x = dx*Math.cos(d)-dy*Math.sin(d)+pare.js.xpos;
							var y = dx*Math.sin(d)+dy*Math.cos(d)+pare.js.ypos;
				
                        }
						pare.js.xpos = x;
						pare.js.ypos = y;
							drawSprites();
							//console.log("hahaeeeh"+pare.xpos);
                    }
						//console.log("hahah");
					}
					if(this.label=="SetLocation"){
						pare = findSprite(this.parent.label);
						if (pare!=null){
                        if(this.children.length==2){
						var x = parseFloat(this.children[0].ret);
						var y = parseFloat(this.children[1].ret);
						pare.js.xpos = x;
						pare.js.ypos = y;
						}
						drawSprites();	//console.log("hahaeeeh"+pare.xpos);
                    }
						//console.log("hahah");
					}
					
					
					
					////////PEN
					if(this.label=="Pen Position"){
                        
						var x = parseFloat(this.children[0].ret);
						var y = parseFloat(this.children[1].ret);
						if(pendown){
							dtx.lineWidth=pensize;
							dtx.strokeStyle=pencolor;
							dtx.beginPath();
							dtx.moveTo(penx,peny);
							dtx.lineTo(x,y);
							dtx.stroke();
							penx = x;
							peny = y;
						}
						penx = x;
						peny = y;
                        if(this.children.length==3){
                            pendir= parseFloat(this.children[2].ret);
                        }
                    }
					if(this.label=="Pen Move"){
                        if(this.children.length==2){
						var x = parseFloat(this.children[0].ret)+penx;
						var y = parseFloat(this.children[1].ret)+peny;
						}else{
                            
							var dd = parseFloat(this.children[2].ret);
                            pendir+=dd;
                            pendir%=360
                            var d = pendir/180*Math.PI;
							var dx =parseFloat(this.children[0].ret);
							var dy =parseFloat(this.children[1].ret) 
							var x = dx*Math.cos(d)-dy*Math.sin(d)+penx;
							var y = dx*Math.sin(d)+dy*Math.cos(d)+peny;
				
                        }
						if(pendown){
							dtx.lineWidth=pensize;
							dtx.strokeStyle=pencolor;
							dtx.beginPath();
							dtx.moveTo(penx,peny);
							dtx.lineTo(x,y);
							dtx.stroke();
							penx = x;
							peny = y;
						}
						penx = x;
						peny = y;
                    }
					if(this.label=="Pen Up"){
                		pendown=false;
                    }
					if(this.label=="Pen Down"){
      
						pendown=true;
						
                    }
					if(this.label=="Clear"){
                		dtx.clearRect(0,0,cwid,chig);
                    }
					if(this.label=="Pen Color"){
                		pencolor = this.children[0].ret;
			dtx.strokeStyle=pencolor;
                    }
					if(this.label=="Pen Size"){
                		pensize = this.children[0].ret;
						dtx.lineWidth=pensize;
                    }
					if(this.label=="Prompt"){
                        var t = prompt(this.children[0].ret,"");
                        this.ret = t;
                    }
                    if(this.label=="pitch"){
                        var c=[0,0];
                        for(var i =0;i<this.children.length;i++){
                            if(this.children[i].ret!=null)
								c[i]=parseFloat(this.children[i].ret);
                    		}
                        freq = 440*Math.pow((2),(c[0]-60-9)/12);
                        //console.log(c[1]);
                             playPitch(freq,c[1],'square');
                    }
                    if(this.label=="tempo"){
                        var t = parseFloat(this.children[0].ret);
                        tempo=t;
                        this.ret = t;
                    }
                    if(this.label == "randi"){
						var min = parseFloat(this.children[0].ret);
						var max = this.children[1].ret;
					   this.ret = min+Math.floor(Math.random()*(max-min+1))
						//console.log(this.ret);
					}
                    if(this.label == "+"){
					   this.ret=0;
					   for(var i =0;i<this.children.length;i++){
							this.ret+=parseFloat(this.children[i].ret);
                    	}
					}
                    if(this.label == "*"){
					   this.ret=1;
					   for(var i =0;i<this.children.length;i++){
							this.ret*=parseFloat(this.children[i].ret);
                    	}
					}
                    if(this.label == "%"){
					   this.ret=parseFloat(this.children[0].ret)%parseFloat(this.children[1].ret);
                        this.ret=(this.ret+parseFloat(this.children[1].ret))%parseFloat(this.children[1].ret);
					}
                    if(this.label == "-"){
					   this.ret=0;
						for(var i =0;i<Math.floor(this.children.length/2);i++){
							this.ret+=parseFloat(this.children[i].ret);
                    	}
						for(var i =Math.floor(this.children.length/2);i<this.children.length;i++){
							this.ret-=parseFloat(this.children[i].ret);
                    	}
					}
                    
                    if(this.label == "/"){
					   this.ret=1;
						for(var i =0;i<Math.floor(this.children.length/2);i++){
							this.ret*=parseFloat(this.children[i].ret);
                    	}
						for(var i =Math.floor(this.children.length/2);i<this.children.length;i++){
							this.ret/=parseFloat(this.children[i].ret);
                    	}
					}
                    if(this.label == "=="){
                        if(this.children[0].ret==this.children[1].ret){
                            this.ret=true;
                        }else{
                            this.ret=false;
                        }
					}
                    if(this.label == "!="){
                        if(this.children[0].ret!=this.children[1].ret){
                            this.ret=true;
                        }else{
                            this.ret=false;
                        }
					}
                    if(this.label == ">"){
                        if(this.children[0].ret>this.children[1].ret){
                            this.ret=true;
                        }else{
                            this.ret=false;
                        }
					}
                    if(this.label == "&&"){
                        if(this.children[0].ret==true&&this.children[1].ret==true){
                            this.ret=true;
                        }else{
                            this.ret=false;
                        }
					}
                    if(this.label == "||"){
                        if(this.children[0].ret==true||this.children[1].ret==true){
                            this.ret=true;
                        }else{
                            this.ret=false;
                        }
					}
                    if(this.label == "!"){
                        if(this.children[0].ret){
                            this.ret=false;
                        }else{
                            this.ret=true;
                        }
					}
                    if(this.label=="Sleep"){
                        go=false;
                        var teim = 1;
                        if (this.children.length>0)
                        teim = this.children[0].ret;
                        this.glow=true;
                        //maine.setSkips();I
                        //sleepers.push(this);
                        
                       // this.sleept = setTimeout(function(){
							//console.log("sleeip");
							//maine.undoSkips();
							//maine.findGoThis(sleepers[0]);},1000);
                            runObjAtTime(this,teim*tempo);
                    }
					if(this.label=="Update"){
                        go=false;
                        this.glow=true;
                        runUpdate(this,100);
                    }
					if(this.label=="do"&&this.parent.label=="Delay"){
						 go=false;
						//console.log('aser');
						 
					}
                    ////////////FOR STATEMENTS
                    if(this.label=="until"&&this.parent.label=="for"){
						//console.log('aser');
                        if(this.children[0].ret==true){
                            //console.log('aser');
                           go=false; this.parent.parent.goNext(this.parent.parent.children.indexOf(this.parent));
                        }else{
                            		 go=true;
                        }
					}
                    if(this.label=="do"&&this.parent.label=="for"){
						 go=false;
                        
                        
                        this.findSiblingByName("until",0).run();
						//console.log('aser');
						 
					}
                    /////////////////////REPEAT STATEMENTS
                    if(this.parent.label=="repeat"&&this==this.parent.children[0]){
                      this.parent.num = this.ret;
					}
                if(this.label=="do"&&this.parent.label=="repeat"){
                        go=false;
                    if(this.parent.num>0){
                        this.parent.num--;
                        this.run();
                    }else{
                        go=true;
                    }
						//console.log('aser');
						 
					}
                    //////////////FOREACH
                    if(this.label=="do"&&this.parent.label=="foreach"){
                        go=false;
                        this.parent.children[2].run();
                    }
                    if(this.parent.label=="foreach"&&this==this.parent.children[2]){
                        var l = this.ret.length;
                        //console.log(l);
                        var index = this.findSiblingByName("var",0);
                        var val = this.findSiblingByName("var",1);
                        index.ret=parseInt(index.ret);
                        if(index.ret+1<l){
                            //console.log(index.ret);
                            val.ret = this.ret[index.ret+1];
                            index.ret++;
                            go=true;
                            
                        }else{
                            go=false;
                            this.parent.parent.goNext(this.parent.parent.children.indexOf(this.parent));
                        }
                    }
                    
                    
                    
                    
                    ////////////IF ELSE STATEMENTS
                     if(this.label=="test"&&this.parent.label=="ifelse"){
						 go=false;
                         if(this.children[0].ret==true){
                         this.findSiblingByName("true",0).run();
                     }else{
                         this.findSiblingByName("false",0).run();
                     } 
					}
                    if(this.label=="true"&&this.parent.label=="ifelse"){
                        go=false;
                       //console.log("skip false"); 
                        this.parent.parent.goNext(this.parent.parent.children.indexOf(this.parent));
                    }
                    if(this.label == "return"){
                        var p = this.parent;
						//console.log((p.call));
                        if(p.js!=null){
                        //console.log("yes");
						if(this.children.length>0){
							var aaa=this.children[0].ret;
							for(var i =1;i<this.children.length;i++){
								aaa+=this.children[i].ret;
                    		}
							p.call.ret=aaa;
							//console.log(p.call);
						}}
					}
                    return go;
                }
				
            }
			function jsobj(){
				this.x;
				this.y;
				this.size;
				this.children = [];
				this.js;
				this.color;
                this.node;
			}
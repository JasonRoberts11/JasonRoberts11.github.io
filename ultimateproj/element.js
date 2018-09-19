 function element(i,type,xpos,ypos){
                this.x = xpos;
                this.y = ypos;
				this.close = false;
				this.lx=xpos;
				this.ly=ypos;
				this.xv=2;
				this.yv=0;
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
                this.open = true;
                this.connections = [];
                this.render = function(){
                    var t = this.tint;
                    var s = this.bold;
                    ctx.fillStyle= tint(colorblocks[this.color],t);
                    ctx.strokeStyle=tint(colorblocks[this.color],0.6*s);
                    ctx.lineWidth = s*2;
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
					if(this.js!=null&&this.js.name=="Function"){
                        ctx.fillText(this.js.fname,this.absx,this.absy-this.size+10);
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
                        ctx.font="30px Arial";
						ctx.textAlign="center";
						ctx.textBaseline="mid";
                        ctx.fillStyle = tint(colorblocks[this.color],0);
						ctx.fillText(this.children.length,this.absx,this.absy);
					}
                    
                };
                this.add = function(e){
                    this.children.push(e);
                };
				this.getSelection = function(){
					if(dist(this.absx,this.absy,mousex,mousey,this.size)){
						selected=this;
					}
                    if(!this.close)
					for(i = 0;i<this.children.length;i++){
						this.children[i].getSelection();
					}
				}
				this.phys=function(){
					var p=this.parent;
					//If collides with parent
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
					if(this!=c)
					   if(dist(this.absx,this.absy,mousex,mousey,(this.size))){
					   parent = this;
                        if(!this.close)
						for(var i =0;i<this.children.length;i++){
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
					console.log(JSON.stringify(robj));
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
					for(var i =0;i<obj.children.length;i++){
						var ch = new element(null,1,1,1);
						ch.readJson(obj.children[i]);
						this.children.push(ch);
                    }
				}
				this.run = function(){
					//console.log("label:"+this.label);
					if(this.label == "Print"){
						if(this.children.length>0){
							var aaa=this.children[0].eval();
							for(var i =1;i<this.children.length;i++){
								aaa+=this.children[i].eval();
                    		}
							console.log(aaa);
							log(aaa);
						}
					}else if(this.js.fun==true){
						maine.findFunctionByName(this.label);
						ffunction.run();
						
					}else if(this.label == "return"){
						if(this.parent.js!=null&&this.parent.js.fun==true){
						if(this.children.length>0){
							var aaa=this.children[0].eval();
							for(var i =1;i<this.children.length;i++){
								aaa+=this.children[i].eval();
                    		}
							this.parent.call.js.callbac="aaa";
							console.log(JSON.stringify(this.parent.js));
						}}
					}else{
						for(var i =0;i<this.children.length;i++){
							this.children[i].run();
                    	}
					}
				}
				this.eval = function(obj){
					var out;
					if(this.js.fun == true){
					   	maine.findFunctionByName(this.label);
						var re = ffunction;
						this.js.callbac=null;
						re.call=this.js;
						//console.log(JSON.stringify(re.js));
						re.run();
						re.js.call=null;
						out = this.js.callbac;
						out= JSON.stringify(this.js);
						this.js.callbac=null;
					}
					if(this.label == "raw"){
					   out = this.js.text;
					}
					if(this.label == "+"){
					   out=0;
					for(var i =0;i<this.children.length;i++){
							out+=parseFloat(this.children[i].eval());
                    	}
					}if(this.label == "*"){
					   out=1;
					for(var i =0;i<this.children.length;i++){
							out*=parseFloat(this.children[i].eval());
                    	}
					}
					if(this.label == "-"){
					   out=0;
						for(var i =0;i<Math.floor(this.children.length/2);i++){
							out+=parseFloat(this.children[i].eval());
                    	}
						for(var i =Math.floor(this.children.length/2);i<this.children.length;i++){
							out-=parseFloat(this.children[i].eval());
                    	}
					}
					if(this.label == "/"){
					   out=1;
					for(var i =0;i<Math.floor(this.children.length/2);i++){
							out*=parseFloat(this.children[i].eval());
                    	}
						for(var i = Math.floor(this.children.length/2);i<this.children.length;i++){
							out/=parseFloat(this.children[i].eval());
                    	}
					}
					return out;
				}
				
            }
			function jsobj(){
				this.x;
				this.y;
				this.size;
				this.children = [];
				this.js;
				this.color;
			}
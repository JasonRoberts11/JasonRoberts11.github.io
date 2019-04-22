function BodyPart(name="unnamed",typ=0,color="#FFAA00"){
	//This is the object BodyPart, name is what the image is called, and typ is which version of that body part is shown.
	//the color variable represents the color of the image.

    this.color=color;
	this.name=name;
	this.typ=typ;
	this.img = new Image();
	//this.img.crossOrigin = "Anonymous";

	//this.img.
	//Draws the object to the canvas;
	this.setImage=function(){
		this.img.src = "images/"+this.name+"_"+this.typ+".png";
	}
	this.draw = function(){
		
		ctx.drawImage(this.convertImageColor(),0,0);
		//console.log(this.img.width);
	}
	
	this.convertImageColor=function(){
		//Creates temporary canvas
		var can = document.createElement("canvas");
		var cw=this.img.width;
		var ch=this.img.height;
		can.width=cw;
		can.height=ch;
        
        
		var etx = can.getContext("2d");
		//Draws image onto canvas
		
        etx.drawImage(this.img,0,0);
		//etx.fillRect(5,10,50,50);
		//Converts the color string to rgb value
		var rgbcolor = this.convertColorToRGB();
        console.log("rgb"+rgbcolor)
		//Gets the data from the canvas
		var idata=etx.getImageData(0,0,cw,ch);
		for(var i =0;i<cw*ch*4;i+=4){
			var r = idata.data[i];
			var g = idata.data[i+1];
			var b = idata.data[i+2];
			var a = idata.data[i+3];
			if(true){
				if(true){
					idata.data[i]=rgbcolor[0];
					idata.data[i+1]=rgbcolor[1];
					idata.data[i+2]=rgbcolor[2];
				}
			}
		}
        etx.getImageData(0,0,cw,ch).data=(data);
		return can;
	}
	
	this.convertColorToRGB=function(){
		var c = this.color;
		var r = parseInt((c[1]+c[2]),16);
		var g = parseInt((c[3]+c[4]),16);
		var b = parseInt((c[5]+c[6]),16);
		return [r,g,b];
	}
}
function BodyPart(name="unnamed",typ=0,color="#FF0000"){
	//This is the object BodyPart, name is what the image is called, and typ is which version of that body part is shown.
	//the color variable represents the color of the image.
	//this.color="rgb(255,0,0)";
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
        var tan = document.createElement("canvas");
		var cw=this.img.width;
		var ch=this.img.height;
		can.width=cw;
		can.height=ch;
        tan.width=cw;
        tan.height=ch;
		var etx = can.getContext("2d");
        var ttx = tan.getContext("2d");
		
		//Draws image onto canvas
		
        ttx.drawImage(this.img,0,0);
        etx.drawImage(tan,0,0);
		etx.fillRect(5,10,50,50);
		//Converts the color string to rgb value
		var rgbcolor = this.convertColorToRGB();
		//Gets the data from the canvas
		var data=ttx.getImageData(0,0,cw,ch).data;
		for(var i =0;i<cw*ch*4;i+=4){
			var r = data[i];
			var g = data[i+1];
			var b = data[i+2];
			var a = data[i+3];
			if(a>128){
				if(!(r<50&&g<50&&b<50)){
					data[i]=rgbcolor[0];
					data[i+1]=rgbcolor[1];
					data[i+2]=rgbcolor[2];
				}
			}
		}
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
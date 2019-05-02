function BodyPart(name="unnamed",typ=0,col="#FFAA00",num){
	//This is the object BodyPart, name is what the image is called, and typ is which version of that body part is shown.
	//the color variable represents the color change of the image.
  this.color=col;
	this.name=name;
	this.typ=typ;
	this.img;
  this.images=[];
  for(var i=0;i<num;i++){
    this.images[i]=new Image();
    this.images[i].src= "images/"+this.name+"_"+i+".png";
  }
  this.convertedimg;

	//Loads the image from file to the object;
	this.loadImage=function(){
		this.img=this.images[this.typ];
    this.convertedimg=this.convertImageColor();
	}
  //Draws the image of the body part onto the main canvas
	this.draw = function(){
		ctx.drawImage(this.convertedimg,0,0,this.img.width*scalefactor,this.img.height*scalefactor);
	}
	//Converts the original image to the colored image, returns the new image as a canvas
	this.convertImageColor=function(){
		//Converts the color string to rgb value
		var rgbcolor = convertColorToRGB(this.color);

		//Creates temporary canvas
		var can = document.createElement("canvas");
		var cw=this.img.width;
		var ch=this.img.height;
		can.width=cw;
		can.height=ch;
		var etx = can.getContext("2d");

		//Draws image onto the temporary canvas
    etx.drawImage(this.img,0,0);

		//Gets the data from the canvas
		var idata=etx.getImageData(0,0,cw,ch);

   //Iterate through each pixel in the image, and gets rgb components
   	for(var i =0;i<cw*ch*4;i+=4){
			var r = idata.data[i];
			var g = idata.data[i+1];
			var b = idata.data[i+2];
      //Calcuates the brightness of each pixel to keep the brightness after the conversion.
      var bright = (r+g+b);
      if(bright>255)bright=255;
      bright/=256;
      //Sets the pixel color to the desired color if it isn't black
			if(!(r<20&&g<20&&b<20)){
				idata.data[i]=rgbcolor[0]*bright;
				idata.data[i+1]=rgbcolor[1]*bright;
				idata.data[i+2]=rgbcolor[2]*bright;
			}
		}
    //Sets the image data to the converted data;
    etx.putImageData(idata,0,0);
		return can;
	}	
}

//converts the string "#XXXXXX" to an array containing the rgb
convertColorToRGB=function(c="#000000"){
		var r = parseInt((c[1]+c[2]),16);
		var g = parseInt((c[3]+c[4]),16);
		var b = parseInt((c[5]+c[6]),16);
		return [r,g,b];
	}
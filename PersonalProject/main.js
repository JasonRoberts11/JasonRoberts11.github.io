//Initial Variables
var width=768;
var height=768;


//Defines the variables for the Program
var main_div = document.getElementById("main");

//Enables the ability to draw on a canvas.
var canvas = document.createElement("canvas");
canvas.width=width;
canvas.height=height;
var ctx = canvas.getContext("2d");
//Adds the canvas to the div
main_div.appendChild(canvas);



//Creates the body parts
var body = new BodyPart("body",0,0);
setInterval(draw,100);
//
function draw(){
	console.log("start draw");
	body.setImage();
	ctx.fillStyle="#EFEFEF"
	ctx.fillRect(0,0,width,height);
	body.draw();
}
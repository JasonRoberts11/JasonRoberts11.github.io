//Initial Variables
var width=768;
var height=768;
var scalefactor=0.5;

//An array with the names of the image files, and how many different types there are
var partNames = ["body,1","head,3","pants,4","shirt,4","hair,3","eyes,5","nose,2","mouth,3","shoes,2"];

//An array that random colors are chosen from
var colors = ["#666666","#6666FF","#00FFFF","#66FF66","#FFFF00","#FFFFFF","#FF6666","#FF00FF"];

//Defines the variables for the Program
var main_div = document.getElementById("main");

//Enables the ability to draw on a canvas.
var canvas = document.createElement("canvas");
canvas.width=width*scalefactor;
canvas.height=height*scalefactor;
var ctx = canvas.getContext("2d");

//Adds the canvas to the div
main_div.appendChild(canvas);

//Creates an array of body parts based on text;
var partArray = [];
for(var i = 0; i < partNames.length ; i++){
  var a = partNames[i].split(',');
  partArray.push(new BodyPart(a[0],0,"#FFFFFF",a[1]));  
}
Randomize();

//Creates the Table of Buttons to Change the Style
//Row: < , Name , > , Color
var colorpickers=[];
colorpickers.push(null);
var table = document.createElement("table");
main_div.appendChild(table);
for(var i=1;i<partArray.length;i++){
  var row = document.createElement("tr");
  table.appendChild(row);

  var leftbutton = document.createElement("button");
  leftbutton.innerHTML="<";
  addElementToRow(leftbutton,row);

  addHandler("click",leftbutton,ChangeBody,i,-1);

  
  var label = document.createElement("td");
  label.innerHTML=Capitalize(partArray[i].name);
  row.appendChild(label);


  var rightbutton = document.createElement("button");
  rightbutton.innerHTML=">";
  addElementToRow(rightbutton,row);
  addHandler("click",rightbutton,ChangeBody,i,1);

  var colorpicker = document.createElement("input");
  addElementToRow(colorpicker,row);
  colorpicker.type="color";
  colorpicker.value=partArray[i].color;
  addHandler("change",colorpicker,ChangeColor,i,0);
  colorpickers.push(colorpicker);
}

//This function handles the button clicks.
function addHandler(event,element,func,i,d){
  element.addEventListener(event,function(e){
    func(i,d);
  });
}

//This function adds an element to a desired row in the table;
function addElementToRow(element,row){
  var td = document.createElement("td");
  row.appendChild(td);
  td.appendChild(element);
}

//This function Capitalizes the words that show up on the table
function Capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//This function changes a body part with index i, by delta d.
function ChangeBody(i,d){
  var t = partArray[i].typ;
  var l = partNames[i].split(',')[1];
  t+=d;
  if(t<0)t=l-1;
  if(t>=l)t=0;
  partArray[i].typ=t;
  partArray[i].loadImage();
  draw();
}
//this function changes the color of the part to the colorpicker value;
function ChangeColor(i,c){
  partArray[i].color=colorpickers[i].value;
  if(i==1){
    partArray[0].color=colorpickers[i].value;
    partArray[0].loadImage();
  }
  partArray[i].loadImage();
  draw();
}

//Function that selects the BodyPart object in the partarray array that has a certain name
function selectPartByName(name){
  for(var i=0;i<partArray.length;i++){
    if(partArray[i].name==name){
      return partArray[i];
    }
  }
  return null;
}


//Function that randomly picks body parts;
function Randomize(){
  for(var i = 0; i < partArray.length ; i++){
    var a = partNames[i].split(',');
    var b = Math.floor(Math.random()*a[1]);
    var c = Math.floor(Math.random()*colors.length);
    partArray[i].typ=b;
    partArray[i].color=colors[c];
  }
  //Sets the head color to the body color
  selectPartByName("head").color=selectPartByName("body").color;
  //Sets the Eyes to white
  selectPartByName("eyes").color="#FFFFFF";
  //Sets the inner mouth to red;
  selectPartByName("mouth").color="#FF0000";
}



//Loads the images after 2 seconds
setTimeout(setImages,2000);
setTimeout(draw,2100);


function setImages(){
  for(var i=0;i<partArray.length;i++){
    partArray[i].loadImage();
  }
}

function draw(){	
	ctx.fillStyle="#EFEFEF"
	ctx.fillRect(0,0,width,height);
  for(var i=0;i<partArray.length;i++){
    partArray[i].draw();
  }
}
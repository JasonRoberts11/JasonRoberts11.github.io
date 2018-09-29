function setbar(){
var navbar = document.getElementById("topnav");
if (navbar != null){
navbar.innerHTML = `
<a href="index.html">Main</a>
<a href="neuralnetwork.html">NeuralNetwork</a>
<a href="choose_gen.html">ChooseGenerator</a>
<a href="pictures.html">Art</a>
<a href="https://ers--cookiepie.repl.co">ERS</a>
<a href="https://JChat--cookiepie.repl.co">Chat</a>
<a href="ultimateproj/Main.html" class="rainbow">ULTIMATE PROJ</a>

`;
}
    console.log("madestuff")
}


window.onload = setbar();


var tare = 0;
var g = setInterval(function(){
    
    tare+=0.1;
    var rainbows = document.getElementsByClassName("rainbow");
    for(var i = 0;i<rainbows.length;i++){
        rainbows[i].style.color=rgbToHex(127*Math.sin(tare)+127,127*Math.sin(tare+3.1415/3*2)+127,127*Math.sin(tare+3.1415/3*4)+127);
        rainbows[i].style.background=rgbToHex(50*Math.sin(tare+3.1415)+50,50*Math.sin(tare+3.1415/3*5)+50,50*Math.sin(tare+3.1415/3*1)+50);  //rainbows[i].innerHTML=Math.random();
    }
},10);

function rgbToHex(r, g, b) {
                        return "#" + ((1 << 24) + (r << 16) + (g << 8) + (b<<0)).toString(16).slice(1);
}

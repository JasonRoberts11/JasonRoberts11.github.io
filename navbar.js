function setbar(){
var navbar = document.getElementById("topnav");
if (navbar != null){
navbar.innerHTML = `
<a href="index.html">Main</a>
<a href="neuralnetwork.html">NeuralNetwork</a>
<a href="choose_gen.html">ChooseGenerator</a>
<a href="pictures.html">Art</a>

`;
}
    console.log("madestuff")
}
window.onload = setbar();
/**
javascript:var%20i,s,ss=['https://jasonroberts11.github.io/scripts/fun.js'];for(i=0;i!=ss.length;i++){s=document.createElement('script');s.src=ss[i];document.body.appendChild(s);}void(0);
**/



	var b = document.getElementsByTagName("html");
       	    var c = b[0].innerHTML;
            var d = ""
            var e =0;
		g = prompt("Char to Replace", " ");
		h = prompt("Replace with", ".....");
            for(var i =0; i<c.length;i++){
                if(e==0){
                    if(c[i]=="<"){
                        e=1;
                    }
                    if(c[i]==g){
                        d+=h;
                    }else{
                       d+=c[i];
                    }
                }else{
                    d+=c[i];
                    if(c[i]==">"){
                        e=0;
                    }
                }
            }
            b[0].innerHTML=d;


var tare = 0;
var g = setInterval(function(){
    
    tare+=0.1;
    var rainbows = document.getElementsByName("p");
    for(var i = 0;i<rainbows.length;i++){
        rainbows[i].style.color=rgbToHex(127*Math.sin(tare)+127,127*Math.sin(tare+3.1415/3*2)+127,127*Math.sin(tare+3.1415/3*4)+127);
        rainbows[i].style.background=rgbToHex(50*Math.sin(tare+3.1415)+50,50*Math.sin(tare+3.1415/3*5)+50,50*Math.sin(tare+3.1415/3*1)+50);  //rainbows[i].innerHTML=Math.random();
    }
},10);

function rgbToHex(r, g, b) {
                        return "#" + ((1 << 24) + (r << 16) + (g << 8) + (b<<0)).toString(16).slice(1);
}

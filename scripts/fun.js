/**
javascript:var%20i,s,ss=['http://jasonroberts11.github.io/scripts/fun.js'];for(i=0;i!=ss.length;i++){s=document.createElement('script');s.src=ss[i];document.body.appendChild(s);}void(0);
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
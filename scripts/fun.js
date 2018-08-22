/**
javascript:var%20i,s,ss=['https://jasonroberts11.github.io/scripts/fun.js','http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js'];for(i=0;i!=ss.length;i++){s=document.createElement('script');s.src=ss[i];document.body.appendChild(s);}void(0);
**/
var b = document.getElementsByTagName("body");
            var c = b[0].innerHTML;
            var d = ""
            var e =0;
            for(var i =0; i<c.length;i++){
                if(e==0){
                    if(c[i]=="<"){
                        e=1;
                    }
                    if(c[i]=="."){
                        d+="boii";
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
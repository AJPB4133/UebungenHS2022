"use strict";

function changecolor(){
    var txt= document.querySelector("#src");
    var random = Math.floor(Math.random()*16777125).toString(16);
    var farbe = "#" + random;
    txt.style["color"] = farbe;
    txt.style["font-size"]= "50px";
    txt.style["text-align"]= "center";


}




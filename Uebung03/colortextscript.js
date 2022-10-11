"use strict";

function changecolor(){
    var txt= document.querySelector("#src").value;
    var txtoutput= document.querySelector("#dsc");

    txtoutput.innerHTML = txt;

    var random = Math.floor(Math.random()*16777125).toString(16);
    var farbe = "#" + random;

    txtoutput.style["color"] = farbe;
    txtoutput.style["font-size"]= "50px";
    txtoutput.style["text-align"]= "center";


}




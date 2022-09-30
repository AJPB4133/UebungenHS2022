//Aufgabe 01

var L = []

for(var i =1; i < 100; i= i+2){
    L.push(i)
    
}
console.log(L);

//Aufgabe 02



function wuerfel(){
    return Math.floor(5*Math.random()) + 1;
}

var a = wuerfel();

console.log(a);

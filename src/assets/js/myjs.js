//create a "graph paper" like canvas
function load(){
    var canvas = document.getElementById("mycanvas");
    var positionInfo = canvas.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    console.log("h - " + height)
    console.log("w - " + width)
    var child = document.getElementById("temp");
    for(var i = 0; i < width; i += 100){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.style.width = "5px";
        cur.style.height = "700px";
        cur.style.backgroundColor = "black";
        cur.style.left = numToString(i);
        console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
    for(var i = 0; i < height; i += 100){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.style.left = "0";
        cur.style.right = "0";
        cur.style.height = "5px";
        cur.style.backgroundColor = "black";
        cur.style.top = numToString(i);
        console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
}

//helper function: parse int to string, and add px
//helpful for styling
function numToString(i){
    var rv = i.toString();
    rv += "px";
    return rv;
}

//add user input to canvas
function addIn(){
    var textBox =  document.getElementById("userIn").value;
    console.log("tb - "  + textBox)
    var canvas = document.getElementById("mycanvas");
    var child = document.getElementById("temp");
    var posCounter = 0;
    for(var i = 0; i < textBox.length; i++){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.innerHTML = textBox[i]
        cur.classname = "padElm"
        cur.style.width = "100px";
        cur.style.height = "100px";
        cur.style.fontSize = "50px";
        cur.style.paddingTop = "40px";
        cur.style.textAlign = "center";
        cur.style.left = numToString(posCounter);
        console.log("new pos = " + posCounter)
        cur.style.top = "0";
        canvas.insertBefore(cur,child);
        posCounter += 100;
    }
}


function mouseParse(){
    var bool = document.getElementById("mouseBool").innerHTML;
    console.log(bool)
}
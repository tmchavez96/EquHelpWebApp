
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
        cur.style.height = "600px";
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

function numToString(i){
    var rv = i.toString();
    rv += "px";
    return rv;
}
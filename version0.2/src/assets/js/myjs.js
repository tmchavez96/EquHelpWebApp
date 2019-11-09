
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
        cur.style.backgroundColor = "#3000a8";
        cur.style.left = numToString(i);
        console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
    for(var i = 50; i < width; i += 100){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.style.width = "2px";
        cur.style.height = "700px";
        cur.style.backgroundColor = "#3000a8";
        cur.style.left = numToString(i);
        console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
    for(var i = 100; i < height; i += 100){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.style.left = "0";
        cur.style.right = "0";
        cur.style.height = "5px";
        cur.style.backgroundColor = "#3000a8";
        cur.style.top = numToString(i);
        console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
    for(var i = 150; i < height; i += 100){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.style.left = "0";
        cur.style.right = "0";
        cur.style.height = "2px";
        cur.style.backgroundColor = "#3000a8";
        cur.style.top = numToString(i);
        console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
}

//Since js is only ran on function calls we have no memory
//thus use an html hidden field to store and increment currewnt id
function getNextId(){
    var curID = document.getElementById("idCounter").innerHTML;
    console.log("curId is " + curID)
    var intID = parseInt(curID);
    intID++;
    document.getElementById("idCounter").innerHTML = intID;
    return intID;
}


//helper function: parse int to string, and add px
//helpful for styling
function numToString(i){
    var rv = i.toString();
    rv += "px";
    return rv;
}

//TODO: Before expanding codebase, work issues with font size
//add user input to canvas
function addIn(){
    var textBox =  document.getElementById("userIn").value;
    //console.log("tb - "  + textBox)
    var canvas = document.getElementById("mycanvas");
    var child = document.getElementById("temp");
    var posCounter = 0;
    for(var i = 0; i < textBox.length; i++){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.innerHTML = textBox[i]
        cur.id = getNextId();
        cur.className = "padElm"
        cur.style.width = "100px";
        cur.style.height = "100px";
        cur.style.fontSize = "50px";
        cur.style.paddingTop = "40px";
        cur.style.border="solid";
        cur.style.borderRadius = "10px";
        cur.style.textAlign = "center";
        cur.style.left = numToString(posCounter);
        //console.log("new pos = " + posCounter)
        cur.style.top = "0";
        canvas.insertBefore(cur,child);
        posCounter += 100;
    }
}

//called on click on the canvas, allows the user to select an element if they so choose.
function mouseParse(event){
    var canvasElm = document.getElementById("mycanvas");
    var rect = canvasElm.getBoundingClientRect();
    var canvasX = event.clientX - rect.left;
    var canvasY = event.clientY - rect.top;
    var bool = document.getElementById("mouseBool").innerHTML;
    //if no item is selected by the user, see if something was inteneded to be selected
    if(parseInt(bool) == 0){
        var jsonList = scanForHit(canvasX,canvasY)
        clearCanvas()
        jsonListToCanvas(jsonList)
    //else moves the selected item to its desired position
    }else{
        var selectedId = parseInt(bool)
        var jsonList = createJsonList()
        for(var i = 0; i < jsonList.length; i++){
            var cur = jsonList[i]
            if(selectedId == parseInt(cur.id)){
                var curWid = (parseInt(cur.size)*2);
                canvasX = canvasX - (canvasX % curWid);
                canvasY = canvasY - (canvasY % curWid);
                //console.log("post mode x,y = " + canvasX + " " + canvasY)
                cur.posX = numToString(canvasX)
                cur.posY = numToString(canvasY)
            }
        }
        clearCanvas()
        jsonListToCanvas(jsonList)
        document.getElementById("mouseBool").innerHTML = "0";
    }
}

function scanForHit(canvasX,canvasY){
    var jsonList = createJsonList();
    console.log("event nums - " + canvasX + " " + canvasY)
    for(var i = 0; i < jsonList.length; i++){
        var cur = jsonList[i];
        var top = parseInt(cur.posY)
        var bottom = parseInt(cur.posY) + (parseInt(cur.size) * 2);
        var left = parseInt(cur.posX)
        var right = parseInt(cur.posX) + (parseInt(cur.size) * 2);
        //console.log("as ints")
        //console.log("top - " + top + " bottom - " + bottom + " left - " + left + " right - " + right)
        var flag = true;
        if(canvasY > bottom){
            flag = false;
        }
        if(canvasY < top){
            flag = false;
        }
        if(canvasX > right){
            flag = false
        }
        if(canvasX < left){
            flag = false;
        }
        //console.log("------- flag was " + flag)
        if(flag){
            cur.selected = "true";
            document.getElementById("mouseBool").innerHTML = cur.id;
            //console.log("****************selected this one************");
        }
    }
    return jsonList;
}

//clears the canavas, will need to be called on every operation
function clearCanvas(){
    var x = document.getElementsByClassName("padElm");
    while(x.length > 0){
        for(var i = 0; i < x.length; i++){
            var element  = x[i];
            element.remove();
        }
        x = document.getElementsByClassName("padElm");
    }
}

function jsonListToCanvas(jsonList){
    var canvas = document.getElementById("mycanvas");
    var child = document.getElementById("temp");
    for(var i = 0; i < jsonList.length; i++){
        var curJson = jsonList[i];
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.innerHTML = curJson.text;
        cur.id = curJson.id;
        cur.className = "padElm"
        if(curJson.size == "50px"){
            cur.style.height = "100px";
            cur.style.width = "100px";
            cur.style.fontSize = "50px";
        }else{
            cur.style.height = "50px";
            cur.style.width = "50px";
            cur.style.fontSize = "25px";
        }
        cur.style.paddingTop = "40px";
        cur.style.textAlign = "center";
        cur.style.left = curJson.posX;
        //console.log("new pos = " + posCounter)
        cur.style.top = curJson.posY;
        if(curJson.selected == "true"){
            cur.style.border="solid";
            cur.style.borderRadius = "10px";
        }
        canvas.insertBefore(cur,child);
    }
}

//get a json representation of all the elms
function createJsonList(){
    var padElms = document.getElementsByClassName("padElm");
    var jsonArr = [];
    for(var i =0; i < padElms.length; i++){
        var cur  = padElms[i];
        var next = {
            "text":cur.innerHTML,
            "size":cur.style.fontSize,
            "posX":cur.style.left,
            "posY":cur.style.top,
            "id": cur.id,
            "selected":"false",
            "sub":"none"
        }
        jsonArr.push(next);
    }
    return jsonArr;
}



//################################################################################
//#######
//main functions
//directly tied to canvas though buttons ect
//#######
//################################################################################

//load stored json
function loadPad(){
    var jsonStr = document.getElementById("loadStorage").innerHTML;
    var jList = JSON.parse(jsonStr);
    clearCanvas()
    jsonListToCanvas(jList);
}

//create a "graph paper" like canvas
function load(){
    var canvas = document.getElementById("mycanvas");
    var positionInfo = canvas.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    var child = document.getElementById("temp");
    for(var i = 0; i < width; i += 100){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.style.width = "5px";
        cur.style.height = "700px";
        cur.style.backgroundColor = "#3000a8";
        cur.style.left = numToString(i);
        //console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
    for(var i = 50; i < width; i += 100){
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.style.width = "2px";
        cur.style.height = "700px";
        cur.style.backgroundColor = "#3000a8";
        cur.style.left = numToString(i);
        //console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
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
        //console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
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
        //console.log("e - " + canvas + " cur - " + cur + " ch - " + child)
        canvas.insertBefore(cur,child);
    }
}



//TODO: Before expanding codebase, work issues with font size
//add user input to canvas
function addIn(){
    var jList = createJsonList();
    var oldRow = getRow(0,jList);
    for(var i = 0; i < oldRow.length; i++){
        var cur = oldRow[i];
        deleteById(parseInt(cur.id));
    }
    var textBox =  document.getElementById("userIn").value;
    //console.log("tb - "  + textBox)
    var canvas = document.getElementById("mycanvas");
    var child = document.getElementById("temp");
    var posCounter = 0;
    for(var i = 0; i < textBox.length; i++){
        if(/\s/.test(textBox[i])){
            continue;
        }
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.innerHTML = textBox[i]
        cur.id = getNextId();
        cur.className = "padElm"
        cur.style.width = "100px";
        cur.style.height = "100px";
        cur.style.fontSize = "80px";
        //cur.style.paddingTop = "40px";
        //cur.style.border="solid";
        cur.style.borderRadius = "45px";
        //cur.style.color = "red";
        cur.style.textAlign = "center";
        cur.style.left = numToString(posCounter);
        //console.log("new pos = " + posCounter)
        cur.style.top = "0";
        cur.style.cursor = "pointer";
        canvas.insertBefore(cur,child);
        posCounter += 100;
    }
}


//works perfect for addition, case needs to be handled for subtraction
function addStep(){
    var jList = createJsonList();
    var textBox =  document.getElementById("userIn").value;
    //createSingleJson(text,size,posX,posY,id,selected,sub);
    var opperand = null;
    if(!checkForOpperand(textBox[0])){
        opperand = textBox[0];
        textBox = cleanString(textBox);
        //textBox = textBox.slice(1,textBox.length-1);
    }else if(!checkForOpperand(textBox[textBox.length-1])){
        opperand = textBox[textBox.length-1];
        textBox = cleanString(textBox);
        //textBox = textBox.slice(0,textBox[textBox.length-2]);
    }
    if(opperand != null){
        //console.log("passedOperand check")
        var nSize = 1;
        var nY = getMaxHeight(jList);
        // var botRow = getRow(nY,jList);
        // var botRowWidth = getRowWidth(botRow);
        //console.log("textBox -- " + textBox);
       // console.log("alleged max height -- " + nY);
        var lOp = createSingleJson(opperand,1,numToString(-400),numToString(nY),getNextId(),"false","none");
        var lVar = createSingleJson(textBox,nSize,numToString(-500),numToString(nY),getNextId(),"false","none");
        var rOp = createSingleJson(opperand,1,numToString(2000),numToString(nY),getNextId(),"false","none");
        var rVar = createSingleJson(textBox,nSize,numToString(2400),numToString(nY),getNextId(),"false","none");
        jList.push(lOp);
        jList.push(lVar);
        jList.push(rOp);
        jList.push(rVar);
        //?????
        clearCanvas()
        jsonListToCanvas(jList);
        var jList = createJsonList();
        centerRow(nY,jList);
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
                var curWid;
                if(cur.size == 1){
                    curWid = 100;
                }else{

                    curWid = 50;
                }
                canvasX = canvasX - (canvasX % curWid);
                canvasY = canvasY - (canvasY % curWid);
                //console.log("post mode x,y = " + canvasX + " " + canvasY)
                cur.posX = numToString(canvasX)
                cur.posY = numToString(canvasY)
                cur.selected = "false"
            }
        }
        document.getElementById("mouseBool").innerHTML = "0";
        clearCanvas()
        jsonListToCanvas(jsonList)
    }
}


function plusSize(){
    var id = parseInt(document.getElementById("mouseBool").innerHTML);
    var list = createJsonList()
    var elm = getElmFromJSONList(id,list);
    if(elm){
        elm.size = "1"
    }
    clearCanvas()
    jsonListToCanvas(list)
}

function minusSize(){
    var id = parseInt(document.getElementById("mouseBool").innerHTML);
    var list = createJsonList()
    var elm = getElmFromJSONList(id,list);
    if(elm){
        elm.size = "0"
    }
    clearCanvas()
    jsonListToCanvas(list)
}

function deleteItem(){
    var id = parseInt(document.getElementById("mouseBool").innerHTML);
    document.getElementById("mouseBool").innerHTML = "0";
    //console.log("deleting id = " + id)
    if(id != 0){
        deleteById(id);
    }
}

function copyBot(){
    var list = createJsonList()
    var newList = getBottomRow(list);
    // console.log("   new list")
    // console.log(newList)
    clearCanvas()
    jsonListToCanvas(newList)
}

function deleteBot(){
    var list = createJsonList()
    clearBottomRow(list);

}

function centerBot(){
    var jList = createJsonList();
    var maxHeight = getMaxHeight(jList)
    centerRow(maxHeight,jList);
}

function compactBottomRow(){
    var jList = createJsonList();
    var height = getMaxHeight(jList);
    compactRow(height);
}

function simplifyBottomRow(){
    var jList = createJsonList();
    var height = getMaxHeight(jList);
    var botRow = getRow(height,jList);
    var sortedRow = sortRow(botRow);
    var isEq = isEquation(sortedRow);
    if(isEq > -1){
        var row1 = []
        var row2 = []
        for(var i = 0; i < sortedRow.length; i++){
            if(i < isEq){
                row1.push(sortedRow[i])
            }else if(i > isEq){
                row2.push(sortedRow[i]);
            }
        }
        var res1 = simplifyRow(row1,0);
        for(var i = 0; i < res1.length; i++){
            jList.push(res1[i])
        }
        var tempHeight = res1[0].posY
        var r1w = getRowWidth(res1);
        jList.push(createSingleJson("=","1",numToString(r1w),tempHeight,getNextId(),"false","none"));
        var res2 = simplifyRow(row2,r1w+100);
        for(var i = 0; i < res2.length; i++){
            jList.push(res2[i]);
        }
        clearCanvas();
        jsonListToCanvas(jList);
    }else{
        console.log("passed isEq check")
        var retList = simplifyRow(sortedRow,0);
        for(var i = 0; i < retList.length; i++){
            jList.push(retList[i])
        }
        clearCanvas();
        jsonListToCanvas(jList);
    }
    centerBot();
}

//#######################################################################################
//#######
//helper functions
//called by canvas functions
//#######
//#######################################################################################


//check for equal sign
//return the index of the equal sign 
function isEquation(row){
    for(var i = 0; i < row.length; i++){
        var cur = row[i]
        if(cur.text == "="){
            return i;
        }
    }
    return -1;
}

//return a string without opperands
function cleanString(inStr){
    var rv =""
    for(var i = 0; i < inStr.length; i++){
        var char = inStr[i];
        if(!checkForOpperand(char)){
            continue;
        }else{
            rv+=char;
        }
    }
    return rv;
}

//remove the html elm of an id
function deleteById(id){
    var list = createJsonList()
    var index = 0;
    for(var i =0; i < list.length; i++){
        var cur = list[i];
        if(id == parseInt(cur.id)){
            index = i;
            break;
        }
    }
    list.splice(index,1);
    clearCanvas()
    jsonListToCanvas(list)
}

//Since js is only ran on function calls we have no memory
//thus use an html hidden field to store and increment currewnt id
function getNextId(){
    var curID = document.getElementById("idCounter").innerHTML;
    //console.log("curId is " + curID)
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

function scanForHit(canvasX,canvasY){
    var jsonList = createJsonList();
    //console.log("event nums - " + canvasX + " " + canvasY)
    for(var i = 0; i < jsonList.length; i++){
        var cur = jsonList[i];
        var curSize = getSizeInt(cur.size,cur.text)
        var top = parseInt(cur.posY)
        var bottom;
        if(cur.size == "1"){
            bottom = parseInt(cur.posY) + 100;
        }else{
            bottom = parseInt(cur.posY) + 50;
        }
        var left = parseInt(cur.posX)
        var right = parseInt(cur.posX) + curSize;
        //console.log("as ints for - " + cur.text)
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
            console.log("****************selected this one************");
            break;
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

//get all non-number characters from a var;
function pullVar(inStr){
    var rv = ""
    for(var i = 0; i < inStr.length; i++){
        var char = inStr[i];
        if(isNaN(char)){
            rv += char;
        }
    }
    return rv;
}

//################################################################################
//#######
//JSON functions
//functions related to the construction and use of
//the json representation of the canvas
//since we cant have true oop design in js,
//most operations will create a json list representation of the canvas.
//#######
//################################################################################

function jsonListToCanvas(jsonList){
    document.getElementById("jListStorage2").value = JSON.stringify(jsonList);
    var canvas = document.getElementById("mycanvas");
    var child = document.getElementById("temp");
    for(var i = 0; i < jsonList.length; i++){
        var curJson = jsonList[i];
        var cur = document.createElement("div");
        cur.style.position = "absolute";
        cur.innerHTML = curJson.text;
        //console.log("redrawing - " + curJson.text)
        cur.id = curJson.id;
        cur.className = "padElm"
        var elmWidth = parseInt((curJson.text.length)/2)+parseInt((curJson.text.length)%2)
        if(curJson.size == "1"){
            cur.style.height = "100px";
            cur.style.width = numToString(elmWidth * 100);
            cur.style.fontSize = "80px";
        }else{
            cur.style.height = "50px";
            cur.style.width = numToString(elmWidth * 50);
            cur.style.fontSize = "40px";
        }
        //cur.style.paddingTop = "40px";
        cur.style.textAlign = "center";
        cur.style.left = curJson.posX;
        //console.log("new pos = " + posCounter)
        cur.style.top = curJson.posY;
        if(curJson.selected == "true"){
            cur.style.border="solid";
            cur.style.borderRadius = "45px";
            cur.style.color = "red";
        }
        cur.style.cursor = "grab";
        canvas.insertBefore(cur,child);
    }
}


//get a json representation of all the elms
function createJsonList(){
    var padElms = document.getElementsByClassName("padElm");
    var jsonArr = [];
    //console.log("num of elms recieved from body - " + padElms.length)
    for(var i =0; i < padElms.length; i++){
        var cur  = padElms[i];
        var elmSize;
        var selected = "false";
        var id = parseInt(document.getElementById("mouseBool").innerHTML);
        if(parseInt(cur.id) == id){
            selected = "true";
            //console.log("it worked");
        }
        if(cur.style.fontSize == "80px"){
            elmSize = "1"
        }else{
            elmSize = "0";
        }
        var next = {
            "text":cur.innerHTML,
            "size":elmSize,
            "posX":cur.style.left,
            "posY":cur.style.top,
            "id": cur.id,
            "selected":selected,
            "sub":"none"
        }
        jsonArr.push(next);
    }
    return jsonArr;
}

//save space when creating a single json
//psuedo constructor
function createSingleJson(text,size,posX,posY,id,selected,sub){
    var next = {
        "text":text,
        "size":size,
        "posX":posX,
        "posY":posY,
        "id": id,
        "selected":selected,
        "sub":sub
    }
    return next;
}

//id retrieval
function getElmFromJSONList(id,list){
    for(var i = 0; i < list.length; i++){
        var cur = list[i]
        if(parseInt(cur.id) == id){
            return cur;
        }
    }
    return null;
}

//json helper
function getSizeInt(sizeRep,text){
    var elmWidth = parseInt((text.length)/2)+parseInt((text.length)%2)
    if(sizeRep == "1"){
        return elmWidth * 100;
    }else{
        return elmWidth * 50;
    }
}

function clearBottomRow(){
    var jList = createJsonList()
    var maxY = getMaxHeight(jList);
    var botRow = getRow(maxY,jList);
    for(var i = 0; i < botRow.length; i++){
        var cur = botRow[i];
        deleteById(parseInt(cur.id));
    }
}

//return json with bottom row copied
function getBottomRow(){
    var jList = createJsonList()
    var maxY = getMaxHeight(jList);
    var botRow = getRow(maxY,jList);
    //console.log("bot row was")
    //console.log(botRow)
    var newRow = []
    for(var i = 0; i < botRow.length; i++){
        var cur = botRow[i]
        var next = {
            "text":cur.text,
            "size":cur.size,
            "posX":cur.posX,
            "posY":numToString(parseInt(cur.posY) + 100),//cur.posY,
            "id": getNextId(),
            "selected":"false",
            "sub":"none"
        }
        //console.log("adding to newRow")
        jList.push(next);
    }
    //console.log("returning this list")
    //console.log(jList)
    return jList
}

//get a row at a height
function getRow(height,list){
    //console.log("getting row at height - " + height)
    var rv = []
    for(var i = 0; i < list.length; i++){
        var cur = list[i];
        // console.log("element posY for " + cur.text)
        // console.log(cur.posY)
        if(parseInt(cur.posY) >= height && parseInt(cur.posY) < (height+100)){
            rv.push(cur)
        }
    }
    return rv;
}

//get the height of the lowest elm
function getMaxHeight(jList){
    var rv = -1;
    for(var i = 0; i < jList.length; i++){
        var cur = jList[i];
        if(parseInt(cur.posY) > rv){
            rv = parseInt(cur.posY)
        }
    }
    return rv - (rv%100);
}


//center the values on json rep of a row at a specific height
function centerRow(maxHeight,jList){
    var jList = createJsonList()
    var row = getRow(maxHeight,jList);
    var rowWidth = getRowWidth(row)
    //console.log("row width is - " + rowWidth)
    var canvas = document.getElementById("mycanvas");
    var positionInfo = canvas.getBoundingClientRect();
 
    var width = positionInfo.width;
    var start = parseInt((width - rowWidth)/2);
    start = start - (start % 100)
    //console.log("canvas width is - " + width)
    while(row.length > 0){
        //console.log("to pop or not to pop")
        var cur = getLeftMost(row)
        cur.posX = numToString(start);
        //console.log("placing at" + cur.text + "  - " + start)
        start += getSizeInt(cur.size,cur.text);
    }
    clearCanvas();
    jsonListToCanvas(jList);
}

//return widht of a row
function getRowWidth(row){
    var rv = 0;
    for( var i = 0; i < row.length; i++){
        var cur = row[i]
        var elmWidth = parseInt((cur.text.length)/2)+parseInt((cur.text.length)%2)
        if(cur.size == "1"){
            rv += (elmWidth * 100);
        }else{
            rv += (elmWidth * 50);
        }
    }
    rv = rv - (rv % 100);
    return rv;
}

//return the left most element of a given row
function getLeftMost(row){
    if(row.length < 1){
        return null;
    }
    var index= 0;
    var leftmost = row[0];
    for(var i = 0; i < row.length; i++){
        var cur = row[i];
        if(parseInt(leftmost.posX) > parseInt(cur.posX)){
            leftmost = cur;
            index = i;
        }
    }
    row.splice(index,1);
    //console.log("leftmost pre return - " + leftmost)
    return leftmost;
}

//turn elements inteneded to be together into 1
//ex 2 x -> 2x
function compactRow(height){
    var jList = createJsonList();
    var row = getRow(height,jList);
    var row2 = sortRow(row);
    //console.log("sorted row - " + row)
    var buffer = "";
    var nextX = parseInt(row2[0].posX);
    var prev = row2[0];
    var newElms = [];
    var safeNet = 0;
    for(var i = 0; i < row2.length; i++){
        safeNet++;
        if(safeNet > 100){
            break;
        }
        var cur = row2[i];
        //console.log("sanity check - " + cur.size)
        //console.log("sanity check - " + prev.size)
        if(!checkForOpperand(cur.text)){
            prev.text = buffer;
            newElms.push(createSingleJson(prev.text,prev.size,numToString(nextX),numToString(parseInt(prev.posY) + 100),getNextId(),"false","none"))
            nextX += getSizeInt(prev.size,prev.text)
            buffer = "";
            if(i < row2.length-1){
                prev = row2[i+1];
            }
            newElms.push(createSingleJson(cur.text,cur.size,numToString(nextX),numToString(parseInt(cur.posY) + 100),getNextId(),"false","none"))
            nextX += getSizeInt(prev.size,prev.text)
        }else if(cur.size != prev.size){
            prev.text = buffer;
            newElms.push(createSingleJson(prev.text,prev.size,numToString(nextX),numToString(parseInt(prev.posY) + 100),getNextId(),"false","none"))
            nextX += getSizeInt(prev.size,prev.text)
            buffer = "";
            i--;
            // if()
            // buffer += cur.text;
            prev = cur;
            //newElms.push(createSingleJson(cur.text,cur.size,cur.posX,numToString(parseInt(cur.posY) + 100),getNextId(),"false","none"))
        }else{
            buffer += cur.text;
            if(i == row2.length-1){
                prev.text = buffer;
                newElms.push(createSingleJson(prev.text,prev.size,numToString(nextX),numToString(parseInt(prev.posY) + 100),getNextId(),"false","none"));
            }
        }
    }
    //console.log("new elms")
    for(var j = 0; j < newElms.length; j++){
        var c  = newElms[j];
        jList.push(c);
        //console.log("*-* - "  + c.text)
    }
    clearCanvas();
    jsonListToCanvas(jList);
}

function sortRow(row){
    var rv = []
    var safeGuard = 0;
    while(row.length > 0){
        var lefty = getLeftMost(row);
        //console.log("leftmost was - " + lefty.text)
        var clone = createSingleJson(lefty.text,lefty.size,lefty.posX,lefty.posY,getNextId(),"false","none")
        rv.push(clone);
        safeGuard++;
        if(safeGuard > 100){
            break;
        }
    }
    return rv;
}

//i suppose i should regex instead of this...
function checkForOpperand(char){
    if(char == "+"){
        return false;
    }else if(char == "-"){
        return false;
    }else if(char == "/"){
        return false;
    }else if(char == "="){
        return false;
    }else if(char == "*"){
        return false;
    }else if(char == "%"){
        return false;
    }else if(char == "."){
        return false;
    }else{
        return true;
    }
}

//assumes row has already been compacted
//use dictionary to count the 
function simplifyRow(row,sIndex){
    //pullVar(inStr)
    var retList = [];
    var rowHeight = parseInt(row[0].posY);
    var dict = {};
    var prevOp= "+";
    for(var i = 0; i < row.length; i++){
        var cur = row[i];
        if(!checkForOpperand(cur.text)){
            prevOp = cur.text;
        }else{
            var coef = parseInt(cur.text);
            if(isNaN(coef)){
                coef = 1;
            }
            if(prevOp == "-"){
                coef = coef * -1;
            }
            var variable = pullVar(cur.text);
            console.log("coef = " + coef);
            console.log("var  = " + variable);
            var curVal = dict[variable];
            console.log("curVal is " + curVal)
            if(curVal){
                dict[variable] = curVal + coef;
            }else{
                dict[variable] = coef;
            }
        }
    }
    var posCounter = sIndex;
    var flag = -1;
    for(var key in dict){
        console.log("in sus loop");
        var val = dict[key];
        if(val < 0){
            val = val * -1;
            retList.push(createSingleJson("-","1",numToString(posCounter),numToString(rowHeight + 100),getNextId(),"false","none"));
            posCounter += getSizeInt("1","-")
        }else{
            if(flag > 0){
                retList.push(createSingleJson("+","1",numToString(posCounter),numToString(rowHeight + 100),getNextId(),"false","none"));
                posCounter += getSizeInt("1","+")
            }
        }
        var newText = val + key;
        retList.push(createSingleJson(newText,"1",numToString(posCounter),numToString(rowHeight + 100),getNextId(),"false","none"));
        posCounter += getSizeInt("1",newText)
        flag = 1;
    }
    return retList;
}
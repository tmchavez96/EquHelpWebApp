
function updateNav(id){
    console.log("sanity check")
    var navs = document.getElementsByClassName("navComponent");
    for(var i = 0; i < navs.length; i++){
        console.log("update nav has been called")
        var ref = "nc" + i;
        var cur = document.getElementById(ref);
        if(i == id){
            cur.style.borderRight = "solid";
            cur.style.borderLeft = "solid";
            cur.style.borderColor = "#d28aff";
        }else{
            cur.style.border = "none";
            cur.style.borderRight = "solid";
            cur.style.borderRightColor = "black";
        }
    }
}
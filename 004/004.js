function creatBox(){
    var main = document.getElementById("main");
    var num = 208;
    for (var i=0; i< num; i++){
        var box = document.createElement("div");
        box.setAttribute("class","start");
        main.appendChild(box);
        box.onmouseover = function(){
            changeColor(this);
        }
    }
}
function changeColor(element){
    if (element.getAttribute("class") == "start"){
        element.setAttribute("class","after");
    } else {
        element.setAttribute("class","start");
    }
}

window.addEventListener("load",creatBox,false);

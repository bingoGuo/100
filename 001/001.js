function doSecond() {
    'use strict';
    var bg = document.getElementById("bg"),
        color = '#' + Math.random().toString(16).slice(3, 9);
    bg.style.background = color;
}
function doFirst() {
    'use strict';
    var click = document.getElementById("click");
    click.addEventListener("click", doSecond, false);
}
window.addEventListener("load", doFirst, false);
// display splash screen until audio is loaded
function audioReady() {
    var audio = [].slice.call(document.getElementsByTagName('audio'));
    return Promise.all(audio.map(function(el) {
        return new Promise(function(resolve, reject) {
            el.addEventListener('canplay', resolve);
        });
    }));
}

audioReady().then(loaded());

function loaded() {
    var songs = document.getElementsByTagName('audio');
    var i;
    for (i = 0; i < songs.length; i++) {
        var title = songs[i].getAttribute('src');
        console.log(title + " preloaded");
    }
}

// autoplays startup sound when desktop is loaded
function splash() {
    document.getElementById("load").style.display = "flex";
    document.getElementById("desktop").style.display = "none";
    document.getElementById("taskbar").style.display = "none";
    setTimeout(function() {
        document.getElementById("load").style.display = "none";
        document.getElementById("desktop").style.display = "flex";
        document.getElementById("taskbar").style.display = "flex";
        document.getElementById("startup").play();
    }, 1200);
};


// highlights icons in blue when clicked on 
function highlight(id) {
    var x = document.getElementsByClassName('icon');
    var y = document.getElementsByClassName('button');
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('iconHighlighted');
    }
    var o;
    for (o = 0; o < y.length; o++) {
        y[o].classList.remove('buttonPressed');
    }
    document.getElementById(id).classList.toggle('iconHighlighted');
    document.getElementById('startMenu').classList.remove('show');
}

// removes focus from windows and taskbar buttons when desktop is clicked
function unhighlight() {
    var x = document.getElementsByClassName('icon');
    var y = document.getElementsByClassName('button');
    var z = document.getElementById('startMenu');
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('iconHighlighted');
    }
    var o;
    for (o = 0; o < y.length; o++) {
        y[o].classList.remove('buttonPressed');
    }
    z.style.display = "none";
}

// makes taskbar buttons indented when clicked on
function indent(id) {
    var icons = document.getElementsByClassName('icon');
    var i;
    for (i = 0; i < icons.length; i++) {
        icons[i].classList.remove('iconHighlighted');
    }
    var taskbutts = document.getElementsByClassName('button');
    var o;
    for (o = 0; o < taskbutts.length; o++) {
        taskbutts[o].classList.remove('buttonPressed');
    }
    document.getElementById(id).classList.toggle('buttonPressed');
}

// opens programs when double clicked on
function launch(id) {
    var x = document.getElementById(id);
    if (x.style.display === "flex") {
        x.style.zIndex = 1;
    } else {
        x.style.display = "flex";
    }
}

// brings window into focus when clicked on
function front(id) {
    var x = document.getElementsByClassName('window');
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.zIndex = 1;
    }
    document.getElementById(id).style.zIndex = 2;
    document.getElementById('start').classList.remove('buttonPressed');;
    document.getElementById('startMenu').style.display = "none";
}

function show(id) {
    var x = document.getElementById(id);
    if (x.style.display === "flex") {
        if (x.style.zIndex < 2) {
            x.style.display = "none";
        } else {
            front(id);
        }
    } else {
        x.style.display = "flex";
    }
}

// allows for dragging windows around
// dragElement(document.querySelector('.window'));

// function dragElement(elmnt) {
//     var pos1 = 0,
//         pos2 = 0,
//         pos3 = 0,
//         pos4 = 0;
//     if (document.querySelector('.window' + "header")) {
//         /* if present, the header is where you move the DIV from:*/
//         document.querySelector('.window' + "header").onmousedown = dragMouseDown;
//     } else {
//         /* otherwise, move the DIV from anywhere inside the DIV:*/
//         elmnt.onmousedown = dragMouseDown;
//     }

//     function dragMouseDown(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // get the mouse cursor position at startup:
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onmouseup = closeDragElement;
//         // call a function whenever the cursor moves:
//         document.onmousemove = elementDrag;
//     }

//     function elementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // calculate the new cursor position:
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         // set the element's new position:
//         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {
//         /* stop moving when mouse button is released:*/
//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// }

var dragItem = document.querySelector(".window");
var container = document.querySelector("#wallpaper");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function showTime() {
    var date = new Date();

    // time
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + " " + session;
    document.getElementById("clock").innerText = time;

    setTimeout(showTime, 1000);
}

showTime();
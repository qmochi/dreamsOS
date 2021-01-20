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
    }, 1500);
};

// highlights icons in blue when clicked on 
function highlight(id) {
    var x = document.getElementsByClassName('icon');
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove('iconHighlighted');
    }
    document.getElementById(id).classList.toggle('iconHighlighted');
}

// removes focus from windows and taskbar buttons when desktop is clicked
function unhighlight() {
    var i;
    for (i = 0; i < document.getElementsByClassName('icon').length; i++) {
        document.getElementsByClassName('icon')[i].classList.remove('iconHighlighted');
    }
    var o;
    for (o = 0; o < document.getElementsByClassName('button').length; o++) {
        document.getElementsByClassName('button')[o].classList.remove('buttonPressed');
    }
    document.getElementById('startMenu').classList.remove('show');
}

// makes taskbar buttons indented when clicked on
function indent(id) {
    document.getElementById(id).classList.toggle('buttonPressed');
    document.getElementById('startMenu').classList.toggle('show');

    var icons = document.getElementsByClassName('icon');
    var i;
    for (i = 0; i < icons.length; i++) {
        icons[i].classList.remove('iconHighlighted');
    }
}

// opens programs when double clicked on
function launch(id) {
    var x = document.getElementById(id);
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
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
}

// allows for dragging windows around
dragElement(document.querySelector('.window'));

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.querySelector('.window' + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.querySelector('.window' + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
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

    setInterval(showTime, 1000);

}

showTime();
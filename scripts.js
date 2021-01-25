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
    // move this element to foreground, and others behind it
    for (var i = 0; i < x.length; i++) {
        x[i].style.zIndex = 1;
        x[i].classList.remove("selected");
    }
    document.getElementById(id).style.zIndex = 2;
    document.getElementById(id).classList.add("selected");

    // remove focus from other elements
    document.getElementById('start').classList.remove('buttonPressed');;
    document.getElementById('startMenu').style.display = "none";
}

function show(id) {
    var x = document.getElementById(id);
    if (x.style.display === "flex") {
        if (x.style.zIndex === 2) {
            x.style.display = "none";
        } else if (x.style.zIndex < 2) {
            front(id);
        }
    } else {
        x.style.display = "flex";
    }
}

// allows for dragging windows around
var container = document.querySelector("#desktop");
var activeItem = null;

var active = false;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {

    if (e.target !== e.currentTarget) {
        if (e.target.classList.contains("window")) {
            active = true;
        }

        // this is the item we are interacting with
        activeItem = e.target;

        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }

            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }

            if (e.type === "touchstart") {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                console.log("doing something!");
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
        }
    }
}

function dragEnd(e) {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }

    active = false;
    activeItem = null;
}

function drag(e) {
    if (active) {
        if (e.type === "touchmove") {
            e.preventDefault();

            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// display time in taskbar clock
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
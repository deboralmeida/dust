// BLINK ANIMATION XX
// MAKE SOME NOT HAVE ANIMATION
// INITIAL BCKG ANIMATION FROM DARK TO LIGHT UP
// PARTICLES THAT STAY ALWAYS HAVE PREFERENCE FOR TOP > 40% <5%  XX
// LOGO APPEAR AFTER 3 SECS AFTER BOOT XX
// LOGO ANIMATION X

var container = document.getElementById("container");
// NUMBER OF DUST PARTICLES
var pNum = 200;
var halfNum = 0;
// SIZE
var sizeList = ["XS", "S", "M", "L", "XL"];
var rSize = 0;
// POSITION
var winW = window.innerWidth;
var winH = window.innerHeight;
var rX = 0;
var rY = 0;
// COLORS + OPACITY
var colorList = ["230,194,152,", "255,255,255,"]
var rColor = 0;
// BLUR
var isBlur = 0;
// BOOT ANIMATION
var anim = null;
var count = 0;
// LOGO
var logo = null;

// GET A POSITION FOR PARTICLES TO START ON
function initialPosition() {
    for (var i = 0; i < pNum; i++) {
        getRandomPosition();
        container.childNodes[i].style.left = rX;
        container.childNodes[i].style.top = rY;
    }
}
// ANIMATE PARTICLES' POSITION
function animPos(){
    if (count === 0 ) {
        hideParticle();
        count++;
    }

    for (var i = 0; i < pNum; i++){
        var posL = container.childNodes[i].offsetLeft;
        var posT = container.childNodes[i].offsetLeft;
        var directions = [-10, + 10, -20, +20, -30. +30];
        var randomDirection = Math.floor(Math.random() * 6);
        var newDirection = directions[randomDirection];
        container.childNodes[i].style.left = posL + newDirection;
    }
    for (var i = 0; i < pNum; i++){
        var posT = container.childNodes[i].offsetTop;
        var directions = [-10, + 10, -20, +20, -30. +30];
        var randomDirection = Math.floor(Math.random() * 6);
        var newDirection = directions[randomDirection];
        container.childNodes[i].style.top = posT + newDirection;
    }
    // RE-RUN FUNCTION
    anim = setTimeout(animPos, 2000);
}
// INFLUENCE RANDOM
function notSoRandom(prob) {
    var i;
    var sum = 0;
    var r = Math.random();

    for (i in prob) {
        sum += prob[i];
        if (r <= sum) return i;
    }
}
// RANDOMS
// SIZE
function getRandomSize() {
    rSize = notSoRandom({0:0.3, 1:0.3, 2:0.2, 3:0.1, 4:0.1});
}
// POSITION
function getRandomPosition() {
    rX = Math.floor(Math.random() * winW - 20);
    rY = Math.floor(Math.random() * winH - 20);
}
// COLOR + OPACITY + BLUR
function getRandomColor() {
    var calcRandomOp = Math.random() * 1;
    var rOpacity = calcRandomOp.toFixed(1);

    isBlur = notSoRandom({0:0.7, 1:0.3});
    rColor = "rgba(" + colorList[Math.floor(Math.random() * 2)] + rOpacity + ")";
}
// DELETE TOP HALF OF PARTICLES & MIDDLE BOTTOM
// LEFTOVER PARTICLES HAVE BLINK ANIMATION
function hideParticle() {
    for (var i = 0; i < pNum; i++) {
        var particle = container.childNodes[i];

        var particleY = particle.offsetTop;
        var particleX = particle.offsetLeft;

        var percent40 = winH * 40 * 0.01;
        var percent85 = winH * 90 * 0.01;
        var percent20 = winW * 20 * 0.01;
        var percent80 = winW * 80 * 0.01;

        var condiTop = particleY < percent40;
        var condiBot = particleY > percent85 && particleX > percent20 && particleX < percent80;

        if (condiTop || condiBot) {
            particle.style.opacity = 0;
        } else {
            var blinks = [
                    "blink 1s ease 0s infinite alternate",
                    "blink 5s ease 0s infinite alternate",
                    "blink 10s ease 0s infinite alternate",
                    "blink 15s ease 0s infinite alternate",
                    "blink 20s ease 0s infinite alternate",
                    "blink 25s ease 0s infinite alternate",
                ];
            var rBlinks = Math.floor(Math.random() * 6);
            var blinkSpeed = blinks[rBlinks];
            particle.style.animation = blinkSpeed;
        }
    }
}

// MAKE LOGO APPEAR
function bootLogo() {
    document.getElementById("logo").style.display = "block";
    document.getElementById("logoBorder").style.display = "block";
}

// BOOTING FUNCTION - RUNS AS SOON AS PAGE LOADS
// MAKES FUNCTIONS FOR SIZE, POSITION + COLOR RUN
function bootAnim() {
    for (var i = 0; i < pNum; i++) {
        getRandomSize();
        getRandomPosition();
        getRandomColor();

        // CREATE DIV WITH SIZE + POSITION & COLOR PICKED
        var createDiv = document.createElement("div");
        createDiv.classList.add(sizeList[rSize]);
        createDiv.style.left = rX;
        createDiv.style.top = rY;
        createDiv.style.background = rColor;
        // ADD BLUR EFFECT, WHEN BLUR = TRUE OR SIZE = EXTRA LARGE
        if (isBlur === "1" || rSize === "4") {
            createDiv.classList.add("blurEffect");
        }
        // APPEND PARTICLE ON CONTAINER
        container.appendChild(createDiv);
    }

    // TIMED FUNCTIONS
    anim = setTimeout(initialPosition, 0);
    anim = setTimeout(animPos, 2000);
    logo = setTimeout(bootLogo, 2000);
}

// RUN BOOT FUNCTION
bootAnim();
// REPOSITION PARTICLES ON WINDOW RESIZE
window.addEventListener("resize", initialPosition);

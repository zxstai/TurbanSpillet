
//#region VARIABLES

// Objects
var turban;
var turbanImg;
var explosionAnim;
var balls;


//Controls
var activeKeys = [];


// Øvrige
var score = 0;
var miss = 0;

//#endregion VARIABLES

//#region SETUP
function preload() {
    turbanImg = loadImage("assets/net.png");
    bomb = loadImage("assets/bomb.png"); //loader vores bombe der flyver
    explosionAnim = loadAnimation("assets/explosion/explosion1.png", "assets/explosion/explosion2.png");
    explosionAnim.frameDelay = 12;
}

function setup() {
    //General setup
    createCanvas(windowWidth, windowHeight);


    //Object creation
    balls = [GameController.Objects.Presets.NewBall()];
    turban = new GameController.Objects.Types.Kurv(670, 100, turbanImg.width / 2, turbanImg.height / 2, 20, turbanImg, height, width, explosionAnim);
}
//#endregion SETUP




//#region LOOP
function draw() {
    background(0);
    checkKeys();
    GameController.Objects.UpdateAll(turban, balls);
    drawSprites();
    GameController.Ui.UpdateAll();
}

function checkKeys() {
    if (activeKeys.length > 0) {
        if (keyIsPressed)
            GameController.Controls.keyIsDown(activeKeys, turban);
        else
            activeKeys = [];
    }
}

//#endregion LOOP





//#region  EVENTS
onkeydown = function (e) {
    e = e || event;
    if (!activeKeys.includes(e.key.toLowerCase()))
        activeKeys.push(e.key.toLowerCase());
}
onkeyup = function (e) {
    e = e || event;
    for (let index = 0; index < activeKeys.length; index++) {
        if (e.key == activeKeys[index].toLowerCase())
            activeKeys.splice([index], 1);
    }
}

//#endregion EVENTS
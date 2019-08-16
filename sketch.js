
//#region VARIABLES

// Objects
var turban;
var turbanImg;
var balls;
let bomb;
var explosionAnimation
var explosionSprite

//Controls
var activeKeys = [];


// Øvrige
var tid = 50;
var score = 0;
var miss = 0;

//#endregion VARIABLES

//#region SETUP
function preload() {
    turbanImg = loadImage("assets/net.png");
    bomb = loadImage("assets/bomb.png"); //loader vores bombe der flyver
    explosionAnimation = loadAnimation("assets/explosion/explosion1.png", "assets/explosion/explosion2.png");
}

function setup() {
    //General setup
    createCanvas(750, 600);
    explosionAnimation.frameDelay = 10;


    //Object creation
    turban = new GameController.Objects.Types.Kurv(670, 100, 70, 50, 20, turbanImg, height, width);
    balls = [GameController.Objects.Presets.NewBall()];


}
//#endregion SETUP




//#region LOOP
function draw() {
    background(0);
    checkKeys();


    

    GameController.Objects.UpdateAll();
    GameController.Ui.UpdateAll();

}

function checkKeys(){
    if(activeKeys.length > 0){
        if(keyIsPressed)
            GameController.Controls.keyIsDown(activeKeys, turban);
        else
            activeKeys = [];
    }
}

//#endregion LOOP





//#region  EVENTS
onkeydown = function(e){
    e = e || event; 
    if(!activeKeys.includes(e.key.toLowerCase()))
    activeKeys.push(e.key.toLowerCase());
}
onkeyup = function(e){
    e = e || event;
    for (let index = 0; index < activeKeys.length; index++) {
        if(e.key == activeKeys[0].toLowerCase())
        activeKeys.splice([index], 1);
    }
}

//#endregion EVENTS
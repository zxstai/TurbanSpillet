/*
Først laver vi et nogle variable til at lave en appelsin
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Objects
var turban;
var turbanImg;
var balls;
let bomb;
var explosionAnimation
var explosionSprite


// Øvrige
var tid = 50;
var score = 0;
var miss = 0;

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


function draw() {
    background(0);

    if(keyIsPressed)
    GameController.Controls.keyIsDown(key, turban);

    GameController.Objects.UpdateAll();
    GameController.Ui.UpdateAll();


}

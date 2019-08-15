/*
Først laver vi et nogle variable til at lave en appelsin
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Objects
var turban;
var balls;
let bomb;
var explosionAnimation
var explosionSprite


// Øvrige
var tid = 50;
var score = 0;
var miss = 0;

/* 
 * 
 */

function preload() {
    bomb = loadImage("assets/bomb.png"); //loader vores bombe der flyver
    explosionAnimation = loadAnimation("assets/explosion/explosion1.png", "assets/explosion/explosion2.png");
}

function setup() {
    //General setup
    createCanvas(750, 600);
    explosionAnimation.frameDelay = 10;


    //Object creation
    turban = new Kurv(670, 100, 70, 50, 20);
    balls = [GameController.Objects.Presets.NewBall()];


}


function draw() {
    background(0);
    GameController.Objects.UpdateAll();
    GameController.Ui.UpdateAll();


}

function keyPressed() {
    turban.move(key);
}

function mousePressed() {

}
//Preloaded assets
var backgroundImg;
var turbanImg;
var bomb;
var explosionAnim;
var explosionSound;
var multiplayer;
var playerIsHost;
//Preloaded objects


/**
 * Global collection of scenes
 * 
 */
var SceneCollection;

function preload() {
    //Loads pictures
    buttonImg = loadImage("assets/buttons.png");
    startMenuImg = loadImage("assets/startscreen.png");
    backgroundImg = loadImage("assets/background.png");
    turbanImg = loadImage("assets/net.png");
    bomb = loadImage("assets/bomb.png");

    //Loads animation
    explosionAnim = loadAnimation("assets/explosion/explosion1.png", "assets/explosion/explosion2.png");
    //Configures animation
    explosionAnim.frameDelay = 12;

    //Loads explosion sound effect
    explosionSound = loadSound("assets/explosion/explosion.mp3");
}


function setup()
{
    
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvasContainer");

    var mgr = new SceneManager();

    //Ineject property 
    mgr.backgroundImg = backgroundImg; // inject bkImage property
    mgr.turbanImg = turbanImg; // inject bkImage property
    mgr.bomb = bomb; // inject bkImage property
    mgr.explosionSound = explosionSound;

    mgr.wire();


    mgr.addScene( GameMenu );
     
    SceneCollection = mgr;

    SceneCollection.showNextScene();

}
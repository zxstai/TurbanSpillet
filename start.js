//Preloaded assets
var backgroundImg;
var turbanImg;
var bomb;
var explosionAnim;
//Preloaded objects


/**
 * Global collection of scenes
 * 
 */
var SceneCollection;

function preload() {
    //Loads pictures
    backgroundImg = loadImage("assets/background.png");
    turbanImg = loadImage("assets/net.png");
    bomb = loadImage("assets/bomb.png");

    //Loads animation
    explosionAnim = loadAnimation("assets/explosion/explosion1.png", "assets/explosion/explosion2.png");
    //Configures animation
    explosionAnim.frameDelay = 12;
}


function setup()
{
    createCanvas(windowWidth, windowHeight);

    var mgr = new SceneManager();

    //Ineject property 
    mgr.backgroundImg = backgroundImg; // inject bkImage property
    mgr.turbanImg = turbanImg; // inject bkImage property
    mgr.bomb = bomb; // inject bkImage property

    mgr.wire();


    mgr.addScene( GameMenu );
     
    SceneCollection = mgr;

    SceneCollection.showNextScene();

}
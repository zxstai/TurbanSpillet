//Preloaded assets
var backgroundImg;
var turbanImg;
var bomb;
var explosionAnim;
//Preloaded objects


/**
 * Global collection of scenes
 * 
 * @type {SceneManager}
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
    createCanvas(backgroundImg.width, backgroundImg.height);

    var mgr = new SceneManager();

    //Ineject property 
    mgr.backgroundImg = backgroundImg; // inject bkImage property
    mgr.turbanImg = turbanImg; // inject bkImage property
    mgr.bomb = bomb; // inject bkImage property
    mgr.wire();
    mgr.addScene( Game );
     
    SceneCollection = mgr;

    SceneCollection.showNextScene();
    //mgr.showScene( Game );
}
//Preloaded assets
var backgroundImg;

function preload() {
    //Loads pictures
    backgroundImg = loadImage("assets/background.png");
    turbanImg = loadImage("assets/net.png");
    bomb = loadImage("assets/bomb.png");
    backgroundImg = loadImage("assets/background.png");

    //Loads animation
    explosionAnim = loadAnimation("assets/explosion/explosion1.png", "assets/explosion/explosion2.png");
    //Configures animation
    explosionAnim.frameDelay = 12;
}


function setup()
{
    createCanvas(backgroundImg.width, backgroundImg.height);

    var mgr = new SceneManager();
    mgr.bkImage = backgroundImg; // inject bkImage property
    mgr.wire();
    mgr.showScene( Game );
}
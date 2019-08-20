//#region VARIABLES

// Objects
var turban;
var turbanImg;
var explosionAnim;
var balls;
var backgroundImg;


//Controls
var activeKeys = [];


// Øvrige
var score = 0;
var miss = 0;

//#endregion VARIABLES

//#region SETUP
/**
 * Loads assets before setup
 *
 */
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

/**
 * Creates canvas and initial objects
 *
 */
function setup() {
    //General setup
    createCanvas(windowWidth, windowHeight);

    //Object creation
    balls = [GameController.Objects.Presets.NewBall()];
    turban = new GameController.Objects.Type.Kurv(670, 100, turbanImg.width / 2, turbanImg.height / 2, 20, turbanImg, height, width, explosionAnim);
}
//#endregion SETUP




//#region LOOP

/**
 * Main loop - Draws and runs all game logic
 *
 */
function draw() {
    //Draw background image
    background(backgroundImg, windowWidth, windowHeight);
    //Check and act upon actively pressed keys
    checkKeys();
    //Draw game and run all game logic
    GameController.Objects.UpdateAll(turban, balls);
    //Draw Ui and run Ui logic
    GameController.Ui.UpdateAll();
}

/**
 * Checks for and acts upon actively pressed keys
 *
 */
function checkKeys() {
    if (activeKeys.length > 0) {
        if (keyIsPressed)
            //Pass actively pressed keys to ActOnPressedKeys function
            GameController.Controls.ActOnPressedKeys(activeKeys, turban);
        else //Sanity check - Reset activeKeys if it contains keys, yet none are pressed
            activeKeys = [];
    }
}

//#endregion LOOP





//#region  EVENTS

/**
 * Adds pressed key to array of keys actively pressed
 *
 * @param {Event} e Contains incoming event data
 */
onkeydown = function (e) {
    e = e || event;
    //If array already contains pressed key
    if (!activeKeys.includes(e.key.toLowerCase()))
        //Add key to array of keys actively pressed
        activeKeys.push(e.key.toLowerCase());
}
/**
 * Removes lifted key from array of keys actively pressed
 *
 * @param {Event} e Contains incoming event data
 */
onkeyup = function (e) {
    e = e || event;
    //Iterates through all keys in array of keys actively pressed
    for (let index = 0; index < activeKeys.length; index++) {
        //Checks whether key exists in the array
        if (e.key == activeKeys[index].toLowerCase())
            //Removes key from array
            activeKeys.splice([index], 1);
    }
}

//#endregion EVENTS
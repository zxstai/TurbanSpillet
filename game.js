function Game() {
    
// Preloaded assets
var backgroundImg = this.sceneManager.backgroundImg();
var turbanImg = this.sceneManager.turbanImg;
var explosionAnim = this.sceneManager.explosionAnim;

// Objects
var turban = new GameNamespace.Objects.Type.Kurv(670, 100, turbanImg.width / 2, turbanImg.height / 2, 20, turbanImg, height, width, explosionAnim);
var balls = [GameNamespace.Objects.Presets.NewBall()];

//Controls
var activeKeys = [];


// Øvrige
var score = 0;
var miss = 0;

//#endregion VARIABLES




//#region LOOP

/**
 * Main loop - Draws and runs all game logic
 *
 */
this.draw = function(){
    //Draw background image
    background(backgroundImg, windowWidth, windowHeight);
    //Check and act upon actively pressed keys
    checkKeys();
    //Draw game and run all game logic
    GameNamespace.Objects.UpdateAll(turban, balls);
    //Draw Ui and run Ui logic
    GameNamespace.Ui.UpdateAll();
}

/**
 * Checks for and acts upon actively pressed keys
 *
 */
function checkKeys() {
    if (activeKeys.length > 0) {
        if (keyIsPressed)
            //Pass actively pressed keys to ActOnPressedKeys function
            GameNamespace.Controls.ActOnPressedKeys(activeKeys, turban);
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


}
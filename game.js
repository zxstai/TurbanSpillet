function Game() {
    
// Objects
this.balls = [GameNamespace.Objects.Presets.NewBall()];

//Controls
this.activeKeys = [];

//Objects
this.turban = new GameNamespace.Objects.Type.Kurv(670, 100, turbanImg.width / 2, turbanImg.height / 2, 20, turbanImg, height, width, explosionAnim);
this.balls;

// Øvrige
this.score = 0;
this.miss = 0;


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
    this.checkKeys();
    //Draw game and run all game logic
    GameNamespace.Objects.UpdateAll(this.turban, this.balls);
    //Draw Ui and run Ui logic
    GameNamespace.Ui.UpdateAll();
}

/**
 * Checks for and acts upon actively pressed keys
 *
 */
this.checkKeys = function(){
    if (this.activeKeys.length > 0) {
        if (keyIsPressed)
            //Pass actively pressed keys to ActOnPressedKeys function
            GameNamespace.Controls.ActOnPressedKeys(this.activeKeys);
        else //Sanity check - Reset activeKeys if it contains keys, yet none are pressed
            this.activeKeys = [];
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
    if (!SceneCollection.findScene(Game).oScene.activeKeys.includes(e.key.toLowerCase()))
        //Add key to array of keys actively pressed
        SceneCollection.findScene(Game).oScene.activeKeys.push(e.key.toLowerCase());
}
/**
 * Removes lifted key from array of keys actively pressed
 *
 * @param {Event} e Contains incoming event data
 */
onkeyup = function (e) {
    e = e || event;
    //Iterates through all keys in array of keys actively pressed
    for (let index = 0; index < SceneCollection.findScene(Game).oScene.activeKeys.length; index++) {
        //Checks whether key exists in the array
        if (e.key == SceneCollection.findScene(Game).oScene.activeKeys[index].toLowerCase())
            //Removes key from array
            SceneCollection.findScene(Game).oScene.activeKeys.splice([index], 1);
    }
}

//#endregion EVENTS


}
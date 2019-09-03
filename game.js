function Game() {

    // Objects
    this.balls = [gameNamespace.Objects.Presets.NewBall()];

    //Controls
    this.activeKeys = [];

    //Objects
    this.turban = new gameNamespace.Objects.Type.Kurv(670, 100, turbanImg.width / 2, turbanImg.height / 2, 20, turbanImg, windowHeight, windowWidth, explosionAnim);
    this.balls;

    // Øvrige
    this.score = 0;
    this.miss = 0;


    //#endregion VARIABLES
    this.socket;
    this.launchCooldown


    //#region LOOP

    /**
     * Main loop - Draws and runs all game logic
     *
     */

    this.setup = function () {
        if (multiplayer) {
            if (playerIsHost)
                networkCreate();
            else
                networkConnect();

            socket.onMessage(handleMessage);
            console.log(socket.id);

        }

    }

    this.draw = function () {


        //Draw background image
        background(backgroundImg, windowWidth, windowHeight);
        //Check and act upon actively pressed keys
        this.checkKeys();

        //Draw game objects
        gameNamespace.Objects.DrawAll();
        gameNamespace.Objects.UpdateAll();

        //Insure that this is not being run as a connected client
        if (!multiplayer || multiplayer && playerIsHost) {
            //Run game object logic
        }

        gameNamespace.Ui.UpdateAll();


        if (multiplayer && playerIsHost) {
            let socketMsg = JSON.stringify(new gameNamespace.Objects.Type.MultiplayerData(this.turban, this.balls, this.score));
            socket.sendMessage(socketMsg);
        }


    }

    /**
     * Checks for and acts upon actively pressed keys
     *
     */
    this.checkKeys = function () {
        if (this.activeKeys.length > 0) {
            if (keyIsPressed)
                //Pass actively pressed keys to ActOnPressedKeys function
                gameNamespace.Controls.ActOnPressedKeys(this.activeKeys);
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



    function networkConnect() {
        confirm("Please type the pin code")
        var pin = prompt("Pin: ")
        socket = ElineSocket.connect(pin);
    }

    function networkCreate() {
        socket = ElineSocket.create();
    }

    function networkRead() {
        socket.onMessage(handleMessage);
    }


    function handleMessage(msg) {

        if (!playerIsHost)
            try {
                incomingData = JSON.parse(msg);


                //TODO: Change received variables without specifying properties

                SceneCollection.findScene(Game).oScene.turban.x = incomingData.turban.x;
                SceneCollection.findScene(Game).oScene.turban.y = incomingData.turban.y;
                SceneCollection.findScene(Game).oScene.turban.w = incomingData.turban.w;
                SceneCollection.findScene(Game).oScene.turban.h = incomingData.turban.h;
                SceneCollection.findScene(Game).oScene.turban.hitStatus = incomingData.turban.hitStatus;
                SceneCollection.findScene(Game).oScene.turban.hitCoords = incomingData.turban.hitCoords;
                SceneCollection.findScene(Game).oScene.turban.bombSprites = incomingData.turban.bombSprites;
                // SceneCollection.findScene(Game).oScene.turban.bombAnima = incomingData.turban.bombAnima;


                let newArrayOfBalls = [];
                for (let index = 0; index < incomingData.balls.length; index++) {
                    newArrayOfBalls.push(new gameNamespace.Objects.Type.Ball(
                        incomingData.balls[index].x,
                        incomingData.balls[index].y,
                        incomingData.balls[index].rad,
                        incomingData.balls[index].speedY,
                        incomingData.balls[index].speedX));
                }
                SceneCollection.findScene(Game).oScene.balls = newArrayOfBalls;


                SceneCollection.findScene(Game).oScene.score = incomingData.score;
            } catch (error) {
                console.log(error);
            }
        else {
            switch (msg) {
                case 'launchBomb':
                    SceneCollection.findScene(Game).oScene.balls.push(gameNamespace.Objects.Presets.NewBall());
                    break;

                default:
                    break;
            }

        }

    }
    //socket.close();



}
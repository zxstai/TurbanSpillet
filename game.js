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
    this.launchCooldown;
    this.timeLeft = 45;
    this.gameStopped = false;


    //#region LOOP

    /**
     * Main loop - Draws and runs all game logic
     *
     */

    this.setup = function () {
        if (multiplayer) {
            //Configure eLine-sockets
            if (playerIsHost)
                networkCreate();
            else
                networkConnect();
            //Set socket message handler
            socket.onMessage(handleMessage);

            console.log(socket.id);

            if (playerIsHost) {

                //Initiate countdown timer
                setTimeout(function () {
                    timerCountdown();
                }, 1000);


            }
        }

    }



    this.draw = function () {
        //Draw background image
        background(backgroundImg, windowWidth, windowHeight);


        //Check and act upon actively pressed keys
        this.checkKeys();


        //Draw game objects
        gameNamespace.Objects.DrawAll();

        if (!this.gameStopped) {
            //Ensure that this is not being run as a connected client
            if (!multiplayer || multiplayer && playerIsHost) {
                //Run object logic
                gameNamespace.Objects.UpdateAll();
            }
            //Draw Ui
            gameNamespace.Ui.UpdateAll();
        }

        //Send out data to connected client, if instance is playing multiplayer and is the host
        if (multiplayer && playerIsHost) {
            let socketMsg = JSON.stringify(new gameNamespace.Objects.Type.MultiplayerData(this.turban, this.balls, this.score, this.timeLeft));
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


    function handleMessage(msg) {

        if (!playerIsHost) {

            switch (msg) {
                case 'gameLost':

                    SceneCollection.findScene(Game).oScene.gameStopped = true;
                    confirm(("You lost the game by failing to hit the opponent sufficiently, you were lucky to hit " +
                        incomingData.score + " times!"));
                    setTimeout(() => {
                        gameNamespace.Controls.ActOnPressedKeys(["p"])();
                    }, 1000);
                    break;
                case 'gameWon':

                    SceneCollection.findScene(Game).oScene.gameStopped = true;
                    confirm(("You won the game by hitting your opponent with the bombs, you managed to hit within " +
                        (45 - SceneCollection.findScene(Game).oScene.timeLeft) + " seconds!"));

                    setTimeout(() => {
                        gameNamespace.Controls.ActOnPressedKeys(["p"])();
                    }, 1000);
                    break;
                default:
                    try {


                        incomingData = JSON.parse(msg);
                        //TODO: Change received variables without specifying properties
                        //Adopt values from host for turban
                        SceneCollection.findScene(Game).oScene.turban.x = incomingData.turban.x;
                        SceneCollection.findScene(Game).oScene.turban.y = incomingData.turban.y;
                        SceneCollection.findScene(Game).oScene.turban.w = incomingData.turban.w;
                        SceneCollection.findScene(Game).oScene.turban.h = incomingData.turban.h;
                        SceneCollection.findScene(Game).oScene.turban.hitStatus = incomingData.turban.hitStatus;
                        SceneCollection.findScene(Game).oScene.turban.hitCoords = incomingData.turban.hitCoords;
                        SceneCollection.findScene(Game).oScene.turban.bombSprites = incomingData.turban.bombSprites;

                        //Adopt values from host for balls
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
                        SceneCollection.findScene(Game).oScene.timeLeft = incomingData.timeLeft;

                        //Set score
                        SceneCollection.findScene(Game).oScene.score = incomingData.score;
                    } catch (error) {
                        console.log(error);
                    }
                    break;
            }
        } else {
            switch (msg) {
                case 'launchBomb':
                    SceneCollection.findScene(Game).oScene.balls.push(gameNamespace.Objects.Presets.NewBall());
                    break;

                default:
                    break;
            }

        }

    }

    function timerCountdown() {
        //Count down timer and rerun this code if it is not at 0
        if (SceneCollection.findScene(Game).oScene.timeLeft > 0 && !SceneCollection.findScene(Game).oScene.gameStopped) {
            SceneCollection.findScene(Game).oScene.timeLeft--;
            setTimeout(() => {
                timerCountdown();
            }, 1000);
        }
        //Check whether anyone has won the game
        if (SceneCollection.findScene(Game).oScene.score >= 5) {
            gameLost();
        } else if (SceneCollection.findScene(Game).oScene.timeLeft <= 0) {
            gameWon();
        }
    }


    function gameWon() {

        socket.sendMessage("gameLost");
        SceneCollection.findScene(Game).oScene.gameStopped = true;


        confirm(("You won the game by escaping the bombs, you were lucky to only get hit " +
            SceneCollection.findScene(Game).oScene.score + "!"));

        setTimeout(() => {
            gameNamespace.Controls.ActOnPressedKeys(["p"])();
        }, 1000);
    }

    function gameLost() {
        socket.sendMessage("gameWon");

        confirm(("You lost the game by failing to escape the bombs, you managed to evade for " +
            (45 - SceneCollection.findScene(Game).oScene.timeLeft) + " seconds!"));

        SceneCollection.findScene(Game).oScene.gameStopped = true;

        setTimeout(() => {
            gameNamespace.Controls.ActOnPressedKeys(["p"])();
        }, 1000);
    }

    //socket.close();



}
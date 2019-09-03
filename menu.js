function GameMenu() {


    this.setup = function () {
        createButtons(); //drawing the buttons on screen

    }

    this.draw = function () {

        background(startMenuImg, windowWidth, windowHeight); //draws the background, including the logo at the browsers window width and height.
        if (document.getElementById("buttonContainer").style.visibility == "hidden") //checks if the buttons are hidden, if so then draw the buttons when GameMenu is called from GameNamspace.js's ActOnPressedKeys function (key "p" currently)
            document.getElementById("buttonContainer").style.visibility = "visible"; //sets the buttons to be visible if they are hidden


        //Remove previously used scenes, if any scenes exist besides the menu
        if (SceneCollection.scenes.length > 1)
            SceneCollection.scenes.pop();

    }

    function createButtons() { //Create the HTML buttons using DOM and attach onclick functionality
        for (let index = 0; index < 5; index++) {
            //Create new element of type button to be modified and appended to HTML
            var newBtn = document.createElement("button");
            switch (index) {
                case 0:
                    newBtn.onclick = function () { //if index[0], also known as Singleplayer button, then go start Singleplayer gamemode (currently the only gamemode)
                        multiplayer = false;
                        SceneCollection.showScene(Game); //Shows the game scene (singleplayer mode only atm)
                        document.getElementById("buttonContainer").style.visibility = "hidden"; //hides the buttons from the screen so they don't overlap on the game screen.
                    }
                    newBtn.innerHTML = "Singleplayer" //renames the button from Button+index also known as Button0 to Singleplayer
                    break;
                case 1:
                    newBtn.innerHTML = "Host" //renames the button from Button+index also known as Button1 to Multiplaye
                    newBtn.onclick = function () { //if index[0], also known as Singleplayer button, then go start Singleplayer gamemode (currently the only gamemode)
                        multiplayer = true;
                        playerIsHost = true;
                        SceneCollection.showScene(Game); //Shows the game scene (singleplayer mode only atm)
                        document.getElementById("buttonContainer").style.visibility = "hidden"; //hides the buttons from the screen so they don't overlap on the game screen.
                    }
                    break;
                case 2:
                    newBtn.innerHTML = "Connect" //renames the button from Button+index also known as Button2 to Options
                    newBtn.onclick = function () { //if index[0], also known as Singleplayer button, then go start Singleplayer gamemode (currently the only gamemode)
                        //Configure sce
                        multiplayer = true;
                        playerIsHost = false;
                        SceneCollection.showScene(Game); //Shows the game scene (singleplayer mode only atm)
                        document.getElementById("buttonContainer").style.visibility = "hidden"; //hides the buttons from the screen so they don't overlap on the game screen.
                    }
                    break;
                case 3:
                    newBtn.onclick = function () { //if index[0], also known as Singleplayer button, then go start Singleplayer gamemode (currently the only gamemode)
                        var audio = document.getElementById('player');
                        if (audio.paused) {
                            audio.play();
                        } else {
                            audio.pause();
                            audio.currentTime = 0
                        }
                    }
                    newBtn.innerHTML = "Mute Music"
                    break;

                case 4:
                    newBtn.innerHTML = "Quit" //renames the button from Button+index also known as Button3 to Quit
                    newBtn.onclick = function () { //
                        window.location.href = "http://google.com";
                    }

                    break;
                default:
                    newBtn.innerHTML = "Shit isn't working, fix it" //if the above isn't working, draw on every button, "shit isn't working, fix it"
                    break;

            }
            document.getElementById("buttonContainer").appendChild(newBtn); //assigns the new buttons to buttonContainer id in index.html

        }
    }
}
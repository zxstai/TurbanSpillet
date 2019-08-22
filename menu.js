function GameMenu() {
    

    this.setup = function() {
        createButtons();
    
    }   

    this.draw = function() {

        background(startMenuImg, windowWidth, windowHeight);
        if(document.getElementById("buttonContainer").style.visibility == "hidden")
        document.getElementById("buttonContainer").style.visibility = "visible";

    }   

    function createButtons() {
    for (let index = 0; index < 4; index++) {
        var newBtn = document.createElement("button");
        newBtn.innerHTML = "Button"+index;
        switch (index) {
            case 0:
                    newBtn.onclick = function(){
                        SceneCollection.showScene(Game);
                        document.getElementById("buttonContainer").style.visibility = "hidden";
                    }
                    newBtn.innerHTML = "Singleplayer" 
                break;
            case 1:
                    newBtn.innerHTML = "Multiplayer"
                break;
            case 2:
                    newBtn.innerHTML = "Options"
                break;
            case 3:
                    newBtn.innerHTML = "Quit"
                break;
            default:
                    newBtn.innerHTML = "Shit isn't working, fix it"
                break;
                
        }
        //document.onclick("Singleplayer")
        document.getElementById("buttonContainer").appendChild(newBtn);
        
    }
}
}
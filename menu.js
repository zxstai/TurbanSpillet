function GameMenu() {
    

    this.setup = function() {
        image(buttonImg, windowWidth-80, windowHeight);
        background(startMenuImg, windowWidth, windowHeight);
        createButtons();
    }   

    function createButtons() {
    for (let index = 0; index < 4; index++) {
        var newBtn = document.createElement("button");
        newBtn.innerHTML = "llmaaao"+index;
        document.getElementById("buttonContainer").appendChild(newBtn);
        
    }
}
}
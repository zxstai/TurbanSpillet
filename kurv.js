/*
 * Dette script definerer klassen Kurv
*/

function Kurv(x, y, bredde, dybde, speed) {
    /* Den første del af funktionen er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    this.img = loadImage("assets/net.png"); //med brug af P5.js definiere jeg et billede som jeg kan kalde senere med brug af "this.img"
    this.x = x;
    this.y = y;
    this.bred = bredde;
    this.dyb = dybde;
    this.speed = speed;
    this.col = [250,230,150]; //orange farve som skifter mellem hvid og range når en bombe bliver fanget eller ej. 

    this.tegn = function() { //det her tegner ting der er relevant til "turbanen". I mit tilfælde er det en kurv med en debug firkant til at vise hitbox. 
        text("DEBUG HITBOX", this.x, this.y);
        rect(this.x, this.y, 100, 100);
        image(this.img, this.x, this.y, 100, 100);
    }

    this.move = function(tast) { //det her er movement control i spillet.
        if (tast == 'w' || tast== 'W') {
            this.y -= this.speed;
            if (this.y < 0) {this.y = 0};
        }
        if (tast == 's' || tast == 'S') {
            this.y += this.speed;
            if (this.y > height-this.dyb) {this.y = height - this.dyb};
        }
        if (tast == 'a' || tast== 'A') {
            this.x -= this.speed;
            if (this.x < 0) {this.x = 0};
        }
        if (tast == 'd' || tast == 'D') {
            this.x += this.speed;
            if (this.x > width-this.dyb) {this.x = width - this.dyb};
        }
        
    }
    

    this.grebet = function(xa, ya, ra) {
        if ((ya < this.y+ra && ya > this.y-ra)
        &&
        xa > this.x+ra && xa < this.x+this.bred-ra) {
            return true;
        }
        else {
            return false;
        }
    }

} 



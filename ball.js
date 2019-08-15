
class Ball {
    constructor(y, speedY, speedX ){
        //Ball dimensions
        this.y = y;
        this.rad = 32;
        this.x = this.rad+200   ;

        //Static modifiers
        this.gravity = 1;
        this.friction = .95;
        this.lift = 15;

        //Variables
        this.speedY = speedY;
        this.speedX = speedX;


        this.show = function () {
            //Draw
            fill(255);
            ellipse(this.x, this.y, this.rad, this.rad);
        };

        this.update = function () {
            //Gravity
            this.speedY += this.gravity;

            //Movement
            this.y += this.speedY;
            this.x += this.speedX;

            //Bounce
            if (this.y > height - this.rad / 2) {
                this.y = height - this.rad / 2;
                this.speedY *= this.friction;
                this.speedY = -this.speedY;
                
            }
        };

    }
}

class GameController {

    static Controls = class{

        static keyIsDown = function(keys, turban) {
            keys.forEach(key => {
                switch (key) {
                    case 'a':
                    turban.MoveWest();
                        break;
                    case 's':
                    turban.MoveSouth();
                        break;
                    case 'w':
                    turban.MoveNorth();
                        break;
                    case 'd':
                    turban.MoveEast();
                        break;
                    default:
                        break;
                } 
            });
 
        }
        
    }

    static Objects = class {
        static Types = class {
            static Ball = class {
                constructor(x, y, rad, speedY, speedX) {
                    //Ball dimensions
                    this.y = y;
                    this.rad = rad;
                    this.x = x;
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
                        ellipseMode(CENTER)
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
            };            
            static Kurv = class {
                constructor(xPoint, yPoint, width, height, speed, img, containerHeight, containerWidth, bombAnimation) {

                    //Dimensions
                    this.x = xPoint;
                    this.y = yPoint;
                    this.w = width;
                    this.h = height;
                    this.containerWidth = containerWidth;
                    this.containerHeight = containerHeight

                    //Style
                    this.img = img; 
                    this.col = [250, 230, 150]; //orange farve som skifter mellem hvid og range når en bombe bliver fanget eller ej.
                    this.bombAnima = bombAnimation;

                    
                    //Settings
                    this.speed = speed;
                    this.friction = 0.85;

                    //Variables
                    this.velX = 0;
                    this.velY = 0;
                    this.hitStatus = false;
                    this.bombSprite;

         

                    this.Update = function () {
                        //Draw
                        text("DEBUG HITBOX", this.x, this.y);
                        rectMode(CORNER);
                        rect(this.x, this.y, this.w, this.h);
                        image(this.img, this.x, this.y, this.w, this.h);


                        //Movement
                        this.velX *= this.friction;
                        this.x += this.velX; 
                        this.velY *= this.friction;
                        this.y += this.velY;


                        if(this.hitStatus){

                            this.hitStatus = false;

                            this.bombSprite = createSprite(this.x, this.y);
                            this.bombSprite.addAnimation("explosion", this.bombAnima) //starter animation på 2 frames med et framerate på 10 sekunder

                           setTimeout(function(){ turban.bombSprite.remove();}, 500);
                        }

                    };

                
                    this.MoveNorth = function(){
                        if(this.velY > -this.speed) this.velY--;

                        //Collision detection
                        if (this.y <= 0) {
                            this.y = 0;
                            this.velY = 0;
                        }
                        ;
                    }
                    this.MoveSouth = function(){
                        if(this.velY < this.speed) this.velY++;

                        //Collision detection
                        if (this.y > this.containerHeight - this.h) {
                            this.y = this.containerHeight - this.h;
                            this.velY = 0;
                        }
                        ;
                    }
                    this.MoveWest = function(){
                        if (this.velX > -this.speed) this.velX--;

                        //Collision detection
                        if (this.x < 0) {
                            this.x = 0;
                            this.velX = 0;
                        }
                        ;
                    }
                    this.MoveEast = function(){
                        if (this.velX < this.speed) this.velX++;

                        //Collision detection
                        if (this.x > this.containerWidth - this.w) {
                            this.x = this.containerWidth - this.w;
                            this.velX = 0;
                        }
                        ;
                    }


                }
            };
            static Circle = class {
                constructor(xPoint, yPoint, radius) {
                    this.x = xPoint;
                    this.y = yPoint;
                    this.rad = radius;
                }
            };
            static Rect = class {
                constructor(xPoint, yPoint, height, width) {
                    this.x = xPoint;
                    this.y = yPoint;
                    this.h = height;
                    this.w = width;
                }
            };
        };
        static Presets = class {
            static NewBall = function () {
                return new GameController.Objects.Types.Ball(232, Math.round(Math.random() * 100) + 400, 32, 0, 0 * Math.random());
            };
        };
        static UpdateAll = function () {
            turban.Update();
            for (let index = 0; index < balls.length; index++) {
                //Mechanics
                balls[index].show();
                balls[index].update();
                //Out of bounds detection
                if (GameController.Objects.IsOutOfBounds(balls[index])) {
                    //Remove and create new ball --- REPLACE WITH DEATH EVENT
                    balls = balls.splice(index - 1, index);
                    balls.push(GameController.Objects.NewBall());
                }
                //If ball collides with turban
                if (collideRectCircle(turban.x, turban.y, turban.w, turban.h, balls[index].x, balls[index].y, balls[index].rad)) {
                    GameController.Ui.Values.IncrementScore();
                    //Remove and create new ball --- REPLACE WITH DEATH EVENT
                    balls = balls.splice(index - 1, index);
                    balls.push(GameController.Objects.Presets.NewBall());
                }
            }
        };
        static IsOutOfBounds = function (object) {
            //If object is out of bounds WEST || If object is out of bounds EAST
            if (object.x + object.rad / 2 < 0 || object.x - object.rad / 2 > width)
                return true;
            //If object is out of bounds NORTH || If object is out of bounds bSOUTH
            else if (object.y + object.rad / 2 < 0 || object.y - object.rad / 2 > height)
                return true;
            else
                return false;
        };
        
    };
    static Ui = class {
        static Objects = class {
        };
        static UpdateAll = function () {
            //Score counter
            GameController.Ui.Draw.ScoreCounter();
        };
        static Draw = class {
            static ScoreCounter = function () {
                fill(255);
                text("Score: " + score, width - 80, 30);

            };
            static CreateSpriteAnimation = function (x, y, explosionName, animationVariable, timeout) {
                print(x+"lmao"+y);
                 //laver en sprite animation af en bombe
                explosionSprite.addAnimation("explosion", explosionAnimation); //starter animation på 2 frames med et framerate på 10 sekunder
                setTimeout(GameController.Ui.Draw.ClearAnimation(explosionSprite), timeout); //fjerner animationen efter 1.25 sekunder (passer til når en ny bombe kommer)
            };
            static ClearAnimation = function (animation) {
                animation.remove(); //stopper en animation
            };
        };
        static Values = class {
            static IncrementScore = function () {
                score++;
                turban.hitStatus = true;

            };
        };
    };
}

const GameController = {

    Controls: {

        keyIsDown: function (keys, turban) {
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

    },    

    Objects: {
         Type:  { 
             Ball: class {
                constructor(x, y, rad, speedY, speedX) {
                    //Ball dimensions
                    this.y = y;
                    this.rad = rad;
                    this.x = x;
                    //Static modifiers
                    this.gravity = 1;
                    this.friction = .95;

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
            },
             Kurv: class {
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
                    this.animationPlayLength = 500;
                    this.animationLabel = "explosion";

                    //Variables
                    this.velX = 0;
                    this.velY = 0;
                    this.hitStatus = false;
                    this.hitCoords = [0, 0];
                    this.bombSprites = [];



                    this.Update = function () {
                        //Draw
                        rectMode(CORNER);
                        //rect(this.x, this.y, this.w, this.h);
                        image(this.img, this.x, this.y, this.w, this.h);


                        //Movement
                        this.velX *= this.friction;
                        this.x += this.velX;
                        this.velY *= this.friction;
                        this.y += this.velY;


                        if (this.hitStatus) {

                            //Reset status
                            this.hitStatus = false;

                            //Create sprite
                            var newSprite = createSprite(this.hitCoords[0], this.hitCoords[1]).addAnimation(this.animationLabel, this.bombAnima);
                            if (this.bombSprites.length == 0)
                                this.bombSprites = [newSprite];
                            else
                                this.bombSprites.push(newSprite); //starter animation på 2 frames med et framerate på 10 sekunder


                            //Remove sprite
                            setTimeout(function () {
                                for (let index = 0; index < allSprites.length; index++) {
                                    if (this.animationLabel = allSprites[index].getAnimationLabel()) {
                                        allSprites[index].remove();
                                        break;
                                    }
                                }
                            }, this.animationPlayLength);
                        }

                    };


                    this.MoveNorth = function () {

                        if (this.velY > -this.speed) this.velY--;

                        //Collision detection
                        if (this.y <= 0) {
                            this.y = 0;
                            this.velY = 0;
                        };
                    }
                    this.MoveSouth = function () {
                        if (this.velY < this.speed) this.velY++;

                        //Collision detection
                        if (this.y > this.containerHeight - this.h) {
                            this.y = this.containerHeight - this.h;
                            this.velY = 0;
                        };
                    }
                    this.MoveWest = function () {
                        if (this.velX > -this.speed) this.velX--;

                        //Collision detection
                        if (this.x < 0) {
                            this.x = 0;
                            this.velX = 0;
                        };
                    }
                    this.MoveEast = function () {
                        if (this.velX < this.speed) this.velX++;

                        //Collision detection
                        if (this.x > this.containerWidth - this.w) {
                            this.x = this.containerWidth - this.w;
                            this.velX = 0;
                        };
                    }


                }
            }
        },
         Presets: {
            NewBall: function () {
                return new GameController.Objects.Types.Ball(232, Math.round(Math.random() * 100) + 400, 32, 0, 0 * Math.random());
            },
        },
        UpdateAll:  function () {
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
                    //Remove and create new ball --- REPLACE WITH DEATH EVENT
                    turban.hitCoords = [balls[index].x, balls[index].y];
                    GameController.Ui.Values.IncrementScore();
                    balls = balls.splice(index - 1, index);
                        //Create new ball
                    setTimeout(function () {
                        balls.push(GameController.Objects.Presets.NewBall());
                    }, 750);
                    
                }
            }
        },
        IsOutOfBounds: function (object) {
            //If object is out of bounds WEST || If object is out of bounds EAST
            if (object.x + object.rad / 2 < 0 || object.x - object.rad / 2 > width)
                return true;
            //If object is out of bounds NORTH || If object is out of bounds bSOUTH
            else if (object.y + object.rad / 2 < 0 || object.y - object.rad / 2 > height)
                return true;
            else
                return false;
        },

    },
    Ui: {
        Objects:{},
        UpdateAll: function () {
            //Score counter
            GameController.Ui.Draw.ScoreCounter();
        },
        Draw: {
             ScoreCounter: function () {
                fill(255);
                text("Score: " + score, width - 80, 30);

            },
        },
        Values: {
            IncrementScore: function () {
                score++;
                turban.hitStatus = true;

            },
        },
    },
}
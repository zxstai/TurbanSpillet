/**
 * Namespace containing functions and methods used by the game
 * @namespace gameNamespace
 */
const gameNamespace = {
    /**
     * Functions related to game controls
     *  @memberof gameNamespace
     *  @namespace gameNamespace.Controls
     * 
     */
    Controls: {

        /**
         * Calls methods depedent on incoming keystrokes
         *
         * @param {Array} keys String array of actively pressed keys
         * @memberof gameNamespace.Controls
         */
        ActOnPressedKeys: function (keys) { //If the key is pressed down, then move.
            keys.forEach(key => { //Checking that if both A & W is pressed down, it will move west and north at the same time.
                switch (key) {
                    case 'a':
                        SceneCollection.findScene(Game).oScene.turban.MoveWest();
                        break;
                    case 's':
                        SceneCollection.findScene(Game).oScene.turban.MoveSouth();
                        break;
                    case 'w':
                        SceneCollection.findScene(Game).oScene.turban.MoveNorth();
                        break;
                    case 'd':
                        SceneCollection.findScene(Game).oScene.turban.MoveEast();
                        break;
                    case 'p': //when pressing P, the game will return the user to the Menu screen then further waits input from the user
                        SceneCollection.showScene(GameMenu);
                    break;
                    case ' ':
                        SceneCollection.findScene(Game).oScene.balls.push(gameNamespace.Objects.Presets.NewBall());
                        console.log(" ");
                    break;
                    default:
                        break;
                }
            });

        }

    },
    /**
     *  Functions and objects related to the playable parts of the game
     *  @memberof gameNamespace
     *  @namespace gameNamespace.Objects
     */
    Objects: {
        /**
         * Instantiable game objects
     *  @memberof gameNamespace.Objects
     *  @namespace gameNamespace.Objects.Type
     */
        Type: {
            /**
             * Ball class
             */
            Ball: class {
                /**
                 * Ball/Bomb objecst to shoot towards Basket/Turban object
                 * 
                 * @param {number} x Starting coordinate on the X-axis
                 * @param {number} y Starting coordinate on the Y-axis
                 * @param {number} rad Radius of object 
                 * @param {number} speedY Starting velocity on the Y-axis
                 * @param {number} speedX Starting velocity on the X-axis
                 *  @memberof gameNamespace.Objects.Type
                 */
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

                    /**
                     * Draw object to canvas
                     *
                     */
                    this.show = function () {
                        //Draw
                        imageMode(CENTER);
                        image(SceneCollection.bomb, this.x ,this.y, this.rad, this.rad);
                    };

                    /**
                     * Update object movement
                     *
                     */
                    this.update = function () {
                        //Draw object
                        this.show();
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
            /**
             * Kurv/Basket/Turban class
             */
            Kurv: class {
                /**
                 *  Basket/Turban object 
                 * 
                 * @param {number} xPoint Starting coordinate on the X-axis
                 * @param {number} yPoint Starting coordinate on the Y-axis
                 * @param {number} width  Width of object
                 * @param {number} height Height of object
                 * @param {number} speed Max directional speed
                 * @param {*} img Object image to draw 
                 * @param {number} containerHeight Container canvas height
                 * @param {number} containerWidth Container canvas width
                 * @param {*} bombAnimation Bomb p5 Animation to play upon collision
                 *  @memberof gameNamespace.Objects.Type
                 */
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



                    /**
                     * Runs object logic
                     *
                     */
                    this.Update = function () {
                        //Draw
                        rectMode(CORNER);
                        image(this.img, this.x, this.y, this.w, this.h);

                        this.BorderCollisionCheck();
                        this.Move();

                        //If object has been hit
                        if (this.hitStatus) {
                            //Reset collision status
                            this.hitStatus = false;
                            this.PlayExplosion();
                            this.PlayAnimation();
                        };


                    }
                    this.PlayExplosion = function () {
                        SceneCollection.explosionSound.play();
                        
                    }
                    /**
                     * Plays bomb animation once
                     *
                     */
                    this.PlayAnimation = function () {

                        //Create bomb animation upon collision poin
                        var newSprite = createSprite(this.hitCoords[0], this.hitCoords[1]).addAnimation(this.animationLabel, this.bombAnima);
                        if (this.bombSprites.length == 0)
                            this.bombSprites = [newSprite];
                        else
                            this.bombSprites.push(newSprite); //starter animation på 2 frames med et framerate på 10 sekunder

                        //Delay action to remove animation after determined play length
                        setTimeout(function () {
                            for (let index = 0; index < allSprites.length; index++) {
                                if (this.animationLabel = allSprites[index].getAnimationLabel()) {
                                    allSprites[index].remove();
                                    break;
                                }
                            }
                        }, this.animationPlayLength);
                    }


                    /**
                     * Moves object dependent on velocity and diminshes the velocity
                     *
                     */
                    this.Move = function () {

                        //Moves object along X-axis and diminishes X-axis velocity
                        this.velX *= this.friction;
                        this.x += this.velX;

                        //Moves object along Y-axis and diminishes Y-axis velocity
                        this.velY *= this.friction;
                        this.y += this.velY;
                    }

                    /**
                     * Halts movement if object collides with container
                     *
                     */
                    this.BorderCollisionCheck = function () {
                        //Collision detection NORTH
                        if (this.y < 0) {
                            this.y = 0;
                            this.velY = 0;
                        };
                        //Collision detection SOUTH
                        if (this.y > this.containerHeight - this.h) {
                            this.y = this.containerHeight - this.h;
                            this.velY = 0;
                        };
                        //Collision detection WEST
                        if (this.x < 0) {
                            this.x = 0;
                            this.velX = 0;
                        };
                        //Collision detection EAST
                        if (this.x > this.containerWidth - this.w) {
                            this.x = this.containerWidth - this.w;
                            this.velX = 0;
                        };
                    }


                    /**
                     * Add negative velocity towards the Y-axis
                     *
                     */
                    this.MoveNorth = function () {

                        if (this.velY > -this.speed) this.velY--;
                    }

                    /**
                     * Add positive velocity towards the Y-axis
                     *
                     */
                    this.MoveSouth = function () {
                        if (this.velY < this.speed) this.velY++;


                    }

                    /**
                     * Add negative velocity towards the X-axis
                     *
                     */
                    this.MoveWest = function () {
                        if (this.velX > -this.speed) this.velX--;


                    }
                    /**
                     * Add positive velocity towards the X-axis
                     *
                     */
                    this.MoveEast = function () {
                        if (this.velX < this.speed) this.velX++;


                    }


                }
            }
        },
        /** 
         * Preconfigured objects
     *  @memberof gameNamespace.Objects
     *  @namespace gameNamespace.Objects.Presets
     */
        Presets: {
            /**
             * Ball object devoid of initial directional velocity
             * 
             *  @returns {gameNamespace.Objects.Type.Ball} Preconfigured ball object without directional velocity
             *  @memberof gameNamespace.Objects.Presets
             */
            NewBall: function () {
                return new gameNamespace.Objects.Type.Ball(232, Math.round(Math.random() * 100) + 400, 128, -25, 32 * Math.random());
            },
        },
        /**
         *  Runs logic of game objects
         * 
         *  @memberof gameNamespace.Objects
         */
        UpdateAll: function () {

            //Updates movement and draws turban on canvas
            SceneCollection.findScene(Game).oScene.turban.Update();

            //Draws all sprites/animations
            drawSprites();

            //Iterates through all balls in the balls array and calls methods to draw, update movement, check for collision, remove and create balls.
            for (let index = 0; index < SceneCollection.findScene(Game).oScene.balls.length; index++) {
                //Update movement and draws ball on canvas
                SceneCollection.findScene(Game).oScene.balls[index].update();

                //Out of bounds detection
                if (gameNamespace.Objects.IsOutOfBounds(SceneCollection.findScene(Game).oScene.balls[index])) {
                    //Remove and create new ball --- REPLACE WITH DEATH EVENT
                    SceneCollection.findScene(Game).oScene.balls = SceneCollection.findScene(Game).oScene.balls.splice(index - 1, index);
                    SceneCollection.findScene(Game).oScene.balls.push(gameNamespace.Objects.Presets.NewBall());
                }

                //If ball collides with turban
                if (collideRectCircle(SceneCollection.findScene(Game).oScene.turban.x, SceneCollection.findScene(Game).oScene.turban.y, SceneCollection.findScene(Game).oScene.turban.w, SceneCollection.findScene(Game).oScene.turban.h, SceneCollection.findScene(Game).oScene.balls[index].x, SceneCollection.findScene(Game).oScene.balls[index].y, SceneCollection.findScene(Game).oScene.balls[index].rad)) {
                    //Update basket/turban object with ball collision point
                    SceneCollection.findScene(Game).oScene.turban.hitCoords = [SceneCollection.findScene(Game).oScene.balls[index].x, SceneCollection.findScene(Game).oScene.balls[index].y];
                    //Enable hit/collision status on basket/turban
                    SceneCollection.findScene(Game).oScene.turban.hitStatus = true;
                    //Increment score counter
                    gameNamespace.Ui.Values.IncrementScore();
                    //Remove ball
                    SceneCollection.findScene(Game).oScene.balls = SceneCollection.findScene(Game).oScene.balls.splice(index - 1, index);
                    //Create new ball after timed delay
                    setTimeout(function () {
                        SceneCollection.findScene(Game).oScene.balls.push(gameNamespace.Objects.Presets.NewBall());
                    }, 750);

                }
            }
        },
        /**
         * Check whether object is out of bounds of the browser window
         *
         * @param {gameNamespace.Objects.Type.Ball} object Object to check whether is out of bounds
         * @returns {boolean} Boolean of whether object is out of bounds
         *  @memberof gameNamespace.Objects
         */
        IsOutOfBounds: function (object) {
            //If object is out of bounds WEST || If object is out of bounds EAST
            if (object.x + object.rad / 2 < 0 || object.x - object.rad / 2 > width)
                return true;
            //If object is out of bounds NORTH || If object is out of bounds SOUTH
            else if (object.y + object.rad / 2 < 0 || object.y - object.rad / 2 > height)
                return true;
            else
                return false;
        },

    },
    /**
     * Functions for use within game Ui
     *  @memberof gameNamespace
     *  @namespace gameNamespace.Ui
     */
    Ui: {
        /**
         * Runs logic of game UI
         * 
         *  @memberof gameNamespace.Ui
         */
        UpdateAll: function () {
            //Draw score counter
            gameNamespace.Ui.Draw.ScoreCounter();
        },
        /**
         * Functions used to draw UI
         *  @memberof gameNamespace.Ui
         *  @namespace gameNamespace.Ui.Draw
         */
        Draw: {
            /**
             * Draws the score counter
             *  @memberof gameNamespace.Ui.Draw
             */
            ScoreCounter: function () {
                fill(51)//grayscaled color
                rect(width - 202.5, 13, 185,50,20,20); //rectangle top right side for score counter
                fill(0,255,255); //cyan color for text
                textSize(40); //text size
                text("Score: " + SceneCollection.findScene(Game).oScene.score, width - 200, 50); //Drawing 
            },
        },
        /** 
         * Functions used to act upon values used by UI
         *  @memberof gameNamespace.Ui
         *  @namespace gameNamespace.Ui.Values
         */
        Values: {
            /**
             * Increments score counter
             * 
             *  @memberof gameNamespace.Ui.Values
             */
            IncrementScore: function () {
                SceneCollection.findScene(Game).oScene.score++;

            },
        },
    },
}
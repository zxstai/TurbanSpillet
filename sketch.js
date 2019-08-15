/*
Først laver vi et nogle variable til at lave en appelsin
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen
var x = 0;
var y = 550;
var rad = 20;
var xspeed = 4;
var yspeed = -10;
var newspeed;
var grav = 0.12;
var col = [200, 100, 0];
let bomb;
var explosionAnimation
var explosionSprite

// Turbanen
var turban;
var balls;

// Øvrige
var tid = 50;
var score = 0;
var miss = 0;

/* 
 * 
 */

function preload() {
    bomb = loadImage("assets/bomb.png"); //loader vores bombe der flyver
    explosionAnimation = loadAnimation("assets/explosion/explosion1.png", "assets/explosion/explosion2.png");
}

function setup() {
    //General setup
    createCanvas(750, 600);


    //Object creation
    newspeed = yspeed;
    x = rad;
    turban = new Kurv(670, 100, 70, 50, 20);
    balls = [GameController.Objects.Presets.NewBall()];

    explosionAnimation.frameDelay = 10;

}


function draw() {
    background(0);
    GameController.Objects.UpdateAll();
    GameController.Ui.UpdateAll();


}

class GameController {
    static Objects = class {

        static Types = class {
            static Circle = class {
                constructor(xPoint, yPoint, radius) {
                    this.x = xPoint;
                    this.y = yPoint;
                    this.rad = radius;

                }
            }
            static Rect = class {
                constructor(xPoint, yPoint, height, width) {
                    this.x = xPoint;
                    this.y = yPoint;
                    this.h = height;
                    this.w = width;

                }
            }
        }
        static Presets = class {
            static NewBall = function () {
                return new Ball(
                    232,
                    Math.round(Math.random() * 100) + 400,
                    32,
                    0,
                    0 * Math.random(),
                );
            }
        }

        static UpdateAll = function () {
            turban.tegn();

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
                if (GameController.Objects.RectRectColliding(
                        new GameController.Objects.Types.Rect(balls[index].x, balls[index].y, balls[index].rad,balls[index].rad),
                        new GameController.Objects.Types.Rect(turban.x, turban.y, turban.dyb, turban.bred))) {

                    GameController.Ui.Draw.CreateSpriteAnimation(balls[index].x, balls[index].y, "explosion", explosionAnimation);

                    GameController.Ui.Values.IncrementScore();

                    //Remove and create new ball --- REPLACE WITH DEATH EVENT
                    balls = balls.splice(index - 1, index);
                    balls.push(GameController.Objects.Presets.NewBall());
                }


            }



        }

        static IsOutOfBounds = function (object) {
            //If object is out of bounds WEST || If object is out of bounds EAST
            if (object.x + object.rad / 2 < 0 || object.x - object.rad / 2 > width)
                return true;
            //If object is out of bounds NORTH || If object is out of bounds bSOUTH
            else if (object.y + object.rad / 2 < 0 || object.y - object.rad / 2 > height)
                return true;
            else
                return false;
        }

        static RectRectColliding = function (rect1, rect2) {


            if (rect1.x <= rect2.x + rect2.width &&
                rect1.x + rect1.width >= rect2.x &&
                rect1.y <= rect2.y + rect2.height &&
                rect1.y + rect1.height >= rect2.y) 
                return true;
            else 
                return false;
        }
        static CircleCircleColliding = function (circle1, circle2) {
            
            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < circle1.rad + circle2.rad) 
                return true;
            else 
                return false;
            
        }
        static RectCircleColliding2 = function (circle, rect) {
            var DeltaX = circle.x - max(rect.x, min(circle.x, rect.x + rect.w));
            var DeltaY = circle.y - max(rect.y, min(circle.y, rect.y + rect.h));
            return (DeltaX * DeltaX + DeltaY * DeltaY) < (circle.rad * circle.rad);
        }
        // return true if the rectangle and circle are colliding
        static RectCircleColliding = function (circle, rect) {
            var distX = Math.abs(circle.x - rect.x - rect.w / 2);
            var distY = Math.abs(circle.y - rect.y - rect.h / 2);

            if (distX > (rect.w / 2 + circle.r)) {
                return false;
            }
            if (distY > (rect.h / 2 + circle.r)) {
                return false;
            }

            if (distX <= (rect.w / 2)) {
                return true;
            }
            if (distY <= (rect.h / 2)) {
                return true;
            }

            var dx = distX - rect.w / 2;
            var dy = distY - rect.h / 2;
            return (dx * dx + dy * dy <= (circle.r * circle.r));
        }

        



    }

    static Ui = class {

        static UpdateAll = function () {
            //Score counter
            GameController.Ui.Draw.ScoreCounter();

        }


        static Draw = class {
            static ScoreCounter = function () {
                fill(255);
                text("Score: " + score, width - 80, 30);
            }

            static CreateSpriteAnimation = function (x, y, explosionName, animationVariable, timeout) {
                explosionSprite = createSprite(x, y); //laver en sprite animation af en bombe
                explosionSprite.addAnimation(explosionName, animationVariable) //starter animation på 2 frames med et framerate på 10 sekunder
                setTimeout(GameController.Ui.Draw.ClearAnimation(explosionSprite), timeout); //fjerner animationen efter 1.25 sekunder (passer til når en ny bombe kommer)

            }

            static ClearAnimation = function (animation) {
                animation.remove(); //stopper en animation
            }

        }
        static Values = class {
            static IncrementScore = function () {
                score++;
            }

            static CheckScore = function () {
                // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
                if (turban.grebet(x, y, rad)) {
                    explosionSprite = createSprite(this.x, this.y); //laver en sprite animation af en bombe
                    explosionSprite.addAnimation("explosion", explosionAnimation) //starter animation på 2 frames med et framerate på 10 sekunder
                    score += 1; //tilføjer 1 til score
                    shootNew();

                }
            }
        }

    }
}


function keyPressed() {
    turban.move(key);
}

function mousePressed() {

}
"use strict";

var lasers;
var asteroids;
var gameOver;
var gameRadius= 200;
var score;
let font,
fontsize = 20;

//pre loads ressources
function preload() {
  font = loadFont('assets/fonts/Roboto-Light.ttf');
}

//setup the sketch (aka "init" function)
function setup() {
    createCanvas(400, 400);
    lasers = [];
    asteroids = [];
    gameOver=false;
    score=0;
    textFont(font);
    textSize(fontsize);
}

//redraw the sketch (aka "update&redraw")
function draw() {
    background(0);
    //the gameOver boolean is the main control flow
    if(!gameOver)
    {
        //1 - Ship redraw
        let dx = mouseX - width / 2;
        let dy = mouseY - height / 2;
        let angle1 = atan2(dy, dx);
        ship(angle1- PI/2);

        //2 - Laser redraw
        //todo : add cooldown because the laser is op
        if (mouseIsPressed) {
    
            lasers.push(new Laser(dx,dy));
        } 
    
        for (var i = 0; i < lasers.length; i++) {
            lasers[i].move();
            lasers[i].display();
            if(lasers[i].isOutOfRange())
            {
                lasers.splice(i,1);
            }
          }
        
        //3 - asteroid redraw
        //try add asteroid : 20% chance
        if(random() < 0.1)
        {
            asteroids.push(new Asteroid())
        }
        for (var i = 0; i < asteroids.length; i++) {
            const ast = asteroids[i];
            //the ugly combinatory hell part
            if(ast)
            {
                for (let j = 0; j < lasers.length; j++) {
                    lasers[j]?.checkCollision(j,i,ast);
                }
                ast.move();
                ast.display();
                if(ast.isCollidingShip())
                {
                    gameOver = true;
                }
            }
            
        }
        //4 - score draw
        fill(0,255,0);
        textAlign(LEFT, TOP);
        text(`${score}`, 0, 0);
    }
    else{
        fill(0,255,0);
        textAlign(CENTER, CENTER);
        textSize(40);
        text(`game over \n score : ${score}`, width * 0.5, height * 0.5);
    }
}

//an example of "function-object" in js, handled by processing
function ship(a)
{
    push();

    translate(width / 2, height / 2);
    rotate(a);
    translate(-10, -10);
    stroke(0,0,0);
    fill(255);
    triangle(0, 0, 20, 0, 10, 20);

    pop();
}

/**
 * Represent a laser, shooted by the ship
 */
class Laser {
    constructor(dx,dy) {
        this.vector = createVector(dx, dy);
        this.vector.normalize();
        this.x = width / 2;
        this.y = height / 2;
        this.diameter = 3;
        this.speed = 5;
    }
  
    move() {
        this.x += this.vector.x * this.speed;
        this.y += this.vector.y * this.speed;
    }

    isOutOfRange()
    {
        let distanceVect = p5.Vector.sub(createVector(this.x, this.y ), createVector(width / 2 ,height / 2 ));
        let distanceVectMag = distanceVect.mag();
        return distanceVectMag > (gameRadius*2);
    }
  
    display() {
        stroke(0,255,0);
        strokeWeight(3);
        line(this.x, this.y, this.x + (this.vector.x*this.diameter), this.y + (this.vector.y*this.diameter));
    }
    checkCollision(thisIdx,astIdx,asteroid)
    {
        //check distance between the laser and the asteroid center
        //todo optimise by storing the vector
        let distanceVect = p5.Vector.sub(createVector(this.x, this.y ), createVector(asteroid.x, asteroid.y ));
        let distanceVectMag = distanceVect.mag();
        let minDistance = this.diameter/2 + asteroid.diameter/2;
        //if distance is lower than both radii : they collide
        if (distanceVectMag < minDistance) {
            asteroids.splice(astIdx,1);
            lasers.splice(thisIdx,1);
            score++;
        }
    }
}
/**
 * Represent an asteroid, roaming to the ship
 */
class Asteroid {
    constructor() {
        let sourceAngle = random()* PI*2;
        this.x = width / 2 + gameRadius*cos(sourceAngle);
        this.y = height / 2+ gameRadius*sin(sourceAngle);
        this.vector = createVector(-gameRadius*cos(sourceAngle) , -gameRadius*sin(sourceAngle));
        this.vector.normalize();
        this.diameter = 10*random(1,2);
        this.speed = 0.2;
    }

    move() {
        this.x += this.vector.x * this.speed;
        this.y += this.vector.y * this.speed;
    }

    display() {
        fill(255,0,0);
        stroke(0,0,0);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    isCollidingShip()
    {
        let distanceVect = p5.Vector.sub(createVector(this.x, this.y ), createVector(width / 2 ,height / 2 ));
        let distanceVectMag = distanceVect.mag();
        return distanceVectMag < 20;
    }
}
  
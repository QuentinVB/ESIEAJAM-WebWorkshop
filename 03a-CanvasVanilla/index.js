"use strict";
(function() {

    //global var, accessible everywhere
    var canvas;
    var context;
    const WIDTH = 400;
    const HEIGHT = 300;
    const DEBUG = false;
    const SPEED = 10;
    var mapKey = {};

    const CIRCLECOLOR_IN ="lime";
    const CIRCLECOLOR_OUT ="purple";
    var isInCircle=false;
    var circle = 
    {
        x:WIDTH/2,
        y:HEIGHT/2,
        radius:30
    }
    var squareLocation = 
    {
        x:WIDTH/2,
        y:HEIGHT/2
    }

    //init the game
    function init()
    {
        canvas = document.createElement("canvas");
        canvas.width =WIDTH;
        canvas.height = HEIGHT;
        context = canvas.getContext("2d");
        if(!DEBUG)
        {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
        }
        context.strokeStyle = CIRCLECOLOR_IN;
        context.fillStyle = "red";
        document.body.insertBefore(canvas, document.body.childNodes[0]);
    }

    //the main loop with the callback
    function loop()
    {
        update();
        draw();
        window.requestAnimationFrame(loop);
    }
    //update underlying logic
    function update()
    {
        clear();
        catchKey();
        updateDistance();
    }
    //update the canvas
    function draw()
    {
        //redraw circle
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        context.stroke();
        //redraw square
        context.fillRect(squareLocation.x, squareLocation.y, 20, 20);
    }

    /**
     * Recompute the distance between the circle and the square upper left corner
     */
    function updateDistance()
    {
        const distance = Math.sqrt((squareLocation.x -circle.x )*(squareLocation.x -circle.x ) + (squareLocation.y -circle.y )*(squareLocation.y -circle.y ));
        if(distance<circle.radius)
        {
            context.strokeStyle = CIRCLECOLOR_IN;
        }
        else
        {
            context.strokeStyle = CIRCLECOLOR_OUT;
        }
    }
    /**
     * Clear the canvas
     */
    function clear()
    {
        context.clearRect(0, 0, WIDTH,HEIGHT);
    }
    /**
     * Catch the key
     */
    function catchKey()
    {
        //this create on-the-fly the map of key catched. this allow to match 2 key at the same time
        onkeydown = onkeyup = function(e){
            e = e || event; // to deal with IE
            mapKey[e.keyCode] = e.type == 'keydown';
            //ArrowUp
            if (mapKey[38]) {
                squareLocation.y-=SPEED;
            }
            //ArrowDown
            if (mapKey[40]) {
                squareLocation.y+=SPEED;
            }
            //ArrowLeft
            if (mapKey[37]) {
                squareLocation.x-=SPEED;
            }
            //ArrowRight
            if (mapKey[39]) {
                squareLocation.x+=SPEED;
            }

        }
    }

    //START the "game" at least
    init();
    window.requestAnimationFrame(loop);
})();
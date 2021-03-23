# Processing5.JS - Asteroids

This example display a simple game using the processing lib portage on javascript p5.js. The library is mandatory and must be downloaded [here] (https://p5js.org/download/) and put insinde the assets/lib folder. Because Processing use an ES6 assets management, it require a live Server associated with. If you don't, you'll run into a [CORS](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

[DEMO](http://les-planetes2kentin.fr/otherProject/CanvasAsteroid/index.html)

## Description

The game is a simple asteroid shooter inspired by "Spacewar!". The player can rotate his ship (a simple triangle at the center of the screen) by moving the mouse. By clicking, the ship shot a laser in the direction the ship is pointing.

Random asteroid are coming around. If a laser hit an asteroid, both are destroyed. Each destroyed asteroid increment a score.  If the ship is hit by an asteroid, it is game over and the score is shown.

## Implementation
The description of the game is quite simple, the code fit in less than 200 lines, thanks to p5.js lib. The main loop (draw) call successively : 
- Ship redraw, according to the mouse orientation
- Laser creation
- each lasers is updated and redraw
- asteroid creation
- each asteroids is updated, the collisions are checked and they are redraw
- score redraw

## Possible improvements

Two classes exist in order to ease logic : Asteroid and Laser. Both behave almost the same (it may be a good option for refactoring). The ship is managed by a single function. To ease reusability, transforming this into a class and instancing the ship may be another good option.
Moreover, the "rapid fire" of the ship tend to make the game too easy. We can add some delay (using a timer) or we can randomly speed up some asteroid.

## Documentation
https://p5js.org/learn/
https://p5js.org/examples/


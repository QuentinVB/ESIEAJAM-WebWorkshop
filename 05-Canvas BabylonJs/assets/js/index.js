"use strict";

const createScene =  () => {
    //setup scene
    const scene = new BABYLON.Scene(engine);
    const assumedFramesPerSecond = 60;
    const earthGravity = -9.81;
    scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0);

    // Enable Collisions
    scene.collisionsEnabled = true;

    // Lights
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);

    // Need a free camera for collisions
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);
    camera.speed = 0.5;
    camera.keysUp = [90]; // Z
    camera.keysDown = [83]; // S
    camera.keysLeft = [81]; // Q
    camera.keysRight = [68]; // D

     //Then apply collisions and gravity to the active camera
     camera.checkCollisions = true;
     camera.applyGravity = true;
 
     //Set the ellipsoid around the camera (e.g. your player's size)
     camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);

    //Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 20.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(0, 0, 0);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    ground.checkCollisions = true;

    var wall1 = BABYLON.Mesh.CreatePlane("ground", 20.0, scene);
    wall1.material = new BABYLON.StandardMaterial("groundMat", scene);
    wall1.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    wall1.material.backFaceCulling = false;
    wall1.position = new BABYLON.Vector3(0, 0, -10);
    wall1.scaling.z = 0.5;
    wall1.scaling.y = 0.3;
    wall1.checkCollisions = true;

    //Simple crate
    var box = BABYLON.Mesh.CreateBox("crate", 2, scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseTexture = new BABYLON.Texture("assets/mesh/crate-diff.jpg", scene);
    box.position = new BABYLON.Vector3(0, 1, 4);
    box.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
    box.checkCollisions = true;

    return scene;
}
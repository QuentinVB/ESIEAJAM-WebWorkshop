"use strict";



const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    //load the house mesh
    BABYLON.SceneLoader.LoadAssetContainer("assets/mesh/", "house.babylon", scene, function (container) {
        defaultHouse= container.meshes[0];     
    });

    // Parameters: name, alpha, beta, radius, target position, scene
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    
    // Light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    
    //Ground
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("assets/img/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:24, height:24});
    ground.material = groundMat;

    //large ground
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture("assets/img/valleygrass.png");
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "assets/img/villageheightmap.png", 
        {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 4});
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;

    //better approach with actions :https://doc.babylonjs.com/divingDeeper/events/actions
    scene.onPointerDown = function (event, pickResult){
        console.log('(' + pickResult.pickedPoint.x + ',' + pickResult.pickedPoint.y +',' + pickResult.pickedPoint.z +')');  
        if(pickResult.pickedPoint && event.button == 2 && defaultHouse && gold>=5)
        {
                var newHouse = defaultHouse.createInstance(Math.random().toString(3));
                newHouse.position = new BABYLON.Vector3(pickResult.pickedPoint.x, pickResult.pickedPoint.y, pickResult.pickedPoint.z);
                newHouse.rotation = new BABYLON.Vector3(0,Math.random()*2*Math.PI,0);
                gold-= 5;
                houses++;
                updateGoldDisplay();
        }
    }

    //add sky
    //https://doc.babylonjs.com/start/chap5/sky
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:500.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;			
	    

    //replenish gold
    const Timer ={
        timeout: 3000,
        contextObservable: scene.onBeforeRenderObservable,
        onEnded: () => {
            if(houses>0)
            {
                gold+= houses;
                updateGoldDisplay();
            }

          BABYLON.setAndStartTimer(Timer);

        },
      }

    BABYLON.setAndStartTimer(Timer);

    return scene;
}
function updateGoldDisplay()
{
    goldElement.innerText=`Gold : ${gold}\nHouses : ${houses}`;
}


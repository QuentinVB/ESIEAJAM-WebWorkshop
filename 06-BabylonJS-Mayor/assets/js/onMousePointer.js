
//this js is a sample of how to get the picker point (from Babylon.JS forum)


let vector = { x:'', y:'', z:'' };
scene.onPointerDown = function (event, pickResult){
        //left mouse click
        
        if(event.button == 0){
                vector = pickResult.pickedPoint;
                console.log('left mouse click: ' + vector.x + ',' + vector.y + ',' + vector.z );
        }
        //right mouse click
        if(event.button == 2){
                vector.x = pickResult.pickedPoint.x;
                vector.y = pickResult.pickedPoint.y;
                vector.z = pickResult.pickedPoint.z;
                console.log('right mouse click: ' + vector.x + ',' + vector.y + ',' + vector.z );
        }
        //Wheel button or middle button on mouse click
        if(event.button == 1){
                vector['x'] = pickResult.pickedPoint['x'];
                vector['y'] = pickResult.pickedPoint['y'];
                vector['z'] = pickResult.pickedPoint['z'];
                console.log('middle mouse click: ' + vector.x + ',' + vector.y + ',' + vector.z );
        }
}


scene.onPointerDown = function (event, pickResult){
        console.log('(' + pickResult.pickedPoint.x + ',' + pickResult.pickedPoint.y +',' + pickResult.pickedPoint.z +')');  
//Simple crate
let box = BABYLON.Mesh.CreateBox("crate", 2, scene);
box.material = new BABYLON.StandardMaterial("Mat", scene);
box.position = new BABYLON.Vector3(pickResult.pickedPoint.x, pickResult.pickedPoint.y, pickResult.pickedPoint.z);
}
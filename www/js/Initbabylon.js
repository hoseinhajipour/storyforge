const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function (laoadformurl = null) {
    const scene = new BABYLON.Scene(engine);
    Maincamera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 1, new BABYLON.Vector3(0, 0, 0), scene);
    Maincamera.setPosition(new BABYLON.Vector3(0, 1.5, 2));
    Maincamera.minZ = 0.001;
    Maincamera.collisionMask = 1; //check to see if needed
    Maincamera.checkCollisions = true;
    //   Maincamera.wheelPrecision = 0.001;

    Maincamera.setTarget(new BABYLON.Vector3(0, 1.5, 0));
    Maincamera.attachControl(canvas, true);
    this.Maincamera.wheelPrecision = 500;
    // this.Maincamera.zoomToMouseLocation = true;


    const light_0 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light_0.intensity =3;
    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
    light.position = new BABYLON.Vector3(0, 15, -30);



    shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

    // Skybox

    var box = BABYLON.Mesh.CreateBox('SkyBox', 2048, scene, false, BABYLON.Mesh.BACKSIDE);
    box.material = new BABYLON.SkyMaterial('sky', scene);
    box.backFaceCulling = false;
    box.isPickable = false;
    box.material.inclination = -0.35;
    // Reflection probe
    var rp = new BABYLON.ReflectionProbe('ref', 1024, scene);
    rp.renderList.push(box);

    var options = new BABYLON.SceneOptimizerOptions();
    options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));

// Optimizer
    var optimizer = new BABYLON.SceneOptimizer(scene, options);


    //  boundingBoxGizmo.isEnabled = false; // Initially, disable the gizmo


    return scene;
};

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
scene.debugLayer.show();
//scene.debugLayer.show({ embedMode: true });

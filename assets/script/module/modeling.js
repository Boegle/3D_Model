let renderer;
let scene;
let camera;

let model = {
    init : function () {
        let scene = new THREE.Scene();
    },
    createCube: function () {
        //Create Scene
        scene = new THREE.Scene();

        //Create Camera
        camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.x = 15;
        camera.position.y = 35;
        camera.position.z = 30;
        camera.lookAt(scene.position);

        //Create object
        let cubeGeometry = new THREE.CubeGeometry(7,4,7);
        let cubeMaterial = new THREE.MeshLambertMaterial({
            color: 'red'
        })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        scene.add(cube);

        //Create plane for the object to sit on
        let planeGeometery = new THREE.PlaneGeometry(20, 20);
        let planeMaterial = new THREE.MeshLambertMaterial({
            color: 'blue'
        });
        let plane = new THREE.Mesh(planeGeometery,planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -4;
        plane.receiveShadow = true;
        scene.add(plane);

        //Shine light on object
        var spotLight = new THREE.SpotLight(0xffffffff);
        spotLight.position.set(10, 20, 20);
        spotLight.castShadow = true;
        scene.add(spotLight);

        //Render 
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        document.body.appendChild(renderer.domElement);

        render();
    }
}

function render () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

export {model}
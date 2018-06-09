let renderer;
let scene;
let camera;
let control;
let controls;
let stats;
let object = {}

let model = {
    init: function () {
        //Create Scene
        scene = new THREE.Scene();

        //Create Camera
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 0;
        camera.position.y = 4;
        camera.position.z = 3;
        camera.lookAt(scene.position);
        let modelPath = './assets/model/model.gltf'

        this.loader(modelPath)
    },
    createCube: function () {
        //Create object
        // let cubeGeometry = new THREE.CubeGeometry(7, 4, 7);
        // let cubeMaterial = new THREE.MeshLambertMaterial({
        //     color: 'red'
        // })

        // let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // cube.castShadow = true;
        // cube.name = 'cube'
        // scene.add(cube);
        // object.cube = cube;
        //Create plane for the object to sit on
        // let planeGeometery = new THREE.PlaneGeometry(30, 30);
        // let planeMaterial = new THREE.MeshLambertMaterial({
        //     color: 'blue'
        // });
        // let plane = new THREE.Mesh(planeGeometery, planeMaterial);
        // plane.rotation.x = -0.5 * Math.PI;
        // plane.position.y = -10;
        // plane.receiveShadow = true;;
        // plane.name = 'plane'
        // scene.add(plane);

        //Shine light on object
        var light = new THREE.HemisphereLight( 0xbbbbff, 0x444422 );
        light.position.set( 1, 1, 1 );
        scene.add(light);       
        
        //Render 
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff, 1);
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        this.addControl()
        this.addStats()

        this.render();

        controls = new THREE.OrbitControls( camera );
        controls.update()

    },
    addControl: function () {
        control = new function () {
            this.rotationSpeed = 0.005;
            this.opacity = 0.6;
        };
        addControlGui(control);
    },
    render: function () {
        requestAnimationFrame(this.render.bind(this));
        stats.update();
        renderer.render(scene, camera);
    },
    addStats: function () {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    },
    loader: function (modelPath) {
        let loader = new THREE.GLTFLoader();
        // Load a glTF resource
        console.log(modelPath)
        loader.load(modelPath, function (gltf) {
                scene.add(gltf.scene);

            },
            // called when loading is in progresses
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {
                console.log('An error happened', error);

            }
        );
    }
}


function animate() {
    requestAnimationFrame(animate);
    camera.rotation.y += 0.04;
}

function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.25, 0.25);
}


export {
    model
}
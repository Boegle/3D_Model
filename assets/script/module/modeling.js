let renderer;
let scene;
let camera;

let model = {
    init : function () {
        let scene = new THREE.Scene();
    },
    createCube: function () {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.x = 15;
        camera.position.y = 15;
        camera.position.z = 15;
        camera.lookAt(scene.position);

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
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
// scene.background({ color: 0x00ffff });
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  2000
);

const plight = new THREE.PointLight(0xffffff, 0.9);
camera.add(plight);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.className = "canvas";
//renderer.setAttribute("data-entrance", "from-left");
document.body.prepend(renderer.domElement);

// SETTING ORBIT CONTROLS

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 5);
controls.update();
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI * 0.4;
controls.enableZoom = true;
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x000 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

var room;
var helper;
const loader = new GLTFLoader();

loader.load(
  "roomv3.glb",
  function (gltf) {
    const s = gltf.scene;
    s.scale.set(1, 1, 1);
    scene.add(s);
    room = gltf.scene;
    s.traverse(function (o) {
      if (o.isMesh) {
        //o.material.emissive = new THREE.Color(0x00ffff);
      }
    });

    const loader2 = new GLTFLoader();
    loader2.load("plant.glb", function (gltf) {
      const p = gltf.scene;
      scene.add(p);
      s.traverse(function (o) {
        if (o.isMesh) {
          //o.material.emissive = new THREE.Color(0x00ffff);
        }
      });
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

document.getElementById("comic").addEventListener(
  "click",
  function () {
    //scene.background = new THREE.Color(0x00000);
    room.scale.set(2, 2, 2);
  },
  false
);

function light() {
  var spotlight = new THREE.SpotLight(0xf5fc5a);
  spotlight.position.set(1.75, 4, -3);
  spotlight.castShadow = true;
  spotlight.intensity = 0.2;
  scene.add(spotlight);

  var dirlight = new THREE.DirectionalLight(0xfdd8ff);
  dirlight.position.set(-0.96, 3, -0.75);
  //dirlight.castShadow = true;
  dirlight.intensity = 0.2;
  scene.add(dirlight);

  var ambi = new THREE.AmbientLight(0x0e1642);
  scene.add(ambi);

  var pointlight = new THREE.PointLight();
  pointlight.position.set(0.63, 0.72, 0.71);
  //pointlight.castShadow = true;
  pointlight.intensity = 0.2;
  scene.add(pointlight);
}

//light();

const lights = new THREE.DirectionalLight(0x0000ff, 1);
lights.position.set(2, 2, 5);
scene.add(lights);

const light2 = new THREE.DirectionalLight(0x880808, 1);
light2.position.set(20, 60, 5);
scene.add(light2);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  // create an helper

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  room.rotation.y += 0.001;
  // room.rotation.y += 0.01;
}
animate();

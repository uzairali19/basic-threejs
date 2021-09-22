import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
// import { point } from 'cli-spinners';

// Loading

const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('./textures/NormalMap.png');

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x5e5e5e);

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// Lights

// Light 1
const pointLight = new THREE.PointLight(0xff0d0d, 0.7);
pointLight.position.set(-2.2, 2.1, -1.62);
pointLight.intensity = 10;
scene.add(pointLight);

// gui.add(pointLight.position, 'x').min(-10).max(10);
// gui.add(pointLight.position, 'y').min(-10).max(10);
// gui.add(pointLight.position, 'z').min(-10).max(10);
// const light = gui.addFolder('light 1');

// const lightColor1 = {
//   color: 0x404040,
// };

// light.addColor(lightColor1, 'color').onChange(() => {
//   pointLight.color.set(lightColor1.color);
// });

// Light 2

const pointLight2 = new THREE.PointLight(0xe1ff, 0.7);
pointLight2.position.set(2.13, -3, -1.98);
pointLight2.intensity = 10;

scene.add(pointLight2);

// const light2 = gui.addFolder('light 2');

// const lightColor2 = {
//   color: 0x404040,
// };

// light2.addColor(lightColor2, 'color').onChange(() => {
//   pointLight2.color.set(lightColor2.color);
// });
// Light 3

const pointLight3 = new THREE.PointLight(0x404040, 0.7);
pointLight3.position.set(2, 3, 4);
scene.add(pointLight3);

// const light3 = gui.addFolder('light 3');

// const lightColor3 = {
//   color: 0x404040,
// };

// light3.addColor(lightColor3, 'color').onChange(() => {
//   pointLight3.color.set(lightColor3.color);
// });
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientX - windowHalfY;
};

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

const onMouseScroll = (event) => {
  sphere.position.y = window.scrollY * 0.008;
};
window.addEventListener('scroll', onMouseScroll);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

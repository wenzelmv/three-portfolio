import '../styles/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Scene

const scene = new THREE.Scene();

// Renderer and Camera

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Orbit Controls

const controls = new OrbitControls( camera, renderer.domElement );

// Donut (Torus)

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xAF7AC5 } );
const torus = new THREE.Mesh( geometry, material );
scene.add(torus);

// Lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Light & grid helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// Background

const spaceTexture = new THREE.TextureLoader().load('../img/space-green.jpg');
scene.background = spaceTexture;

//Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Avatar

const michaelTexture = new THREE.TextureLoader().load('../img/michael-avatar.jpg');
const michael = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: michaelTexture} )
);
scene.add(michael);

// Earth

const earthTexture = new THREE.TextureLoader().load('../img/earth-texture.jpeg');
const normalTexture = new THREE.TextureLoader().load('../img/normal_texture.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: earthTexture,
    normalMap: normalTexture
  })
);
scene.add(earth);
earth.position.z = 30;
earth.position.setX(-10);

// Camera functions

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  michael.rotation.y += 0.01;
  michael.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  earth.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}
animate();

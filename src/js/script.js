import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(-10,30,20)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide})
const plan = new THREE.Mesh(planeGeometry, planMaterial)
scene.add(plan)
plan.rotation.x = -0.5 * Math.PI;

const grid = new THREE.GridHelper()
scene.add(grid);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF, wireframe: true})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)

sphere.position.set(-10, 10, 0)


const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01
}
const gui = new dat.GUI();
gui.addColor(options, 'sphereColor').onChange((e) => {
  sphere.material.color.set(e)
})

gui.add(options, 'wireframe').onChange((e) => {
  sphere.material.wireframe = e
})

gui.add(options, 'speed', 0, 0.1)

let step = 0;
let speed = 0.01;
function animate() {
  box.rotation.y += 0.05;
  box.rotation.x += 0.05;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  // sphere.rotation.y += 0.05;
  // sphere.rotation.x += 0.05;
  // plan.rotation.y += 0.05;
  // plan.rotation.x += 0.05;
  // grid.rotation.y += 0.05;
  // grid.rotation.x += 0.05;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
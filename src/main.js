import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3)

renderer.render(scene, camera)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')


const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture
    })
)

scene.add(moon)
moon.position.z = 30;
moon.position.x = 10;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.power = 10000
pointLight.position.set(0, 0, 10)
scene.add(pointLight)
const ambientLight = new THREE.AmbientLight(0xffffff);




function animate() {
  requestAnimationFrame(animate)

  moon.rotation.y += -0.005


  renderer.render(scene,camera)
}
animate();

const spaceTexture = new THREE.TextureLoader().load('milky-way.jpg');
scene.background = spaceTexture;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;


  camera.rotation.y = t * 0.002;
}
document.body.onscroll = moveCamera;
moveCamera();
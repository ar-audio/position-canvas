import './index.css'
import io from 'socket.io-client'
import * as THREE from 'THREE'

window.THREE = THREE

const socket = io('http://192.168.0.101:3000')

const scene = new window.THREE.Scene()
window.scene = scene
const camera = new window.THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new window.THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var ambientLight = new window.THREE.AmbientLight(0x0c0c0c)
window.scene.add(ambientLight)

var spotLight = new window.THREE.SpotLight(0xffffff)
spotLight.position.set(-30, 60, 60)
spotLight.castShadow = true
window.scene.add(spotLight)

const geometry = new window.THREE.BoxGeometry(1, 2, 0.2)
const material = new window.THREE.MeshLambertMaterial({ color: 'white' })
const cube = new window.THREE.Mesh(geometry, material)
window.scene.add(cube)

const from = new THREE.Vector3(0, 0, 0)
const x = new THREE.Vector3(1, 0, 0)
const y = new THREE.Vector3(0, 1, 0)
const z = new THREE.Vector3(0, 0, 1)

for (let [i, to] of [x, y, z].entries()) {
  const direction = to.clone().sub(from)
  const length = direction.length()

  const arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, (0xff << (i * 8)))
  scene.add(arrowHelper)
}

camera.position.x = 0
camera.position.y = 0
camera.position.z = 5

socket.on('rotation', msg => {
  const [x, y, z, w] = JSON.parse(msg)

  const quaternion = new window.THREE.Quaternion(x, y, z, w)
  cube.setRotationFromQuaternion(quaternion)

  renderer.render(window.scene, camera)
})

cube.position.set(0, 0, 0)
renderer.render(window.scene, camera)

import './index.css'
import io from 'socket.io-client'
import * as THREE from 'THREE'

window.THREE = THREE
const scene = new window.THREE.Scene()
window.scene = scene

const socket = io('http://localhost:3000')

const camera = new window.THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// create coordinate system
const from = new THREE.Vector3(0, 0, 0)
const x = new THREE.Vector3(1, 0, 0)
const y = new THREE.Vector3(0, 1, 0)
const z = new THREE.Vector3(0, 0, 1)

for (let [i, to] of [x, y, z].entries()) {
  const direction = to.clone().sub(from)
  const length = direction.length()

  // colors:
  // x -> blue
  // y -> green
  // z -> red
  const arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, (0xff << (i * 8)))
  scene.add(arrowHelper)
}

const clientCalculated = new THREE.Vector3(1, 0, 0)
const clientDirection = clientCalculated.clone().sub(from)
const clientLength = clientDirection.length()
const clientCalculatedArrow = new THREE.ArrowHelper(clientDirection.normalize(), from, clientLength, 'pink')
const clientCalculatedArrow2 = new THREE.ArrowHelper(clientDirection.normalize(), from, clientLength, 'pink')
const otherPlayerVector = new THREE.ArrowHelper(clientDirection.normalize(), from, clientLength, 'yellow')
scene.add(clientCalculatedArrow)
scene.add(clientCalculatedArrow2)
scene.add(otherPlayerVector)

let phoneArraows = [clientCalculatedArrow, clientCalculatedArrow2]

socket.on('rotation', msg => {
  // rotate org phone vector by quaternion
  const rotation = JSON.parse(msg)
  rotation.ears.forEach((ear, i) => {
    const [x, y, z] = ear
    const vector = new THREE.Vector3(x, y, z)
    phoneArraows[i].setDirection(vector.normalize())
  })

  const [x, y, z] = rotation.vectorToOtherPlayer
  const vector = new THREE.Vector3(x, y, z)
  otherPlayerVector.setDirection(vector.normalize())
  otherPlayerVector.setLength(1 + rotation.distance)
  renderer.render(scene, camera)
})

renderer.render(scene, camera)

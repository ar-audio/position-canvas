import './index.css'
import io from 'socket.io-client'
var three = require('three')

const socket = io('http://localhost:3000')

const scene = new three.Scene()
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var ambientLight = new three.AmbientLight(0x0c0c0c)
scene.add(ambientLight)

var spotLight = new three.SpotLight(0xffffff)
spotLight.position.set(-30, 60, 60)
spotLight.castShadow = true
scene.add(spotLight)

const geometry = new three.BoxGeometry(1, 2, 0.2)
const material = new three.MeshLambertMaterial({ color: 'white' })
const cube = new three.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

cube.rotation.x = -0.1
cube.rotation.y = 0.5

// socket.on('position', msg => {
//   const [x, y, z] = JSON.parse(msg)
//   console.log('position', x, y, z)
//
//   cube.position.set(x, y, z)
//   renderer.render(scene, camera)
// })

socket.on('rotation', msg => {
  const [x, y, z, w] = JSON.parse(msg)

  const quaternion = new three.Quaternion(x, y, z, w)
  cube.setRotationFromQuaternion(quaternion)

  renderer.render(scene, camera)
})

cube.position.set(0, 0, 0)
renderer.render(scene, camera)

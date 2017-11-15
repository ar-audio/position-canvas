import './index.css'
import io from 'socket.io-client'
var three = require('three')

const socket = io('http://localhost:3000')

const scene = new three.Scene()
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new three.BoxGeometry(0.5, 2, 1)
const material = new three.MeshBasicMaterial({ color: 'grey' })
const cube = new three.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 20
cube.rotation.x = 2
cube.rotation.y = 2

socket.on('position', msg => {
  const arr = JSON.parse(msg)
  const x = arr[0]
  const y = arr[1]
  const z = arr[2]
  console.log(x, y, z)
  cube.position.set(x, y, z)
  renderer.render(scene, camera)
})

cube.position.set(0, 0, 0)
renderer.render(scene, camera)

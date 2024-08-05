const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x333333, 1)

const sectionTag = document.querySelector("section")

sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
camera.position.z = -50
camera.lookAt(scene.position)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, -1)
scene.add(light)

const shapes = []

const animate = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)

  camera.position.setZ(camera.position.z + 1)

  shapes.forEach(shape => {

    shape.rotateX(0.01)
    shape.rotateY(0.01)
    shape.rotateZ(0.01)
    // shape.position.setZ(shape.position.z -1)
  })
}

animate()

let hue = 0

const createShape = (x, y) => {
  const geometries = [
    new THREE.ConeGeometry(10, 20, 3),
    new THREE.BoxGeometry(15, 15, 15),
    new THREE.TorusGeometry(5, 3, 16, 100),
    new THREE.SphereGeometry(8, 32, 32)
  ]

  const randNum = Math.floor(Math.random() * geometries.length)
  const geometry = geometries[randNum]
  const emissiveColor = new THREE.Color("hsl(" + hue + ", 100%, 50%)")
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: emissiveColor
  })
  const shape = new THREE.Mesh(geometry, material)

  shape.position.set(
    (window.innerWidth / 2) - x,
    (window.innerHeight / 2) - y,
    camera.position.z + 500
  )
  shape.rotateX(0.5)
  shape.rotateZ(0.5)

  shapes.push(shape)
  scene.add(shape)

  hue += 1
}

let isMouseDown = false

document.addEventListener("mousedown", () => {
  isMouseDown = true
})

document.addEventListener("mouseup", () => {
  isMouseDown = false
})

document.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    createShape(e.pageX, e.pageY)
  }
})

document.addEventListener("touchstart", () => {
  isMouseDown = true
})

document.addEventListener("touchend", () => {
  isMouseDown = false
})

document.addEventListener("touchmove", (e) => {
  if (isMouseDown) {
    createShape(e.pageX, e.pageY)
  }
})

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

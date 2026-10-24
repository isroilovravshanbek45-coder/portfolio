import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

/** A local, original 3D portrait maquette. No remote model or tracking. */
export default function Scene() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current
    if (!el) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }) }
    catch { return } // The SVG portrait underneath remains visible without WebGL.
    el.appendChild(renderer.domElement)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40)
    camera.position.set(0, 0.25, 8.8)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    room.dispose()

    const sculpture = new THREE.Group()
    sculpture.position.y = 0.15
    scene.add(sculpture)
    const metal = new THREE.MeshPhysicalMaterial({ color: 0x7e749c, metalness: 0.92, roughness: 0.23, clearcoat: 1, clearcoatRoughness: 0.18 })
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.72, 64, 64), metal)
    head.scale.set(0.78, 1.2, 0.86)
    head.position.y = 0.68
    head.rotation.z = -0.08
    sculpture.add(head)
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.37, 0.77, 48), metal)
    neck.position.y = -0.24
    sculpture.add(neck)
    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), metal)
    shoulder.scale.set(1.2, 0.62, 0.54)
    shoulder.position.y = -1.0
    sculpture.add(shoulder)
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.28, 1.32, 0.15, 96), new THREE.MeshStandardMaterial({ color: 0x15141f, metalness: 0.8, roughness: 0.35 }))
    pedestal.position.y = -1.55
    sculpture.add(pedestal)

    const orbit = new THREE.Group()
    orbit.position.set(0, 0.08, -0.65)
    orbit.rotation.set(0.4, 0.35, -0.52)
    scene.add(orbit)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.13, 24, 160), new THREE.MeshPhysicalMaterial({ color: 0xa88bfa, metalness: 0.8, roughness: 0.18, clearcoat: 1, emissive: 0x492178, emissiveIntensity: 0.16 }))
    ring.scale.y = 1.17
    orbit.add(ring)
    const thin = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.009, 8, 160), new THREE.MeshBasicMaterial({ color: 0x7285a9, transparent: true, opacity: 0.45 }))
    orbit.add(thin)
    const satellite = new THREE.Mesh(new THREE.IcosahedronGeometry(0.21, 0), new THREE.MeshStandardMaterial({ color: 0x8eeafa, metalness: 0.65, roughness: 0.2 }))
    satellite.position.set(1.6, 1.4, 0.3)
    scene.add(satellite)
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 24), new THREE.MeshBasicMaterial({ color: 0xbfa8ff }))
    dot.position.set(-1.85, -0.35, 0.3)
    scene.add(dot)
    scene.add(new THREE.AmbientLight(0x9294ce, 1.7))
    const violet = new THREE.PointLight(0xa18aff, 24, 12)
    violet.position.set(-2.2, 2.5, 2)
    scene.add(violet)
    const cyan = new THREE.PointLight(0x7de3f1, 28, 12)
    cyan.position.set(2.4, 0.5, 1)
    scene.add(cyan)
    const rim = new THREE.PointLight(0xefddff, 26, 15)
    rim.position.set(0, 3, -1)
    scene.add(rim)

    let frame = 0
    let visible = true
    let pointerX = 0
    let pointerY = 0
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const draw = () => {
      frame = 0
      if (!visible || document.hidden) return
      const time = performance.now() * 0.0004
      if (!motion.matches) {
        sculpture.rotation.y += (pointerX * 0.17 - sculpture.rotation.y) * 0.035
        sculpture.rotation.x += (pointerY * 0.06 - sculpture.rotation.x) * 0.035
        orbit.rotation.y = 0.35 + Math.sin(time) * 0.12
        satellite.rotation.y = time
        satellite.position.y = 1.4 + Math.sin(time * 1.8) * 0.13
        dot.position.y = -0.35 + Math.cos(time * 1.4) * 0.15
      }
      renderer.render(scene, camera)
      if (!motion.matches) frame = requestAnimationFrame(draw)
    }
    const resume = () => { if (!frame) draw() }
    const resize = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect()
      renderer.setSize(width, height)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      resume()
    })
    resize.observe(el)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) resume()
      else { cancelAnimationFrame(frame); frame = 0 }
    })
    observer.observe(el)
    const pointer = (e: PointerEvent) => {
      const box = el.getBoundingClientRect()
      pointerX = ((e.clientX - box.left) / box.width - 0.5) * 2
      pointerY = ((e.clientY - box.top) / box.height - 0.5) * 2
    }
    const visibility = () => { if (!document.hidden) resume() }
    el.addEventListener('pointermove', pointer, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    motion.addEventListener('change', resume)
    const lost = (e: Event) => { e.preventDefault(); el.dataset.unavailable = 'true'; cancelAnimationFrame(frame); frame = 0 }
    const restored = () => { delete el.dataset.unavailable; resume() }
    renderer.domElement.addEventListener('webglcontextlost', lost)
    renderer.domElement.addEventListener('webglcontextrestored', restored)
    draw()
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      el.removeEventListener('pointermove', pointer)
      document.removeEventListener('visibilitychange', visibility)
      motion.removeEventListener('change', resume)
      renderer.domElement.removeEventListener('webglcontextlost', lost)
      renderer.domElement.removeEventListener('webglcontextrestored', restored)
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
          materials.forEach(material => material.dispose())
        }
      })
      env.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <div className="scene-canvas" ref={host} aria-hidden="true" />
}

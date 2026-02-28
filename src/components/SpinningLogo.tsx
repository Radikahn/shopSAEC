import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import {
  MeshStandardMaterial,
  EquirectangularReflectionMapping,
  PMREMGenerator,
  type Group,
  type Mesh,
} from 'three'

function Logo({ url }: { url: string }) {
  const ref = useRef<Group>(null)
  const [model, setModel] = useState<Group | null>(null)
  const { gl } = useThree()

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    pmrem.compileEquirectangularShader()

    const loadModel = (envMap: ReturnType<PMREMGenerator['fromEquirectangular']>['texture'] | null) => {
      const gltfLoader = new GLTFLoader()
      gltfLoader.load(url, (gltf) => {
        const scene = gltf.scene.clone(true)
        scene.traverse((child) => {
          if ((child as Mesh).isMesh) {
            const mat = new MeshStandardMaterial({
              color: '#ffffff',
              metalness: 1,
              roughness: 0.05,
              envMapIntensity: 1.5,
            })
            if (envMap) mat.envMap = envMap
            ;(child as Mesh).material = mat
          }
        })
        setModel(scene)
      })
    }

    const exrLoader = new EXRLoader()
    exrLoader.load(
      '/monochrome_studio_02_1k.exr',
      (texture) => {
        texture.mapping = EquirectangularReflectionMapping
        const envMap = pmrem.fromEquirectangular(texture).texture
        texture.dispose()
        pmrem.dispose()
        loadModel(envMap)
      },
      undefined,
      () => {
        // EXR failed to load, render without env map
        pmrem.dispose()
        loadModel(null)
      },
    )
  }, [url, gl])

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5
    }
  })

  if (!model) return null

  return (
    <Center>
      <primitive ref={ref} object={model} scale={1} />
    </Center>
  )
}

export default function SpinningLogo() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width: 300, height: 60 }} />
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 38], fov: 10 }}
      style={{ width: 400, height: 90 }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, 3, -5]} intensity={1} color="#ffffff" />
      <Logo url="/logo.glb" />
    </Canvas>
  )
}

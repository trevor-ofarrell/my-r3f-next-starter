import { Suspense, useRef } from 'react'
import BackButton from '@/components/dom/back/back'
import useStore from '@/helpers/store'
import { Helmet } from 'react-helmet'
import Bird from '@/components/canvas/Bird/Bird'
import { useGLTF } from '@react-three/drei'
import { useFrame, Canvas } from 'react-three-fiber'
import CameraControls from '@/components/CameraControls'
// import dynamic from 'next/dynamic'
// const Bird = dynamic(() => import('@/components/canvas/Bird/Bird'), { ssr: false })

function Model() {
  const gltf = useGLTF('/porsche/scene.gltf', true)
  return <primitive object={gltf.scene} dispose={null} />
}

const Porsche = () => {
  return (
    <group position={[1, 0, -20]}>
      <CameraControls />
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <mesh position={[0, 0, 0]}>
          <Model />
        </mesh>
      </Suspense>
    </group>
  )
}

const Dom = () => {
  return (
    <div>
      <Helmet title={'Oiseaux'} />
      <BackButton />
      <h1>BIRDS DOM</h1>
    </div>
  )
}

const Page = () => {
  useStore.setState({ loading: false })
  return (
    <>
      <Porsche />
      <Dom />
    </>
  )
}

export default Page

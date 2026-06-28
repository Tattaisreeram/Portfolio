import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Loader from '../Loader';

const GlobeObject = () => {
  const globeRef = useRef();
  const ringRef = useRef();
  const atmRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.15;
    if (ringRef.current) ringRef.current.rotation.z = t * 0.08;
    if (atmRef.current) atmRef.current.rotation.y = t * 0.1;
  });

  const wireframeMat = new THREE.MeshBasicMaterial({
    color: '#915EFF',
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });

  const solidMat = new THREE.MeshStandardMaterial({
    color: '#151030',
    roughness: 0.8,
    metalness: 0.2,
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <primitive object={solidMat} attach="material" />
      </mesh>

      <mesh ref={atmRef}>
        <sphereGeometry args={[1.52, 24, 24]} />
        <primitive object={wireframeMat} attach="material" />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.04, 8, 80]} />
        <meshStandardMaterial color="#E8B04B" emissive="#E8B04B" emissiveIntensity={0.6} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshStandardMaterial
          color="#915EFF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -2, -3]} intensity={0.4} color="#915EFF" />
    </group>
  );
};

const GlobeCanvas = () => (
  <Canvas
    frameloop="always"
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
    camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 4] }}
  >
    <Suspense fallback={<Loader />}>
      <OrbitControls autoRotate enableZoom={false} enablePan={false} />
      <GlobeObject />
    </Suspense>
  </Canvas>
);

export default GlobeCanvas;

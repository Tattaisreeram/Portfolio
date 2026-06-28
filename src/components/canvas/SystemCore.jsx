import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Loader from '../Loader';

const NodeOrbit = ({ radius, tilt, speed, color, phase }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t) * radius * Math.sin(tilt),
        Math.sin(t) * radius * Math.cos(tilt)
      );
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
};

const PacketTraveler = ({ fromAngle, radius, tilt, speed, phase, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed * 0.6 + phase) % (Math.PI * 2);
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius * 0.5,
        Math.sin(t) * radius * 0.5 * Math.sin(tilt),
        Math.sin(t) * radius * 0.5 * Math.cos(tilt)
      );
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
    </mesh>
  );
};

const CoreGroup = () => {
  const groupRef = useRef();
  const coreRef = useRef();

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1 + mouse.x * 0.2;
      groupRef.current.rotation.x = mouse.y * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3;
      coreRef.current.rotation.z = t * 0.2;
    }
  });

  const nodes = [
    { radius: 0.9, tilt: 0.3, speed: 0.8, color: '#E8B04B', phase: 0 },
    { radius: 0.9, tilt: 0.3, speed: 0.8, color: '#E8B04B', phase: Math.PI },
    { radius: 1.1, tilt: 1.1, speed: 0.6, color: '#2DD4BF', phase: 0.5 },
    { radius: 1.1, tilt: 1.1, speed: 0.6, color: '#2DD4BF', phase: Math.PI + 0.5 },
    { radius: 0.75, tilt: -0.8, speed: 1.0, color: '#915EFF', phase: 1.0 },
    { radius: 0.75, tilt: -0.8, speed: 1.0, color: '#915EFF', phase: Math.PI + 1.0 },
    { radius: 1.0, tilt: 0.6, speed: 0.7, color: '#F472B6', phase: 2.0 },
  ];

  const packets = [
    { radius: 0.9, tilt: 0.3, speed: 1.2, phase: 0.2, color: '#E8B04B' },
    { radius: 1.1, tilt: 1.1, speed: 0.9, phase: 1.5, color: '#2DD4BF' },
    { radius: 0.75, tilt: -0.8, speed: 1.5, phase: 0.8, color: '#915EFF' },
  ];

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color="#915EFF"
          wireframe
          emissive="#915EFF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {nodes.map((n, i) => (
        <NodeOrbit key={i} {...n} />
      ))}
      {packets.map((p, i) => (
        <PacketTraveler key={i} {...p} />
      ))}

      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={1.5} color="#915EFF" />
      <pointLight position={[-2, -1, -2]} intensity={0.8} color="#2DD4BF" />
    </group>
  );
};

const SystemCoreCanvas = () => (
  <Canvas
    frameloop="always"
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
    camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
  >
    <Suspense fallback={<Loader />}>
      <OrbitControls
        autoRotate
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <CoreGroup />
    </Suspense>
  </Canvas>
);

export default SystemCoreCanvas;

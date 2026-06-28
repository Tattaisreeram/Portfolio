import { Suspense, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Loader from '../Loader';

const buildFallbackTexture = (label, accent) => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1d1836';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, size - 10, size - 10);
  const fontSize = label.length > 5 ? 44 : 60;
  ctx.font = `700 ${fontSize}px "JetBrains Mono", monospace`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, size / 2, size / 2);
  return new THREE.CanvasTexture(canvas);
};

const BallWithImage = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallFallback = ({ label, accent }) => {
  const texture = useMemo(() => buildFallbackTexture(label, accent), [label, accent]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={texture}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ label, accent, imgUrl }) => (
  <Canvas
    frameloop="demand"
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
  >
    <Suspense fallback={<Loader />}>
      <OrbitControls enableZoom={false} />
      {imgUrl ? (
        <BallWithImage imgUrl={imgUrl} />
      ) : (
        <BallFallback label={label} accent={accent} />
      )}
    </Suspense>
    <Preload all />
  </Canvas>
);

export default BallCanvas;

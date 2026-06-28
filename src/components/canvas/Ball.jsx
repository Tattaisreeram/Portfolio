import { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';

const SIZE = 256;
const MARGIN = 28;

const buildFallbackTexture = (label, accent) => {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1d1836';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, SIZE - 10, SIZE - 10);
  const fontSize = label.length > 5 ? 42 : 60;
  ctx.font = `700 ${fontSize}px "JetBrains Mono", monospace`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, SIZE / 2, SIZE / 2);
  return new THREE.CanvasTexture(canvas);
};

const loadIconTexture = (iconUrl) =>
  new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(img, MARGIN, MARGIN, SIZE - MARGIN * 2, SIZE - MARGIN * 2);
      resolve(new THREE.CanvasTexture(canvas));
    };
    img.onerror = () => resolve(null);
    img.src = iconUrl;
  });

const Ball = ({ texture }) => (
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

const BallCanvas = ({ label, accent, imgUrl }) => {
  const fallback = useMemo(() => buildFallbackTexture(label, accent), [label, accent]);
  const [texture, setTexture] = useState(fallback);

  useEffect(() => {
    if (!imgUrl) return;
    loadIconTexture(imgUrl).then((tex) => {
      if (tex) setTexture(tex);
    });
  }, [imgUrl]);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <OrbitControls enableZoom={false} />
      <Ball texture={texture} />
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;

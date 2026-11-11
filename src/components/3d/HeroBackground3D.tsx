import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WireframeTorusRing: React.FC = () => {
  const torusRef = useRef<THREE.Mesh>(null);

  // Spin slowly on local Z-axis so it always maintains its round ring appearance
  // and never tilts edge-on into a thin capsule shape
  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 0.1;
    }
  });

  useEffect(() => {
    const currentMesh = torusRef.current;
    return () => {
      if (currentMesh) {
        currentMesh.geometry.dispose();
        if (Array.isArray(currentMesh.material)) {
          currentMesh.material.forEach((m) => m.dispose());
        } else {
          currentMesh.material.dispose();
        }
      }
    };
  }, []);

  return (
    <group rotation={[-0.4, 0.3, 0]}>
      <mesh ref={torusRef}>
        {/* Ring geometry sized to fit completely within the canvas view frustum */}
        <torusGeometry args={[1.15, 0.26, 24, 64]} />
        <meshBasicMaterial
          wireframe
          color="#0B5D3B"
          transparent
          opacity={0.14}
        />
      </mesh>
    </group>
  );
};

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const HeroBackground3D: React.FC = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const webglOk = isWebGLAvailable();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (webglOk && !reducedMotion) {
      setCanRender(true);
    }
  }, []);

  if (!canRender) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute -top-10 -right-8 sm:-top-14 sm:-right-12 lg:-top-16 lg:-right-14 w-[clamp(300px,32vw,380px)] h-[clamp(300px,32vw,380px)] pointer-events-none z-0 select-none overflow-hidden"
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          className="w-full h-full pointer-events-none"
        >
          <WireframeTorusRing />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default HeroBackground3D;

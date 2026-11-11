import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WireframeOrb } from './WireframeOrb';
import { StaticHeroGraphic } from './StaticHeroGraphic';

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

export const HeroCanvas: React.FC = () => {
  const [canRender3D, setCanRender3D] = useState<boolean>(true);

  useEffect(() => {
    // Check WebGL availability
    const webglOk = isWebGLAvailable();
    // Check reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!webglOk || reducedMotion) {
      setCanRender3D(false);
    }
  }, []);

  if (!canRender3D) {
    return <StaticHeroGraphic />;
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center">
      <Suspense fallback={<StaticHeroGraphic />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]} // Capped at 1.5 for performance target 90+
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.5} />
          <WireframeOrb />
        </Canvas>
      </Suspense>

      {/* Subtle indicator pill */}
      <div className="absolute bottom-2 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-obsidian-950/60 border border-white/5 text-[10px] font-mono text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
        <span>3D Parametric Mesh • Interactive</span>
      </div>
    </div>
  );
};

export default HeroCanvas;

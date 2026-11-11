import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const WireframeOrb: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Create static node positions for the data network
  const nodeCount = 18;
  const nodePositions = React.useMemo(() => {
    const pos: [number, number, number][] = [];
    const radius = 2.4;
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      pos.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ]);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Gentle base rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.28;

      // React to pointer coordinates smoothly
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.8,
        0.04
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        pointer.x * 0.8,
        0.04
      );
    }

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x -= delta * 0.12;
      outerMeshRef.current.rotation.y -= delta * 0.18;
      outerMeshRef.current.rotation.z += delta * 0.08;
    }

    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += delta * 0.15;
      nodesGroupRef.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group scale={1.05}>
      {/* Inner geometric core: Icosahedron wireframe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          wireframe
          color="#CEFF00"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outer subtle cage: Dodecahedron */}
      <mesh ref={outerMeshRef}>
        <dodecahedronGeometry args={[2.0, 0]} />
        <meshBasicMaterial
          wireframe
          color="#38BDF8"
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Orbiting data nodes representing concurrency threads */}
      <group ref={nodesGroupRef}>
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial
              color={idx % 3 === 0 ? '#CEFF00' : '#E2E8F0'}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Deterministic PRNG — keeps render pure (same cloud every render) */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Floating wireframe geometry ── */
function FloatingShape({ type, position, scale, rotSpeedX, rotSpeedY, color, opacity, floatOffset }) {
  const mesh = useRef();

  const geo = useMemo(() => {
    switch (type) {
      case "icosahedron": return new THREE.IcosahedronGeometry(1, 1);
      case "octahedron":  return new THREE.OctahedronGeometry(1, 0);
      case "torus":       return new THREE.TorusGeometry(1, 0.28, 10, 20);
      case "tetrahedron": return new THREE.TetrahedronGeometry(1, 0);
      default:            return new THREE.IcosahedronGeometry(1, 1);
    }
  }, [type]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.rotation.x += rotSpeedX;
    mesh.current.rotation.y += rotSpeedY;
    mesh.current.position.y = position[1] + Math.sin(t * 0.45 + floatOffset) * 0.35;
  });

  return (
    <mesh ref={mesh} position={[position[0], position[1], position[2]]} scale={scale}>
      <primitive object={geo} attach="geometry" />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

/* ── Floating point cloud ── */
function PointCloud({ count = 80 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const rand = mulberry32(1337);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (rand() - 0.5) * 22;
      pos[i * 3 + 1] = (rand() - 0.5) * 14;
      pos[i * 3 + 2] = (rand() - 0.5) * 8 - 2;
    }
    return pos;
  }, [count]);

  // Velocities are mutable simulation state, not render data — keep them in a ref.
  const velRef = useRef(null);
  useEffect(() => {
    const rand = mulberry32(7331);
    const vel = new Float32Array(count * 2);
    for (let i = 0; i < count * 2; i++) vel[i] = (rand() - 0.5) * 0.003;
    velRef.current = vel;
  }, [count]);

  useFrame(() => {
    const vel = velRef.current;
    if (!vel || !ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += vel[i * 2];
      pos[i * 3 + 1] += vel[i * 2 + 1];
      if (Math.abs(pos[i * 3])     > 11) vel[i * 2]     *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 7)  vel[i * 2 + 1] *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#00d4ff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ── Mouse-responsive group ── */
function Scene() {
  const group = useRef();

  useFrame(({ mouse }) => {
    // Smooth mouse-driven rotation
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.14, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.18, 0.04);
  });

  return (
    <group ref={group}>
      <PointCloud count={80} />

      {/* Main icosahedron — hero right side */}
      <FloatingShape type="icosahedron" position={[3.8, 0.4, -2]}   scale={2.0} rotSpeedX={0.004} rotSpeedY={0.007} color="#00d4ff" opacity={0.20} floatOffset={0}   />
      {/* Torus ring — left/low */}
      <FloatingShape type="torus"       position={[-3.2, -1.2, -3]} scale={1.4} rotSpeedX={0.006} rotSpeedY={0.003} color="#00d4ff" opacity={0.12} floatOffset={1.3} />
      {/* Small octahedron — top centre-right */}
      <FloatingShape type="octahedron"  position={[1.2, 2.6, -1.5]}  scale={0.65} rotSpeedX={0.009} rotSpeedY={0.011} color="#00ff88" opacity={0.18} floatOffset={0.8} />
      {/* Tetrahedron — bottom left */}
      <FloatingShape type="tetrahedron" position={[-1.8, -2.6, -2]}  scale={0.55} rotSpeedX={0.007} rotSpeedY={0.008} color="#00d4ff" opacity={0.13} floatOffset={2.2} />
      {/* Background large icosahedron — far right back */}
      <FloatingShape type="icosahedron" position={[5.5, -0.5, -6]}   scale={2.8} rotSpeedX={0.002} rotSpeedY={0.003} color="#00d4ff" opacity={0.05} floatOffset={1.8} />
      {/* Small octahedron — far left back */}
      <FloatingShape type="octahedron"  position={[-4.5, 1.5, -5]}   scale={1.0} rotSpeedX={0.005} rotSpeedY={0.004} color="#00d4ff" opacity={0.07} floatOffset={0.4} />
    </group>
  );
}

export default function ThreeScene({ active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

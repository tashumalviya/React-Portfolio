import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ROWS = [14, 14, 13, 12];
const KEY = 0.44;
const GAP = 0.075;

function useIsMobile() {
  return typeof window !== "undefined" && window.innerWidth <= 768;
}

function Keyboard({ mobile }) {
  const group = useRef(null);
  const inner = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const keys = useMemo(() => {
    const out = [];
    const rows = mobile ? ROWS.map((n) => Math.round(n * 0.75)) : ROWS;
    const depth = rows.length * (KEY + GAP) + 0.5;
    rows.forEach((count, r) => {
      const rowWidth = count * (KEY + GAP);
      for (let i = 0; i < count; i++) {
        const x = i * (KEY + GAP) - rowWidth / 2 + KEY / 2;
        const z = r * (KEY + GAP) - depth / 2 + KEY / 2 + 0.25;
        const seed = (r * 31 + i * 17) % 23;
        const accent = seed === 3 ? "blue" : seed === 11 ? "purple" : seed === 19 ? "cyan" : null;
        out.push({ pos: [x, 0.26, z], w: KEY, accent });
      }
    });
    const z = rows.length * (KEY + GAP) - depth / 2 + KEY / 2 + 0.25;
    const bottomWidths = [0.7, 0.55, 0.55, 3.1, 0.55, 0.55, 0.7];
    const total = bottomWidths.reduce((a, b) => a + b + GAP, -GAP);
    let cursor = -total / 2;
    bottomWidths.forEach((w, i) => {
      out.push({ pos: [cursor + w / 2, 0.26, z], w, accent: i === 3 ? "blue" : null });
      cursor += w + GAP;
    });
    return out;
  }, [mobile]);

  const capMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#232327", roughness: 0.38, metalness: 0.35 }), []);
  const accentMats = useMemo(() => ({
    blue: new THREE.MeshStandardMaterial({ color: "#2a3b5e", roughness: 0.3, metalness: 0.4, emissive: new THREE.Color("#4F8CFF"), emissiveIntensity: 0.35 }),
    purple: new THREE.MeshStandardMaterial({ color: "#3a2a5e", roughness: 0.3, metalness: 0.4, emissive: new THREE.Color("#8B5CF6"), emissiveIntensity: 0.32 }),
    cyan: new THREE.MeshStandardMaterial({ color: "#1f3d3a", roughness: 0.3, metalness: 0.4, emissive: new THREE.Color("#5EEAD4"), emissiveIntensity: 0.25 }),
  }), []);
  const baseMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#18181b", roughness: 0.25, metalness: 0.75 }), []);
  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#4F8CFF", transparent: true, opacity: 0.5 }), []);

  useFrame((state, delta) => {
    const g = group.current;
    const inn = inner.current;
    if (!g || !inn) return;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.05);
    const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.2 - progress * 1.6, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3.4 - progress * 0.9, 0.08);
    camera.lookAt(0, -0.4, 0);
    const targetRotX = -0.32 + progress * 0.28 + mouse.current.y * 0.05;
    const targetRotY = -0.28 + progress * 0.5 + mouse.current.x * 0.09;
    const targetRotZ = 0.06 - progress * 0.1;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, 0.06);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, 0.06);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, targetRotZ, 0.06);
    g.position.y = THREE.MathUtils.lerp(g.position.y, -0.9 + progress * 0.7, 0.06);
    g.position.x = THREE.MathUtils.lerp(g.position.x, mouse.current.x * 0.25, 0.06);
    inn.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    inn.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.012;
    void delta;
  });

  const width = (mobile ? 11 : 14) * (KEY + GAP) + 0.7;
  const depth = 5 * (KEY + GAP) + 0.7;

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      <group ref={inner}>
        <RoundedBox args={[width, 0.42, depth]} radius={0.12} smoothness={3} material={baseMat} />
        <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[width * 0.96, depth * 0.92]} />
          <primitive object={glowMat} attach="material" />
        </mesh>
        {keys.map((k, i) => (
          <RoundedBox key={i} args={[k.w, 0.16, KEY]} radius={0.045} smoothness={2} position={k.pos}
            material={k.accent ? accentMats[k.accent] : capMat} />
        ))}
      </group>
    </group>
  );
}

function Rig() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-5, 3, 2]} intensity={22} color="#4F8CFF" distance={14} decay={2} />
      <pointLight position={[5, 2.5, -3]} intensity={18} color="#8B5CF6" distance={14} decay={2} />
      <pointLight position={[0, -1.5, 4]} intensity={7} color="#5EEAD4" distance={10} decay={2} />
    </>
  );
}

export default function KeyboardScene() {
  const mobile = useIsMobile();
  return (
    <Canvas className="hero-3d-canvas" camera={{ position: [0, 3.4, 7.2], fov: 38 }}
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}>
      <AdaptiveDpr pixelated />
      <Rig />
      <Keyboard mobile={mobile} />
      {!mobile && (<ContactShadows position={[0, -1.35, 0]} opacity={0.55} scale={16} blur={2.6} far={4} color="#000000" />)}
      <fog attach="fog" args={["#141414", 9, 18]} />
    </Canvas>
  );
}

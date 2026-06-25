import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const C = {
  skin:   "#C8834A",
  skinD:  "#A56B35",
  turban: "#1A4F8A",
  turbanL:"#2560A8",
  beard:  "#160B05",
  shirt:  "#ECF0F7",
  pants:  "#2C3748",
  shoe:   "#111827",
  glass:  "#CFA020",
  steel:  "#9BA4B5",
  white:  "#ffffff",
  pupil:  "#0D0705",
  lip:    "#7B2E18",
};

/* helpers */
function Sp({ p, r, c, s }) {
  return (
    <mesh position={p} scale={s ?? 1}>
      <sphereGeometry args={[r, 22, 22]} />
      <meshToonMaterial color={c} />
    </mesh>
  );
}
function Cy({ p, r1, r2, h, c, rot, n = 12 }) {
  return (
    <mesh position={p} rotation={rot ?? [0, 0, 0]}>
      <cylinderGeometry args={[r1, r2, h, n]} />
      <meshToonMaterial color={c} />
    </mesh>
  );
}
function Bx({ p, sz, c, rot }) {
  return (
    <mesh position={p} rotation={rot ?? [0, 0, 0]}>
      <boxGeometry args={sz} />
      <meshToonMaterial color={c} />
    </mesh>
  );
}
function To({ p, r, t, c, rot }) {
  return (
    <mesh position={p} rotation={rot ?? [0, 0, 0]}>
      <torusGeometry args={[r, t, 10, 32]} />
      <meshToonMaterial color={c} />
    </mesh>
  );
}

/*
  Cartoon proportions — big head, short body (chibi-ish).

  All y positions are LOCAL to the group.
  group is at world [0, -1.4, 0]
  so:
    head-centre local y=1.90  →  world y=+0.50   (top third of canvas)
    torso-centre local y=0.80  →  world y=-0.60
    feet         local y=0.00  →  world y=-1.40

  Camera at [0, 0.2, 4.2], fov=52 →
    vertical half ≈ tan(26°)×4.2 ≈ 2.05
    sees world y: −1.85 → +2.25
    feet (−1.40) ✓   turban-top (+1.15) ✓   face (+0.50) ✓
*/

function Avatar() {
  const g = useRef();
  useFrame(({ mouse, clock }) => {
    if (!g.current) return;
    g.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.08;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y,  mouse.x * 0.5, 0.05);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -mouse.y * 0.08, 0.05);
  });

  return (
    <group ref={g} position={[0, -1.4, 0]}>

      {/* ground blob */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={0.20} />
      </mesh>

      {/* ─── SHOES ─── */}
      <Bx p={[-0.18, 0.09, 0.06]} sz={[0.26, 0.14, 0.38]} c={C.shoe} />
      <Bx p={[ 0.18, 0.09, 0.06]} sz={[0.26, 0.14, 0.38]} c={C.shoe} />
      {/* toe highlight */}
      <Bx p={[-0.18, 0.11, 0.22]} sz={[0.21, 0.10, 0.08]} c="#1c2333" />
      <Bx p={[ 0.18, 0.11, 0.22]} sz={[0.21, 0.10, 0.08]} c="#1c2333" />

      {/* ─── LEGS ─── */}
      <Cy p={[-0.17, 0.55, 0]} r1={0.12} r2={0.11} h={0.72} c={C.pants} />
      <Cy p={[ 0.17, 0.55, 0]} r1={0.12} r2={0.11} h={0.72} c={C.pants} />

      {/* ─── HIPS ─── */}
      <Cy p={[0, 0.98, 0]} r1={0.29} r2={0.27} h={0.18} n={14} c={C.pants} />

      {/* ─── TORSO ─── compact, cartoon body ─── */}
      <Cy p={[0, 1.28, 0]} r1={0.26} r2={0.30} h={0.62} n={14} c={C.shirt} />
      {/* collar */}
      <Cy p={[0, 1.62, 0]} r1={0.13} r2={0.17} h={0.14} c={C.shirt} />
      {/* neck */}
      <Cy p={[0, 1.74, 0]} r1={0.12} r2={0.12} h={0.18} c={C.skin} />

      {/* ─── ARMS ─── */}
      <Cy p={[-0.38, 1.27, 0]} r1={0.085} r2={0.075} h={0.70} c={C.shirt} rot={[0, 0,  0.20]} />
      <Cy p={[ 0.38, 1.27, 0]} r1={0.085} r2={0.075} h={0.70} c={C.shirt} rot={[0, 0, -0.20]} />

      {/* kara (steel bracelet on right wrist) */}
      <To p={[0.50, 0.94, 0.05]} r={0.082} t={0.016} c={C.steel} rot={[Math.PI / 2, 0, 0]} />

      {/* ─── HANDS ─── */}
      <Sp p={[-0.50, 0.92, 0.06]} r={0.10} c={C.skin} />
      <Sp p={[ 0.50, 0.92, 0.06]} r={0.10} c={C.skin} />

      {/* ─── EARS ─── */}
      <Sp p={[-0.55, 1.90, 0.02]} r={0.11} c={C.skinD} s={[0.55, 1.0, 0.45]} />
      <Sp p={[ 0.55, 1.90, 0.02]} r={0.11} c={C.skinD} s={[0.55, 1.0, 0.45]} />

      {/* ─── HEAD — large cartoon sphere ─── */}
      <Sp p={[0, 1.90, 0]} r={0.52} c={C.skin} />

      {/* ══════════════════════════════════════
          FACE — all z ≥ 0.45, pushed well
          outside the head surface
          head surface at the equator ≈ z 0.52
          ══════════════════════════════════════ */}

      {/* EYES — big white circles */}
      <Sp p={[-0.175, 2.02, 0.46]} r={0.105} c={C.white} />
      <Sp p={[ 0.175, 2.02, 0.46]} r={0.105} c={C.white} />
      {/* pupils */}
      <Sp p={[-0.175, 2.01, 0.53]} r={0.060} c={C.pupil} />
      <Sp p={[ 0.175, 2.01, 0.53]} r={0.060} c={C.pupil} />
      {/* shine dots */}
      <Sp p={[-0.152, 2.034, 0.57]} r={0.018} c={C.white} />
      <Sp p={[ 0.198, 2.034, 0.57]} r={0.018} c={C.white} />

      {/* EYEBROWS */}
      <Bx p={[-0.175, 2.14, 0.44]} sz={[0.16, 0.036, 0.055]} c={C.beard} rot={[0, 0,  0.22]} />
      <Bx p={[ 0.175, 2.14, 0.44]} sz={[0.16, 0.036, 0.055]} c={C.beard} rot={[0, 0, -0.22]} />

      {/* GLASSES */}
      <To p={[-0.180, 2.02, 0.50]} r={0.115} t={0.021} c={C.glass} rot={[Math.PI / 2, 0, 0]} />
      <To p={[ 0.180, 2.02, 0.50]} r={0.115} t={0.021} c={C.glass} rot={[Math.PI / 2, 0, 0]} />
      {/* bridge */}
      <Cy p={[0, 2.02, 0.52]} r1={0.014} r2={0.014} h={0.10} c={C.glass} rot={[0, 0, Math.PI / 2]} n={6} />
      {/* temples */}
      <Cy p={[-0.335, 2.02, 0.44]} r1={0.012} r2={0.012} h={0.24} c={C.glass} rot={[0, -0.50, 0]} n={6} />
      <Cy p={[ 0.335, 2.02, 0.44]} r1={0.012} r2={0.012} h={0.24} c={C.glass} rot={[0,  0.42, 0]} n={6} />

      {/* NOSE */}
      <Sp p={[0, 1.90, 0.52]} r={0.058} c={C.skinD} />

      {/* MOUSTACHE — two wings, above mouth */}
      <Sp p={[-0.095, 1.78, 0.49]} r={0.070} c={C.beard} s={[1.0, 0.50, 0.70]} />
      <Sp p={[ 0.095, 1.78, 0.49]} r={0.070} c={C.beard} s={[1.0, 0.50, 0.70]} />

      {/* SMILE */}
      <mesh position={[0, 1.70, 0.50]} rotation={[Math.PI / 2, Math.PI, 0]}>
        <torusGeometry args={[0.060, 0.014, 6, 20, Math.PI]} />
        <meshToonMaterial color={C.lip} />
      </mesh>

      {/* BEARD — only below chin (chin ≈ local y 1.60) */}
      <Sp p={[0, 1.62, 0.26]} r={0.28} c={C.beard} s={[0.82, 1.05, 0.60]} />
      <Sp p={[0, 1.46, 0.18]} r={0.18} c={C.beard} s={[0.65, 1.15, 0.54]} />
      <Sp p={[0, 1.34, 0.11]} r={0.10} c={C.beard} s={[0.50, 1.20, 0.50]} />
      {/* cheek stubble */}
      <Sp p={[-0.30, 1.76, 0.33]} r={0.090} c={C.beard} s={[0.52, 0.80, 0.45]} />
      <Sp p={[ 0.30, 1.76, 0.33]} r={0.090} c={C.beard} s={[0.52, 0.80, 0.45]} />

      {/* ─── DASTAR (turban) ───
           sits on top of the big head
           head-top local y = 1.90 + 0.52 = 2.42
           turban-centre ≈ y 2.60  */}
      {/* main dome */}
      <Sp p={[0, 2.62, 0]} r={0.56} c={C.turban} s={[1.08, 0.88, 1.04]} />
      {/* horizontal fabric stripe 1 */}
      <Sp p={[0, 2.42, 0]} r={0.54} c={C.turbanL} s={[1.10, 0.09, 1.08]} />
      {/* stripe 2 */}
      <Sp p={[0, 2.57, 0.04]} r={0.53} c={C.turbanL} s={[1.08, 0.09, 1.05]} />
      {/* stripe 3 */}
      <Sp p={[0, 2.70, 0.02]} r={0.48} c={C.turbanL} s={[1.07, 0.09, 1.02]} />
      {/* stripe 4 */}
      <Sp p={[0, 2.82, 0.00]} r={0.38} c={C.turbanL} s={[1.06, 0.09, 1.02]} />
      {/* front peak fold */}
      <Sp p={[0, 2.56, 0.55]} r={0.100} c={C.turbanL} s={[0.78, 0.50, 0.44]} />
      {/* back tail */}
      <Bx p={[0, 2.44, -0.52]} sz={[0.16, 0.26, 0.07]} c={C.turbanL} rot={[0.28, 0, 0]} />
      {/* top knot */}
      <Sp p={[0, 2.97, 0]} r={0.14} c={C.turban} s={[1, 0.62, 1]} />
    </group>
  );
}

export default function AvatarScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 4.2], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "520px" }}
    >
      <hemisphereLight skyColor="#ccdff5" groundColor="#1a2035" intensity={0.88} />
      <directionalLight position={[3, 5, 5]}  intensity={1.30} />
      <directionalLight position={[-2, 3, -1]} intensity={0.28} color="#00d4ff" />
      <pointLight       position={[0, 3, 4]}   intensity={0.38} />
      <Suspense fallback={null}>
        <Avatar />
      </Suspense>
    </Canvas>
  );
}

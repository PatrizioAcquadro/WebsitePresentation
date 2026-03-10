import type { PhaseDetailData } from '@/lib/roadmap/phase-detail-types'

export const phase12Detail: PhaseDetailData = {
  backHref: '/roadmap#phase-1',
  phaseLabel: 'Phase 1.2',
  durationLabel: 'Week 2-4 · 12 days',
  title: 'LEGO Environment Creation',
  summary:
    'Build a MuJoCo LEGO assembly environment that is real-world-relevant for IHMC Alex, supports contact-rich press-fit behavior, is stable enough for large-scale dataset generation, and is engineered to production-grade standards.',
  highlightTitle: 'Primary Goal',
  highlightBody:
    'Deliver a complete LEGO simulation environment with procedural brick models, soft real press-fit physics, multi-view rendering, and a working MVP-3 multi-step assembly task.',
  fixedDecisionsTitle: 'Fixed Upstream Decisions (from Phase 1.1)',
  fixedDecisions: [
    { label: 'Sim Engine', value: 'MuJoCo (MJCF-first, code-first workflow)' },
    { label: 'Robot', value: 'Existing IHMC Alex model (upper-body fixed-base)' },
    { label: 'Action Space', value: '17-D Δq (spine 1 + bimanual 14) + gripper (2) @ 20 Hz' },
    { label: 'State', value: 'Core (q, q̇, gripper) + EE pose/velocity' },
    { label: 'Views', value: '2 cameras (robot camera, third-person)' },
  ],
  stanceTitle: 'Key Phase 1.2 Stance: Soft Press-Fit',
  stanceIntro:
    'We target Real press-fit as the long-term objective, but implement a Soft Press-Fit version now:',
  stanceBullets: [
    'Geometrically accurate connectors (studs/tubes) and physically plausible contacts',
    'Controlled compliance + tolerances to avoid solver instability',
    'No "magic snap constraints" as the primary mechanism (diagnostic fallback only)',
  ],
  tasksTitle: 'Environment Tasks',
  tasksSubtitle:
    'Seven critical components to build a production-ready LEGO simulation environment',
  tasks: [
    {
      label: '00',
      title: 'Soft Real Press-Fit Definition',
      description:
        'Implement a Soft Real Press-Fit LEGO connection model: studs and tubes with accurate geometry, but physics made robust via compliance, tolerances, and contact conditioning.',
      why:
        'True LEGO assembly is defined by insertion forces, alignment, and mechanical retention. A soft-real press-fit preserves these phenomena while keeping the simulator stable enough to generate high-quality datasets and support future sim-to-real transfer.',
      checklist: [
        'Define press-fit realism targets (stud enters only if aligned, insertion requires force, connection stable under perturbations)',
        'Design contact conditioning strategy using soft-contact parameters',
        'Define tolerances and clearances explicitly (capture envelope, retention behavior)',
        'Define measurable success criteria (insertion rate, jitter limits, retention tests)',
      ],
      milestone:
        'Standardized press-fit specification: connect only when aligned, requires insertion effort, stays connected under disturbances',
      icon: 'shield',
    },
    {
      label: '01',
      title: 'Procedural LEGO Brick Models (2×2, 2×4, 2×6)',
      description:
        'Create procedural (parametric) LEGO bricks that generate accurate visual meshes, connector metadata, and collision geometry for stable soft press-fit contacts.',
      why:
        'Procedural assets provide scale and extensibility, perfect consistency for dataset generation, and a strong engineering signal: engineered assets, not ad-hoc meshes.',
      checklist: [
        'Define parameterization spec (stud pitch, brick height, stud/tube dimensions)',
        'Generate procedural geometry (shell, studs, tubes/sockets)',
        'Generate connector metadata with stable IDs (position, axis, radius for each stud/tube)',
        'Define collision strategy (primitives for contacts, separate visual mesh)',
        'Implement asset export & versioning for reproducibility',
      ],
      milestone:
        'Procedural generator produces 2×2, 2×4, 2×6 bricks with visually accurate studs, stable collision geoms, and complete connector metadata',
      icon: 'cube',
    },
    {
      label: '02',
      title: 'Stud/Tube Contact Physics',
      description:
        'Implement and tune contact physics to achieve press-fit behavior using physically plausible contacts, compliance, and stable solver conditioning.',
      why:
        'This is the core of LEGO assembly realism. If it fails, the environment either becomes unstable (no dataset) or unrealistic (no transfer).',
      checklist: [
        'Define contact material model (friction coefficients, compliance, damping)',
        'Implement connector interaction rules (physics-first, not snap-first)',
        'Add stability-first conditioning (penetration caps, bounded forces, substep adjustments)',
        'Create calibration tests (single-stud insertion, multi-stud insertion, pull-off retention)',
        'Ensure dataset relevance (stability across brick sizes, multiple contacts, repeated cycles)',
      ],
      milestone:
        'Press-fit behavior is demonstrable and repeatable: succeeds when aligned, resists when misaligned, remains attached under disturbance',
      icon: 'bolt',
    },
    {
      label: '03',
      title: 'Baseplate & Workspace',
      description:
        'Create a baseplate that is physically stable and press-fit compatible, prioritizing realism while keeping geometry and collisions solver-friendly.',
      why:
        'The baseplate anchors the entire assembly task. It defines the reference frame for "correct placement" and enables scalable multi-step builds.',
      checklist: [
        'Implement baseplate with visually accurate surface and press-fit compatible studs',
        'Define workspace layout relative to Alex torso (baseplate pose, spawn regions, safety margins)',
        'Tune surface/contact parameters to prevent "ice skating"',
        'Create validation tests (resting stability, controlled insertion, retention/detach)',
      ],
      milestone:
        'Baseplate supports soft-real press-fit connections: bricks connect and remain stable, environment numerically stable across episodes',
      icon: 'grid',
    },
    {
      label: '04',
      title: 'Multi-View Rendering & Data Logging',
      description:
        'Implement camera and data logging setup that maximizes learning signal, debugging capability, and dataset utility for future methods.',
      why:
        'Capturing richer modalities early enables faster iteration, stronger results, and cleaner evaluation.',
      checklist: [
        'Implement 2 camera mounts (robot camera, third-person) with correct tracking',
        'Capture RGB + depth + segmentation per camera',
        'Set resolution (320×320 or 384×384) at 20 Hz synchronized with state/action',
        'Implement deterministic alignment with metadata (intrinsics, extrinsics, sim time, episode ID)',
        'Add dataset sanity viewer for validation',
      ],
      milestone:
        'Two-view synchronized recording works reliably headless, RGB/depth/segmentation aligned with state/action',
      icon: 'camera',
    },
    {
      label: '05',
      title: 'Block Spawning & Reset',
      description:
        'Implement a high-reliability episode manager: deterministic spawns, collision-free initialization, settle phase, curriculum hooks, and full reproducibility.',
      why:
        'Scalable, reproducible, automated data generation pipelines are essential for training robust policies.',
      checklist: [
        'Implement deterministic reset (seed-based, versioned config)',
        'Add constraint-based spawn sampling (min-distance, orientation, no intersections)',
        'Implement settle phase after spawning',
        'Add curriculum scaffolding (single brick → single connection → multi-step assembly)',
        'Track reset reliability metrics (success rate, settle time, failure reasons)',
      ],
      milestone:
        'Reset success rate ≥95%, episodes reproducible by seed, multi-brick scenes without frequent invalid starts',
      icon: 'refresh',
    },
    {
      label: '06',
      title: 'MVP-3 Task (Multi-Step Assembly)',
      description:
        'Implement an MVP demonstrating true assembly: multi-step stacking of multiple bricks with real soft press-fit connections.',
      why:
        'MVP-3 is the strongest showcase: perception, precision, bimanual control, and contact-rich manipulation in a single integrated demonstration.',
      checklist: [
        'Define brick set (2×2, 2×4, 2×6) and assembly goal (2-4 brick structure)',
        'Implement objective specification (per-step subgoals, success detection via connector engagement)',
        'Implement failure detection (dropped brick, oscillations, misaligned insertion)',
        'Validate end-to-end scripted "gold" trajectories',
        'Define success criteria (connection formed via press-fit, structure stable for N seconds)',
      ],
      milestone:
        'Scripted controller completes MVP-3 reliably, connections form via soft press-fit, success detection accurate and reproducible',
      icon: 'flask',
    },
  ],
  deliverablesIntro: 'Expected outputs by end of Phase 1.2:',
  deliverables: [
    'Procedural LEGO asset generator (2×2/2×4/2×6) with connector metadata',
    'Soft Real Press-Fit model (documented parameters + calibration tests)',
    'Baseplate + workspace with reliable press-fit behavior',
    'Two-view dataset logging (RGB + depth + segmentation) synchronized with state/action',
    'Episode manager with deterministic seeding and reset reliability metrics',
    'MVP-3 multi-step assembly scenario + scripted feasibility rollouts',
    'Validation report: press-fit calibration, reset reliability, example MVP-3 rollouts',
  ],
  doneItems: [
    {
      title: 'Brick Assets',
      description: 'Procedural bricks (2×2/2×4/2×6) and baseplate exist with connector metadata.',
    },
    {
      title: 'Press-Fit Physics',
      description: 'Soft-real press-fit contacts are stable and validated via repeatable tests.',
    },
    {
      title: 'Multi-View Recording',
      description: 'Two cameras record RGB+depth+segmentation in sync with state/action.',
    },
    {
      title: 'Episode Management',
      description: 'Spawning/reset is deterministic and reliable (high success rate).',
    },
    {
      title: 'MVP-3 Assembly',
      description:
        'Multi-step assembly feasible via scripted rollouts with measurable success metrics.',
    },
    {
      title: 'Validation',
      description: 'Short validation report with press-fit calibration, reset stats, example rollouts.',
    },
  ],
  estimatedDuration: '12 days',
}

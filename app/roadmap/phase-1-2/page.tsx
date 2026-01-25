'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const environmentTasks = [
  {
    id: 0,
    title: 'Soft Real Press-Fit Definition',
    description: 'Implement a Soft Real Press-Fit LEGO connection model: studs and tubes with accurate geometry, but physics made robust via compliance, tolerances, and contact conditioning.',
    why: 'True LEGO assembly is defined by insertion forces, alignment, and mechanical retention. A soft-real press-fit preserves these phenomena while keeping the simulator stable enough to generate high-quality datasets and support future sim-to-real transfer.',
    checklist: [
      'Define press-fit realism targets (stud enters only if aligned, insertion requires force, connection stable under perturbations)',
      'Design contact conditioning strategy using soft-contact parameters',
      'Define tolerances and clearances explicitly (capture envelope, retention behavior)',
      'Define measurable success criteria (insertion rate, jitter limits, retention tests)',
    ],
    milestone: 'Standardized press-fit specification: connect only when aligned, requires insertion effort, stays connected under disturbances',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 1,
    title: 'Procedural LEGO Brick Models (2×2, 2×4, 2×6)',
    description: 'Create procedural (parametric) LEGO bricks that generate accurate visual meshes, connector metadata, and collision geometry for stable soft press-fit contacts.',
    why: 'Procedural assets provide scale and extensibility, perfect consistency for dataset generation, and a strong engineering signal: engineered assets, not ad-hoc meshes.',
    checklist: [
      'Define parameterization spec (stud pitch, brick height, stud/tube dimensions)',
      'Generate procedural geometry (shell, studs, tubes/sockets)',
      'Generate connector metadata with stable IDs (position, axis, radius for each stud/tube)',
      'Define collision strategy (primitives for contacts, separate visual mesh)',
      'Implement asset export & versioning for reproducibility',
    ],
    milestone: 'Procedural generator produces 2×2, 2×4, 2×6 bricks with visually accurate studs, stable collision geoms, and complete connector metadata',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Stud/Tube Contact Physics',
    description: 'Implement and tune contact physics to achieve press-fit behavior using physically plausible contacts, compliance, and stable solver conditioning.',
    why: 'This is the core of LEGO assembly realism. If it fails, the environment either becomes unstable (no dataset) or unrealistic (no transfer).',
    checklist: [
      'Define contact material model (friction coefficients, compliance, damping)',
      'Implement connector interaction rules (physics-first, not snap-first)',
      'Add stability-first conditioning (penetration caps, bounded forces, substep adjustments)',
      'Create calibration tests (single-stud insertion, multi-stud insertion, pull-off retention)',
      'Ensure dataset relevance (stability across brick sizes, multiple contacts, repeated cycles)',
    ],
    milestone: 'Press-fit behavior is demonstrable and repeatable: succeeds when aligned, resists when misaligned, remains attached under disturbance',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Baseplate & Workspace',
    description: 'Create a baseplate that is physically stable and press-fit compatible, prioritizing realism while keeping geometry and collisions solver-friendly.',
    why: 'The baseplate anchors the entire assembly task. It defines the reference frame for "correct placement" and enables scalable multi-step builds.',
    checklist: [
      'Implement baseplate with visually accurate surface and press-fit compatible studs',
      'Define workspace layout relative to H1 torso (baseplate pose, spawn regions, safety margins)',
      'Tune surface/contact parameters to prevent "ice skating"',
      'Create validation tests (resting stability, controlled insertion, retention/detach)',
    ],
    milestone: 'Baseplate supports soft-real press-fit connections: bricks connect and remain stable, environment numerically stable across episodes',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Multi-View Rendering & Data Logging',
    description: 'Implement camera and data logging setup that maximizes learning signal, debugging capability, and dataset utility for future methods.',
    why: 'Startups care about data and measurement. Capturing richer modalities early enables faster iteration, stronger results, and cleaner evaluation.',
    checklist: [
      'Implement 4 camera mounts (overhead, wrist-L, wrist-R, third-person) with correct tracking',
      'Capture RGB + depth + segmentation per camera',
      'Set resolution (320×320 or 384×384) at 20 Hz synchronized with state/action',
      'Implement deterministic alignment with metadata (intrinsics, extrinsics, sim time, episode ID)',
      'Add dataset sanity viewer for validation',
    ],
    milestone: 'Four-view synchronized recording works reliably headless, RGB/depth/segmentation aligned with state/action',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Block Spawning & Reset',
    description: 'Implement a high-reliability episode manager: deterministic spawns, collision-free initialization, settle phase, curriculum hooks, and full reproducibility.',
    why: 'This is one of the strongest engineering signals for startups: the ability to create scalable, reproducible, automated data generation pipelines.',
    checklist: [
      'Implement deterministic reset (seed-based, versioned config)',
      'Add constraint-based spawn sampling (min-distance, orientation, no intersections)',
      'Implement settle phase after spawning',
      'Add curriculum scaffolding (single brick → single connection → multi-step assembly)',
      'Track reset reliability metrics (success rate, settle time, failure reasons)',
    ],
    milestone: 'Reset success rate ≥95%, episodes reproducible by seed, multi-brick scenes without frequent invalid starts',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'MVP-3 Task (Multi-Step Assembly)',
    description: 'Implement an MVP demonstrating true assembly: multi-step stacking of multiple bricks with real soft press-fit connections.',
    why: 'MVP-3 is the strongest showcase: perception, precision, bimanual control, and contact-rich manipulation—exactly the profile that resonates with robotics startups.',
    checklist: [
      'Define brick set (2×2, 2×4, 2×6) and assembly goal (2-4 brick structure)',
      'Implement objective specification (per-step subgoals, success detection via connector engagement)',
      'Implement failure detection (dropped brick, oscillations, misaligned insertion)',
      'Validate end-to-end scripted "gold" trajectories',
      'Define success criteria (connection formed via press-fit, structure stable for N seconds)',
    ],
    milestone: 'Scripted controller completes MVP-3 reliably, connections form via soft press-fit, success detection accurate and reproducible',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
]

const fixedDecisions = [
  { label: 'Sim Engine', value: 'MuJoCo (MJCF-first, code-first workflow)' },
  { label: 'Robot', value: 'Existing Unitree H1 model (upper-body fixed-base)' },
  { label: 'Action Space', value: '16-D Δq (bimanual 14) + gripper (2) @ 20 Hz' },
  { label: 'State', value: 'Core (q, q̇, gripper) + EE pose/velocity' },
  { label: 'Views', value: '4 cameras (overhead, wrist-L, wrist-R, third-person)' },
]

const deliverables = [
  'Procedural LEGO asset generator (2×2/2×4/2×6) with connector metadata',
  'Soft Real Press-Fit model (documented parameters + calibration tests)',
  'Baseplate + workspace with reliable press-fit behavior',
  'Four-view dataset logging (RGB + depth + segmentation) synchronized with state/action',
  'Episode manager with deterministic seeding and reset reliability metrics',
  'MVP-3 multi-step assembly scenario + scripted feasibility rollouts',
  'Validation report: press-fit calibration, reset reliability, example MVP-3 rollouts',
]

export default function Phase12Page() {
  return (
    <div className="pt-16 min-h-screen bg-[#161316]">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/roadmap#phase-1"
            className="inline-flex items-center text-[#BABABA] hover:text-[#FF6D29] mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Roadmap
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#FF6D29]/10 border border-[#FF6D29]/30 rounded-lg text-[#FF6D29] text-sm font-medium">
                Phase 1.2
              </span>
              <span className="px-3 py-1 bg-[#453027]/30 border border-[#453027] rounded-lg text-[#BABABA] text-sm">
                Week 2-4 &middot; 5 days
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
              LEGO Environment Creation
            </h1>

            <p className="text-lg text-[#BABABA] max-w-3xl mb-8">
              Build a MuJoCo LEGO assembly environment that is real-world-relevant for Unitree H1,
              supports contact-rich press-fit behavior, is stable enough for large-scale dataset generation,
              and is engineered to startup-grade standards.
            </p>

            {/* Goal highlight */}
            <div className="p-5 bg-gradient-to-r from-[#FF6D29]/10 to-transparent border-l-4 border-[#FF6D29] rounded-r-xl max-w-3xl">
              <h3 className="text-white font-semibold mb-2">Primary Goal</h3>
              <p className="text-[#BABABA]">
                Deliver a complete LEGO simulation environment with procedural brick models,
                soft real press-fit physics, multi-view rendering, and a working MVP-3 multi-step assembly task.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fixed Decisions */}
      <div className="px-4 py-12 bg-[#1d1a1d]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Fixed Upstream Decisions (from Phase 1.1)
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fixedDecisions.map((decision, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#161316] border border-[#453027]/50 rounded-xl"
                >
                  <span className="text-[#BABABA] text-sm">{decision.label}</span>
                  <p className="text-white font-medium mt-1">{decision.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Stance */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#FF6D29]/30 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Key Phase 1.2 Stance: Soft Press-Fit</h2>
            </div>
            <p className="text-[#BABABA] mb-4">
              We target <span className="text-white font-medium">Real press-fit</span> as the long-term objective,
              but implement a <span className="text-[#FF6D29] font-medium">Soft Press-Fit</span> version now:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-[#BABABA]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                <span><span className="text-white">Geometrically accurate connectors</span> (studs/tubes) and <span className="text-white">physically plausible contacts</span></span>
              </li>
              <li className="flex items-start gap-3 text-[#BABABA]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                <span><span className="text-white">Controlled compliance + tolerances</span> to avoid solver instability</span>
              </li>
              <li className="flex items-start gap-3 text-[#BABABA]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                <span><span className="text-white">No &quot;magic snap constraints&quot;</span> as the primary mechanism (diagnostic fallback only)</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-white mb-3 text-center"
          >
            Environment Tasks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#BABABA] text-center mb-12 max-w-2xl mx-auto"
          >
            Seven critical components to build a production-ready LEGO simulation environment
          </motion.p>

          <div className="space-y-6">
            {environmentTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors"
              >
                {/* Task Header */}
                <div className="p-6 border-b border-[#453027]/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] shrink-0">
                      {task.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#FF6D29] text-sm font-semibold">0{task.id}</span>
                        <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                      </div>
                      <p className="text-[#BABABA]">{task.description}</p>
                    </div>
                  </div>
                </div>

                {/* Task Content */}
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  {/* Why Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white font-medium">Why This Matters</span>
                    </div>
                    <p className="text-[#BABABA] text-sm leading-relaxed pl-7">{task.why}</p>
                  </div>

                  {/* Checklist */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <span className="text-white font-medium">Checklist</span>
                    </div>
                    <ul className="space-y-2 pl-7">
                      {task.checklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#BABABA]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#453027] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Milestone */}
                <div className="px-6 pb-6">
                  <div className="p-4 bg-[#FF6D29]/5 border border-[#FF6D29]/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span className="text-[#FF6D29] font-semibold text-sm">Milestone</span>
                    </div>
                    <p className="text-white text-sm pl-7">{task.milestone}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="px-4 py-12 bg-[#1d1a1d]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Startup-Grade Outputs</h2>
            </div>
            <p className="text-[#BABABA] mb-4">Deliverables you should explicitly claim by end of Phase 1.2:</p>
            <ul className="space-y-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#BABABA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Definition of Done */}
      <div className="px-4 py-16 bg-gradient-to-b from-[#161316] to-[#1d1a1d]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white">Definition of Done</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Brick Assets</h3>
                <p className="text-[#BABABA] text-sm">
                  Procedural bricks (2×2/2×4/2×6) and baseplate exist with connector metadata.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Press-Fit Physics</h3>
                <p className="text-[#BABABA] text-sm">
                  Soft-real press-fit contacts are stable and validated via repeatable tests.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Multi-View Recording</h3>
                <p className="text-[#BABABA] text-sm">
                  Four cameras record RGB+depth+segmentation in sync with state/action.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Episode Management</h3>
                <p className="text-[#BABABA] text-sm">
                  Spawning/reset is deterministic and reliable (high success rate).
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">MVP-3 Assembly</h3>
                <p className="text-[#BABABA] text-sm">
                  Multi-step assembly feasible via scripted rollouts with measurable success metrics.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Validation</h3>
                <p className="text-[#BABABA] text-sm">
                  Short validation report with press-fit calibration, reset stats, example rollouts.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#453027]/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[#BABABA] text-sm">Estimated Duration</span>
                  <p className="text-white font-semibold">5 days</p>
                </div>
                <Link
                  href="/roadmap#phase-1"
                  className="px-6 py-3 bg-[#FF6D29] hover:bg-[#FF8F5A] text-white font-medium rounded-xl transition-colors"
                >
                  Back to Roadmap
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

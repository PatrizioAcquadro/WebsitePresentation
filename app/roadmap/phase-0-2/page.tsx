'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const mujocoTasks = [
  {
    id: 1,
    title: 'MuJoCo Runtime Installation',
    description: 'Install MuJoCo (Python bindings) and validate basic simulation stepping on the lab PC in a pinned, reproducible environment.',
    why: 'All Phase 1 work depends on a stable simulator. If MuJoCo import/rendering is flaky, you will lose days later debugging "not the robot, not the environment—just the stack".',
    checklist: [
      'Select the canonical MuJoCo Python binding and pin versions',
      'Ensure system-level prerequisites are present on the lab PC (OpenGL libs, etc.)',
      'Confirm import works and a minimal MJCF loads',
      'Validate deterministic stepping at a fixed timestep for N steps',
      'Record environment metadata: OS, GPU driver, Python version, deps hash, git commit',
    ],
    milestone: 'A minimal MuJoCo scene loads and steps reliably on the lab PC with no runtime errors. Setup is reproducible from docs in < 60 minutes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Interactive Viewer Workflow',
    description: 'Enable an interactive viewer workflow on the lab PC to debug robot asset loading (Alex MJCF/meshes), coordinate frames, contacts, and camera placement.',
    why: 'For contact-rich manipulation, visual debugging is the fastest path to correctness (frames, penetration, collisions, camera alignment). This is your "speed loop".',
    checklist: [
      'Validate windowed rendering works (viewer opens reliably)',
      'Create a standard "viewer launch" entrypoint (consistent args + config)',
      'Define a debug checklist: verify gravity/ground plane, joint axes, collision geoms vs visual meshes, contact points/forces',
      'Confirm that viewer usage does not pollute training/runtime codepaths (separation of debug vs headless)',
    ],
    milestone: 'You can open a MuJoCo scene and visually inspect motion/contacts for 2–5 minutes without crashes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Headless Offscreen Rendering',
    description: 'Make sure offscreen rendering works without a GUI so you can generate videos for debugging and later run the same pipeline headlessly on the cluster.',
    why: 'Phase 1 requires multi-view logging. Offscreen rendering is non-negotiable for scale and for unattended regression tests.',
    checklist: [
      'Select and validate the headless rendering backend strategy (GPU-offscreen preferred)',
      'Run an offscreen render smoke test that produces: RGB frames (required), depth frames (strongly recommended), segmentation/instance IDs (recommended)',
      'Export a short video artifact (e.g., 5–10 seconds) + sample images',
      'Verify strict synchronization primitives exist: same sim step -> same rendered frame index (alignment contract)',
      'Store artifacts with Phase 0.1 run naming conventions',
    ],
    milestone: 'A headless run produces a short MP4 (or equivalent) + sample frames reliably on the lab PC.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Sim Smoke Tests Suite',
    description: 'Add a minimal smoke test suite for simulation that is fast and repeatable.',
    why: 'This protects you from subtle regressions when you change assets, contacts, or rendering. It also signals engineering discipline.',
    checklist: [
      'Create 3 standardized tests: Step test (N steps with stable dt, no NaNs, no explosions), Render test (produce RGB + depth deterministically), I/O test (writes logs/artifacts to correct directory layout)',
      'Define pass/fail metrics: max penetration threshold, no unstable energy blow-ups, render returns correct shapes and non-empty frames',
      'Integrate with Phase 0.1 conventions: log seed + config snapshot, attach artifacts to W&B/MLflow if standard',
    ],
    milestone: 'One command runs all smoke tests and generates artifacts + logs with consistent naming.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Asset Pathing & Loader Contract',
    description: 'Lock a strict contract for how assets (MJCF + meshes + textures) are stored and referenced, so loading the Alex model is predictable.',
    why: 'The most common failure mode in robotics sim work is "broken mesh paths / wrong scaling / inconsistent frames". A loader contract prevents repeated friction.',
    checklist: [
      'Define a canonical asset directory layout (and keep it stable)',
      'Enforce relative paths inside MJCF (no machine-specific absolutes)',
      'Add an "asset linter" that checks: missing files, invalid references, suspicious scaling factors',
      'Create a minimal "asset load test" that loads: floor + light + one test body, then the Alex MJCF (in Phase 1.1)',
    ],
    milestone: 'Assets are loadable via a single entrypoint with zero missing-path errors.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Cluster Compatibility Smoke',
    description: 'Confirm the cluster can run the exact same headless simulation path for future scaling, without making the cluster the primary debug environment.',
    why: 'You want lab-first iteration speed, but you also need confidence that scaling later won\'t break due to rendering backend or missing system deps.',
    checklist: [
      'Reuse Phase 0.1 job templates / container strategy (no new infra)',
      'Run one short SLURM job that: steps sim headlessly, renders a short clip, writes artifacts to the cluster filesystem using your standard layout',
      'Decide ThinLinc usage policy: Default is no GUI on cluster (headless artifacts); Fallback is ThinLinc only if a visual bug cannot be diagnosed from saved videos/frames',
    ],
    milestone: 'A cluster job produces the same type of artifacts as the lab PC headless test (video/frames + logs).',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
]

export default function Phase02Page() {
  return (
    <div className="pt-16 min-h-screen bg-[#161316]">
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/roadmap#phase-0"
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
                Phase 0.2
              </span>
              <span className="px-3 py-1 bg-[#453027]/30 border border-[#453027] rounded-lg text-[#BABABA] text-sm">
                Week 1 &middot; Jan 16-25
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
              MuJoCo Sim Stack + Visualization Workflow
            </h1>

            <p className="text-lg text-[#BABABA] max-w-3xl mb-8">
              Enable fast, visual, and reproducible MuJoCo development on the lab workstation (Linux + monitor),
              while keeping the codebase cluster-ready for future large-scale rollouts and training.
            </p>

            {/* Goal highlight */}
            <div className="p-5 bg-gradient-to-r from-[#FF6D29]/10 to-transparent border-l-4 border-[#FF6D29] rounded-r-xl max-w-3xl">
              <h3 className="text-white font-semibold mb-2">Primary Goal</h3>
              <p className="text-[#BABABA]">
                Lab-first iteration speed with full cluster compatibility. Interactive debugging on the
                workstation, headless rendering for batch operations, and a smoke test suite that catches regressions early.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Prerequisites Note */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 bg-[#1d1a1d] border border-[#453027] rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Prerequisites from Phase 0.1</h3>
                <p className="text-[#BABABA] text-sm">
                  This phase builds on: Cluster access + SLURM job templates, CUDA/cuDNN/PyTorch pinned stack + containerization,
                  DeepSpeed ZeRO-1 multi-GPU training smoke tests, W&B/MLflow tracking conventions, and Repo structure + CI/CD + config-first execution.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-white mb-3 text-center"
          >
            Setup Tasks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#BABABA] text-center mb-12 max-w-2xl mx-auto"
          >
            Six tasks that establish the simulation foundation for all Phase 1 robotics work
          </motion.p>

          <div className="space-y-6">
            {mujocoTasks.map((task, index) => (
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
                        <span className="text-[#FF6D29] text-sm font-semibold">0.2.{task.id}</span>
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

      {/* Definition of Done Section */}
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
              <h2 className="text-2xl font-semibold text-white">Phase Completion Criteria</h2>
            </div>

            <p className="text-[#BABABA] mb-6">Phase 0.2 is complete when:</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-white font-medium">Interactive Viewer</h3>
                </div>
                <p className="text-[#BABABA] text-sm">
                  Lab PC supports interactive viewer for fast debugging.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-white font-medium">Headless Rendering</h3>
                </div>
                <p className="text-[#BABABA] text-sm">
                  Lab PC supports headless offscreen rendering and exports artifacts reliably.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-white font-medium">Smoke Test Suite</h3>
                </div>
                <p className="text-[#BABABA] text-sm">
                  Push-button sim smoke test suite exists and aligns with Phase 0.1 reproducibility standards.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-white font-medium">Asset Contract</h3>
                </div>
                <p className="text-[#BABABA] text-sm">
                  Asset paths and loader contract are defined (ready to load IHMC Alex in Phase 1.1).
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-white font-medium">Cluster Compatibility</h3>
                </div>
                <p className="text-[#BABABA] text-sm">
                  Cluster can run a headless sim smoke job (render + save) using existing Phase 0.1 infrastructure.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#453027]/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[#BABABA] text-sm">Estimated Duration</span>
                  <p className="text-white font-semibold">2-3 days</p>
                </div>
                <Link
                  href="/roadmap#phase-0"
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

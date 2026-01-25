'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const integrationTasks = [
  {
    id: 1,
    title: 'Import/Create Bimanual Robot URDF/MJCF',
    description: 'Integrate the existing Unitree H1 asset into MuJoCo as an upper-body fixed-base bimanual robot.',
    why: 'All downstream phases (multi-view data generation, action learning, sim-to-real) depend on a single "source of truth" robot model that is stable, versioned, and structurally consistent with H1.',
    checklist: [
      'Identify and pin a single authoritative H1 model version (commit hash / release tag)',
      'Convert to MJCF if necessary (MJCF-first is the final truth)',
      'Remove or disable unused full-body components for 1.x (legs/locomotion)',
      'Define a fixed root/body for the torso (no floating base)',
      'Freeze canonical names for base/torso frame, arm joints, EE frames, camera mounts',
    ],
    milestone: 'Robot model loads reliably, runs 10 seconds without instability, has frozen joint ordering + named EE frames',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Configure Joint Limits & Dynamics Parameters',
    description: 'Set joint limits, velocity limits, actuator constraints, and minimal-but-impactful dynamic parameters for stable contact-rich manipulation.',
    why: 'LEGO assembly is sensitive to small instabilities. Incorrect limits or poorly conditioned dynamics cause jitter, penetration, unrealistic contacts, and non-transferable policies.',
    checklist: [
      'Populate min/max joint ranges for both arms (verify sign conventions)',
      'Define joint velocity limits and implied acceleration limits via rate limiting',
      'Define actuator ctrlrange and plausible saturation behavior',
      'Add joint damping/friction terms to reduce oscillations',
      'Sanity tests: drop/settle, hold-pose under PD, joint sweep',
    ],
    milestone: 'Robot stable under gravity and PD holding, joint motion respects limits, no high-frequency jitter',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Set Up Gripper Models (Parallel Jaw)',
    description: 'Implement parallel-jaw grippers (1-DoF open/close) for both arms with stable contacts and a future-proof command interface.',
    why: 'Without reliable grasping, you cannot generate meaningful LEGO datasets or demonstrate bimanual assembly. A simple, stable gripper beats a complex hand early on.',
    checklist: [
      'Implement 1-DoF gripper width per arm (open/close)',
      'Use collision primitives for fingertips (avoid mesh collisions)',
      'Set friction/contact parameters for non-slipping grasps',
      'Define gripper_cmd ∈ [0, 1] per arm: 0 = closed, 1 = open',
      'Freeze tool_frame per gripper for EE pose logging',
    ],
    milestone: 'Both grippers open/close stably and execute repeatable grasp+lift on simple object',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Verify Kinematics Match Target (H1-Compatible)',
    description: 'Produce a Kinematics Validation Report demonstrating that the integrated model matches H1 kinematics (Level 2).',
    why: 'This is your proof that the sim robot is not a "proxy". It protects the project from hidden frame/joint mismatches that would break sim-to-real or invalidate evaluation.',
    checklist: [
      'Use the pinned H1 model definition as reference',
      'Sample 50–200 random joint configs for FK consistency tests',
      'Compute EE position error (cm) and orientation error (degrees)',
      'Verify workspace overlap and check for mirrored-axis mistakes',
      'Document joint ordering table, frame conventions, error distributions',
    ],
    milestone: 'Report exists, FK tests show no gross mismatch, clear Go/No-Go statement for dataset generation',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Action Space & Low-Level Control Contract',
    description: 'Freeze the action vector definition and low-level control strategy that converts model outputs into stable joint motion.',
    why: 'Your entire learning system (dataset, policy output head, chunking, evaluation) depends on an unambiguous action contract. If this changes later, you risk invalidating collected data and learned models.',
    checklist: [
      'Define action = [Δq_left(7), Δq_right(7), gripper_left(1), gripper_right(1)] → 16-D',
      'Normalize action to [-1, 1] and map to Δq via Δq_max per joint',
      'Policy/control rate: 20 Hz (one action per 50 ms)',
      'Physics substeps: 5–10 substeps per action',
      'Joint-space PD/impedance tracking with safety clamps',
    ],
    milestone: 'Action contract frozen, action sequences result in stable bounded motion, no jitter under repeated chunks',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Robot State Contract',
    description: 'Define the robot state vector that will be logged and used as input for the VLA policy.',
    why: 'A stable and informative state representation improves learning efficiency, supports precision assembly, and enables rigorous debugging and evaluation.',
    checklist: [
      'Core: Joint positions (q), joint velocities (q_dot), gripper state',
      'Recommended: EE pose (pos + quat), EE velocity for each arm',
      'All poses/velocities specify reference frame (base/torso)',
      'Quaternion ordering convention documented consistently',
      'State normalization ranges documented (clip ranges, scaling)',
    ],
    milestone: 'State vector stable across runs, fields logged and validated, schema frozen for dataset generation',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 7,
    title: 'Multi-View Cameras (4 Views)',
    description: 'Set up four synchronized camera streams in MuJoCo for data generation and policy inputs.',
    why: 'Bimanual LEGO assembly requires both global context and local precision views. Multi-view inputs also strengthen generalization and make demos more compelling for industrial evaluation.',
    checklist: [
      'Workspace Overhead — global layout of bricks and task context',
      'Left Wrist Camera — precision grasp/alignment view',
      'Right Wrist Camera — precision grasp/alignment view',
      'Third-Person Camera — debugging + presentation + additional context',
      'Ensure synchronization (all cameras correspond to same sim timestep)',
    ],
    milestone: 'All 4 cameras render reliably (headless-capable), wrist cameras track EE correctly, config frozen for dataset logging',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const fixedDecisions = [
  { label: 'Sim Engine', value: 'MuJoCo (MJCF-first workflow)' },
  { label: 'Robot Asset', value: 'Existing Unitree H1 model (no proxy)' },
  { label: 'Scope', value: 'Upper-body fixed-base (no locomotion in 1.x)' },
  { label: 'H1 Compatibility', value: 'Level 2+ (full kinematic + realistic limits)' },
  { label: 'Action Space', value: 'Δq joint deltas for bimanual arms + gripper' },
  { label: 'Views', value: '4 cameras from day 1' },
]

export default function Phase11Page() {
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
                Phase 1.1
              </span>
              <span className="px-3 py-1 bg-[#453027]/30 border border-[#453027] rounded-lg text-[#BABABA] text-sm">
                Week 2-4 &middot; 4 days
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
              Robot Model Integration
            </h1>

            <p className="text-lg text-[#BABABA] max-w-3xl mb-8">
              Deliver a stable, reproducible, and H1-compatible upper-body fixed-base robot model in MuJoCo,
              with functional bimanual grippers and a finalized action/state contract for VLA training.
            </p>

            {/* Goal highlight */}
            <div className="p-5 bg-gradient-to-r from-[#FF6D29]/10 to-transparent border-l-4 border-[#FF6D29] rounded-r-xl max-w-3xl">
              <h3 className="text-white font-semibold mb-2">Primary Goal</h3>
              <p className="text-[#BABABA]">
                Establish a &quot;source of truth&quot; robot model with frozen action/state contracts,
                validated kinematics, and multi-view camera setup ready for dataset generation.
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
              Fixed Decisions (frozen for 1.1+)
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
            Integration Tasks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#BABABA] text-center mb-12 max-w-2xl mx-auto"
          >
            Seven critical components to establish a production-ready robot model for VLA training
          </motion.p>

          <div className="space-y-6">
            {integrationTasks.map((task, index) => (
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

      {/* Risks Section */}
      <div className="px-4 py-12 bg-[#1d1a1d]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-yellow-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Notes & Risks</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[#BABABA]">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0" />
                <span>LEGO contact richness can cause solver instability; prioritize collision simplification and stable solver settings early.</span>
              </li>
              <li className="flex items-start gap-3 text-[#BABABA]">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0" />
                <span>Kinematic mismatches (axis flips, wrong EE frame) are the #1 silent failure mode; validation report is mandatory before dataset generation.</span>
              </li>
              <li className="flex items-start gap-3 text-[#BABABA]">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0" />
                <span>Do not expand to full-body locomotion in 1.x; keep scope aligned with bimanual tabletop assembly.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Summary Section */}
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
                <h3 className="text-white font-medium mb-2">Robot Model</h3>
                <p className="text-[#BABABA] text-sm">
                  H1 upper-body fixed-base MJCF loads and simulates stably with Level 2+ constraints.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Grippers</h3>
                <p className="text-[#BABABA] text-sm">
                  Bimanual parallel-jaw grippers work reliably for basic grasp+lift operations.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Action Contract</h3>
                <p className="text-[#BABABA] text-sm">
                  16-D action (Δq + gripper) is frozen and stable under repeated action chunks.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">State Contract</h3>
                <p className="text-[#BABABA] text-sm">
                  Core proprioception + EE pose/velocity is consistent and schema is frozen.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Camera Setup</h3>
                <p className="text-[#BABABA] text-sm">
                  4 cameras (overhead, wrist-L, wrist-R, third-person) render reliably and synchronously.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Validation</h3>
                <p className="text-[#BABABA] text-sm">
                  Kinematics Validation Report exists with FK-based evidence of H1 compatibility.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#453027]/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[#BABABA] text-sm">Estimated Duration</span>
                  <p className="text-white font-semibold">4 days</p>
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

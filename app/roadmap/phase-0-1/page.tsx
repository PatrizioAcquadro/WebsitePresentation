'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const setupTasks = [
  {
    id: 1,
    title: 'GPU Cluster Access & Job Scheduler',
    description: 'Configure SLURM/PBS job submission for reproducible, queued, resource-correct experiments.',
    why: 'Ensures repeatable, queued, resource-correct experiments later.',
    checklist: [
      'Access to GPU partitions/queues (limits, max runtime, quotas, multi-node policy)',
      'Standardize core environment variables (CUDA/NCCL, HF cache, dataset paths, log/checkpoint dirs)',
      'Create working job templates: 1×GPU smoke job, multi-GPU (1 node) job, multi-node job',
    ],
    milestone: 'Submitted job starts, writes logs, produces a checkpoint in the expected location',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'CUDA, cuDNN, PyTorch 2.x Installation',
    description: 'Set up deep learning stack with version-locked dependencies for consistent training.',
    why: 'Eliminates cluster failures (while locally works) and ABI/version mismatch issues.',
    checklist: [
      'Lock compatible versions (driver-CUDA-PyTorch) and pin dependencies',
      'Container (Apptainer/Docker) for reproducibility',
      'Micro-training test (dummy model/data) and save a checkpoint',
    ],
    milestone: 'Single-GPU forward/backward is stable and the produced checkpoint reloads',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'DeepSpeed ZeRO-1 Configuration',
    description: 'Enable distributed training across 8×A100 GPUs with memory optimization.',
    why: 'Feasibility of EO-1 training on 8×A100 (prevent OOM/training-exceeds-capability).',
    checklist: [
      'Create a ZeRO-1 config and launch template',
      'Micro-training test on multi-GPU to verify stability',
    ],
    milestone: 'Multi-GPU run completes N steps, logs metrics, produces reloadable checkpoint',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Experiment Tracking (W&B / MLflow)',
    description: 'Implement comprehensive logging for training monitoring and debugging.',
    why: 'Standard logging for easier debugging (if training breaks/diverges/other errors).',
    checklist: [
      'Losses: total, AR (autoregressive), FM (flow matching)',
      'LR, grad norm, AMP scaler (if used)',
      'GPU utilization/memory + throughput',
      'Seed, git commit hash, full run config (stored as an artifact)',
      'Checkpoints',
    ],
    milestone: 'Cluster run in dashboard with metrics + artifacts, naming/tags are consistent',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Version Control & CI/CD Pipeline',
    description: 'Establish repository structure with automated testing and deployment workflows.',
    why: 'Prevents subtle regressions, keeps main runnable, enables safe iteration.',
    checklist: [
      'Repo structure: sim/ data/ models/ train/ eval/ configs/ scripts/ tests/ docs/',
      'Config-first execution: no hardcoded paths/hparams; all runs in versioned configs',
      'Git policy: main, feature branches, milestone tags (wrt roadmap checkpoints)',
      'CI (fast, CPU-only) on every PR/push: lint/format, unit tests, smoke test',
      'CD: build container so runs are reproducible across time',
    ],
    milestone: 'Every PR triggers fast checks; main stays green; one-cmd dry-run entrypoint',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Phase01Page() {
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
                Phase 0.1
              </span>
              <span className="px-3 py-1 bg-[#453027]/30 border border-[#453027] rounded-lg text-[#BABABA] text-sm">
                Week 1 &middot; Jan 16-25
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
              Development Environment Setup
            </h1>

            <p className="text-lg text-[#BABABA] max-w-3xl mb-8">
              Make all future work &quot;push-button&quot;: reproducible runs, stable multi-GPU training,
              and fast debugging capabilities.
            </p>

            {/* Goal highlight */}
            <div className="p-5 bg-gradient-to-r from-[#FF6D29]/10 to-transparent border-l-4 border-[#FF6D29] rounded-r-xl max-w-3xl">
              <h3 className="text-white font-semibold mb-2">Primary Goal</h3>
              <p className="text-[#BABABA]">
                Establish a rock-solid foundation for VLA model development with verified GPU training,
                experiment tracking, and CI/CD infrastructure before any actual model work begins.
              </p>
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
            Setup Tasks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#BABABA] text-center mb-12 max-w-2xl mx-auto"
          >
            Five critical components that form the infrastructure backbone for EO-1 model training
          </motion.p>

          <div className="space-y-6">
            {setupTasks.map((task, index) => (
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
              <h2 className="text-2xl font-semibold text-white">Phase Completion Criteria</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Infrastructure</h3>
                <p className="text-[#BABABA] text-sm">
                  All job templates working, containers built, environment reproducible across team members.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Training Pipeline</h3>
                <p className="text-[#BABABA] text-sm">
                  Multi-GPU training verified with DeepSpeed, checkpoints save and reload correctly.
                </p>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                <h3 className="text-white font-medium mb-2">Monitoring</h3>
                <p className="text-[#BABABA] text-sm">
                  Experiment tracking dashboard shows metrics, CI/CD pipeline catches regressions.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#453027]/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[#BABABA] text-sm">Estimated Duration</span>
                  <p className="text-white font-semibold">2 days</p>
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

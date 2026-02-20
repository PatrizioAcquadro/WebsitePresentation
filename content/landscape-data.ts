// ============ Types ============

export interface ManipulationApproach {
  id: string
  name: string
  definition: string
  strengths: string[]
  limitations: string[]
  whatsMissing: string
  iconType: 'rl' | 'imitation' | 'vla' | 'modular'
}

// ============ Data ============

export const landscapeIntro =
  'Four major paradigms have been applied to robotic manipulation.\nEach solves part of the bimanual assembly puzzle, but none solves it completely.'

export const manipulationApproaches: ManipulationApproach[] = [
  {
    id: 'rl',
    name: 'Single-Task Reinforcement Learning',
    definition:
      'Trial-and-error reward learning (PPO/SAC), usually in simulation, then sim-to-real via domain randomization.',
    strengths: [
      'Can discover bimanual strategies planners miss',
      'Could work on contact-rich dynamics',
      'Simulation provides near-unlimited data',
    ],
    limitations: [
      'Reward design for bimanual assembly is hard',
      'New tasks usually need full retraining',
      'Contact physics widens the sim-to-real gap',
    ],
    whatsMissing:
      'No language grounding, cross-task transfer, or built-in mid-execution diagnosis.',
    iconType: 'rl',
  },
  {
    id: 'imitation',
    name: 'Imitation Learning & Diffusion Policies',
    definition:
      'Learns from expert demos; diffusion methods (Diffusion Policy, ACT) model multimodal precise actions.',
    strengths: [
      'No manual reward engineering',
      'Captures multimodal contact-rich actions',
      'Strong short-horizon precision control',
    ],
    limitations: [
      'Limited by demo quality and coverage',
      'Weak recovery: demos rarely include corrections',
      'Limited long-horizon reasoning and no planner',
    ],
    whatsMissing:
      'No native mid-execution error reasoning or visual replanning without a separate planner.',
    iconType: 'imitation',
  },
  {
    id: 'vla',
    name: 'Vision-Language-Action Models',
    definition:
      'End-to-end foundation models: vision + language in, continuous robot actions out, one transformer.',
    strengths: [
      'Language-conditioned control from instructions',
      'Cross-embodiment transfer from large pretraining',
      'Interleaved reasoning can flag errors mid-execution',
    ],
    limitations: [
      'Most models target single-arm manipulation',
      'Usually validated at centimeter precision',
      'Bimanual coordination is still weakly validated',
    ],
    whatsMissing:
      'No unified proof of sub-millimeter, contact-rich, explicitly bimanual assembly.',
    iconType: 'vla',
  },
  {
    id: 'modular',
    name: 'Modular & Hierarchical Systems',
    definition:
      'Splits manipulation into a high-level planner (LLM/task graph) and low-level skill controllers via a structured interface.',
    strengths: [
      'Interpretable decomposition with reusable skill primitives',
      'High-level planners handle long-horizon reasoning well',
      'Each layer can be improved independently',
    ],
    limitations: [
      'Plan-execute gap on low-level contact events',
      'Errors propagate across modules and compound',
      'Integration complexity grows with skills and transitions',
    ],
    whatsMissing:
      'A tight sensorimotor loop where reasoning and action are interleaved, not sequenced.',
    iconType: 'modular',
  },
]

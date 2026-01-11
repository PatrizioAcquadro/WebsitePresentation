// ============ Types ============

export interface InputModality {
  id: string
  title: string
  description: string
  details: string[]
}

export interface AtomicSkill {
  category: string
  skills: string
  bimanualRequirement: 'Single' | 'Dual' | 'Single/Dual' | 'Often Dual'
}

export interface CoordinationMode {
  id: number
  name: string
  description: string
  example: string
}

export interface Challenge {
  name: string
  description: string
  severity: 'Critical' | 'High' | 'Medium'
  category: 'perception' | 'manipulation' | 'coordination' | 'reasoning'
}

export interface Metric {
  name: string
  definition: string
  target?: string
  evaluationMethod?: string
}

export interface MetricCategory {
  title: string
  description: string
  metrics: Metric[]
}

// ============ Data ============

export const coreSpecs = [
  { label: 'Block Count', value: '5-10 LEGO blocks per assembly' },
  { label: 'Kit Variety', value: 'Multiple distinct assembly configurations' },
  { label: 'Embodiment', value: 'Robotic torso + 2 arms (bimanual)' },
  { label: 'Target Hardware', value: 'Unitree H1 humanoid' },
  { label: 'Development', value: 'Simulation-first, then sim-to-real transfer' },
]

export const inputModalities: InputModality[] = [
  {
    id: 'text',
    title: 'Textual Task Instructions',
    description: 'Natural language descriptions of assembly goals',
    details: [
      'Natural language descriptions (e.g., "Build the 2x4 red brick tower")',
      'Step-by-step guidance when required',
      'Potentially ambiguous instructions requiring reasoning',
    ],
  },
  {
    id: 'vision',
    title: 'Visual Observations',
    description: 'Multi-view camera images of the workspace',
    details: [
      'Multi-view cameras (workspace, gripper-mounted, third-person)',
      'RGB images with potential depth information',
      'Real-time state of the assembly workspace',
    ],
  },
  {
    id: 'proprioception',
    title: 'Proprioceptive State',
    description: 'Joint positions, velocities, and end-effector poses',
    details: [
      'Joint positions and velocities for both arms',
      'End-effector poses (position + orientation)',
      'Gripper state (open/close, force feedback)',
      'Robot base/torso orientation',
    ],
  },
]

export const outputSpace = {
  actionChunks: 'Sequences of h=16 actions per prediction',
  continuousSpace: '7-DoF per arm × 2 arms + gripper states',
  controlFrequency: 'Target 10-50 Hz depending on task phase',
}

export const atomicSkills: AtomicSkill[] = [
  { category: 'Perception', skills: 'Block detection, pose estimation, assembly state recognition', bimanualRequirement: 'Single/Dual' },
  { category: 'Grasping', skills: 'Precision grasp of LEGO blocks (various sizes)', bimanualRequirement: 'Single' },
  { category: 'Manipulation', skills: 'Block insertion, alignment, pressing', bimanualRequirement: 'Often Dual' },
  { category: 'Coordination', skills: 'Handover, simultaneous stabilization, sequential operations', bimanualRequirement: 'Dual' },
  { category: 'Verification', skills: 'Connection verification, error detection', bimanualRequirement: 'Single/Dual' },
]

export const coordinationModes: CoordinationMode[] = [
  {
    id: 1,
    name: 'Asymmetric Bimanual',
    description: 'One arm stabilizes (anchor), other manipulates',
    example: 'Left arm holds partial assembly, right arm inserts new block',
  },
  {
    id: 2,
    name: 'Symmetric Bimanual',
    description: 'Both arms perform similar/mirrored actions',
    example: 'Simultaneously pressing two blocks to secure connection',
  },
  {
    id: 3,
    name: 'Sequential Handover',
    description: 'Block transfer between end-effectors',
    example: 'Right arm picks from bin, hands to left arm for placement',
  },
  {
    id: 4,
    name: 'Coordinated Motion',
    description: 'Both arms move together maintaining relative pose',
    example: 'Repositioning the partial assembly together',
  },
]

export const challenges: Challenge[] = [
  // Perception
  { name: 'Granular pose estimation', description: 'LEGO studs require sub-millimeter accuracy', severity: 'High', category: 'perception' },
  { name: 'Occlusion handling', description: 'Arms, hands, and blocks frequently occlude workspace', severity: 'High', category: 'perception' },
  { name: 'Disambiguation', description: 'Similar block shapes with different colors', severity: 'Medium', category: 'perception' },
  { name: 'Partial assembly state', description: 'Assembly progress from visual observation', severity: 'Medium', category: 'perception' },
  { name: 'Sim-to-real visual gap', description: 'Simulated textures/lighting vs. real-world appearance', severity: 'High', category: 'perception' },
  // Manipulation
  { name: 'Precision insertion', description: 'LEGO connections require ~0.1mm alignment tolerance', severity: 'Critical', category: 'manipulation' },
  { name: 'Force-sensitive assembly', description: "Too little force: blocks don't connect; too much: damage", severity: 'High', category: 'manipulation' },
  { name: 'Grasp stability', description: 'Small blocks can slip or rotate during transport', severity: 'Medium', category: 'manipulation' },
  { name: 'Contact-rich dynamics', description: 'Complex multi-body contact during insertion', severity: 'High', category: 'manipulation' },
  { name: 'Sim-to-real dynamics gap', description: 'Simulated contact/friction vs. real-world behavior', severity: 'Critical', category: 'manipulation' },
  // Coordination
  { name: 'Bimanual synchronization', description: 'Coordinating two arms without collision', severity: 'High', category: 'coordination' },
  { name: 'Role allocation', description: 'Deciding which arm performs which sub-task', severity: 'Medium', category: 'coordination' },
  { name: 'Workspace sharing', description: 'Both arms operate in overlapping workspace', severity: 'High', category: 'coordination' },
  { name: 'Collision avoidance', description: 'Self-collision and arm-arm collision', severity: 'High', category: 'coordination' },
  // Reasoning
  { name: 'Assembly order planning', description: 'Determining valid block placement sequences', severity: 'Medium', category: 'reasoning' },
  { name: 'Error detection', description: 'Recognizing misaligned or unconnected blocks', severity: 'High', category: 'reasoning' },
  { name: 'Recovery planning', description: 'Corrective actions after failed insertions', severity: 'High', category: 'reasoning' },
  { name: 'Instruction grounding', description: 'Mapping natural language to specific blocks/locations', severity: 'Medium', category: 'reasoning' },
  { name: 'Long-horizon reasoning', description: 'Maintaining goal across 10+ block sequence', severity: 'High', category: 'reasoning' },
]

export const metricCategories: MetricCategory[] = [
  {
    title: 'Primary Metrics',
    description: 'Core success measures for task completion',
    metrics: [
      { name: 'Task Success Rate', definition: '% of assemblies completed correctly', target: '>85%' },
      { name: 'Block Placement Accuracy', definition: '% of blocks placed in correct position/orientation', target: '>95%' },
      { name: 'Connection Quality', definition: '% of blocks properly seated (not loose)', target: '>98%' },
    ],
  },
  {
    title: 'Efficiency Metrics',
    description: 'Performance and recovery measures',
    metrics: [
      { name: 'Completion Time', definition: 'Time from start to verified completion', target: 'TBD' },
      { name: 'Attempt Efficiency', definition: 'Successful placements / total attempts', target: '>90%' },
      { name: 'Recovery Rate', definition: '% of errors successfully corrected', target: '>70%' },
    ],
  },
  {
    title: 'Generalization Metrics',
    description: 'Measures of robustness and transferability',
    metrics: [
      { name: 'Kit Generalization', definition: 'Performance on unseen assembly configurations', evaluationMethod: 'Hold-out kit designs' },
      { name: 'Block Generalization', definition: 'Performance with novel block colors/sizes', evaluationMethod: 'Test with OOD blocks' },
      { name: 'Instruction Generalization', definition: 'Performance with rephrased/novel instructions', evaluationMethod: 'Paraphrase test set' },
      { name: 'Visual Generalization', definition: 'Performance under lighting/background changes', evaluationMethod: 'Domain shift evaluation' },
    ],
  },
]

// Helper to get challenges by category
export const getChallengesByCategory = (category: Challenge['category']) =>
  challenges.filter(c => c.category === category)

// Category metadata for display
export const challengeCategories = [
  { id: 'perception', title: 'Perception Challenges', description: 'Visual and spatial understanding' },
  { id: 'manipulation', title: 'Manipulation Challenges', description: 'Physical interaction and control' },
  { id: 'coordination', title: 'Coordination Challenges', description: 'Bimanual synchronization' },
  { id: 'reasoning', title: 'Reasoning Challenges', description: 'Planning and error recovery' },
] as const

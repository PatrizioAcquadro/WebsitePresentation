// ============ Types ============

export interface ChallengeDimension {
  id: string
  title: string
  description: string
}

// ============ Narrative ============

export const problemHeadline = 'Bimanual Manipulation'

export const problemSubtitle =
  'Why coordinated two-handed assembly is the frontier challenge for general-purpose robotics'

export const problemNarrative = [
  'Bimanual manipulation means coordinating two robotic arms to complete one shared task, for example one arm stabilizes while the other aligns, inserts, or presses. It is essential for general-purpose robotics because humans rely on two hands for many daily activities, including assembly, cooking, folding clothes, and tool use.',
]

// ============ Challenge Dimensions ============

export const challengeDimensions: ChallengeDimension[] = [
  {
    id: 'coordination',
    title: 'Coordination & High-DoF Control',
    description:
      '16+ DoF action space across two arms. Roles — anchor, insert, handover — must switch dynamically without self-collision.',
  },
  {
    id: 'contact-dynamics',
    title: 'Contact Dynamics & Uncertainty',
    description:
      'Discontinuous snap forces and nonlinear contact profiles vary with geometry and grasp. Sim-to-real transfer amplifies every gap.',
  },
  {
    id: 'perception-occlusion',
    title: 'Perception Under Occlusion',
    description:
      'Arms and structure block nearly every camera angle. Block poses and connection states must be inferred from partial observations.',
  },
  {
    id: 'long-horizon',
    title: 'Long-Horizon Sequencing',
    description:
      'Dozens of atomic actions in structurally valid order. The policy must plan across minutes while constraints shift with each insertion.',
  },
  {
    id: 'error-recovery',
    title: 'Error Recovery',
    description:
      'Misalignments and drops are inevitable at 0.1 mm tolerances. Detect, diagnose, and correct — without disrupting the partial assembly.',
  },
  {
    id: 'real-time',
    title: 'Real-Time Constraints',
    description:
      '10–50 Hz control to handle force transients, while processing multi-view images, proprioception, and language in real time.',
  },
]

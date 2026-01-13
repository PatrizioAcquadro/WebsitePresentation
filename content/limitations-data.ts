// Type definitions
export type Severity = 'High' | 'Medium' | 'Low' | 'N/A'

export interface AcknowledgedLimitation {
  id: string
  title: string
  severity: Severity
  impact: string
}

export interface ArchitecturalLimitation {
  id: string
  title: string
  problem: string
  impact: string[]
  solutions: string[]
}

export interface TaskProblem {
  id: string
  title: string
  description: string
  sotaGaps: string[]
  researchOpportunity: string
}

export interface TaskProblemCategory {
  id: string
  title: string
  subtitle: string
  problems: TaskProblem[]
}

// Acknowledged Limitations Data
export const acknowledgedLimitations: AcknowledgedLimitation[] = [
  {
    id: 'ood-generalization',
    title: 'Out-of-Action-Domain generalization with limited data',
    severity: 'High',
    impact: 'New LEGO configurations may fail without extensive simulation data',
  },
  {
    id: 'complex-scenarios',
    title: 'Complex scenarios not fully addressed',
    severity: 'Medium',
    impact: 'Failure recovery, obstacle avoidance mid-assembly',
  },
  {
    id: 'hri-unexplored',
    title: 'Human-robot interaction unexplored',
    severity: 'Low',
    impact: 'Collaborative assembly scenarios not possible',
  },
]

// Architectural Limitations Data
export const architecturalLimitations: ArchitecturalLimitation[] = [
  {
    id: 'latency',
    title: 'Single-System Latency',
    problem:
      "EO-1's unified architecture runs at ~100ms per action chunk, which may be insufficient for force-sensitive insertion, reactive catching when blocks slip, and high-frequency contact adjustments.",
    impact: [
      'Block insertion requires feeling when studs engage (~10-50ms reaction time ideal)',
      'Current architecture may "commit" to insertion trajectory before receiving contact feedback',
    ],
    solutions: [
      'Dual-system extension (fast reactive + slow deliberative)',
      'Increase action chunk frequency with reduced denoising steps',
      'Add low-level force controller',
    ],
  },
  {
    id: 'chunk-size',
    title: 'Fixed Action Chunk Size',
    problem:
      '16-step chunks are fixed regardless of task phase, creating a mismatch between coarse transport and precision insertion requirements.',
    impact: [
      'Coarse transport phases could use longer chunks (efficiency)',
      'Precision insertion phases need finer control',
      'Mismatch may cause suboptimal behavior in either phase',
    ],
    solutions: [
      'Variable chunk size based on task phase detection',
      'Hierarchical action generation (coarse -> fine)',
      'Phase training with different chunk sizes',
    ],
  },
  {
    id: 'interleaved-data',
    title: 'Interleaved Data Dependency',
    problem:
      "EO-1's strong performance relies on interleaved vision-text-action data, which must be carefully constructed for each new task domain.",
    impact: [
      'No existing LEGO-specific interleaved data',
      'Manual construction is expensive and requires domain expertise',
      'Simulation-generated data may have distribution mismatch',
    ],
    solutions: [
      'Automated interleaved data generation from simulation trajectories',
      'Use LLM to generate task descriptions from trajectory data',
      'Active learning for efficient data collection',
    ],
  },
]

// Task-Specific Problems Data
export const taskProblemCategories: TaskProblemCategory[] = [
  {
    id: 'precision',
    title: 'Precision Manipulation Problems',
    subtitle:
      'Sub-millimeter accuracy and contact-rich dynamics challenge current VLA architectures',
    problems: [
      {
        id: 'sub-mm-alignment',
        title: 'Sub-Millimeter Alignment',
        description:
          'LEGO studs are 4.8mm apart with ~0.1mm tolerance for proper connection.',
        sotaGaps: [
          'Most VLA evaluations use larger objects (vegetables, kitchen items)',
          'Reported positioning accuracy typically in 1-5mm range',
          'No standardized benchmark for sub-millimeter tasks',
        ],
        researchOpportunity:
          'Develop precision manipulation benchmarks and architectures that achieve 0.1mm accuracy.',
      },
      {
        id: 'contact-dynamics',
        title: 'Contact-Rich Dynamics',
        description:
          'LEGO insertion involves complex contact physics: initial contact detection, stud-tube interference fit, multi-point snap connection, tactile feedback interpretation.',
        sotaGaps: [
          'Most VLA training uses visual observation only',
          'Force/tactile sensing rarely integrated',
          'Simulation contact physics may not match reality',
        ],
        researchOpportunity:
          'Integrate tactile sensing into VLA framework, develop contact-aware action generation.',
      },
    ],
  },
  {
    id: 'bimanual',
    title: 'Bimanual Coordination Problems',
    subtitle: 'Dynamic role switching and collision avoidance in shared workspace',
    problems: [
      {
        id: 'role-allocation',
        title: 'Dynamic Role Allocation',
        description:
          'Optimal arm roles change during assembly: sometimes symmetric (both pressing), sometimes asymmetric (one holds, one inserts), handover between arms.',
        sotaGaps: [
          'Most bimanual VLAs (including EO-1 demos) show fixed role patterns',
          'Dynamic role switching mid-task not well studied',
          'No principled way to learn role allocation',
        ],
        researchOpportunity:
          'Develop role allocation mechanisms, possibly through language-conditioned coordination.',
      },
      {
        id: 'collision-free',
        title: 'Collision-Free Coordinated Motion',
        description:
          'Two arms in shared workspace must avoid self-collision, arm-arm collision, and collision with assembly.',
        sotaGaps: [
          "VLAs don't explicitly model collision constraints",
          'Learned policies may occasionally collide',
          'Safety-critical for real robots',
        ],
        researchOpportunity:
          'Integrate differentiable collision checking into action generation or post-processing.',
      },
    ],
  },
  {
    id: 'long-horizon',
    title: 'Long-Horizon Reasoning Problems',
    subtitle: 'Assembly planning and error recovery over extended task horizons',
    problems: [
      {
        id: 'assembly-planning',
        title: 'Assembly Order Planning',
        description:
          '10-block assembly has many valid orderings, but some are mechanically infeasible (obstruction), suboptimal (extra movements), or stability-dependent (toppling risk).',
        sotaGaps: [
          'VLAs typically follow demonstrated orderings',
          'Limited evidence of generalization to novel orderings',
          'No explicit planning module in most architectures',
        ],
        researchOpportunity:
          'Integrate symbolic/geometric reasoning for assembly planning with VLA execution.',
      },
      {
        id: 'error-recovery',
        title: 'Error Detection and Recovery',
        description:
          'Failed block placements require detecting failure (visual or force-based), diagnosing cause (misalignment, insufficient force, wrong block), and planning recovery (remove and retry, adjust position).',
        sotaGaps: [
          'EO-1 shows some failure detection in benchmarks',
          'Autonomous recovery without human intervention is rare',
          'Multi-step recovery sequences are unexplored',
        ],
        researchOpportunity:
          'Train explicit error detection heads, develop recovery sub-policies.',
      },
    ],
  },
]

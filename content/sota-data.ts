// ============ Types ============

export interface KeyFeature {
  id: string
  title: string
  description: string
  iconType: 'architecture' | 'training' | 'action' | 'chunk' | 'bimanual' | 'compute'
}

export interface BenchmarkRow {
  model: string
  isHighlighted?: boolean
  values: {
    [key: string]: string | number
  }
}

export interface BenchmarkTable {
  title: string
  subtitle?: string
  columns: string[]
  rows: BenchmarkRow[]
  legoNote?: string
}

export interface BarChartGroup {
  label: string
  taskCount?: string
  values: {
    model: string
    value: number | null // null for N/A
  }[]
}

export interface GroupedBarChart {
  title: string
  subtitle?: string
  yAxisLabel: string
  groups: BarChartGroup[]
  models: string[]
  legoNote?: string
}

export interface AnalysisSection {
  id: string
  title: string
  iconType: 'model' | 'training' | 'data'
  content: {
    heading: string
    text: string
  }[]
  legoImplications: string[]
}

export interface DataCompositionRow {
  category: string
  source: string
  samples: string
  tokens: string
}

export interface PipelineStep {
  number: number
  title: string
  description: string
}

// ============ Hero Data ============

export const heroData = {
  title: 'SOTA Model Selection',
  subtitle: 'Analysis of the state-of-the-art Vision-Language-Action model for bimanual LEGO assembly',
  badges: [
    { label: 'EO-1', value: 'Selected Model' },
    { label: 'LIBERO', value: '98.2%' },
    { label: 'Backbone', value: 'Qwen 2.5 VL' },
  ],
}

// ============ Section 1: Why EO-1 ============

export const whyEO1Narrative = `EO-1 emerges as the optimal baseline for bimanual LEGO assembly due to its unique combination of unified architecture, interleaved reasoning-action training, and demonstrated bimanual capability. Unlike models that separate planning from execution, EO-1's design mirrors the human ability to seamlessly alternate between reasoning and physical interaction—critical for the error detection and recovery loops inherent in precision assembly tasks.`

export const keyFeatures: KeyFeature[] = [
  {
    id: 'unified',
    title: 'Unified Architecture',
    description: 'Single decoder-only transformer integrating discrete autoregression with continuous flow matching for seamless multimodal processing.',
    iconType: 'architecture',
  },
  {
    id: 'interleaved',
    title: 'Interleaved Training',
    description: 'Vision-text-action sequences maintaining temporal causality, enabling reasoning interleaved with physical actions.',
    iconType: 'training',
  },
  {
    id: 'hybrid',
    title: 'Hybrid Action Decoding',
    description: 'Flow matching for precision continuous control combined with autoregression for discrete reasoning tokens.',
    iconType: 'action',
  },
  {
    id: 'chunks',
    title: '16-Step Action Chunks',
    description: 'Smooth trajectories generated with 10 denoising iterations, enabling temporally coherent motion.',
    iconType: 'chunk',
  },
  {
    id: 'bimanual',
    title: 'Bimanual Demonstrated',
    description: 'AgiBot G-1 dual-arm tasks: clothes folding 87%, sandwich assembly 85%, grocery packing 95%.',
    iconType: 'bimanual',
  },
  {
    id: 'practical',
    title: 'Practical Reproducibility',
    description: '3B parameters, trainable on 8×A100 GPUs, inference with only 6GB VRAM on RTX 4090.',
    iconType: 'compute',
  },
]

// ============ Performance Evidence Data ============

// Full LIBERO Table 3 with ± intervals
export const liberoBenchmark: BenchmarkTable = {
  title: 'LIBERO Benchmark Results',
  subtitle: 'Success rates across four LIBERO task suites with confidence intervals',
  columns: ['Model', 'Spatial', 'Object', 'Goal', 'Long', 'Overall'],
  rows: [
    {
      model: 'Octo',
      values: {
        Spatial: '78.9 ± 1.0%',
        Object: '85.7 ± 0.9%',
        Goal: '84.6 ± 0.9%',
        Long: '51.1 ± 1.3%',
        Overall: '75.1 ± 0.6%'
      },
    },
    {
      model: 'π0',
      values: {
        Spatial: '96.8 ± 0.8%',
        Object: '98.8 ± 0.9%',
        Goal: '95.8 ± 1.1%',
        Long: '85.2 ± 1.2%',
        Overall: '94.2 ± 0.9%'
      },
    },
    {
      model: 'GR00T N1',
      values: {
        Spatial: '94.4 ± 0.9%',
        Object: '97.6 ± 1.0%',
        Goal: '93.0 ± 1.2%',
        Long: '90.6 ± 1.0%',
        Overall: '93.9 ± 1.1%'
      },
    },
    {
      model: 'OpenVLA-OFT',
      values: {
        Spatial: '97.6 ± 0.9%',
        Object: '98.4 ± 0.8%',
        Goal: '97.9 ± 1.0%',
        Long: '94.5 ± 1.3%',
        Overall: '97.1 ± 0.6%'
      },
    },
    {
      model: 'EO-1',
      isHighlighted: true,
      values: {
        Spatial: '99.7 ± 0.2%',
        Object: '99.8 ± 0.1%',
        Goal: '99.2 ± 0.3%',
        Long: '94.8 ± 0.6%',
        Overall: '98.2 ± 0.3%'
      },
    },
  ],
  legoNote: 'LIBERO-Long tests multi-step sequential tasks similar to LEGO assembly sequences. EO-1\'s top performance indicates strong capability for maintaining goal coherence across extended manipulation chains.',
}

// Performance on Diverse Embodiments - Grouped Bar Chart
export const embodimentsChart: GroupedBarChart = {
  title: 'Performance on Diverse Embodiments',
  subtitle: 'Completion scores across different robot platforms and task families',
  yAxisLabel: 'Completion Score',
  models: ['π0-Fast', 'π0', 'GR00T-N1.5', 'EO-1'],
  groups: [
    {
      label: 'Franka Pick-and-Place',
      taskCount: '7 tasks',
      values: [
        { model: 'π0-Fast', value: 0.61 },
        { model: 'π0', value: 0.83 },
        { model: 'GR00T-N1.5', value: 0.86 },
        { model: 'EO-1', value: 0.94 },
      ],
    },
    {
      label: 'WidowX Out-of-Box',
      taskCount: '13 tasks',
      values: [
        { model: 'π0-Fast', value: 0.23 },
        { model: 'π0', value: 0.69 },
        { model: 'GR00T-N1.5', value: 0.70 },
        { model: 'EO-1', value: 0.85 },
      ],
    },
    {
      label: 'AgiBot Long-horizon',
      taskCount: '4 tasks',
      values: [
        { model: 'π0-Fast', value: 0.45 },
        { model: 'π0', value: 0.67 },
        { model: 'GR00T-N1.5', value: 0.68 },
        { model: 'EO-1', value: 0.81 },
      ],
    },
    {
      label: 'Reasoning Control',
      taskCount: '4 tasks',
      values: [
        { model: 'π0-Fast', value: null }, // N/A
        { model: 'π0', value: 0.53 },
        { model: 'GR00T-N1.5', value: 0.62 },
        { model: 'EO-1', value: 0.83 },
      ],
    },
    {
      label: 'Overall',
      taskCount: '28 tasks',
      values: [
        { model: 'π0-Fast', value: 0.43 },
        { model: 'π0', value: 0.68 },
        { model: 'GR00T-N1.5', value: 0.71 },
        { model: 'EO-1', value: 0.86 },
      ],
    },
  ],
  legoNote: 'Cross-embodiment generalization is critical for sim-to-real transfer. EO-1\'s consistent lead across diverse platforms suggests robust policy learning that should transfer well to the Unitree H1.',
}

// Generalization Performance Breakdown Table
export const generalizationTable: BenchmarkTable = {
  title: 'Generalization Performance Breakdown',
  subtitle: 'Completion scores (0–1) measuring robustness to distribution shifts',
  columns: ['Metric', 'π0-Fast', 'π0', 'GR00T-N1.5', 'EO-1'],
  rows: [
    {
      model: 'Visual Generalization',
      values: { 'π0-Fast': '0.20', 'π0': '0.54', 'GR00T-N1.5': '0.63', 'EO-1': '0.72' },
    },
    {
      model: 'Language Generalization',
      values: { 'π0-Fast': '0.21', 'π0': '0.52', 'GR00T-N1.5': '0.67', 'EO-1': '0.79' },
    },
    {
      model: 'Action Generalization',
      values: { 'π0-Fast': '0.15', 'π0': '0.46', 'GR00T-N1.5': '0.51', 'EO-1': '0.67' },
    },
    {
      model: 'Overall (18 tasks)',
      isHighlighted: true,
      values: { 'π0-Fast': '0.19', 'π0': '0.51', 'GR00T-N1.5': '0.60', 'EO-1': '0.73' },
    },
  ],
  legoNote: 'Language generalization (0.79) is particularly relevant for following varied assembly instructions. Visual generalization (0.72) supports handling lighting and viewpoint changes in real deployment.',
}

// Long-horizon Dexterity Performance - Grouped Bar Chart
export const dexterityChart: GroupedBarChart = {
  title: 'Long-horizon Dexterity Performance',
  subtitle: 'Task-level completion scores for complex multi-step manipulation',
  yAxisLabel: 'Completion Score',
  models: ['π0-Fast', 'π0', 'GR00T-N1.5', 'EO-1'],
  groups: [
    {
      label: 'Fold Household Clothes',
      values: [
        { model: 'π0-Fast', value: 0.60 },
        { model: 'π0', value: 0.87 },
        { model: 'GR00T-N1.5', value: 0.73 },
        { model: 'EO-1', value: 0.87 },
      ],
    },
    {
      label: 'Make Breakfast Sandwich',
      values: [
        { model: 'π0-Fast', value: 0.33 },
        { model: 'π0', value: 0.73 },
        { model: 'GR00T-N1.5', value: 0.72 },
        { model: 'EO-1', value: 0.85 },
      ],
    },
    {
      label: 'Roast Beef Steak',
      values: [
        { model: 'π0-Fast', value: 0.33 },
        { model: 'π0', value: 0.46 },
        { model: 'GR00T-N1.5', value: 0.47 },
        { model: 'EO-1', value: 0.56 },
      ],
    },
    {
      label: 'Sort Grocery Items',
      values: [
        { model: 'π0-Fast', value: 0.53 },
        { model: 'π0', value: 0.62 },
        { model: 'GR00T-N1.5', value: 0.80 },
        { model: 'EO-1', value: 0.95 },
      ],
    },
  ],
  legoNote: 'These bimanual tasks mirror LEGO assembly complexity. EO-1\'s 95% on sorting and 85% on sandwich assembly demonstrate the coordination and sequencing capabilities needed for multi-block structures.',
}

// ============ Section 2: Detailed Analysis ============

export const analysisSections: AnalysisSection[] = [
  {
    id: 'architecture',
    title: 'Model Architecture',
    iconType: 'model',
    content: [
      {
        heading: 'Backbone',
        text: 'Qwen 2.5 VL (3B parameters) provides the foundation, inheriting broad visual-language knowledge from large-scale pretraining.',
      },
      {
        heading: 'Unified Decoder',
        text: 'A single transformer processes interleaved multimodal inputs including text, images, video frames, and action tokens.',
      },
      {
        heading: 'Dual Heads',
        text: 'Language head performs next-token prediction for text. Flow head uses rectified flow for continuous action denoising.',
      },
      {
        heading: 'Token Types',
        text: 'Text tokens (discrete), image patches (continuous), robot state (continuous), and noisy action embeddings (continuous).',
      },
      {
        heading: 'Action Generation',
        text: 'Forward Euler integration from τ=0 to τ=1 with 10 denoising steps generates smooth, precise action trajectories.',
      },
    ],
    legoImplications: [
      'Unified architecture avoids plan-execute misalignment critical for error recovery',
      'Flow matching enables sub-millimeter precision for LEGO stud engagement',
      'Shared parameters enable cross-modal knowledge transfer for instruction grounding',
    ],
  },
  {
    id: 'training',
    title: 'Training Pipeline',
    iconType: 'training',
    content: [
      {
        heading: 'Training Objective',
        text: 'Combined loss L = L_ar(θ) + L_fm(θ), where L_ar is cross-entropy for text tokens and L_fm is MSE for denoising vector field prediction.',
      },
      {
        heading: 'Initialization',
        text: 'Start from Qwen 2.5 VL pretrained weights. Add randomly initialized state projector and noisy action projector.',
      },
      {
        heading: 'Co-Training',
        text: 'Train jointly on web multimodal data, robot control demonstrations, and interleaved embodied reasoning data.',
      },
      {
        heading: 'Training Setup',
        text: '5 epochs with Flash-Attention variable-length packing (average 16,384 tokens per sequence). DeepSpeed ZeRO-1 optimizer.',
      },
      {
        heading: 'Learning Rates',
        text: '5×10⁻⁵ for language model and projectors, 1×10⁻⁵ for vision encoder (lower rate preserves visual features).',
      },
      {
        heading: 'Key Innovation',
        text: 'Interleaved Rectifying Sampling handles causal relationships in mixed-modality sequences during generation.',
      },
    ],
    legoImplications: [
      'Interleaved training captures "check connection → adjust force" reasoning loops',
      'Flow matching timestep sampling emphasizes noisier steps for precision',
      'Training recipe scales to 8×A100 within project compute constraints',
    ],
  },
  {
    id: 'data',
    title: 'Data Pipeline',
    iconType: 'data',
    content: [
      {
        heading: 'Web Multimodal',
        text: 'LLaVA, PixMo, RoboVQA, RefCOCO: 5.7M samples, 7.1B tokens. Provides broad visual-language grounding.',
      },
      {
        heading: 'Robot Control',
        text: 'AgiBotWorld, OXE, RoboMIND, SO100: 1.2M episodes, 127.3B tokens. Diverse manipulation demonstrations.',
      },
      {
        heading: 'Interleaved Embodied',
        text: 'EO-Data1.5M (custom pipeline): 1.5M samples, 1.0B tokens. Vision-text-action interleaved sequences.',
      },
    ],
    legoImplications: [
      'Pipeline is replicable for generating LEGO-specific interleaved data in simulation',
      'Embodied reasoning QA pairs map to "is block connected?" verification',
      'Spatial grounding data supports sub-millimeter positioning requirements',
    ],
  },
]

export const dataComposition: DataCompositionRow[] = [
  { category: 'Web Multimodal', source: 'LLaVA, PixMo, RoboVQA, RefCOCO', samples: '5.7M', tokens: '7.1B' },
  { category: 'Robot Control', source: 'AgiBotWorld, OXE, RoboMIND, SO100', samples: '1.2M episodes', tokens: '127.3B' },
  { category: 'Interleaved Embodied', source: 'EO-Data1.5M', samples: '1.5M', tokens: '1.0B' },
]

export const pipelineSteps: PipelineStep[] = [
  {
    number: 1,
    title: 'Video Filter & Curation',
    description: 'Feature clustering followed by diversity sampling to ensure coverage.',
  },
  {
    number: 2,
    title: 'Video Splitting & Captioning',
    description: 'VLM + human annotators segment videos into coherent subtasks.',
  },
  {
    number: 3,
    title: 'QA Pair Generation',
    description: 'Temporal reasoning (planning, verification) and spatial reasoning (trajectory, pointing).',
  },
  {
    number: 4,
    title: 'Interleaved Formatting',
    description: 'Three formats: temporal sequences, spatial grounding, and free-form chatting.',
  },
  {
    number: 5,
    title: 'Cleaning & Rewriting',
    description: 'Rule-based filtering plus LLM rewriting for diversity and quality.',
  },
]

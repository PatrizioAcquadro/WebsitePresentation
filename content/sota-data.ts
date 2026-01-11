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
  columns: string[]
  rows: BenchmarkRow[]
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
  subtitle: 'Analysis and selection of the state-of-the-art Vision-Language-Action model for bimanual LEGO assembly',
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

export const liberoBenchmark: BenchmarkTable = {
  title: 'LIBERO Benchmark Results',
  columns: ['Model', 'Spatial', 'Object', 'Goal', 'Long', 'Overall'],
  rows: [
    {
      model: 'OpenVLA',
      values: { Spatial: '84.7%', Object: '88.4%', Goal: '79.2%', Long: '53.7%', Overall: '76.5%' },
    },
    {
      model: 'π0',
      values: { Spatial: '96.8%', Object: '98.8%', Goal: '95.8%', Long: '85.2%', Overall: '94.2%' },
    },
    {
      model: 'OpenVLA-OFT',
      values: { Spatial: '97.6%', Object: '98.4%', Goal: '97.9%', Long: '94.5%', Overall: '97.1%' },
    },
    {
      model: 'EO-1',
      isHighlighted: true,
      values: { Spatial: '99.7%', Object: '99.8%', Goal: '99.2%', Long: '94.8%', Overall: '98.2%' },
    },
  ],
}

export const realWorldBenchmark: BenchmarkTable = {
  title: 'Real-World Generalization',
  columns: ['Model', 'Visual', 'Language', 'Action', 'Overall'],
  rows: [
    {
      model: 'π0',
      values: { Visual: '54%', Language: '52%', Action: '46%', Overall: '51%' },
    },
    {
      model: 'GR00T-N1.5',
      values: { Visual: '63%', Language: '67%', Action: '51%', Overall: '60%' },
    },
    {
      model: 'EO-1',
      isHighlighted: true,
      values: { Visual: '72%', Language: '79%', Action: '67%', Overall: '73%' },
    },
  ],
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

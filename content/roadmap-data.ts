// ============ Types ============

export interface Task {
  title: string
  deliverable: string
}

export interface Subphase {
  id: string
  title: string
  classification: 'HUMAN-CRITICAL' | 'AGENT-ASSISTED' | 'AGENT-DELEGABLE'
  estimatedDays: number
  tasks: Task[]
}

export interface Milestone {
  week: number
  title: string
  keyDeliverable: string
  goNoGoCriteria: string
}

export interface ResourceAllocation {
  gpuHours: string
  purpose: string
}

export interface Phase {
  id: number
  title: string
  duration: string
  startDate: string
  endDate: string
  goal: string
  resources: ResourceAllocation
  subphases: Subphase[]
  milestone?: Milestone
}

export interface SuccessCriteria {
  level: 'minimum' | 'target' | 'stretch'
  title: string
  items: string[]
}

export interface RoadmapData {
  projectMeta: {
    startDate: string
    endDate: string
    duration: string
  }
  phases: Phase[]
  successCriteria: SuccessCriteria[]
}

// ============ Data ============

export const roadmapData: RoadmapData = {
  projectMeta: {
    startDate: 'Jan 16, 2026',
    endDate: 'Apr 4, 2026',
    duration: '13 weeks',
  },

  phases: [
    // Phase 0: Foundation & Setup
    {
      id: 0,
      title: 'Foundation & Setup',
      duration: 'Week 1',
      startDate: 'Jan 16',
      endDate: 'Jan 22',
      goal: 'Environment setup, literature deep-dive, detailed technical planning',
      resources: {
        gpuHours: '~500',
        purpose: 'Development, testing',
      },
      subphases: [
        {
          id: '0.1',
          title: 'Development Environment Setup',
          classification: 'AGENT-DELEGABLE',
          estimatedDays: 2,
          tasks: [
            { title: 'Set up GPU cluster access and job scheduler', deliverable: 'Working SLURM/PBS scripts' },
            { title: 'Install CUDA, cuDNN, PyTorch 2.x', deliverable: 'Verified GPU training capability' },
            { title: 'Configure DeepSpeed ZeRO-1', deliverable: 'Multi-GPU training test' },
            { title: 'Set up experiment tracking (W&B/MLflow)', deliverable: 'Experiment logging working' },
            { title: 'Configure version control and project structure', deliverable: 'Git repo with CI/CD' },
          ],
        },
        {
          id: '0.2',
          title: 'Literature Deep Dive',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 5,
          tasks: [
            { title: 'Study EO-1 paper in detail (architecture, training, data)', deliverable: 'Annotated notes, implementation questions' },
            { title: 'Study pi0/pi0.5 as reference', deliverable: 'Comparative analysis notes' },
            { title: 'Understand flow matching theory', deliverable: 'Mathematical understanding document' },
            { title: 'Review Qwen 2.5 VL architecture', deliverable: 'VLM backbone familiarity' },
            { title: 'Study interleaved training methodology', deliverable: 'Training recipe understanding' },
          ],
        },
      ],
      milestone: {
        week: 2,
        title: 'Environment Ready',
        keyDeliverable: 'Simulation running, LEGO physics working',
        goNoGoCriteria: 'Scripted policy >50% success',
      },
    },

    // Phase 1: Simulation Environment
    {
      id: 1,
      title: 'Simulation Environment',
      duration: 'Week 2-4',
      startDate: 'Jan 17',
      endDate: 'Feb 7',
      goal: 'Complete LEGO assembly simulation environment with bimanual robot',
      resources: {
        gpuHours: '~500',
        purpose: 'Development, testing',
      },
      subphases: [
        {
          id: '1.1',
          title: 'Robot Model Integration',
          classification: 'AGENT-ASSISTED',
          estimatedDays: 4,
          tasks: [
            { title: 'Import/create bimanual robot URDF/MJCF', deliverable: 'Working robot model in sim' },
            { title: 'Configure joint limits, dynamics parameters', deliverable: 'Physically accurate robot' },
            { title: 'Set up gripper models (parallel jaw or similar)', deliverable: 'Functional grippers' },
            { title: 'Verify kinematics match target (H1-compatible)', deliverable: 'Kinematics validation report' },
          ],
        },
        {
          id: '1.2',
          title: 'LEGO Environment Creation',
          classification: 'AGENT-ASSISTED',
          estimatedDays: 5,
          tasks: [
            { title: 'Create LEGO block models (2x2, 2x4, 2x6 bricks)', deliverable: 'Accurate LEGO meshes with studs' },
            { title: 'Configure stud/tube contact physics', deliverable: 'Blocks that connect realistically' },
            { title: 'Create baseplate and workspace', deliverable: 'Complete assembly environment' },
            { title: 'Add multiple camera viewpoints', deliverable: 'Multi-view rendering' },
            { title: 'Implement block spawning and reset', deliverable: 'Episode management' },
          ],
        },
      ],
    },

    // Phase 2: Data Pipeline
    {
      id: 2,
      title: 'Data Pipeline',
      duration: 'Week 3-5',
      startDate: 'Jan 24',
      endDate: 'Feb 14',
      goal: 'Generate training data including interleaved vision-text-action sequences',
      resources: {
        gpuHours: '~500',
        purpose: 'Development, testing',
      },
      subphases: [
        {
          id: '2.1',
          title: 'Robot Trajectory Data Generation',
          classification: 'AGENT-DELEGABLE',
          estimatedDays: 5,
          tasks: [
            { title: 'Generate 10K scripted demonstration episodes', deliverable: 'Base trajectory dataset' },
            { title: 'Implement parallel data collection', deliverable: 'Efficient data generation' },
            { title: 'Add failure cases and recovery demonstrations', deliverable: 'Failure trajectory dataset' },
            { title: 'Quality control and filtering', deliverable: 'Cleaned dataset' },
          ],
        },
        {
          id: '2.2',
          title: 'VLM-Based Annotation Pipeline',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 4,
          tasks: [
            { title: 'Design annotation schema (following EO-Data1.5M)', deliverable: 'Annotation specification' },
            { title: 'Set up VLM for trajectory annotation (GPT-4V/Qwen-VL)', deliverable: 'Annotation system' },
            { title: 'Generate task descriptions and reasoning QA', deliverable: 'Language annotations' },
            { title: 'Validate annotation quality', deliverable: 'Quality metrics' },
          ],
        },
        {
          id: '2.3',
          title: 'Interleaved Data Construction',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 5,
          tasks: [
            { title: 'Implement interleaved sequence construction (following EO-1)', deliverable: 'Interleaved data generator' },
            { title: 'Create temporal reasoning data (task planning, verification)', deliverable: 'Temporal reasoning subset' },
            { title: 'Create spatial reasoning data (trajectory prediction, grounding)', deliverable: 'Spatial reasoning subset' },
            { title: 'Create free chatting format data', deliverable: 'Mixed format subset' },
          ],
        },
      ],
      milestone: {
        week: 4,
        title: 'Data Ready',
        keyDeliverable: '10K trajectories + interleaved data',
        goNoGoCriteria: 'Data loads correctly, formats verified',
      },
    },

    // Phase 3: Model Architecture
    {
      id: 3,
      title: 'Model Architecture',
      duration: 'Week 4-6',
      startDate: 'Jan 31',
      endDate: 'Feb 21',
      goal: 'Implement EO-1 architecture with modifications for LEGO task',
      resources: {
        gpuHours: '~500',
        purpose: 'Development, testing',
      },
      subphases: [
        {
          id: '3.1',
          title: 'VLM Backbone Integration',
          classification: 'AGENT-ASSISTED',
          estimatedDays: 4,
          tasks: [
            { title: 'Load Qwen 2.5 VL pretrained weights', deliverable: 'Working VLM backbone' },
            { title: 'Configure tokenizer and visual encoder', deliverable: 'Tokenization pipeline' },
            { title: 'Verify VLM inference works', deliverable: 'VLM sanity check' },
            { title: 'Profile memory usage on A100', deliverable: 'Memory characterization' },
          ],
        },
        {
          id: '3.2',
          title: 'Action Head Implementation',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 5,
          tasks: [
            { title: 'Implement flow matching action head', deliverable: 'Flow matching module' },
            { title: 'Implement robot state projector', deliverable: 'State embedding module' },
            { title: 'Implement noisy action projector', deliverable: 'Action embedding module' },
            { title: 'Configure action chunk size (16)', deliverable: 'Chunked action generation' },
          ],
        },
      ],
      milestone: {
        week: 6,
        title: 'Model Ready',
        keyDeliverable: 'Full architecture implemented, forward pass works',
        goNoGoCriteria: 'Inference produces reasonable actions',
      },
    },

    // Phase 4: Training Infrastructure
    {
      id: 4,
      title: 'Training Infrastructure',
      duration: 'Week 5-7',
      startDate: 'Feb 7',
      endDate: 'Feb 28',
      goal: 'Complete, correct training pipeline (even if not run to completion)',
      resources: {
        gpuHours: '~200',
        purpose: 'Training infrastructure verification',
      },
      subphases: [
        {
          id: '4.1',
          title: 'Loss Function Implementation',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 3,
          tasks: [
            { title: 'Implement autoregressive loss for text', deliverable: 'Cross-entropy loss module' },
            { title: 'Implement flow matching loss for actions', deliverable: 'Flow matching loss module' },
            { title: 'Implement combined loss with balancing', deliverable: 'Combined training objective' },
            { title: 'Verify loss computation on sample batches', deliverable: 'Loss sanity checks' },
          ],
        },
        {
          id: '4.2',
          title: 'Distributed Training Setup',
          classification: 'AGENT-DELEGABLE',
          estimatedDays: 3,
          tasks: [
            { title: 'Configure 8-GPU training scripts', deliverable: 'Multi-GPU training working' },
            { title: 'Implement proper distributed sampling', deliverable: 'Correct data sharding' },
            { title: 'Test distributed checkpointing', deliverable: 'Distributed save/load' },
            { title: 'Profile training throughput', deliverable: 'Throughput benchmarks' },
          ],
        },
      ],
      milestone: {
        week: 7,
        title: 'Training Ready',
        keyDeliverable: 'Complete pipeline verified on small scale',
        goNoGoCriteria: 'Loss decreases on mini-training',
      },
    },

    // Phase 5: Training Execution
    {
      id: 5,
      title: 'Training Execution',
      duration: 'Week 7-10',
      startDate: 'Feb 21',
      endDate: 'Mar 21',
      goal: 'Execute training at scale, monitor and adjust',
      resources: {
        gpuHours: '~3000-4000',
        purpose: 'Main training (~2-3 weeks on 8xA100)',
      },
      subphases: [
        {
          id: '5.1',
          title: 'Initial Training Run',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 7,
          tasks: [
            { title: 'Launch full training on 8xA100', deliverable: 'Training in progress' },
            { title: 'Monitor loss curves and metrics', deliverable: 'Continuous monitoring' },
            { title: 'Identify and fix early issues', deliverable: 'Issue resolution log' },
            { title: 'Adjust hyperparameters if needed', deliverable: 'Tuned hyperparameters' },
          ],
        },
        {
          id: '5.2',
          title: 'Continued Training with Adjustments',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 10,
          tasks: [
            { title: 'Continue training with any necessary adjustments', deliverable: 'Improved training run' },
            { title: 'Implement curriculum learning if beneficial', deliverable: 'Curriculum schedule' },
            { title: 'Save multiple checkpoints for evaluation', deliverable: 'Checkpoint library' },
            { title: 'Document training decisions', deliverable: 'Training decision log' },
          ],
        },
      ],
      milestone: {
        week: 9,
        title: 'Training Checkpoint',
        keyDeliverable: 'Midpoint training evaluation',
        goNoGoCriteria: '>50% LEGO success, loss stabilized',
      },
    },

    // Phase 6: Evaluation & Benchmarking
    {
      id: 6,
      title: 'Evaluation & Benchmarking',
      duration: 'Week 9-11',
      startDate: 'Mar 7',
      endDate: 'Mar 28',
      goal: 'Comprehensive evaluation on LEGO tasks and standard benchmarks',
      resources: {
        gpuHours: '~800',
        purpose: 'Evaluation, ablations, fine-tuning',
      },
      subphases: [
        {
          id: '6.1',
          title: 'LEGO Task Evaluation',
          classification: 'AGENT-ASSISTED',
          estimatedDays: 5,
          tasks: [
            { title: 'Evaluate on all LEGO task configurations', deliverable: 'Task success rates' },
            { title: 'Measure precision and efficiency metrics', deliverable: 'Detailed metrics' },
            { title: 'Analyze bimanual coordination quality', deliverable: 'Coordination analysis' },
            { title: 'Document failure modes', deliverable: 'Failure taxonomy' },
          ],
        },
        {
          id: '6.2',
          title: 'LIBERO Benchmark Evaluation',
          classification: 'AGENT-DELEGABLE',
          estimatedDays: 3,
          tasks: [
            { title: 'Set up LIBERO benchmark environment', deliverable: 'LIBERO running' },
            { title: 'Evaluate model on all 4 suites', deliverable: 'LIBERO scores' },
            { title: 'Compare against reported EO-1 numbers', deliverable: 'Comparison analysis' },
          ],
        },
        {
          id: '6.3',
          title: 'Ablation Studies',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 5,
          tasks: [
            { title: 'Ablate interleaved vs standard training', deliverable: 'Ablation results' },
            { title: 'Ablate flow matching vs autoregressive actions', deliverable: 'Action head comparison' },
            { title: 'Ablate action chunk sizes', deliverable: 'Chunk size analysis' },
            { title: 'Document findings', deliverable: 'Ablation report' },
          ],
        },
      ],
      milestone: {
        week: 11,
        title: 'Evaluation Complete',
        keyDeliverable: 'Full benchmark results',
        goNoGoCriteria: 'Performance characterized, documented',
      },
    },

    // Phase 7: Fine-tuning Experiments
    {
      id: 7,
      title: 'Fine-tuning Experiments',
      duration: 'Week 10-12',
      startDate: 'Mar 14',
      endDate: 'Apr 4',
      goal: 'Understand fine-tuning dynamics and task adaptation',
      resources: {
        gpuHours: '~800',
        purpose: 'Evaluation, ablations, fine-tuning',
      },
      subphases: [
        {
          id: '7.1',
          title: 'Task-Specific Fine-tuning',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 5,
          tasks: [
            { title: 'Fine-tune on specific LEGO kit', deliverable: 'Specialized model' },
            { title: 'Compare pretrained vs fine-tuned', deliverable: 'Fine-tuning effectiveness' },
            { title: 'Analyze catastrophic forgetting', deliverable: 'Forgetting analysis' },
            { title: 'Document optimal fine-tuning recipe', deliverable: 'Fine-tuning guidelines' },
          ],
        },
        {
          id: '7.2',
          title: 'Few-Shot Adaptation Experiments',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 4,
          tasks: [
            { title: 'Test with 10, 50, 100 demonstrations', deliverable: 'Few-shot learning curves' },
            { title: 'Compare to training from scratch', deliverable: 'Data efficiency analysis' },
            { title: 'Identify minimum data requirements', deliverable: 'Data requirement guidelines' },
          ],
        },
      ],
    },

    // Phase 8: Sim-to-Real Preparation
    {
      id: 8,
      title: 'Sim-to-Real Preparation',
      duration: 'Week 11-13',
      startDate: 'Mar 21',
      endDate: 'Apr 4',
      goal: 'Prepare for future real-robot deployment on Unitree H1',
      resources: {
        gpuHours: '~200',
        purpose: 'Documentation, packaging',
      },
      subphases: [
        {
          id: '8.1',
          title: 'Sim-to-Real Gap Analysis',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 3,
          tasks: [
            { title: 'Document all simulation simplifications', deliverable: 'Gap analysis document' },
            { title: 'Identify critical transfer risks', deliverable: 'Risk prioritization' },
            { title: 'Plan domain randomization extensions', deliverable: 'DR improvement plan' },
            { title: 'Estimate real-world performance', deliverable: 'Transfer prediction' },
          ],
        },
        {
          id: '8.2',
          title: 'H1 Action Space Mapping',
          classification: 'HUMAN-CRITICAL',
          estimatedDays: 3,
          tasks: [
            { title: 'Document H1 kinematic structure', deliverable: 'H1 specification document' },
            { title: 'Design action space mapping (sim -> H1)', deliverable: 'Mapping specification' },
            { title: 'Identify embodiment differences', deliverable: 'Embodiment gap analysis' },
            { title: 'Plan adaptation strategy', deliverable: 'H1 adaptation plan' },
          ],
        },
        {
          id: '8.3',
          title: 'Project Documentation and Handoff',
          classification: 'AGENT-DELEGABLE',
          estimatedDays: 3,
          tasks: [
            { title: 'Complete code documentation', deliverable: 'Documented codebase' },
            { title: 'Write project report', deliverable: 'Technical report' },
            { title: 'Create reproduction instructions', deliverable: 'README and guides' },
            { title: 'Package trained models and data', deliverable: 'Shareable artifacts' },
          ],
        },
      ],
      milestone: {
        week: 13,
        title: 'Project Complete',
        keyDeliverable: 'Documentation, models, code packaged',
        goNoGoCriteria: 'Reproducible, ready for next phase',
      },
    },
  ],

  successCriteria: [
    {
      level: 'minimum',
      title: 'Minimum Viable Outcome',
      items: [
        'Complete, documented training pipeline (runnable if not fully trained)',
        'Model achieving >50% on simple LEGO tasks in simulation',
        'LIBERO benchmark evaluation completed',
        'Comprehensive documentation of approach and findings',
      ],
    },
    {
      level: 'target',
      title: 'Target Outcome',
      items: [
        'Model achieving >70% on LEGO tasks across difficulty levels',
        'Competitive LIBERO scores (within 10% of reported EO-1)',
        'Generalization testing completed',
        'Fine-tuning experiments completed',
        'Sim-to-real readiness documented',
      ],
    },
    {
      level: 'stretch',
      title: 'Stretch Goals',
      items: [
        '>85% LEGO task success',
        'Match or exceed EO-1 LIBERO numbers',
        'Preliminary dual-system extension implemented',
        'Real-robot demonstration (if H1/Franka available early)',
      ],
    },
  ],
}

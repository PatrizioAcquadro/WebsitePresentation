import { readFile } from 'fs/promises'
import { join } from 'path'
import type {
  PhaseDetailContentBlock,
  PhaseDetailData,
  PhaseDetailDecision,
  PhaseDetailExtraSection,
  PhaseDetailTask,
} from '@/lib/roadmap/phase-detail-types'

const TASK_ICON_SEQUENCE: PhaseDetailTask['icon'][] = [
  'bolt',
  'hand',
  'storage',
  'flow',
  'users',
  'warning',
]

interface PhaseDetailLoadOptions {
  fileName: string
  backHref: string
  omitDecisionLabels?: string[]
}

interface MarkdownHeadingSection {
  title: string
  startIndex: number
  content: string
}

interface MarkdownHeadingMatch {
  title: string
  index: number
  raw: string
}

export async function loadPhase21Detail(): Promise<PhaseDetailData> {
  return loadPhaseDetailFromMarkdown({
    fileName: 'Phase2.1.md',
    backHref: '/roadmap#phase-2',
    omitDecisionLabels: ['sim engine'],
  })
}

export async function loadPhase22Detail(): Promise<PhaseDetailData> {
  const detail = await loadPhaseDetailFromMarkdown({
    fileName: 'Phase2.2.md',
    backHref: '/roadmap#phase-2',
  })

  const hiddenTaskSectionTitles = new Set([
    'schema design',
    'design',
    'validation pipeline',
    'quality report output',
  ])
  const hiddenExtraSectionTitles = new Set(['downstream contract with phase 2.3'])
  const hiddenDecisionLabels = new Set(['camera metadata', 'views', 'episode structure'])

  return {
    ...detail,
    highlightBody:
      'Turn the 10K Phase 2.1 trajectories into sim-grounded language annotations that Phase 2.3 can consume directly.',
    fixedDecisions: detail.fixedDecisions.map((decision) => ({
      ...decision,
      value: concisePhase22DecisionValue(decision),
    })).filter((decision) => !hiddenDecisionLabels.has(decision.label.toLowerCase())),
    stanceTitle: 'Key Phase 2.2 Stance: Self-Hosted VLM',
    stanceIntro:
      'Use a self-hosted Qwen model with simulation metadata as the source of truth, then rewrite those facts into natural language that Phase 2.3 can use directly.',
    stanceBullets: [
      'Qwen3.5-9B runs on A100 for production; Qwen3.5-4B is enough for local iteration.',
      'Simulation metadata provides the facts; the VLM turns them into fluent text instead of guessing from pixels alone.',
      'Annotations are emitted in a structure that plugs directly into the Phase 2.3 pipeline.',
    ],
    extraSections: detail.extraSections?.filter(
      (section) => !hiddenExtraSectionTitles.has(section.title.toLowerCase())
    ),
    doneItems: [
      {
        title: 'Schema Locked',
        description: 'The annotation schema, enums, and JSON validation rules are frozen.',
      },
      {
        title: 'VLM Pipeline Running',
        description: 'The self-hosted Qwen pipeline produces all required annotation types reliably.',
      },
      {
        title: 'Full Annotation Coverage',
        description: 'All 10K episodes include task descriptions, step narrations, and reasoning QA.',
      },
      {
        title: 'Quality Verified',
        description: 'Annotations pass format checks and factual validation against sim ground truth.',
      },
    ],
    tasks: detail.tasks.map((task) => {
      const detailSections = task.detailSections?.filter(
        (section) => !hiddenTaskSectionTitles.has(section.title.toLowerCase())
      )

      return {
        ...task,
        detailSections: detailSections && detailSections.length > 0 ? detailSections : undefined,
      }
    }),
  }
}

export async function loadPhase23Detail(): Promise<PhaseDetailData> {
  const detail = await loadPhaseDetailFromMarkdown({
    fileName: 'Phase2.3.md',
    backHref: '/roadmap#phase-2',
  })

  const hiddenDecisionLabels = new Set(['labels', 'composition'])

  return {
    ...detail,
    summary:
      'Build EO-1-style training subsets from Phase 2.1 trajectories and Phase 2.2 annotations so the Phase 3 dataloader can consume them directly.',
    highlightBody:
      'Turn trajectories and language annotations into deterministic interleaved training sequences with explicit image, text, and action alignment.',
    fixedDecisions: detail.fixedDecisions
      .map((decision) => ({
        ...decision,
        value: concisePhase23DecisionValue(decision),
      }))
      .filter((decision) => !hiddenDecisionLabels.has(decision.label.toLowerCase())),
    stanceTitle: 'Key Phase 2.3 Stance: Reference-Based Sequences',
    stanceIntro:
      'Keep text inline, keep images and actions as references into the existing HDF5 episodes, and let the Phase 3 dataloader resolve them at load time.',
    stanceBullets: [
      'Each JSONL record stores text directly and points to episode seeds, step ranges, and cameras for upstream data.',
      'Interleaved VLA sequences sample one overhead view plus the active wrist view at each waypoint boundary.',
      'Action discretization stays in Phase 3; Phase 2.3 only defines the continuous ranges each segment should load.',
      'Construction is fully deterministic from episode seed, so the same upstream data always yields the same sequences.',
    ],
    doneItems: [
      {
        title: 'Schema Frozen',
        description: 'All 4 sequence types are defined, frozen, and validated with JSON Schema.',
      },
      {
        title: 'All Subsets Built',
        description: 'Interleaved, temporal, spatial, and free-chat subsets are generated at the expected scale.',
      },
      {
        title: 'References Verified',
        description: 'Every image, action, and state reference resolves cleanly against the upstream HDF5 data.',
      },
      {
        title: 'Training Ready',
        description: 'Splits are consistent, manifest and stats files exist, and the Phase 3 dataloader can consume every sequence type.',
      },
    ],
    tasks: detail.tasks.map((task) => ({
      ...task,
      detailSections: undefined,
    })),
  }
}

export async function loadPhase31Detail(): Promise<PhaseDetailData> {
  const detail = await loadPhaseDetailFromMarkdown({
    fileName: 'Phase3.1.md',
    backHref: '/roadmap#phase-3',
  })

  const hiddenDecisionLabels = new Set(['sim engine'])
  const hiddenExtraSectionTitles = new Set([
    'downstream contract with phase 3.2',
    'files inventory',
    'verification plan',
  ])

  return {
    ...detail,
    summary:
      'Load and validate Qwen3.5-4B as the VLA backbone, reuse EO-1 integration code where available, and confirm it works with 320x320 simulation views within the A100 80 GB budget.',
    highlightBody:
      'Replace the current placeholder backbone path with a verified multimodal foundation that Phase 3.2 can attach the action head to safely.',
    fixedDecisions: detail.fixedDecisions
      .map((decision) => ({
        ...decision,
        value: concisePhase31DecisionValue(decision),
      }))
      .filter((decision) => !hiddenDecisionLabels.has(decision.label.toLowerCase())),
    stanceTitle: 'Key Phase 3.1 Stance: EO-1 Reuse First',
    stanceIntro:
      'Inspect EO-1 first, reuse its backbone-loading path where practical, and keep the new VLM branch separate until later phases add the action head and training integration.',
    stanceBullets: [
      'EO-1 is the default implementation base wherever its backbone-loading, processor, or integration code already solves the problem.',
      'Qwen3.5-4B is the backbone target because it matches the Phase 2.2 model family and fits both development and A100 environments.',
      'This phase stops at loading, validation, and profiling; action heads and training integration stay in Phases 3.2 and 3.3.',
      'The existing TransformerModel remains intact behind a separate config path for backward compatibility.',
    ],
    doneItems: [
      {
        title: 'Dependencies Ready',
        description: 'The vlm dependency group installs, transformers imports, and both VLM Hydra configs parse without breaking existing model configs.',
      },
      {
        title: 'Backbone Loaded',
        description: 'Qwen3.5-4B loads with bf16 dtype, verified parameter count, valid hidden size, and correct get_model() routing.',
      },
      {
        title: 'Inference Validated',
        description: 'Processor setup, hidden-state extraction, and multi-view forward passes work on 320x320 MuJoCo images with non-empty generation.',
      },
      {
        title: 'Profiled for Phase 3.2',
        description: 'Vision token counts, A100 memory measurements, and the action-head VRAM budget are recorded for the next phase.',
      },
    ],
    extraSections: detail.extraSections?.filter(
      (section) => !hiddenExtraSectionTitles.has(section.title.toLowerCase())
    ),
    tasks: detail.tasks.map((task) => ({
      ...task,
      ...concisePhase31TaskCopy(task),
      detailSections: undefined,
    })),
  }
}

export async function loadPhase32Detail(): Promise<PhaseDetailData> {
  const detail = await loadPhaseDetailFromMarkdown({
    fileName: 'Phase3.2.md',
    backHref: '/roadmap#phase-3',
  })

  const visibleDecisionLabels = new Set([
    'action space',
    'robot state',
    'control rate',
    'vlm backbone',
    'training data',
    'target architecture (eo-1)',
  ])

  return {
    ...detail,
    summary:
      'Implement the EO-1-style action head on top of the Phase 3.1 backbone so the model can generate continuous 17-D robot actions and Phase 3.3 can integrate full VLA training.',
    highlightBody:
      'Phase 3.1 can process vision and language, but it still cannot produce robot actions. Phase 3.2 adds that action-generation path.',
    fixedDecisionsTitle: 'Fixed Upstream Decisions',
    fixedDecisions: detail.fixedDecisions
      .filter((decision) => visibleDecisionLabels.has(decision.label.toLowerCase()))
      .map((decision) => ({
        ...decision,
        value: concisePhase32DecisionValue(decision),
      })),
    stanceTitle: 'Key Stance: EO-1 Reuse First',
    stanceIntro:
      'Reuse EO-1 wherever it already solves the problem, and only add new modules where the action path is still missing.',
    stanceBullets: [
      'Use EO-1 action-head, projector, and decoding code whenever it is already a clean fit.',
      'Keep the backbone as the denoiser by injecting noisy action tokens into the shared multimodal sequence.',
      'Use 16-step chunks by default: 0.8 seconds at 20 Hz with comfortable context headroom.',
      'Keep this phase focused on model components and synthetic-tensor validation; training-loop integration stays in Phase 3.3.',
    ],
    tasksSubtitle: 'Six core components to define, build, and validate for the Phase 3.2 action path.',
    extraSections: undefined,
    deliverables: [
      'Flow matching module with conditional flow matching loss and ODE denoising.',
      'Projection stack: robot state projector, noisy action projector, and action output head.',
      'VLA model class combining the Phase 3.1 backbone with the full action head.',
      'Hydra configs for the action head and full VLA model.',
      'Tests, validation, and memory profiling showing the action head works within the Phase 3.1 budget.',
    ],
    doneItems: [
      {
        title: 'Core Modules Ready',
        description:
          'Flow matching, state projection, action projection, and the output head are implemented and individually tested.',
      },
      {
        title: 'Model Assembled',
        description:
          'The VLA model composes the Phase 3.1 backbone with the full action head correctly.',
      },
      {
        title: 'Training Forward Works',
        description:
          'Synthetic training batches return finite text and action losses without numerical issues.',
      },
      {
        title: 'Inference Works',
        description:
          'The model produces finite `(B, 16, 17)` denoised action chunks through ODE integration.',
      },
      {
        title: 'Gradient Routing Verified',
        description:
          'Gradients update the action head while the frozen backbone remains unchanged.',
      },
      {
        title: 'Validation Complete',
        description:
          'Configs parse, validation passes, and existing tests continue to run without regression.',
      },
    ],
    tasks: detail.tasks.map((task) => ({
      ...task,
      ...concisePhase32TaskCopy(task),
      detailSections: undefined,
    })),
  }
}

export async function loadPhase41Detail(): Promise<PhaseDetailData> {
  const detail = await loadPhaseDetailFromMarkdown({
    fileName: 'Phase4.1.md',
    backHref: '/roadmap#phase-4',
  })

  const visibleDecisionLabels = new Set([
    'action head',
    'token type mask',
    'chunk contract',
    'batch format',
    'tracking infrastructure',
    'loss config baseline',
  ])

  return {
    ...detail,
    summary:
      'Extract the Phase 3.2 inline loss path into standalone text, action, and combined loss modules that are testable, configurable, and validated on real Phase 2.3 data.',
    highlightBody:
      'Phase 3.2 proves the architecture, but the loss path is still inline, lightly monitored, and unverified on real training data. Phase 4.1 turns it into production-ready loss modules.',
    fixedDecisionsTitle: 'Fixed Upstream Decisions',
    fixedDecisions: detail.fixedDecisions
      .filter((decision) => visibleDecisionLabels.has(decision.label.toLowerCase()))
      .map((decision) => ({
        ...decision,
        value: concisePhase41DecisionValue(decision),
      })),
    stanceTitle: 'Key Stance: Build on Phase 3.2',
    stanceIntro:
      'Keep the Phase 3.2 math and interfaces, but move the loss path into standalone modules with monitoring and real-data validation.',
    stanceBullets: [
      'Phase 4.1 extracts the existing inline loss logic instead of redesigning the objective.',
      'No EO-1 code is present locally, so the implementation follows the EO-1 and Pi-0 pattern without local code reuse.',
      'Fixed-weight balancing stays the default, while dynamic balancing remains available as an optional config path.',
      'Validation must move from synthetic tensors to real Phase 2.3 data before Phase 4.2 training begins.',
    ],
    tasksSubtitle: 'Five core components to formalize, implement, and validate for the Phase 4.1 loss stack.',
    extraSections: undefined,
    deliverables: [
      'Loss contract in models/losses.py: TokenType, LossOutput, and shape verification utilities.',
      'VLATextLoss with causal-shift cross-entropy, perplexity, top-1 accuracy, label smoothing, and all-ignored handling.',
      'VLAActionLoss with masked velocity MSE, per-joint breakdown, velocity norms, and mask diagnostics.',
      'VLACombinedLoss with fixed, normalized, and uncertainty balancing plus merged monitoring metrics.',
      'VLAModel loss-module integration with updated config, tests, validation checks, and saved loss-validation artifacts.',
    ],
    doneItems: [
      {
        title: 'Loss Contract Exists',
        description:
          'TokenType, LossOutput, and the shape verification utilities exist in models/losses.py.',
      },
      {
        title: 'Text Loss Verified',
        description:
          'VLATextLoss computes causal-shift cross-entropy, reports perplexity and top-1 accuracy, and handles all-ignored sequences.',
      },
      {
        title: 'Action Loss Verified',
        description:
          'VLAActionLoss computes masked MSE, reports per-joint and velocity diagnostics, and handles all-masked chunks.',
      },
      {
        title: 'Combined Loss Matches Baseline',
        description:
          'VLACombinedLoss supports fixed, normalized, and uncertainty balancing, and the fixed default matches the Phase 3.2.4 inline sum.',
      },
      {
        title: 'VLAModel Integrated',
        description:
          'VLAModel.forward() uses the new loss modules and still returns the backward-compatible total_loss, text_loss, and action_loss keys, plus metrics.',
      },
      {
        title: 'Validation Complete',
        description:
          'The loss config parses, the loss tests and validation checks pass, existing tests stay green, and artifacts are saved to logs/loss_validation/.',
      },
    ],
    tasks: detail.tasks.map((task) => ({
      ...task,
      ...concisePhase41TaskCopy(task),
      detailSections: undefined,
    })),
  }
}

function concisePhase22DecisionValue(decision: PhaseDetailDecision): string {
  const label = decision.label.toLowerCase()

  if (label === 'dataset') {
    return '10K HDF5 episodes plus manifests and dataset stats.'
  }

  if (label === 'per-episode content') {
    return '4-view RGB/depth/segmentation, 52-D state, and 17-D actions at 20 Hz.'
  }

  if (label === 'labels') {
    return '8 phase labels plus grasp, outcome, failure, and recovery signals stored in HDF5.'
  }

  if (label === 'metadata') {
    return 'Seed, level, brick types, goal, spawn poses, version, and timestamps.'
  }

  if (label === 'camera metadata') {
    return 'Per-camera intrinsics with per-step extrinsics for all 4 views.'
  }

  if (label === 'views') {
    return 'Overhead, left wrist, right wrist, and third-person.'
  }

  if (label === 'episode structure') {
    return '8-phase pick-and-place episodes, about 200 steps each.'
  }

  if (label === 'composition') {
    return '7K success, 2K failure, and 1K recovery episodes.'
  }

  return decision.value
}

function concisePhase23DecisionValue(decision: PhaseDetailDecision): string {
  const label = decision.label.toLowerCase()

  if (label === 'trajectory dataset') {
    return '10K HDF5 episodes with 80/10/10 manifests and dataset statistics.'
  }

  if (label === 'per-episode content') {
    return '4-view RGB, depth, and segmentation plus 52-D state and 17-D actions at 20 Hz.'
  }

  if (label === 'labels') {
    return '8 waypoint phases plus grasp, outcome, perturbation, and recovery signals.'
  }

  if (label === 'composition') {
    return '7K success, 2K failure, and 1K recovery episodes.'
  }

  if (label === 'annotations') {
    return 'About 300K episode-level JSONL annotations across 6 types from Phase 2.2.'
  }

  if (label === 'temporal anchors') {
    return 'Step ranges and evidence steps are already defined, so text can be aligned directly to frames and actions.'
  }

  if (label === 'camera anchors') {
    return 'Spatial QA and keyframe captions already specify which camera view each sequence should load.'
  }

  if (label === 'schema') {
    return 'Phase 2.2 annotations already validate against schema.json and passed upstream quality checks.'
  }

  return decision.value
}

function concisePhase31DecisionValue(decision: PhaseDetailDecision): string {
  const label = decision.label.toLowerCase()

  if (label === 'sim engine') {
    return 'MuJoCo with MJCF-first assets and headless EGL rendering.'
  }

  if (label === 'robot') {
    return 'IHMC Alex upper body, fixed base, with 17-D actions and a 52-D state vector.'
  }

  if (label === 'views') {
    return '4 frozen 320x320 cameras at 20 Hz: overhead, left wrist, right wrist, and third person.'
  }

  if (label === 'data format') {
    return 'Phase 2.1 HDF5 episodes and Phase 2.2 JSONL annotations are already assembled into Phase 2.3 reference-based sequences.'
  }

  if (label === 'training infrastructure') {
    return 'Hydra, PyTorch DDP/DeepSpeed, Gilbreth A100 80 GB nodes, and a lab RTX 4090 dev machine.'
  }

  if (label === 'model family') {
    return 'Qwen3.5 is already the Phase 2.2 model family; Phase 3.1 uses the 4B variant as the VLA backbone.'
  }

  if (label === 'target architecture & codebase (eo-1)') {
    return 'EO-1 remains the architecture template and preferred reusable codebase for backbone loading and integration.'
  }

  return decision.value
}

function concisePhase31TaskCopy(task: PhaseDetailTask): Pick<PhaseDetailTask, 'description' | 'why' | 'milestone'> {
  if (task.label === '3.1.0') {
    return {
      description:
        'Add the HuggingFace VLM dependencies and define Qwen3.5-4B Hydra configs for both A100 production and lab-PC development.',
      why:
        'This is the setup layer the rest of the phase depends on. If the dependencies do not install cleanly or the configs do not parse on both hardware tiers, every later integration step becomes slower and more fragile.',
      milestone:
        'This step is complete when the VLM dependency group installs correctly, `transformers` imports without issue, both VLM configs compose cleanly, and the existing model configs still work as before.',
    }
  }

  if (task.label === '3.1.1') {
    return {
      description:
        'Inspect EO-1\'s loading path, reuse it where possible, and route architecture.type: "vlm" to a verified Qwen3.5-4B backbone without breaking TransformerModel.',
      why:
        'This is the real foundation for the model stack. Phase 3.2 cannot attach an action head until the backbone loads reliably, exposes the right hidden states, and is verified to behave correctly on our hardware.',
      milestone:
        'This step is complete when the Qwen3.5-4B backbone loads in bf16 on GPU, reports the expected model size and hidden dimension, passes basic verification checks, and `get_model()` still routes both VLM and non-VLM configs correctly.',
    }
  }

  if (task.label === '3.1.2') {
    return {
      description:
        'Configure the Qwen3.5 tokenizer and processor for 320x320 MuJoCo images, then measure the real vision-token cost per image.',
      why:
        'This is the bridge between raw simulation data and model-ready inputs. It also tells us how much of the context window is consumed by images, which directly affects how much room remains for text and action tokens later on.',
      milestone:
        'This step is complete when the processor accepts 320x320 MuJoCo images and task text correctly, produces valid tensors, and the measured vision-token count is recorded for context-budget planning.',
    }
  }

  if (task.label === '3.1.3') {
    return {
      description:
        'Run end-to-end forward passes on real simulation images and prompts to confirm the backbone, processor, hidden states, and generation all work together.',
      why:
        'Loading the model is only the first step. This check shows that the full multimodal path works on our actual simulation images and prompts before we start building training and action-generation logic on top of it.',
      milestone:
        'This step is complete when multi-view inference runs without errors, logits and hidden states have the expected shapes, outputs remain numerically stable, and generated text is non-empty and coherent enough for a sanity check.',
    }
  }

  if (task.label === '3.1.4') {
    return {
      description:
        'Profile Qwen3.5-4B VRAM usage on A100 across sequence lengths, batch sizes, and inference versus training modes.',
      why:
        'Phase 3.2 needs measured memory numbers, not rough guesses. This profiling work tells us how much headroom is left for the action head and what training settings are realistic without running into OOM failures.',
      milestone:
        'This step is complete when the A100 profiling sweep produces clear VRAM measurements across the target settings and leaves us with a documented memory budget for Phase 3.2.',
    }
  }

  return {
    description: task.description,
    why: task.why,
    milestone: task.milestone,
  }
}

function concisePhase32DecisionValue(decision: PhaseDetailDecision): string {
  const label = decision.label.toLowerCase()

  if (label === 'action space') {
    return '17-D continuous control: spine, both arms, and two grippers.'
  }

  if (label === 'robot state') {
    return '52-D normalized proprioception covering joints, velocities, grippers, and end-effector pose and velocity.'
  }

  if (label === 'control rate') {
    return '20 Hz control, so a 16-step chunk spans 0.8 seconds.'
  }

  if (label === 'vlm backbone') {
    return 'Phase 3.1 already provides the Qwen3.5-4B backbone, hidden states, processor, and freeze control.'
  }

  if (label === 'training data') {
    return 'Phase 2.3 action references resolve to continuous 17-D trajectories from HDF5 episodes.'
  }

  if (label === 'target architecture (eo-1)') {
    return 'Transfusion-style decoder: text uses AR loss, action positions use conditional flow matching.'
  }

  return decision.value
}

function concisePhase32TaskCopy(task: PhaseDetailTask): Pick<PhaseDetailTask, 'why' | 'milestone'> {
  if (task.label === '3.2.0') {
    return {
      why:
        'This locks the shapes, token layout, and chunking rules before implementation starts. Without that contract, every projector, loss, and dataloader interface becomes easier to break.',
      milestone:
        'This step is complete when chunk size, token layout, masks, and interface shapes are fixed and validated on a synthetic example.',
    }
  }

  if (task.label === '3.2.1') {
    return {
      why:
        'This is the mechanism that turns backbone context into continuous actions. It gives the model a stable way to generate precise 17-D motion instead of regressing an averaged trajectory.',
      milestone:
        'This step is complete when the flow-matching module passes its math, masking, solver, and stability tests with finite outputs.',
    }
  }

  if (task.label === '3.2.2') {
    return {
      why:
        'This gives the backbone direct access to robot state instead of forcing it to infer everything from images. That conditioning matters for precise, contact-rich LEGO assembly.',
      milestone:
        'This step is complete when the 52-D state maps cleanly to one hidden token and the projector is shape-correct, trainable, and numerically stable.',
    }
  }

  if (task.label === '3.2.3') {
    return {
      why:
        'These modules form the action interface around the backbone: one maps noisy actions into hidden tokens, and the other maps hidden states back to 17-D velocity predictions.',
      milestone:
        'This step is complete when noisy action tokens, timestep embeddings, and velocity predictions all pass shape, gradient, and stability checks.',
    }
  }

  if (task.label === '3.2.4') {
    return {
      why:
        'This is where the separate modules become one working model. If sequence assembly or loss routing is wrong here, training will fail quietly rather than obviously.',
      milestone:
        'This step is complete when the full model runs end to end on synthetic batches, returns finite text and action losses, predicts action chunks, and stays within the measured VRAM budget.',
    }
  }

  if (task.label === '3.2.5') {
    return {
      why:
        'This confirms the full action path works as a system and that memory use is still safe before Phase 3.3 training begins.',
      milestone:
        'This step is complete when the validation suite passes, artifacts are written, and the measured action-head overhead stays within the Phase 3.1 budget.',
    }
  }

  return {
    why: task.why,
    milestone: task.milestone,
  }
}

function concisePhase41DecisionValue(decision: PhaseDetailDecision): string {
  const label = decision.label.toLowerCase()

  if (label === 'action head') {
    return 'Phase 3.2 already provides the flow-matching module, state projector, action projector, output head, and VLAModel.'
  }

  if (label === 'token type mask') {
    return 'TEXT, IMAGE, STATE, and ACTION positions are already defined to route each token to the correct loss.'
  }

  if (label === 'chunk contract') {
    return 'chunk_size=16, action_dim=17, one token per action step, with a binary chunk mask for padded chunks.'
  }

  if (label === 'batch format') {
    return 'Phase 3.2.4 already defines the batch dict with input IDs, images, attention masks, robot states, action chunks, chunk masks, token types, and text labels.'
  }

  if (label === 'tracking infrastructure') {
    return 'Tracking already supports dict-based loss extraction plus loss_ar and loss_fm logging.'
  }

  if (label === 'loss config baseline') {
    return 'configs/model/action_head.yaml already sets loss.lambda_text: 1.0 and loss.lambda_action: 1.0.'
  }

  return decision.value
}

function concisePhase41TaskCopy(task: PhaseDetailTask): Pick<PhaseDetailTask, 'description' | 'why' | 'milestone'> {
  if (task.label === '4.1.0') {
    return {
      description:
        'Turn the Phase 3.2 token-routing rules into a shared loss contract with TokenType, LossOutput, shape checks, and tracking mappings.',
      why:
        'Every later loss module depends on one stable interface. Without it, mask values, return structures, and logging keys can drift across the stack.',
      milestone:
        'This step is complete when the loss contract, shape checks, and extended loss config exist and the contract tests pass.',
    }
  }

  if (task.label === '4.1.1') {
    return {
      description:
        'Implement VLATextLoss as a standalone autoregressive text-loss module with causal shift, ignore masking, and text diagnostics.',
      why:
        'The language branch needs a reusable loss module that is correct on full interleaved sequences and exposes perplexity and token accuracy for training diagnostics.',
      milestone:
        'This step is complete when VLATextLoss returns correct cross-entropy, perplexity, and accuracy, and safely handles fully ignored sequences.',
    }
  }

  if (task.label === '4.1.2') {
    return {
      description:
        'Implement VLAActionLoss as a standalone masked velocity-MSE module with per-joint and velocity diagnostics.',
      why:
        'The action branch must exclude padded chunk positions correctly and expose enough diagnostics to detect dead joints, collapse, or unstable velocity scales.',
      milestone:
        'This step is complete when VLAActionLoss returns correct masked MSE, per-joint breakdowns, and stable diagnostics, including the all-masked edge case.',
    }
  }

  if (task.label === '4.1.3') {
    return {
      description:
        'Implement VLACombinedLoss to merge text and action losses with fixed, normalized, or uncertainty-based balancing.',
      why:
        'This module decides how the model shares gradient budget between language and action learning and centralizes the metrics that Phase 4.2 will log.',
      milestone:
        'This step is complete when the combined loss supports all three strategies, assembles prefixed metrics, and the fixed default matches the Phase 3.2 inline sum.',
    }
  }

  if (task.label === '4.1.4') {
    return {
      description:
        'Integrate the loss modules into VLAModel.forward(), then validate the full path with tests, sanity checks, and overfit-style convergence checks.',
      why:
        'Unit tests alone do not prove the end-to-end training signal works. This is where masking, gradient flow, loss scale, and monitoring are verified together before Phase 4.2.',
      milestone:
        'This step is complete when VLAModel uses the new modules, the validation checks pass, overfit convergence is demonstrated, and loss-validation artifacts are written.',
    }
  }

  return {
    description: task.description,
    why: task.why,
    milestone: task.milestone,
  }
}

async function loadPhaseDetailFromMarkdown({
  fileName,
  backHref,
  omitDecisionLabels = [],
}: PhaseDetailLoadOptions): Promise<PhaseDetailData> {
  const source = await readFile(join(process.cwd(), fileName), 'utf8')
  const detail = parsePhaseMarkdown(source, backHref)

  if (omitDecisionLabels.length === 0) {
    return detail
  }

  const hiddenLabels = new Set(omitDecisionLabels.map((label) => label.toLowerCase()))

  return {
    ...detail,
    fixedDecisions: detail.fixedDecisions.filter(
      (decision) => !hiddenLabels.has(decision.label.toLowerCase())
    ),
  }
}

function parsePhaseMarkdown(source: string, backHref: string): PhaseDetailData {
  const headerMatch = source.match(/^#\s+Phase\s+([0-9.]+)\s+[—-]\s+(.+?)\s+\((.+)\)\s*$/m)

  if (!headerMatch) {
    throw new Error('Unable to parse phase header from markdown.')
  }

  const [, phaseNumber, title, durationLabel] = headerMatch
  const goalMatch = source.match(/\*\*Goal:\*\*\s*([^\n]+)/)

  if (!goalMatch) {
    throw new Error('Unable to parse phase goal from markdown.')
  }

  const fixedDecisionHeading = source.match(/\*\*(Fixed upstream decisions \(from ([^)]+)\)):\*\*/i)

  if (!fixedDecisionHeading) {
    throw new Error('Unable to parse fixed-decision heading from markdown.')
  }

  const stanceHeading = source.match(/\*\*(Key Phase [^:]+ stance):\*\*/i)

  if (!stanceHeading) {
    throw new Error('Unable to parse stance heading from markdown.')
  }

  const rawStanceBullets = parseRawBullets(
    extractBlock(source, stanceHeading[0], '**Critical gap this phase closes:**')
  )
  const fixedDecisions = parseDecisionList(
    extractBlock(source, fixedDecisionHeading[0], '**Key Phase')
  )
  const stanceBullets = rawStanceBullets.map(stripInlineFormatting)
  const criticalGap = normalizeParagraph(
    extractBlock(source, '**Critical gap this phase closes:**', '\n---')
  )
  const topLevelSections = parseTopLevelSections(source)
  const taskSectionEnd = topLevelSections.length > 0 ? topLevelSections[0].startIndex : source.length

  const deliverablesSection = topLevelSections.find((section) =>
    section.title.startsWith('Startup-Grade Outputs')
  )

  if (!deliverablesSection) {
    throw new Error('Unable to locate deliverables section in phase markdown.')
  }

  const doneSection = topLevelSections.find(
    (section) => section.title === `Phase ${phaseNumber} Definition of Done`
  )

  if (!doneSection) {
    throw new Error('Unable to locate definition-of-done section in phase markdown.')
  }

  const tasks = parseTasks(source.slice(0, taskSectionEnd))
  const extraSections = topLevelSections
    .filter(
      (section) =>
        section.title !== deliverablesSection.title &&
        section.title !== doneSection.title
    )
    .map(parseExtraSection)
    .filter((section) => section.blocks.length > 0)
  const deliverables = parseSimpleBullets(deliverablesSection.content)
  const doneItems = parseSimpleBullets(doneSection.content).map((description) => ({
    title: inferDoneTitle(description),
    description,
  }))
  const stanceLead = extractStanceLead(rawStanceBullets[0] ?? '')
  const taskCountLabel = numberWord(tasks.length)

  return {
    backHref,
    phaseLabel: `Phase ${phaseNumber}`,
    durationLabel,
    title,
    summary: normalizeParagraph(goalMatch[1]),
    highlightTitle: 'Primary Goal',
    highlightBody: criticalGap,
    fixedDecisionsTitle: `Fixed Upstream Decisions (from Phase ${fixedDecisionHeading[2]})`,
    fixedDecisions,
    stanceTitle: stanceLead
      ? `Key Phase ${phaseNumber} Stance: ${toTitleCase(stanceLead)}`
      : `Key Phase ${phaseNumber} Stance`,
    stanceBullets,
    tasksTitle: `${title} Tasks`,
    tasksSubtitle: `${taskCountLabel} critical components from the Phase ${phaseNumber} execution plan`,
    tasks,
    extraSections,
    deliverablesIntro: `Expected outputs by end of Phase ${phaseNumber}:`,
    deliverables,
    doneItems,
    estimatedDuration: durationLabel,
  }
}

function parseTasks(sectionSource: string): PhaseDetailTask[] {
  const matches = collectHeadingMatches(sectionSource, 2)
    .map((match) => {
      const taskMatch = match.title.match(/^([0-9.]+)\)\s+(.+)$/)

      if (!taskMatch) {
        return null
      }

      return {
        index: match.index,
        raw: match.raw,
        label: taskMatch[1],
        title: taskMatch[2],
      }
    })
    .filter((match): match is { index: number; raw: string; label: string; title: string } => Boolean(match))

  if (matches.length === 0) {
    throw new Error('Unable to parse task headings from phase markdown.')
  }

  return matches.map((match, index) => {
    const start = match.index + match.raw.length
    const end = index + 1 < matches.length ? matches[index + 1].index : sectionSource.length
    const body = sectionSource.slice(start, end).trim()
    const subsections = parseSubsections(body)
    const description = normalizeParagraph(requiredSubsection(subsections, 'What we will do'))
    const why = normalizeParagraph(requiredSubsection(subsections, 'Why this matters'))
    const checklist = parseChecklist(requiredSubsection(subsections, 'Execution checklist'))
    const milestone = normalizeParagraph(requiredSubsection(subsections, 'Milestone'))
    const detailSections = Array.from(subsections.entries())
      .filter(([heading]) => !isPrimaryTaskSubsection(heading))
      .map(([heading, content]) => ({
        title: stripInlineFormatting(heading),
        blocks: parseContentBlocks(content),
      }))
      .filter((section) => section.blocks.length > 0)

    return {
      label: match.label,
      title: match.title.trim(),
      description,
      why,
      checklist,
      milestone,
      icon: TASK_ICON_SEQUENCE[index] ?? 'flask',
      detailSections: detailSections.length > 0 ? detailSections : undefined,
    }
  })
}

function parseExtraSection(section: MarkdownHeadingSection): PhaseDetailExtraSection {
  return {
    title: stripInlineFormatting(section.title),
    blocks: parseContentBlocks(section.content),
  }
}

function parseSubsections(sectionBody: string): Map<string, string> {
  const matches = collectHeadingMatches(sectionBody, 3)
  const sections = new Map<string, string>()

  matches.forEach((match, index) => {
    const start = match.index + match.raw.length
    const end = index + 1 < matches.length ? matches[index + 1].index : sectionBody.length
    sections.set(match.title.trim(), sectionBody.slice(start, end).trim())
  })

  return sections
}

function isPrimaryTaskSubsection(heading: string): boolean {
  const normalized = heading.toLowerCase()

  return (
    normalized.startsWith('what we will do') ||
    normalized.startsWith('why this matters') ||
    normalized.startsWith('execution checklist') ||
    normalized.startsWith('milestone')
  )
}

function requiredSubsection(sections: Map<string, string>, heading: string): string {
  const content = findSubsection(sections, heading)

  if (!content) {
    throw new Error(`Unable to parse "${heading}" subsection from phase markdown.`)
  }

  return content
}

function findSubsection(sections: Map<string, string>, heading: string): string {
  for (const [key, value] of sections.entries()) {
    if (key.startsWith(heading)) {
      return value
    }
  }

  return ''
}

function parseDecisionList(block: string): PhaseDetailDecision[] {
  const decisions = block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.+)$/)

      if (!match) {
        throw new Error(`Unable to parse decision line: ${line}`)
      }

      return {
        label: match[1].replace(/:$/, '').trim(),
        value: match[2].trim(),
      }
    })

  if (decisions.length === 0) {
    throw new Error('Unable to parse fixed decisions from phase markdown.')
  }

  return decisions
}

function parseChecklist(block: string): string[] {
  const items = parseSimpleBullets(block).map(simplifyChecklistItem)

  if (items.length === 0) {
    throw new Error('Unable to parse checklist items from phase markdown.')
  }

  return items.slice(0, 4)
}

function parseSimpleBullets(block: string): string[] {
  return parseRawBullets(block).map(stripInlineFormatting)
}

function parseRawBullets(block: string): string[] {
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function collectHeadingMatches(source: string, level: 1 | 2 | 3): MarkdownHeadingMatch[] {
  const matches: MarkdownHeadingMatch[] = []
  const lines = source.split('\n')
  const headingPrefix = `${'#'.repeat(level)} `
  let inCodeBlock = false
  let offset = 0

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
    } else if (!inCodeBlock && line.startsWith(headingPrefix)) {
      matches.push({
        title: line.slice(headingPrefix.length).trim(),
        index: offset,
        raw: line,
      })
    }

    offset += line.length

    if (index < lines.length - 1) {
      offset += 1
    }
  })

  return matches
}

function parseTopLevelSections(source: string): MarkdownHeadingSection[] {
  const matches = collectHeadingMatches(source, 1)
  const sections: MarkdownHeadingSection[] = []

  for (let index = 1; index < matches.length; index += 1) {
    const match = matches[index]
    const startIndex = match.index
    const contentStart = startIndex + match.raw.length
    const nextIndex = index + 1 < matches.length ? matches[index + 1].index : source.length

    sections.push({
      title: match.title.trim(),
      startIndex,
      content: source.slice(contentStart, nextIndex).trim(),
    })
  }

  return sections
}

function parseContentBlocks(content: string): PhaseDetailContentBlock[] {
  const lines = content.trim().split('\n')
  const blocks: PhaseDetailContentBlock[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || undefined
      const codeLines: string[] = []
      index += 1

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }

      if (index < lines.length) {
        index += 1
      }

      blocks.push({
        type: 'code',
        language,
        code: codeLines.join('\n').trim(),
      })
      continue
    }

    if (line.startsWith('|')) {
      const tableLines: string[] = []

      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim())
        index += 1
      }

      const tableBlock = parseTableBlock(tableLines)

      if (tableBlock) {
        blocks.push(tableBlock)
      }

      continue
    }

    if (/^- /.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line)
      const items: string[] = []

      while (index < lines.length) {
        const current = lines[index].trim()

        if (ordered ? /^\d+\.\s+/.test(current) : /^- /.test(current)) {
          items.push(stripInlineFormatting(current.replace(ordered ? /^\d+\.\s+/ : /^- /, '')))
          index += 1
          continue
        }

        if (!current) {
          index += 1
        }

        break
      }

      if (items.length > 0) {
        blocks.push({
          type: 'list',
          ordered,
          items,
        })
      }

      continue
    }

    const paragraphLines: string[] = []

    while (index < lines.length) {
      const current = lines[index].trim()

      if (
        !current ||
        current.startsWith('```') ||
        current.startsWith('|') ||
        /^- /.test(current) ||
        /^\d+\.\s+/.test(current)
      ) {
        break
      }

      paragraphLines.push(current)
      index += 1
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        text: stripInlineFormatting(paragraphLines.join(' ')),
      })
      continue
    }

    index += 1
  }

  return blocks.filter((block) => {
    if (block.type === 'paragraph') {
      return block.text.length > 0
    }

    if (block.type === 'list') {
      return block.items.length > 0
    }

    if (block.type === 'table') {
      return block.headers.length > 0 && block.rows.length > 0
    }

    return block.code.length > 0
  })
}

function parseTableBlock(lines: string[]): PhaseDetailContentBlock | null {
  if (lines.length < 2) {
    return null
  }

  const rows = lines.map((line) =>
    line
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((cell) => stripInlineFormatting(cell.trim()))
  )

  const [headerRow, maybeSeparator, ...bodyRows] = rows
  const dataRows = isSeparatorRow(maybeSeparator) ? bodyRows : [maybeSeparator, ...bodyRows]

  return {
    type: 'table',
    headers: headerRow,
    rows: dataRows.filter((row) => row.some((cell) => cell.length > 0)),
  }
}

function isSeparatorRow(row: string[]): boolean {
  return row.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s+/g, '')))
}

function extractBlock(source: string, startMarker: string, endMarker: string): string {
  const startIndex = source.indexOf(startMarker)

  if (startIndex === -1) {
    throw new Error(`Unable to locate start marker "${startMarker}" in phase markdown.`)
  }

  const contentStart = startIndex + startMarker.length
  const endIndex = endMarker ? source.indexOf(endMarker, contentStart) : source.length

  if (endMarker && endIndex === -1) {
    throw new Error(`Unable to locate end marker "${endMarker}" in phase markdown.`)
  }

  return source.slice(contentStart, endIndex === -1 ? source.length : endIndex).trim()
}

function normalizeParagraph(block: string): string {
  return stripInlineFormatting(
    block
    .replace(/^\s*-\s*/, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
  )
}

function simplifyChecklistItem(item: string): string {
  return item
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s*—\s*/g, ': ')
    .replace(/\s*→\s*/g, ' to ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractStanceLead(text: string): string {
  const boldMatch = text.match(/^\*\*(.+?)\*\*/)

  if (boldMatch) {
    return boldMatch[1].trim()
  }

  const plainText = stripInlineFormatting(text)
  const colonLead = plainText.split(':')[0]?.trim()

  if (colonLead && colonLead.length <= 40) {
    return colonLead
  }

  return ''
}

function inferDoneTitle(description: string): string {
  const plain = stripInlineFormatting(description).replace(/\.$/, '').trim()
  const separators = [
    /\s+reliably\b/i,
    /\s+are\b/i,
    /\s+is\b/i,
    /\s+has\b/i,
    /\s+have\b/i,
    /\s+loads\b/i,
    /\s+load\b/i,
    /\s+exists\b/i,
    /\s+exist\b/i,
  ]

  let endIndex = plain.length

  for (const pattern of separators) {
    const match = pattern.exec(plain)
    if (match && match.index < endIndex) {
      endIndex = match.index
    }
  }

  const title = plain.slice(0, endIndex).replace(/^The\s+/i, '').trim()
  return title || 'Completion Criteria'
}

function stripInlineFormatting(text: string): string {
  return text
    .replace(/\{\{accent:([^}]+)\}\}/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
}

function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
}

function numberWord(count: number): string {
  const words: Record<number, string> = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
  }

  return words[count] ?? `${count}`
}

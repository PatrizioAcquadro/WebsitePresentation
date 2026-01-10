export const roadmapContent = `# Comprehensive Project Roadmap: EO-1 Replication for Bimanual LEGO Assembly

## Project Overview

| Parameter | Value |
|-----------|-------|
| **Start Date** | January 10, 2026 |
| **Target Completion** | April 4, 2026 (Week 13) |
| **Total Duration** | ~12-13 weeks |
| **Primary Goal** | Replicate EO-1 SOTA for bimanual LEGO assembly in simulation with sim-to-real readiness |
| **Compute Resources** | 8x NVIDIA A100 GPUs |
| **Future Hardware** | Unitree H1 humanoid, Franka Panda (teleoperation) |

---

## Task Classification Legend

| Tag | Meaning | Description |
|-----|---------|-------------|
| **[HUMAN-CRITICAL]** | Requires deep human reasoning | Architecture decisions, research direction choices, paper interpretation, debugging complex issues |
| **[AGENT-ASSISTED]** | AI coding agents with human oversight | Implementation with clear specs, refactoring, testing, documentation |
| **[AGENT-DELEGABLE]** | Routine implementation AI can handle | Boilerplate code, data processing scripts, config files, standard integrations |

---

## Phase Overview

| Phase | Duration | Dates |
|-------|----------|-------|
| Phase 0: Foundation & Setup | Week 1-2 | Jan 10 - Jan 24 |
| Phase 1: Simulation Environment | Week 2-4 | Jan 17 - Feb 7 |
| Phase 2: Data Pipeline | Week 3-5 | Jan 24 - Feb 14 |
| Phase 3: Model Architecture | Week 4-6 | Jan 31 - Feb 21 |
| Phase 4: Training Infrastructure | Week 5-7 | Feb 7 - Feb 28 |
| Phase 5: Training Execution | Week 7-10 | Feb 21 - Mar 21 |
| Phase 6: Evaluation & Benchmarking | Week 9-11 | Mar 7 - Mar 28 |
| Phase 7: Fine-tuning Experiments | Week 10-12 | Mar 14 - Apr 4 |
| Phase 8: Sim-to-Real Preparation | Week 11-13 | Mar 21 - Apr 4 |

---

## Phase 0: Foundation & Setup
**Duration:** Week 1-2 (Jan 10 - Jan 24)
**Goal:** Environment setup, literature deep-dive, detailed technical planning

### Week 1 (Jan 10 - Jan 17)

#### 0.1 Development Environment Setup
**[AGENT-DELEGABLE]** - 2 days

| Task | Deliverable |
|------|-------------|
| Set up GPU cluster access and job scheduler | Working SLURM/PBS scripts |
| Install CUDA, cuDNN, PyTorch 2.x | Verified GPU training capability |
| Configure DeepSpeed ZeRO-1 | Multi-GPU training test |
| Set up experiment tracking (W&B/MLflow) | Experiment logging working |
| Configure version control and project structure | Git repo with CI/CD |

#### 0.2 Literature Deep Dive
**[HUMAN-CRITICAL]** - 5 days (ongoing)

| Task | Deliverable |
|------|-------------|
| Study EO-1 paper in detail (architecture, training, data) | Annotated notes, implementation questions |
| Study pi0/pi0.5 as reference | Comparative analysis notes |
| Understand flow matching theory | Mathematical understanding document |
| Review Qwen 2.5 VL architecture | VLM backbone familiarity |
| Study interleaved training methodology | Training recipe understanding |

---

## Phase 1: Simulation Environment
**Duration:** Week 2-4 (Jan 17 - Feb 7)
**Goal:** Complete LEGO assembly simulation environment with bimanual robot

#### 1.1 Robot Model Integration
**[AGENT-ASSISTED]** - 4 days

| Task | Deliverable |
|------|-------------|
| Import/create bimanual robot URDF/MJCF | Working robot model in sim |
| Configure joint limits, dynamics parameters | Physically accurate robot |
| Set up gripper models (parallel jaw or similar) | Functional grippers |
| Verify kinematics match target (H1-compatible) | Kinematics validation report |

#### 1.2 LEGO Environment Creation
**[AGENT-ASSISTED]** - 5 days

| Task | Deliverable |
|------|-------------|
| Create LEGO block models (2x2, 2x4, 2x6 bricks) | Accurate LEGO meshes with studs |
| Configure stud/tube contact physics | Blocks that connect realistically |
| Create baseplate and workspace | Complete assembly environment |
| Add multiple camera viewpoints | Multi-view rendering |
| Implement block spawning and reset | Episode management |

---

## Phase 2: Data Pipeline
**Duration:** Week 3-5 (Jan 24 - Feb 14)
**Goal:** Generate training data including interleaved vision-text-action sequences

#### 2.1 Robot Trajectory Data Generation
**[AGENT-DELEGABLE]** - 5 days

| Task | Deliverable |
|------|-------------|
| Generate 10K scripted demonstration episodes | Base trajectory dataset |
| Implement parallel data collection | Efficient data generation |
| Add failure cases and recovery demonstrations | Failure trajectory dataset |
| Quality control and filtering | Cleaned dataset |

#### 2.2 VLM-Based Annotation Pipeline
**[HUMAN-CRITICAL]** - 4 days

| Task | Deliverable |
|------|-------------|
| Design annotation schema (following EO-Data1.5M) | Annotation specification |
| Set up VLM for trajectory annotation (GPT-4V/Qwen-VL) | Annotation system |
| Generate task descriptions and reasoning QA | Language annotations |
| Validate annotation quality | Quality metrics |

#### 2.3 Interleaved Data Construction
**[HUMAN-CRITICAL]** - 5 days

| Task | Deliverable |
|------|-------------|
| Implement interleaved sequence construction (following EO-1) | Interleaved data generator |
| Create temporal reasoning data (task planning, verification) | Temporal reasoning subset |
| Create spatial reasoning data (trajectory prediction, grounding) | Spatial reasoning subset |
| Create free chatting format data | Mixed format subset |

---

## Phase 3: Model Architecture
**Duration:** Week 4-6 (Jan 31 - Feb 21)
**Goal:** Implement EO-1 architecture with modifications for LEGO task

#### 3.1 VLM Backbone Integration
**[AGENT-ASSISTED]** - 4 days

| Task | Deliverable |
|------|-------------|
| Load Qwen 2.5 VL pretrained weights | Working VLM backbone |
| Configure tokenizer and visual encoder | Tokenization pipeline |
| Verify VLM inference works | VLM sanity check |
| Profile memory usage on A100 | Memory characterization |

#### 3.2 Action Head Implementation
**[HUMAN-CRITICAL]** - 5 days

| Task | Deliverable |
|------|-------------|
| Implement flow matching action head | Flow matching module |
| Implement robot state projector | State embedding module |
| Implement noisy action projector | Action embedding module |
| Configure action chunk size (16) | Chunked action generation |

---

## Phase 4: Training Infrastructure
**Duration:** Week 5-7 (Feb 7 - Feb 28)
**Goal:** Complete, correct training pipeline (even if not run to completion)

#### 4.1 Loss Function Implementation
**[HUMAN-CRITICAL]** - 3 days

| Task | Deliverable |
|------|-------------|
| Implement autoregressive loss for text | Cross-entropy loss module |
| Implement flow matching loss for actions | Flow matching loss module |
| Implement combined loss with balancing | Combined training objective |
| Verify loss computation on sample batches | Loss sanity checks |

#### 4.2 Distributed Training Setup
**[AGENT-DELEGABLE]** - 3 days

| Task | Deliverable |
|------|-------------|
| Configure 8-GPU training scripts | Multi-GPU training working |
| Implement proper distributed sampling | Correct data sharding |
| Test distributed checkpointing | Distributed save/load |
| Profile training throughput | Throughput benchmarks |

---

## Phase 5: Training Execution
**Duration:** Week 7-10 (Feb 21 - Mar 21)
**Goal:** Execute training at scale, monitor and adjust

#### 5.1 Initial Training Run
**[HUMAN-CRITICAL]** - 7 days (monitoring)

| Task | Deliverable |
|------|-------------|
| Launch full training on 8xA100 | Training in progress |
| Monitor loss curves and metrics | Continuous monitoring |
| Identify and fix early issues | Issue resolution log |
| Adjust hyperparameters if needed | Tuned hyperparameters |

#### 5.2 Continued Training with Adjustments
**[HUMAN-CRITICAL]** - 10 days

| Task | Deliverable |
|------|-------------|
| Continue training with any necessary adjustments | Improved training run |
| Implement curriculum learning if beneficial | Curriculum schedule |
| Save multiple checkpoints for evaluation | Checkpoint library |
| Document training decisions | Training decision log |

---

## Phase 6: Evaluation & Benchmarking
**Duration:** Week 9-11 (Mar 7 - Mar 28)
**Goal:** Comprehensive evaluation on LEGO tasks and standard benchmarks

#### 6.1 LEGO Task Evaluation
**[AGENT-ASSISTED]** - 5 days

| Task | Deliverable |
|------|-------------|
| Evaluate on all LEGO task configurations | Task success rates |
| Measure precision and efficiency metrics | Detailed metrics |
| Analyze bimanual coordination quality | Coordination analysis |
| Document failure modes | Failure taxonomy |

#### 6.2 LIBERO Benchmark Evaluation
**[AGENT-DELEGABLE]** - 3 days

| Task | Deliverable |
|------|-------------|
| Set up LIBERO benchmark environment | LIBERO running |
| Evaluate model on all 4 suites | LIBERO scores |
| Compare against reported EO-1 numbers | Comparison analysis |

#### 6.3 Ablation Studies
**[HUMAN-CRITICAL]** - 5 days

| Task | Deliverable |
|------|-------------|
| Ablate interleaved vs standard training | Ablation results |
| Ablate flow matching vs autoregressive actions | Action head comparison |
| Ablate action chunk sizes | Chunk size analysis |
| Document findings | Ablation report |

---

## Phase 7: Fine-tuning Experiments
**Duration:** Week 10-12 (Mar 14 - Apr 4)
**Goal:** Understand fine-tuning dynamics and task adaptation

#### 7.1 Task-Specific Fine-tuning
**[HUMAN-CRITICAL]** - 5 days

| Task | Deliverable |
|------|-------------|
| Fine-tune on specific LEGO kit | Specialized model |
| Compare pretrained vs fine-tuned | Fine-tuning effectiveness |
| Analyze catastrophic forgetting | Forgetting analysis |
| Document optimal fine-tuning recipe | Fine-tuning guidelines |

#### 7.2 Few-Shot Adaptation Experiments
**[HUMAN-CRITICAL]** - 4 days

| Task | Deliverable |
|------|-------------|
| Test with 10, 50, 100 demonstrations | Few-shot learning curves |
| Compare to training from scratch | Data efficiency analysis |
| Identify minimum data requirements | Data requirement guidelines |

---

## Phase 8: Sim-to-Real Preparation
**Duration:** Week 11-13 (Mar 21 - Apr 4)
**Goal:** Prepare for future real-robot deployment on Unitree H1

#### 8.1 Sim-to-Real Gap Analysis
**[HUMAN-CRITICAL]** - 3 days

| Task | Deliverable |
|------|-------------|
| Document all simulation simplifications | Gap analysis document |
| Identify critical transfer risks | Risk prioritization |
| Plan domain randomization extensions | DR improvement plan |
| Estimate real-world performance | Transfer prediction |

#### 8.2 H1 Action Space Mapping
**[HUMAN-CRITICAL]** - 3 days

| Task | Deliverable |
|------|-------------|
| Document H1 kinematic structure | H1 specification document |
| Design action space mapping (sim -> H1) | Mapping specification |
| Identify embodiment differences | Embodiment gap analysis |
| Plan adaptation strategy | H1 adaptation plan |

#### 8.3 Project Documentation and Handoff
**[AGENT-DELEGABLE]** - 3 days

| Task | Deliverable |
|------|-------------|
| Complete code documentation | Documented codebase |
| Write project report | Technical report |
| Create reproduction instructions | README and guides |
| Package trained models and data | Shareable artifacts |

---

## Risk Registry

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| EO-1 code not fully available | Medium | High | Early verification, use pi0 as reference |
| Training exceeds 8xA100 capacity | Medium | High | Careful memory profiling, ZeRO optimization |
| LEGO contact physics simulation fails | Medium | Medium | Test early, compare to real blocks |
| Poor sim-to-real transfer | High | Medium | Extensive domain randomization |
| Training doesn't converge | Low | Critical | Monitor early, verify implementation |
| Interleaved data quality issues | Medium | High | Manual quality checks |
| Timeline slippage | Medium | Medium | Buffer in schedule, parallel work |

---

## Milestones and Checkpoints

| Week | Milestone | Key Deliverable | Go/No-Go Criteria |
|------|-----------|-----------------|-------------------|
| **2** | Environment Ready | Simulation running, LEGO physics working | Scripted policy >50% success |
| **4** | Data Ready | 10K trajectories + interleaved data | Data loads correctly, formats verified |
| **6** | Model Ready | Full architecture implemented, forward pass works | Inference produces reasonable actions |
| **7** | Training Ready | Complete pipeline verified on small scale | Loss decreases on mini-training |
| **9** | Training Checkpoint | Midpoint training evaluation | >50% LEGO success, loss stabilized |
| **11** | Evaluation Complete | Full benchmark results | Performance characterized, documented |
| **13** | Project Complete | Documentation, models, code packaged | Reproducible, ready for next phase |

---

## Resource Allocation

### Compute Usage Plan

| Phase | GPU-Hours Estimate | Purpose |
|-------|-------------------|---------|
| Phase 0-3 | ~500 | Development, testing |
| Phase 4 | ~200 | Training infrastructure verification |
| Phase 5 | ~3000-4000 | Main training (~2-3 weeks on 8xA100) |
| Phase 6-7 | ~800 | Evaluation, ablations, fine-tuning |
| **Total** | ~4500-5500 | ~4-5 weeks of continuous 8xA100 usage |

### Storage Requirements

| Data Type | Estimated Size | Storage Location |
|-----------|----------------|------------------|
| Trajectory data | ~500GB-1TB | Fast storage (SSD) |
| Pretrained weights | ~50GB | Local + backup |
| Checkpoints | ~200GB | Regular backups |
| Logs and metrics | ~50GB | W&B cloud |

---

## Success Criteria

### Minimum Viable Outcome (Week 13)
- Complete, documented training pipeline (runnable if not fully trained)
- Model achieving >50% on simple LEGO tasks in simulation
- LIBERO benchmark evaluation completed
- Comprehensive documentation of approach and findings

### Target Outcome (Week 13)
- Model achieving >70% on LEGO tasks across difficulty levels
- Competitive LIBERO scores (within 10% of reported EO-1)
- Generalization testing completed
- Fine-tuning experiments completed
- Sim-to-real readiness documented

### Stretch Goals
- >85% LEGO task success
- Match or exceed EO-1 LIBERO numbers
- Preliminary dual-system extension implemented
- Real-robot demonstration (if H1/Franka available early)

---

## Weekly Focus Summary

| Week | Dates | Primary Focus | Key Human-Critical Tasks |
|------|-------|---------------|--------------------------|
| 1 | Jan 10-17 | Setup + Literature | Paper study, codebase exploration |
| 2 | Jan 17-24 | Simulation begin | Technical planning, architecture decisions |
| 3 | Jan 24-31 | Simulation + Data | Task definition, interleaved data design |
| 4 | Jan 31-Feb 7 | Data + Architecture | Data pipeline, VLM integration |
| 5 | Feb 7-14 | Architecture | Flow matching implementation, rectifying sampling |
| 6 | Feb 14-21 | Training infra | Loss functions, training validation |
| 7 | Feb 21-28 | Training begins | Monitor training, adjust hyperparameters |
| 8 | Feb 28-Mar 7 | Training continues | Training analysis, intermediate evaluation |
| 9 | Mar 7-14 | Training + Eval begins | LEGO evaluation, generalization testing |
| 10 | Mar 14-21 | Evaluation + Fine-tuning | Ablations, fine-tuning experiments |
| 11 | Mar 21-28 | Fine-tuning + Sim2Real | Few-shot experiments, gap analysis |
| 12 | Mar 28-Apr 4 | Wrap-up | H1 planning, documentation |
| 13 | Apr 4-11 | Buffer | Overflow, final documentation |

---

This roadmap provides a complete, executable plan for the 13-week project. Adjust timelines and priorities based on early findings and professor guidance.
`

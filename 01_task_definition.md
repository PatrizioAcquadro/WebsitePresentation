# Task Definition & Analysis: Bimanual LEGO Assembly

## 1. Task Overview

### 1.1 Core Task Specification
**Objective:** Develop a Vision-Language-Action (VLA) system capable of performing bimanual LEGO assembly tasks using a robotic torso with two arms.

| Parameter | Specification |
|-----------|---------------|
| **Block Count** | 5-10 LEGO blocks per assembly |
| **Kit Variety** | Multiple distinct assembly configurations |
| **Embodiment** | Robotic torso + 2 arms (bimanual) |
| **Target Hardware** | Unitree H1 humanoid (future deployment) |
| **Development Approach** | Simulation-first, then sim-to-real transfer |

### 1.2 Input Modalities
The VLA system receives three primary input streams:

1. **Textual Task Instructions**
   - Natural language descriptions of assembly goals (e.g., "Build the 2x4 red brick tower")
   - Step-by-step guidance when required
   - Potentially ambiguous or underspecified instructions requiring reasoning

2. **Visual Observations**
   - Multi-view camera images (workspace, gripper-mounted, third-person)
   - RGB images with potential depth information
   - Real-time state of the assembly workspace

3. **Proprioceptive State**
   - Joint positions and velocities for both arms
   - End-effector poses (position + orientation)
   - Gripper state (open/close, force feedback)
   - Robot base/torso orientation

### 1.3 Output Space (Action Representation)
Following the EO-1 paradigm, actions are represented as:
- **Action chunks**: Sequences of h=16 actions per prediction
- **Continuous action space**: 7-DoF per arm × 2 arms + gripper states
- **Control frequency**: Target 10-50 Hz depending on task phase

---

## 2. Task Decomposition

### 2.1 Atomic Skills Required

| Skill Category | Specific Skills | Bimanual Requirement |
|----------------|-----------------|----------------------|
| **Perception** | Block detection, pose estimation, assembly state recognition | Single/Dual |
| **Grasping** | Precision grasp of LEGO blocks (various sizes) | Single |
| **Manipulation** | Block insertion, alignment, pressing | Often Dual |
| **Coordination** | Handover, simultaneous stabilization, sequential operations | Dual |
| **Verification** | Connection verification, error detection | Single/Dual |

### 2.2 Bimanual Coordination Modes

1. **Asymmetric Bimanual**
   - One arm stabilizes (anchor), other manipulates
   - Example: Left arm holds partial assembly, right arm inserts new block

2. **Symmetric Bimanual**
   - Both arms perform similar/mirrored actions
   - Example: Simultaneously pressing two blocks to secure connection

3. **Sequential Handover**
   - Block transfer between end-effectors
   - Example: Right arm picks from bin, hands to left arm for placement

4. **Coordinated Motion**
   - Both arms move together while maintaining relative pose
   - Example: Repositioning the partial assembly together

### 2.3 Task Hierarchy

```
Level 0: Complete Assembly
    └── Level 1: Sub-assemblies
            └── Level 2: Block Placement Operations
                    └── Level 3: Atomic Motor Primitives
                            └── Level 4: Joint-level Actions
```

**Example Decomposition (Simple 4-Block Tower):**
```
Build Tower
├── Place Block 1 (foundation)
│   ├── Locate block in bin
│   ├── Grasp block
│   ├── Transport to base plate
│   └── Release and verify connection
├── Place Block 2
│   ├── Locate block in bin
│   ├── Grasp block
│   ├── Align with Block 1 studs
│   ├── Insert (press down)
│   └── Verify connection
└── [Repeat for Blocks 3, 4...]
```

---

## 3. Key Challenges

### 3.1 Perception Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Fine-grained pose estimation** | LEGO studs are 4.8mm apart; requires sub-millimeter accuracy | High |
| **Occlusion handling** | Arms, hands, and blocks frequently occlude workspace | High |
| **Color/shape disambiguation** | Similar block shapes with different colors | Medium |
| **Partial assembly state** | Recognizing assembly progress from visual observation | Medium |
| **Sim-to-real visual gap** | Simulated textures/lighting vs. real-world appearance | High |

### 3.2 Manipulation Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Precision insertion** | LEGO connections require ~0.1mm alignment tolerance | Critical |
| **Force-sensitive assembly** | Too little force: blocks don't connect; too much: damage | High |
| **Grasp stability** | Small blocks can slip or rotate during transport | Medium |
| **Contact-rich dynamics** | Complex multi-body contact during insertion | High |
| **Sim-to-real dynamics gap** | Simulated contact/friction vs. real-world behavior | Critical |

### 3.3 Coordination Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Bimanual synchronization** | Coordinating two arms without collision | High |
| **Role allocation** | Deciding which arm performs which sub-task | Medium |
| **Workspace sharing** | Both arms operate in overlapping workspace | High |
| **Collision avoidance** | Self-collision and arm-arm collision | High |

### 3.4 Reasoning Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Assembly order planning** | Determining valid block placement sequences | Medium |
| **Error detection** | Recognizing misaligned or unconnected blocks | High |
| **Recovery planning** | Corrective actions after failed insertions | High |
| **Instruction grounding** | Mapping natural language to specific blocks/locations | Medium |
| **Long-horizon reasoning** | Maintaining goal across 10+ block sequence | High |

### 3.5 Sim-to-Real Specific Challenges

| Challenge | Description | Mitigation Strategy |
|-----------|-------------|---------------------|
| **Visual domain gap** | Rendering artifacts, lighting differences | Domain randomization, texture augmentation |
| **Dynamics mismatch** | Contact physics, friction coefficients | System identification, dynamics randomization |
| **Sensor noise** | Clean sim sensors vs. noisy real sensors | Noise injection during training |
| **Latency differences** | Sim runs synchronously; real-world has delays | Action prediction with temporal modeling |
| **LEGO-specific physics** | Stud/tube interference fit dynamics | Careful contact model tuning |

---

## 4. Success Metrics and Evaluation Criteria

### 4.1 Primary Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Task Success Rate** | % of assemblies completed correctly | >85% |
| **Block Placement Accuracy** | % of blocks placed in correct position/orientation | >95% |
| **Connection Quality** | % of blocks properly seated (not loose) | >98% |

### 4.2 Efficiency Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Completion Time** | Time from start to verified completion | Baseline TBD |
| **Attempt Efficiency** | Successful placements / total attempts | >90% |
| **Recovery Rate** | % of errors successfully corrected | >70% |

### 4.3 Generalization Metrics

| Metric | Definition | Evaluation Method |
|--------|------------|-------------------|
| **Kit Generalization** | Performance on unseen assembly configurations | Hold-out kit designs |
| **Block Generalization** | Performance with novel block colors/sizes | Test with OOD blocks |
| **Instruction Generalization** | Performance with rephrased/novel instructions | Paraphrase test set |
| **Visual Generalization** | Performance under lighting/background changes | Domain shift evaluation |

### 4.4 Robustness Metrics

| Metric | Definition | Evaluation Method |
|--------|------------|-------------------|
| **Perturbation Tolerance** | Success after workspace perturbations | Introduce disturbances |
| **Noise Robustness** | Performance with sensor noise injection | Controlled noise tests |
| **Failure Detection Rate** | Ability to identify unsuccessful actions | Manual annotation |

### 4.5 Sim-to-Real Transfer Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Zero-shot Transfer** | Real-world performance without real fine-tuning | >50% of sim performance |
| **Few-shot Adaptation** | Performance with ≤50 real demonstrations | >80% of sim performance |
| **Transfer Efficiency** | Real demos needed to match sim performance | <100 demonstrations |

---

## 5. Evaluation Protocol

### 5.1 Simulation Evaluation

**Environment Setup:**
- Standardized workspace layout
- Fixed camera positions (reproducible)
- Consistent initial block configurations per episode

**Test Suite Structure:**
```
├── Complexity Levels
│   ├── Simple (3-4 blocks, linear stacking)
│   ├── Medium (5-7 blocks, 2D patterns)
│   └── Complex (8-10 blocks, 3D structures)
├── Generalization Tests
│   ├── Novel kits (hold-out designs)
│   ├── Novel instructions (paraphrased)
│   └── Visual variations (lighting, backgrounds)
└── Robustness Tests
    ├── Perturbation recovery
    └── Noise injection
```

### 5.2 Benchmark Comparisons

**Existing Benchmarks to Consider:**
- **LIBERO**: Long-horizon manipulation benchmark (adapt for LEGO)
- **SimplerEnv**: Google robot simulation benchmark
- **RoboTwin**: Bimanual manipulation benchmark (CVPR 2025)

**Custom LEGO Benchmark Suite:**
- Design 10-20 standardized assembly tasks
- Include difficulty progression
- Document failure modes for analysis

### 5.3 Real-World Evaluation (Future)

**Protocol:**
- 10 trials per task configuration
- Blind evaluation (no hyperparameter tuning between trials)
- Video recording for failure analysis
- Standardized success/failure criteria

---

## 6. Data Requirements

### 6.1 Simulation Data Generation

| Data Type | Estimated Volume | Purpose |
|-----------|------------------|---------|
| **Scripted demonstrations** | 10K-50K episodes | Skill learning initialization |
| **RL exploration data** | 100K+ episodes | Policy optimization |
| **Failure cases** | 5K-10K episodes | Recovery policy training |
| **Augmented variations** | 10× base data | Domain randomization |

### 6.2 Real-World Data (If Teleoperation Used)

| Data Type | Estimated Volume | Purpose |
|-----------|------------------|---------|
| **Expert demonstrations** | 100-500 episodes | Few-shot fine-tuning |
| **Correction data** | 50-100 episodes | Recovery behavior learning |

### 6.3 Data Format (Following EO-1)

```
Episode Structure:
├── Observations
│   ├── images: [multi_view_images × T timesteps]
│   ├── robot_state: [joint_positions, velocities, gripper_state]
│   └── language: task instruction string
├── Actions
│   ├── action_chunks: [16 × action_dim] per step
│   └── action_dim: 14 (7-DoF × 2 arms) + 2 (grippers)
└── Metadata
    ├── task_id, success_flag, timestamps
    └── annotation: sub-task labels (optional)
```

---

## 7. Hardware Compatibility Considerations

### 7.1 Simulation-to-Hardware Mapping

| Simulation Entity | Unitree H1 Equivalent | Notes |
|-------------------|----------------------|-------|
| Dual 7-DoF arms | H1 arm configuration | Verify DoF matching |
| Parallel grippers | H1 end-effectors | May need gripper adaptation |
| Torso pose | H1 base | Limited mobility assumed |
| Camera setup | External + wrist cameras | Plan camera mounting |

### 7.2 Action Space Design

Design action space to be compatible with:
1. **Simulation training**: Isaac Sim / MuJoCo representation
2. **Unitree H1 deployment**: ROS 2 interface, joint position/velocity control
3. **Franka Panda (if used for teleoperation)**: Standard 7-DoF with gripper

**Recommended Action Space:**
- Joint positions (relative or absolute) for each arm
- Gripper commands (continuous 0-1 or binary)
- Optionally: end-effector pose commands with IK

---

## 8. Summary

The bimanual LEGO assembly task represents a challenging benchmark for VLA systems, requiring:
- **Precision perception**: Sub-millimeter accuracy for stud alignment
- **Dexterous manipulation**: Contact-rich assembly operations
- **Bimanual coordination**: Complex arm synchronization
- **Reasoning capabilities**: Assembly planning and error recovery
- **Robust sim-to-real transfer**: Bridging the reality gap

This task is well-suited for evaluating the EO-1 framework due to its:
- Long-horizon nature (matching EO-1's interleaved reasoning design)
- Requirement for embodied reasoning (assembly state understanding)
- Bimanual requirements (EO-1 demonstrated on AgiBot dual-arm)
- Sim-to-real challenges (critical for practical deployment)

The simulation-first approach with careful domain randomization and the EO-1's hybrid action generation (flow matching for precise continuous control) are well-aligned with the task requirements.

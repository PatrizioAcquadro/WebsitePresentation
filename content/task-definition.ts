export const taskDefinitionContent = `# Task Definition & Analysis: Bimanual LEGO Assembly

## 1. Task Overview

### 1.1 Core Task Specification
**Objective:** Develop a Vision-Language-Action (VLA) system capable of performing bimanual LEGO assembly tasks using a robotic torso with two arms.

| Parameter | Specification |
|-----------|---------------|
| **Block Count** | 5-10 LEGO blocks per assembly |
| **Kit Variety** | Multiple distinct assembly configurations |
| **Embodiment** | Robotic torso + 2 arms (bimanual) |
| **Target Hardware** | IHMC Alex humanoid (future deployment) |
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
- **Continuous action space**: 7-DoF per arm x 2 arms + gripper states
- **Control frequency**: Target 10-50 Hz depending on task phase

---

## 2. Task Motivation

### 2.1 Current Landscape Limitations

Despite significant advances in robotic manipulation, several critical gaps persist in the current state-of-the-art:

**Limited Bimanual Capabilities**
- Most VLA models focus on single-arm manipulation tasks
- Bimanual coordination remains underexplored, particularly in scenarios requiring dynamic role allocation
- Existing benchmarks (LIBERO, RT-X) predominantly feature unimanual tasks

**Insufficient Precision Requirements**
- Common manipulation tasks (pick-and-place, pushing, drawer opening) tolerate centimeter-level accuracy
- Fine-grained assembly requiring sub-millimeter precision is rarely evaluated
- Contact-rich dynamics with tight tolerances remain challenging for learned policies

**Shallow Reasoning Demands**
- Many benchmark tasks are single-step or short-horizon (< 5 steps)
- Assembly tasks requiring long-horizon planning (10+ steps) with sequential dependencies are scarce
- Error detection and recovery capabilities are not systematically evaluated

**Sim-to-Real Transfer Challenges**
- High-fidelity simulation of contact-rich assembly (LEGO connections) is difficult
- Reality gap for precise manipulation tasks remains a critical bottleneck
- Limited validation on physical humanoid platforms

### 2.2 Why LEGO Assembly?

The bimanual LEGO assembly task addresses these gaps by providing:

1. **Bimanual Necessity**: Unlike artificial bimanual tasks, LEGO assembly naturally requires two hands for stabilization during insertion, making it an ecologically valid benchmark

2. **Precision Benchmark**: LEGO studs (4.8mm spacing, ~0.1mm tolerance) provide objective, measurable precision requirements that expose model limitations

3. **Long-Horizon Complexity**: Multi-block assemblies require sequential planning, state tracking, and error recovery across extended episodes

4. **Verifiable Success**: Binary connection states (connected/loose) enable unambiguous success evaluation, unlike subjective task completion criteria

5. **Humanoid Relevance**: LEGO assembly is a quintessential human bimanual task, making it ideal for evaluating humanoid robot capabilities (e.g., IHMC Alex)

6. **Sim-to-Real Testbed**: Standardized LEGO geometry enables systematic study of sim-to-real transfer for contact-rich manipulation

### 2.3 Research Opportunities

This task creates opportunities to advance:
- **Bimanual coordination policies** with dynamic role allocation
- **Precision manipulation** through vision-based fine alignment
- **Long-horizon reasoning** in VLA architectures
- **Contact-rich simulation** fidelity for assembly tasks
- **Robust sim-to-real transfer** methodologies

---

## 3. Task Decomposition

### 3.1 Atomic Skills Required

| Skill Category | Specific Skills | Bimanual Requirement |
|----------------|-----------------|----------------------|
| **Perception** | Block detection, pose estimation, assembly state recognition | Single/Dual |
| **Grasping** | Precision grasp of LEGO blocks (various sizes) | Single |
| **Manipulation** | Block insertion, alignment, pressing | Often Dual |
| **Coordination** | Handover, simultaneous stabilization, sequential operations | Dual |
| **Verification** | Connection verification, error detection | Single/Dual |

### 3.2 Bimanual Coordination Modes

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

---

## 4. Key Challenges

### 4.1 Perception Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Fine-grained pose estimation** | LEGO studs are 4.8mm apart; requires sub-millimeter accuracy | High |
| **Occlusion handling** | Arms, hands, and blocks frequently occlude workspace | High |
| **Color/shape disambiguation** | Similar block shapes with different colors | Medium |
| **Partial assembly state** | Recognizing assembly progress from visual observation | Medium |
| **Sim-to-real visual gap** | Simulated textures/lighting vs. real-world appearance | High |

### 4.2 Manipulation Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Precision insertion** | LEGO connections require ~0.1mm alignment tolerance | Critical |
| **Force-sensitive assembly** | Too little force: blocks don't connect; too much: damage | High |
| **Grasp stability** | Small blocks can slip or rotate during transport | Medium |
| **Contact-rich dynamics** | Complex multi-body contact during insertion | High |
| **Sim-to-real dynamics gap** | Simulated contact/friction vs. real-world behavior | Critical |

### 4.3 Coordination Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Bimanual synchronization** | Coordinating two arms without collision | High |
| **Role allocation** | Deciding which arm performs which sub-task | Medium |
| **Workspace sharing** | Both arms operate in overlapping workspace | High |
| **Collision avoidance** | Self-collision and arm-arm collision | High |

### 4.4 Reasoning Challenges

| Challenge | Description | Severity |
|-----------|-------------|----------|
| **Assembly order planning** | Determining valid block placement sequences | Medium |
| **Error detection** | Recognizing misaligned or unconnected blocks | High |
| **Recovery planning** | Corrective actions after failed insertions | High |
| **Instruction grounding** | Mapping natural language to specific blocks/locations | Medium |
| **Long-horizon reasoning** | Maintaining goal across 10+ block sequence | High |

---

## 5. Success Metrics and Evaluation Criteria

### 5.1 Primary Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Task Success Rate** | % of assemblies completed correctly | >85% |
| **Block Placement Accuracy** | % of blocks placed in correct position/orientation | >95% |
| **Connection Quality** | % of blocks properly seated (not loose) | >98% |

### 5.2 Efficiency Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Completion Time** | Time from start to verified completion | Baseline TBD |
| **Attempt Efficiency** | Successful placements / total attempts | >90% |
| **Recovery Rate** | % of errors successfully corrected | >70% |

### 5.3 Generalization Metrics

| Metric | Definition | Evaluation Method |
|--------|------------|-------------------|
| **Kit Generalization** | Performance on unseen assembly configurations | Hold-out kit designs |
| **Block Generalization** | Performance with novel block colors/sizes | Test with OOD blocks |
| **Instruction Generalization** | Performance with rephrased/novel instructions | Paraphrase test set |
| **Visual Generalization** | Performance under lighting/background changes | Domain shift evaluation |

---

## 6. Summary

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
`

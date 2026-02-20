export const limitationsContent = `# Limitations, Problems & Future Directions

## Scope
This document analyzes limitations and research opportunities specifically at the intersection of:
- **The SOTA model**: EO-1's architecture and training methodology
- **The target task**: Bimanual LEGO assembly with sim-to-real transfer
- **Research interest**: Cross-action-space learning and embodiment transfer

---

## 1. EO-1-Specific Limitations for LEGO Assembly

### 1.1 Acknowledged Limitations (from EO-1 Paper)

| Limitation | Impact on LEGO Task | Severity |
|------------|---------------------|----------|
| **Out-of-Action-Domain generalization struggles with limited data** | New LEGO configurations may fail without extensive simulation data | High |
| **Complex scenarios not fully addressed** | Failure recovery, obstacle avoidance mid-assembly | Medium |
| **Human-robot interaction unexplored** | Collaborative assembly scenarios not possible | Low (not required) |
| **Navigation not covered** | Not applicable to tabletop LEGO task | N/A |

### 1.2 Architectural Limitations

#### 1.2.1 Single-System Latency
**Problem:** EO-1's unified architecture runs at ~100ms per action chunk, which may be insufficient for:
- Force-sensitive insertion requiring real-time feedback
- Reactive catching when blocks slip
- High-frequency contact adjustments

**Impact on LEGO Task:**
- Block insertion requires feeling when studs engage (~10-50ms reaction time ideal)
- Current architecture may "commit" to insertion trajectory before receiving contact feedback

**Potential Solutions:**
1. Dual-system extension (see Document 02)
2. Increase action chunk frequency with reduced denoising steps
3. Add low-level force controller outside VLA loop

#### 1.2.2 Fixed Action Chunk Size
**Problem:** 16-step chunks are fixed regardless of task phase.

**Impact on LEGO Task:**
- Coarse transport phases could use longer chunks (efficiency)
- Precision insertion phases need finer control
- Mismatch may cause suboptimal behavior in either phase

**Potential Solutions:**
1. Variable chunk size based on task phase detection
2. Hierarchical action generation (coarse -> fine)
3. Phase-aware training with different chunk sizes

#### 1.2.3 Interleaved Data Dependency
**Problem:** EO-1's strong performance relies on interleaved vision-text-action data, which must be carefully constructed.

**Impact on LEGO Task:**
- No existing LEGO-specific interleaved data
- Manual construction is expensive and requires domain expertise
- Simulation-generated data may have distribution mismatch

---

## 2. Task-Specific Unsolved Problems

### 2.1 Precision Manipulation Problems

#### 2.1.1 Sub-Millimeter Alignment
**Problem:** LEGO studs are 4.8mm apart with ~0.1mm tolerance for proper connection.

**Current SOTA Gap:**
- Most VLA evaluations use larger objects (vegetables, kitchen items)
- Reported positioning accuracy typically in 1-5mm range
- No standardized benchmark for sub-millimeter tasks

**Research Opportunity:** Develop precision manipulation benchmarks and architectures that achieve 0.1mm accuracy.

#### 2.1.2 Contact-Rich Dynamics
**Problem:** LEGO insertion involves complex contact physics:
- Initial contact detection
- Stud-tube interference fit
- Multi-point snap connection
- Tactile feedback interpretation

**Current SOTA Gap:**
- Most VLA training uses visual observation only
- Force/tactile sensing rarely integrated
- Simulation contact physics may not match reality

**Research Opportunity:** Integrate tactile sensing into VLA framework, develop contact-aware action generation.

### 2.2 Bimanual Coordination Problems

#### 2.2.1 Dynamic Role Allocation
**Problem:** Optimal arm roles change during assembly:
- Sometimes symmetric (both pressing)
- Sometimes asymmetric (one holds, one inserts)
- Handover between arms

**Current SOTA Gap:**
- Most bimanual VLAs (including EO-1 demos) show fixed role patterns
- Dynamic role switching mid-task not well studied
- No principled way to learn role allocation

**Research Opportunity:** Develop role allocation mechanisms, possibly through language-conditioned coordination.

#### 2.2.2 Collision-Free Coordinated Motion
**Problem:** Two arms in shared workspace must avoid:
- Self-collision
- Arm-arm collision
- Collision with assembly

**Current SOTA Gap:**
- VLAs don't explicitly model collision constraints
- Learned policies may occasionally collide
- Safety-critical for real robots

**Research Opportunity:** Integrate differentiable collision checking into action generation or post-processing.

### 2.3 Long-Horizon Reasoning Problems

#### 2.3.1 Assembly Order Planning
**Problem:** 10-block assembly has many valid orderings, but some are:
- Mechanically infeasible (can't insert block due to obstruction)
- Suboptimal (requires more arm movements)
- Stability-dependent (structure may topple mid-assembly)

**Current SOTA Gap:**
- VLAs typically follow demonstrated orderings
- Limited evidence of generalization to novel orderings
- No explicit planning module in most architectures

**Research Opportunity:** Integrate symbolic/geometric reasoning for assembly planning with VLA execution.

#### 2.3.2 Error Detection and Recovery
**Problem:** Failed block placements require:
- Detecting failure (visual or force-based)
- Diagnosing cause (misalignment, insufficient force, wrong block)
- Planning recovery (remove and retry, adjust position)

**Current SOTA Gap:**
- EO-1 shows some failure detection in benchmarks
- Autonomous recovery without human intervention is rare
- Multi-step recovery sequences are unexplored

**Research Opportunity:** Train explicit error detection heads, develop recovery sub-policies.

---

## 3. Cross-Action-Space Learning

### 3.1 The Problem Definition

**Cross-action-space learning** refers to the ability to transfer manipulation policies across robots with different:
- **Degrees of freedom** (7-DoF arm vs. 6-DoF arm vs. humanoid)
- **Kinematic structure** (serial vs. parallel, different link lengths)
- **End-effector types** (parallel gripper vs. dexterous hand vs. suction)
- **Control interfaces** (position vs. velocity vs. torque control)

### 3.2 Why This Matters for LEGO Task

| Training Setting | Deployment Setting | Transfer Challenge |
|------------------|--------------------|--------------------|
| Simulated dual 7-DoF arms | IHMC Alex arms | Different kinematics |
| Generic parallel grippers | Alex end-effectors | Different grasping |
| Simulated proprioception | Real sensor noise | Observation space |
| Any sim robot | Franka Panda (teleoperation) | Action space mapping |

### 3.3 Gaps Relevant to LEGO Task

| Gap | Description | Impact |
|-----|-------------|--------|
| **No zero-shot cross-embodiment** | All methods need some target data | Alex deployment requires real demos |
| **Action space abstraction unclear** | No consensus on universal action representation | Sim-to-real may not generalize |
| **Precision not preserved** | Transfer methods trade accuracy for generality | LEGO insertion accuracy may degrade |
| **Bimanual coordination transfer** | Single-arm transfer studied more than bimanual | Coordination patterns may not transfer |

### 3.4 Research Opportunities

#### 3.4.1 Task-Space Action Representation
**Hypothesis:** Representing actions in task space (end-effector pose, contact forces) rather than joint space enables better transfer.

**Relevance to LEGO:** If we train with task-space actions (gripper pose relative to block), may transfer better to Alex.

#### 3.4.2 Morphology-Aware Encoders
**Hypothesis:** Encoding robot morphology explicitly enables better generalization.

**Relevance to LEGO:** Could enable training on multiple sim robots and zero-shot Alex transfer.

#### 3.4.3 Skill-Level Transfer
**Hypothesis:** High-level skills (grasp, insert, release) transfer better than low-level actions.

**Relevance to LEGO:** "Insert block" skill may transfer across embodiments better than trajectory.

---

## 4. Sim-to-Real Transfer Problems

### 4.1 Visual Domain Gap

| Gap Source | LEGO-Specific Manifestation | Severity |
|------------|----------------------------|----------|
| **Textures** | LEGO plastic appearance vs. rendered materials | High |
| **Lighting** | Sharp shadows on blocks, reflections on studs | High |
| **Colors** | Precise color matching for block identification | Medium |
| **Backgrounds** | Real workspace clutter vs. clean sim environment | Medium |

### 4.2 Dynamics Domain Gap

| Gap Source | LEGO-Specific Manifestation | Severity |
|------------|----------------------------|----------|
| **Contact physics** | Stud engagement snap dynamics | Critical |
| **Friction** | Block sliding behavior during manipulation | High |
| **Mass/inertia** | Accurate block physics for natural motion | Medium |
| **Compliance** | Arm/gripper flexibility effects | Medium |

### 4.3 Proprioception Gap

| Gap Source | LEGO-Specific Manifestation | Severity |
|------------|----------------------------|----------|
| **Sensor noise** | Joint encoder noise affecting precision | High |
| **Latency** | Control loop delays | High |
| **Calibration** | End-effector position errors | High |

---

## 5. Promising Research Directions Summary

### 5.1 High-Priority Directions for This Project

| Direction | Relevance to LEGO Task | Feasibility (3-month scope) |
|-----------|------------------------|----------------------------|
| **Precision manipulation benchmarks** | Directly measures success | High (can create custom) |
| **Automated interleaved data generation** | Enables EO-1 replication | High (simulation-based) |
| **Error detection heads** | Critical for assembly reliability | Medium (requires annotation) |
| **Task-space action representation** | Enables sim-to-real and cross-embodiment | Medium (architectural change) |

### 5.2 Medium-Priority Directions

| Direction | Relevance | Feasibility |
|-----------|-----------|-------------|
| **Dual-system extension** | Improves reactivity for insertion | Medium (after baseline) |
| **Dynamics randomization for LEGO** | Improves sim-to-real | Medium (sim engineering) |
| **Variable action chunks** | Task-phase optimization | Medium (training change) |

### 5.3 Long-Term Research Directions

| Direction | Relevance | Notes |
|-----------|-----------|-------|
| **Tactile integration in VLA** | Could transform insertion precision | Requires hardware |
| **Zero-shot cross-embodiment** | Alex deployment without demos | Fundamental research |
| **Symbolic planning + VLA** | Complex assembly reasoning | Hybrid architecture |

---

## 6. Summary

### Key Takeaways

1. **EO-1 is strong but not perfect for LEGO**
   - Latency may limit precision insertion
   - Requires task-specific interleaved data
   - Compute constraints limit full replication

2. **Bimanual LEGO assembly pushes VLA limits**
   - Sub-millimeter precision rarely evaluated
   - Contact-rich dynamics not well modeled
   - Error recovery is an open problem

3. **Cross-action-space learning is underexplored**
   - No zero-shot cross-embodiment solution exists
   - Task-space representations are promising
   - Dual-system naturally separates embodiment-specific parts

4. **Sim-to-real gap is LEGO-specific**
   - Stud engagement physics are critical
   - Visual precision for color/pose matters
   - Domain randomization is necessary but may not be sufficient

### Recommendation

Use EO-1 as baseline while documenting its limitations on LEGO task. This positions the project for:
1. Clear baseline comparison with future improvements
2. Publication opportunity on LEGO-specific VLA evaluation
3. Research contribution on cross-action-space or dual-system extension
`

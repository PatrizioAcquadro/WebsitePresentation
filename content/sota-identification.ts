export const sotaContent = `# SOTA Identification & Selection for Bimanual LEGO Assembly

## 1. Executive Summary

**Primary Recommendation: EO-1 (October 2025)**

After comprehensive analysis of current VLA models, **EO-1** emerges as the optimal baseline for replication due to:
1. **State-of-the-art performance** across simulation and real-world benchmarks
2. **Unified architecture** enabling seamless reasoning-to-action integration
3. **Demonstrated bimanual capability** (AgiBot G-1 experiments)
4. **Hybrid action generation** (flow matching for precision + autoregressive for reasoning)
5. **Open resources** (code, data pipeline, model weights)

---

## 2. Comprehensive VLA Landscape (January 2026)

### 2.1 Leading VLA Models Comparison

| Model | Organization | Parameters | Action Decoding | Bimanual | Open Source | Key Strength |
|-------|--------------|------------|-----------------|----------|-------------|--------------|
| **EO-1** | Shanghai AI Lab | 3B | Hybrid (AR + Flow) | Yes | Yes | Interleaved reasoning |
| **pi0** | Physical Intelligence | ~3B | Flow Matching | Limited | Yes (Jan 2025) | Dexterity at 50Hz |
| **pi0.5** | Physical Intelligence | ~3B | Flow + FAST | Limited | Yes (Sept 2025) | Open-world generalization |
| **OpenVLA-OFT** | Stanford/Berkeley | 7B | Autoregressive | Yes (2025) | Yes | Community adoption |
| **GR00T N1** | NVIDIA | N/A | Dual-system (Diffusion) | Humanoid | Partial | Humanoid-specific |
| **Helix** | Figure AI | N/A | Dual-system | Humanoid | No | Dexterous humanoid |

### 2.2 Benchmark Performance Summary

**LIBERO (Simulation - Long-Horizon Manipulation):**

| Model | Spatial | Object | Goal | Long | Overall |
|-------|---------|--------|------|------|---------|
| OpenVLA | 84.7% | 88.4% | 79.2% | 53.7% | 76.5% |
| pi0 | 96.8% | 98.8% | 95.8% | 85.2% | 94.2% |
| OpenVLA-OFT | 97.6% | 98.4% | 97.9% | 94.5% | 97.1% |
| **EO-1** | **99.7%** | **99.8%** | **99.2%** | **94.8%** | **98.2%** |

**Real-World Generalization:**

| Model | Visual Gen. | Language Gen. | Action Gen. | Overall |
|-------|-------------|---------------|-------------|---------|
| pi0 | 54% | 52% | 46% | 51% |
| GR00T-N1.5 | 63% | 67% | 51% | 60% |
| **EO-1** | **72%** | **79%** | **67%** | **73%** |

---

## 3. Why EO-1 for LEGO Assembly

### 3.1 Architecture Alignment with Task Requirements

| LEGO Task Requirement | EO-1 Capability | Alignment |
|-----------------------|-----------------|-----------|
| Precision manipulation | Flow matching for continuous actions | Excellent |
| Long-horizon assembly | Interleaved reasoning maintains goal | Excellent |
| Bimanual coordination | Demonstrated on AgiBot G-1 dual-arm | Good |
| Error detection/recovery | Unified reasoning + action in single model | Excellent |
| Instruction following | Strong language generalization (+23% boost) | Excellent |
| Sim-to-real transfer | Validated on multiple platforms | Good |

### 3.2 Key EO-1 Advantages for This Project

1. **Unified Reasoning-Action Model**
   - No separation between "thinking" and "acting"
   - Naturally handles "check if block is connected" -> "apply more pressure" loops
   - Critical for error detection and recovery in LEGO assembly

2. **Hybrid Action Generation**
   - Flow matching avoids discretization artifacts in precise manipulation
   - 16-step action chunks enable smooth trajectories
   - 10 denoising steps balance quality vs. latency

3. **Interleaved Training Format**
   - Explicitly designed for temporal reasoning
   - Handles multi-step sequences with intermediate verification
   - Matches LEGO assembly's natural structure

4. **Demonstrated Bimanual Capability**
   - AgiBot G-1 experiments include:
     - Fold Household Clothes: 87%
     - Make Breakfast Sandwich: 85%
     - Sort Grocery Items: 95%
   - Similar coordination complexity to LEGO assembly

5. **Practical Reproducibility**
   - 3B parameters trainable on 8x A100s with DeepSpeed ZeRO-1
   - 6GB inference memory (single RTX 4090)
   - Open checkpoints and training code

---

## 4. Component-by-Component Analysis

### 4.1 Base VLM Selection

| Option | Parameters | Pros | Cons | Recommendation |
|--------|------------|------|------|----------------|
| **Qwen 2.5 VL** (EO-1 default) | 3B/7B | Strong visual grounding, proven in EO-1 | Requires Chinese institution access | **Primary choice** |
| **PaliGemma** (pi0 default) | 3B | Google backing, pi0 proven | Less embodied-specific pretraining | Alternative |
| **InternVL 2.5** | 2B-8B | Open weights, strong benchmarks | Less VLA validation | Alternative |

### 4.2 Action Representation

| Approach | Models Using It | Pros | Cons | For LEGO Task |
|----------|-----------------|------|------|---------------|
| **Hybrid (AR + Flow)** | EO-1 | Best of both worlds, unified model | Complex training | **Recommended** |
| **Flow Matching** | pi0, pi0.5 | Smooth, high-frequency actions | Separate action expert needed | Good alternative |
| **Diffusion** | GR00T N1, Octo | Proven for dexterity | Slower inference | Viable |
| **Autoregressive** | OpenVLA, RT-2 | Simple, leverages LLM training | Discretization limits precision | Not recommended |

### 4.3 Action Chunking Strategy

| Strategy | Chunk Size | Frequency | Trade-off |
|----------|------------|-----------|-----------|
| **EO-1 Default** | 16 steps | ~10 Hz effective | Balance of reactivity and smoothness |
| **pi0 Approach** | Variable | 50 Hz | Higher dexterity, more compute |
| **Longer Chunks** | 32+ steps | ~5 Hz | Smoother but less reactive |

---

## 5. Implementation Decisions Summary

### 5.1 Core Architecture Decisions

| Component | Decision | Rationale |
|-----------|----------|-----------|
| **Base VLM** | Qwen 2.5 VL (3B) | EO-1 proven, fits 8xA100 |
| **Action Decoding** | Hybrid AR + Flow Matching | Precision for LEGO insertion |
| **Action Chunks** | 16 steps, 10 denoising iterations | EO-1 default, validated |
| **Training** | Interleaved vision-text-action | Key to EO-1's generalization |

### 5.2 Data Pipeline Decisions

| Component | Decision | Rationale |
|-----------|----------|-----------|
| **Simulation** | Isaac Sim/Lab primary | GPU-accelerated, H1 compatible |
| **Robot Data** | OXE subset + simulated LEGO | Balance diversity and task-specificity |
| **Interleaved Data** | Generate LEGO-specific | Critical for embodied reasoning |
| **Data Augmentation** | Domain randomization | Sim-to-real robustness |

### 5.3 Training Pipeline Decisions

| Component | Decision | Rationale |
|-----------|----------|-----------|
| **Optimizer** | DeepSpeed ZeRO-1 | Fits 3B model on 8xA100 |
| **Sequence Length** | 16,384 (variable packing) | Follow EO-1 recipe |
| **Training Stages** | Pre-train -> Task-specific fine-tune | Flexibility for experimentation |

---

## 6. Summary and Recommendation

### Primary Recommendation

**Replicate EO-1** with the following customizations for LEGO assembly:

1. **Architecture**: Follow EO-1 exactly (Qwen 2.5 VL + hybrid heads)
2. **Data**: Generate LEGO-specific interleaved vision-text-action data in simulation
3. **Training**: Use EO-1's recipe, scaled to 8xA100 capability
4. **Evaluation**: LIBERO + custom LEGO benchmark suite
5. **Dual-System**: Defer to Phase 2 after baseline validation

### Key Success Factors

- Faithful replication of interleaved training (not standard VQA + action)
- Proper flow matching implementation for action generation
- Sufficient domain randomization in simulation
- LEGO-specific embodied reasoning data (assembly state, error detection)

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| EO-1 code inaccessible | Use open pi0.5 + add reasoning capability |
| Training exceeds compute | Use reduced sequence length or model pruning |
| Sim-to-real gap too large | Increase domain randomization, add real demos |
| Bimanual coordination fails | Integrate TwinVLA insights |
`

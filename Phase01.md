# Roadmap
## Phase 0: Foundation & Setup
**Duration:** 01/16-01/22

### 0.1 Development Environment Setup
**Goal:** make all future work “push-button” (reproducible runs, stable multi-GPU, fast  
debugging).

GPU cluster access + job scheduler (SLURM/PBS)  
**Why:** ensures repeatable, queued, resource-correct experiments later.  
**Checklist:**  
● Access to GPU partitions/queues (limits, max runtime, quotas, multi-node policy).  
● Standardize core environment variables (CUDA/NCCL, HF cache, dataset paths,  
log/checkpoint dirs).  
● Create working job templates:  
1. 1×GPU smoke job  
2. multi-GPU (1 node) job  
3. multi-node job  

**Milestone:** submitted job starts, writes logs, produces a checkpoint in the expected location.

Install CUDA, cuDNN, PyTorch 2.x:  
**Why:** eliminates cluster failures (while locally works) and ABI/version mismatch issues.  
**Checklist:**  
● Lock compatible versions (driver-CUDA-PyTorch) and pin dependencies.  
● Container (Apptainer/Docker) for reproducibility.  
● Micro-training test (dummy model/data) and save a checkpoint.  

**Milestone:** single-GPU forward/backward is stable and the produced checkpoint reloads.

Configure DeepSpeed ZeRO-1: fundamental for model’s training on the 8 A100  
**Why:** feasibility of EO-1 training on 8×A100 (prevent OOM/training-exceeds-capability).  
**Checklist**  
● Create a ZeRO-1 config and launch template.  
● Micro-training test on multi-GPU, to verify stability  

**Milestone:** multi-GPU run completes N steps, logs metrics, produces reloadable checkpoint.

Experiment tracking (W&B / MLflow)  
**Why:** standard logging for easier debugging (if training breaks/diverges/other errors).  
**Checklist:**  
● Losses: total, AR (autoregressive), FM (flow matching)  
● LR, grad norm, AMP scaler (if used)  
● GPU utilization/memory + throughput  
● Seed, git commit hash, full run config (stored as an artifact)  
● Checkpoints  

**Milestone:** cluster run in dashboard with metrics + artifacts, and naming/tags are consistent.

Configure version control-project structure with CI/CD:  
- Setting the project repo (local => github): sim, data, models, train, eval, configs,  
scripts, tests, docs  
- Config to launch experiment (for later scalability)  
- Config git: main, features branch, tags for milestones  
- Automatic fast checks (unit/smoke) at each push/PR => to block subtle and dumb  
bugs (avoid error explosion at some point)  
- Build container/hash export  

Version control + repo structure + CI/CD (operational hygiene)  
**Why:** prevents subtle regressions, keeps main runnable, enables safe iteration.  
**Checklist:**  
● (Min) Repo structure: sim/ data/ models/ train/ eval/ configs/ scripts/ tests/ docs/  
● Config-first execution: no hardcoded paths/hparams; all runs in versioned configs.  
● Git policy: main, feature branches, milestone tags (wrt roadmap checkpoints).  
● CI (fast, CPU-only) on every PR/push:  
○ lint/format  
○ unit tests (config parsing, dataset loader on tiny sample, shape invariants)  
○ smoke test (imports + dry-run entrypoint)  
● CD: build container so runs are reproducible across time.  

**Milestone:** Every PR triggers fast checks; main stays green; one-cmd dry-run entrypoint.
``` :contentReference[oaicite:0]{index=0}

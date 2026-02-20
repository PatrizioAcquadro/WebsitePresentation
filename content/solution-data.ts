// ============ Solution Narrative ============

export const solutionHeadline = 'Our Approach'

export const solutionNarrative = [
  'We resolved the gaps identified above by combining EO-1, a SOTA VLA with interleaved reasoning and continuous action generation, with bimanual LEGO assembly as a precision-demanding benchmark, deployed on the Unitree H1 through a simulation-first pipeline.',
  'EO-1\'s unified architecture processes language instructions, visual observations, and proprioceptive state in a single forward pass, interleaving reasoning tokens with continuous flow-matched actions. This eliminates the plan-execute gap that cripples modular systems, while its 16-step action chunks generate bimanual trajectories at the control frequencies contact-rich assembly demands.',
  'LEGO assembly serves as the ideal evaluation substrate: it requires sub-millimeter precision, forces genuine bimanual coordination (one hand must always anchor), and produces objectively verifiable success metrics because every stud either connects or it does not.',
]

export const diagramCaption =
  'System architecture: multimodal inputs are processed by the EO-1 unified transformer, which interleaves language reasoning with flow-matched action generation. 16-step action chunks drive both arms in the MuJoCo simulation environment, with observations feeding back for closed-loop control.'

// ============ Diagram Layout Data ============

export interface DiagramBox {
  id: string
  label: string
  sublabel?: string
  x: number
  y: number
  width: number
  height: number
  type: 'input' | 'model' | 'submodule' | 'output' | 'environment'
}

export interface DiagramArrow {
  from: string
  to: string
  label?: string
  type: 'data' | 'action' | 'feedback'
}

export const diagramBoxes: DiagramBox[] = [
  // Inputs column
  { id: 'text-input', label: 'Language', sublabel: 'Instructions', x: 30, y: 55, width: 130, height: 52, type: 'input' },
  { id: 'vision-input', label: 'Visual', sublabel: 'Observations', x: 30, y: 125, width: 130, height: 52, type: 'input' },
  { id: 'proprio-input', label: 'Proprioceptive', sublabel: 'State', x: 30, y: 195, width: 130, height: 52, type: 'input' },

  // Central model
  { id: 'eo1-model', label: 'EO-1', sublabel: 'Qwen 2.5 VL  (3B)', x: 240, y: 40, width: 230, height: 222, type: 'model' },

  // Submodules inside model
  { id: 'lang-head', label: 'Language Head', sublabel: 'Autoregressive', x: 260, y: 140, width: 90, height: 56, type: 'submodule' },
  { id: 'flow-head', label: 'Flow Head', sublabel: 'Continuous Actions', x: 360, y: 140, width: 90, height: 56, type: 'submodule' },

  // Outputs column
  { id: 'action-chunks', label: 'Action Chunks', sublabel: 'h = 16 steps', x: 550, y: 55, width: 130, height: 52, type: 'output' },
  { id: 'left-arm', label: 'Left Arm', sublabel: '7-DoF + Gripper', x: 550, y: 125, width: 130, height: 52, type: 'output' },
  { id: 'right-arm', label: 'Right Arm', sublabel: '7-DoF + Gripper', x: 550, y: 195, width: 130, height: 52, type: 'output' },

  // Environment
  { id: 'environment', label: 'MuJoCo Sim', sublabel: 'Unitree H1', x: 750, y: 100, width: 140, height: 100, type: 'environment' },
]

export const diagramArrows: DiagramArrow[] = [
  // Inputs → Model
  { from: 'text-input', to: 'eo1-model', type: 'data' },
  { from: 'vision-input', to: 'eo1-model', type: 'data' },
  { from: 'proprio-input', to: 'eo1-model', type: 'data' },

  // Model → Outputs
  { from: 'eo1-model', to: 'action-chunks', type: 'action' },
  { from: 'eo1-model', to: 'left-arm', type: 'action' },
  { from: 'eo1-model', to: 'right-arm', type: 'action' },

  // Outputs → Environment
  { from: 'left-arm', to: 'environment', type: 'action' },
  { from: 'right-arm', to: 'environment', type: 'action' },

  // Feedback loop
  { from: 'environment', to: 'vision-input', label: 'Observations', type: 'feedback' },
]

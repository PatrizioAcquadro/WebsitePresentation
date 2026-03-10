export type PhaseDetailIconKey =
  | 'shield'
  | 'cube'
  | 'bolt'
  | 'grid'
  | 'camera'
  | 'refresh'
  | 'flask'
  | 'hand'
  | 'storage'
  | 'flow'
  | 'users'
  | 'warning'

export interface PhaseDetailDecision {
  label: string
  value: string
}

export interface PhaseDetailParagraphBlock {
  type: 'paragraph'
  text: string
}

export interface PhaseDetailListBlock {
  type: 'list'
  ordered: boolean
  items: string[]
}

export interface PhaseDetailTableBlock {
  type: 'table'
  headers: string[]
  rows: string[][]
}

export interface PhaseDetailCodeBlock {
  type: 'code'
  language?: string
  code: string
}

export type PhaseDetailContentBlock =
  | PhaseDetailParagraphBlock
  | PhaseDetailListBlock
  | PhaseDetailTableBlock
  | PhaseDetailCodeBlock

export interface PhaseDetailPanelSection {
  title: string
  blocks: PhaseDetailContentBlock[]
}

export interface PhaseDetailTask {
  label: string
  title: string
  description: string
  why: string
  checklist: string[]
  milestone: string
  icon: PhaseDetailIconKey
  detailSections?: PhaseDetailPanelSection[]
}

export interface PhaseDetailDoneItem {
  title: string
  description: string
}

export interface PhaseDetailExtraSection {
  title: string
  blocks: PhaseDetailContentBlock[]
}

export interface PhaseDetailData {
  backHref: string
  phaseLabel: string
  durationLabel: string
  title: string
  summary: string
  highlightTitle: string
  highlightBody: string
  fixedDecisionsTitle: string
  fixedDecisions: PhaseDetailDecision[]
  stanceTitle: string
  stanceIntro?: string
  stanceBullets: string[]
  tasksTitle: string
  tasksSubtitle: string
  tasks: PhaseDetailTask[]
  extraSections?: PhaseDetailExtraSection[]
  deliverablesIntro: string
  deliverables: string[]
  doneItems: PhaseDetailDoneItem[]
  estimatedDuration: string
}

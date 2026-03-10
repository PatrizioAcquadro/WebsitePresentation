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
  const matches = [...sectionSource.matchAll(/^##\s+([0-9.]+)\)\s+(.+)$/gm)]

  if (matches.length === 0) {
    throw new Error('Unable to parse task headings from phase markdown.')
  }

  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length
    const end = index + 1 < matches.length ? matches[index + 1].index ?? sectionSource.length : sectionSource.length
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
      label: match[1],
      title: match[2].trim(),
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
  const matches = [...sectionBody.matchAll(/^###\s+(.+)$/gm)]
  const sections = new Map<string, string>()

  matches.forEach((match, index) => {
    const start = (match.index ?? 0) + match[0].length
    const end = index + 1 < matches.length ? matches[index + 1].index ?? sectionBody.length : sectionBody.length
    sections.set(match[1].trim(), sectionBody.slice(start, end).trim())
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

function parseTopLevelSections(source: string): MarkdownHeadingSection[] {
  const matches = [...source.matchAll(/^#\s+(.+)$/gm)]
  const sections: MarkdownHeadingSection[] = []

  for (let index = 1; index < matches.length; index += 1) {
    const match = matches[index]
    const startIndex = match.index ?? 0
    const contentStart = startIndex + match[0].length
    const nextIndex = index + 1 < matches.length ? matches[index + 1].index ?? source.length : source.length

    sections.push({
      title: match[1].trim(),
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

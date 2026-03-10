'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type {
  PhaseDetailContentBlock,
  PhaseDetailData,
  PhaseDetailIconKey,
  PhaseDetailPanelSection,
} from '@/lib/roadmap/phase-detail-types'

interface PhaseDetailPageProps {
  detail: PhaseDetailData
}

function TaskIcon({ icon }: { icon: PhaseDetailIconKey }) {
  switch (icon) {
    case 'shield':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )
    case 'cube':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      )
    case 'bolt':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'grid':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      )
    case 'camera':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )
    case 'refresh':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      )
    case 'flask':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      )
    case 'hand':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
      )
    case 'storage':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 7a2 2 0 012-2h12a2 2 0 012 2M4 7v4m0-4v10a2 2 0 002 2h12a2 2 0 002-2V7M4 11h16M9 15h6"
          />
        </svg>
      )
    case 'flow':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 7h10M7 12h10M7 17h10M5 7h.01M5 12h.01M5 17h.01"
          />
        </svg>
      )
    case 'users':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-1a4 4 0 00-5-3.874M17 20H7m10 0v-1c0-.653-.125-1.277-.354-1.848M7 20H2v-1a4 4 0 015-3.874M7 20v-1c0-.653.125-1.277.354-1.848m0 0a5.002 5.002 0 019.292 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      )
    case 'warning':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.53 20h14.94a2 2 0 001.74-3.14l-7.47-13a2 2 0 00-3.45 0z"
          />
        </svg>
      )
  }
}

function renderContentBlock(block: PhaseDetailContentBlock, key: string) {
  if (block.type === 'paragraph') {
    return (
      <p key={key} className="text-[#BABABA] text-sm leading-relaxed">
        {block.text}
      </p>
    )
  }

  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul'

    return (
      <ListTag
        key={key}
        className={`${block.ordered ? 'list-decimal' : 'list-disc'} ml-5 space-y-2 text-sm text-[#BABABA]`}
      >
        {block.items.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ListTag>
    )
  }

  if (block.type === 'table') {
    return (
      <div
        key={key}
        className="overflow-x-auto rounded-xl border border-[#453027]/50 bg-[#161316]/80"
      >
        <table className="min-w-full text-sm">
          <thead className="bg-[#1d1a1d]">
            <tr>
              {block.headers.map((header) => (
                <th key={header} className="px-4 py-3 text-left font-medium text-white whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={`${key}-${rowIndex}`} className="border-t border-[#453027]/40">
                {row.map((cell, cellIndex) => (
                  <td key={`${key}-${rowIndex}-${cellIndex}`} className="px-4 py-3 text-[#BABABA] align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <pre
      key={key}
      className="overflow-x-auto rounded-xl border border-[#453027]/50 bg-[#161316]/80 p-4 text-xs text-[#BABABA]"
    >
      <code>{block.code}</code>
    </pre>
  )
}

function DetailPanel({ sections }: { sections: PhaseDetailPanelSection[] }) {
  return (
    <div className="mx-6 mb-6 rounded-xl border border-[#453027]/50 bg-[#161316]/70 p-5">
      <div className="space-y-5">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#FF6D29]" />
              <h4 className="text-sm font-semibold text-white">{section.title}</h4>
            </div>
            <div className="space-y-3 pl-4">
              {section.blocks.map((block, index) =>
                renderContentBlock(block, `${section.title}-${index}`)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PhaseDetailPage({ detail }: PhaseDetailPageProps) {
  return (
    <div className="pt-16 min-h-screen bg-[#161316]">
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href={detail.backHref}
            className="inline-flex items-center text-[#BABABA] hover:text-[#FF6D29] mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Roadmap
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#FF6D29]/10 border border-[#FF6D29]/30 rounded-lg text-[#FF6D29] text-sm font-medium">
                {detail.phaseLabel}
              </span>
              <span className="px-3 py-1 bg-[#453027]/30 border border-[#453027] rounded-lg text-[#BABABA] text-sm">
                {detail.durationLabel}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">{detail.title}</h1>

            <p className="text-lg text-[#BABABA] max-w-3xl mb-8">{detail.summary}</p>

            <div className="p-5 bg-gradient-to-r from-[#FF6D29]/10 to-transparent border-l-4 border-[#FF6D29] rounded-r-xl max-w-3xl">
              <h3 className="text-white font-semibold mb-2">{detail.highlightTitle}</h3>
              <p className="text-[#BABABA]">{detail.highlightBody}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-12 bg-[#1d1a1d]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              {detail.fixedDecisionsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {detail.fixedDecisions.map((decision) => (
                <div
                  key={decision.label}
                  className="p-4 bg-[#161316] border border-[#453027]/50 rounded-xl"
                >
                  <span className="text-[#BABABA] text-sm">{decision.label}</span>
                  <p className="text-white font-medium mt-1">{decision.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#FF6D29]/30 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">{detail.stanceTitle}</h2>
            </div>
            {detail.stanceIntro ? (
              <p className="text-[#BABABA] mb-4">{detail.stanceIntro}</p>
            ) : null}
            <ul className="space-y-2">
              {detail.stanceBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[#BABABA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D29] mt-2 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-white mb-3 text-center"
          >
            {detail.tasksTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#BABABA] text-center mb-12 max-w-2xl mx-auto"
          >
            {detail.tasksSubtitle}
          </motion.p>

          <div className="space-y-6">
            {detail.tasks.map((task, index) => (
              <motion.div
                key={task.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors"
              >
                <div className="p-6 border-b border-[#453027]/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] shrink-0">
                      <TaskIcon icon={task.icon} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#FF6D29] text-sm font-semibold">{task.label}</span>
                        <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                      </div>
                      <p className="text-[#BABABA]">{task.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white font-medium">Why This Matters</span>
                    </div>
                    <p className="text-[#BABABA] text-sm leading-relaxed pl-7">{task.why}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      <span className="text-white font-medium">Checklist</span>
                    </div>
                    <ul className="space-y-3 pl-7">
                      {task.checklist.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#BABABA]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#453027] mt-2 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="p-4 bg-[#FF6D29]/5 border border-[#FF6D29]/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                      <span className="text-[#FF6D29] font-semibold text-sm">Milestone</span>
                    </div>
                    <p className="text-white text-sm pl-7">{task.milestone}</p>
                  </div>
                </div>

                {task.detailSections ? <DetailPanel sections={task.detailSections} /> : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {detail.extraSections?.length ? (
        <div className="px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {detail.extraSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.blocks.map((block, blockIndex) =>
                    renderContentBlock(block, `${section.title}-${blockIndex}`)
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="px-4 py-12 bg-[#1d1a1d]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white">Key Deliverables</h2>
            </div>
            <p className="text-[#BABABA] mb-4">{detail.deliverablesIntro}</p>
            <ul className="space-y-3">
              {detail.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#BABABA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-16 bg-gradient-to-b from-[#161316] to-[#1d1a1d]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white">Definition of Done</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {detail.doneItems.map((item) => (
                <div key={item.title} className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50">
                  <h3 className="text-white font-medium mb-2">{item.title}</h3>
                  <p className="text-[#BABABA] text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#453027]/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[#BABABA] text-sm">Estimated Duration</span>
                  <p className="text-white font-semibold">{detail.estimatedDuration}</p>
                </div>
                <Link
                  href={detail.backHref}
                  className="px-6 py-3 bg-[#FF6D29] hover:bg-[#FF8F5A] text-white font-medium rounded-xl transition-colors"
                >
                  Back to Roadmap
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

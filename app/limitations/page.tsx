'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/task/SectionWrapper'
import {
  acknowledgedLimitations,
  architecturalLimitations,
  taskProblemCategories,
} from '@/content/limitations-data'

// Icons for architectural limitations
const LatencyIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ChunkIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
)

const DataIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
)

const architecturalIcons: Record<string, React.ReactNode> = {
  latency: <LatencyIcon />,
  'chunk-size': <ChunkIcon />,
  'interleaved-data': <DataIcon />,
}

export default function LimitationsPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-[#BABABA] hover:text-[#FF6D29] mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
            Limitations & Future Directions
          </h1>
          <p className="text-lg text-[#BABABA]">
            Known limitations, unsolved problems, and research opportunities
          </p>

          {/* Key areas */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-sm">Focus:</span>
              <span className="text-white ml-2">EO-1 Limitations</span>
            </div>
            <div className="px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-sm">Challenge:</span>
              <span className="text-white ml-2">Task-Specific Problems</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: EO-1 Limitations */}
      <section id="eo1-limitations" className="relative py-16 md:py-20 px-4 bg-[#161316]">
        {/* Gradient divider at top */}
        <div className="absolute top-0 left-0 right-0 h-px z-20 bg-gradient-to-r from-transparent via-[#FF6D29]/20 to-transparent" />

        {/* LEGO background image - positioned on right */}
        <div className="absolute right-[4%] top-[-2%] w-[440px] md:w-[493px] lg:w-[546px] h-[572px] md:h-[660px] pointer-events-none">
          <Image
            src="/lego.png"
            alt=""
            fill
            className="object-cover object-top opacity-[0.30]"
            priority
          />
          {/* Top fade (stronger) */}
          <div className="absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-b from-[#161316] via-[#161316]/80 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-[#161316] via-[#161316]/90 to-transparent" />
          {/* Left fade (stronger for content blend) */}
          <div className="absolute top-0 bottom-0 left-0 w-[50%] bg-gradient-to-r from-[#161316] via-[#161316]/80 to-transparent" />
          {/* Right fade */}
          <div className="absolute top-0 bottom-0 right-0 w-[25%] bg-gradient-to-l from-[#161316] to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
              EO-1-Specific Limitations
            </h2>
            <p className="text-[#BABABA] max-w-2xl">
              Understanding the constraints of EO-1&apos;s architecture is essential for adapting it to precision LEGO assembly.
              Recognizing these limitations early guides our research focus and informs design decisions for the bimanual manipulation pipeline.
            </p>
          </motion.div>

          {/* Acknowledged Limitations - Plain text format */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
              Acknowledged Limitations
            </h3>
            <p className="text-[#BABABA] mb-6 max-w-2xl">
              Known limitations from the EO-1 paper and their impact on LEGO assembly.
            </p>

            <div className="space-y-3.5 max-w-3xl">
              {acknowledgedLimitations.map((limitation, index) => (
                <motion.div
                  key={limitation.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-base md:text-lg text-white font-medium mb-1">
                    {limitation.title} <span className="text-[#BABABA]">({limitation.severity})</span>
                  </p>
                  <p className="text-sm md:text-base text-[#BABABA] leading-relaxed">
                    {limitation.impact}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Architectural Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 md:p-8 bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 text-center">
                Architectural Limitations
              </h3>
              <p className="text-[#BABABA] text-center mb-6 max-w-2xl mx-auto">
                Fundamental design constraints in EO-1 that affect LEGO assembly performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {architecturalLimitations.map((limitation, index) => (
                  <motion.div
                    key={limitation.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-[#161316] to-[#1d1a1d] border border-[#453027]/50 rounded-xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors flex flex-col"
                  >
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      {/* Header with icon */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] shrink-0">
                          {architecturalIcons[limitation.id]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base md:text-lg font-semibold text-white">
                            {limitation.title}
                          </h4>
                        </div>
                      </div>

                      {/* Problem */}
                      <p className="text-sm text-[#BABABA] mb-4 leading-relaxed">{limitation.problem}</p>

                      {/* Impact */}
                      <div className="mb-4 flex-1">
                        <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                          Impact on LEGO
                        </h5>
                        <ul className="space-y-1.5">
                          {limitation.impact.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#BABABA]">
                              <span className="text-[#FF6D29] leading-5 shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solutions */}
                      <div className="border-t border-[#453027]/50 pt-4 mt-auto">
                        <h5 className="text-sm font-semibold text-[#FF6D29] uppercase tracking-wider mb-2">
                          Potential Solutions
                        </h5>
                        <ul className="space-y-1.5">
                          {limitation.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#BABABA]">
                              <span className="text-[#FF6D29] leading-5 shrink-0">{idx + 1}.</span>
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Task-Specific Problems */}
      <SectionWrapper
        id="task-problems"
        title="Task-Specific Unsolved Problems"
        subtitle="Critical challenges unique to bimanual LEGO assembly that remain unsolved in current VLA research."
        variant="darker"
      >
        <div className="space-y-8">
          {taskProblemCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="p-6 md:p-8 bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl">
                {/* Category Header */}
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 text-center">
                  {category.title}
                </h3>
                <p className="text-[#BABABA] text-center mb-6 max-w-2xl mx-auto">
                  {category.subtitle}
                </p>

                {/* Problem Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.problems.map((problem, problemIndex) => (
                    <motion.div
                      key={problem.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: problemIndex * 0.1 }}
                      className="bg-gradient-to-br from-[#161316] to-[#1d1a1d] border border-[#453027]/50 rounded-xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors"
                    >
                      <div className="p-5 md:p-6">
                        {/* Problem Header */}
                        <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                          {problem.title}
                        </h4>
                        <p className="text-sm text-[#BABABA] mb-4 leading-relaxed">
                          {problem.description}
                        </p>

                        {/* SOTA Gaps */}
                        <div className="mb-4">
                          <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                            Current SOTA Gap
                          </h5>
                          <ul className="space-y-1.5">
                            {problem.sotaGaps.map((gap, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-[#BABABA]">
                                <span className="text-[#BABABA] leading-4 shrink-0">•</span>
                                <span>{gap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Research Opportunity */}
                        <div className="border-t border-[#453027]/50 pt-4">
                          <h5 className="text-xs font-semibold text-[#FF6D29] uppercase tracking-wider mb-2">
                            Research Opportunity
                          </h5>
                          <p className="text-sm text-[#BABABA]">{problem.researchOpportunity}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}

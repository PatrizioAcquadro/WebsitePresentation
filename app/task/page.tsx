'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/task/SectionWrapper'
import ProblemSection from '@/components/task/ProblemSection'
import LandscapeCard from '@/components/task/LandscapeCard'
import ArchitectureDiagram from '@/components/task/ArchitectureDiagram'
import {
  problemNarrative,
  challengeDimensions,
} from '@/content/problem-data'
import {
  landscapeIntro,
  manipulationApproaches,
} from '@/content/landscape-data'
import {
  solutionNarrative,
} from '@/content/solution-data'

export default function TaskPage() {
  return (
    <div className="pt-16">
      {/* ==================== HERO ==================== */}
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center text-[#BABABA] hover:text-[#FF6D29] mb-6 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-semibold text-white mb-4"
          >
            Bimanual LEGO Assembly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#BABABA] max-w-3xl mb-8 md:mb-10"
          >
            Why contact-rich bimanual manipulation is the frontier challenge,
            <br />
            how the field approaches it today, and our path forward
          </motion.p>

          {/* Key spec badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            <div className="px-3 md:px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-xs md:text-sm">Blocks:</span>
              <span className="text-white ml-2 text-sm md:text-base">5-10 per assembly</span>
            </div>
            <div className="px-3 md:px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-xs md:text-sm">Precision:</span>
              <span className="text-white ml-2 text-sm md:text-base">~0.1mm tolerance</span>
            </div>
            <div className="px-3 md:px-4 py-2 bg-[#453027]/30 border border-[#453027] rounded-lg">
              <span className="text-[#BABABA] text-xs md:text-sm">Target:</span>
              <span className="text-white ml-2 text-sm md:text-base">Unitree H1</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== SECTION 1: The Problem ==================== */}
      <SectionWrapper
        id="problem"
        title="The Problem: Bimanual Manipulation"
        variant="darker"
        compactWithoutSubtitle
      >
        {/* Opening narrative paragraphs */}
        <div className="mb-10 md:mb-12">
          {problemNarrative.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`text-base md:text-lg text-[#BABABA] leading-relaxed text-center ${
                index < problemNarrative.length - 1 ? 'mb-5' : ''
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Challenge Dimensions with integrated skills/modes */}
        <ProblemSection dimensions={challengeDimensions} />
      </SectionWrapper>

      {/* ==================== SECTION 2: The Landscape ==================== */}
      <SectionWrapper
        id="landscape"
        title="The Landscape"
        compactWithoutSubtitle
      >
        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-base md:text-lg text-[#BABABA] leading-relaxed text-center whitespace-pre-line mb-8 md:mb-10"
        >
          {landscapeIntro}
        </motion.p>

        {/* Approach cards — 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {manipulationApproaches.map((approach, index) => (
            <LandscapeCard key={approach.id} approach={approach} index={index} />
          ))}
        </div>
      </SectionWrapper>

      {/* ==================== SECTION 3: Our Solution ==================== */}
      <SectionWrapper
        id="solution"
        title="Our Solution"
        variant="darker"
        compactWithoutSubtitle
      >
        {/* First solution paragraph */}
        <div className="mb-8 md:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="text-base md:text-lg text-[#BABABA] leading-relaxed text-center"
          >
            {solutionNarrative[0]}
          </motion.p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-10 md:mb-12">
          <ArchitectureDiagram />
        </div>

        {/* Remaining solution paragraphs */}
        <div>
          {solutionNarrative.slice(1).map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`text-base md:text-lg text-[#BABABA] leading-relaxed text-center ${
                index < solutionNarrative.slice(1).length - 1 ? 'mb-5' : ''
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}

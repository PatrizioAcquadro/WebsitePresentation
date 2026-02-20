'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import SectionWrapper from '@/components/task/SectionWrapper'
import FeatureCarousel from '@/components/sota/FeatureCarousel'
import PerformanceTable from '@/components/sota/PerformanceTable'
import GroupedBarChart from '@/components/sota/GroupedBarChart'
import AnalysisSubsection from '@/components/sota/AnalysisSubsection'
import {
  heroData,
  whyEO1Narrative,
  keyFeatures,
  liberoBenchmark,
  embodimentsChart,
  generalizationTable,
  dexterityChart,
  analysisSections,
} from '@/content/sota-data'
import {
  inputModalities,
  outputSpace,
} from '@/content/task-definition-data'

// Icons for input modalities
const TextIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const VisionIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const SensorIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
)

const inputModalityIcons: Record<string, React.ReactNode> = {
  text: <TextIcon />,
  vision: <VisionIcon />,
  proprioception: <SensorIcon />,
}

export default function SotaPage() {
  return (
    <div className="pt-16">
      {/* ==================== HERO ==================== */}
      <div className="relative bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 md:py-20 px-4">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
              {heroData.title}
            </h1>
            <p className="text-lg text-[#BABABA] max-w-3xl">
              {heroData.subtitle}
            </p>

            {/* Key badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {heroData.badges.map((badge) => (
                <div
                  key={badge.label}
                  className="px-4 py-2.5 bg-[#453027]/30 border border-[#453027] rounded-xl hover:border-[#FF6D29]/30 transition-colors"
                >
                  <span className="text-[#BABABA] text-sm">{badge.label}:</span>
                  <span className="text-white font-medium ml-2">{badge.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== SECTION 0: VLA Models ==================== */}
      <SectionWrapper
        id="vla-models"
        title="VLA Models"
        subtitle="The objective is to develop a Vision-Language-Action system capable of performing bimanual LEGO assembly tasks using a robotic torso with two arms. The system will handle 5-10 LEGO blocks per assembly across multiple distinct configurations, targeting the Unitree H1 humanoid robot through a simulation-first approach with subsequent sim-to-real transfer."
      >
        {/* Input Modalities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 text-center">Input Modalities</h3>
            <p className="text-[#BABABA] text-center mb-6 max-w-2xl mx-auto">
              The VLA system receives three primary input streams to understand and interact with the environment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {inputModalities.map((modality) => (
                <div
                  key={modality.id}
                  className="bg-gradient-to-br from-[#161316] to-[#1d1a1d] border border-[#453027]/50 rounded-xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors"
                >
                  <div className="p-5 md:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] shrink-0">
                        {inputModalityIcons[modality.id]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base md:text-lg font-semibold text-white mb-1">{modality.title}</h4>
                        <p className="text-[#BABABA] text-sm">{modality.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 border-t border-[#453027]/50 pt-4">
                      {modality.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#BABABA]">
                          <span className="text-[#FF6D29] leading-5 shrink-0">&bull;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Output Space */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 md:p-8 bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 text-center">Output Space</h3>
            <p className="text-[#BABABA] text-center mb-6 max-w-2xl mx-auto">
              Following the EO-1 paradigm, our action representation bridges discrete reasoning with continuous motor control, enabling both high-level planning and precise manipulation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50 text-center hover:border-[#FF6D29]/30 transition-colors">
                <div className="text-[#FF6D29] text-sm font-medium mb-2">Action Chunks</div>
                <div className="text-white text-sm">{outputSpace.actionChunks}</div>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50 text-center hover:border-[#FF6D29]/30 transition-colors">
                <div className="text-[#FF6D29] text-sm font-medium mb-2">Continuous Space</div>
                <div className="text-white text-sm">{outputSpace.continuousSpace}</div>
              </div>
              <div className="p-4 bg-[#161316] rounded-xl border border-[#453027]/50 text-center hover:border-[#FF6D29]/30 transition-colors">
                <div className="text-[#FF6D29] text-sm font-medium mb-2">Control Frequency</div>
                <div className="text-white text-sm">{outputSpace.controlFrequency}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* ==================== SECTION 1: The Optimal Foundation ==================== */}
      <section id="why-eo1" className="relative py-16 md:py-20 px-4 bg-[#161316]">
        {/* Gradient divider at top - matching other section dividers */}
        <div className="absolute top-0 left-0 right-0 h-px z-20 bg-gradient-to-r from-transparent via-[#FF6D29]/20 to-transparent" />

        {/* Soft orange haze/bloom background effect */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary orange bloom - top right */}
          <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-[#FF6D29]/[0.03] rounded-full blur-[120px]" />
          {/* Secondary subtle bloom - center */}
          <div className="absolute top-[30%] right-[30%] w-[400px] h-[400px] bg-[#FF6D29]/[0.02] rounded-full blur-[100px]" />
          {/* Tertiary warm accent - lower */}
          <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-[#FF6D29]/[0.015] rounded-full blur-[80px]" />
        </div>

        {/* Robot background image - positioned slightly above section top */}
        <div className="absolute right-[4%] top-[-2%] w-[500px] md:w-[560px] lg:w-[620px] h-[650px] md:h-[750px] pointer-events-none">
          {/* Robot image */}
          <Image
            src="/robot.png"
            alt=""
            fill
            className="object-cover object-top opacity-[0.30]"
            priority
          />
          {/* Bottom fade-out gradient - overlays the image */}
          <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-[#161316] via-[#161316]/90 to-transparent" />
          {/* Left fade for smooth blend with text */}
          <div className="absolute top-0 bottom-0 left-0 w-[40%] bg-gradient-to-r from-[#161316] to-transparent" />
          {/* Right fade for smooth edge */}
          <div className="absolute top-0 bottom-0 right-0 w-[25%] bg-gradient-to-l from-[#161316] to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section title - left-aligned with text block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6 md:mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              The Optimal Foundation
            </h2>
          </motion.div>

          {/* Hero text block - widened to ~700px (just past mid-screen) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="max-w-2xl lg:max-w-[700px]">
              <p className="text-[#BABABA] text-base md:text-lg leading-relaxed">
                {whyEO1Narrative}
              </p>
            </div>
          </motion.div>

          {/* Feature Carousel */}
          <div className="mb-16 relative z-10">
            <FeatureCarousel features={keyFeatures} />
          </div>

          {/* Performance Evidence - Vertical Stack, Full Width */}
          <div className="relative z-10 space-y-6">
            {/* LIBERO Benchmark Table */}
            <PerformanceTable benchmark={liberoBenchmark} index={0} />

            {/* Performance on Diverse Embodiments Chart */}
            <GroupedBarChart chart={embodimentsChart} index={1} />

            {/* Generalization Performance Table */}
            <PerformanceTable benchmark={generalizationTable} index={2} />

            {/* Long-horizon Dexterity Chart */}
            <GroupedBarChart chart={dexterityChart} index={3} />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Detailed Analysis ==================== */}
      <SectionWrapper
        id="detailed-analysis"
        title="Detailed Analysis"
        variant="darker"
      >
        <div className="space-y-4">
          {analysisSections.map((section, index) => (
            <AnalysisSubsection key={section.id} section={section} index={index} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}

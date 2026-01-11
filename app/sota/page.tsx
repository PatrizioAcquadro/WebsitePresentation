'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionWrapper from '@/components/task/SectionWrapper'
import KeyFeatureCard from '@/components/sota/KeyFeatureCard'
import PerformanceTable from '@/components/sota/PerformanceTable'
import AnalysisSubsection from '@/components/sota/AnalysisSubsection'
import {
  heroData,
  whyEO1Narrative,
  keyFeatures,
  liberoBenchmark,
  realWorldBenchmark,
  analysisSections,
} from '@/content/sota-data'

export default function SotaPage() {
  return (
    <div className="pt-16">
      {/* ==================== HERO ==================== */}
      <div className="bg-gradient-to-b from-[#1d1a1d] to-[#161316] py-16 md:py-20 px-4">
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

      {/* ==================== SECTION 1: Why EO-1 ==================== */}
      <SectionWrapper
        id="why-eo1"
        title="Why EO-1"
        subtitle="Selection rationale and performance evidence for choosing EO-1 as the baseline model for bimanual LEGO assembly."
        variant="default"
      >
        {/* Narrative introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[#BABABA] text-base md:text-lg leading-relaxed max-w-4xl">
            {whyEO1Narrative}
          </p>
        </motion.div>

        {/* Key Features Grid */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-white mb-6"
          >
            Key Features
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFeatures.map((feature, index) => (
              <KeyFeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* Performance Tables */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-white mb-6"
          >
            Performance Evidence
          </motion.h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceTable benchmark={liberoBenchmark} index={0} />
            <PerformanceTable benchmark={realWorldBenchmark} index={1} />
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== SECTION 2: Detailed Analysis ==================== */}
      <SectionWrapper
        id="detailed-analysis"
        title="Detailed Analysis"
        subtitle="Technical deep-dive into EO-1's architecture, training methodology, and data pipeline with implications for LEGO assembly."
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

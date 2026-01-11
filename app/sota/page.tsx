'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import SectionWrapper from '@/components/task/SectionWrapper'
import FeatureCarousel from '@/components/sota/FeatureCarousel'
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
      <section id="why-eo1" className="relative py-20 md:py-24 px-4 bg-[#161316] overflow-hidden">
        {/* Gradient divider at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF6D29]/20 to-transparent" />

        <div className="max-w-6xl mx-auto">
          {/* Section title - centered, no subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white">
              Why EO-1
            </h2>
          </motion.div>

          {/* Two-column hero: Text left, Robot right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Text column */}
              <div className="flex-1 lg:pr-4">
                <p className="text-[#BABABA] text-base md:text-lg leading-relaxed">
                  {whyEO1Narrative}
                </p>
              </div>

              {/* Robot image column */}
              <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
                <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
                  <Image
                    src="/robot.png"
                    alt="Humanoid robot for bimanual assembly"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Features Carousel */}
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className="text-xl font-semibold text-white mb-8 text-center"
            >
              Key Features
            </motion.h3>
            <FeatureCarousel features={keyFeatures} />
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
        </div>
      </section>

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

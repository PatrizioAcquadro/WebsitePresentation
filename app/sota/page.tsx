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

        {/* Robot background image - positioned very close to top of section */}
        <div className="absolute right-0 top-[0.5%] h-[55%] w-[60%] md:w-[50%] pointer-events-none">
          {/* Robot image */}
          <div className="absolute right-[-5%] top-[0%] w-[480px] md:w-[540px] lg:w-[600px] h-[100%]">
            <Image
              src="/robot.png"
              alt=""
              fill
              className="object-contain object-right-top opacity-[0.30]"
              priority
            />
          </div>
          {/* Bottom fade-out gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#161316] via-[#161316]/95 to-transparent" />
          {/* Left fade for smooth blend with text */}
          <div className="absolute top-0 bottom-0 left-0 w-[35%] bg-gradient-to-r from-[#161316] to-transparent" />
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

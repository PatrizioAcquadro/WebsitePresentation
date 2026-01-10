'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const sections = [
  {
    href: '/task',
    title: 'Task Definition',
    description: 'Bimanual LEGO assembly specification, challenges, and success metrics',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    number: '01',
  },
  {
    href: '/sota',
    title: 'SOTA Analysis',
    description: 'VLA landscape comparison and EO-1 selection rationale',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    number: '02',
  },
  {
    href: '/limitations',
    title: 'Limitations & Future',
    description: 'Known limitations, unsolved problems, and research opportunities',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    number: '03',
  },
  {
    href: '/roadmap',
    title: 'Project Roadmap',
    description: '13-week execution plan with phases, milestones, and risk analysis',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    number: '04',
  },
]

const stats = [
  { value: '8x', label: 'A100 GPUs', sublabel: 'Training compute' },
  { value: '3B', label: 'Parameters', sublabel: 'Qwen 2.5 VL backbone' },
  { value: '13', label: 'Weeks', sublabel: 'Project timeline' },
  { value: '98%', label: 'LIBERO Score', sublabel: 'EO-1 benchmark' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#161316]">
        {/* Background glow effect - orange arc at bottom like reference */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main orange glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[600px] bg-gradient-to-t from-[#FF6D29]/20 via-[#FF6D29]/5 to-transparent rounded-[100%] blur-3xl" />
          {/* Secondary warm glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[400px] bg-gradient-to-t from-[#FF6D29]/30 via-[#453027]/10 to-transparent rounded-[100%] blur-2xl" />
          {/* Subtle top gradient */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#161316] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="text-center px-4 max-w-5xl mx-auto pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-10 px-5 py-2.5 bg-[#1d1a1d] border border-[#453027] rounded-full">
              <span className="text-sm text-[#BABABA]">Master&apos;s Thesis 2026</span>
              <span className="flex items-center gap-1 text-sm text-[#FF6D29] font-medium">
                Read more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold mb-8 leading-[1.1] tracking-tight">
              <span className="text-[#FF6D29] whitespace-nowrap">Vision-Language-Action</span>
              <br />
              <span className="text-white whitespace-nowrap">for Bimanual LEGO Assembly</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-[#BABABA] max-w-3xl mx-auto mb-12 leading-relaxed">
              Replicating and extending the <span className="text-white font-medium">EO-1 model</span> for
              precision bimanual manipulation using the <span className="text-white font-medium">Unitree H1</span> humanoid robot
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/roadmap"
                className="group px-8 py-4 bg-transparent text-white font-medium rounded-full border border-[#453027] hover:border-[#BABABA] transition-all duration-300 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                View Roadmap
              </Link>
              <Link
                href="/task"
                className="group px-8 py-4 bg-[#FF6D29] text-white font-medium rounded-full hover:bg-[#ff8c4a] transition-all duration-300"
              >
                Explore the Research
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#1d1a1d]/80 backdrop-blur-sm rounded-2xl border border-[#453027]/50"
                >
                  <div className="text-3xl md:text-4xl font-semibold text-[#FF6D29] mb-1">{stat.value}</div>
                  <div className="text-white font-medium text-sm">{stat.label}</div>
                  <div className="text-[#BABABA]/60 text-xs mt-1">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 pb-10 pt-8 flex flex-col items-center gap-2 text-[#BABABA]/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#BABABA]/40 to-transparent" />
        </div>
      </section>

      {/* Explore the Research Section */}
      <section className="py-32 px-4 bg-[#161316] relative overflow-hidden">
        {/* Top glow transition */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-gradient-to-b from-[#FF6D29]/10 via-[#FF6D29]/5 to-transparent rounded-[100%] blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-20"
          >
            <span className="text-[#FF6D29] text-base font-medium uppercase tracking-[0.2em]">Deep Dive</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-4 mb-6">Explore the Research</h2>
            <p className="text-[#BABABA] text-xl md:text-2xl">
              Navigate through the complete thesis documentation
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.15
                }}
              >
                <Link
                  href={section.href}
                  className="group relative p-8 lg:p-10 bg-[#1d1a1d] border border-[#453027] rounded-3xl hover:border-[#FF6D29]/50 transition-all duration-500 overflow-hidden block h-full"
                >
                  {/* Background number */}
                  <span className="absolute -right-2 -top-6 text-[140px] font-bold text-[#453027]/15 select-none group-hover:text-[#FF6D29]/10 transition-colors duration-500">
                    {section.number}
                  </span>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] mb-6 group-hover:bg-[#FF6D29] group-hover:text-white transition-all duration-300">
                      {section.icon}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#FF6D29] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-[#BABABA] text-lg leading-relaxed mb-6">
                      {section.description}
                    </p>

                    {/* Link indicator */}
                    <div className="flex items-center gap-2 text-[#FF6D29] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Read more</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

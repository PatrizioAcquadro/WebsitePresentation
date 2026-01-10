'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

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
  { value: '8×', label: 'A100 GPUs', sublabel: 'Training compute' },
  { value: '3B', label: 'Parameters', sublabel: 'Qwen 2.5 VL backbone' },
  { value: '13', label: 'Weeks', sublabel: 'Project timeline' },
  { value: '98%', label: 'LIBERO Score', sublabel: 'EO-1 benchmark' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '10%'])

  return (
    <div className="bg-[#161316]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <Image
            src="/robotTask.png"
            alt="Robot performing bimanual LEGO assembly"
            fill
            className="object-cover object-center scale-110"
            priority
            quality={95}
          />
          {/* Multi-layer gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#161316] via-[#161316]/60 to-[#161316]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161316]/90 via-transparent to-[#161316]/90" />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-radial-gradient opacity-40" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, #161316 70%)' }} />
        </motion.div>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF6D29]/5 rounded-full blur-[120px]" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex-grow flex items-center justify-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="text-center px-6 max-w-6xl mx-auto pt-28 pb-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-10 px-5 py-2.5 bg-[#1d1a1d]/80 border border-[#453027] rounded-full backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-[#FF6D29] rounded-full" />
              <span className="text-sm text-[#BABABA] font-medium tracking-wide">Master&apos;s Thesis 2026</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-8 leading-[1.05] tracking-tight">
              <span className="text-[#FF6D29] whitespace-nowrap block">Vision-Language-Action</span>
              <span className="text-white whitespace-nowrap block mt-2">for Bimanual LEGO Assembly</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-[#BABABA] max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Replicating and extending the <span className="text-white font-normal">EO-1 model</span> for
              precision bimanual manipulation using the <span className="text-white font-normal">Unitree H1</span> humanoid robot
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/task"
                className="group relative px-8 py-4 bg-[#FF6D29] text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,109,41,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore the Research
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff8c4a] to-[#FF6D29] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/roadmap"
                className="group px-8 py-4 text-white font-medium rounded-xl border border-[#453027] hover:border-[#BABABA]/50 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Roadmap
                </span>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group p-5 md:p-6 bg-[#1d1a1d]/60 backdrop-blur-md rounded-2xl border border-[#453027]/50 hover:border-[#FF6D29]/30 hover:bg-[#1d1a1d]/80 transition-all duration-500"
                >
                  <div className="text-3xl md:text-4xl font-semibold text-[#FF6D29] mb-1 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
                  <div className="text-white font-medium text-sm">{stat.label}</div>
                  <div className="text-[#BABABA]/50 text-xs mt-1">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="relative z-10 pb-10 flex flex-col items-center gap-3 text-[#BABABA]/40">
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#BABABA]/30 to-transparent" />
        </div>
      </section>

      {/* Transition gradient */}
      <div className="h-32 bg-gradient-to-b from-transparent via-[#FF6D29]/5 to-transparent" />

      {/* Explore the Research Section */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6D29]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#453027]/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <span className="inline-block text-[#FF6D29] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Deep Dive</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">Explore the Research</h2>
            <p className="text-[#BABABA] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Navigate through the complete thesis documentation, from task specification to implementation roadmap
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.12
                }}
              >
                <Link
                  href={section.href}
                  className="group relative p-8 lg:p-10 bg-[#1d1a1d] border border-[#453027] rounded-3xl hover:border-[#FF6D29]/40 transition-all duration-500 overflow-hidden block h-full"
                >
                  {/* Background number */}
                  <span className="absolute -right-2 -top-6 text-[150px] font-bold text-[#453027]/10 select-none group-hover:text-[#FF6D29]/[0.07] transition-colors duration-700">
                    {section.number}
                  </span>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6D29]/0 via-[#FF6D29]/0 to-[#FF6D29]/0 group-hover:from-[#FF6D29]/[0.02] group-hover:via-transparent group-hover:to-[#FF6D29]/[0.02] transition-all duration-700 rounded-3xl" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center text-[#FF6D29] mb-8 group-hover:bg-[#FF6D29] group-hover:border-[#FF6D29] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,109,41,0.3)] transition-all duration-500">
                      {section.icon}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-[#FF6D29] transition-colors duration-300">
                      {section.title}
                    </h3>
                    <p className="text-[#BABABA] text-base leading-relaxed mb-8">
                      {section.description}
                    </p>

                    {/* Link indicator */}
                    <div className="flex items-center gap-2 text-[#FF6D29] font-medium">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">Read more</span>
                      <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

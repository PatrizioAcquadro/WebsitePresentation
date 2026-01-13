'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/task/SectionWrapper'
import MetricTable from '@/components/task/MetricTable'
import {
  inputModalities,
  outputSpace,
  atomicSkills,
  coordinationModes,
  metricCategories,
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

export default function TaskPage() {
  return (
    <div className="pt-16">
      {/* HERO SECTION */}
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 md:mb-6"
          >
            Task Definition & Analysis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#BABABA] max-w-3xl mb-8 md:mb-10"
          >
            Bimanual LEGO assembly for Vision-Language-Action systems: precision manipulation,
            coordination challenges, and success metrics
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

      {/* SECTION 1: Task Overview */}
      <SectionWrapper
        id="overview"
        title="Task Overview"
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
                          <span className="text-[#FF6D29] leading-5 shrink-0">•</span>
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

      {/* SECTION 2: Task Motivation */}
      <SectionWrapper
        id="motivation"
        title="Task Motivation"
        subtitle="Understanding the gaps in current robotic manipulation and how our approach addresses them"
        variant="darker"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Current Landscape Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 md:p-6 flex items-center gap-4 border-b border-[#453027]/50">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#453027]/30 border border-[#453027] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#BABABA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">Current Landscape Limitations</h3>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 space-y-5">
              <div className="flex gap-4">
                <span className="text-[#FF6D29] font-semibold text-lg">1</span>
                <p className="text-[#BABABA] text-sm md:text-base leading-relaxed">
                  Standard manipulation benchmarks tolerate centimeter-level errors in tasks like pick-and-place or drawer opening. This leaves VLA models untested on sub-millimeter precision required for real-world assembly, concealing fundamental limitations in fine motor control.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#FF6D29] font-semibold text-lg">2</span>
                <p className="text-[#BABABA] text-sm md:text-base leading-relaxed">
                  Most VLA architectures struggle with long-horizon tasks requiring sequential reasoning, error detection, and recovery. Recent advances like EO-1 address these gaps through interleaved vision-language-action reasoning, but remain largely unevaluated on precision assembly tasks.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#FF6D29] font-semibold text-lg">3</span>
                <p className="text-[#BABABA] text-sm md:text-base leading-relaxed">
                  Today&apos;s VLA research remains largely confined to single-arm manipulation, leaving bimanual coordination—a frontier challenge requiring dynamic role allocation and synchronized movements—underexplored with limited benchmarks.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 md:p-6 flex items-center gap-4 border-b border-[#453027]/50">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#FF6D29]/10 border border-[#FF6D29]/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#FF6D29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">Our Approach</h3>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 space-y-5">
              <div className="flex gap-4">
                <span className="text-[#FF6D29]">→</span>
                <p className="text-[#BABABA] text-sm md:text-base leading-relaxed">
                  LEGO assembly provides objective, measurable precision requirements: studs spaced 4.8mm apart with ~0.1mm connection tolerances create an unforgiving benchmark that exposes any deficiency in fine manipulation capabilities.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#FF6D29]">→</span>
                <p className="text-[#BABABA] text-sm md:text-base leading-relaxed">
                  We leverage EO-1&apos;s state-of-the-art architecture to explore its capabilities within this demanding task, testing its interleaved reasoning on a novel embodiment (Unitree H1) and precision-critical setting not covered in original evaluations.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#FF6D29]">→</span>
                <p className="text-[#BABABA] text-sm md:text-base leading-relaxed">
                  Unlike artificial bimanual tasks, LEGO assembly genuinely requires two hands—one to stabilize while the other manipulates—making it an ecologically valid testbed for advancing coordination research on humanoid platforms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* SECTION 3: Task Decomposition */}
      <SectionWrapper
        id="decomposition"
        title="Task Decomposition"
        subtitle="Breaking down the complex assembly task into fundamental building blocks: the atomic skills the robot must master and how both arms work together to achieve precise manipulation."
        variant="darker"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Two-column layout: Skills box on left, Coordination cards on right */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Skills Box */}
            <div className="lg:w-1/2 bg-gradient-to-b from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl p-6 md:p-8">
              <div className="space-y-6">
                {atomicSkills.map((skill, index) => (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-[#453027]/30 pb-5 last:border-b-0 last:pb-0"
                  >
                    {/* Category + Bimanual Requirement */}
                    <div className="mb-2">
                      <span className="text-base md:text-lg font-semibold text-white">
                        {skill.category}
                      </span>
                      <span className="text-sm text-[#BABABA] ml-2">
                        ({skill.bimanualRequirement})
                      </span>
                    </div>
                    {/* Skills description below */}
                    <p className="text-sm md:text-base text-[#BABABA] leading-relaxed">
                      {skill.skills}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Coordination Modes - 2x2 grid */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 content-stretch">
              {coordinationModes.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative bg-gradient-to-b from-[#1d1a1d] to-[#161316] border border-[#453027]/50 rounded-xl overflow-hidden hover:border-[#FF6D29]/30 transition-colors flex flex-col"
                >
                  {/* Large background number */}
                  <span className="absolute right-2 top-0 text-[100px] font-bold text-[#453027]/30 select-none leading-none">
                    {mode.id}
                  </span>

                  {/* Content */}
                  <div className="relative z-10 p-4 md:p-5 flex flex-col flex-1">
                    <h4 className="text-sm md:text-base font-semibold text-white mb-1.5">{mode.name}</h4>
                    <p className="text-xs md:text-sm text-[#BABABA] mb-3 line-clamp-2 flex-grow">{mode.description}</p>
                    <div className="border-t border-[#453027]/50 pt-3">
                      <span className="text-[#FF6D29] text-xs font-medium uppercase tracking-wider">Example</span>
                      <p className="text-xs md:text-sm text-[#BABABA] mt-1 line-clamp-2">{mode.example}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 4: Success Metrics */}
      <SectionWrapper
        id="metrics"
        title="Success Metrics"
        subtitle="Evaluation criteria for task completion, efficiency, and generalization"
        variant="darker"
      >
        <div className="space-y-6 md:space-y-8">
          {metricCategories.map((category, index) => (
            <MetricTable
              key={category.title}
              title={category.title}
              description={category.description}
              metrics={category.metrics}
              index={index}
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}

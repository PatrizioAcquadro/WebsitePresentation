'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KeyFeature } from '@/content/sota-data'

// Icon components for each feature type
const ArchitectureIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const TrainingIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
)

const ActionIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const ChunkIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
)

const BimanualIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
  </svg>
)

const ComputeIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
  </svg>
)

const iconMap = {
  architecture: ArchitectureIcon,
  training: TrainingIcon,
  action: ActionIcon,
  chunk: ChunkIcon,
  bimanual: BimanualIcon,
  compute: ComputeIcon,
}

// Feature card component - taller/portrait design
function FeatureCard({ feature }: { feature: KeyFeature }) {
  const Icon = iconMap[feature.iconType]

  return (
    <div className="w-[200px] md:w-[220px] h-[280px] md:h-[300px] shrink-0 group">
      <div className="h-full bg-gradient-to-b from-[#252225] to-[#1a171a] border border-[#3a3338] rounded-2xl p-5 flex flex-col transition-all duration-300 group-hover:border-[#FF6D29]/40 group-hover:shadow-lg group-hover:shadow-[#FF6D29]/5">
        {/* Icon container */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2a2528] to-[#1d1a1d] border border-[#453027]/60 flex items-center justify-center mb-5 group-hover:border-[#FF6D29]/30 transition-colors">
          <span className="text-[#BABABA] group-hover:text-[#FF6D29] transition-colors">
            <Icon />
          </span>
        </div>

        {/* Title */}
        <h4 className="text-[15px] font-semibold text-white mb-3 leading-tight">
          {feature.title}
        </h4>

        {/* Description */}
        <p className="text-[13px] text-[#9a9a9a] leading-relaxed flex-1">
          {feature.description}
        </p>

        {/* Subtle bottom accent line */}
        <div className="mt-4 h-[2px] w-8 bg-gradient-to-r from-[#453027] to-transparent group-hover:from-[#FF6D29]/50 transition-colors" />
      </div>
    </div>
  )
}

// Navigation arrow button
function NavButton({
  direction,
  onClick
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-11 h-11 rounded-full bg-[#252225] border border-[#3a3338] flex items-center justify-center text-[#BABABA] hover:text-white hover:border-[#FF6D29]/50 hover:bg-[#2a2528] transition-all duration-200 shadow-lg"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </motion.button>
  )
}

interface FeatureCarouselProps {
  features: KeyFeature[]
}

export default function FeatureCarousel({ features }: FeatureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Create extended array for infinite loop effect (duplicate items)
  const extendedFeatures = [...features, ...features, ...features]
  const totalOriginal = features.length

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => prev - 1)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => prev + 1)
    setTimeout(() => setIsAnimating(false), 400)
  }, [isAnimating])

  // Calculate the transform offset
  // Card width (220px) + gap (16px) = 236px per card
  const cardWidth = 236
  const baseOffset = totalOriginal * cardWidth // Start from middle set
  const currentOffset = baseOffset + (currentIndex * cardWidth)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Main carousel container */}
      <div className="relative flex items-center">
        {/* Left navigation */}
        <div className="absolute left-0 z-20 -translate-x-1/2 md:translate-x-0">
          <NavButton direction="left" onClick={handlePrev} />
        </div>

        {/* Carousel viewport with edge clipping */}
        <div className="flex-1 mx-12 md:mx-16 overflow-hidden">
          {/* Edge fade overlays for visual clipping effect */}
          <div className="absolute left-12 md:left-16 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#161316] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-12 md:right-16 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#161316] to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <motion.div
            className="flex gap-4 py-2"
            animate={{
              x: -currentOffset,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            onAnimationComplete={() => {
              // Reset to middle set for infinite loop illusion
              if (currentIndex >= totalOriginal) {
                setCurrentIndex(currentIndex - totalOriginal)
              } else if (currentIndex < -totalOriginal) {
                setCurrentIndex(currentIndex + totalOriginal)
              }
            }}
          >
            {extendedFeatures.map((feature, index) => (
              <FeatureCard key={`${feature.id}-${index}`} feature={feature} />
            ))}
          </motion.div>
        </div>

        {/* Right navigation */}
        <div className="absolute right-0 z-20 translate-x-1/2 md:translate-x-0">
          <NavButton direction="right" onClick={handleNext} />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, index) => {
          const normalizedCurrent = ((currentIndex % totalOriginal) + totalOriginal) % totalOriginal
          const isActive = normalizedCurrent === index
          return (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAnimating(false), 400)
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[#FF6D29] w-6'
                  : 'bg-[#453027] hover:bg-[#5a4a3f]'
              }`}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

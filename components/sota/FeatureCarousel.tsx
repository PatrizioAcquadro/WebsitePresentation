'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
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

// Feature card component - taller/portrait design with subtle orange tint
function FeatureCard({ feature }: { feature: KeyFeature }) {
  const Icon = iconMap[feature.iconType]

  return (
    <div className="w-[200px] md:w-[220px] h-[280px] md:h-[300px] shrink-0 group">
      <div className="relative h-full rounded-2xl p-5 flex flex-col transition-all duration-300 overflow-hidden">
        {/* Background with subtle orange tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#262023] via-[#1f1b1e] to-[#1a171a] rounded-2xl" />

        {/* Very subtle warm orange radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,109,41,0.04)_0%,_transparent_60%)] rounded-2xl" />

        {/* Border with subtle orange warmth */}
        <div className="absolute inset-0 rounded-2xl border border-[#3a3235] group-hover:border-[#FF6D29]/35 transition-colors duration-300" />

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_1px_1px_rgba(255,109,41,0.1),_0_0_20px_rgba(255,109,41,0.05)]" />

        {/* Content - relative to sit above backgrounds */}
        <div className="relative flex flex-col h-full">
          {/* Icon container */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2d282a] to-[#201c1f] border border-[#453027]/50 flex items-center justify-center mb-5 group-hover:border-[#FF6D29]/40 transition-colors">
            <span className="text-[#a8a4a6] group-hover:text-[#FF6D29] transition-colors">
              <Icon />
            </span>
          </div>

          {/* Title */}
          <h4 className="text-[15px] font-semibold text-white mb-3 leading-tight">
            {feature.title}
          </h4>

          {/* Description */}
          <p className="text-[13px] text-[#9a9598] leading-relaxed flex-1">
            {feature.description}
          </p>

          {/* Subtle bottom accent line with warm tone */}
          <div className="mt-4 h-[2px] w-10 bg-gradient-to-r from-[#FF6D29]/25 via-[#FF6D29]/15 to-transparent group-hover:from-[#FF6D29]/60 group-hover:via-[#FF6D29]/30 transition-all duration-300" />
        </div>
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
  const totalItems = features.length
  const cardWidth = 236 // 220px card + 16px gap

  // Use a large multiplier to create virtually infinite scrolling
  const multiplier = 100
  const totalSets = multiplier * 2 + 1 // 201 sets total
  const middleSetStart = multiplier * totalItems

  // Start from the middle set
  const [offset, setOffset] = useState(middleSetStart * cardWidth)
  const [isAnimating, setIsAnimating] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Create extended array - many copies for seamless infinite scroll
  const extendedFeatures = Array(totalSets).fill(features).flat()

  const handlePrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setOffset((prev) => prev - cardWidth)
  }, [isAnimating, cardWidth])

  const handleNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setOffset((prev) => prev + cardWidth)
  }, [isAnimating, cardWidth])

  // Handle animation end - silently reposition if needed
  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false)

    // Calculate bounds for repositioning
    const minSafeOffset = (multiplier - 10) * totalItems * cardWidth
    const maxSafeOffset = (multiplier + 10) * totalItems * cardWidth

    // If we've scrolled too far in either direction, silently reposition
    if (offset < minSafeOffset || offset > maxSafeOffset) {
      // Jump to equivalent position in middle set without animation
      const currentPosition = offset % (totalItems * cardWidth)
      const newOffset = middleSetStart * cardWidth + currentPosition

      if (trackRef.current) {
        trackRef.current.style.transition = 'none'
        setOffset(newOffset)
        // Force reflow
        trackRef.current.offsetHeight
        trackRef.current.style.transition = ''
      }
    }
  }, [offset, totalItems, cardWidth, middleSetStart, multiplier])

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
          <div
            ref={trackRef}
            className="flex gap-4 py-2"
            style={{
              transform: `translateX(-${offset}px)`,
              transition: isAnimating ? 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedFeatures.map((feature, index) => (
              <FeatureCard key={`${feature.id}-${index}`} feature={feature} />
            ))}
          </div>
        </div>

        {/* Right navigation */}
        <div className="absolute right-0 z-20 translate-x-1/2 md:translate-x-0">
          <NavButton direction="right" onClick={handleNext} />
        </div>
      </div>
    </motion.div>
  )
}

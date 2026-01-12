'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GroupedBarChart as GroupedBarChartData } from '@/content/sota-data'

interface GroupedBarChartProps {
  chart: GroupedBarChartData
  index: number
}

// Model colors - EO-1 highlighted with inline styles for hover
const modelColors: { [key: string]: { bg: string; hex: string } } = {
  'π0-Fast': { bg: 'bg-[#4a4548]', hex: '#4a4548' },
  'π0': { bg: 'bg-[#6b6568]', hex: '#6b6568' },
  'GR00T-N1.5': { bg: 'bg-[#8b8588]', hex: '#8b8588' },
  'EO-1': { bg: 'bg-[#FF6D29]', hex: '#FF6D29' },
}

// Y-axis grid values (excluding 0, which will be the baseline)
const yAxisTicks = [0.25, 0.5, 0.75, 1.0]

export default function GroupedBarChart({ chart, index }: GroupedBarChartProps) {
  const maxValue = 1.0
  const chartHeight = 220 // px
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-[#453027]">
        <h3 className="text-lg md:text-xl font-semibold text-white">{chart.title}</h3>
        {chart.subtitle && (
          <p className="text-sm text-[#9a9598] mt-1">{chart.subtitle}</p>
        )}
      </div>

      {/* Chart Area */}
      <div className="p-5 md:p-6">
        <div className="flex">
          {/* Y-axis */}
          <div className="flex flex-col justify-between pr-3 text-right" style={{ height: chartHeight }}>
            {yAxisTicks.slice().reverse().map((tick) => (
              <span key={tick} className="text-[11px] text-[#6a6568] leading-none">
                {tick.toFixed(2)}
              </span>
            ))}
            {/* 0 value at bottom */}
            <span className="text-[11px] text-[#6a6568] leading-none">0.00</span>
          </div>

          {/* Chart body */}
          <div className="flex-1 relative">
            {/* Grid lines (behind bars) */}
            <div className="absolute inset-0 pointer-events-none" style={{ height: chartHeight }}>
              {yAxisTicks.map((tick) => (
                <div
                  key={tick}
                  className="absolute w-full border-t border-[#353035]/50"
                  style={{ top: `${(1 - tick / maxValue) * 100}%` }}
                />
              ))}
            </div>

            {/* Bars container */}
            <div
              className="relative flex justify-around items-end"
              style={{ height: chartHeight }}
            >
              {chart.groups.map((group, groupIndex) => {
                // Filter out null values
                const validBars = group.values.filter((item) => item.value !== null)

                return (
                  <div
                    key={group.label}
                    className="flex items-end justify-center gap-[5px]"
                    style={{ flex: 1, maxWidth: `${100 / chart.groups.length}%`, height: chartHeight }}
                  >
                    {validBars.map((item, barIndex) => {
                      const isEO1 = item.model === 'EO-1'
                      const colors = modelColors[item.model] || modelColors['π0']
                      const barHeight = (item.value! / maxValue) * (chartHeight - 20) // Reserve space for labels
                      const barKey = `${group.label}-${item.model}`
                      const isHovered = hoveredBar === barKey

                      return (
                        <div
                          key={item.model}
                          className="relative flex flex-col items-center justify-end h-full"
                          onMouseEnter={() => setHoveredBar(barKey)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Value label */}
                          <motion.span
                            className={`mb-1 text-[11px] font-medium whitespace-nowrap ${
                              isEO1 ? 'text-[#FF6D29]' : 'text-[#9a9598]'
                            }`}
                            animate={{
                              scale: isHovered ? 1.15 : 1,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: 'easeOut',
                            }}
                          >
                            {item.value!.toFixed(2)}
                          </motion.span>

                          {/* Bar */}
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{
                              height: barHeight,
                              scaleX: isHovered ? 1.15 : 1,
                              scaleY: isHovered ? 1.02 : 1,
                            }}
                            transition={{
                              height: {
                                duration: 0.6,
                                delay: groupIndex * 0.08 + barIndex * 0.03,
                                ease: 'easeOut',
                              },
                              scaleX: { duration: 0.2, ease: 'easeOut' },
                              scaleY: { duration: 0.2, ease: 'easeOut' },
                            }}
                            className={`rounded-t cursor-pointer ${
                              isEO1 ? 'shadow-[0_0_10px_rgba(255,109,41,0.35)]' : ''
                            }`}
                            style={{
                              width: 30,
                              backgroundColor: colors.hex,
                              transformOrigin: 'bottom center',
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            {/* Baseline at 0 - above bars */}
            <div className="absolute bottom-0 left-0 right-0 border-t-2 border-[#6a6568] z-10 pointer-events-none" />
          </div>
        </div>

        {/* X-axis labels (below bars) - aligned with bar groups */}
        <div className="flex justify-around mt-4 pl-10">
          {chart.groups.map((group) => (
            <div
              key={group.label}
              className="text-center px-1"
              style={{ flex: 1, maxWidth: `${100 / chart.groups.length}%` }}
            >
              <div className="text-[12px] font-medium text-white leading-tight">
                {group.label}
              </div>
              {group.taskCount && (
                <div className="text-[12px] text-[#6a6568] mt-0.5">
                  ({group.taskCount})
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend - outside padded area for full-width separator */}
      <div className="px-5 md:px-6 py-4 border-t border-[#453027]/50">
        <div className="flex flex-wrap justify-center gap-5">
          {chart.models.map((model) => {
            const colors = modelColors[model]
            const isEO1 = model === 'EO-1'
            return (
              <div key={model} className="flex items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-sm ${
                    isEO1 ? 'shadow-[0_0_6px_rgba(255,109,41,0.4)]' : ''
                  }`}
                  style={{ backgroundColor: colors.hex }}
                />
                <span className={`text-[13px] ${isEO1 ? 'text-[#FF6D29] font-medium' : 'text-[#9a9598]'}`}>
                  {model}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* LEGO Note */}
      {chart.legoNote && (
        <div className="px-5 md:px-6 py-4 border-t border-[#453027]/50 bg-[#161316]/50">
          <p className="text-xs md:text-sm text-[#9a9598] leading-relaxed">
            <span className="text-[#FF6D29] font-medium">LEGO Assembly Relevance:</span>{' '}
            {chart.legoNote}
          </p>
        </div>
      )}
    </motion.div>
  )
}

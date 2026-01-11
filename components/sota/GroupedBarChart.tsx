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

// Y-axis grid values
const yAxisTicks = [0, 0.25, 0.5, 0.75, 1.0]

export default function GroupedBarChart({ chart, index }: GroupedBarChartProps) {
  const maxValue = 1.0
  const chartHeight = 200 // px
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
              <span key={tick} className="text-[10px] text-[#6a6568] leading-none">
                {tick.toFixed(2)}
              </span>
            ))}
          </div>

          {/* Chart body */}
          <div className="flex-1 relative">
            {/* Y-axis label */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-[#9a9598] whitespace-nowrap">
              {chart.yAxisLabel}
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {yAxisTicks.map((tick) => (
                <div
                  key={tick}
                  className="w-full border-t border-[#353035]"
                  style={{ opacity: tick === 0 ? 1 : 0.5 }}
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
                    className="flex flex-col items-center"
                    style={{ flex: 1, maxWidth: `${100 / chart.groups.length}%` }}
                  >
                    {/* Bars for this group */}
                    <div className="flex items-end justify-center gap-[3px] h-full pb-1">
                      {validBars.map((item, barIndex) => {
                        const isEO1 = item.model === 'EO-1'
                        const colors = modelColors[item.model] || modelColors['π0']
                        const heightPercent = (item.value! / maxValue) * 100
                        const barKey = `${group.label}-${item.model}`
                        const isHovered = hoveredBar === barKey

                        return (
                          <motion.div
                            key={item.model}
                            className="relative flex flex-col items-center"
                            onMouseEnter={() => setHoveredBar(barKey)}
                            onMouseLeave={() => setHoveredBar(null)}
                            animate={{
                              y: isHovered ? -4 : 0,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: 'easeOut',
                            }}
                          >
                            {/* Value label */}
                            <motion.span
                              className={`mb-1 text-[9px] font-medium whitespace-nowrap ${
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
                              whileInView={{ height: `${heightPercent}%` }}
                              viewport={{ once: true }}
                              animate={{
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
                                width: 14,
                                backgroundColor: colors.hex,
                                transformOrigin: 'bottom center',
                              }}
                            />
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* X-axis labels (below bars) */}
            <div className="flex justify-around mt-3">
              {chart.groups.map((group) => (
                <div
                  key={group.label}
                  className="text-center px-1"
                  style={{ flex: 1, maxWidth: `${100 / chart.groups.length}%` }}
                >
                  <div className="text-[11px] font-medium text-white leading-tight">
                    {group.label}
                  </div>
                  {group.taskCount && (
                    <div className="text-[9px] text-[#6a6568] mt-0.5">
                      ({group.taskCount})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-[#453027]/50">
          {chart.models.map((model) => {
            const colors = modelColors[model]
            const isEO1 = model === 'EO-1'
            return (
              <div key={model} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-sm ${
                    isEO1 ? 'shadow-[0_0_6px_rgba(255,109,41,0.4)]' : ''
                  }`}
                  style={{ backgroundColor: colors.hex }}
                />
                <span className={`text-xs ${isEO1 ? 'text-[#FF6D29] font-medium' : 'text-[#9a9598]'}`}>
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

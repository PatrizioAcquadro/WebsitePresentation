'use client'

import { motion } from 'framer-motion'
import { GroupedBarChart as GroupedBarChartData } from '@/content/sota-data'

interface GroupedBarChartProps {
  chart: GroupedBarChartData
  index: number
}

// Model colors - EO-1 highlighted
const modelColors: { [key: string]: { bg: string; border: string } } = {
  'π0-Fast': { bg: 'bg-[#4a4548]', border: 'border-[#5a5558]' },
  'π0': { bg: 'bg-[#6b6568]', border: 'border-[#7b7578]' },
  'GR00T-N1.5': { bg: 'bg-[#8b8588]', border: 'border-[#9b9598]' },
  'EO-1': { bg: 'bg-[#FF6D29]', border: 'border-[#FF8A50]' },
}

export default function GroupedBarChart({ chart, index }: GroupedBarChartProps) {
  const maxValue = 1.0 // Assuming 0-1 scale for completion scores

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
        {/* Y-axis label */}
        <div className="text-xs text-[#9a9598] mb-4">{chart.yAxisLabel}</div>

        {/* Chart container */}
        <div className="space-y-6">
          {chart.groups.map((group, groupIndex) => (
            <div key={group.label} className="space-y-2">
              {/* Group label */}
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-white">{group.label}</span>
                {group.taskCount && (
                  <span className="text-xs text-[#6a6568]">({group.taskCount})</span>
                )}
              </div>

              {/* Bars */}
              <div className="flex items-end gap-1.5 h-16">
                {group.values.map((item, barIndex) => {
                  const isEO1 = item.model === 'EO-1'
                  const colors = modelColors[item.model] || modelColors['π0']
                  const heightPercent = item.value !== null ? (item.value / maxValue) * 100 : 0
                  const isNA = item.value === null

                  return (
                    <motion.div
                      key={item.model}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPercent}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: groupIndex * 0.1 + barIndex * 0.05,
                        ease: 'easeOut',
                      }}
                      className={`relative flex-1 max-w-[60px] rounded-t ${
                        isNA ? 'bg-[#2a2528] border border-dashed border-[#3a3538]' : colors.bg
                      } ${isEO1 && !isNA ? 'shadow-[0_0_12px_rgba(255,109,41,0.3)]' : ''}`}
                      style={{ minHeight: isNA ? '100%' : undefined }}
                    >
                      {/* Value label */}
                      {!isNA && item.value !== null && (
                        <span
                          className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium ${
                            isEO1 ? 'text-[#FF6D29]' : 'text-[#9a9598]'
                          }`}
                        >
                          {item.value.toFixed(2)}
                        </span>
                      )}
                      {isNA && (
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#5a5558]">
                          N/A
                        </span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[#453027]/50">
          {chart.models.map((model) => {
            const colors = modelColors[model]
            const isEO1 = model === 'EO-1'
            return (
              <div key={model} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-sm ${colors.bg} ${
                    isEO1 ? 'shadow-[0_0_6px_rgba(255,109,41,0.4)]' : ''
                  }`}
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

'use client'

import { motion } from 'framer-motion'
import { Metric } from '@/content/task-definition-data'

interface MetricTableProps {
  title: string
  description: string
  metrics: Metric[]
  index: number
}

export default function MetricTable({ title, description, metrics, index }: MetricTableProps) {
  const hasTarget = metrics.some((m) => m.target)
  const hasEvalMethod = metrics.some((m) => m.evaluationMethod)

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
        <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-[#BABABA]">{description}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-[#161316]">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-[#BABABA] uppercase tracking-wider" style={{ width: '28%' }}>
                Metric
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-[#BABABA] uppercase tracking-wider" style={{ width: '50%' }}>
                Definition
              </th>
              {hasTarget && (
                <th className="px-4 md:px-6 py-3 text-center text-xs font-semibold text-[#BABABA] uppercase tracking-wider" style={{ width: '22%' }}>
                  Target
                </th>
              )}
              {hasEvalMethod && (
                <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-[#BABABA] uppercase tracking-wider hidden md:table-cell" style={{ width: '22%' }}>
                  Evaluation
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#453027]/50">
            {metrics.map((metric) => (
              <tr key={metric.name} className="hover:bg-[#453027]/20 transition-colors">
                <td className="px-4 md:px-6 py-4" style={{ width: '28%' }}>
                  <span className="font-medium text-white text-sm md:text-base">{metric.name}</span>
                </td>
                <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-[#BABABA]" style={{ width: '50%' }}>
                  {metric.definition}
                </td>
                {hasTarget && (
                  <td className="px-4 md:px-6 py-4 text-center" style={{ width: '22%' }}>
                    {metric.target && (
                      <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-[#FF6D29]/10 text-[#FF6D29] border border-[#FF6D29]/30">
                        {metric.target}
                      </span>
                    )}
                  </td>
                )}
                {hasEvalMethod && (
                  <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-[#BABABA] hidden md:table-cell" style={{ width: '22%' }}>
                    {metric.evaluationMethod}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

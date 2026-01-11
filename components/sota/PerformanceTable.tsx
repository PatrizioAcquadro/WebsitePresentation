'use client'

import { motion } from 'framer-motion'
import { BenchmarkTable } from '@/content/sota-data'

interface PerformanceTableProps {
  benchmark: BenchmarkTable
  index: number
}

export default function PerformanceTable({ benchmark, index }: PerformanceTableProps) {
  // Find the best value for each column (excluding 'Model')
  const bestValues: { [key: string]: string } = {}
  const valueColumns = benchmark.columns.filter(col => col !== 'Model')

  valueColumns.forEach(col => {
    let best = 0
    benchmark.rows.forEach(row => {
      const val = row.values[col]
      if (typeof val === 'string') {
        const numVal = parseFloat(val.replace('%', ''))
        if (numVal > best) {
          best = numVal
          bestValues[col] = val
        }
      }
    })
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-gradient-to-br from-[#1d1a1d] to-[#161316] border border-[#453027] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-[#453027]">
        <h3 className="text-lg font-semibold text-white">{benchmark.title}</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#161316]">
            <tr>
              {benchmark.columns.map((col) => (
                <th
                  key={col}
                  className="px-3 md:px-5 py-3 text-left text-xs font-semibold text-[#BABABA] uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#453027]/50">
            {benchmark.rows.map((row) => (
              <tr
                key={row.model}
                className={`transition-colors ${
                  row.isHighlighted
                    ? 'bg-[#FF6D29]/10 border-l-2 border-[#FF6D29]'
                    : 'hover:bg-[#453027]/20'
                }`}
              >
                <td className="px-3 md:px-5 py-3">
                  <span
                    className={`font-medium text-sm md:text-base ${
                      row.isHighlighted ? 'text-[#FF6D29] font-bold' : 'text-white'
                    }`}
                  >
                    {row.model}
                  </span>
                </td>
                {valueColumns.map((col) => {
                  const value = row.values[col]
                  const isBest = value === bestValues[col]
                  return (
                    <td key={col} className="px-3 md:px-5 py-3">
                      <span
                        className={`text-sm ${
                          isBest && row.isHighlighted
                            ? 'font-bold text-[#FF6D29]'
                            : isBest
                            ? 'font-semibold text-white'
                            : 'text-[#BABABA]'
                        }`}
                      >
                        {value}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { BenchmarkTable } from '@/content/sota-data'

interface PerformanceTableProps {
  benchmark: BenchmarkTable
  index: number
}

export default function PerformanceTable({ benchmark, index }: PerformanceTableProps) {
  // Check if first column is 'Metric' (for generalization table - find best per row)
  const isMetricTable = benchmark.columns[0] === 'Metric'
  const valueColumns = benchmark.columns.filter(col => col !== 'Model' && col !== 'Metric')

  // Find the best value for each row (for metric tables) or each column (for model tables)
  const bestValuesPerRow: { [rowModel: string]: string } = {}
  const bestValuesPerColumn: { [col: string]: string } = {}

  if (isMetricTable) {
    // For metric tables: find best value in each row
    benchmark.rows.forEach(row => {
      let best = -Infinity
      let bestVal = ''
      valueColumns.forEach(col => {
        const val = row.values[col]
        if (typeof val === 'string') {
          const cleanVal = val.replace('%', '').replace('±', '').split(' ')[0]
          const numVal = parseFloat(cleanVal)
          if (numVal > best) {
            best = numVal
            bestVal = val
          }
        }
      })
      bestValuesPerRow[row.model] = bestVal
    })
  } else {
    // For model tables: find best value in each column
    valueColumns.forEach(col => {
      let best = -Infinity
      benchmark.rows.forEach(row => {
        const val = row.values[col]
        if (typeof val === 'string') {
          const cleanVal = val.replace('%', '').replace('±', '').split(' ')[0]
          const numVal = parseFloat(cleanVal)
          if (numVal > best) {
            best = numVal
            bestValuesPerColumn[col] = val
          }
        }
      })
    })
  }

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
        <h3 className="text-lg md:text-xl font-semibold text-white">{benchmark.title}</h3>
        {benchmark.subtitle && (
          <p className="text-sm text-[#9a9598] mt-1">{benchmark.subtitle}</p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#161316]">
            <tr>
              {benchmark.columns.map((col, colIndex) => (
                <th
                  key={col}
                  className={`px-3 md:px-4 py-3 text-xs font-semibold text-[#BABABA] uppercase tracking-wider whitespace-nowrap ${
                    colIndex === 0 ? 'text-left' : 'text-center'
                  }`}
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
                <td className="px-3 md:px-4 py-3 text-left">
                  <span
                    className={`font-medium text-sm ${
                      row.isHighlighted ? 'text-[#FF6D29] font-bold' : 'text-white'
                    }`}
                  >
                    {row.model}
                  </span>
                </td>
                {valueColumns.map((col) => {
                  const value = row.values[col]
                  // Determine if this is the best value
                  const isBest = isMetricTable
                    ? value === bestValuesPerRow[row.model]
                    : value === bestValuesPerColumn[col]

                  return (
                    <td key={col} className="px-3 md:px-4 py-3 text-center">
                      <span
                        className={`text-sm whitespace-nowrap ${
                          isBest
                            ? 'font-bold text-[#FF6D29]'
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

      {/* LEGO Note */}
      {benchmark.legoNote && (
        <div className="px-5 md:px-6 py-4 border-t border-[#453027]/50 bg-[#161316]/50">
          <p className="text-xs md:text-sm text-[#9a9598] leading-relaxed">
            <span className="text-[#FF6D29] font-medium">LEGO Assembly Relevance:</span>{' '}
            {benchmark.legoNote}
          </p>
        </div>
      )}
    </motion.div>
  )
}

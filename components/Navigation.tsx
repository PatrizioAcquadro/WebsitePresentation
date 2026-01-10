'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/task', label: 'Task' },
  { href: '/sota', label: 'SOTA' },
  { href: '/limitations', label: 'Limitations' },
  { href: '/roadmap', label: 'Roadmap' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

      {/* Main nav background */}
      <div className="bg-slate-900/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with gradient */}
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              {/* Logo mark */}
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.5)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <span className="text-white font-bold text-sm">VLA</span>
              </motion.div>
              {/* Text logo */}
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Thesis
              </span>
            </Link>

            {/* Navigation links */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium group"
                  >
                    {/* Animated background pill */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-bg"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover background (only when not active) */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-slate-800/80 transition-opacity duration-200" />
                    )}

                    {/* Text */}
                    <motion.span
                      className={`relative z-10 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold'
                          : 'text-slate-300 group-hover:text-white'
                      }`}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>

                    {/* Animated active indicator line */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

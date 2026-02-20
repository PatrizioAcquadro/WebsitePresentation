'use client'

import { motion } from 'framer-motion'

export default function ArchitectureDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto"
    >
      <svg
        viewBox="-10 0 910 330"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Arrowhead markers */}
          <marker id="arrow-data" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="none" stroke="#BABABA" strokeWidth="1" />
          </marker>
          <marker id="arrow-action" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="none" stroke="#FF6D29" strokeWidth="1" />
          </marker>
          <marker id="arrow-feedback" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="none" stroke="#BABABA" strokeWidth="1" />
          </marker>

          {/* Subtle glow filter for EO-1 block */}
          <filter id="eo1-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#FF6D29" floodOpacity="0.15" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========== BACKGROUND ========== */}
        <rect width="900" height="330" fill="transparent" />

        {/* ========== COLUMN LABELS ========== */}
        <text x="100" y="24" textAnchor="middle" fill="#BABABA" fontSize="12" fontWeight="600" letterSpacing="0.08em" opacity="0.6">
          INPUTS
        </text>
        <text x="430" y="24" textAnchor="middle" fill="#FF6D29" fontSize="12" fontWeight="600" letterSpacing="0.08em" opacity="0.8">
          MODEL
        </text>
        <text x="777" y="24" textAnchor="middle" fill="#BABABA" fontSize="12" fontWeight="600" letterSpacing="0.08em" opacity="0.6">
          ENVIRONMENT
        </text>

        {/* ========== INPUT BOXES ========== */}
        {/* Text Instructions */}
        <g>
          <rect x="30" y="52" width="140" height="54" rx="8" fill="#1d1a1d" stroke="#453027" strokeWidth="1" />
          <text x="100" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">Language</text>
          <text x="100" y="90" textAnchor="middle" fill="#BABABA" fontSize="11">Instructions</text>
        </g>

        {/* Visual Observations */}
        <g>
          <rect x="30" y="122" width="140" height="54" rx="8" fill="#1d1a1d" stroke="#453027" strokeWidth="1" />
          <text x="100" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">Visual</text>
          <text x="100" y="160" textAnchor="middle" fill="#BABABA" fontSize="11">Multi-view cameras</text>
        </g>

        {/* Proprioceptive State */}
        <g>
          <rect x="30" y="192" width="140" height="54" rx="8" fill="#1d1a1d" stroke="#453027" strokeWidth="1" />
          <text x="100" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">Proprioceptive</text>
          <text x="100" y="230" textAnchor="middle" fill="#BABABA" fontSize="11">Joint states & poses</text>
        </g>

        {/* ========== EO-1 MODEL BLOCK ========== */}
        <g filter="url(#eo1-glow)">
          <rect x="240" y="40" width="380" height="222" rx="12" fill="#1d1a1d" stroke="#FF6D29" strokeWidth="1.5" opacity="0.95" />
        </g>

        {/* Model header */}
        <text x="430" y="69" textAnchor="middle" fill="#FF6D29" fontSize="19" fontWeight="700">EO-1</text>
        <text x="430" y="87" textAnchor="middle" fill="#BABABA" fontSize="12">Qwen 2.5 VL Backbone (3B params)</text>

        {/* Unified Transformer block — enlarged */}
        <rect x="260" y="97" width="340" height="46" rx="6" fill="#FF6D29" fillOpacity="0.08" stroke="#FF6D29" strokeWidth="0.8" strokeOpacity="0.3" />
        <text x="430" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="500">Unified Decoder-Only Transformer</text>

        {/* Language Head — orange border, enlarged */}
        <rect x="260" y="155" width="162" height="54" rx="6" fill="#161316" stroke="#FF6D29" strokeWidth="1" strokeOpacity="0.5" />
        <text x="341" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600">Language Head</text>
        <text x="341" y="195" textAnchor="middle" fill="#BABABA" fontSize="10.5">Autoregressive reasoning</text>

        {/* Flow Head — enlarged */}
        <rect x="438" y="155" width="162" height="54" rx="6" fill="#161316" stroke="#FF6D29" strokeWidth="1" strokeOpacity="0.5" />
        <text x="519" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600">Flow Head</text>
        <text x="519" y="195" textAnchor="middle" fill="#BABABA" fontSize="10.5">Continuous action denoising</text>

        {/* Interleaved label */}
        <text x="430" y="235" textAnchor="middle" fill="#FF6D29" fontSize="10.5" fontWeight="500" opacity="0.7" fontStyle="italic">
          Interleaved reasoning ↔ action generation
        </text>

        {/* ========== ARROWS: Inputs → Model ========== */}
        <line x1="170" y1="79" x2="236" y2="79" stroke="#BABABA" strokeWidth="1" markerEnd="url(#arrow-data)" opacity="0.5" />
        <line x1="170" y1="149" x2="236" y2="149" stroke="#BABABA" strokeWidth="1" markerEnd="url(#arrow-data)" opacity="0.5" />
        <line x1="170" y1="219" x2="236" y2="219" stroke="#BABABA" strokeWidth="1" markerEnd="url(#arrow-data)" opacity="0.5" />

        {/* ========== ARROW: Model → Environment ========== */}
        <line x1="620" y1="151" x2="696" y2="151" stroke="#FF6D29" strokeWidth="1.2" markerEnd="url(#arrow-action)" opacity="0.7" />

        {/* ========== ENVIRONMENT BLOCK ========== */}
        <rect x="700" y="123" width="155" height="56" rx="8" fill="#1d1a1d" stroke="#453027" strokeWidth="1" strokeDasharray="4,3" />
        <text x="777" y="148" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">MuJoCo Simulation</text>
        <text x="777" y="163" textAnchor="middle" fill="#BABABA" fontSize="11">Unitree H1 Humanoid</text>

        {/* ========== FEEDBACK LOOP ========== */}
        {/* Main trunk: MuJoCo right → down → across bottom → up left side */}
        <path
          d="M 855 160 L 878 160 L 878 300 L -6 300 L -6 79"
          fill="none"
          stroke="#BABABA"
          strokeWidth="1"
          strokeDasharray="5,3"
          opacity="0.4"
        />
        {/* Branch to Language input */}
        <line x1="-6" y1="79" x2="28" y2="79" stroke="#BABABA" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#arrow-feedback)" opacity="0.4" />
        {/* Branch to Visual input */}
        <line x1="-6" y1="149" x2="28" y2="149" stroke="#BABABA" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#arrow-feedback)" opacity="0.4" />
        {/* Branch to Proprioceptive input */}
        <line x1="-6" y1="219" x2="28" y2="219" stroke="#BABABA" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#arrow-feedback)" opacity="0.4" />

        <text x="440" y="316" textAnchor="middle" fill="#BABABA" fontSize="10.5" opacity="0.5" fontStyle="italic">
          Observation feedback loop
        </text>
      </svg>
    </motion.div>
  )
}

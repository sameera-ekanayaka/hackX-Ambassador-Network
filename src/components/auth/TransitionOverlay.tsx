'use client'

import { useEffect, useState } from 'react'

interface TransitionOverlayProps {
  isActive: boolean
}

export default function TransitionOverlay({ isActive }: TransitionOverlayProps) {
  const [phase, setPhase] = useState<'idle' | 'scan' | 'portal' | 'warp'>('idle')

  useEffect(() => {
    if (!isActive) {
      setPhase('idle')
      return
    }

    // Phase 1: Scan effect (0 - 0.6s)
    setPhase('scan')

    // Phase 2: Portal open (0.6s)
    const t1 = setTimeout(() => setPhase('portal'), 600)

    // Phase 3: Warp (1.4s)
    const t2 = setTimeout(() => setPhase('warp'), 1400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isActive])

  if (phase === 'idle') return null

  return (
    <div className={`cyber-transition-overlay ${phase}`}>
      {/* Full-screen black base */}
      <div className="cyber-bg" />

      {/* Grid warp effect */}
      <div className="cyber-grid-warp" />

      {/* Horizontal scanline sweeper */}
      <div className="cyber-scanline" />

      {/* Central HUD portal */}
      <div className="cyber-portal-wrap">
        {/* Outer rotating ring */}
        <div className="cyber-ring ring-1" />
        {/* Middle dashed ring */}
        <div className="cyber-ring ring-2" />
        {/* Inner ring */}
        <div className="cyber-ring ring-3" />
        {/* Core glow */}
        <div className="cyber-core">
          <div className="cyber-core-inner" />
        </div>
        {/* HUD text */}
        <div className="cyber-hud-text">
          <span className="cyber-hud-label">ACCESS GRANTED</span>
          <div className="cyber-hud-bar" />
          <span className="cyber-hud-sub">Initializing Ambassador Portal...</span>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="cyber-corner tl" />
      <div className="cyber-corner tr" />
      <div className="cyber-corner bl" />
      <div className="cyber-corner br" />
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function ReferralSection({ 
  referralCode,
  referredTeams = []
}: { 
  referralCode: string | null
  referredTeams?: string[]
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card overflow-hidden shadow-lg">
      <div className="border-b border-white/5 px-6 py-4.5">
        <h3 className="text-xs font-bold text-white/95 uppercase tracking-widest">
          Your Referral Code
        </h3>
      </div>

      <div className="p-6">
        <p className="text-xs text-white/50 mb-5 leading-relaxed font-light">
          Share this code with hackathon teams. You'll earn points as they advance through the stages.
        </p>

        {/* Code box */}
        <div className="flex items-center justify-between gap-3 border border-[#5BB8FF]/20 rounded-xl px-4 py-3 bg-[#5BB8FF]/5">
          <span className="text-lg font-mono font-bold text-[#5BB8FF] tracking-widest pl-1">
            {referralCode || '—'}
          </span>
          <button
            onClick={handleCopy}
            disabled={!referralCode}
            className="text-xs font-bold text-white bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] hover:opacity-90 disabled:opacity-30 px-4 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer disabled:pointer-events-none shadow-[0_0_12px_rgba(91,184,255,0.15)]"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Teams section */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <h4 className="text-[10px] font-bold text-[#5BB8FF] uppercase tracking-widest mb-3">
            Teams Using Your Code
          </h4>
          {referredTeams.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs text-white/55">Total Referred:</span>
                <span className="text-xs font-bold text-[#5BB8FF]">{referredTeams.length}</span>
              </div>
              <ul className="space-y-2">
                {referredTeams.map((teamId, idx) => (
                  <li key={idx} className="flex items-center gap-3 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8FF] shadow-[0_0_6px_#5BB8FF]" />
                    <span className="text-xs font-semibold text-white/80 truncate">{teamId}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-white/30 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
              No teams referred yet. Start sharing!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

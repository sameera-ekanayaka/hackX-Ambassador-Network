'use client'

import { useState } from 'react'
import { submitActivity } from '@/app/dashboard/actions'
import { Zap, Loader2 } from 'lucide-react'

export default function AddEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(form)
    
    try {
      await submitActivity(formData)
      setMessage({ type: 'success', text: 'Event submitted! Pending admin review.' })
      form.reset()
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred while submitting.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass-card overflow-hidden shadow-lg">
      <div className="border-b border-white/5 px-6 py-4.5">
        <h3 className="text-xs font-bold text-white/95 uppercase tracking-widest">
          Submit Marketing Event
        </h3>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Type */}
          <div className="space-y-2">
            <label htmlFor="activityType" className="block text-[10px] font-bold uppercase text-white/60 tracking-wider">
              Event Type
            </label>
            <select
              id="activityType"
              name="activityType"
              required
              disabled={isSubmitting}
              className="block w-full bg-[#041A3A]/20 text-white rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-[#5BB8FF]/30 focus:ring-1 focus:ring-[#5BB8FF]/30 focus:outline-none transition-all duration-300 [&>option]:bg-[#041A3A] [&>option]:text-white cursor-pointer"
            >
              <option value="awareness_session">Awareness Session</option>
              <option value="club_endorsement">Club Endorsement</option>
              <option value="pr_content">PR Content / Social Media Post</option>
            </select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-[10px] font-bold uppercase text-white/60 tracking-wider">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              disabled={isSubmitting}
              placeholder="e.g. HackX Intro Session at CS Faculty"
              className="block w-full bg-[#041A3A]/20 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-[#5BB8FF]/30 focus:ring-1 focus:ring-[#5BB8FF]/30 focus:outline-none transition-all duration-300 font-medium"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-[10px] font-bold uppercase text-white/60 tracking-wider">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              disabled={isSubmitting}
              placeholder="Briefly describe the event, attendees, or reach..."
              className="block w-full bg-[#041A3A]/20 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-[#5BB8FF]/30 focus:ring-1 focus:ring-[#5BB8FF]/30 focus:outline-none transition-all duration-300 resize-y min-h-[90px] font-medium"
            />
          </div>

          {/* Drive Link */}
          <div className="space-y-2">
            <label htmlFor="googleDriveLink" className="block text-[10px] font-bold uppercase text-white/60 tracking-wider">
              Google Drive Link <span className="normal-case text-white/30 font-normal">(proof)</span>
            </label>
            <input
              type="url"
              name="googleDriveLink"
              id="googleDriveLink"
              required
              disabled={isSubmitting}
              placeholder="https://drive.google.com/..."
              className="block w-full bg-[#041A3A]/20 text-white placeholder-white/20 rounded-xl px-4 py-3 text-sm border border-white/5 focus:border-[#5BB8FF]/30 focus:ring-1 focus:ring-[#5BB8FF]/30 focus:outline-none transition-all duration-300 font-medium"
            />
          </div>

          {/* Message Alert Box */}
          {message && (
            <div className={`flex items-start gap-3 p-4 rounded-xl text-xs border ${
              message.type === 'success'
                ? 'bg-[#5BB8FF]/10 border-[#5BB8FF]/20 text-[#5BB8FF]'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}>
              <Zap className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-semibold">{message.text}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(91,184,255,0.2)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit for Review</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

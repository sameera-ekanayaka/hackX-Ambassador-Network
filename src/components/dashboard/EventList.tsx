import { formatDistanceToNow } from 'date-fns'

type Submission = {
  submission_id: string
  title: string
  activity_type: string
  status: string
  rejection_reason: string | null
  points_awarded: number
  submitted_at: string
  file_upload?: { file_url: string }[]
}

export default function EventList({ submissions }: { submissions: Submission[] }) {
  return (
    <div className="glass-card overflow-hidden shadow-lg">
      <div className="border-b border-white/5 px-6 py-4.5">
        <h3 className="text-xs font-bold text-white/95 uppercase tracking-widest">
          Past Submissions
        </h3>
      </div>

      <div className="p-6">
        {submissions.length === 0 ? (
          <div className="text-center py-10 text-xs text-white/30 border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
            No submissions yet. Submit your first event above.
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {submissions.map((sub) => (
              <li key={sub.submission_id} className="py-5 first:pt-0 last:pb-0 hover:bg-white/[0.005] px-1.5 transition-colors rounded-xl">
                {/* Title + status */}
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-white/90 truncate">{sub.title}</p>
                  <span className={`flex-shrink-0 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                    sub.status === 'approved'
                      ? 'text-[#5BB8FF] border-[#5BB8FF]/30 bg-[#5BB8FF]/5'
                      : sub.status === 'pending'
                      ? 'text-amber-400 border-amber-500/20 bg-amber-500/5'
                      : 'text-rose-400 border-rose-500/25 bg-rose-500/5'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                {/* Meta */}
                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
                  <span className="capitalize font-medium">{sub.activity_type.replace(/_/g, ' ')}</span>
                  <span>·</span>
                  <span className="font-light">{formatDistanceToNow(new Date(sub.submitted_at))} ago</span>
                  {sub.file_upload && sub.file_upload.length > 0 && (
                    <>
                      <span>·</span>
                      <a 
                        href={sub.file_upload[0].file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#5BB8FF]/80 hover:text-[#5BB8FF] font-semibold transition-colors flex items-center gap-0.5"
                      >
                        View Proof ↗
                      </a>
                    </>
                  )}
                </div>

                {/* Rejection reason */}
                {sub.status === 'rejected' && sub.rejection_reason && (
                  <p className="mt-3 text-xs text-rose-400 bg-rose-500/5 border border-rose-500/10 rounded-xl px-3 py-2 leading-relaxed">
                    <strong>Rejected:</strong> {sub.rejection_reason}
                  </p>
                )}

                {/* Points */}
                {sub.status === 'approved' && (
                  <p className="mt-2.5 text-xs text-[#5BB8FF] font-bold">
                    +{sub.points_awarded} pts
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

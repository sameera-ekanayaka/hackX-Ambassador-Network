import { getAmbassadorProfile, getSubmissions, getReferralStats } from './actions'
import ReferralSection from '@/components/dashboard/ReferralSection'
import AddEventForm from '@/components/dashboard/AddEventForm'
import EventList from '@/components/dashboard/EventList'
import { PixelCanvas } from '@/components/ui/pixel-canvas'

export default async function DashboardPage() {
  const profile = await getAmbassadorProfile()
  const submissions = await getSubmissions(profile.ambassador_id)
  const { totalPoints, referredTeams } = await getReferralStats(profile.ambassador_id)

  const approvedSubmissions = submissions.filter(s => s.status === 'approved')
  const pendingCount = submissions.filter(s => s.status === 'pending').length
  const approvedCount = approvedSubmissions.length

  return (
    <div>
      {/* Welcome Banner - Premium Glass Bento design with Canvas Shader */}
      <div className="relative overflow-hidden border border-white/5 rounded-[2rem] p-6 sm:p-8 md:p-10 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-[#041A3A]/15 backdrop-blur-[32px] shadow-lg">
        <PixelCanvas
          gap={10}
          speed={20}
          colors={["#1A6FD4", "#5BB8FF", "#0A3878"]}
        />
        
        {/* Left Side Info */}
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-[#5BB8FF] uppercase tracking-widest mb-1.5">
            Student Ambassador Portal
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {profile.full_name.split(' ')[0]}!
          </h1>
          <p className="mt-1 text-sm text-white/50 font-light">
            Track your points, manage referrals, and submit marketing sessions.
          </p>
        </div>

        {/* Stats row */}
        <div className="relative z-10 flex items-center gap-6 sm:gap-8 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5">
          {/* Points */}
          <div className="text-center px-2">
            <div className="text-4xl font-black text-[#5BB8FF] tracking-tight">{totalPoints}</div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1">Points</div>
          </div>
          
          {/* Divider */}
          <div className="w-px h-10 bg-white/15" />
          
          {/* Mini stats */}
          <div className="flex flex-col gap-2 pr-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5BB8FF]" />
              <span className="text-xs text-white/60 font-medium">
                <span className="text-white font-bold">{approvedCount}</span> Approved
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-xs text-white/60 font-medium">
                <span className="text-white font-bold">{pendingCount}</span> Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Forms & Submissions */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <AddEventForm />
          <EventList submissions={submissions} />
        </div>

        {/* Right — Referral */}
        <div className="lg:col-span-1">
          <ReferralSection referralCode={profile.ambassador_code} referredTeams={referredTeams} />
        </div>
      </div>
    </div>
  )
}

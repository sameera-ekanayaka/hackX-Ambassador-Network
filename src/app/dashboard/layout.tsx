import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/login/actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="hackx-theme min-h-screen bg-[#010814] flex flex-col text-white relative overflow-x-hidden">
      {/* Background Glow Blobs for Glassmorphism Contrast */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-[#1A6FD4] opacity-[0.06] blur-[130px] rounded-full" />
        <div className="absolute bottom-[15%] right-[5%] w-[550px] h-[550px] bg-[#5BB8FF] opacity-[0.04] blur-[150px] rounded-full" />
      </div>

      {/* Top Nav - Glassmorphic design */}
      <nav className="bg-[#010814]/30 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-white">
                hack<span className="text-[#5BB8FF]">X</span>
              </span>
              <span className="text-xs text-[#5BB8FF]/70 border-l border-white/10 pl-3 uppercase tracking-widest font-bold">
                Ambassador
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/30 hidden sm:inline">{user.email}</span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-xs font-semibold text-white bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-grow max-w-6xl w-full mx-auto py-8 px-5 sm:px-8 relative z-10">
        {children}
      </main>
    </div>
  )
}

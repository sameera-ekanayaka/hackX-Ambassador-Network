import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  // First, update the session cookie and get the user
  const { supabaseResponse: response, user } = await updateSession(request)

  const protectedPaths = ['/dashboard', '/profile', '/activities', '/leaderboard', '/admin']
  const isProtectedPath = protectedPaths.some((path) => 
    request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
  )

  if (isProtectedPath) {

    if (!user) {
      // User is not logged in, redirect to appropriate login page
      if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/')) {
        return NextResponse.redirect(new URL('/adminLogin', request.url))
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role-based protection from users table
    if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/')) {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return request.cookies.getAll() },
            setAll() {},
          },
        }
      )

      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('user_id', user.id)
        .single()

      if (userData?.role !== 'admin') {
        // If user tries to access admin but is not an Admin, redirect to dashboard
        return NextResponse.redirect(new URL('/', request.url)) // redirect to root since dashboard is removed
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

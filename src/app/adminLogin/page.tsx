import { adminLogin } from './actions'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams
  const message = params.message

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-100 text-gray-900">
      <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">hackX Admin Login</h1>
        <p className="mb-6 text-center text-sm text-gray-500">Access for administrators only</p>
        
        <form className="flex flex-col gap-4" action={adminLogin}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="rounded border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          
          {message && (
            <div className="rounded bg-red-50 p-2 text-center text-xs font-semibold text-red-600 border border-red-200">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 rounded bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  )
}

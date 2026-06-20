import Link from 'next/link'
import { Suspense } from 'react'
import { getPendingRequests, getRegisteredAmbassadors, getMetadata } from './actions'
import RegisterRequests from '@/components/admin/RegisterRequests'

async function PendingRequestsTab() {
  const requests = await getPendingRequests()
  const metadata = await getMetadata()
  return <RegisterRequests requests={requests} metadata={metadata} />
}

async function RegisteredTab() {
  const ambassadors = await getRegisteredAmbassadors()
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md border border-gray-200">
      <ul role="list" className="divide-y divide-gray-200">
        {ambassadors.map((amb) => (
          <li key={amb.ambassador_id}>
            <div className="block p-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="truncate text-sm font-medium text-indigo-600">{amb.full_name}</p>
                <div className="ml-2 flex flex-shrink-0">
                  <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    Approved
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex sm:flex-col text-sm text-gray-500">
                  <p>{amb.email}</p>
                  <p className="mt-1">{amb.university?.university_name}</p>
                  <p className="mt-1">{amb.degree_programme?.programme_name}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
        {ambassadors.length === 0 && (
          <li className="p-4 text-center text-sm text-gray-500">No registered ambassadors yet.</li>
        )}
      </ul>
    </div>
  )
}

export default async function AmbassadorsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const params = await searchParams
  const tab = params.tab || 'requests'

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ambassadors Management</h1>
        <p className="mt-2 text-sm text-gray-500">
          Review new applications and manage registered ambassadors.
        </p>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <Link
            href="?tab=requests"
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
              ${tab === 'requests' 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Register Requests
          </Link>
          
          <Link
            href="?tab=registered"
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
              ${tab === 'registered' 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Registered Ambassadors
          </Link>
        </nav>
      </div>

      <div className="mt-6">
        {tab === 'requests' && (
          <Suspense fallback={<div className="text-sm text-gray-500">Loading pending requests...</div>}>
            <PendingRequestsTab />
          </Suspense>
        )}
        
        {tab === 'registered' && (
          <Suspense fallback={<div className="text-sm text-gray-500">Loading registered ambassadors...</div>}>
            <RegisteredTab />
          </Suspense>
        )}
      </div>
    </div>
  )
}

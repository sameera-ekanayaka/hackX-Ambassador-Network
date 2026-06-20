import Link from 'next/link'
import { Suspense } from 'react'
import { getPendingEvents, getApprovedEvents } from './actions'
import MarketingRequests from '@/components/admin/MarketingRequests'
import { formatDistanceToNow } from 'date-fns'

async function PendingRequestsTab() {
  const requests = await getPendingEvents()
  return <MarketingRequests requests={requests} />
}

async function ApprovedEventsTab() {
  const events = await getApprovedEvents()
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md border border-gray-200">
      <ul role="list" className="divide-y divide-gray-200">
        {events.map((ev) => (
          <li key={ev.submission_id}>
            <div className="block p-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="truncate text-sm font-medium text-indigo-600">{ev.title}</p>
                <div className="ml-2 flex flex-shrink-0">
                  <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                    +{ev.points_awarded} Points
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex sm:flex-col text-sm text-gray-500">
                  <p>By: <span className="font-medium text-gray-900">{ev.ambassador.full_name}</span></p>
                  <p className="mt-1 capitalize">Type: {ev.activity_type.replace('_', ' ')}</p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>Approved {formatDistanceToNow(new Date(ev.reviewed_at))} ago</p>
                </div>
              </div>
            </div>
          </li>
        ))}
        {events.length === 0 && (
          <li className="p-4 text-center text-sm text-gray-500">No approved events yet.</li>
        )}
      </ul>
    </div>
  )
}

export default async function MarketingPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const params = await searchParams
  const tab = params.tab || 'requests'

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Events</h1>
        <p className="mt-2 text-sm text-gray-500">
          Review ambassador submissions and award points.
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
            Pending Requests
          </Link>
          
          <Link
            href="?tab=approved"
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
              ${tab === 'approved' 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            Approved Events
          </Link>
        </nav>
      </div>

      <div className="mt-6">
        {tab === 'requests' && (
          <Suspense fallback={<div className="text-sm text-gray-500">Loading pending requests...</div>}>
            <PendingRequestsTab />
          </Suspense>
        )}
        
        {tab === 'approved' && (
          <Suspense fallback={<div className="text-sm text-gray-500">Loading approved events...</div>}>
            <ApprovedEventsTab />
          </Suspense>
        )}
      </div>
    </div>
  )
}

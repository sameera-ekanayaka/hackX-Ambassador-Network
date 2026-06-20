'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { approveEvent, rejectEvent } from '@/app/admin/marketing/actions'

type EventSubmission = any // Type appropriately based on fetch

export default function MarketingRequests({ requests }: { requests: EventSubmission[] }) {
  const [selectedEvent, setSelectedEvent] = useState<EventSubmission | null>(null)
  
  const [points, setPoints] = useState<number>(0)
  const [rejectReason, setRejectReason] = useState('')
  const [isRejecting, setIsRejecting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openModal = (req: EventSubmission) => {
    setSelectedEvent(req)
    // Auto-fill points based on marking system
    if (req.activity_type === 'awareness_session') setPoints(70)
    else if (req.activity_type === 'club_endorsement') setPoints(40)
    else if (req.activity_type === 'pr_content') setPoints(50)
    else setPoints(0)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setIsRejecting(false)
    setRejectReason('')
  }

  const handleApprove = async () => {
    if (!selectedEvent) return
    if (points < 0) {
      alert("Points cannot be negative")
      return
    }

    setIsSubmitting(true)
    try {
      await approveEvent(selectedEvent.submission_id, selectedEvent.ambassador_id, points, selectedEvent.activity_type)
      closeModal()
    } catch (error: any) {
      alert("Error approving event: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!selectedEvent) return
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason.")
      return
    }
    
    setIsSubmitting(true)
    try {
      await rejectEvent(selectedEvent.submission_id, rejectReason)
      closeModal()
    } catch (error: any) {
      alert("Error rejecting event: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {requests.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
          No pending marketing events found.
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-md border border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {requests.map((req) => (
              <li key={req.submission_id}>
                <div className="block hover:bg-gray-50 cursor-pointer p-4 sm:px-6" onClick={() => openModal(req)}>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">{req.title}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                        Pending
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:flex-col text-sm text-gray-500">
                      <p>By: <span className="font-medium text-gray-900">{req.ambassador.full_name}</span> ({req.ambassador.university?.university_name || 'No Univ'})</p>
                      <p className="mt-1 capitalize">Type: {req.activity_type.replace('_', ' ')}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Submitted {formatDistanceToNow(new Date(req.submitted_at))} ago</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Review Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review Marketing Event</h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
              <div><strong>Ambassador:</strong> {selectedEvent.ambassador.full_name} ({selectedEvent.ambassador.email})</div>
              <div><strong>Activity Type:</strong> <span className="capitalize">{selectedEvent.activity_type.replace('_', ' ')}</span></div>
              <div><strong>Title:</strong> {selectedEvent.title}</div>
              <div><strong>Description:</strong> <p className="mt-1 whitespace-pre-wrap">{selectedEvent.description}</p></div>
              
              {selectedEvent.file_upload && selectedEvent.file_upload.length > 0 && (
                <div className="mt-2">
                  <strong>Proof Link:</strong>{' '}
                  <a href={selectedEvent.file_upload[0].file_url} target="_blank" className="text-blue-600 hover:underline font-medium">
                    {selectedEvent.file_upload[0].file_url}
                  </a>
                </div>
              )}
            </div>

            {!isRejecting ? (
              <>
                <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4 mb-6">
                  <h3 className="text-sm font-semibold text-indigo-900 mb-2">Award Points</h3>
                  <p className="text-xs text-indigo-700 mb-3">
                    Recommended points based on type: <br/>
                    On-Campus Awareness session = 70<br/>
                    Official Club / society Endorsement = 40<br/>
                    PR & Content Creation = 50
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      min="0"
                      value={points}
                      onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-32 px-3 py-2 border text-gray-900 bg-white"
                    />
                    <span className="text-sm font-medium text-indigo-900">Points</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={closeModal} className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50" disabled={isSubmitting}>
                    Cancel
                  </button>
                  <button onClick={() => setIsRejecting(true)} className="px-4 py-2 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100" disabled={isSubmitting}>
                    Reject...
                  </button>
                  <button onClick={handleApprove} disabled={isSubmitting} className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50">
                    {isSubmitting ? 'Approving...' : `Approve & Award ${points} Points`}
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-600">Reject Event</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Rejection Reason</label>
                  <textarea 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm text-gray-900 bg-white"
                    rows={4}
                    placeholder="Briefly explain why this event is rejected (e.g. Invalid link, irrelevant content)..."
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setIsRejecting(false)} className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50" disabled={isSubmitting}>
                    Back
                  </button>
                  <button onClick={handleReject} disabled={isSubmitting} className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50">
                    {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

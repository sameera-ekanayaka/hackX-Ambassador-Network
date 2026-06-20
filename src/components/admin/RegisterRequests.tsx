'use client'

import { useState } from 'react'
import Combobox from './Combobox'
import { acceptAmbassador, rejectAmbassador, AcceptPayload } from '@/app/admin/ambassadors/actions'

type TempClub = { temp_club_id: string; submitted_club_name: string }
type AmbassadorRequest = any // Using any for brevity, typically would match DB type

export default function RegisterRequests({ 
  requests, 
  metadata 
}: { 
  requests: AmbassadorRequest[], 
  metadata: any 
}) {
  const [selectedRequest, setSelectedRequest] = useState<AmbassadorRequest | null>(null)
  
  // Mapping States
  const [university, setUniversity] = useState<{id?: string, name: string}>({ name: '' })
  const [faculty, setFaculty] = useState<{id?: string, name: string}>({ name: '' })
  const [degree, setDegree] = useState<{id?: string, name: string}>({ name: '' })
  
  // Array of clubs
  const [mappedClubs, setMappedClubs] = useState<Array<{id?: string, name: string, tempId: string}>>([])
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [isRejecting, setIsRejecting] = useState(false)

  const openModal = (req: AmbassadorRequest) => {
    setSelectedRequest(req)
    
    // Auto-fill mappings with what they submitted if exact matches exist, 
    // otherwise just pre-fill the name so it creates a new one by default
    const uMatch = metadata.universities.find((u: any) => u.university_name.toLowerCase() === req.submitted_university?.toLowerCase())
    setUniversity(uMatch ? { id: uMatch.university_id, name: uMatch.university_name } : { name: req.submitted_university || '' })

    const fMatch = metadata.faculties.find((f: any) => f.faculty_name.toLowerCase() === req.submitted_faculty?.toLowerCase())
    setFaculty(fMatch ? { id: fMatch.faculty_id, name: fMatch.faculty_name } : { name: req.submitted_faculty || '' })

    const dMatch = metadata.degreeProgrammes.find((d: any) => d.programme_name.toLowerCase() === req.submitted_degree_programme?.toLowerCase())
    setDegree(dMatch ? { id: dMatch.degree_programme_id, name: dMatch.programme_name } : { name: req.submitted_degree_programme || '' })

    // Map clubs
    if (req.temp_clubs && req.temp_clubs.length > 0) {
      const clubsMap = req.temp_clubs.map((tc: TempClub) => {
        const cMatch = metadata.clubs.find((c: any) => c.club_name.toLowerCase() === tc.submitted_club_name.toLowerCase())
        return {
          id: cMatch ? cMatch.club_id : undefined,
          name: cMatch ? cMatch.club_name : tc.submitted_club_name,
          tempId: tc.temp_club_id
        }
      })
      setMappedClubs(clubsMap)
    } else {
      setMappedClubs([])
    }
  }

  const closeModal = () => {
    setSelectedRequest(null)
    setIsRejecting(false)
    setRejectReason('')
  }

  const updateMappedClub = (index: number, val: {id?: string, name: string}) => {
    const updated = [...mappedClubs]
    updated[index] = { ...updated[index], ...val }
    setMappedClubs(updated)
  }

  const handleAccept = async () => {
    if (!selectedRequest || !university.name || !faculty.name || !degree.name) {
      alert("Please ensure University, Faculty, and Degree Programme are mapped.")
      return
    }

    setIsSubmitting(true)
    try {
      const payload: AcceptPayload = {
        university,
        faculty,
        degreeProgramme: degree,
        clubs: mappedClubs
      }
      
      await acceptAmbassador(selectedRequest.ambassador_id, payload)
      closeModal()
    } catch (error: any) {
      alert("Error accepting request: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!selectedRequest) return
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason.")
      return
    }
    
    setIsSubmitting(true)
    try {
      await rejectAmbassador(selectedRequest.ambassador_id, rejectReason)
      closeModal()
    } catch (error: any) {
      alert("Error rejecting request: " + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {requests.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
          No pending registration requests found.
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-md border border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {requests.map((req) => (
              <li key={req.ambassador_id}>
                <div className="block hover:bg-gray-50 cursor-pointer p-4 sm:px-6" onClick={() => openModal(req)}>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">{req.full_name}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                        Pending
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex sm:flex-col text-sm text-gray-500">
                      <p>{req.email}</p>
                      <p className="mt-1">{req.submitted_university}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Year {req.year_of_study}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review Application: {selectedRequest.full_name}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
              <div><strong>Email:</strong> {selectedRequest.email}</div>
              <div><strong>Phone:</strong> {selectedRequest.phone_number}</div>
              <div><strong>WhatsApp:</strong> {selectedRequest.whatsapp_number}</div>
              <div><strong>Year:</strong> {selectedRequest.year_of_study}</div>
              <div className="col-span-2"><strong>Motivation:</strong> <p className="mt-1 whitespace-pre-wrap">{selectedRequest.motivation}</p></div>
              {selectedRequest.facebook_url && <div className="col-span-2"><strong>Facebook:</strong> <a href={selectedRequest.facebook_url} target="_blank" className="text-blue-600 hover:underline">{selectedRequest.facebook_url}</a></div>}
              {selectedRequest.linkedin_url && <div className="col-span-2"><strong>LinkedIn:</strong> <a href={selectedRequest.linkedin_url} target="_blank" className="text-blue-600 hover:underline">{selectedRequest.linkedin_url}</a></div>}
            </div>

            {!isRejecting ? (
              <>
                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Map to Official Data</h3>
                <p className="text-sm text-gray-500 mb-4">Search to link with an existing record, or type a new name to create it automatically upon approval.</p>
                
                <div className="space-y-4 mb-8">
                  <Combobox 
                    label="University" 
                    options={metadata.universities.map((u: any) => ({ id: u.university_id, name: u.university_name }))}
                    value={university}
                    onChange={setUniversity}
                    suggestedValue={selectedRequest.submitted_university}
                  />

                  <Combobox 
                    label="Faculty" 
                    options={metadata.faculties.map((f: any) => ({ id: f.faculty_id, name: f.faculty_name }))}
                    value={faculty}
                    onChange={setFaculty}
                    suggestedValue={selectedRequest.submitted_faculty}
                  />

                  <Combobox 
                    label="Degree Programme" 
                    options={metadata.degreeProgrammes.map((d: any) => ({ id: d.degree_programme_id, name: d.programme_name }))}
                    value={degree}
                    onChange={setDegree}
                    suggestedValue={selectedRequest.submitted_degree_programme}
                  />

                  {mappedClubs.length > 0 && (
                    <div className="border-t pt-4 mt-4 space-y-4">
                      <h4 className="font-medium text-gray-700">Clubs</h4>
                      {mappedClubs.map((club, index) => (
                        <Combobox 
                          key={club.tempId}
                          label={`Club ${index + 1}`}
                          options={metadata.clubs.map((c: any) => ({ id: c.club_id, name: c.club_name }))}
                          value={{ id: club.id, name: club.name }}
                          onChange={(val) => updateMappedClub(index, val)}
                          suggestedValue={selectedRequest.temp_clubs.find((tc: TempClub) => tc.temp_club_id === club.tempId)?.submitted_club_name}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={closeModal} className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50" disabled={isSubmitting}>
                    Cancel
                  </button>
                  <button onClick={() => setIsRejecting(true)} className="px-4 py-2 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100" disabled={isSubmitting}>
                    Reject...
                  </button>
                  <button onClick={handleAccept} disabled={isSubmitting} className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">
                    {isSubmitting ? 'Approving...' : 'Approve & Map Data'}
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-red-600">Reject Application</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Rejection Reason</label>
                  <textarea 
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm text-gray-900 bg-white"
                    rows={4}
                    placeholder="Briefly explain why this application is rejected..."
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

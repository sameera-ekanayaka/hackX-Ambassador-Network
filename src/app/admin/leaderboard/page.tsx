import { getLeaderboardData } from './actions'

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboardData()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          Rankings of all approved ambassadors based on their marketing and referral points.
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ambassador
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Points
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                  No ambassadors found on the leaderboard yet.
                </td>
              </tr>
            ) : (
              leaderboard.map((amb, index) => (
                <tr key={amb.ambassador_id} className={index < 3 ? 'bg-indigo-50/30' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`
                        inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold
                        ${index === 0 ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : ''}
                        ${index === 1 ? 'bg-gray-200 text-gray-800 border border-gray-300' : ''}
                        ${index === 2 ? 'bg-orange-100 text-orange-800 border border-orange-300' : ''}
                        ${index > 2 ? 'bg-gray-100 text-gray-600' : ''}
                      `}>
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{amb.full_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{amb.university?.university_name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-bold text-indigo-600">{amb.total_points}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

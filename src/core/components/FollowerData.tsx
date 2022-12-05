import { PaperClipIcon } from "@heroicons/react/20/solid"
import { useLatestReport } from "../hooks/useLatestReport"

const FollowerData = () => {
  const followerData = useLatestReport()

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Follower Info</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Information about your followers</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Number of followers</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{followerData.total_followers}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default FollowerData

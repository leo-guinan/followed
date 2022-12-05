import { useQuery } from "@blitzjs/rpc"
import getLatestReport from "../queries/getLatestReport"

export const useLatestReport = () => {
  const [report] = useQuery(getLatestReport, null)
  return report
}

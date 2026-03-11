import PhaseDetailPage from '@/components/roadmap/PhaseDetailPage'
import { loadPhase42Detail } from '@/lib/roadmap/phase-detail-loader'

export default async function Phase42Page() {
  const detail = await loadPhase42Detail()

  return <PhaseDetailPage detail={detail} />
}

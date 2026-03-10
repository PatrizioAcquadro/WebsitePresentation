import PhaseDetailPage from '@/components/roadmap/PhaseDetailPage'
import { loadPhase21Detail } from '@/lib/roadmap/phase-detail-loader'

export default async function Phase21Page() {
  const detail = await loadPhase21Detail()

  return <PhaseDetailPage detail={detail} />
}

import PhaseDetailPage from '@/components/roadmap/PhaseDetailPage'
import { loadPhase41Detail } from '@/lib/roadmap/phase-detail-loader'

export default async function Phase41Page() {
  const detail = await loadPhase41Detail()

  return <PhaseDetailPage detail={detail} />
}

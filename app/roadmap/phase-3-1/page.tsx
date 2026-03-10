import PhaseDetailPage from '@/components/roadmap/PhaseDetailPage'
import { loadPhase31Detail } from '@/lib/roadmap/phase-detail-loader'

export default async function Phase31Page() {
  const detail = await loadPhase31Detail()

  return <PhaseDetailPage detail={detail} />
}

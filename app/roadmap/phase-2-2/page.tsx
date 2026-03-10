import PhaseDetailPage from '@/components/roadmap/PhaseDetailPage'
import { loadPhase22Detail } from '@/lib/roadmap/phase-detail-loader'

export default async function Phase22Page() {
  const detail = await loadPhase22Detail()

  return <PhaseDetailPage detail={detail} />
}

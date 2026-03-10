import PhaseDetailPage from '@/components/roadmap/PhaseDetailPage'
import { loadPhase23Detail } from '@/lib/roadmap/phase-detail-loader'

export default async function Phase23Page() {
  const detail = await loadPhase23Detail()

  return <PhaseDetailPage detail={detail} />
}

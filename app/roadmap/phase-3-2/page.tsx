import PhaseDetailPage from '@/components/roadmap/PhaseDetailPage'
import { loadPhase32Detail } from '@/lib/roadmap/phase-detail-loader'

export default async function Phase32Page() {
  const detail = await loadPhase32Detail()

  return <PhaseDetailPage detail={detail} />
}

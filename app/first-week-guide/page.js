import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function FirstWeekGuideAliasPage() {
  return <LeadMagnetLanding page={getLeadMagnetPage('cluster-d')} />
}

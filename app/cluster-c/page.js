import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function ClusterC() {
  return <LeadMagnetLanding page={getLeadMagnetPage('cluster-c')} />
}

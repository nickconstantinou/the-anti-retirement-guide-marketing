import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function ClusterA() {
  return <LeadMagnetLanding page={getLeadMagnetPage('cluster-a')} />
}

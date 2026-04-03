import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function ClusterB() {
  return <LeadMagnetLanding page={getLeadMagnetPage('cluster-b')} />
}

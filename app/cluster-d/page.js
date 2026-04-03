import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function ClusterD() {
  return <LeadMagnetLanding page={getLeadMagnetPage('cluster-d')} />
}

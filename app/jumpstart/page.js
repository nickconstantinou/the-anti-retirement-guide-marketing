import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function Jumpstart() {
  return <LeadMagnetLanding page={getLeadMagnetPage('jumpstart')} />
}

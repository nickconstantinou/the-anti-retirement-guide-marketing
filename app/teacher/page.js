import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function Teacher() {
  return <LeadMagnetLanding page={getLeadMagnetPage('teacher')} />
}

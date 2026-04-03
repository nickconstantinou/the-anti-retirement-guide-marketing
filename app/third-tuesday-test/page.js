import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function ThirdTuesdayTestPage() {
  return <LeadMagnetLanding page={getLeadMagnetPage('third-tuesday-test')} />
}

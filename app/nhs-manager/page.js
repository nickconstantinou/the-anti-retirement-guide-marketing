import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function NhsManager() {
  return <LeadMagnetLanding page={getLeadMagnetPage('nhs-manager')} />
}

import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function FearAuditLandingPage() {
  return <LeadMagnetLanding page={getLeadMagnetPage('fear-audit')} />
}

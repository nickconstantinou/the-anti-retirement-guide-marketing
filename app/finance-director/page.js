import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function FinanceDirector() {
  return <LeadMagnetLanding page={getLeadMagnetPage('finance-director')} />
}

import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function NIDecisionMatrixPage() {
  return <LeadMagnetLanding page={getLeadMagnetPage('ni-decision-matrix')} />
}

import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function SpouseConversationGuideAliasPage() {
  return <LeadMagnetLanding page={getLeadMagnetPage('cluster-a')} />
}

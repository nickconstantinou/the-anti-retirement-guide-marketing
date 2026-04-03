import LeadMagnetLanding from '../components/LeadMagnetLanding'
import { getLeadMagnetPage } from '../lib/leadMagnetPages'

export default function WhatIActuallyWantAliasPage() {
  return <LeadMagnetLanding page={getLeadMagnetPage('cluster-c')} />
}

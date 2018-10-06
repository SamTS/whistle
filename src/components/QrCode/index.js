import React from 'react'
import { RequestQRCode } from '@bloomprotocol/share-kit'

const QrCode = () => {
  const requestData = {
    action: 'request_attestation_data',
    url: 'https://localhost/qrresponse', // use ngrok
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png', // TODO: change this to our logo
    org_name: 'Crytpo Source',
    org_usage_policy_url: 'https://bloom.co/legal/terms', // don't need to change these, dummy for POC
    org_privacy_policy_url: 'https://bloom.co/legal/privacy', // don't need to change these, dummy for POC
    types: ['phone', 'email'] // use phone and email for POC. Ideally this would be SSN
  }

  return <RequestQRCode requestData={requestData} size={200} />
}

export default QrCode

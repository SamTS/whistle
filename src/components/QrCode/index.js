import React from 'react'
import { RequestQRCode } from '@bloomprotocol/share-kit'

const QrCode = () => {
  const requestData = {
    action: 'request_attestation_data',
    token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043',
    url: 'https://bloom.co/api/receiveData',
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
    org_name: 'Bloom',
    org_usage_policy_url: 'https://bloom.co/legal/terms',
    org_privacy_policy_url: 'https://bloom.co/legal/privacy',
    types: ['full-name', 'phone', 'email']
  }

  return <RequestQRCode requestData={requestData} size={200} />
}

export default QrCode

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export const getPayloadClient = async () => {
  const payload = await getPayloadHMR({ config })
  return payload
}


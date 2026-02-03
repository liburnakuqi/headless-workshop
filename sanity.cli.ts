import { loadEnvConfig } from '@next/env'
import { defineCliConfig } from 'sanity/cli'

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(__dirname, dev, { info: () => null, error: console.error })

// Load environment variables first, then import from sanity.api
// This ensures env vars are available when sanity.api.ts reads them
import {
  dataset,
  projectId,
} from './sanity/lib/sanity.api'

export default defineCliConfig({
  api: {
    projectId: projectId || 'wt2nt5ce',
    dataset: dataset || 'production',
  },
})

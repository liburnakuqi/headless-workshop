import type { NextApiRequest, NextApiResponse } from 'next'

export default function test(req: NextApiRequest, res: NextApiResponse) {
  console.log('[TEST API] Endpoint hit!', {
    method: req.method,
    query: req.query,
    url: req.url,
  })
  
  res.status(200).json({ 
    message: 'API routes are working!',
    timestamp: new Date().toISOString(),
    query: req.query,
  })
}

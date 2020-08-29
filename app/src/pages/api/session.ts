import { NextApiRequest, NextApiResponse } from 'next'
import { auth0 } from '@/lib/auth0'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tokenCache = auth0.tokenCache(req, res)
    const { accessToken } = await tokenCache.getAccessToken()
    res.status(200).json({ accessToken })
  } catch (error) {
    console.error(error)
    if (res.writable) {
      res.status(error.status || 500).json({
        error: true,
        message: 'Internal server error',
        code: 500,
      })
    }
  }
}

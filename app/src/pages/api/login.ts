import { NextApiRequest, NextApiResponse } from 'next'
import { auth0 } from '@/lib/auth0'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleLogin(req, res)
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

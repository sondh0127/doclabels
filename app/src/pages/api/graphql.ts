import { NextApiRequest, NextApiResponse } from 'next'
import { auth0 } from '@/lib/auth0'
import config from '@/utils/config'

export default auth0.requireAuthentication(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tokenCache = await auth0.tokenCache(req, res)
    const { accessToken } = await tokenCache.getAccessToken({
      scopes: ['openid', 'profile'],
    })

    const headers = {
      // Attach token to header
      Authorization: `Bearer ${accessToken}`,
      // Set content type to JSON
      'content-type': 'application/json; charset=utf-8',
      accept: 'application/json',
      'accept-encoding': 'gzip, deflate',
    }
    // Send request
    const gqlResponse = await fetch(`${config.APP_BASE_API}/v1/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body),
    })

    const data = await gqlResponse.text()
    const ct = gqlResponse.headers.get('content-type')
    if (ct != null) res.setHeader('content-type', ct)
    res.status(gqlResponse.status).send(data)

    // res.setHeader('Content-Type', 'application/json')
    // Send response
    // res.json(await gqlResponse.json())
    // res.end()
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})

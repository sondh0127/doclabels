import { initAuth0 } from '@auth0/nextjs-auth0'
import config from '../utils/config'

export const auth0 = initAuth0({
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  audience: config.AUTH0_AUDIENCE,
  redirectUri: config.REDIRECT_URI,
  postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI,
  session: {
    // Use any strong secret to protect your cookie
    cookieSecret: config.AUTH0_COOKIE_SECRET || '',
    // Set cookie valid life time to one day
    cookieLifetime: 60 * 60 * 24,
    // Make sure requesting domain and cookie domain are the same
    cookieSameSite: 'lax',
    // Store user credentials in session cookie
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
  },
})

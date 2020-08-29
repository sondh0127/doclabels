export default typeof window === 'undefined'
  ? {
      /**
       * Settings exposed to the server.
       */
      APP_BASE_URL: process.env.APP_BASE_URL || '',
      APP_BASE_API: process.env.APP_BASE_API || '',
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET || '',
      AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET || '',
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
      // AUTH0_SCOPE: process.env.AUTH0_SCOPE,
      REDIRECT_URI: process.env.REDIRECT_URI || '',
      POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI || '',
      SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
      SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME,
      APP_BASE_WS_API: process.env.APP_BASE_WS_API || '',
    }
  : {
      /**
       * Settings exposed to the client.
       */
      APP_BASE_URL: process.env.APP_BASE_URL || '',
      APP_BASE_API: process.env.APP_BASE_API || '',
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
      // AUTH0_SCOPE: process.env.AUTH0_SCOPE,
      REDIRECT_URI: process.env.REDIRECT_URI || '',
      POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI || '',
    }

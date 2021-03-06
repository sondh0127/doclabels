import { ISignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { UserContext } from '@/contexts/UserContext'
import createLoginURL from './createLoginURL'
import fetchUserAtClient from './fetchUserAtClient'
import { User } from '@/types'

type HasUser = Readonly<{ user: User }>

/**
 * Only displays this page if the user is authenticated, otherwise redirects.
 * @param PageComponent The page to wrap with Auth — will require users to login before seeing it.
 */
export default function withAuth<P extends Record<string, any> = {}, IP = P>(
  PageComponent: NextPage<P, IP>,
  auth0: ISignInWithAuth0,
  log = false,
  loginPath = '/api/login',
): NextPage<P, IP> {
  // This is the component that renders in the browser or on the server, before
  // PageComponent renders. So ensure that we don't render the PageComponent if
  // the user is missing.
  function WithAuth({ user, ...pageProps }: HasUser & P) {
    const router = useRouter()
    const value = useMemo(() => ({ user, loading: false }), [user])

    // This runs client-side, and redirects the browser
    useEffect(() => {
      if (log) console.info('user == null; redirecting to login URL from WithAuth.useEffect')
      if (typeof window === 'undefined') return
      if (user == null) window.location.assign(createLoginURL(loginPath, router.asPath))
    }, [user, router])

    if (user == null) {
      return 'Redirecting to sign-in page...'
    }

    if (log)
      console.info('WithAuth rendering UserProvider.Value=', value == null ? 'null' : 'not null')

    return (
      <UserContext.Provider value={value}>
        <PageComponent {...(pageProps as any)} />
      </UserContext.Provider>
    )
  }

  // Be nice to developers:
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withAuth HOC only works with PageComponents.')
    }

    WithAuth.displayName = `withAuth(${displayName})`
  }

  async function getPageProps(ctx: NextPageContext) {
    let pageProps: Record<string, any> = {}
    if (PageComponent.getInitialProps != null) {
      pageProps = await PageComponent.getInitialProps(ctx)
    }
    return pageProps
  }

  WithAuth.getInitialProps = async (ctx: NextPageContext) => {
    if (log) console.info('WithAuth.getInitialProps initial')

    const { res, req } = ctx // to help TypeScript

    // Client-side rendering
    if (req == null || res == null) {
      if (log) console.info('WithAuth.getInitialProps client-side rendering case')
      const pageProps = await getPageProps(ctx)
      return {
        ...pageProps,
        user: 'user' in pageProps ? pageProps.user : await fetchUserAtClient(),
      }
    }

    // @ts-ignore CHANGE ME WHEN #113 merges
    const session = await auth0.getSession(req)

    // Server-side, unauthenticated, just returns the location header
    if (
      session == null ||
      session.user == null ||
      /* is expired? */ Date.now() > session.accessTokenExpiresAt * 1000 - 60000
    ) {
      const loginURL = createLoginURL(loginPath, req.url)
      if (log)
        console.info('WithAuth.getInitialProps unauthenticated case, redirecting to', loginURL)

      res.writeHead(302, {
        location: loginURL,
      })
      res.end()
      return {}
    }

    if (log)
      console.info('WithAuth.getInitialProps authenticated case, user=', session.user, '\n---')

    // Run wrapped getInitialProps methods
    const pageProps = await getPageProps(ctx)

    // Server-side, authenticated
    return {
      ...pageProps,
      user: 'user' in pageProps ? pageProps.user : session.user,
    }
  }

  return (WithAuth as unknown) as NextPage<P, IP>
}

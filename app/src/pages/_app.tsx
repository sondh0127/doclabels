import 'react-markdown-editor-lite/lib/index.css'
import 'react-awesome-slider/dist/styles.css'
import '@/styles/global.scss'
import '@/components/pdf-annotation/cjs/react-pdf-viewer.css'

import { AppProps, AppContext, AppInitialProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import withApollo from '@/lib/withApollo'
import { NextPage, NextComponentType } from 'next'
import { RecoilRoot } from 'recoil'
import NProgress from 'nprogress'
import Router from 'next/router'
import { auth0 } from '@/lib/auth0'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import { EuiErrorBoundary } from '@elastic/eui'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React)
}

NProgress.configure({ showSpinner: false, speed: 400, trickleSpeed: 100 })

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps & { token: string; apollo: any }
> = ({ Component, pageProps }) => {
  const MyComponent = withApollo()(Component)
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/css/nprogress.css" />
        <title>Next Doclabels</title>
      </Head>

      <RecoilRoot>
        <EuiErrorBoundary>
          {/* <ApolloProvider client={apollo}>
            <Component {...pageProps} />
          </ApolloProvider> */}
          <MyComponent {...pageProps} />
        </EuiErrorBoundary>
      </RecoilRoot>
    </>
  )
}

// Application.getInitialProps = async ({ Component, ctx, router }) => {
//   const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
//   if (typeof window === 'undefined') {
//     // @ts-ignore
//     const session = await auth0.getSession(ctx.req)
//     if (router.pathname !== '/' && (!session || !session.user)) {
//       ctx.res!.writeHead(302, {
//         Location: '/api/login',
//       })
//       ctx.res!.end()
//       return { pageProps, token: null }
//     }
//     return { pageProps, token: session?.accessToken }
//   }
//   return { pageProps }
// }

export default App

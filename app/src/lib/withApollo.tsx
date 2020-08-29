import React from 'react'
import { ApolloProvider, HttpLink, split, ApolloLink, ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import withApollo from 'next-with-apollo'
// import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const cache = new InMemoryCache()

let accessToken: string | null = null

const requestAccessToken = async () => {
  if (accessToken) return

  const res = await fetch(`${process.env.BASE_URL}/api/session`)
  if (res.ok) {
    const json = await res.json()
    accessToken = json.accessToken
  } else {
    accessToken = 'public'
  }
}

const createHttpLink = (): ApolloLink => {
  return new HttpLink({
    fetch,
    uri: `${process.env.BASE_URL}/api/graphql`,
    credentials: 'include',
  })
}

// const createWSLink = () => {
//   return new WebSocketLink(
//     new SubscriptionClient(`${process.env.WS_GRAPHQL}`, {
//       lazy: true,
//       reconnect: true,
//       connectionParams: async () => {
//         await requestAccessToken() // happens on the client
//         return {
//           headers: {
//             authorization: accessToken ? `Bearer ${accessToken}` : '',
//           },
//         }
//       },
//     }),
//   )
// }

export default () =>
  withApollo(
    ({ initialState }) => {
      const ssrMode = typeof window === 'undefined'

      interface Definintion {
        kind: string
        operation?: string
      }

      const link = !ssrMode
        ? split(
            //only create the split in the browser
            // split based on operation type
            ({ query }) => {
              const { kind, operation }: Definintion = getMainDefinition(query)
              return kind === 'OperationDefinition' && operation === 'subscription'
            },
            // createWSLink() as ApolloLink,
            createHttpLink(),
            createHttpLink(),
          )
        : createHttpLink()

      return new ApolloClient({
        link: link,
        cache: cache.restore(initialState || {}),
      })
    },
    {
      // eslint-disable-next-line react/display-name
      render: ({ Page, props }) => {
        return (
          <ApolloProvider client={props.apollo}>
            <Page {...props} />
          </ApolloProvider>
        )
      },
    },
  )

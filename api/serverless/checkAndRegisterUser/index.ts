import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import fetch from 'node-fetch'

const syncAuth0User = async (client, payload) => {
  console.log('[DEBUG]: syncAuth0User -> payload', payload)
  const SYNC_AUTH0_USER_MUTATION = `
    mutation SyncAuth0User($auth0Id: String, $name: String) {
      insert_users(
        objects: { auth0_id: $auth0Id, name: $name }
        on_conflict: { constraint: user_auth0_id_key, update_columns: [last_seen, name] }
      ) {
        affected_rows
      }
    }`
  try {
    const result = await client(SYNC_AUTH0_USER_MUTATION, payload)
    return result
  } catch (error) {
    throw error
  }
}

const createClient = (req) => {
  const client = async (query, variables) => {
    try {
      const result = await fetch(`${process.env.GRAPHQL_BASE_API}/v1/graphql`, {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          variables,
        }),
        headers: { Authorization: req.headers['authorization'] },
      })
      const data = await result.json()
      return data
    } catch (error) {
      throw error
    }
  }
  return client
}

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  try {
    const { session_variables } = req.body
    const auth0Id = session_variables['x-hasura-user-id']
    const name = session_variables['x-hasura-user-nickname']
    let affected_rows = 0

    const client = createClient(req)
    const result = await syncAuth0User(client, { auth0Id, name })
    affected_rows = result.data.insert_users.affected_rows

    context.res = {
      headers: { 'Content-Type': 'application/json' },
      body: {
        affected_rows,
      },
    }
  } catch (error) {
    context.res = {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
      body: error,
    }
    return
  }
}

export default httpTrigger

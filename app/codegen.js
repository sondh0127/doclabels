module.exports = {
  schema: [
    {
      'https://hasura-next-doclabel.herokuapp.com/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ['./src/graphql/**/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      hooks: {
        afterOneFileWrite: ['prettier --write', 'eslint --fix'],
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: true,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        reactApolloVersion: 3,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

import { ApolloClient } from '@apollo/client';
import { cache } from './cache';

const GRAPHQL_API_URL = 'http://localhost:3000/graphql';

export const apolloClient = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache,
});

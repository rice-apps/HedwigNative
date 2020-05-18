// Apollo Client Setup
import { ApolloClient, HttpLink, InMemoryCache, split, gql } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// Apollo Subscriptions Setup
import { WebSocketLink } from '@apollo/link-ws';
// import { setContext } from '@apollo/link-context';

const GRAPHQL_API_URL = 'http://localhost:4000/graphql';
const GRAPHQL_WS_URL = 'ws://localhost:4000/graphql';

// HTTP Backend Link
const httpLink = new HttpLink({
    uri: GRAPHQL_API_URL
});

// WebSocket Backend Link
const wsLink = new WebSocketLink({
    uri: GRAPHQL_WS_URL,
    options: {
      reconnect: true
    }
});

// Uses wsLink for subscriptions, httpLink for queries & mutations (everything else)
const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);

/*
uncomment the code below in case you are using a GraphQL API that requires some form of
authentication. asyncAuthLink will run every time your request is made and use the token
you provide while making the request.


const TOKEN = '';
const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: TOKEN,
    },
  };
});

*/

/**
 * Define client-side gql queries/mutations/etc
 */

/**
 * Define client-side data
 */

/**
 * Define client-side resolvers
 */


// Initialize Client
const cache = new InMemoryCache();

export const client = new ApolloClient({
    cache: cache,
    link: splitLink
    // link: asyncAuthLink.concat(splitLink), 
});
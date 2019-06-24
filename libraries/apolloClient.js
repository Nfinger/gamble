import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import persist from './persist';

let apolloClient = null;

const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjww5ma3i36ia0106alic88xy',
  credentials: 'include'
});

function createClient(headers, token, initialState) {
  let accessToken = token;

  (async () => {
    // eslint-disable-next-line no-param-reassign
    accessToken = token || (await persist.willGetAccessToken());
  })();

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: `wss://subscriptions.us-west-2.graph.cool/v1/cjww5ma3i36ia0106alic88xy`,
        options: {
          reconnect: true,
          connectionParams: {
            authToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjA1MTk5NDYsImNsaWVudElkIjoiY2p3dzVhN3YzMjdtYzAxMzE3anhud2NtZSJ9.xkQUQOeHJ4IvTRT7gM77M60FcMCzWm1lkCc-biSvwRs'
          }
        }
      })
    : null;

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: accessToken
      }
    });
    return forward(operation);
  }).concat(httpLink);

  const link = process.browser
    ? split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        authLink
      )
    : authLink;

  return new ApolloClient({
    headers,
    link,
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default (headers, token, initialState) => {
  if (!process.browser) {
    return createClient(headers, token, initialState);
  }
  if (!apolloClient) {
    apolloClient = createClient(headers, token, initialState);
  }
  return apolloClient;
};

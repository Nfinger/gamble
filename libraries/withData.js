// @flow
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';
import * as jwtToken from 'jwt-decode';
import 'isomorphic-fetch';
import cookies from 'next-cookies';
import apolloClient from './apolloClient';
import reduxStore from './reduxStore';
import persist from './persist';
import getUser from './getUser.gql';

type Props = {
  headers: HeadersType,
  accessToken?: string,
  router: Object,
  apolloState: Object,
  reduxState: Object
};

type Context = {
  pathname: string,
  query: Object,
  asPath: string,
  req?: {
    headers?: Object
  },
  res?: Object,
  jsonPageRes?: Object,
  err?: Object
};

export default (
  Component: React.ComponentType<*>
): React.ComponentType<Props> =>
  class extends React.Component<Props> {
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
      reduxState: PropTypes.object.isRequired,
      headers: PropTypes.object.isRequired,
      accessToken: PropTypes.string
    };

    static defaultProps = {
      accessToken: ''
    };

    state = {
      reduxState: {}
    };

    constructor(props: Props) {
      super(props);
      this.apolloClient = apolloClient({}, '', this.props.apolloState);
      this.reduxStore = reduxStore(this.props.reduxState);
    }

    static async getInitialProps(ctx: Context) {
      let apolloState = {};
      let serverState = {};

      const headers = ctx.req ? ctx.req.headers : {};
      const token: string = cookies(ctx)[persist.ACCESS_TOKEN_KEY];
      const props = {
        router: {
          url: { query: ctx.query, pathname: ctx.pathname }
        },
        ...(await (typeof Component.getInitialProps === 'function'
          ? Component.getInitialProps(ctx)
          : {}))
      };

      if (!process.browser) {
        const client = apolloClient(headers || {}, token || '', {}, ctx);
        const { userId } = token ? jwtToken(token) : {};
        const { data: { User = {} } = {} } = userId
          ? await client.query({
              query: getUser,
              variables: { userId }
            })
          : { data: { User: {} } };

        const store = reduxStore({ auth: { user: User } }, token);
        try {
          const app = (
            <ApolloProvider client={client}>
              <ReduxProvider store={store}>
                <Component {...props} />
              </ReduxProvider>
            </ApolloProvider>
          );
          await getDataFromTree(app);
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://github.com/apollographql/react-apollo/issues/406
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }

        apolloState = client.cache.extract();
        serverState = store.getState();
      }

      return {
        reduxState: serverState,
        apolloState,
        headers,
        ...props
      };
    }

    async componentDidMount() {
      console.log('Im in the Component did mount');
      const token = await persist.willGetAccessToken({});
      console.log('I just checked the cookies for the token', token);
      const { userId } = token ? jwtToken(token) : {};
      console.log('I just decoded the token');
      const { data: { User = {} } = {} } = userId
        ? await this.apolloClient.query({
            query: getUser,
            variables: { userId }
          })
        : { data: { User: {} } };
      console.log('I just got the user from a query', User);
      this.props.reduxState.auth = { user: User };
      this.reduxStore = reduxStore(this.props.reduxState);
    }

    apolloClient: Object;

    reduxStore: Object;

    render() {
      return (
        <ApolloProvider client={this.apolloClient}>
          <ReduxProvider store={this.reduxStore}>
            <Component {...this.props} />
          </ReduxProvider>
        </ApolloProvider>
      );
    }
  };

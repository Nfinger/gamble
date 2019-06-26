import { graphql } from 'react-apollo';
import {
  getLeague,
  LeagueUpdateSubscription,
  ContestUpdateSubscription
} from './leagueInfo.gql';

const withData = graphql(getLeague, {
  options: ({
    router: {
      url: {
        query: { leagueId }
      }
    },
    user: { id }
  }) => ({
    variables: {
      leagueId,
      userId: id,
      now: new Date()
    }
  }),
  props: ({ data: { loading, League, error } }) => ({
    loading,
    League,
    error
  })
});

const withLeagueSubscription = graphql(LeagueUpdateSubscription, {
  options: ({
    router: {
      url: {
        query: { leagueId }
      }
    },
    user: { id }
  }) => ({
    variables: {
      id: leagueId,
      userId: id,
      now: new Date()
    }
  }),
  props: ({ data: { League: { node } = {} } }) => ({
    League: node
  })
});

const withContestSubscription = graphql(ContestUpdateSubscription, {
  options: ({
    router: {
      url: {
        query: { leagueId }
      }
    },
    user: { id }
  }) => ({
    variables: {
      leagueId,
      userId: id,
      now: new Date()
    }
  }),
  props: ({ data: { contest: { node } = {} } }) => ({
    League: node
  })
});

export default comp =>
  withLeagueSubscription(withContestSubscription(withData(comp)));

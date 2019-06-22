import { graphql } from 'react-apollo';
import { getContestInfo, createContest } from './createContest.gql';

const formatEvents = (league, events) => {
  const formatted = {};
  console.log(events);
  events.forEach(event => {
    if (league.sports.includes(event.sport)) {
      if (formatted[event.sport]) formatted[event.sport].push(event);
      else formatted[event.sport] = [event];
    }
  });
  return formatted;
};

const withData = graphql(getContestInfo, {
  options: ({
    router: {
      url: {
        query: { id }
      }
    }
  }) => ({
    variables: {
      leagueID: id,
      now: new Date()
    }
  }),
  props: ({ data: { loading, League, allEvents } }) =>
    loading
      ? {
          loading
        }
      : {
          loading,
          ...League,
          allEvents: formatEvents(League, allEvents),
          sports: League.sports.map(sport => ({ title: sport.toUpperCase() }))
        }
});

const withMutation = graphql(createContest, {
  props: ({ mutate }) => ({
    mutations: {
      createContest: ({ ...variables }) =>
        mutate({
          variables
        })
    }
  })
});

export default comp => withData(withMutation(comp));

import { graphql } from 'react-apollo';
import { v4 } from 'uuid';
import { getStats, updateOrCreateEntry, updateContest } from './entry.gql';

const processStats = ({ allGolfStatses }) => ({
  golf: allGolfStatses
});

const withData = graphql(getStats, {
  props: ({ data, ownProps: { mutations } }) => ({
    mutations,
    loading: data.loading,
    stats: processStats(data),
    error: data.error
  })
});

const withMutation = graphql(updateOrCreateEntry, {
  props: ({ mutate }) => ({
    mutations: {
      updateOrCreateEntry: ({
        id = '',
        entryName,
        ownerId,
        contestId,
        picks
      }) =>
        mutate({
          variables: { id, entryName, ownerId, contestId, picks }
        })
    }
  })
});

const withSubscriptionTrigger = graphql(updateContest, {
  props: ({ mutate, ownProps: { mutations } }) => ({
    mutations: {
      trigger: ({ contestId }) =>
        mutate({
          variables: { contestId, dummy: v4() }
        }),
      ...mutations
    }
  })
});

export default comp => withMutation(withSubscriptionTrigger(withData(comp)));

import { graphql } from 'react-apollo';
import { v4 } from 'uuid';
import { getStats, updateOrCreateEntry } from './entry.gql';

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
          variables: { id, entryName, ownerId, contestId, picks, dummy: v4() }
        })
    }
  })
});

export default comp => withMutation(withData(comp));

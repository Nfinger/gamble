import { graphql } from 'react-apollo';
import { getStats } from './entry.gql';

const processStats = ({ allGolfStatses }) => ({
  golf: allGolfStatses
});

const withData = graphql(getStats, {
  props: ({ data }) => ({
    loading: data.loading,
    stats: processStats(data),
    error: data.error
  })
});

export default comp => withData(comp);

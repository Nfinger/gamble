import { graphql } from 'react-apollo';
import createLeagueGql from './createLeague.gql';

const withData = graphql(createLeagueGql, {
  props: ({ mutate }) => ({
    mutations: {
      createLeague: ({
        leagueName,
        sports,
        defaultBuyIn,
        autoCreate,
        createdById
      }) =>
        mutate({
          variables: {
            leagueName,
            sports,
            defaultBuyIn,
            autoCreate,
            createdById
          }
        })
    }
  })
});

export default comp => withData(comp);

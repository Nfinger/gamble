import { graphql } from 'react-apollo';
// import { getLeague, MemberJoinSubscription } from './leagueInfo.gql';
import { getLeague } from './leagueInfo.gql';

// const subscribeToNewMembers = subscribeToMore => {
//   subscribeToMore({
//     document: MemberJoinSubscription,
//     updateQuery: (prev, { subscriptionData }) => {
//       if (!subscriptionData.data) return prev;
//       console.log('subscriptionData', subscriptionData);
//       return {
//         ...subscriptionData.data.League
//       };
//     }
//   });
// };

const withData = graphql(getLeague, {
  options: ({
    router: {
      url: {
        query: { leagueId }
      }
    }
  }) => ({
    variables: {
      leagueId
    }
  }),
  // props: ({ data: { loading, League, error, _subscribeToMore } }) => {
  //   // console.log(
  //   //   'subscribeToNewMembers(subscribeToMore);',
  //   //   subscribeToNewMembers(subscribeToMore)
  //   // );
  //   return {
  //     loading,
  //     League,
  //     error
  //   };
  // }

  props: ({ data: { loading, League, error } }) => ({
    loading,
    League,
    error
  })
});

export default comp => withData(comp);

import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../AuthFields/store';
import { signupUser, addMember } from './signupUser.gql';

const withMutation = graphql(signupUser, {
  props: ({ mutate }) => ({
    mutations: {
      signUp: ({ firstName, lastName, email, password }) =>
        mutate({
          variables: { firstName, lastName, email, password }
        })
    }
  })
});

const withAddToLeague = graphql(addMember, {
  props: ({ mutate, ownProps: { mutations } }) => ({
    mutations: {
      ...mutations,
      addToLeague: ({ userId, leagueId }) =>
        mutate({
          variables: { userId, leagueId }
        })
    }
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    signIn(token) {
      dispatch(dispatchers.signIn(token));
    }
  }
});

export default comp => {
  const compWithApollo = withMutation(withAddToLeague(comp));
  return connect(
    null,
    mapDispatchToProps
  )(compWithApollo);
};

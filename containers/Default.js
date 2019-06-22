// @flow
import * as React from 'react';
import { withRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import App from '../components/App';
// import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AppContainer, SiteBody, SiteContainer } from './style';

type Props = {
  title?: string,
  router: Object,
  children: React.Element<*>
};

const Default = ({ children, ...rest }: Props) => (
  <App>
    <Helmet>
      <title>Gamblin Man</title>
    </Helmet>
    <AppContainer>
      {/* <Header pathname={props.router.url.pathname} /> */}
      <Sidebar {...rest} />
      <SiteBody>
        <SiteContainer {...rest}>{children}</SiteContainer>
      </SiteBody>
    </AppContainer>
  </App>
);

Default.propTypes = {
  title: PropTypes.string,
  router: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

Default.defaultProps = {
  title: ''
};

export default withRouter(Default);

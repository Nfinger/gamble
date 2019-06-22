import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copied, CopyBody, CopyText } from './styles';

type Props = {
  text: String
};

type State = {
  copied: Boolean,
  to: Object
};

class Copy extends Component<Props, State> {
  state = {
    copied: false,
    to: null
  };

  handleCopy = () => {
    const { copied, to } = this.state;
    if (copied) {
      if (to) clearTimeout(to);
      this.setState({ copied: false }, () => {
        const timeout = setTimeout(
          () => this.setState({ copied: false, to: null }),
          1500
        );
        this.setState({ to: timeout, copied: true });
      });
    } else {
      this.setState({ copied: true });
    }
  };

  render() {
    const { text } = this.props;
    const { copied } = this.state;
    return (
      <CopyBody onClick={this.handleCopy}>
        <CopyToClipboard text={text}>
          <CopyText>Copy Url</CopyText>
        </CopyToClipboard>
        {copied && <Copied>Copied!</Copied>}
      </CopyBody>
    );
  }
}

Copy.propTypes = {
  text: PropTypes.string.isRequired
};

export default Copy;

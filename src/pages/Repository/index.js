import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { BrowserView, Loading } from './styles';

export default class Repository extends PureComponent {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.object,
      }),
    }).isRequired,
  };

  render() {
    const { route } = this.props;
    const { repository } = route.params;

    return (
      <BrowserView
        source={{ uri: repository.html_url }}
        startInLoadingState
        renderLoading={() => <Loading />}
      />
    );
  }
}

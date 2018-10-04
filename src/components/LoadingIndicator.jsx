import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { LoadingState } from '../redux/reducers/loadingIndicator';

class LoadingIndicator extends Component {
  static propTypes = {
    loadingState: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
  };

  render() {
    const { loadingState, errorMessage } = this.props;
    switch (loadingState) {
      case LoadingState.LOADING:
        return (
          <i
            className="fa fa-spinner fa-spin"
            style={{ fontSize: 24 + 'px' }}
          />
        );
      case LoadingState.ERROR:
        return (
          <Alert bsStyle="danger">
            <strong>Error!</strong> {errorMessage}.
          </Alert>
        );
      default:
        return <div />;
    }
  }
}

export default LoadingIndicator;
export const LoadingIndicatorForTest = LoadingIndicator;

import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { LoadingState } from '../redux/reducers/loadingIndicator';

interface Props {
  loadingState: string;
  errorMessage: string;
}

const LoadingIndicator: React.SFC<Props> = props => {
  const { loadingState, errorMessage } = props;
  switch (loadingState) {
    case LoadingState.LOADING:
      return (
        <i className="fa fa-spinner fa-spin" style={{ fontSize: 24 + 'px' }} />
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
};

export default LoadingIndicator;
export const LoadingIndicatorForTest = LoadingIndicator;

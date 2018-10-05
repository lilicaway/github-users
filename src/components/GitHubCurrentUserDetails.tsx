import * as React from 'react';
import { Button, Col, Grid, Image, Panel, Row } from 'react-bootstrap';
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Action } from 'redux';
import { loadUser } from '../redux/actionCreators';
import { currentUserApi, GitHubUsersState } from '../redux/reducers';
import { GitHubUser } from '../types/GitHubUser';
import LoadingIndicator from './LoadingIndicator';

interface UrlParams {
  username: string;
}

interface Props extends RouteComponentProps<UrlParams> {
  loadUser: (username: string) => void;
  user?: GitHubUser;
  loadingState: string;
  errorMessage: string;
}

class GitHubCurrentUserDetails extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    const username = this.props.match.params.username;
    this.props.loadUser(username);
  }

  public render() {
    if (!this.props.user) {
      return (
        <LoadingIndicator
          loadingState={this.props.loadingState}
          errorMessage={this.props.errorMessage}
        />
      );
    }
    const { avatar_url, login, id, html_url } = this.props.user;

    return (
      <div>
        <Link to="/users">
          <Button bsSize="small" onClick={this.props.history.goBack}>
            <span className="glyphicon glyphicon-chevron-left" />
            Users
          </Button>
        </Link>
        <Panel className="container-fluid">
          <Panel.Body>
            <Grid>
              <Row>
                <Col xs={12} sm={6}>
                  <Image src={avatar_url} circle={true} width="300px" />
                </Col>
                <Col xs={12} sm={6}>
                  <h3>
                    <span className="glyphicon glyphicon-user" />
                    &nbsp;User details
                  </h3>
                  <ul>
                    <li>
                      <b>User Id:</b> {id}
                    </li>
                    <li>
                      <b>Username:</b> {login}
                    </li>
                  </ul>
                  <p>
                    <i className="fab fa-github fa-2x" /> &nbsp;
                    <a href={html_url}>Open In GitHub</a>
                  </p>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps: MapStateToPropsParam<
  Partial<Props>,
  Props,
  GitHubUsersState
> = (state, ownProps): Partial<Props> => {
  const userApi = currentUserApi(state);
  return {
    user: userApi.getCurrentUser(),
    loadingState: userApi.getLoadingState(),
    errorMessage: userApi.getErrorMessage()
  };
};

const mapDispatchToProps: MapDispatchToPropsParam<Partial<Props>, Props> = (
  dispatch,
  ownProps
): Partial<Props> => {
  return {
    loadUser: (username: string) => {
      // TODO: figure out a better way other than this ugly double cast.
      dispatch((loadUser(username) as {}) as Action<any>);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitHubCurrentUserDetails);

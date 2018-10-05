// import PropTypes from 'prop-types';
import * as React from 'react';
import { Button, Col, Grid, Image, Panel, Row } from 'react-bootstrap';
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from 'react-redux';
import { Link } from 'react-router-dom';
import { Action } from 'redux';
import { loadUsers } from '../redux/actionCreators';
import { AppState, gitHubUsersApi } from '../redux/reducers';
import { LoadingState } from '../redux/reducers/loadingIndicator';
import { GitHubUser } from '../types/GitHubUser';
import LoadingIndicator from './LoadingIndicator';

interface Props {
  loadUsers: () => void;
  loadMoreUsers: (nextLink: string) => void;
  users: GitHubUser[];
  loadingState: string;
  errorMessage: string;
  nextLink: string;
}

class GitHubUsers extends React.Component<Props> {
  public componentDidMount() {
    if (this.props.loadingState !== LoadingState.COMPLETED) {
      this.props.loadUsers();
    }
  }

  public loadMoreUsers = () => {
    this.props.loadMoreUsers(this.props.nextLink);
  };

  public render() {
    const userCards = this.props.users.map(user => {
      return (
        <UserCard
          key={user.id}
          username={user.login}
          avatarUrl={user.avatar_url}
        />
      );
    });
    return (
      <div>
        <LoadingIndicator
          loadingState={this.props.loadingState}
          errorMessage={this.props.errorMessage}
        />
        <Grid>
          <Row>{userCards}</Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <Button onClick={this.loadMoreUsers}>Load More...</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps: MapStateToPropsParam<Partial<Props>, Props, AppState> = (
  state,
  ownProps
): Partial<Props> => {
  const userDataApi = gitHubUsersApi(state);
  return {
    users: userDataApi.getUsers(),
    loadingState: userDataApi.getLoadingState(),
    errorMessage: userDataApi.getErrorMessage(),
    nextLink: userDataApi.getNextLink()
  };
};

const mapDispatchToProps: MapDispatchToPropsParam<Partial<Props>, Props> = (
  dispatch,
  ownProps
): Partial<Props> => {
  return {
    loadUsers: () => {
      // TODO: figure out a better way other than this ugly double cast.
      dispatch((loadUsers() as {}) as Action<any>);
    },
    loadMoreUsers: (nextLink: string) => {
      // TODO: figure out a better way other than this ugly double cast.
      dispatch((loadUsers(nextLink) as {}) as Action<any>);
    }
  };
};

export const UnwrappedGitHubUsersForTest = GitHubUsers;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitHubUsers);

interface UserCardProps {
  avatarUrl: string;
  username: string;
}

const UserCard: React.SFC<UserCardProps> = props => (
  <Col xs={12} sm={6} md={4} lg={3}>
    <Panel className="container-fluid">
      <Image src={props.avatarUrl} width="100%" />
      <h3>{props.username}</h3>
      <p>
        <Link to={'/user/' + props.username}>
          <Button bsStyle="primary">User details</Button>
        </Link>
      </p>
    </Panel>
  </Col>
);

export const UserCardForTest = UserCard;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Image, Button, Grid, Row, Panel, Col } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator';
import { LoadingState } from '../redux/reducers/loadingIndicator';
import { loadUsers } from '../redux/actionCreators';
import { gitHubUsersApi } from '../redux/reducers';

class GitHubUsers extends Component {
  static propTypes = {
    loadUsers: PropTypes.func.isRequired,
    loadMoreUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    loadingState: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    nextLink: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (this.props.loadingState !== LoadingState.COMPLETED) {
      this.props.loadUsers();
    }
  }

  loadMoreUsers = () => {
    this.props.loadMoreUsers(this.props.nextLink);
  };

  render() {
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

const mapStateToProps = (state, ownProps) => {
  const userDataApi = gitHubUsersApi(state);
  return {
    users: userDataApi.getUsers(),
    loadingState: userDataApi.getLoadingState(),
    errorMessage: userDataApi.getErrorMessage(),
    nextLink: userDataApi.getNextLink(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadUsers: () => {
      dispatch(loadUsers());
    },
    loadMoreUsers: nextLink => {
      dispatch(loadUsers(nextLink));
    },
  };
};

export const UnwrappedGitHubUsersForTest = GitHubUsers;
export default connect(mapStateToProps, mapDispatchToProps)(GitHubUsers);

class UserCard extends Component {
  static propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };

  render() {
    const { avatarUrl, username } = this.props;
    return (
      <Col xs={12} sm={6} md={4} lg={3}>
        <Panel className="container-fluid">
          <Image src={avatarUrl} width="100%" />
          <h3>{username}</h3>
          <p>
            <Link to={'/user/' + username}>
              <Button bsStyle="primary">User details</Button>
            </Link>
          </p>
        </Panel>
      </Col>
    );
  }
}

export const UserCardForTest = UserCard;

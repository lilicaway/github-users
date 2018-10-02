import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loadUser } from '../redux/actionCreators';
import LoadingIndicator from './LoadingIndicator';
import { Panel, Grid, Image, Row, Col, Button } from 'react-bootstrap';

import { currentUserApi } from '../redux/reducers';

class GitHubCurrentUserDetails extends Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loadingState: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.loadUser(username);
  }

  render() {
    const { avatar_url, login, id, html_url } = this.props.user;

    return (
      <div>
        <LoadingIndicator
          loadingState={this.props.loadingState}
          errorMessage={this.props.errorMessage}
        />
        <Link to="/users">
          <Button bsSize="small" onClick={this.props.history.goBack}>
            <span className="glyphicon glyphicon-chevron-left" />Users
          </Button>
        </Link>
        <Panel className="container-fluid">
          <Panel.Body>
            <Grid>
              <Row>
                <Col xs={12} sm={6}>
                  <Image src={avatar_url} circle width="300px" />
                </Col>
                <Col xs={12} sm={6}>
                  <h3>
                    <span className="glyphicon glyphicon-user" />&nbsp;User
                    details
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

const mapStateToProps = (state, ownProps) => {
  const userApi = currentUserApi(state);
  return {
    user: userApi.getCurrentUser(),
    loadingState: userApi.getLoadingState(),
    errorMessage: userApi.getErrorMessage(),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadUser: username => {
      dispatch(loadUser(username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GitHubCurrentUserDetails
);

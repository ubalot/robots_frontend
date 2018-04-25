import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { RobotsTxtCard } from '.';

export class ShowRobotsTxtList extends Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    common: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    pageTitle: 'Show robots.txt list',
  }

  componentDidMount() {
    this.props.actions.changePageTitle(this.props.pageTitle);

    const { backendServer } = this.props.common;
    this.props.actions.fetchRobotsTxtList(backendServer);
  }

  render() {
    return (
      <div className="home-show-robots-txt-list">
        {this.props.home.robotsTxtList.map(website => <RobotsTxtCard website={website} />)}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowRobotsTxtList);

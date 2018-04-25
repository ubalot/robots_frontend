import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { RobotTxtCard } from '.';

export class ShowRobotTxts extends Component {
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

    const endpoint = `${this.props.common.backendServer}/scraper/websites_list`;
    this.props.actions.fetchRobottxtsList(endpoint);
  }

  render() {
    return (
      <div className="home-show-robot-txts">
        {/* {this.props.home.robottxtsList.map(website => this.renderCard(website))} */}
        {this.props.home.robottxtsList.map(website => <RobotTxtCard website={website} />)}
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
)(ShowRobotTxts);

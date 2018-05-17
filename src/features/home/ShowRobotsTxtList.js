import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { RobotsTxtCard, AutoGrid } from '.';

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
    const { changePageTitle, fetchRobotsTxtList } = this.props.actions;
    const { pageTitle } = this.props;
    const { backendServer } = this.props.common;
    
    changePageTitle(pageTitle);
    fetchRobotsTxtList(backendServer);
  }

  renderGrid() {
    const { robotsTxtList } = this.props.home;
    
    return (
      <AutoGrid>
        {robotsTxtList.map((website, i) => <RobotsTxtCard website={website} key={`card_${i}`} />)}
      </AutoGrid>
    );
  }

  render() {
    const { robotsTxtList } = this.props.home;
    
    return (
      <div className="home-show-robots-txt-list">
        { robotsTxtList && robotsTxtList.length
          ? this.renderGrid()
          : <p>Empty database or backend service down.</p>
        }
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

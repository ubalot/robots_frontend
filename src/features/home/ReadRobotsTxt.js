import axios from 'axios';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, Divider, RaisedButton, CardText } from 'material-ui';
import * as actions from './redux/actions';

const backendServer = 'http://127.0.0.1:8000';


export class ReadRobotsTxt extends Component {
  static propTypes = {
    children: PropTypes.node,
    // common: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    // robots_txt: PropTypes.string,
  };

  static defaultProps = {
    // input_url: '',
    // robots_txt: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      input_url: ''
    };
  }

  handleSubmit = () => {
    const arg = `url=${this.state.input_url}`;
    const robotsTxtUrl = `${backendServer}/content?${arg}`;
    // const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList, fetchRobotstxt } = this.props.actions;
    const { fetchRobotstxt } = this.props.actions;
    
    fetchRobotstxt(robotsTxtUrl);
  }


  resetForm = () => {
    this.setState({input_url: ''});
    document.getElementById('text-field').value = '';
  }

  renderForm() {
    return (
      <div className="read-robotstxt-form">
        <form>
          <TextField
            id="text-field"
            className="give-me-some-space"
            hintText="insert robots.txt URL here"
            onChange={event => this.setState({input_url: event.target.value})}
            // onChange={event => this.props.input_url = event.target.value}
          />
          <CardActions>
            <FlatButton label="Submit" className="give-me-some-space" onClick={this.handleSubmit} />
            <FlatButton label="Cancel" className="read-robotstxt-buttons" onClick={this.resetForm} />
          </CardActions>
        </form>
      </div>
    );
  }

  renderContent() {
    const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList, fetchRobotstxt, clearRobotstxt } = this.props.actions;

    return (
      <div>
        <CardText>
          {this.props.home.readRobotsTxtContent}
        </CardText>
        <CardActions>
          <FlatButton label="clear" onClick={() => clearRobotstxt()} />
        </CardActions>
      </div>
    );
  }

  render() {
    // const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.common;
    const { count, fetchRedditReactjsListPending, redditReactjsList, fetchRedditReactjsListError } = this.props.home;
    const { counterPlusOne, counterMinusOne, resetCounter, fetchRedditReactjsList, fetchRobotstxt } = this.props.actions;
    return (
      <div className="home-read-robots-txt">
        <Paper>
          <Card>
            <CardTitle
              title="Get robots.txt content"
            />
            {this.props.home.readRobotsTxtContent ? this.renderContent() : this.renderForm()}
          </Card>
        </Paper>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    // common: state.common,
    home: state.home
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
)(ReadRobotsTxt);

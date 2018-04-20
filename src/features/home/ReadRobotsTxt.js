import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, TextField, Card, CardTitle, CardActions, FlatButton, CardText } from 'material-ui';

import * as actions from './redux/actions';


export class ReadRobotsTxt extends Component {
  static propTypes = {
    // children: PropTypes.node,
    common: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    // children:
  };

  constructor(props) {
    super(props);

    this.textField = React.createRef();
    this.submitButton = React.createRef();

    this.state = {
      input_url: '', // store text form value
      input_url_error: '', // store text form error
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.clearContent = this.clearContent.bind(this);
  }

  componentDidMount() {
    /* Auto-focus on TextField when component is ready
     * (it doesn't work when dev tools are open)
    */
    if (!this.props.home.readRobotsTxtContent) {
      this.textField.current.focus();
    }
  }

  componentDidUpdate() {
    /* Auto-focus on TextField when robots.txt content
     * has been removed.
     */
    this.componentDidMount();
  }

  handleSubmit() {
    const { backendServer } = this.props.common;

    const arg = `url=${this.state.input_url}`;
    const path = 'content';
    const robotsTxtUrl = `${backendServer}/${path}?${arg}`;

    this.props.actions.fetchRobotstxt(robotsTxtUrl, this.state.input_url)
      .then((res) => {
        if (res.data.success === 0) {
          this.setState({ input_url_error: res.data.message });
        }
      })
      .catch(err => console.log('fetchRobotsTxtERROR', err));
  }

  resetForm() {
    this.setState({ input_url: '', input_url_error: '' });
    this.textField.current.setState({ value: '' });
    this.textField.current.focus();
  }

  clearContent() {
    this.setState({ input_url: '' });
    this.props.actions.clearRobotstxt();
  }

  renderForm() {
    return (
      <div className="read-robotstxt-form">
        <TextField
          ref={this.textField}
          className="give-me-some-space"
          hintText="insert robots.txt URL here"
          value={this.state.input_url}
          errorText={this.state.input_url_error}
          onChange={event => this.setState({ input_url: event.target.value })}
          // onKeyPress={(event) => {
          //   console.log(`Pressed keyCode ${event.key}`);
          //   if (event.key === 'Enter') {
          //     console.log(this.submitButton);
          //     console.log(this.submitButton.current);
          //     this.submitButton.current.focus();
          //   }
          // }}
        />
        <CardActions>
          <FlatButton
            ref={this.submitButton}
            label="Submit"
            className="give-me-some-space"
            onClick={this.handleSubmit}
          />
          <FlatButton
            label="Cancel"
            className="read-robotstxt-buttons"
            onClick={this.resetForm}
          />
        </CardActions>
      </div>
    );
  }

  renderContent() {
    function renderRobotsTxtContent(robotsTxt) {
      const lines = robotsTxt.split('\n');

      const renderedContent = lines.map((line, i) => {
        const key = `${i}-${line}`;
        if (/^user(\s|-)?agent/i.test(line)) { // User-agent
          return (
            <div key={key}>
              {i !== 0 && <br />}
              <h5 className="user-agent">{line}</h5>
            </div>
          );
        } else if (/^allow/i.test(line)) { // Allow rule
          return (
            <div key={key}>
              <p className="allow">{line}</p>
            </div>
          );
        } else if (/^disallow/i.test(line)) { // Disallow rule
          return (
            <div key={key}>
              <p className="disallow">{line}</p>
            </div>
          );
        } else if (/^sitemap/i.test(line)) { // Sitemap
          return (
            <div key={key}>
              {/^sitemap/i.test(lines[i - 1]) || <br />}
              <p className="sitemap">{line}</p>
            </div>
          );
        } else if (/^#/i.test(line)) { // Comment
          return (
            <div key={key}>
              <p className="comment">{line}</p>
            </div>
          );
        }
        return (
          <div key={key}>
            <p>{line}</p>
          </div>
        );
      });

      return (<div>{renderedContent}</div>);
    }

    return (
      <div>
        <CardText>
          {renderRobotsTxtContent(this.props.home.readRobotsTxtContent)}
        </CardText>
        <CardActions>
          <FlatButton label="clear" onClick={this.clearContent} />
        </CardActions>
      </div>
    );
  }

  render() {
    return (
      <div className="home-read-robots-txt">
        <Paper>
          <Card>
            <CardTitle
              title="Get robots.txt content"
              subtitle={this.props.home.readRobotsTxtUrl}
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
    common: state.common,
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

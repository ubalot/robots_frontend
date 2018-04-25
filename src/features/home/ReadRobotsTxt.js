import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  CardContent,
  Typography,
  Button,
  TextField,
  Card,
  CardActions,
} from 'material-ui';

import * as actions from './redux/actions';


export class ReadRobotsTxt extends Component {
  static propTypes = {
    pageTitle: PropTypes.string,
    common: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    pageTitle: 'Read robots.txt',
  }

  state = {
    inputUrl: '', // store text form value
    inputUrlError: '', // store text form error
  };

  componentDidMount() {
    this.props.actions.changePageTitle(this.props.pageTitle);
  }

  textField = React.createRef();
  submitButton = React.createRef();

  handleChange = (event) => {
    this.setState({
      inputUrl: event.target.value,
      inputUrlError: ''
    });
  }

  handleSubmit = () => {
    const { backendServer } = this.props.common;

    const arg = `url=${this.state.inputUrl}`;
    const path = 'content';
    const robotsTxtUrl = `${backendServer}/${path}?${arg}`;

    this.props.actions.fetchRobottxt(robotsTxtUrl, this.state.inputUrl)
      .then((res) => {
        if (res.data.success === 0) {
          this.setState({ inputUrlError: res.data.message });
        }
      })
      .catch(err => console.log('fetchRobotsTxtERROR', err));
  }

  resetForm = () => {
    this.setState({
      inputUrl: '',
      inputUrlError: '' }
    );
    // this.textField.setState({ value: '' });
    this.textField.focus();
  }

  clearContent = () => {
    this.setState({
      inputUrl: '',
      inputUrlError: ''
    });
    this.props.actions.clearRobotstxt();
  }

  renderForm() {
    return (
      <div className="read-robotstxt-form">
        <Card className="card" raised>
          <CardContent>
            <Typography variant="headline" component="h3">
              Inspect the content of a robots.txt URL here.
            </Typography>
            <TextField
              inputRef={(node) => { this.textField = node; }}
              autoFocus
              required
              margin="normal"
              name="input_url"
              placeholder="insert robots.txt URL here"
              onChange={this.handleChange}
              value={this.state.inputUrl}
              helperText={this.state.inputUrlError}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  document.getElementById('submit-button').click();
                }
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              id="submit-button"
              inputRef={(node) => { this.submitButton = node; }}
              variant="raised"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="raised"
              size="small"
              color="secondary"
              onClick={this.resetForm}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  renderContent() {
    const renderRobotsTxtContent = (robotsTxt) => {
      const lines = robotsTxt.split('\n');

      const renderedContent = lines.map((line, i) => {
        const key = `${i}-${line}`;
        if (/^user(\s|-)?agent/i.test(line)) { // User-agent
          return (
            <div key={key}>
              {i !== 0 && <br />}
              <Typography variant="body2" className="user-agent">{line}</Typography>
            </div>
          );
        } else if (/^allow/i.test(line)) { // Allow rule
          return (
            <div key={key}>
              <Typography variant="body1" className="allow">{line}</Typography>
            </div>
          );
        } else if (/^disallow/i.test(line)) { // Disallow rule
          return (
            <div key={key}>
              <Typography variant="body1" className="disallow">{line}</Typography>
            </div>
          );
        } else if (/^sitemap/i.test(line)) { // Sitemap
          return (
            <div key={key}>
              {/^sitemap/i.test(lines[i - 1]) || <br />}
              <Typography variant="body2" className="sitemap">{line}</Typography>
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
    };

    return (
      <div>
        <Card>
          <CardContent>
            {renderRobotsTxtContent(this.props.home.readRobotsTxtContent)}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="raised"
              color="primary"
              label="clear"
              onClick={this.clearContent}
            >
              Clear
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  render() {
    return (
      <div className="home-read-robots-txt">
        {this.props.home.readRobotsTxtContent ? this.renderContent() : this.renderForm()}
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
